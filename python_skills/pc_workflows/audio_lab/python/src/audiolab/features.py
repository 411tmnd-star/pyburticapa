"""Frame-level features: loudness, spectral shape, and onset strength."""

from __future__ import annotations

import librosa
import numpy as np

from audiolab.config import FeatureConfig


def compute_features(y: np.ndarray, sr: int, cfg: FeatureConfig) -> dict[str, np.ndarray]:
    """All features share one frame grid; `times` gives the time of each frame in seconds."""
    hop = cfg.hop_length
    S = np.abs(librosa.stft(y, n_fft=cfg.n_fft, hop_length=hop))

    rms = librosa.feature.rms(S=S, frame_length=cfg.n_fft, hop_length=hop)[0]
    rms_db = librosa.amplitude_to_db(rms, ref=np.max(rms) if np.any(rms) else 1.0)
    centroid = librosa.feature.spectral_centroid(S=S, sr=sr)[0]
    flatness = librosa.feature.spectral_flatness(S=S)[0]
    onset_env = librosa.onset.onset_strength(y=y, sr=sr, hop_length=hop)

    times = librosa.frames_to_time(np.arange(len(rms)), sr=sr, hop_length=hop)
    return {
        "times": times,
        "rms": rms,
        "rms_db": rms_db,
        "centroid": centroid,
        "flatness": flatness,
        "onset_env": onset_env,
        **band_energies(S, sr, cfg),
        **mel_spectrogram(S, sr, cfg),
    }


def band_energies(S: np.ndarray, sr: int, cfg: FeatureConfig) -> dict[str, np.ndarray]:
    """Energy in bass, mid and high bands, in dB.

    The bands partition the spectrum (0..bass_max_hz, ..mid_max_hz, ..Nyquist), so their powers add
    up to the frame's total power. All three are in dB relative to the loudest frame's total
    power, so they are comparable with each other and none is above about 0 dB.
    """
    freqs = librosa.fft_frequencies(sr=sr, n_fft=cfg.n_fft)
    power = S**2
    masks = {
        "bass": freqs < cfg.bass_max_hz,
        "mid": (freqs >= cfg.bass_max_hz) & (freqs < cfg.mid_max_hz),
        "high": freqs >= cfg.mid_max_hz,
    }
    ref = float(np.max(power.sum(axis=0))) or 1.0
    out = {
        f"band_{name}_db": 10.0 * np.log10(power[mask].sum(axis=0) / ref + 1e-10)
        for name, mask in masks.items()
    }
    out["band_edges_hz"] = np.array([cfg.bass_max_hz, cfg.mid_max_hz])
    return out


def mel_spectrogram(S: np.ndarray, sr: int, cfg: FeatureConfig) -> dict[str, np.ndarray]:
    """Mel-scaled spectrogram in dB (0 dB = the loudest cell), on the same frame grid."""
    mel = librosa.feature.melspectrogram(S=S**2, sr=sr, n_mels=cfg.n_mels)
    return {
        "mel_db": librosa.power_to_db(mel, ref=np.max(mel) if np.any(mel) else 1.0, top_db=80.0).astype(
            np.float32
        ),
        "mel_freqs": librosa.mel_frequencies(n_mels=cfg.n_mels, fmax=sr / 2),
    }
