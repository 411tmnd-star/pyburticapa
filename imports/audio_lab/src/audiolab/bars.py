"""Group detected beats into bars.

The meter and downbeat are settings, not detections: `downbeat_offset` is the 0-based index of the
detected beat treated as beat one. Beats before it form a pickup (negative bar index), and the
counting continues backwards so every beat still gets a number.
"""

from __future__ import annotations

from dataclasses import dataclass

import numpy as np


@dataclass
class BarGrid:
    beats_per_bar: int
    downbeat_offset: int
    beat_in_bar: np.ndarray  # 1..beats_per_bar for every beat
    bar_index: np.ndarray  # 0 for the first full bar; negative for a pickup before it
    is_downbeat: np.ndarray  # bool
    downbeat_times: np.ndarray  # bar start times

    def bars(self, duration: float) -> list[dict]:
        """Bar spans [start, end); the last bar ends at the song's end."""
        starts = self.downbeat_times
        ends = np.append(starts[1:], duration)
        first = int(self.bar_index[self.is_downbeat][0]) if len(starts) else 0
        return [
            {"index": first + i, "start": float(s), "end": float(e)}
            for i, (s, e) in enumerate(zip(starts, ends))
        ]


def build_bars(
    beat_times: np.ndarray, beats_per_bar: int = 4, downbeat_offset: int = 0
) -> BarGrid:
    if beats_per_bar < 1:
        raise ValueError("beats_per_bar must be at least 1")
    n = len(beat_times)
    rel = np.arange(n) - int(downbeat_offset)
    beat_in_bar = (rel % beats_per_bar + 1).astype(int)
    bar_index = (rel // beats_per_bar).astype(int)
    is_downbeat = beat_in_bar == 1
    return BarGrid(
        beats_per_bar=beats_per_bar,
        downbeat_offset=int(downbeat_offset),
        beat_in_bar=beat_in_bar,
        bar_index=bar_index,
        is_downbeat=is_downbeat,
        downbeat_times=np.asarray(beat_times)[is_downbeat],
    )


def downbeat_hint(
    onset_env: np.ndarray, beat_times: np.ndarray, sr: int, hop_length: int, beats_per_bar: int
) -> dict:
    """Which beat phase carries the most onset energy, as a starting guess for the offset.

    Beat one often has the strongest hit, but not always, so this is a hint to check by ear, not a
    detection. `scores[k]` is the mean onset strength on beats whose index is congruent to k.
    """
    frames = np.round(np.asarray(beat_times) * sr / hop_length).astype(int)
    frames = np.clip(frames, 0, len(onset_env) - 1)
    strength = onset_env[frames]
    scores = [
        float(np.mean(strength[k::beats_per_bar])) if len(strength[k::beats_per_bar]) else 0.0
        for k in range(beats_per_bar)
    ]
    mean = float(np.mean(scores)) or 1.0
    scores = [s / mean for s in scores]
    return {"suggested_offset": int(np.argmax(scores)), "scores": scores}
