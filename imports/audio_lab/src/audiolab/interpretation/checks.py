"""Checks that test a claim about a song against its analysis, outside the label vocabulary.

These are for human review of observations such as "the bass bursts line up with the bars". They
report numbers, including the rate you would see by chance, and do not create interpretations.
"""

from __future__ import annotations

import numpy as np

from audiolab.interpretation.context import AnalysisContext


def bass_burst_alignment(
    ctx: AnalysisContext,
    rise_db: float = 15.0,
    rise_within_s: float = 0.15,
    min_level_db: float = -30.0,
    tolerance_s: float = 0.1,
) -> dict:
    """Where do sudden rises in bass energy fall relative to the beat and bar grid?

    A burst is a rise of at least `rise_db` within `rise_within_s` that ends at least
    `min_level_db` loud (dB re the loudest frame). Its time is the steepest frame of the rise.
    Bursts are counted as aligned when within `tolerance_s` of a beat or downbeat. `chance_*` is
    the share you would expect if bursts fell at random times, so compare the two.
    """
    bass = ctx.curve("band_bass_db")
    k = max(1, int(round(rise_within_s * ctx.frame_rate)))
    refractory = max(k, int(round(0.5 * (ctx.beat_interval or 0.5) * ctx.frame_rate)))

    rise = np.full(len(bass), -np.inf)
    rise[k:] = bass[k:] - bass[:-k]
    qualifying = (rise >= rise_db) & (bass >= min_level_db)

    burst_frames: list[int] = []
    i = 0
    while i < len(bass):
        if qualifying[i]:
            window = np.diff(bass[max(0, i - k) : i + 1])
            steepest = max(0, i - k) + int(np.argmax(window)) + 1 if len(window) else i
            burst_frames.append(steepest)
            i += refractory
        else:
            i += 1
    burst_times = ctx.times[burst_frames] if burst_frames else np.array([])

    beats = ctx.beat_times
    downbeats = np.array([b.time_s for b in ctx.beats if b.is_downbeat])
    out = {
        "n_bursts": len(burst_times),
        "tolerance_s": tolerance_s,
        "within_downbeat": None, "within_any_beat": None,
        "chance_downbeat": None, "chance_any_beat": None,
        "by_beat_in_bar": {},
        "burst_times_s": [round(float(t), 3) for t in burst_times],
    }
    if len(burst_times) == 0 or len(beats) == 0 or len(downbeats) == 0:
        return out

    nearest_beat = np.abs(burst_times[:, None] - beats[None, :]).argmin(axis=1)
    dist_beat = np.abs(burst_times - beats[nearest_beat])
    dist_down = np.abs(burst_times[:, None] - downbeats[None, :]).min(axis=1)
    out["within_any_beat"] = float(np.mean(dist_beat <= tolerance_s))
    out["within_downbeat"] = float(np.mean(dist_down <= tolerance_s))
    out["chance_any_beat"] = float(min(1.0, 2 * tolerance_s / ctx.beat_interval))
    bar_len = float(np.median(np.diff(downbeats))) if len(downbeats) > 1 else ctx.beat_interval
    out["chance_downbeat"] = float(min(1.0, 2 * tolerance_s / bar_len))
    counts: dict[int, int] = {}
    for idx, d in zip(nearest_beat, dist_beat):
        if d <= tolerance_s:
            pos = ctx.beats[idx].beat_in_bar
            counts[pos] = counts.get(pos, 0) + 1
    out["by_beat_in_bar"] = {str(p): counts[p] for p in sorted(counts)}
    return out
