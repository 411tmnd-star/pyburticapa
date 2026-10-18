"""Review tools for visual mappings: plots, statistics, timing checks and a comparison report.

Everything here reads written artifacts (mapping JSON + npz, analysis, interpretation). Numbers are
descriptive: a profile with larger values is not "better", only louder in that channel.
"""

from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path

import numpy as np
from matplotlib.figure import Figure
from scipy.signal import find_peaks

from audiolab.interpretation.checks import bass_burst_alignment
from audiolab.interpretation.context import AnalysisContext
from audiolab.interpretation.engine import load_interpretation
from audiolab.visual_mapping.channels import CHANNELS
from audiolab.visual_mapping.engine import INTERPRETATION_FILE, output_paths
from audiolab.visual_mapping.schema import VisualMapping
from audiolab.visual_mapping.validate import load_arrays, load_mapping

PROFILE_COLORS = {"balanced": "#264653", "bass_pulse": "#e63946", "cinematic": "#4361ee"}
CHANGE_COLORS = {
    "bass_entry": "#e63946", "energy_drop": "#6a4c93", "rhythmic_density_change": "#00b4d8",
    "transition_candidate": "#222222",
}
PASSAGE_COLORS = {"high_energy_passage": "#e9c46a", "sparse_passage": "#4361ee", "energy_build": "#2a9d8f"}


@dataclass
class Loaded:
    profile: str
    path: Path
    model: VisualMapping
    arrays: dict[str, np.ndarray]


@dataclass
class Song:
    name: str
    analysis_path: Path
    ctx: AnalysisContext
    interp: object | None  # SongInterpretation
    mappings: dict[str, Loaded]


def load_song(analysis_path: str | Path, profiles: list[str]) -> Song:
    analysis_path = Path(analysis_path)
    ctx = AnalysisContext(analysis_path)
    ip = analysis_path.parent / INTERPRETATION_FILE
    interp = load_interpretation(ip) if ip.exists() else None
    mappings = {}
    for name in profiles:
        j, _ = output_paths(analysis_path, name)
        if j.exists():
            model = load_mapping(j)
            mappings[name] = Loaded(name, j, model, load_arrays(model, j))
    return Song(analysis_path.parent.name, analysis_path, ctx, interp, mappings)


# ---- windows and markers -----------------------------------------------------------------------


def focus_time(song: Song) -> float:
    """A data-chosen moment to zoom on: the transition candidate with the most changing channels,
    else the first bass entry, else 6 s after the first beat."""
    if song.interp is not None:
        cands = [i for i in song.interp.interpretations if i.label == "transition_candidate"]
        if cands:
            return max(cands, key=lambda i: (i.attributes.get("channels_changed", 0), -i.start_s)).start_s
        entries = [i for i in song.interp.interpretations if i.label == "bass_entry"]
        if entries:
            return entries[0].start_s
    return float(song.ctx.beat_times[0] + 6.0) if len(song.ctx.beat_times) else 6.0


def zoom_window(song: Song, half_s: float = 6.0) -> tuple[float, float]:
    t = focus_time(song)
    lo = max(0.0, t - half_s)
    return lo, min(song.ctx.duration, lo + 2 * half_s)


def _markers(ax, song: Song, window, with_beats: bool):
    lo, hi = window
    if with_beats:
        for b in song.ctx.beats:
            if lo <= b.time_s <= hi:
                ax.axvline(b.time_s, color="#cccccc" if not b.is_downbeat else "#999999",
                           lw=0.5 if not b.is_downbeat else 0.9, zorder=0)
    if song.interp is None:
        return
    for it in song.interp.interpretations:
        if it.kind == "change" and lo <= it.start_s <= hi:
            ax.axvline(it.start_s, color=CHANGE_COLORS.get(it.label, "#777"), lw=1.0,
                       ls="--" if it.label == "transition_candidate" else "-", alpha=0.8)


def _reference(ax, song: Song, window):
    ctx, t = song.ctx, song.ctx.times
    ax.plot(t, ctx.smoothed_db("rms_db", 0.5), color="#264653", lw=0.9, label="loudness (0.5 s)")
    if ctx.has_curve("band_bass_db"):
        ax.plot(t, ctx.curve("band_bass_db"), color="#e63946", lw=0.5, alpha=0.6, label="bass band")
    if song.interp is not None:
        for it in song.interp.interpretations:
            if it.kind == "passage":
                ax.axvspan(it.start_s, it.end_s, color=PASSAGE_COLORS.get(it.label, "#bbb"), alpha=0.2, lw=0)
    ax.set_ylim(-60, 3)
    ax.set_ylabel("dB")
    ax.set_title("Source: loudness and bass band (shaded = interpretation passages; lines = changes)", fontsize=9)
    ax.legend(loc="lower right", fontsize=7, ncol=2)


# ---- plots -------------------------------------------------------------------------------------


def plot_profile(song: Song, loaded: Loaded, out_path: Path, window=None) -> None:
    window = window or (0.0, song.ctx.duration)
    zoom = window != (0.0, song.ctx.duration)
    names = [c.name for c in loaded.model.channels]
    fig = Figure(figsize=(15, 2 + 1.35 * len(names)), dpi=110)
    axes = fig.subplots(len(names) + 1, 1, sharex=True)
    _reference(axes[0], song, window)
    _markers(axes[0], song, window, zoom)
    t = loaded.arrays["times"]
    for ax, c in zip(axes[1:], loaded.model.channels):
        if c.status != "available":
            ax.text(0.5, 0.5, f"{c.name}: unavailable ({c.reason})", transform=ax.transAxes, ha="center", fontsize=8)
            continue
        x, v = loaded.arrays[c.name], loaded.arrays[c.valid_key]
        ax.fill_between(t, 0, 1, where=~v, color="#f4a261", alpha=0.15, lw=0, step="mid")
        ax.plot(t, x, color=PROFILE_COLORS.get(loaded.profile, "#333"), lw=0.9)
        ax.set_ylim(-0.03, 1.05)
        ax.set_ylabel(c.name, fontsize=8, rotation=0, ha="right", va="center")
        _markers(ax, song, window, zoom)
    axes[-1].set_xlabel("time (s)")
    axes[0].set_xlim(*window)
    fig.suptitle(
        f"{song.name} - profile {loaded.profile} - channels in [0, 1] (orange = no valid input)"
        + (f" - zoom {window[0]:.1f}-{window[1]:.1f} s (grey = beats, darker = bar starts)" if zoom else ""),
        fontsize=10,
    )
    fig.tight_layout()
    fig.savefig(out_path)


def plot_compare(song: Song, out_path: Path, window=None) -> None:
    window = window or (0.0, song.ctx.duration)
    zoom = window != (0.0, song.ctx.duration)
    names = [c for c in CHANNELS if any(
        any(ch.name == c and ch.status == "available" for ch in m.model.channels) for m in song.mappings.values()
    )]
    fig = Figure(figsize=(15, 2 + 1.35 * len(names)), dpi=110)
    axes = fig.subplots(len(names) + 1, 1, sharex=True)
    _reference(axes[0], song, window)
    _markers(axes[0], song, window, zoom)
    for ax, name in zip(axes[1:], names):
        for prof, loaded in song.mappings.items():
            if name in loaded.arrays:
                ax.plot(loaded.arrays["times"], loaded.arrays[name], lw=0.9, label=prof,
                        color=PROFILE_COLORS.get(prof, None), alpha=0.85)
        ax.set_ylim(-0.03, 1.05)
        ax.set_ylabel(name, fontsize=8, rotation=0, ha="right", va="center")
        _markers(ax, song, window, zoom)
    axes[1].legend(loc="upper right", fontsize=7, ncol=3)
    axes[-1].set_xlabel("time (s)")
    axes[0].set_xlim(*window)
    fig.suptitle(f"{song.name} - profiles compared" + (f" - zoom {window[0]:.1f}-{window[1]:.1f} s" if zoom else ""), fontsize=10)
    fig.tight_layout()
    fig.savefig(out_path)


def write_plots(song: Song, window=None) -> list[Path]:
    plots = song.analysis_path.parent / "plots"
    plots.mkdir(exist_ok=True)
    zoom = window or zoom_window(song)
    written = []
    for prof, loaded in song.mappings.items():
        for suffix, w in (("", None), ("_zoom", zoom)):
            p = plots / f"visual_{prof}{suffix}.png"
            plot_profile(song, loaded, p, w)
            written.append(p)
    for suffix, w in (("", None), ("_zoom", zoom)):
        p = plots / f"visual_compare{suffix}.png"
        plot_compare(song, p, w)
        written.append(p)
    return written


# ---- statistics --------------------------------------------------------------------------------


def channel_stats(loaded: Loaded) -> dict[str, dict]:
    rate = loaded.model.timebase.rate_hz
    out = {}
    for c in loaded.model.channels:
        if c.status != "available":
            out[c.name] = {"status": "unavailable", "reason": c.reason}
            continue
        x = loaded.arrays[c.name]
        peaks, _ = find_peaks(x, prominence=0.2)
        out[c.name] = {
            "mean": float(x.mean()), "p95": float(np.percentile(x, 95)), "max": float(x.max()),
            "std": float(x.std()), "activity_per_s": float(np.mean(np.abs(np.diff(x))) * rate),
            "peaks": int(len(peaks)), "share_above_0.8": float(np.mean(x > 0.8)),
            "share_saturated": float(np.mean(x >= 0.99)), "coverage": c.coverage,
        }
    return out


def contributions(loaded: Loaded, channel: str) -> dict[str, float]:
    """How much each rule drove a channel. weighted_mean/sum: share of the summed weighted input.
    max: share of samples where that rule was the largest weighted input."""
    c = next(ch for ch in loaded.model.channels if ch.name == channel)
    rules = [r for r in loaded.model.rules if r.channel == channel and r.status == "applied"]
    if not rules:
        return {}
    x = np.vstack([r.weight * loaded.arrays[r.array_key] * loaded.arrays[r.valid_key] for r in rules])
    if c.combine == "max":
        active = x.max(axis=0) > 0.01
        if not active.any():
            return {r.id: 0.0 for r in rules}
        winner = x[:, active].argmax(axis=0)
        return {r.id: float(np.mean(winner == i)) for i, r in enumerate(rules)}
    total = x.sum()
    return {r.id: float(x[i].sum() / total) if total > 0 else 0.0 for i, r in enumerate(rules)}


def _resp(loaded: Loaded) -> list[dict]:
    a = loaded.arrays
    cols = loaded.model.responses.columns
    return [dict(zip(cols, row)) for row in zip(*(a[f"resp__{c}"].tolist() for c in cols))]


def timing_checks(song: Song, loaded: Loaded) -> dict:
    """Is each response where it should be?

    response_peak_error_ms: for interpretation-driven responses, the sampled maximum of the rule
    signal near the intended peak, minus the intended peak. Bounded by the output sample spacing.
    channel_lag_s: for transition_weight, where the channel itself peaks relative to each
    interpretation change it responds to (smoothing and other rules can move this).
    beat_pulse_offset_ms: median offset between beats and the nearest local maximum of
    pulse_strength within -100..+250 ms.
    """
    t = loaded.arrays["times"]
    rate = loaded.model.timebase.rate_hz
    rules = {r.id: r for r in loaded.model.rules}
    errors, lags = [], []
    for row in _resp(loaded):
        if row["source_kind"] != "interpretation":
            continue
        sig = loaded.arrays[rules[row["rule"]].array_key]
        lo, hi = np.searchsorted(t, row["start"] - 0.05), np.searchsorted(t, row["end"] + 0.05)
        if hi > lo and row["start"] >= 0 and row["end"] <= song.ctx.duration:
            k = lo + int(np.argmax(sig[lo:hi]))
            errors.append(abs(t[k] - row["peak"]) * 1000)
        if row["channel"] == "transition_weight" and "transition_weight" in loaded.arrays:
            ch = loaded.arrays["transition_weight"]
            lo, hi = np.searchsorted(t, row["source_time"] - 3.0), np.searchsorted(t, row["source_time"] + 3.0)
            if hi > lo:
                lags.append(round(float(t[lo + int(np.argmax(ch[lo:hi]))] - row["source_time"]), 3))
    offsets = []
    if "pulse_strength" in loaded.arrays:
        p = loaded.arrays["pulse_strength"]
        peaks, _ = find_peaks(p, prominence=0.05)
        pt = t[peaks]
        for b in song.ctx.beat_times:
            near = pt[(pt >= b - 0.1) & (pt <= b + 0.25)]
            if len(near):
                offsets.append((near[np.argmin(np.abs(near - b))] - b) * 1000)
    return {
        "response_peak_error_ms_max": round(max(errors), 2) if errors else None,
        "sample_interval_ms": round(1000.0 / rate, 2),
        "within_one_sample": all(e <= 1000.0 / rate + 1e-6 for e in errors),
        "n_interpretation_responses": len(errors),
        "transition_channel_lag_s": lags,
        "beat_pulse_offset_ms_median": round(float(np.median(offsets)), 1) if offsets else None,
        "beats_with_pulse_peak": f"{len(offsets)}/{len(song.ctx.beat_times)}",
    }


def contrast_around(song: Song, loaded: Loaded, t0: float, span_s: float = 8.0) -> dict:
    """Mean of each channel before and after t0 (excluding 0.5 s either side), and when each
    channel first crosses the midpoint between the two means after t0 - 1 s."""
    t = loaded.arrays["times"]
    before = (t >= max(0.0, t0 - span_s)) & (t < t0 - 0.5)
    after = (t > t0 + 0.5) & (t <= t0 + span_s)
    out = {}
    for c in loaded.model.channels:
        if c.status != "available" or not before.any() or not after.any():
            continue
        x = loaded.arrays[c.name]
        b, a = float(x[before].mean()), float(x[after].mean())
        mid = (a + b) / 2
        cross = None
        if abs(a - b) > 0.05:
            idx = np.flatnonzero((t >= t0 - 1.0) & ((x >= mid) if a > b else (x <= mid)))
            cross = round(float(t[idx[0]] - t0), 3) if len(idx) else None
        out[c.name] = {"before": round(b, 3), "after": round(a, 3), "midpoint_crossing_s": cross}
    return out


def burst_response(song: Song, loaded: Loaded, channels=("scale", "pulse_strength", "intensity", "motion_weight")) -> dict:
    """Share of bass bursts (found by the interpretation layer's check, from the analysis curves)
    that each channel answers with a rise of at least 0.1 within 150 ms."""
    if not song.ctx.has_curve("band_bass_db"):
        return {}
    bursts = np.asarray(bass_burst_alignment(song.ctx)["burst_times_s"])
    t = loaded.arrays["times"]
    out = {"n_bursts": int(len(bursts))}
    for name in channels:
        if name not in loaded.arrays or not len(bursts):
            continue
        x = loaded.arrays[name]
        hit = 0
        for b in bursts:
            pre = x[(t >= b - 0.1) & (t <= b)]
            post = x[(t >= b) & (t <= b + 0.15)]
            if len(pre) and len(post) and post.max() - pre.min() >= 0.1:
                hit += 1
        out[name] = round(hit / len(bursts), 3)
    return out


def pulse_by_beat_position(song: Song, loaded: Loaded) -> dict[str, float]:
    """Mean response strength of beat-driven pulse rules by position in the bar."""
    beat_pos = {b.id: b.beat_in_bar for b in song.ctx.beats}
    sums: dict[int, list[float]] = {}
    for row in _resp(loaded):
        if row["channel"] == "pulse_strength" and row["source_id"] in beat_pos:
            sums.setdefault(beat_pos[row["source_id"]], []).append(row["strength"])
    return {str(k): round(float(np.mean(v)), 3) for k, v in sorted(sums.items())}


def flags(stats: dict[str, dict], loaded: Loaded) -> list[str]:
    out = []
    for name, s in stats.items():
        if s.get("status") == "unavailable":
            out.append(f"{name} unavailable: {s['reason']}")
            continue
        if s["share_saturated"] > 0.15:
            out.append(f"{name} sits at >= 0.99 for {100 * s['share_saturated']:.0f}% of the song (saturating)")
        if s["std"] < 0.03:
            out.append(f"{name} barely moves (std {s['std']:.3f})")
        if s["coverage"] < 1.0:
            out.append(f"{name} has no valid input on {100 * (1 - s['coverage']):.1f}% of samples")
    for r in loaded.model.rules:
        if r.status == "skipped":
            out.append(f"rule {r.id} skipped: {r.reason}")
        for norm in (r.normalization, r.modulation_normalization):
            if norm and norm.degenerate:
                out.append(f"rule {r.id}: degenerate normalization (input has no range)")
        if r.status == "applied" and r.input.get("kind") == "interpretation" and r.n_responses == 0:
            out.append(f"rule {r.id}: the interpretation has no {r.input['label']} here, so it never fires")
        if r.status == "applied" and r.input.get("align") == "centered":
            ahead = r.input.get("smooth_s", 0) / 2 if r.input["kind"] == "feature" else r.input.get("window_s", 0) / 2
            if ahead > 0:
                out.append(f"rule {r.id}: centered over {2 * ahead:g} s, can respond up to {ahead:g} s before a change")
    return out


# ---- report ------------------------------------------------------------------------------------


def song_review(song: Song) -> dict:
    review = {"song": song.name, "profiles": {}}
    t0 = focus_time(song)
    review["focus_time_s"] = round(t0, 3)
    for prof, loaded in song.mappings.items():
        stats = channel_stats(loaded)
        review["profiles"][prof] = {
            "stats": stats,
            "contributions": {c.name: contributions(loaded, c.name) for c in loaded.model.channels if c.status == "available"},
            "timing": timing_checks(song, loaded),
            "contrast_at_focus": contrast_around(song, loaded, t0),
            "bass_burst_response": burst_response(song, loaded),
            "pulse_by_beat_position": pulse_by_beat_position(song, loaded),
            "flags": flags(stats, loaded),
        }
    return review


def _fmt(v, nd=2):
    return "-" if v is None else f"{v:.{nd}f}"


def report_markdown(reviews: list[dict], plots_rel: dict[str, str]) -> str:
    lines = [
        "# Visual mapping review",
        "",
        "Generated by `audiolab visual compare`. Channels are unitless controls in [0, 1], relative to "
        "each song and profile. Larger values are not better; they are only larger.",
        "",
    ]
    for rv in reviews:
        song = rv["song"]
        profs = list(rv["profiles"])
        lines += [f"## {song}", "", f"Plots: `{plots_rel[song]}/visual_compare.png`, "
                  f"`visual_compare_zoom.png` and `visual_<profile>[_zoom].png` in the same folder. "
                  f"Zoom centre (chosen from the interpretation): {rv['focus_time_s']:.2f} s.", ""]
        lines += ["### Channel statistics", "", "| channel | " + " | ".join(
            f"{p} mean / p95 / activity/s / peaks" for p in profs) + " |", "|---|" + "---|" * len(profs)]
        for ch in CHANNELS:
            cells = []
            for p in profs:
                s = rv["profiles"][p]["stats"].get(ch)
                cells.append("-" if not s or s.get("status") else
                             f"{s['mean']:.2f} / {s['p95']:.2f} / {s['activity_per_s']:.2f} / {s['peaks']}")
            lines.append(f"| {ch} | " + " | ".join(cells) + " |")
        lines += ["", "### What drives each channel", ""]
        for p in profs:
            parts = []
            for ch, shares in rv["profiles"][p]["contributions"].items():
                parts.append(f"{ch}: " + ", ".join(f"{k} {100 * v:.0f}%" for k, v in shares.items()))
            lines.append(f"- **{p}** - " + "; ".join(parts))
        lines += ["", "### Timing", ""]
        for p in profs:
            tm = rv["profiles"][p]["timing"]
            lines.append(
                f"- **{p}**: interpretation-driven responses peak within {_fmt(tm['response_peak_error_ms_max'], 1)} ms "
                f"of their intended time ({tm['n_interpretation_responses']} responses; one output sample is "
                f"{tm['sample_interval_ms']} ms; within one sample: {'yes' if tm['within_one_sample'] else 'NO'}); "
                f"transition_weight peaks at {tm['transition_channel_lag_s']} s from each change; "
                f"beat pulses peak a median {_fmt(tm['beat_pulse_offset_ms_median'], 1)} ms after the beat "
                f"({tm['beats_with_pulse_peak']} beats have a nearby pulse peak)."
            )
        lines += ["", f"### Around the focus time ({rv['focus_time_s']:.2f} s)", "",
                  "| channel | " + " | ".join(f"{p} before -> after (crossing s)" for p in profs) + " |",
                  "|---|" + "---|" * len(profs)]
        for ch in CHANNELS:
            cells = []
            for p in profs:
                c = rv["profiles"][p]["contrast_at_focus"].get(ch)
                cells.append("-" if not c else f"{c['before']:.2f} -> {c['after']:.2f} ({_fmt(c['midpoint_crossing_s'])})")
            lines.append(f"| {ch} | " + " | ".join(cells) + " |")
        lines += ["", "### Bass bursts and pulses", ""]
        for p in profs:
            b = rv["profiles"][p]["bass_burst_response"]
            pos = rv["profiles"][p]["pulse_by_beat_position"]
            lines.append(
                f"- **{p}**: of {b.get('n_bursts', 0)} bass bursts, share answered by a rise >= 0.1 within 150 ms: "
                + ", ".join(f"{k} {100 * v:.0f}%" for k, v in b.items() if k != "n_bursts")
                + (f"; mean pulse strength by beat in bar: {pos}" if pos else "")
            )
        lines += ["", "### Flags", ""]
        for p in profs:
            fl = rv["profiles"][p]["flags"]
            lines.append(f"- **{p}**: " + ("; ".join(fl) if fl else "none"))
        lines.append("")
    return "\n".join(lines)


def write_report(songs: list[Song], out_md: Path) -> tuple[Path, Path]:
    reviews = [song_review(s) for s in songs]
    rel = {s.name: Path(s.analysis_path.parent / "plots").relative_to(out_md.parent).as_posix()
           if (s.analysis_path.parent / "plots").is_relative_to(out_md.parent) else str(s.analysis_path.parent / "plots")
           for s in songs}
    out_md.write_text(report_markdown(reviews, rel), encoding="utf-8")
    out_json = out_md.with_suffix(".json")
    out_json.write_text(json.dumps(reviews, indent=2), encoding="utf-8")
    return out_md, out_json


def inspect(loaded_model: VisualMapping, arrays: dict[str, np.ndarray], channel: str | None, top: int) -> list[str]:
    t = arrays["times"]
    lines = [
        f"profile {loaded_model.profile.name} | {loaded_model.timebase.n_samples} samples at "
        f"{loaded_model.timebase.rate_hz:g} Hz | {loaded_model.responses.count} event responses",
    ]
    for c in loaded_model.channels:
        if channel and c.name != channel:
            continue
        if c.status != "available":
            lines.append(f"{c.name}: unavailable - {c.reason}")
            continue
        x = arrays[c.name]
        peaks, props = find_peaks(x, prominence=0.2)
        order = np.argsort(-props["prominences"])[:top] if len(peaks) else []
        rises = np.flatnonzero(np.diff(x) * loaded_model.timebase.rate_hz > 2.0)
        lines.append(
            f"{c.name}: min {x.min():.3f} max {x.max():.3f} mean {x.mean():.3f} coverage {c.coverage:.3f} "
            f"| rules {', '.join(c.rule_ids)}"
        )
        if len(order):
            lines.append("   top peaks (s, value): " + ", ".join(f"{t[peaks[i]]:.2f} ({x[peaks[i]]:.2f})" for i in sorted(order)))
        if len(rises):
            starts = rises[np.insert(np.diff(rises) > 1, 0, True)][:top]
            lines.append("   fastest rises begin at (s): " + ", ".join(f"{t[i]:.2f}" for i in starts))
    return lines
