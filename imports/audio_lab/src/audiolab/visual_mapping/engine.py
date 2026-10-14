"""Apply a mapping profile to one song's analysis (and interpretation) and produce control channels.

Reads song_analysis.json + its curves file through the interpretation layer's AnalysisContext (which
verifies the curves hash), and song_interpretation.json if it sits next to the analysis (refusing
it if it is stale). Never opens audio, never writes to the source artifacts.
"""

from __future__ import annotations

import hashlib
import json
import os
import platform
from dataclasses import dataclass, field
from datetime import datetime, timezone
from importlib import metadata
from pathlib import Path

import numpy as np

from audiolab.interpretation.context import AnalysisContext, analysis_content_sha256, sha256_file
from audiolab.interpretation.engine import check_source, load_interpretation
from audiolab.interpretation.schema import SongInterpretation
from audiolab.visual_mapping import signals as sg
from audiolab.visual_mapping.channels import CHANNELS, RANGE
from audiolab.visual_mapping.profile import Profile, Rule
from audiolab.visual_mapping.schema import (
    SCHEMA_VERSION,
    AnalysisSource,
    ArrayInfo,
    ChannelRecord,
    ChannelStats,
    Engine,
    InterpretationSource,
    NormalizationRecord,
    Numerical,
    ProfileRecord,
    Provenance,
    Responses,
    RuleRecord,
    Sources,
    Timebase,
    VisualMapping,
)

ENGINE_NAME = "audiolab.visual_mapping"
ENGINE_VERSION = "0.2.0"  # 0.2.0: baseline-relative features, smoothed modulation
INTERPRETATION_FILE = "song_interpretation.json"
RESPONSE_COLUMNS = [
    "rule", "channel", "source_kind", "source_id", "anchor_id",
    "source_time", "start", "peak", "end", "strength", "clipped",
]

LIMITATIONS = [
    "Channel values are relative to this song and this profile; equal values in two songs do not "
    "mean equal loudness or activity.",
    "Percentile normalization maps the song's own low and high percentiles to 0 and 1, so a song "
    "with little dynamic range still spans the full channel range.",
    "Channel smoothing is causal (attack/release follower) and lags rises by about attack_s and "
    "falls by about release_s.",
    "Event responses are sampled on the output grid: the highest sample of a response can be up to "
    "one sample interval from its intended peak (asymmetric attack/release or a hold favour the "
    "later sample), and a sampled peak can read below the event's strength.",
    "Feature curves are linearly interpolated from the analysis frames, so a change is spread over "
    "up to one analysis frame (about 23 ms) and can show a trace that much before it occurs.",
    "Centered smoothing and centered onset-rate windows look ahead by half their width, so those "
    "rules can start responding before the change they follow. Use align: trailing to avoid this "
    "at the cost of an equivalent lag.",
    "Profiles are experimental creative choices. Nothing here says a bass increase should be a "
    "drop, high frequencies should be particles, or high energy should be fast motion.",
]


class StaleInputError(ValueError):
    """An input artifact does not match the one it claims to describe."""


def interpretation_content_sha256(model: SongInterpretation) -> str:
    data = model.model_dump(mode="json")
    data["provenance"].pop("created_at", None)
    return hashlib.sha256(json.dumps(data, sort_keys=True, separators=(",", ":")).encode()).hexdigest()


@dataclass
class RuleOutput:
    record: RuleRecord
    signal: np.ndarray | None = None
    valid: np.ndarray | None = None
    responses: list[dict] = field(default_factory=list)


@dataclass
class MappingResult:
    arrays: dict[str, np.ndarray]
    meta: dict  # everything for the JSON except the numerical file record and relative paths


def _skip(rule: Rule, channel: str, reason: str) -> RuleOutput:
    return RuleOutput(
        RuleRecord(
            id=rule.id, channel=channel, input=rule.input.model_dump(), weight=rule.weight,
            curve=rule.curve, strength=rule.strength, overlap=rule.overlap, status="skipped", reason=reason,
        )
    )


def _norm_record(res: sg.NormalizationResult, computed_on: str) -> NormalizationRecord:
    finite = lambda v: None if v is None or not np.isfinite(v) else float(v)
    return NormalizationRecord(
        method=res.method, low=res.low, high=res.high, low_value=finite(res.low_value),
        high_value=finite(res.high_value), degenerate=res.degenerate, computed_on=computed_on,
    )


class _Mapper:
    def __init__(self, ctx: AnalysisContext, interp: SongInterpretation | None, interp_status: str, rate_hz: float):
        self.ctx = ctx
        self.interp = interp
        self.interp_status = interp_status
        self.rate = rate_hz
        n = int(np.floor(ctx.duration * rate_hz + 1e-9)) + 1
        self.t = np.arange(n) / rate_hz

    # ---- source curves ------------------------------------------------------------------------

    def _source_curve(self, key: str):
        """(times, values, label of the grid, tail) for a curve, or a reason it can't be used."""
        ctx = self.ctx
        if not ctx.has_curve(key):
            return f"curve {key!r} is not in the analysis curves file"
        values = np.asarray(ctx.curve(key), dtype=float)
        if values.ndim != 1:
            return f"curve {key!r} has shape {values.shape}; only 1-D curves can drive a channel"
        if len(values) == ctx.n_frames:
            return ctx.times, values, "analysis frames", 1.0 / ctx.frame_rate
        if ctx.has_curve("beat_times") and len(values) == len(ctx.curve("beat_times")) and len(values) >= 2:
            return np.asarray(ctx.curve("beat_times"), dtype=float), values, "beat grid", 0.0
        return f"curve {key!r} has {len(values)} samples, matching neither the frame nor the beat grid"

    def _normalized_curve(
        self, key: str, smooth_s: float, norm, align: str = "centered", baseline_s: float = 0.0,
        baseline_mode: str = "above", baseline_align: str = "trailing",
    ):
        found = self._source_curve(key)
        if isinstance(found, str):
            return found
        src_t, values, grid, tail = found
        step = np.median(np.diff(src_t))
        raw = values
        if smooth_s > 0:
            values = sg.moving_average(values, int(round(smooth_s / step)), key.endswith("_db"), align)
        if baseline_s > 0:
            slow = sg.moving_average(raw, int(round(baseline_s / step)), key.endswith("_db"), baseline_align)
            values = sg.relative_to_baseline(values, slow, baseline_mode)
            grid = f"{grid}, relative to a {baseline_s:g} s {baseline_align} baseline ({baseline_mode})"
        normed, res = sg.normalize(values, np.ones(len(values), dtype=bool), norm.method, norm.low, norm.high)
        return src_t, normed, res, grid, tail

    # ---- rules --------------------------------------------------------------------------------

    def rule(self, rule: Rule, channel: str) -> RuleOutput:
        kind = rule.input.kind
        if kind == "feature":
            return self._feature(rule, channel)
        if kind == "onset_rate":
            return self._onset_rate(rule, channel)
        if kind == "events":
            return self._events(rule, channel)
        return self._interpretation(rule, channel)

    def _applied(self, rule, channel, signal, valid, **extra) -> RuleOutput:
        signal = np.clip(signal, 0.0, 1.0) ** rule.curve
        record = RuleRecord(
            id=rule.id, channel=channel, input=rule.input.model_dump(), weight=rule.weight, curve=rule.curve,
            strength=rule.strength, overlap=rule.overlap, status="applied",
            valid_fraction=float(np.mean(valid)), array_key=f"rule__{rule.id}", valid_key=f"rule__{rule.id}__valid",
            **{k: v for k, v in extra.items() if k != "responses"},
        )
        return RuleOutput(record, signal, valid, extra.get("responses", []))

    def _feature(self, rule, channel):
        found = self._normalized_curve(
            rule.input.feature, rule.input.smooth_s, rule.normalize, rule.input.align,
            rule.input.baseline_s, rule.input.baseline_mode, rule.input.baseline_align,
        )
        if isinstance(found, str):
            return _skip(rule, channel, found)
        src_t, normed, res, grid, tail = found
        signal, valid = sg.resample(src_t, normed, self.t, tail)
        return self._applied(rule, channel, signal, valid, normalization=_norm_record(res, grid))

    def _onset_rate(self, rule, channel):
        if not self.ctx.has_analyzer("onset_detector"):
            return _skip(rule, channel, "the analysis has no onset_detector output")
        rate = sg.onset_rate(self.t, self.ctx.onset_times, rule.input.window_s, self.ctx.duration, rule.input.align)
        valid = np.ones(len(self.t), dtype=bool)
        norm = rule.normalize
        signal, res = sg.normalize(rate, valid, norm.method, norm.low, norm.high)
        return self._applied(rule, channel, signal, valid, normalization=_norm_record(res, "output grid (onsets per second)"))

    def _events(self, rule, channel):
        ctx, which = self.ctx, rule.input.events
        if which in ("beat", "downbeat"):
            if not ctx.has_events("beat"):
                return _skip(rule, channel, "the analysis has fewer than two beats")
            events = [b for b in ctx.beats if which == "beat" or b.is_downbeat]
            lo, hi = ctx.beat_times[0] - ctx.beat_interval, ctx.beat_times[-1] + ctx.beat_interval
        elif which == "onset":
            if not ctx.has_analyzer("onset_detector"):
                return _skip(rule, channel, "the analysis has no onset_detector output")
            events, lo, hi = ctx.onsets, 0.0, ctx.duration
        else:
            if not ctx.has_analyzer("novelty") or not ctx.has_events("beat"):
                return _skip(rule, channel, "the analysis has no novelty output on a beat grid")
            events, lo, hi = ctx.novelty_peaks, ctx.beat_times[0], ctx.beat_times[-1]

        strengths = [rule.strength] * len(events)
        if rule.beat_in_bar_strength:
            strengths = [s * rule.beat_in_bar_strength.get(e.beat_in_bar, 1.0) for s, e in zip(strengths, events)]
        mod_record = None
        if rule.modulate_by:
            m = rule.modulate_by
            found = self._normalized_curve(m.feature, m.smooth_s, m.normalize)
            if isinstance(found, str):
                return _skip(rule, channel, f"modulate_by: {found}")
            src_t, normed, res, grid, _ = found
            mod_record = _norm_record(res, grid)
            for i, e in enumerate(events):
                a = np.searchsorted(src_t, e.time_s - m.window_s / 2, side="left")
                b = np.searchsorted(src_t, e.time_s + m.window_s / 2, side="right")
                value = float(normed[a:b].max()) if b > a else float(np.interp(e.time_s, src_t, normed))
                strengths[i] *= m.floor + (1 - m.floor) * value
        strengths = [min(1.0, s) for s in strengths]

        r = rule.response
        timings = [sg.event_timing(e.time_s, r.attack_s, r.hold_s, r.release_s, r.peak_offset_s) for e in events]
        signal = sg.render_events(
            self.t, timings, strengths, [r.attack_s] * len(events),
            [tm.peak + r.hold_s for tm in timings], [r.release_s] * len(events), r.shape, rule.overlap,
        )
        valid = (self.t >= lo - r.attack_s) & (self.t <= hi + r.hold_s + r.release_s)
        responses = [
            self._response(rule, channel, "analysis_event", e.id, "", e.time_s, tm, s)
            for e, tm, s in zip(events, timings, strengths)
        ]
        return self._applied(
            rule, channel, signal, valid, response=r.model_dump(), n_responses=len(events),
            modulation_normalization=mod_record, responses=responses,
        )

    def _interpretation(self, rule, channel):
        label = rule.input.label
        if self.interp is None:
            return _skip(rule, channel, f"no interpretation used: {self.interp_status}")
        vocab = {v.label: v for v in self.interp.vocabulary}
        skipped = {s.label: s.reason for s in self.interp.skipped_rules}
        if label not in vocab:
            return _skip(rule, channel, f"label {label!r} is not in the interpretation's vocabulary")
        if label in skipped:
            return _skip(rule, channel, f"the interpretation skipped {label!r}: {skipped[label]}")
        items = [i for i in self.interp.interpretations if i.label == label]
        r = rule.response
        if vocab[label].kind == "change":
            timings = [sg.event_timing(i.start_s, r.attack_s, r.hold_s, r.release_s, r.peak_offset_s) for i in items]
            fall_froms = [tm.peak + r.hold_s for tm in timings]
            rng = self.interp.provenance.evaluated_range_s
            if rng is None:
                valid = np.zeros(len(self.t), dtype=bool)
            else:
                valid = (self.t >= rng.start_s + r.peak_offset_s - r.attack_s) & (
                    self.t <= rng.end_s + r.peak_offset_s + r.hold_s + r.release_s
                )
        else:
            timings = [sg.passage_timing(i.start_s, i.end_s, r.attack_s, r.release_s) for i in items]
            fall_froms = [i.end_s for i in items]
            valid = np.ones(len(self.t), dtype=bool)
        strengths = [rule.strength] * len(items)
        signal = sg.render_events(
            self.t, timings, strengths, [r.attack_s] * len(items), fall_froms,
            [r.release_s] * len(items), r.shape, rule.overlap,
        )
        responses = [
            self._response(rule, channel, "interpretation", i.id, i.anchor_event_id or "", i.start_s, tm, s)
            for i, tm, s in zip(items, timings, strengths)
        ]
        return self._applied(
            rule, channel, signal, valid, response=r.model_dump(), n_responses=len(items), responses=responses,
        )

    def _response(self, rule, channel, kind, source_id, anchor, source_time, tm, strength) -> dict:
        return {
            "rule": rule.id, "channel": channel, "source_kind": kind, "source_id": source_id,
            "anchor_id": anchor, "source_time": float(source_time), "start": float(tm.start),
            "peak": float(tm.peak), "end": float(tm.end), "strength": float(strength),
            "clipped": bool(tm.start < 0 or tm.end > self.ctx.duration),
        }


def _load_interpretation(analysis_path: Path):
    path = analysis_path.parent / INTERPRETATION_FILE
    if not path.exists():
        return None, None, f"no {INTERPRETATION_FILE} next to the analysis"
    model = load_interpretation(path)
    problem = check_source(model, path)
    if problem:
        raise StaleInputError(f"{path}: {problem}")
    return model, path, "used"


def map_song(
    analysis_path: str | Path,
    profile: Profile,
    rate_hz: float = 30.0,
    profile_file: str | Path | None = None,
    profile_sha256: str | None = None,
) -> MappingResult:
    analysis_path = Path(analysis_path)
    ctx = AnalysisContext(analysis_path)
    interp, interp_path, interp_status = _load_interpretation(analysis_path)
    mapper = _Mapper(ctx, interp, interp_status, rate_hz)
    t = mapper.t

    arrays: dict[str, np.ndarray] = {"times": t}
    channel_records, rule_records, responses = [], [], []
    for name in [c for c in CHANNELS if c in profile.channels]:
        spec = profile.channels[name]
        outputs = [mapper.rule(rule, name) for rule in spec.rules]
        rule_records += [o.record for o in outputs]
        applied = [o for o in outputs if o.record.status == "applied"]
        for o in applied:
            arrays[o.record.array_key] = o.signal
            arrays[o.record.valid_key] = o.valid
            responses += o.responses
        base = dict(
            name=name, range=RANGE, meaning=CHANNELS[name].meaning, behaviour=CHANNELS[name].behaviour,
            combine=spec.combine, smoothing=spec.smoothing.model_dump(), rest=spec.rest,
            rule_ids=[r.id for r in spec.rules],
        )
        if not applied:
            reasons = "; ".join(f"{o.record.id}: {o.record.reason}" for o in outputs)
            channel_records.append(ChannelRecord(status="unavailable", reason=f"no rule could run ({reasons})", **base))
            continue
        combined, valid = sg.combine(
            [o.signal for o in applied], [o.valid for o in applied], [o.record.weight for o in applied],
            spec.combine, spec.rest,
        )
        smoothed = np.clip(sg.follower(combined, 1.0 / rate_hz, spec.smoothing.attack_s, spec.smoothing.release_s), *RANGE)
        arrays[name] = smoothed
        arrays[f"{name}__valid"] = valid
        stats = ChannelStats(
            min=float(smoothed.min()), max=float(smoothed.max()), mean=float(smoothed.mean()),
            p95=float(np.percentile(smoothed, 95)), std=float(smoothed.std()),
        )
        channel_records.append(
            ChannelRecord(
                status="available", coverage=float(valid.mean()), stats=stats, array_key=name,
                valid_key=f"{name}__valid", **base,
            )
        )

    responses.sort(key=lambda r: (r["channel"], r["rule"], r["source_time"], r["source_id"]))
    for col in RESPONSE_COLUMNS:
        values = [r[col] for r in responses]
        if col in ("source_time", "start", "peak", "end", "strength"):
            arrays[f"resp__{col}"] = np.asarray(values, dtype=float)
        elif col == "clipped":
            arrays[f"resp__{col}"] = np.asarray(values, dtype=bool)
        else:
            arrays[f"resp__{col}"] = np.asarray(values, dtype=str) if values else np.asarray([], dtype="<U1")

    libs = {}
    for lib in ("numpy", "scipy", "pydantic", "PyYAML"):
        try:
            libs[lib] = metadata.version(lib)
        except metadata.PackageNotFoundError:
            pass
    a = ctx.analysis
    by_rule: dict[str, int] = {}
    for r in responses:
        by_rule[r["rule"]] = by_rule.get(r["rule"], 0) + 1

    limitations = list(LIMITATIONS)
    for rec in rule_records:
        for norm in (rec.normalization, rec.modulation_normalization):
            if norm and norm.degenerate:
                limitations.append(f"Rule {rec.id}: its input has no range, so it contributes zeros.")
    for c in channel_records:
        if c.status == "available" and c.coverage < 1.0:
            limitations.append(
                f"Channel {c.name}: no rule had valid input on {100 * (1 - c.coverage):.1f}% of samples; "
                f"those samples hold the rest value {c.rest:g} and are marked invalid."
            )

    meta = dict(
        analysis_path=analysis_path,
        interpretation_path=interp_path,
        sources=dict(
            analysis=dict(
                file_sha256=ctx.file_sha256, content_sha256=analysis_content_sha256(a), audio_file=a.source.file,
                audio_sha256=a.source.sha256, curves_file=a.curves.file, curves_sha256=a.curves.sha256,
                duration_s=a.source.duration_s,
            ),
            interpretation=None if interp is None else dict(
                file_sha256=sha256_file(interp_path), content_sha256=interpretation_content_sha256(interp),
                schema_version=interp.schema_version, method_version=interp.method.version,
            ),
            interpretation_status=interp_status,
        ),
        engine=Engine(name=ENGINE_NAME, version=ENGINE_VERSION),
        profile=dict(
            name=profile.name, version=profile.version, file=profile_file, file_sha256=profile_sha256,
            spec=profile.model_dump(mode="json"),
        ),
        provenance=Provenance(
            created_at=datetime.now(timezone.utc).isoformat(timespec="seconds"),
            python_version=platform.python_version(), libraries=libs,
        ),
        timebase=Timebase(
            rate_hz=rate_hz, n_samples=len(t), duration_s=ctx.duration,
            sample_time="t_k = k / rate_hz for k = 0..n_samples-1 (t_k <= duration_s)",
            feature_resampling="linear interpolation (numpy.interp) from the source grid; frame curves "
            f"at {ctx.frame_rate:.5f} Hz, novelty on the beat grid",
            boundary="feature rules are valid from the first source sample to one source step after the "
            "last; beat rules from one beat before the first beat to one after the last plus the "
            "response; interpretation changes within the interpretation's evaluated range plus the "
            "response; event envelopes are cut at 0 s and at the end of the audio",
        ),
        channels=channel_records,
        rules=rule_records,
        responses=Responses(count=len(responses), columns=RESPONSE_COLUMNS, by_rule=by_rule),
        limitations=limitations,
    )
    return MappingResult(arrays, meta)


_ARRAY_DESCRIPTIONS = {
    "times": "output sample times in seconds",
}


def _describe(key: str) -> str:
    if key in _ARRAY_DESCRIPTIONS:
        return _ARRAY_DESCRIPTIONS[key]
    if key.startswith("resp__"):
        return f"event responses, column {key[6:]}"
    if key.startswith("rule__") and key.endswith("__valid"):
        return f"where rule {key[6:-7]} had valid input"
    if key.startswith("rule__"):
        return f"rule {key[6:]} signal in [0, 1] before weighting and channel smoothing"
    if key.endswith("__valid"):
        return f"where channel {key[:-7]} had at least one valid rule"
    return f"channel {key} in [0, 1]"


def output_paths(analysis_path: str | Path, profile_name: str) -> tuple[Path, Path]:
    out_dir = Path(analysis_path).parent / "visual"
    return out_dir / f"visual_mapping.{profile_name}.json", out_dir / f"visual_mapping.{profile_name}.npz"


def build_model(result: MappingResult, json_path: Path, npz_path: Path, npz_sha: str) -> VisualMapping:
    m = result.meta
    rel = lambda p: os.path.relpath(Path(p), json_path.parent).replace("\\", "/")
    sources = dict(m["sources"])
    sources["analysis"] = AnalysisSource(path=rel(m["analysis_path"]), **sources["analysis"])
    if sources["interpretation"] is not None:
        sources["interpretation"] = InterpretationSource(path=rel(m["interpretation_path"]), **sources["interpretation"])
    profile = dict(m["profile"])
    if profile["file"] is not None:
        profile["file"] = Path(profile["file"]).as_posix()
    arrays = [
        ArrayInfo(key=k, shape=list(v.shape), dtype=str(v.dtype), description=_describe(k))
        for k, v in result.arrays.items()
    ]
    return VisualMapping(
        schema_version=SCHEMA_VERSION, engine=m["engine"], sources=Sources(**sources),
        profile=ProfileRecord(**profile), provenance=m["provenance"], timebase=m["timebase"],
        channels=m["channels"], rules=m["rules"], responses=m["responses"],
        numerical=Numerical(file=rel(npz_path), sha256=npz_sha, arrays=arrays), limitations=m["limitations"],
    )


def write_mapping(result: MappingResult, json_path: str | Path, npz_path: str | Path) -> VisualMapping:
    json_path, npz_path = Path(json_path), Path(npz_path)
    json_path.parent.mkdir(parents=True, exist_ok=True)
    np.savez(npz_path, **result.arrays)
    model = build_model(result, json_path, npz_path, sha256_file(npz_path))
    json_path.write_text(model.model_dump_json(indent=2), encoding="utf-8")
    return model
