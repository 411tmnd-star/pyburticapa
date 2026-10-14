"""Plan motion from a visual mapping: scene states, then concurrent actions, then property curves.

Reads one visual_mapping.<profile>.json (and its numerical file), plus the analysis and
interpretation it was made from. Refuses to run if any of them is stale. Never opens audio, never
writes to its inputs, and is deterministic: identical inputs and configuration give identical output.
"""

from __future__ import annotations

import os
import platform
from dataclasses import dataclass, field
from datetime import datetime, timezone
from importlib import metadata
from pathlib import Path

import numpy as np
from scipy.signal import find_peaks

from audiolab.interpretation.context import AnalysisContext, sha256_file
from audiolab.interpretation.engine import load_interpretation
from audiolab.motion import schema as ms
from audiolab.motion.config import MotionConfig, Rule
from audiolab.motion.state import run_state_machine
from audiolab.motion.vocabulary import COMBINE_RULES, POLICIES, PRIMITIVES, SCENE_STATES, STATE_DEFINITIONS
from audiolab.visual_mapping import signals as sg
from audiolab.visual_mapping.engine import StaleInputError
from audiolab.visual_mapping.validate import check_numerical, check_sources, load_arrays, load_mapping

ENGINE_NAME = "audiolab.motion"
ENGINE_VERSION = "0.1.0"
EPS = 1e-6

LIMITATIONS = [
    "This is a motion plan: it names abstract tracks and properties in [0, 1] and says nothing about "
    "pixels, physical units, actuator limits, latency or safety. Those belong to an execution adapter.",
    "Anticipatory actions need the source event to be known earlier than it occurs. That is possible "
    "offline; a live system can only use them for events it can predict. Each action records its "
    "lookahead_s, and the mapping channel it reads records channel_lookahead_s (centred smoothing and "
    "windows). The analysis itself (beat tracking, novelty) also used the whole song and is not counted.",
    "The scene state machine is causal but its thresholds are creative choices tuned on no data; a "
    "different song may need different thresholds.",
    "Property curves are sampled at the mapping's rate. Slew limits delay the peaks of fast actions; "
    "the constraint records say how many samples were limited.",
    "Channel-peak actions take their source time from a mapping response when one peaks within about "
    "one sample of the channel peak (time_basis 'event'); otherwise the time is the sampled peak "
    "(time_basis 'channel_peak_sampled') and is accurate only to the output sample interval.",
    "Priority and exclusive combination hide lower-priority actions while a higher-priority one is "
    "active; they are creative controls, not a statement about musical importance.",
]


@dataclass
class Contribution:
    action_id: str
    priority: int
    i0: int
    values: np.ndarray  # starts at sample i0


@dataclass
class PlanResult:
    arrays: dict[str, np.ndarray]
    meta: dict


# ---- inputs ------------------------------------------------------------------------------------


class Inputs:
    def __init__(self, mapping_path: Path):
        self.mapping_path = Path(mapping_path)
        self.model = load_mapping(self.mapping_path)
        problems = check_sources(self.model, self.mapping_path) + check_numerical(self.model, self.mapping_path)
        if problems:
            raise StaleInputError(f"{self.mapping_path}: " + "; ".join(problems))
        self.arrays = load_arrays(self.model, self.mapping_path)
        base = self.mapping_path.parent
        self.analysis_path = (base / self.model.sources.analysis.path).resolve()
        self.ctx = AnalysisContext(self.analysis_path)
        i = self.model.sources.interpretation
        self.interpretation_path = (base / i.path).resolve() if i else None
        self.interp = load_interpretation(self.interpretation_path) if i else None
        self.t = self.arrays["times"]
        self.rate = self.model.timebase.rate_hz
        self.duration = self.model.timebase.duration_s
        self.profile_spec = self.model.profile.spec
        cols = {c: self.arrays[f"resp__{c}"].tolist() for c in self.model.responses.columns}
        self.rows = [{**{c: v[k] for c, v in cols.items()}, "row": k} for k in range(self.model.responses.count)]

    def channel(self, name: str):
        """(values, valid) for an available mapping channel, else a reason string."""
        ch = next((c for c in self.model.channels if c.name == name), None)
        if ch is None:
            return f"the mapping has no channel {name!r}"
        if ch.status != "available":
            return f"mapping channel {name!r} is unavailable ({ch.reason})"
        return self.arrays[ch.array_key], self.arrays[ch.valid_key]


def channel_lookahead(spec: dict, channel: str) -> float:
    """How far ahead of a moment the mapping channel's inputs look (centred windows, anticipation)."""
    ch = spec.get("channels", {}).get(channel)
    if not ch:
        return 0.0
    best = 0.0
    for rule in ch["rules"]:
        inp, la = rule["input"], 0.0
        if inp["kind"] == "feature":
            if inp.get("align", "centered") == "centered":
                la = inp.get("smooth_s", 0.0) / 2
            if inp.get("baseline_s") and inp.get("baseline_align", "trailing") == "centered":
                la = max(la, inp["baseline_s"] / 2)
        elif inp["kind"] == "onset_rate":
            if inp.get("align", "centered") == "centered":
                la = inp["window_s"] / 2
        else:
            resp = rule.get("response") or {}
            la = max(0.0, resp.get("attack_s", 0.0) - resp.get("peak_offset_s", 0.0))
            mod = rule.get("modulate_by")
            if mod:
                la = max(la, mod.get("smooth_s", 0.0) / 2 + mod.get("window_s", 0.0) / 2)
        best = max(best, la)
    return float(best)


# ---- timing and rendering ----------------------------------------------------------------------


def event_times(rule: Rule, source: float) -> tuple[float, float, float, float]:
    """(start, peak, settle, end) for an event action. The source time is never changed."""
    if rule.policy == "anticipatory":
        peak = source + rule.peak_offset_s
        start = peak - rule.anticipation_s
    else:
        start = source
        peak = start + rule.attack_s
    settle = peak + rule.hold_s
    return start, peak, settle, settle + rule.release_s


def render_event(t: np.ndarray, start, peak, settle, end, amplitude, shape) -> Contribution | None:
    i0 = int(np.searchsorted(t, start, side="left"))
    i1 = int(np.searchsorted(t, end, side="right"))
    if i1 <= i0:
        return None
    env = amplitude * sg.gate(t[i0:i1], start, peak - start, settle, end - settle, shape)
    return Contribution("", 0, i0, np.clip(env, 0.0, 1.0))


def _state_at(spans, time_s: float) -> str:
    for s in spans:
        if s.start_s <= time_s < s.end_s:
            return s.state
    return spans[-1].state if time_s >= spans[-1].end_s else spans[0].state


# ---- rule generators ---------------------------------------------------------------------------


@dataclass
class Draft:
    """An action before ids and constraints are applied."""

    rule: Rule
    kind: str
    source_time: float | None
    time_basis: str
    start: float
    peak: float | None
    settle: float | None
    end: float
    amplitude: float
    scene_state: str | None
    causes: ms.Causes
    key: str
    contribution: Contribution | None = None
    suppressed: tuple[str, str | None] | None = None  # (reason, suppressed_by)


def _scale(inp: Inputs, rule: Rule, source_time: float, amp: float) -> float:
    if rule.amplitude_scale_by is None:
        return amp
    ch = inp.channel(rule.amplitude_scale_by.channel)
    if isinstance(ch, str):
        return amp
    k = int(np.clip(round(source_time * inp.rate), 0, len(inp.t) - 1))
    f = rule.amplitude_scale_by.floor
    return amp * (f + (1 - f) * float(ch[0][k]))


def gen_responses(inp: Inputs, rule: Rule, spans, notes: list[str]):
    ch = inp.channel(rule.channel)
    if isinstance(ch, str):
        return ch
    rows = [r for r in inp.rows if r["channel"] == rule.channel and (rule.mapping_rule_ids is None or r["rule"] in rule.mapping_rule_ids)]
    if not rows:
        return f"the mapping has no event responses on channel {rule.channel!r}"
    drafts, weak = [], 0
    for r in rows:
        if r["strength"] < rule.min_strength:
            weak += 1
            continue
        src = r["source_time"]
        start, peak, settle, end = event_times(rule, src)
        amp = float(np.clip(_scale(inp, rule, src, rule.gain * r["strength"]), 0.0, 1.0))
        drafts.append(Draft(
            rule, "event", src, "event", start, peak, settle, end, amp, _state_at(spans, src),
            ms.Causes(kind="mapping_response", channel=rule.channel, mapping_rule_ids=[r["rule"]],
                      source_ids=[r["source_id"]], response_rows=[r["row"]], channel_value=None),
            key=r["source_id"],
        ))
    if weak:
        notes.append(f"Rule {rule.id}: {weak} mapping response(s) weaker than min_strength {rule.min_strength:g} were not turned into actions.")
    return drafts


def gen_channel_peaks(inp: Inputs, rule: Rule, spans, notes: list[str]):
    ch = inp.channel(rule.channel)
    if isinstance(ch, str):
        return ch
    x, valid = ch
    peaks, _ = find_peaks(np.where(valid, x, 0.0), height=rule.min_height, prominence=rule.min_prominence,
                          distance=max(1, int(round(rule.min_distance_s * inp.rate))))
    rows = [r for r in inp.rows if r["channel"] == rule.channel]
    changes = [i for i in (inp.interp.interpretations if inp.interp else [])]
    drafts = []
    for k in peaks:
        t_peak = float(inp.t[k])
        covering = [r for r in rows if r["start"] <= t_peak <= r["end"]]
        near = [r for r in covering if abs(r["peak"] - t_peak) <= 1.5 / inp.rate]
        if near:
            best = min(near, key=lambda r: abs(r["peak"] - t_peak))
            src, basis = best["source_time"], "event"
        else:
            src, basis = t_peak, "channel_peak_sampled"
        support = []
        for it in changes:
            if abs(it.start_s - src) <= rule.link_tolerance_s or (it.kind == "passage" and it.start_s <= src <= it.end_s):
                support.append(it.id)
        support += [p.id for p in inp.ctx.novelty_peaks if abs(p.time_s - src) <= rule.link_tolerance_s]
        source_ids = list(dict.fromkeys(r["source_id"] for r in covering))
        start, peak, settle, end = event_times(rule, src)
        amp = float(np.clip(_scale(inp, rule, src, rule.gain * float(x[k])), 0.0, 1.0))
        drafts.append(Draft(
            rule, "event", src, basis, start, peak, settle, end, amp, _state_at(spans, src),
            ms.Causes(kind="channel_peak", channel=rule.channel, mapping_rule_ids=sorted({r["rule"] for r in covering}),
                      source_ids=source_ids, response_rows=[r["row"] for r in covering],
                      supporting_ids=list(dict.fromkeys(support)), channel_value=float(x[k])),
            key=f"{int(round(src * 1000))}ms",
        ))
    return drafts


def _runs(mask: np.ndarray):
    edges = np.flatnonzero(np.diff(np.concatenate([[0], mask.astype(int), [0]])))
    return list(zip(edges[::2], edges[1::2]))  # [i0, i1)


def gen_continuous(inp: Inputs, rule: Rule, spans, state_idx, notes: list[str]):
    allowed = np.isin(state_idx, [SCENE_STATES.index(s) for s in rule.states])
    if rule.kind == "hold":
        values, valid = np.full(len(inp.t), rule.level), np.ones(len(inp.t), dtype=bool)
        channel_name, causes_kind = None, "constant"
    else:
        ch = inp.channel(rule.channel)
        if isinstance(ch, str):
            return ch
        values, valid = ch
        channel_name, causes_kind = rule.channel, "channel"
    lookahead = channel_lookahead(inp.profile_spec, rule.channel) if rule.channel else 0.0
    drafts = []
    n = len(inp.t)
    for i0, i1 in _runs(allowed & valid):
        w = np.ones(i1 - i0)
        if rule.fade_s > 0:
            tt = inp.t[i0:i1]
            if i0 > 0:
                w *= sg._ease((tt - inp.t[i0]) / rule.fade_s, "smooth")
            if i1 < n:
                w *= sg._ease((inp.t[i1 - 1] - tt) / rule.fade_s, "smooth")
        contrib = np.clip(rule.gain * values[i0:i1] * w, 0.0, 1.0)
        peak_k = int(np.argmax(contrib))
        d = Draft(
            rule, "continuous", None, "none", float(inp.t[i0]), float(inp.t[i0 + peak_k]), None, float(inp.t[i1 - 1]),
            float(contrib.max()), spans_state(spans, inp.t[i0]),
            ms.Causes(kind=causes_kind, channel=channel_name, mapping_rule_ids=[], channel_value=None),
            key=f"{int(round(inp.t[i0] * 1000))}ms", contribution=Contribution("", rule.priority, i0, contrib),
        )
        d.lookahead = lookahead  # type: ignore[attr-defined]
        drafts.append(d)
    if not drafts:
        return "the channel was never valid inside the allowed scene states"
    return drafts


def spans_state(spans, time_s):
    return _state_at(spans, float(time_s))


# ---- combination and constraints ---------------------------------------------------------------


def combine_property(n: int, how: str, contributions: list[Contribution]):
    acc = np.zeros(n)
    prio = np.full(n, -1)
    depth = np.zeros(n, dtype=int)
    # A canonical order, so the result (including floating-point sums) does not depend on the order
    # of the rules in the configuration.
    for c in sorted(contributions, key=lambda c: (c.action_id, c.i0)):
        sl = slice(c.i0, c.i0 + len(c.values))
        active = c.values > EPS
        depth[sl] += active
        if how == "add":
            acc[sl] += c.values
        elif how == "priority":
            better = active & ((c.priority > prio[sl]) | ((c.priority == prio[sl]) & (c.values > acc[sl])))
            acc[sl] = np.where(better, c.values, acc[sl])
            prio[sl] = np.where(better, c.priority, prio[sl])
        else:  # max and exclusive (exclusive overlaps were removed before this)
            acc[sl] = np.maximum(acc[sl], c.values)
    return acc, depth


def schedule_exclusive(drafts: list[Draft]) -> None:
    """Suppress lower-priority drafts that overlap a higher-priority one (in place)."""
    accepted: list[Draft] = []
    for d in sorted(drafts, key=lambda d: (-d.rule.priority, d.start, d.key)):
        if d.suppressed:
            continue
        clash = next((a for a in accepted if d.start < a.end and a.start < d.end), None)
        if clash:
            d.suppressed = (f"overlaps {clash.rule.id}@{clash.key} on an exclusive property", f"{clash.rule.id}@{clash.key}")
        else:
            accepted.append(d)


def rate_limit(x: np.ndarray, rate_hz: float, max_rate: float):
    step = max_rate / rate_hz
    y = np.empty_like(x)
    y[0] = x[0]
    limited = 0
    for i in range(1, len(x)):
        d = x[i] - y[i - 1]
        if abs(d) > step + 1e-12:
            limited += 1
            d = step if d > 0 else -step
        y[i] = y[i - 1] + d
    return y, limited


# ---- the plan ----------------------------------------------------------------------------------


def plan_timeline(
    mapping_path: str | Path,
    cfg: MotionConfig,
    config_file: str | None = None,
    config_sha256: str | None = None,
    overrides_applied: list[dict] | None = None,
) -> PlanResult:
    inp = Inputs(Path(mapping_path))
    t, n = inp.t, len(inp.t)

    scene_ch = inp.channel(cfg.scene.signal)
    if isinstance(scene_ch, str):
        raise ValueError(f"scene signal: {scene_ch}")
    spans, state_idx = run_state_machine(t, scene_ch[0], cfg.scene, inp.duration)

    from audiolab.motion.state import level_and_slope

    level, slope = level_and_slope(t, scene_ch[0], cfg.scene)
    arrays: dict[str, np.ndarray] = {"times": t, "scene_state": state_idx, "scene_level": level, "scene_slope": slope}

    notes: list[str] = []
    skipped: list[ms.SkippedRule] = []
    drafts_by_prop: dict[tuple[str, str], list[Draft]] = {}
    for rule in cfg.rules:
        if not rule.enabled:
            skipped.append(ms.SkippedRule(id=rule.id, reason="disabled in the configuration"))
            continue
        if rule.kind == "responses":
            result = gen_responses(inp, rule, spans, notes)
        elif rule.kind == "channel_peaks":
            result = gen_channel_peaks(inp, rule, spans, notes)
        else:
            result = gen_continuous(inp, rule, spans, state_idx, notes)
        if isinstance(result, str):
            skipped.append(ms.SkippedRule(id=rule.id, reason=result))
            continue
        for d in result:
            if d.kind == "event":
                if d.scene_state not in rule.states:
                    d.suppressed = (f"scene state {d.scene_state!r} at the source time is not in the rule's allowed states", None)
                else:
                    d.contribution = render_event(t, d.start, d.peak, d.settle, d.end, d.amplitude, rule.shape)
                    if d.contribution is not None:
                        d.contribution.priority = rule.priority
        drafts_by_prop.setdefault((rule.track, rule.property), []).extend(result)

    actions: list[ms.Action] = []
    resolutions, constraints, track_records = [], [], []
    seen_ids: set[str] = set()
    for track_name, track in cfg.tracks.items():
        prop_records = []
        for prop_name, spec in track.properties.items():
            drafts = drafts_by_prop.get((track_name, prop_name), [])
            if spec.combine == "exclusive":
                schedule_exclusive(drafts)
            contributions = []
            for d in drafts:
                if d.contribution is not None and not d.suppressed:
                    d.contribution.action_id = f"{d.rule.id}@{d.key}"
                    contributions.append(d.contribution)
            raw, depth = combine_property(n, spec.combine, contributions)
            clamped = raw > spec.amplitude_max + 1e-12
            final = np.minimum(raw, spec.amplitude_max)
            limited = 0
            if spec.max_rate_per_s:
                final, limited = rate_limit(final, inp.rate, spec.max_rate_per_s)
            key = f"prop__{track_name}__{prop_name}"
            arrays[key] = final

            for d in sorted(drafts, key=lambda d: (d.start, d.key)):
                aid = f"{d.rule.id}@{d.key}"
                while aid in seen_ids:
                    aid += "+"
                seen_ids.add(aid)
                la = float(max(0.0, d.source_time - d.start)) if d.source_time is not None else 0.0
                ch_la = getattr(d, "lookahead", None)
                if ch_la is None:
                    ch_la = channel_lookahead(inp.profile_spec, d.rule.channel) if d.rule.channel else 0.0
                actions.append(ms.Action(
                    id=aid, rule_id=d.rule.id, track=track_name, property=prop_name, primitive=d.rule.primitive,
                    kind=d.kind, policy=d.rule.policy, status="suppressed" if d.suppressed else "scheduled",
                    reason=d.suppressed[0] if d.suppressed else None,
                    suppressed_by=d.suppressed[1] if d.suppressed else None,
                    source_time_s=d.source_time, time_basis=d.time_basis, start_s=d.start, peak_s=d.peak,
                    settle_s=d.settle, end_s=d.end, amplitude=d.amplitude, clamped=d.amplitude > spec.amplitude_max + 1e-12,
                    priority=d.rule.priority, easing=d.rule.shape, scene_state=d.scene_state, lookahead_s=la,
                    channel_lookahead_s=ch_la, extends_outside_audio=bool(d.start < -EPS or d.end > inp.duration + EPS),
                    causes=d.causes,
                ))
            resolutions.append(ms.Resolution(
                track=track_name, property=prop_name, combine=spec.combine, n_actions=len(contributions),
                n_suppressed=sum(1 for d in drafts if d.suppressed), n_overlap_samples=int((depth >= 2).sum()),
                max_simultaneous=int(depth.max()) if n else 0,
            ))
            constraints.append(ms.Constraint(
                track=track_name, property=prop_name, amplitude_max=spec.amplitude_max,
                max_rate_per_s=spec.max_rate_per_s, n_clamped_samples=int(clamped.sum()), n_rate_limited_samples=limited,
            ))
            prop_records.append(ms.PropertyRecord(
                name=prop_name, description=spec.description, combine=spec.combine, amplitude_max=spec.amplitude_max,
                max_rate_per_s=spec.max_rate_per_s, array_key=key, mean=float(final.mean()), max=float(final.max()),
                p95=float(np.percentile(final, 95)),
            ))
        track_records.append(ms.TrackRecord(name=track_name, description=track.description, primitives=track.primitives, properties=prop_records))

    actions.sort(key=lambda a: (a.start_s, a.track, a.property, a.id))
    libs = {}
    for lib in ("numpy", "scipy", "pydantic", "PyYAML"):
        try:
            libs[lib] = metadata.version(lib)
        except metadata.PackageNotFoundError:
            pass
    m = inp.model
    meta = dict(
        mapping_path=Path(mapping_path), analysis_path=inp.analysis_path, interpretation_path=inp.interpretation_path,
        mapping_model=m, engine=ms.Engine(name=ENGINE_NAME, version=ENGINE_VERSION),
        config=dict(name=cfg.name, version=cfg.version, file=config_file, file_sha256=config_sha256,
                    spec=cfg.model_dump(mode="json"), overrides=overrides_applied or []),
        provenance=ms.Provenance(created_at=datetime.now(timezone.utc).isoformat(timespec="seconds"),
                                 python_version=platform.python_version(), libraries=libs),
        timebase=ms.Timebase(rate_hz=inp.rate, n_samples=n, duration_s=inp.duration,
                             note="same grid as the visual mapping this plan reads: t_k = k / rate_hz"),
        vocabulary=ms.Vocabulary(
            primitives=[ms.PrimitiveDef(name=p.name, kind=p.kind, definition=p.definition) for p in PRIMITIVES.values()],
            policies=dict(POLICIES), scene_states=dict(STATE_DEFINITIONS), combine_rules=dict(COMBINE_RULES)),
        tracks=track_records,
        states=[ms.StateSpan(id=f"state:{i:03d}", state=s.state, start_s=s.start_s, end_s=s.end_s, enter_reason=s.enter_reason,
                             signal_at_entry=s.signal_at_entry, slope_at_entry=s.slope_at_entry, forced=s.forced)
                for i, s in enumerate(spans)],
        actions=actions, resolutions=resolutions, constraints=constraints, skipped_rules=skipped,
        limitations=LIMITATIONS + notes,
    )
    return PlanResult(arrays, meta)


# ---- writing -----------------------------------------------------------------------------------


def _describe(key: str) -> str:
    if key == "times":
        return "output sample times in seconds (the visual mapping's grid)"
    if key == "scene_state":
        return f"scene state per sample, index into {list(SCENE_STATES)}"
    if key == "scene_level":
        return "smoothed level the scene state machine watched"
    if key == "scene_slope":
        return "trailing slope of that level, per second"
    _, track, prop = key.split("__")
    return f"{track}.{prop}: combined, clamped and rate-limited property curve in [0, amplitude_max]"


def output_paths(mapping_path: str | Path) -> tuple[Path, Path]:
    mapping_path = Path(mapping_path)
    profile = mapping_path.stem.removeprefix("visual_mapping.")
    out = mapping_path.parent.parent / "motion"
    return out / f"motion_timeline.{profile}.json", out / f"motion_timeline.{profile}.npz"


def build_model(result: PlanResult, json_path: Path, npz_path: Path, npz_sha: str) -> ms.MotionTimeline:
    meta = result.meta
    rel = lambda p: os.path.relpath(Path(p), json_path.parent).replace("\\", "/")
    m = meta["mapping_model"]
    interp = m.sources.interpretation
    sources = ms.Sources(
        mapping_path=rel(meta["mapping_path"]), mapping_file_sha256=sha256_file(Path(meta["mapping_path"])),
        mapping_content_sha256=mapping_content_sha256(m), mapping_schema_version=m.schema_version,
        mapping_engine_version=m.engine.version, mapping_numerical_sha256=m.numerical.sha256,
        profile_name=m.profile.name, profile_version=m.profile.version, profile_file_sha256=m.profile.file_sha256,
        analysis_path=rel(meta["analysis_path"]), analysis_content_sha256=m.sources.analysis.content_sha256,
        audio_sha256=m.sources.analysis.audio_sha256,
        interpretation_path=rel(meta["interpretation_path"]) if interp else None,
        interpretation_content_sha256=interp.content_sha256 if interp else None, duration_s=m.timebase.duration_s,
    )
    arrays = [ms.ArrayInfo(key=k, shape=list(v.shape), dtype=str(v.dtype), description=_describe(k)) for k, v in result.arrays.items()]
    return ms.MotionTimeline(
        schema_version=ms.SCHEMA_VERSION, engine=meta["engine"], sources=sources,
        config=ms.ConfigRecord(**meta["config"]), provenance=meta["provenance"], timebase=meta["timebase"],
        vocabulary=meta["vocabulary"], tracks=meta["tracks"], states=meta["states"], actions=meta["actions"],
        resolutions=meta["resolutions"], constraints=meta["constraints"], skipped_rules=meta["skipped_rules"],
        limitations=meta["limitations"], numerical=ms.Numerical(file=rel(npz_path), sha256=npz_sha, arrays=arrays),
    )


def mapping_content_sha256(model) -> str:
    import hashlib
    import json

    data = model.model_dump(mode="json")
    data["provenance"].pop("created_at", None)
    return hashlib.sha256(json.dumps(data, sort_keys=True, separators=(",", ":")).encode()).hexdigest()


def write_timeline(result: PlanResult, json_path: str | Path, npz_path: str | Path) -> ms.MotionTimeline:
    json_path, npz_path = Path(json_path), Path(npz_path)
    json_path.parent.mkdir(parents=True, exist_ok=True)
    np.savez(npz_path, **result.arrays)
    model = build_model(result, json_path, npz_path, sha256_file(npz_path))
    json_path.write_text(model.model_dump_json(indent=2), encoding="utf-8")
    return model
