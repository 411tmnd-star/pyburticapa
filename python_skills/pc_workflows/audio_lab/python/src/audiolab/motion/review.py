"""Review tools for motion timelines: plots, a summary, timing checks and a comparison report."""

from __future__ import annotations

import collections
import json
from dataclasses import dataclass
from pathlib import Path

import numpy as np
from matplotlib.figure import Figure

from audiolab.interpretation.context import AnalysisContext
from audiolab.interpretation.engine import load_interpretation
from audiolab.motion import schema as ms
from audiolab.motion.engine import output_paths
from audiolab.motion.validate import load_arrays, load_timeline
from audiolab.motion.vocabulary import SCENE_STATES

STATE_COLORS = {"rest": "#cfd8dc", "build": "#ffe082", "active": "#a5d6a7", "settle": "#b39ddb"}
PRIM_COLORS = {"pulse": "#455a64", "burst": "#e63946", "transition_out": "#6a4c93", "transition_in": "#2a9d8f",
               "drift": "#999999", "sway": "#999999", "hold": "#999999"}
PROFILES = ("balanced", "bass_pulse", "cinematic")


@dataclass
class Loaded:
    profile: str
    path: Path
    model: ms.MotionTimeline
    arrays: dict[str, np.ndarray]


@dataclass
class Song:
    name: str
    ctx: AnalysisContext
    interp: object | None
    plans: dict[str, Loaded]
    folder: Path


def load_song(analysis_path: str | Path, profiles=PROFILES) -> Song:
    analysis_path = Path(analysis_path)
    ctx = AnalysisContext(analysis_path)
    ip = analysis_path.parent / "song_interpretation.json"
    plans = {}
    for p in profiles:
        j, _ = output_paths(analysis_path.parent / "visual" / f"visual_mapping.{p}.json")
        if j.exists():
            m = load_timeline(j)
            plans[p] = Loaded(p, j, m, load_arrays(m, j))
    return Song(analysis_path.parent.name, ctx, load_interpretation(ip) if ip.exists() else None, plans, analysis_path.parent / "plots")


def focus_time(song: Song) -> float:
    """The strongest transition candidate in the interpretation, else 6 s after the first beat."""
    if song.interp is not None:
        cands = [i for i in song.interp.interpretations if i.label == "transition_candidate"]
        if cands:
            return max(cands, key=lambda i: (i.attributes.get("channels_changed", 0), -i.start_s)).start_s
    return float(song.ctx.beat_times[0] + 6.0) if len(song.ctx.beat_times) else 6.0


# ---- summaries ---------------------------------------------------------------------------------


def summary(m: ms.MotionTimeline) -> dict:
    occ = collections.Counter()
    for s in m.states:
        occ[s.state] += s.end_s - s.start_s
    scheduled = [a for a in m.actions if a.status == "scheduled"]
    by = collections.Counter((a.track, a.primitive) for a in scheduled)
    ant = [a for a in scheduled if a.policy == "anticipatory"]
    return {
        "states": len(m.states),
        "state_changes_per_min": round(len(m.states) / (m.timebase.duration_s / 60), 1),
        "occupancy": {s: round(occ[s] / m.timebase.duration_s, 3) for s in SCENE_STATES},
        "actions_scheduled": len(scheduled),
        "actions_suppressed": len(m.actions) - len(scheduled),
        "by_track_primitive": {f"{t}.{p}": n for (t, p), n in sorted(by.items())},
        "anticipatory": len(ant),
        "max_lookahead_s": round(max((a.lookahead_s for a in scheduled), default=0.0), 3),
        "max_required_lookahead_s": round(max((a.lookahead_s + a.channel_lookahead_s for a in scheduled), default=0.0), 3),
        "constraints": {f"{c.track}.{c.property}": {"clamped": c.n_clamped_samples, "rate_limited": c.n_rate_limited_samples}
                        for c in m.constraints if c.n_clamped_samples or c.n_rate_limited_samples},
        "conflicts": {f"{r.track}.{r.property}": {"combine": r.combine, "overlap_samples": r.n_overlap_samples,
                                                  "max_simultaneous": r.max_simultaneous, "suppressed": r.n_suppressed}
                      for r in m.resolutions if r.n_overlap_samples or r.n_suppressed},
        "skipped_rules": [s.id for s in m.skipped_rules],
    }


def timing_checks(loaded: Loaded) -> dict:
    """Does the sampled property curve peak where the plan says? Only actions that dominate their
    property are measured: priority-combined properties, where no scheduled action of equal or higher
    priority overlaps (a continuous follower or an added contribution would hide the peak)."""
    m, a = loaded.model, loaded.arrays
    t = a["times"]
    combine = {(tr.name, p.name): p.combine for tr in m.tracks for p in tr.properties}
    sched = [x for x in m.actions if x.status == "scheduled"]
    errors, skipped = [], 0
    for act in sched:
        if act.kind != "event" or act.primitive == "pulse" or combine[(act.track, act.property)] != "priority":
            continue
        rivals = [o for o in sched if o.id != act.id and (o.track, o.property) == (act.track, act.property)
                  and o.priority >= act.priority and o.start_s < act.end_s and act.start_s < o.end_s]
        if rivals or act.start_s < 0 or act.end_s > m.timebase.duration_s:
            skipped += 1
            continue
        lo, hi = np.searchsorted(t, act.start_s), np.searchsorted(t, act.end_s, side="right")
        key = f"prop__{act.track}__{act.property}"
        if hi - lo < 3:
            continue
        # With a hold the curve is flat at the top, so any sample on the plateau is correct.
        x = a[key][lo:hi]
        top = np.flatnonzero(x >= x.max() - 1e-9)
        k = lo + top[np.argmin(np.abs(t[lo + top] - act.peak_s))]
        errors.append(abs(t[k] - act.peak_s) * 1000)
    return {
        "dominant_event_peak_error_ms_max": round(max(errors), 1) if errors else None,
        "one_sample_ms": round(1000 / m.timebase.rate_hz, 1),
        "n_checked": len(errors),
        "n_not_isolated": skipped,
    }


def around(m: ms.MotionTimeline, t0: float, span_s: float = 3.0) -> list[ms.Action]:
    return [a for a in m.actions if a.kind == "event" and a.status == "scheduled" and a.primitive != "pulse"
            and a.start_s - 0.01 <= t0 + span_s and a.end_s >= t0 - span_s]


def inspect(m: ms.MotionTimeline, arrays, at: float | None = None, top: int = 12) -> list[str]:
    s = summary(m)
    L = [f"profile {m.sources.profile_name} v{m.sources.profile_version} | config {m.config.name} v{m.config.version} "
         f"| {m.timebase.n_samples} samples at {m.timebase.rate_hz:g} Hz",
         f"scene: {s['states']} states ({s['state_changes_per_min']}/min), occupancy {s['occupancy']}"]
    for sp in m.states[: max(top, 1)]:
        L.append(f"   {sp.id} {sp.state:<7} {sp.start_s:7.2f}-{sp.end_s:7.2f}s  {sp.enter_reason}")
    if len(m.states) > top:
        L.append(f"   ... {len(m.states) - top} more")
    L.append(f"actions: {s['actions_scheduled']} scheduled, {s['actions_suppressed']} suppressed, {s['anticipatory']} anticipatory "
             f"(max lookahead {s['max_lookahead_s']} s; with channel lookahead {s['max_required_lookahead_s']} s)")
    for k, v in s["by_track_primitive"].items():
        L.append(f"   {k}: {v}")
    if s["constraints"]:
        L.append(f"constraints applied: {s['constraints']}")
    if s["conflicts"]:
        L.append(f"overlaps: {s['conflicts']}")
    for tr in m.tracks:
        for p in tr.properties:
            x = arrays[p.array_key]
            L.append(f"   {tr.name}.{p.name:<12} mean {p.mean:.2f} p95 {p.p95:.2f} max {p.max:.2f} (limit {p.amplitude_max:g}, {p.combine})")
    t0 = at
    if t0 is not None:
        L.append(f"event actions around {t0:.2f} s (source time -> start / peak / settle / end):")
        for a in around(m, t0):
            L.append(f"   {a.id:<46} {a.policy:<12} source {a.source_time_s:.3f} -> {a.start_s:.3f} / {a.peak_s:.3f} / {a.settle_s:.3f} / {a.end_s:.3f} "
                     f"amp {a.amplitude:.2f} lookahead {a.lookahead_s:.2f}s")
    return L


# ---- plots -------------------------------------------------------------------------------------


def _source_panel(ax, song: Song, window):
    ctx, t = song.ctx, song.ctx.times
    ax.plot(t, ctx.smoothed_db("rms_db", 0.5), color="#264653", lw=0.9, label="loudness (0.5 s)")
    if ctx.has_curve("band_bass_db"):
        ax.plot(t, ctx.curve("band_bass_db"), color="#e63946", lw=0.5, alpha=0.55, label="bass band")
    ax.set_ylim(-60, 3)
    ax.set_ylabel("dB")
    ax.legend(loc="lower right", fontsize=7, ncol=2)
    ax.set_title("Source: loudness and bass band", fontsize=9)


def plot_timeline(song: Song, loaded: Loaded, out_path: Path, window=None) -> None:
    m, a = loaded.model, loaded.arrays
    dur = m.timebase.duration_s
    window = window or (0.0, dur)
    zoom = window != (0.0, dur)
    fig = Figure(figsize=(15, 14), dpi=105)
    gs = fig.add_gridspec(6, 1, height_ratios=[1.0, 1.1, 1.6, 1.6, 1.6, 1.6], hspace=0.35)
    axes = [fig.add_subplot(gs[0])] + [fig.add_subplot(gs[i], sharex=None) for i in range(1, 6)]
    for ax in axes:
        ax.set_xlim(*window)
    _source_panel(axes[0], song, window)

    ax = axes[1]
    for s in m.states:
        ax.axvspan(s.start_s, s.end_s, color=STATE_COLORS[s.state], alpha=0.85, lw=0)
        if s.end_s - s.start_s > (window[1] - window[0]) / 30:
            ax.text((s.start_s + s.end_s) / 2, 0.9, s.state, ha="center", va="top", fontsize=7)
    ax.plot(a["times"], a["scene_level"], color="#222", lw=1.0)
    cfg = m.config.spec["scene"]
    for key in ("active_enter", "active_exit", "rest_exit", "rest_enter"):
        ax.axhline(cfg[key], color="#666", lw=0.5, ls=":")
    ax.set_ylim(0, 1.05)
    ax.set_title(f"Scene state ({m.config.spec['scene']['signal']} level, dotted = thresholds)", fontsize=9)

    # Beat and bar guides
    for ax in axes[2:]:
        if zoom:
            for b in song.ctx.beats:
                if window[0] <= b.time_s <= window[1]:
                    ax.axvline(b.time_s, color="#dddddd" if not b.is_downbeat else "#aaaaaa", lw=0.5 if not b.is_downbeat else 0.9, zorder=0)

    for ax, tr in zip(axes[2:], m.tracks):
        colors = ["#264653", "#e76f51", "#2a9d8f"]
        for ci, p in enumerate(tr.properties):
            ax.plot(a["times"], a[p.array_key], lw=1.0, color=colors[ci % 3], label=f"{p.name} ({p.combine})")
        ax.set_ylim(-0.3, 1.08)
        ax.axhline(0, color="#888", lw=0.4)
        ax.set_title(f"{tr.name}: property curves (lines) and actions (bars below)", fontsize=9)
        ax.legend(loc="upper right", fontsize=7, ncol=3)
        rows = {p.name: -0.07 - 0.07 * i for i, p in enumerate(tr.properties)}
        for act in m.actions:
            if act.track != tr.name or act.status != "scheduled" or act.kind != "event":
                continue
            if act.end_s < window[0] or act.start_s > window[1]:
                continue
            y = rows[act.property]
            if not zoom and act.primitive == "pulse":
                ax.plot([act.source_time_s], [y], "|", color=PRIM_COLORS["pulse"], ms=4, alpha=0.5)
                continue
            col = PRIM_COLORS.get(act.primitive, "#555")
            ax.plot([act.start_s, act.end_s], [y, y], color=col, lw=3 if act.primitive != "pulse" else 2, solid_capstyle="butt", alpha=0.9)
            ax.plot([act.peak_s], [y], "o", color=col, ms=4)
            ax.plot([act.source_time_s], [y], "k|", ms=9, mew=1.2)
        for act in m.actions:
            if act.track == tr.name and act.kind == "continuous" and act.status == "scheduled" and act.end_s >= window[0] and act.start_s <= window[1]:
                ax.plot([act.start_s, act.end_s], [-0.28, -0.28], color="#bbbbbb", lw=2)
    axes[-1].set_xlabel("time (s)   |  bars: start -> end of an event action, dot = peak, black tick = source time (the musical event); grey = continuous span")
    fig.suptitle(
        f"{song.name} - motion timeline for profile {loaded.profile}"
        + (f" - zoom {window[0]:.1f}-{window[1]:.1f} s" if zoom else ""), fontsize=11)
    fig.subplots_adjust(top=0.95, bottom=0.05, left=0.07, right=0.98)
    fig.savefig(out_path)


def plot_compare_states(song: Song, out_path: Path) -> None:
    fig = Figure(figsize=(15, 2 + 0.9 * len(song.plans)), dpi=105)
    axes = fig.subplots(len(song.plans) + 1, 1, sharex=True)
    _source_panel(axes[0], song, None)
    for ax, (prof, ld) in zip(axes[1:], song.plans.items()):
        for s in ld.model.states:
            ax.axvspan(s.start_s, s.end_s, color=STATE_COLORS[s.state], lw=0)
        ax.plot(ld.arrays["times"], ld.arrays["scene_level"], color="#222", lw=0.9)
        for a in ld.model.actions:
            if a.status == "scheduled" and a.primitive == "burst" and a.track == "main_element":
                ax.axvline(a.source_time_s, color="#e63946", lw=1.0)
        ax.set_ylim(0, 1.05)
        ax.set_ylabel(prof, rotation=0, ha="right", fontsize=8)
    axes[-1].set_xlabel("time (s)   |  coloured = scene state, line = state level, red = main_element bursts")
    fig.suptitle(f"{song.name} - scene states by profile (rest grey, build yellow, active green, settle purple)", fontsize=10)
    fig.tight_layout()
    fig.savefig(out_path)


def write_plots(song: Song, window=None) -> list[Path]:
    song.folder.mkdir(exist_ok=True)
    zoom = window or (max(0.0, focus_time(song) - 4.0), min(song.ctx.duration, focus_time(song) + 8.0))
    out = []
    for prof, ld in song.plans.items():
        for suffix, w in (("", None), ("_zoom", zoom)):
            p = song.folder / f"motion_{prof}{suffix}.png"
            plot_timeline(song, ld, p, w)
            out.append(p)
    p = song.folder / "motion_states.png"
    plot_compare_states(song, p)
    return out + [p]


# ---- report ------------------------------------------------------------------------------------


def write_report(songs: list[Song], out_md: Path) -> tuple[Path, Path]:
    L = ["# Motion timeline review", "",
         "Generated by `audiolab motion run`. A motion timeline is a plan on abstract tracks, not a rendering. "
         "Values are in [0, 1] and are not comparable across songs. Larger is not better.", ""]
    data = []
    for s in songs:
        L += [f"## {s.name}", ""]
        entry = {"song": s.name, "focus_time_s": round(focus_time(s), 3), "profiles": {}}
        L += ["| profile | states (per min) | rest / build / active / settle | actions | suppressed | anticipatory | max lookahead (s) | channel lookahead incl. (s) |",
              "|---|---|---|---|---|---|---|---|"]
        for prof, ld in s.plans.items():
            sm = summary(ld.model)
            entry["profiles"][prof] = {"summary": sm, "timing": timing_checks(ld)}
            o = sm["occupancy"]
            L.append(f"| {prof} | {sm['states']} ({sm['state_changes_per_min']}) | {o['rest']:.2f} / {o['build']:.2f} / {o['active']:.2f} / {o['settle']:.2f} "
                     f"| {sm['actions_scheduled']} | {sm['actions_suppressed']} | {sm['anticipatory']} | {sm['max_lookahead_s']} | {sm['max_required_lookahead_s']} |")
        L += ["", "### Property activity (mean / p95 / max)", "",
              "| property | " + " | ".join(s.plans) + " |", "|---|" + "---|" * len(s.plans)]
        first = next(iter(s.plans.values()))
        for tr in first.model.tracks:
            for p in tr.properties:
                cells = []
                for ld in s.plans.values():
                    rec = next(q for t in ld.model.tracks if t.name == tr.name for q in t.properties if q.name == p.name)
                    cells.append(f"{rec.mean:.2f} / {rec.p95:.2f} / {rec.max:.2f}")
                L.append(f"| {tr.name}.{p.name} ({p.combine}) | " + " | ".join(cells) + " |")
        L += ["", "### Transition actions (source time, start -> peak -> end)", ""]
        for prof, ld in s.plans.items():
            tr = [a for a in ld.model.actions if a.rule_id == "transition_burst" and a.status == "scheduled"]
            L.append(f"- **{prof}**: " + ("; ".join(f"{a.source_time_s:.2f}s ({a.time_basis}): {a.start_s:.2f} -> {a.peak_s:.2f} -> {a.end_s:.2f}, "
                                                   f"amp {a.amplitude:.2f}, from {', '.join(a.causes.source_ids) or 'a sampled channel peak'}" for a in tr) or "none"))
        L += ["", "### Timing and constraints", ""]
        for prof, ld in s.plans.items():
            tm, sm = entry["profiles"][prof]["timing"], entry["profiles"][prof]["summary"]
            L.append(f"- **{prof}**: dominant burst/transition peaks on the sampled curve land within {tm['dominant_event_peak_error_ms_max']} ms of their planned peak "
                     f"({tm['n_checked']} checked, {tm['n_not_isolated']} skipped as overlapped; one sample is {tm['one_sample_ms']} ms); constraints applied: {sm['constraints'] or 'none'}; "
                     f"overlapping properties: {sm['conflicts'] or 'none'}; skipped rules: {sm['skipped_rules'] or 'none'}")
        L.append("")
        data.append(entry)
    out_md.write_text("\n".join(L), encoding="utf-8")
    out_js = out_md.with_suffix(".json")
    out_js.write_text(json.dumps(data, indent=2), encoding="utf-8")
    return out_md, out_js
