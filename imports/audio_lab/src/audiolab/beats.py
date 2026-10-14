"""Beat tracking on top of the onset envelope."""

from __future__ import annotations

import librosa
import numpy as np

from audiolab.config import BeatConfig


def detect_beats(
    onset_env: np.ndarray, sr: int, hop_length: int, cfg: BeatConfig
) -> dict[str, np.ndarray | float]:
    tempo, beat_frames = librosa.beat.beat_track(
        onset_envelope=onset_env,
        sr=sr,
        hop_length=hop_length,
        start_bpm=cfg.start_bpm,
        tightness=cfg.tightness,
    )
    return {
        "tempo": float(np.atleast_1d(tempo)[0]),
        "beat_times": librosa.frames_to_time(beat_frames, sr=sr, hop_length=hop_length),
    }
