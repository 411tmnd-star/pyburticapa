"""Interpretation rules: each turns measured features into one kind of described change or passage.

A rule has an operational definition (what must be true of the data for the label to apply), the
features it requires, and a version. Rules never relabel a passage as something more specific than
their definition: nothing here says "drop", "chorus" or "verse".

Adding a rule: subclass `ChangeRule` (a point on the beat grid, found by comparing the windows
before and after) or `Rule` (anything else), give it a label, a definition and a `requires` list,
and append an instance to `RULES`. Add its config dataclass to `InterpretConfig`.
"""

from __future__ import annotations

from dataclasses import dataclass, field

import numpy as np

from audiolab.config import EventConfig
from audiolab.events import detect_loud_segments
from audiolab.interpretation.config import InterpretConfig
from audiolab.interpretation.context import AnalysisContext, WindowStat
from audiolab.interpretation.schema import (
    Criterion,
    CurveRef,
    Evidence,
    Interpretation,
    Measurement,
    RuleRef,
    Window,
)


@dataclass
class RuleResult:
    interpretations: list[Interpretation] = field(default_factory=list)
    skipped_reason: str | None = None  # set when the data made the rule inapplicable


# ---- evidence helpers --------------------------------------------------------------------------


def _m(ctx: AnalysisContext, name: str, stat: WindowStat, statistic: str, unit: str) -> Measurement:
    return Measurement(
        name=name, feature=stat.feature, statistic=statistic, value=stat.value, unit=unit,
        window=stat.window, curve=stat.curve_ref(ctx.analysis.curves.file),
        event_ids=list(stat.event_ids),
    )


def _crit(description: str, observed: float, comparator: str, threshold: float) -> Criterion:
    met = observed >= threshold if comparator == "ge" else observed <= threshold
    return Criterion(
        description=description, observed=float(observed), comparator=comparator,
        threshold=float(threshold), met=bool(met),
    )


def _curve_ref(ctx: AnalysisContext, key: str, i0: int, i1: int) -> CurveRef:
    return CurveRef(file=ctx.analysis.curves.file, key=key, frame_start=i0, frame_end=i1)


def _suppress(cands: list, min_separation_beats: int) -> list:
    """Keep the strongest candidate, drop any within min_separation_beats of a kept one."""
    chosen: list = []
    for c in sorted(cands, key=lambda c: (-c.score, c.beat_index)):
        if all(abs(c.beat_index - d.beat_index) >= min_separation_beats for d in chosen):
            chosen.append(c)
    return sorted(chosen, key=lambda c: c.beat_index)


# ---- base classes ------------------------------------------------------------------------------


class Rule:
    label: str
    kind: str  # "change" or "passage"
    version: str = "1"
    definition: str
    requires: tuple[str, ...] = ()  # "curve:<key>", "events:beat", "analyzer:<name>"
    limitations: tuple[str, ...] = ()

    def config(self, cfg: InterpretConfig):
        return getattr(cfg, self.label)

    def missing(self, ctx: AnalysisContext) -> str | None:
        """Why this rule can't run on this analysis, or None."""
        absent = []
        for req in self.requires:
            kind, _, name = req.partition(":")
            ok = {
                "curve": ctx.has_curve, "events": ctx.has_events, "analyzer": ctx.has_analyzer,
            }[kind](name)
            if not ok:
                absent.append(req)
        return f"missing required input(s): {', '.join(absent)}" if absent else None

    def evaluate(self, ctx: AnalysisContext, cfg: InterpretConfig) -> RuleResult:
        raise NotImplementedError

    # builders shared by subclasses
    def _rule_ref(self) -> RuleRef:
        return RuleRef(name=self.label, version=self.version)

    def _passage(
        self, ctx, start_s, end_s, measurements, criteria, attributes=None, supporting=(),
        extra_limitations=(),
    ) -> Interpretation:
        return Interpretation(
            id=f"{self.label}@{int(round(start_s * 1000))}ms", label=self.label, kind="passage",
            start_s=start_s, end_s=end_s, rule=self._rule_ref(),
            evidence=Evidence(
                measurements=measurements, criteria=criteria, supporting_event_ids=list(supporting)
            ),
            attributes=attributes or {}, limitations=list(self.limitations) + list(extra_limitations),
        )


@dataclass
class Assessment:
    score: float
    measurements: list[Measurement]
    criteria: list[Criterion]
    passed: bool
    attributes: dict = field(default_factory=dict)
    extra_support: list[str] = field(default_factory=list)


@dataclass
class _Candidate:
    beat_index: int
    score: float
    assessment: Assessment
    windows: tuple[Window, Window]


class ChangeRule(Rule):
    """A change placed on a beat by comparing the window before it with the window after it."""

    kind = "change"
    # (curve key, sign) pairs used to place a change precisely. Power-averaged windows saturate
    # as soon as part of a window is loud, so the pass/fail score is flat for about one window
    # before a step. The mean of the dB values instead changes linearly with how much of a
    # window lies past the step, so it peaks exactly on it. sign +1 rise, -1 fall, 0 either.
    localization: tuple[tuple[str, int], ...] = ()

    def assess(self, ctx, cfg, k, before: Window, after: Window) -> Assessment | None:
        raise NotImplementedError

    def _localization_score(self, ctx, before: Window, after: Window) -> float | None:
        total, used = 0.0, False
        for key, sign in self.localization:
            if not ctx.has_curve(key):
                continue
            b = ctx.mean_db(key, before.start_s, before.end_s)
            a = ctx.mean_db(key, after.start_s, after.end_s)
            if a is None or b is None:
                continue
            total += abs(a - b) if sign == 0 else sign * (a - b)
            used = True
        return total if used else None

    def _refine(self, ctx, cfg, cand: _Candidate, window_s: float) -> _Candidate:
        """Move a passing candidate to the beat where the change is sharpest, if that beat passes too."""
        common = cfg.common
        best_k = cand.beat_index
        best = self._localization_score(ctx, *cand.windows)
        if best is None:
            return cand
        lo = max(0, best_k - common.window_beats)
        hi = min(len(ctx.beats), best_k + common.window_beats + 1)
        for j in range(lo, hi):
            windows = ctx.change_windows(j, window_s, common.min_window_fraction)
            if windows is None:
                continue
            score = self._localization_score(ctx, *windows)
            if score is not None and score > best + 1e-9:
                best, best_k = score, j
        if best_k == cand.beat_index:
            return cand
        windows = ctx.change_windows(best_k, window_s, common.min_window_fraction)
        result = self.assess(ctx, cfg, best_k, *windows)
        if result is None or not result.passed:
            return cand
        return _Candidate(best_k, result.score, result, windows)

    def evaluate(self, ctx: AnalysisContext, cfg: InterpretConfig) -> RuleResult:
        common = cfg.common
        window_s = ctx.window_s(common.window_beats)
        found: dict[int, _Candidate] = {}
        for k in range(len(ctx.beats)):
            windows = ctx.change_windows(k, window_s, common.min_window_fraction)
            if windows is None:
                continue
            result = self.assess(ctx, cfg, k, *windows)
            if result is None or not result.passed:
                continue
            cand = self._refine(ctx, cfg, _Candidate(k, result.score, result, windows), window_s)
            if cand.beat_index not in found or cand.score > found[cand.beat_index].score:
                found[cand.beat_index] = cand
        cands = list(found.values())

        out = []
        tol = common.link_tolerance_beats * ctx.beat_interval
        for c in _suppress(cands, common.min_separation_beats):
            beat = ctx.beats[c.beat_index]
            support = [beat.id] + [p.id for p in ctx.peaks_near(beat.time_s, tol)]
            support += [s for s in c.assessment.extra_support if s not in support]
            extra = []
            if any(w.end_s - w.start_s < window_s - 1e-6 for w in c.windows):
                extra.append(
                    "A comparison window was shortened by the start or end of the audio, so the "
                    "comparison used less data than the configured window."
                )
            out.append(
                Interpretation(
                    id=f"{self.label}@{beat.id}", label=self.label, kind="change",
                    start_s=beat.time_s, end_s=beat.time_s, anchor_event_id=beat.id,
                    rule=self._rule_ref(),
                    evidence=Evidence(
                        measurements=c.assessment.measurements, criteria=c.assessment.criteria,
                        supporting_event_ids=support,
                    ),
                    attributes=c.assessment.attributes, limitations=list(self.limitations) + extra,
                )
            )
        return RuleResult(out)


_BEAT_RESOLUTION = (
    "Placed on the nearest beat: the real change may fall anywhere within a beat interval of it."
)


# ---- change rules ------------------------------------------------------------------------------


class BassEntry(ChangeRule):
    label = "bass_entry"
    definition = (
        "A meaningful increase in bass activity. At a beat, the mean power of the bass band over "
        "the window after it exceeds the mean over the window before by at least min_rise_db; the "
        "band ends up at least min_after_level_db (relative to the song's loudest frame); and at "
        "least min_sustained_fraction of the later window's frames sit above the midpoint of the "
        "rise, so a single burst does not count."
    )
    requires = ("curve:band_bass_db", "events:beat")
    localization = (("band_bass_db", 1),)
    limitations = (
        _BEAT_RESOLUTION,
        "Measures energy in the analyzer's bass band only. It does not identify an instrument, and "
        "a bass increase is not evidence of a drop, a chorus or any particular section.",
    )

    def assess(self, ctx, cfg, k, before, after):
        c = cfg.bass_entry
        b = ctx.mean_power_db("band_bass_db", before.start_s, before.end_s)
        a = ctx.mean_power_db("band_bass_db", after.start_s, after.end_s)
        if b is None or a is None:
            return None
        rise = a.value - b.value
        level = b.value + c.min_rise_db / 2
        frac = ctx.fraction_above_db("band_bass_db", after.start_s, after.end_s, level)
        crit = [
            _crit("bass energy rise, after window minus before window (dB)", rise, "ge", c.min_rise_db),
            _crit("bass energy after the change (dB re loudest frame)", a.value, "ge", c.min_after_level_db),
            _crit("share of later frames above the midpoint of the rise", frac, "ge", c.min_sustained_fraction),
        ]
        meas = [
            _m(ctx, "bass_before", b, "mean_power_db", "dB"),
            _m(ctx, "bass_after", a, "mean_power_db", "dB"),
            Measurement(
                name="sustained_fraction", feature="band_bass_db",
                statistic=f"fraction_of_frames_at_or_above_{level:.1f}_db", value=frac, unit="ratio",
                window=a.window, curve=a.curve_ref(ctx.analysis.curves.file),
            ),
        ]
        return Assessment(rise, meas, crit, all(x.met for x in crit), {"rise_db": round(rise, 2)})


class EnergyDrop(ChangeRule):
    label = "energy_drop"
    definition = (
        "A substantial reduction in energy. At a beat, the mean power of overall loudness over the "
        "window after it is at least min_drop_db below the mean over the window before."
    )
    requires = ("curve:rms_db", "events:beat")
    localization = (("rms_db", -1),)
    limitations = (
        _BEAT_RESOLUTION,
        "Window means are power averages, so a window containing a few loud frames reads as loud. "
        "A fade-out at the end of a song can satisfy this rule.",
    )

    def assess(self, ctx, cfg, k, before, after):
        c = cfg.energy_drop
        b = ctx.mean_power_db("rms_db", before.start_s, before.end_s)
        a = ctx.mean_power_db("rms_db", after.start_s, after.end_s)
        if b is None or a is None:
            return None
        drop = b.value - a.value
        crit = [_crit("loudness fall, before window minus after window (dB)", drop, "ge", c.min_drop_db)]
        meas = [
            _m(ctx, "loudness_before", b, "mean_power_db", "dB"),
            _m(ctx, "loudness_after", a, "mean_power_db", "dB"),
        ]
        return Assessment(drop, meas, crit, crit[0].met, {"drop_db": round(drop, 2)})


class RhythmicDensityChange(ChangeRule):
    label = "rhythmic_density_change"
    definition = (
        "A meaningful change in onset activity. At a beat, the onset rate (detected onsets per "
        "second) over the window after it differs from the rate before by at least "
        "min_abs_change, and the larger rate is at least min_ratio times the smaller "
        "(both offset by ratio_floor so a rate of zero is comparable)."
    )
    requires = ("analyzer:onset_detector", "events:beat")
    limitations = (
        _BEAT_RESOLUTION,
        "Onsets are estimated by a peak picker. Dense or sustained sounds can raise or lower the "
        "count without a change a listener would call rhythmic.",
    )

    def assess(self, ctx, cfg, k, before, after):
        c = cfg.rhythmic_density_change
        b = ctx.onset_rate(before.start_s, before.end_s)
        a = ctx.onset_rate(after.start_s, after.end_s)
        if b is None or a is None:
            return None
        delta = a.value - b.value
        hi, lo = max(a.value, b.value), min(a.value, b.value)
        ratio = (hi + c.ratio_floor) / (lo + c.ratio_floor)
        crit = [
            _crit("absolute change in onset rate (per second)", abs(delta), "ge", c.min_abs_change),
            _crit("ratio of larger to smaller onset rate", ratio, "ge", c.min_ratio),
        ]
        meas = [
            _m(ctx, "onset_rate_before", b, "events_per_second", "1/s"),
            _m(ctx, "onset_rate_after", a, "events_per_second", "1/s"),
        ]
        attrs = {"direction": "increase" if delta > 0 else "decrease", "ratio": round(ratio, 2)}
        return Assessment(ratio, meas, crit, all(x.met for x in crit), attrs)


class TransitionCandidate(ChangeRule):
    label = "transition_candidate"
    definition = (
        "A possible transition supported by several features changing together. At a beat, count "
        "the channels that change across the beat: overall loudness, bass, mid and high band "
        "energy (each by at least its dB threshold), onset rate (by min abs change and ratio), and "
        "a novelty peak within novelty_tolerance_beats. It is a candidate when at least "
        "min_channels of the available channels change."
    )
    requires = ("events:beat",)
    localization = (("rms_db", 0), ("band_bass_db", 0), ("band_mid_db", 0), ("band_high_db", 0))
    limitations = (
        _BEAT_RESOLUTION,
        "Several features changing together is consistent with a section boundary but also with a "
        "fill, a drop, a break or a coincidence. A candidate is not a verified boundary and does "
        "not say what kind of change it is.",
    )
    _CURVE_CHANNELS = (
        ("loudness", "rms_db", "loudness_db"),
        ("bass", "band_bass_db", "bass_db"),
        ("mid", "band_mid_db", "mid_db"),
        ("high", "band_high_db", "high_db"),
    )

    def _channels_available(self, ctx) -> list[str]:
        names = [n for n, key, _ in self._CURVE_CHANNELS if ctx.has_curve(key)]
        if ctx.has_analyzer("onset_detector"):
            names.append("onset_rate")
        if ctx.has_analyzer("novelty"):
            names.append("novelty")
        return names

    def evaluate(self, ctx, cfg):
        c = cfg.transition_candidate
        n = len(self._channels_available(ctx))
        if n < c.min_channels:
            return RuleResult(
                skipped_reason=f"only {n} change channel(s) available, fewer than "
                f"min_channels={c.min_channels}"
            )
        return super().evaluate(ctx, cfg)

    def assess(self, ctx, cfg, k, before, after):
        c = cfg.transition_candidate
        meas: list[Measurement] = []
        crit: list[Criterion] = []
        met_channels: list[str] = []
        score = 0.0
        extra_support: list[str] = []

        for name, key, thr_field in self._CURVE_CHANNELS:
            if not ctx.has_curve(key):
                continue
            b = ctx.mean_power_db(key, before.start_s, before.end_s)
            a = ctx.mean_power_db(key, after.start_s, after.end_s)
            if b is None or a is None:
                continue
            thr = getattr(c, thr_field)
            delta = abs(a.value - b.value)
            meas += [
                _m(ctx, f"{name}_before", b, "mean_power_db", "dB"),
                _m(ctx, f"{name}_after", a, "mean_power_db", "dB"),
            ]
            crit.append(_crit(f"|change in {name} energy| (dB)", delta, "ge", thr))
            if crit[-1].met:
                met_channels.append(name)
                score += min(delta / thr, 3.0)

        if ctx.has_analyzer("onset_detector"):
            b = ctx.onset_rate(before.start_s, before.end_s)
            a = ctx.onset_rate(after.start_s, after.end_s)
            if b is not None and a is not None:
                hi, lo = max(a.value, b.value), min(a.value, b.value)
                ratio = (hi + c.onset_ratio_floor) / (lo + c.onset_ratio_floor)
                meas += [
                    _m(ctx, "onset_rate_before", b, "events_per_second", "1/s"),
                    _m(ctx, "onset_rate_after", a, "events_per_second", "1/s"),
                ]
                crit.append(_crit("|change in onset rate| (per second)", abs(a.value - b.value), "ge", c.onset_min_abs_change))
                crit.append(_crit("ratio of larger to smaller onset rate", ratio, "ge", c.onset_min_ratio))
                if crit[-2].met and crit[-1].met:
                    met_channels.append("onset_rate")
                    score += min(ratio / c.onset_min_ratio, 3.0)

        if ctx.has_analyzer("novelty"):
            t = float(ctx.beat_times[k])
            peaks = ctx.peaks_near(t, c.novelty_tolerance_beats * ctx.beat_interval)
            crit.append(_crit("novelty peak within tolerance (1 = present)", 1.0 if peaks else 0.0, "ge", 1.0))
            if peaks:
                met_channels.append("novelty")
                score += 1.0
                extra_support += [p.id for p in peaks]

        crit.append(_crit("channels changing together", len(met_channels), "ge", c.min_channels))
        return Assessment(
            score, meas, crit, crit[-1].met,
            {"channels": ",".join(met_channels), "channels_changed": len(met_channels)},
            extra_support,
        )


# ---- passage rules -----------------------------------------------------------------------------


def _segments(values, ctx, on, off, min_duration_s, merge_gap_s):
    """Spans where `values` stays above `on` until it falls below `off`.

    Reuses the analyzer's hysteresis segmenter, which is generic over the array it is given.
    """
    seg_cfg = EventConfig(
        loud_threshold_db=on, loud_hysteresis_db=on - off,
        loud_min_duration_s=min_duration_s, loud_merge_gap_s=merge_gap_s,
    )
    return detect_loud_segments(values, ctx.times, ctx.frame_rate, seg_cfg)


class EnergyBuild(Rule):
    label = "energy_build"
    kind = "passage"
    definition = (
        "A sustained increase in measured energy. Overall loudness is smoothed over smooth_s and "
        "its slope taken. A passage starts when the slope exceeds min_slope_db_per_s and ends when "
        "it falls below end_slope_db_per_s; interruptions shorter than merge_gap_s are bridged. "
        "It counts when it lasts at least min_duration_s and loudness gains at least min_rise_db "
        "across it. A sudden jump (a rise of more than max_step_db within step_window_s) is not a "
        "build: frames around one are excluded and passages are cut there."
    )
    requires = ("curve:rms_db",)
    limitations = (
        "Based on smoothed overall loudness only. A fade-in, a crescendo and added layers all look "
        "the same to this rule.",
        "Smoothing spreads the start and end by about half of smooth_s.",
    )

    def _jump_frames(self, ctx, cfg) -> np.ndarray:
        """Frames within reach of a sudden jump, widened by half the build smoothing so the
        spread of the smoothed slope around it is covered too."""
        c = cfg.energy_build
        fine = ctx.smoothed_db("rms_db", cfg.common.smooth_s)
        n_step = max(1, int(round(c.step_window_s * ctx.frame_rate)))
        ahead = np.append(fine[n_step:], np.full(n_step, fine[-1]))
        starts = np.flatnonzero(ahead - fine > c.max_step_db)
        pad = int(round(c.smooth_s / 2 * ctx.frame_rate))
        mask = np.zeros(len(fine), dtype=bool)
        for i in starts:
            mask[max(0, i - pad) : min(len(fine), i + n_step + pad + 1)] = True
        return mask

    @staticmethod
    def _cut_at_jumps(ctx, segs, jump, min_duration_s) -> list[dict]:
        """Split segments wherever they touch a jump, keeping pieces long enough to count."""
        out = []
        for seg in segs:
            i0 = int(round(seg["start"] * ctx.frame_rate))
            i1 = int(round(seg["end"] * ctx.frame_rate))
            ok = ~jump[i0 : i1 + 1]
            edges = np.flatnonzero(np.diff(np.concatenate([[0], ok.astype(int), [0]])))
            for a, b in zip(edges[::2], edges[1::2]):
                s_, e_ = i0 + a, i0 + b - 1
                if (e_ - s_ + 1) / ctx.frame_rate >= min_duration_s:
                    out.append({**seg, "start": float(ctx.times[s_]), "end": float(ctx.times[e_])})
        return out

    def evaluate(self, ctx, cfg):
        c = cfg.energy_build
        sm = ctx.smoothed_db("rms_db", c.smooth_s)
        slope = np.gradient(sm, ctx.times)
        jump = self._jump_frames(ctx, cfg)
        segs = _segments(slope, ctx, c.min_slope_db_per_s, c.end_slope_db_per_s, c.min_duration_s, c.merge_gap_s)
        out = []
        for seg in self._cut_at_jumps(ctx, segs, jump, c.min_duration_s):
            i0 = int(round(seg["start"] * ctx.frame_rate))
            i1 = int(round(seg["end"] * ctx.frame_rate))
            rise = float(sm[i1] - sm[i0])
            duration = seg["end"] - seg["start"]
            crit = [
                _crit("passage duration (s)", duration + 1 / ctx.frame_rate, "ge", c.min_duration_s),
                _crit("loudness gain across the passage (dB)", rise, "ge", c.min_rise_db),
            ]
            if not all(x.met for x in crit):
                continue
            stat = f"moving_average_{c.smooth_s:g}s_power_db"
            meas = [
                Measurement(
                    name="loudness_at_start", feature="rms_db", statistic=stat, value=float(sm[i0]), unit="dB",
                    window=Window(start_s=seg["start"], end_s=seg["start"]), curve=_curve_ref(ctx, "rms_db", i0, i0 + 1),
                ),
                Measurement(
                    name="loudness_at_end", feature="rms_db", statistic=stat, value=float(sm[i1]), unit="dB",
                    window=Window(start_s=seg["end"], end_s=seg["end"]), curve=_curve_ref(ctx, "rms_db", i1, i1 + 1),
                ),
                Measurement(
                    name="mean_slope", feature="rms_db", statistic=f"mean_slope_of_{stat}",
                    value=rise / max(duration, 1e-9), unit="dB/s",
                    window=Window(start_s=seg["start"], end_s=seg["end"]), curve=_curve_ref(ctx, "rms_db", i0, i1 + 1),
                ),
            ]
            peaks = [p.id for p in ctx.novelty_peaks if seg["start"] <= p.time_s <= seg["end"]]
            out.append(
                self._passage(ctx, seg["start"], seg["end"], meas, crit, {"rise_db": round(rise, 2)}, peaks)
            )
        return RuleResult(out)


def _reference(ctx, key, smooth_s, percentile):
    sm = ctx.smoothed_db(key, smooth_s)
    return sm, float(np.percentile(sm, percentile))


def _reference_measurement(ctx, ref, smooth_s, percentile) -> Measurement:
    return Measurement(
        name="reference_level", feature="rms_db",
        statistic=f"percentile_{percentile:g}_of_moving_average_{smooth_s:g}s_db", value=ref, unit="dB",
        window=Window(start_s=0.0, end_s=ctx.duration), curve=_curve_ref(ctx, "rms_db", 0, ctx.n_frames),
    )


class HighEnergyPassage(Rule):
    label = "high_energy_passage"
    kind = "passage"
    definition = (
        "A relatively sustained period of elevated energy. The song's own loud reference is the "
        "reference_percentile of its smoothed loudness. A passage is where smoothed loudness stays "
        "within within_db of that reference (with hysteresis), for at least min_duration_s. Only "
        "applies when the song has contrast: reference minus the 10th percentile is at least "
        "min_dynamic_range_db."
    )
    requires = ("curve:rms_db",)
    limitations = (
        "Elevated relative to this song's own loud level, not in absolute terms, and not a "
        "statement about tempo or how fast the music feels.",
    )

    def evaluate(self, ctx, cfg):
        c = cfg.high_energy_passage
        sm, ref = _reference(ctx, "rms_db", cfg.common.smooth_s, c.reference_percentile)
        dyn = ref - float(np.percentile(sm, 10))
        if dyn < c.min_dynamic_range_db:
            return RuleResult(
                skipped_reason=f"loudness range {dyn:.1f} dB is below min_dynamic_range_db="
                f"{c.min_dynamic_range_db:g}: no contrast to call any passage elevated"
            )
        on = ref - c.within_db
        segs = _segments(sm, ctx, on, on - c.hysteresis_db, c.min_duration_s, c.merge_gap_s)
        out = []
        for seg in segs:
            level = ctx.mean_power_db("rms_db", seg["start"], seg["end"] + 1 / ctx.frame_rate)
            if level is None:
                continue
            crit = [
                _crit("passage duration (s)", seg["end"] - seg["start"] + 1 / ctx.frame_rate, "ge", c.min_duration_s),
                _crit("reference minus mean level (dB)", ref - level.value, "le", c.within_db + c.hysteresis_db),
            ]
            meas = [
                _m(ctx, "passage_level", level, "mean_power_db", "dB"),
                _reference_measurement(ctx, ref, cfg.common.smooth_s, c.reference_percentile),
            ]
            out.append(
                self._passage(ctx, seg["start"], seg["end"], meas, crit, {"below_reference_db": round(ref - level.value, 2)})
            )
        return RuleResult(out)


class SparsePassage(Rule):
    label = "sparse_passage"
    kind = "passage"
    definition = (
        "A period of comparatively low activity. Smoothed loudness stays at least "
        "below_reference_db under the song's own loud reference (with hysteresis) for at least "
        "min_duration_s, and the onset rate over the passage is at most max_onset_ratio times the "
        "song's overall onset rate."
    )
    requires = ("curve:rms_db", "analyzer:onset_detector")
    limitations = (
        "Low loudness and few detected onsets relative to this song. It does not say the passage "
        "is an intro, a breakdown or a pause; a quiet but busy passage is not sparse by this rule.",
    )

    def evaluate(self, ctx, cfg):
        c = cfg.sparse_passage
        overall = len(ctx.onsets) / ctx.duration
        if overall <= 0:
            return RuleResult(skipped_reason="no onsets detected in the song, so an onset-rate ratio is undefined")
        sm, ref = _reference(ctx, "rms_db", cfg.common.smooth_s, c.reference_percentile)
        on = ref - c.below_reference_db
        # Negate so "below the threshold" becomes "above" for the segmenter.
        segs = _segments(-sm, ctx, -on, -on - c.hysteresis_db, c.min_duration_s, c.merge_gap_s)
        out = []
        for seg in segs:
            end = seg["end"] + 1 / ctx.frame_rate
            level = ctx.mean_power_db("rms_db", seg["start"], end)
            rate = ctx.onset_rate(seg["start"], end)
            if level is None or rate is None:
                continue
            ratio = rate.value / overall
            crit = [
                _crit("passage duration (s)", end - seg["start"], "ge", c.min_duration_s),
                _crit("reference minus mean level (dB)", ref - level.value, "ge", c.below_reference_db - c.hysteresis_db),
                _crit("passage onset rate over the song's overall rate", ratio, "le", c.max_onset_ratio),
            ]
            if not all(x.met for x in crit):
                continue
            meas = [
                _m(ctx, "passage_level", level, "mean_power_db", "dB"),
                _reference_measurement(ctx, ref, cfg.common.smooth_s, c.reference_percentile),
                _m(ctx, "passage_onset_rate", rate, "events_per_second", "1/s"),
                Measurement(
                    name="overall_onset_rate", feature="onset_rate", statistic="events_per_second_whole_song",
                    value=overall, unit="1/s", window=Window(start_s=0.0, end_s=ctx.duration),
                ),
            ]
            out.append(
                self._passage(
                    ctx, seg["start"], seg["end"], meas, crit,
                    {"below_reference_db": round(ref - level.value, 2), "onset_ratio": round(ratio, 2)},
                )
            )
        return RuleResult(out)


# Registry, in the order rules run. Output is sorted by time afterwards.
RULES: list[Rule] = [
    BassEntry(),
    EnergyBuild(),
    EnergyDrop(),
    HighEnergyPassage(),
    SparsePassage(),
    RhythmicDensityChange(),
    TransitionCandidate(),
]
