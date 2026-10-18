"""Discrete events: onsets and loud segments, written to events.json."""

from __future__ import annotations

import librosa
import numpy as np

from audiolab.config import EventConfig


def detect_events(
    features: dict[str, np.ndarray], sr: int, hop_length: int, cfg: EventConfig
) -> list[dict]:
    times = features["times"]
    onset_env = features["onset_env"]

    onset_times = librosa.onset.onset_detect(
        onset_envelope=onset_env,
        sr=sr,
        hop_length=hop_length,
        delta=cfg.onset_delta,
        units="time",
    )

    events: list[dict] = []
    last_t = -np.inf
    for t in onset_times:
        if t - last_t < cfg.min_gap_s:
            continue
        frame = min(int(round(t * sr / hop_length)), len(onset_env) - 1)
        events.append({"type": "onset", "time": float(t), "strength": float(onset_env[frame])})
        last_t = t

    events.extend(
        detect_loud_segments(features["rms_db"], features["times"], sr / hop_length, cfg)
    )

    events.sort(key=lambda ev: ev.get("time", ev.get("start", 0.0)))
    return events


def detect_loud_segments(
    rms_db: np.ndarray, times: np.ndarray, frame_rate: float, cfg: EventConfig
) -> list[dict]:
    """Loud segments with hysteresis, gap merging and a minimum duration.

    A segment opens when loudness rises above `loud_threshold_db` and closes only when it falls
    below `loud_threshold_db - loud_hysteresis_db`, so a level hovering near the threshold does not
    flicker. Segments separated by less than `loud_merge_gap_s` are joined, and segments shorter
    than `loud_min_duration_s` are dropped.
    """
    on_db = cfg.loud_threshold_db
    off_db = on_db - cfg.loud_hysteresis_db

    runs: list[list[int]] = []  # [first_frame, last_frame] inclusive
    start = None
    for i, level in enumerate(rms_db):
        if start is None:
            if level > on_db:
                start = i
        elif level < off_db:
            runs.append([start, i - 1])
            start = None
    if start is not None:
        runs.append([start, len(rms_db) - 1])

    merge_frames = cfg.loud_merge_gap_s * frame_rate
    merged: list[list[int]] = []
    for run in runs:
        if merged and run[0] - merged[-1][1] - 1 < merge_frames:
            merged[-1][1] = run[1]
        else:
            merged.append(run)

    segments = []
    for s_, e_ in merged:
        if (e_ - s_ + 1) / frame_rate < cfg.loud_min_duration_s:
            continue
        segments.append(
            {
                "type": "loud_segment",
                "start": float(times[s_]),
                "end": float(times[e_]),
                "peak_db": float(np.max(rms_db[s_ : e_ + 1])),
            }
        )
    return segments
