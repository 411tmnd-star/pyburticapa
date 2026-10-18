"""Audible and numeric checks for beat tracking.

`render_click_track` mixes a click on every beat into the song so you can hear whether the
beats are right. `beat_diagnostics` gives numbers for the same question: how well beats line up
with onset-envelope peaks, and whether half or double tempo would fit better.
"""

from __future__ import annotations

from pathlib import Path

import librosa
import numpy as np
import soundfile as sf


def _click(sr: int, freq: float, length_s: float = 0.03) -> np.ndarray:
    t = np.arange(int(length_s * sr)) / sr
    return (np.sin(2 * np.pi * freq * t) * np.exp(-t * 150)).astype(np.float32)


def render_click_track(
    y: np.ndarray,
    sr: int,
    beat_times: np.ndarray,
    out_path: str | Path,
    downbeat_every: int = 0,
    gain: float = 0.8,
    accent_mask: np.ndarray | None = None,
) -> Path:
    """Write the song (left) and a click on each beat (right) as a stereo WAV.

    Putting the clicks on a separate channel lets you solo either one. If `downbeat_every` > 0,
    every Nth click (starting from the first beat) is higher pitched. `accent_mask` (one bool per
    beat) takes precedence: accented clicks are higher, louder and longer, the rest quieter.
    """
    clicks = np.zeros_like(y, dtype=np.float32)
    normal, accent = _click(sr, 1000.0), _click(sr, 1600.0)
    if accent_mask is not None:
        normal, accent = normal * 0.5, _click(sr, 1600.0, length_s=0.06)
    for i, t in enumerate(beat_times):
        start = int(round(t * sr))
        if accent_mask is not None:
            is_accent = bool(accent_mask[i])
        else:
            is_accent = bool(downbeat_every) and i % downbeat_every == 0
        burst = accent if is_accent else normal
        end = min(start + len(burst), len(clicks))
        if start < len(clicks):
            clicks[start:end] += burst[: end - start]
    peak = float(np.max(np.abs(y))) or 1.0
    stereo = np.stack([y / peak * 0.9, clicks * gain], axis=1)
    out_path = Path(out_path)
    sf.write(out_path, stereo, sr)
    return out_path


def beat_diagnostics(
    onset_env: np.ndarray, beat_times: np.ndarray, sr: int, hop_length: int
) -> dict[str, float]:
    """Numbers that say how trustworthy a beat grid is.

    - `beat_onset_ratio`: mean onset strength at beats / mean overall. About 1 means the beats
      are no better than random positions; clearly above 1 means they sit on real events.
    - `phase_peak_offset`: where, as a fraction of a beat, onset strength peaks relative to the
      detected beats. Near 0 is good; near 0.5 means the grid is a half-beat off.
    - `tempo_scores`: autocorrelation strength at half, 1x and double the detected beat period,
      as a hint to octave errors (a larger half or double score than 1x is a warning sign).
    """
    fps = sr / hop_length
    frames = np.round(beat_times * fps).astype(int)
    frames = frames[(frames >= 0) & (frames < len(onset_env))]
    mean_all = float(np.mean(onset_env)) or 1e-9
    ratio = float(np.mean(onset_env[frames])) / mean_all

    period = float(np.median(np.diff(beat_times))) * fps  # frames per beat
    offsets = np.linspace(-0.5, 0.5, 21)
    scores = []
    for off in offsets:
        idx = np.round(frames + off * period).astype(int)
        idx = idx[(idx >= 0) & (idx < len(onset_env))]
        scores.append(float(np.mean(onset_env[idx])))
    best_offset = float(offsets[int(np.argmax(scores))])

    ac = librosa.autocorrelate(onset_env - onset_env.mean())
    ac = ac / (ac[0] or 1.0)

    def at(lag: float) -> float:
        lo, hi = int(round(lag * 0.97)), int(round(lag * 1.03)) + 1
        return float(np.max(ac[lo : min(hi, len(ac))])) if lo < len(ac) else float("nan")

    return {
        "beat_onset_ratio": ratio,
        "phase_peak_offset": best_offset,
        "tempo_scores": {
            "half": at(period * 2),
            "detected": at(period),
            "double": at(period / 2),
        },
    }
