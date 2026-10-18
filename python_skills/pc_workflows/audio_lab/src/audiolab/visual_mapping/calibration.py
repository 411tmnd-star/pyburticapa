"""Before/after comparison of profile versions on the same source artifacts.

The baseline is a frozen snapshot of earlier mappings (outputs/<song>/visual_baseline_v1). Every
region used below is derived from the song's own interpretation, never from fixed timestamps.
"""

from __future__ import annotations

import json
from pathlib import Path

import numpy as np

from audiolab.interpretation.context import AnalysisContext
from audiolab.interpretation.engine import load_interpretation
from audiolab.visual_mapping import signals as sg
from audiolab.visual_mapping.engine import INTERPRETATION_FILE
from audiolab.visual_mapping.review import Loaded, pulse_by_beat_position
from audiolab.visual_mapping.validate import load_arrays, load_mapping

PROFILES = ("balanced", "bass_pulse", "cinematic")
BASELINE_DIR = "visual_baseline_v1"


def load_version(analysis_path: Path, profile: str, folder: str) -> Loaded | None:
    j = analysis_path.parent / folder / f"visual_mapping.{profile}.json"
    if not j.exists():
        return None
    model = load_mapping(j)
    return Loaded(profile, j, model, load_arrays(model, j))


def regions(analysis_path: Path) -> dict:
    """Spans derived from the interpretation: a quiet passage after an energy drop (and the loud
    passage before it), a sparse intro (and the first loud body). Missing ones are None."""
    path = analysis_path.parent / INTERPRETATION_FILE
    out = {"quiet": None, "main_before_quiet": None, "sparse": None, "body": None}
    if not path.exists():
        return out
    items = load_interpretation(path).interpretations
    passages = sorted((i for i in items if i.label == "high_energy_passage"), key=lambda i: i.start_s)
    for drop in sorted((i for i in items if i.label == "energy_drop"), key=lambda i: i.start_s):
        before = [p for p in passages if p.start_s < drop.start_s - 5 and p.end_s >= drop.start_s - 2]
        after = [p for p in passages if p.start_s > drop.start_s]
        if before and after:
            out["quiet"] = (drop.start_s + 0.2, after[0].start_s - 0.2)
            out["main_before_quiet"] = (before[0].start_s + 5.0, drop.start_s - 0.8)
            break
    sparse = [i for i in items if i.label == "sparse_passage"]
    if sparse and passages:
        s = min(sparse, key=lambda i: i.start_s)
        out["sparse"] = (s.start_s + 1.0, s.end_s - 0.5)
        out["body"] = (passages[0].start_s + 2.0, passages[0].end_s - 2.0)
    return out


def _mean(a: dict, ch: str, span) -> float:
    t = a["times"]
    sel = (t >= span[0]) & (t < span[1])
    return float(a[ch][sel].mean()) if sel.any() else float("nan")


def _hp(x: np.ndarray, rate: float, trend_s: float = 8.0) -> np.ndarray:
    return x - sg.moving_average(x, int(trend_s * rate), False)


def detail_metrics(song_ctx: AnalysisContext, loaded: Loaded) -> dict:
    x, t = loaded.arrays["detail_activity"], loaded.arrays["times"]
    # Windows are ranked by how much the high band varies (std of its dB curve over 4 s), because the
    # channel measures activity against a slow baseline, not level: a constantly loud high band has
    # nothing to deviate from, and a sparse one with sporadic hits does.
    high = song_ctx.curve("band_high_db").astype(float)
    ht = song_ctx.times
    edges = np.arange(0, song_ctx.duration - 4.0, 4.0)
    variation = np.array([high[(ht >= e) & (ht < e + 4)].std() for e in edges])
    order = np.argsort(variation)
    k = max(1, len(order) // 5)
    mean_in = lambda idx: float(np.mean([x[(t >= edges[i]) & (t < edges[i] + 4)].mean() for i in idx]))
    return {
        "mean": float(x.mean()), "std": float(x.std()), "share_above_0.8": float(np.mean(x > 0.8)),
        "share_below_0.05": float(np.mean(x < 0.05)),
        "mean_in_calmest_fifth": mean_in(order[:k]), "mean_in_liveliest_fifth": mean_in(order[-k:]),
        "variation_db_calmest": float(variation[order[:k]].mean()), "variation_db_liveliest": float(variation[order[-k:]].mean()),
    }


def channel_distinctness(loaded: Loaded) -> dict:
    a = loaded.arrays
    rate = loaded.model.timebase.rate_hz
    pairs = (("intensity", "scale"), ("intensity", "motion_weight"), ("scale", "motion_weight"))
    return {
        f"{x}~{y}": {
            "whole": float(np.corrcoef(a[x], a[y])[0, 1]),
            "detrended": float(np.corrcoef(_hp(a[x], rate), _hp(a[y], rate))[0, 1]),
        }
        for x, y in pairs
        if x in a and y in a
    }


def rise_time(loaded: Loaded, channel: str, t0: float, span_s: float = 8.0) -> float | None:
    """Seconds for a channel to go from 10% to 90% of the way between its mean before and after t0."""
    a = loaded.arrays
    t, x = a["times"], a[channel]
    before = x[(t >= t0 - span_s) & (t < t0 - 1.0)].mean()
    after = x[(t > t0 + 1.0) & (t <= t0 + span_s)].mean()
    if abs(after - before) < 0.1:
        return None
    lo, hi = before + 0.1 * (after - before), before + 0.9 * (after - before)
    win = (t >= t0 - 3.0) & (t <= t0 + span_s)
    tt, xx = t[win], x[win]
    up = after > before
    i_lo = np.flatnonzero(xx >= lo) if up else np.flatnonzero(xx <= lo)
    i_hi = np.flatnonzero(xx >= hi) if up else np.flatnonzero(xx <= hi)
    if not len(i_lo) or not len(i_hi):
        return None
    return float(tt[i_hi[0]] - tt[i_lo[0]])


def quiet_ratios(loaded: Loaded, reg: dict, channels=("intensity", "scale", "motion_weight", "pulse_strength", "density")) -> dict:
    if not reg["quiet"] or not reg["main_before_quiet"]:
        return {}
    a = loaded.arrays
    return {
        ch: _mean(a, ch, reg["quiet"]) / max(_mean(a, ch, reg["main_before_quiet"]), 1e-9)
        for ch in channels if ch in a
    }


def intro_pulses(loaded: Loaded, reg: dict) -> dict:
    if not reg["sparse"] or not reg["body"]:
        return {}
    a = loaded.arrays
    t, x = a["times"], a["pulse_strength"]
    intro = (t >= reg["sparse"][0]) & (t < reg["sparse"][1])
    body = (t >= reg["body"][0]) & (t < reg["body"][1])
    return {"intro_max": float(x[intro].max()), "intro_p90": float(np.percentile(x[intro], 90)),
            "body_max": float(x[body].max()), "body_p90": float(np.percentile(x[body], 90))}


def transition_evidence(song_ctx: AnalysisContext, interp, loaded: Loaded, level: float = 0.05, near_s: float = 3.0) -> dict:
    """Where does transition_weight rise, and is there evidence there? Evidence = an interpreted
    change within near_s, or novelty of at least 0.3 within 2 beats."""
    a = loaded.arrays
    t, x = a["times"], a["transition_weight"]
    changes = [i.start_s for i in (interp.interpretations if interp else []) if i.kind == "change"]
    bt, nov = song_ctx.beat_times, np.asarray(song_ctx.curve("novelty")) if song_ctx.has_curve("novelty") else None
    elevated = x > level
    unsupported = 0
    for k in np.flatnonzero(elevated):
        near_change = any(abs(t[k] - c) <= near_s for c in changes)
        near_novelty = nov is not None and len(bt) and nov[np.argmin(np.abs(bt - t[k]))] >= 0.3 - 1e-9
        if not near_change and not near_novelty:
            unsupported += 1
    return {
        "share_above_0.05": float(elevated.mean()),
        "unsupported_samples": int(unsupported),
        "max": float(x.max()),
    }


def compare_song(analysis_path: Path, baseline: str = BASELINE_DIR, current: str = "visual") -> dict:
    analysis_path = Path(analysis_path)
    ctx = AnalysisContext(analysis_path)
    ip = analysis_path.parent / INTERPRETATION_FILE
    interp = load_interpretation(ip) if ip.exists() else None
    reg = regions(analysis_path)
    out = {"song": analysis_path.parent.name, "regions": reg, "profiles": {}}
    for prof in PROFILES:
        old, new = load_version(analysis_path, prof, baseline), load_version(analysis_path, prof, current)
        if old is None or new is None:
            continue
        entry = {"versions": {"baseline": old.model.profile.version, "current": new.model.profile.version}}
        entry["detail_activity"] = {"baseline": detail_metrics(ctx, old), "current": detail_metrics(ctx, new)}
        entry["quiet_ratios"] = {"baseline": quiet_ratios(old, reg), "current": quiet_ratios(new, reg)}
        entry["intro_pulses"] = {"baseline": intro_pulses(old, reg), "current": intro_pulses(new, reg)}
        entry["distinctness"] = {"baseline": channel_distinctness(old), "current": channel_distinctness(new)}
        for ver, ld in (("baseline", old), ("current", new)):
            entry.setdefault("motion_weight_activity_per_s", {})[ver] = float(
                np.mean(np.abs(np.diff(ld.arrays["motion_weight"]))) * ld.model.timebase.rate_hz
            )
            entry.setdefault("transition", {})[ver] = transition_evidence(ctx, interp, ld)
            entry.setdefault("pulse_by_beat_position", {})[ver] = pulse_by_beat_position(
                type("S", (), {"ctx": ctx})(), ld
            )
        out["profiles"][prof] = entry
    return out


def _f(v, nd=2):
    return "-" if v is None or (isinstance(v, float) and np.isnan(v)) else f"{v:.{nd}f}"


def markdown(results: list[dict]) -> str:
    L = ["# Profile calibration: Phase 7.0 (baseline) vs 7.1 (current)", "",
         "Generated by `audiolab visual calibrate` from frozen baseline mappings and the current ones, both "
         "built from identical analysis and interpretation artifacts. Regions come from each song's "
         "interpretation, not fixed times. Numbers are descriptive.", ""]
    for r in results:
        L += [f"## {r['song']}", ""]
        reg = r["regions"]
        L.append("Regions: " + ", ".join(f"{k} {tuple(round(x, 1) for x in v)}" for k, v in reg.items() if v) + "\n")
        L += ["### 1. detail_activity (was near-saturated)", "",
              "Windows are 4 s long, ranked by how much the high band varies (calm = least variation, "
              "lively = most). The channel measures activity against a slow baseline, not level.", "",
              "| profile | mean | share>0.8 | std | calmest fifth | liveliest fifth |", "|---|---|---|---|---|---|"]
        for p, e in r["profiles"].items():
            for ver in ("baseline", "current"):
                d = e["detail_activity"][ver]
                L.append(f"| {p} {ver} | {_f(d['mean'])} | {_f(d['share_above_0.8'])} | {_f(d['std'])} | "
                         f"{_f(d['mean_in_calmest_fifth'])} | {_f(d['mean_in_liveliest_fifth'])} |")
        L += ["", "### 2. Cinematic channel distinctness (correlation; detrended = 8 s trend removed)", "",
              "| pair | baseline whole / detrended | current whole / detrended |", "|---|---|---|"]
        cin = r["profiles"].get("cinematic")
        if cin:
            for pair, cur in cin["distinctness"]["current"].items():
                base = cin["distinctness"]["baseline"][pair]
                L.append(f"| {pair} | {_f(base['whole'])} / {_f(base['detrended'])} | {_f(cur['whole'])} / {_f(cur['detrended'])} |")
        L += ["", "### 3. Balanced pulses in the sparse intro (max pulse_strength)", ""]
        for p, e in r["profiles"].items():
            ip = e["intro_pulses"]
            if ip["current"]:
                L.append(f"- **{p}**: intro max {_f(ip['baseline']['intro_max'])} -> {_f(ip['current']['intro_max'])}, "
                         f"body max {_f(ip['baseline']['body_max'])} -> {_f(ip['current']['body_max'])}")
        L += ["", "### 4. motion_weight activity per second (jumpiness)", ""]
        for p, e in r["profiles"].items():
            m = e["motion_weight_activity_per_s"]
            L.append(f"- **{p}**: {_f(m['baseline'])} -> {_f(m['current'])}")
        L += ["", "### 5. transition_weight: where it rises, and whether evidence supports it", "",
              "| profile | share>0.05 base -> now | max base -> now | unsupported samples base -> now |", "|---|---|---|---|"]
        for p, e in r["profiles"].items():
            b, c = e["transition"]["baseline"], e["transition"]["current"]
            L.append(f"| {p} | {_f(b['share_above_0.05'])} -> {_f(c['share_above_0.05'])} | {_f(b['max'])} -> {_f(c['max'])} | "
                     f"{b['unsupported_samples']} -> {c['unsupported_samples']} |")
        L += ["", "### 6. Mean pulse strength by beat in bar (measurements untouched)", ""]
        for p, e in r["profiles"].items():
            L.append(f"- **{p}**: baseline {e['pulse_by_beat_position']['baseline']} -> current {e['pulse_by_beat_position']['current']}")
        if reg["quiet"]:
            L += ["", "### Quiet passage (middle / main level, lower = deeper reduction)", "",
                  "| channel | " + " | ".join(f"{p} base -> now" for p in r["profiles"]) + " |",
                  "|---|" + "---|" * len(r["profiles"])]
            for ch in ("intensity", "scale", "motion_weight", "pulse_strength", "density"):
                cells = []
                for p, e in r["profiles"].items():
                    b, c = e["quiet_ratios"]["baseline"].get(ch), e["quiet_ratios"]["current"].get(ch)
                    cells.append(f"{_f(b)} -> {_f(c)}")
                L.append(f"| {ch} | " + " | ".join(cells) + " |")
        L.append("")
    return "\n".join(L)


def write_report(analyses: list[str | Path], out_md: Path, baseline: str = BASELINE_DIR) -> tuple[Path, Path]:
    results = [compare_song(Path(a), baseline) for a in analyses]
    out_md.write_text(markdown(results), encoding="utf-8")
    out_json = out_md.with_suffix(".json")
    out_json.write_text(json.dumps(results, indent=2, default=lambda o: list(o) if isinstance(o, tuple) else str(o)), encoding="utf-8")
    return out_md, out_json
