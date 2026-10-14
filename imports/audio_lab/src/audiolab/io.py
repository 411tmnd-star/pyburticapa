"""Reading audio and reading/writing per-song outputs."""

from __future__ import annotations

import json
from pathlib import Path

import librosa
import numpy as np

from audiolab.config import AudioConfig


def load_audio(path: str | Path, cfg: AudioConfig) -> tuple[np.ndarray, int]:
    """Load an audio file as a float32 array at cfg.sample_rate."""
    y, sr = librosa.load(str(path), sr=cfg.sample_rate, mono=cfg.mono)
    return y, sr


def song_output_dir(root: str | Path, song_path: str | Path) -> Path:
    """Return (and create) outputs/<song-stem>/ for a song."""
    out_dir = Path(root) / Path(song_path).stem
    out_dir.mkdir(parents=True, exist_ok=True)
    return out_dir


def save_analysis(path: str | Path, **arrays) -> None:
    np.savez(path, **arrays)


def load_analysis(path: str | Path) -> dict[str, np.ndarray]:
    with np.load(path) as f:
        return {k: f[k] for k in f.files}


def save_events(path: str | Path, events: list[dict]) -> None:
    Path(path).write_text(json.dumps(events, indent=2), encoding="utf-8")


def load_events(path: str | Path) -> list[dict]:
    return json.loads(Path(path).read_text(encoding="utf-8"))
