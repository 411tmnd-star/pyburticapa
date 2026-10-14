"""Section novelty: how much the music's character changes at each beat.

The curve measures change only. A high value says "something is different after this beat
compared with before it"; it does not say whether that is a chorus, a drop or a breakdown.

Method (Foote's checkerboard kernel): summarise each beat-long segment with timbre, harmony and
dynamics features, build a self-similarity matrix between segments, and slide a checkerboard
kernel along its diagonal. The kernel scores high where segments just before a point resemble
each other, segments just after resemble each other, and before differs from after.
"""

from __future__ import annotations

import librosa
import numpy as np

from audiolab.config import NoveltyConfig


def _zscore_rows(x: np.ndarray) -> np.ndarray:
    std = x.std(axis=1, keepdims=True)
    return (x - x.mean(axis=1, keepdims=True)) / np.where(std > 1e-9, std, 1.0)


def _checkerboard(half: int) -> np.ndarray:
    x = np.arange(-half, half) + 0.5
    taper = np.exp(-0.5 * (x / (half / 2)) ** 2)
    sign = np.sign(x)
    return np.outer(sign, sign) * np.outer(taper, taper)


def segment_features(
    y: np.ndarray, sr: int, features: dict[str, np.ndarray], hop_length: int
) -> np.ndarray:
    """Frame features (timbre + harmony + dynamics), each group weighted equally."""
    mfcc = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13, hop_length=hop_length)[1:]
    chroma = librosa.feature.chroma_stft(y=y, sr=sr, hop_length=hop_length)
    dyn = np.vstack([features["rms_db"], np.log1p(features["centroid"])])
    n = min(mfcc.shape[1], chroma.shape[1], dyn.shape[1])
    groups = [_zscore_rows(g[:, :n]) / np.sqrt(len(g)) for g in (mfcc, chroma, dyn)]
    return np.vstack(groups)


def compute_novelty(
    y: np.ndarray,
    sr: int,
    features: dict[str, np.ndarray],
    beat_times: np.ndarray,
    hop_length: int,
    cfg: NoveltyConfig,
) -> np.ndarray:
    """Novelty at each beat, scaled to 0..1 (1 = the largest change in this song)."""
    frames = segment_features(y, sr, features, hop_length)
    n_frames = frames.shape[1]
    beat_frames = np.clip(np.round(np.asarray(beat_times) * sr / hop_length).astype(int), 0, n_frames)

    edges = np.unique(np.concatenate([[0], beat_frames, [n_frames]]))
    n_seg = len(edges) - 1
    half = max(1, cfg.kernel_beats // 2)
    boundary_novelty = np.zeros(n_seg + 1)

    if n_seg >= 2 * half:
        seg = np.stack(
            [frames[:, edges[i] : edges[i + 1]].mean(axis=1) for i in range(n_seg)], axis=1
        )
        seg = seg / np.maximum(np.linalg.norm(seg, axis=0, keepdims=True), 1e-9)
        # Replicate edge segments so the kernel fits at the start and end of the song.
        padded = np.pad(seg, ((0, 0), (half, half)), mode="edge")
        ssm = padded.T @ padded
        kernel = _checkerboard(half)
        for c in range(1, n_seg):  # boundary between segment c-1 and c, at beat edges[c]
            block = ssm[c : c + 2 * half, c : c + 2 * half]
            boundary_novelty[c] = float(np.sum(kernel * block))
        boundary_novelty = np.clip(boundary_novelty, 0.0, None)
        peak = boundary_novelty.max()
        if peak > 0:
            boundary_novelty = boundary_novelty / peak

    index = np.searchsorted(edges, beat_frames)
    out = np.zeros(len(beat_times))
    ok = (index > 0) & (index < n_seg)
    out[ok] = boundary_novelty[index[ok]]
    return out


PEAK_HEIGHT = 0.3  # minimum novelty (0..1) for a local peak
PEAK_DISTANCE_BEATS = 4  # minimum spacing between peaks, in beats


def novelty_peaks(novelty: np.ndarray) -> np.ndarray:
    """Beat indices of local novelty peaks. Used by both the plots and the exported events."""
    from scipy.signal import find_peaks

    peaks, _ = find_peaks(novelty, height=PEAK_HEIGHT, distance=PEAK_DISTANCE_BEATS)
    return peaks
