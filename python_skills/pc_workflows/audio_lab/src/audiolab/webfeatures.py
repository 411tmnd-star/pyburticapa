"""Raw band readings that emulate what the browser's AnalyserNodes report, for the offline web pipeline.

The live web pipeline reads two AnalyserNodes (a 2048-point one for mids, highs and onsets, and a
4096-point one for the low end) and turns those readings into features. To give pre-computed tracks the
same features, this module produces the same *readings* from an audio file, one frame per hop:

    lowDb    mean power in dB over 20-150 Hz   (4096-point FFT)
    punchDb  mean power in dB over 60-150 Hz   (4096-point FFT)
    midDb    150-2000 Hz                       (2048-point FFT)
    highDb   2000-10000 Hz                     (2048-point FFT)
    allDb    20-10000 Hz                       (2048-point FFT)
    flux     summed positive magnitude increase over bins 1..(4000 Hz) between frames (2048-point FFT)

The web side runs the same feature code over these readings that it runs over live analyser readings.

Emulation details (Web Audio AnalyserNode.getFloatFrequencyData): the last fftSize samples are multiplied by
a Blackman window (alpha 0.16), transformed, and scaled by 1/fftSize; the magnitude is smoothed across frames
with smoothingTimeConstant (0.5 for the 2048 analyser, 0 for the 4096 one); dB = 20 log10(magnitude). Frame k
covers the samples that end at time k * hop / sr, so readings carry the same trailing-window delay as a
live read. Two things are only approximate: browsers call the analyser at the display rate rather than at a
fixed hop, and the exact smoothing cadence differs.
"""

from __future__ import annotations

import numpy as np

SAMPLE_RATE = 44100
HOP = 1024
MAIN_FFT = 2048
LOW_FFT = 4096
MAIN_SMOOTHING = 0.5
LOW_SMOOTHING = 0.0

BANDS_HZ = {
    "low": (20.0, 150.0),
    "punch": (60.0, 150.0),
    "mid": (150.0, 2000.0),
    "high": (2000.0, 10000.0),
    "all": (20.0, 10000.0),
}
ONSET_TOP_HZ = 4000.0
CHANNELS = ("lowDb", "punchDb", "midDb", "highDb", "allDb", "flux")


def bin_range(lo_hz: float, hi_hz: float, sample_rate: int, fft_size: int) -> tuple[int, int]:
    """Same rule as the web side's binRange: DC is skipped and the range is never empty."""
    bin_hz = sample_rate / fft_size
    start = max(1, int(np.floor(lo_hz / bin_hz)))
    stop = max(start + 1, int(np.ceil(hi_hz / bin_hz)))
    return start, stop


def blackman(n: int, alpha: float = 0.16) -> np.ndarray:
    k = np.arange(n)
    return (1 - alpha) / 2 - 0.5 * np.cos(2 * np.pi * k / n) + alpha / 2 * np.cos(4 * np.pi * k / n)


def magnitudes(y: np.ndarray, fft_size: int, hop: int = HOP, smoothing: float = 0.0) -> np.ndarray:
    """Analyser magnitudes, shape (frames, fft_size // 2): trailing windows, Blackman, 1/N, smoothed over time."""
    y = np.asarray(y, dtype=np.float64)
    padded = np.concatenate([np.zeros(fft_size), y])
    n_frames = 1 + (len(padded) - fft_size) // hop
    # Frame k covers padded[k*hop : k*hop + fft_size], i.e. the fft_size samples ending at time k*hop of the original.
    windows = np.lib.stride_tricks.sliding_window_view(padded, fft_size)[::hop][:n_frames]
    win = blackman(fft_size)
    spec = np.empty((n_frames, fft_size // 2))
    for i in range(0, n_frames, 512):  # in blocks, so a long track does not need one huge array
        block = windows[i : i + 512] * win
        spec[i : i + 512] = np.abs(np.fft.rfft(block, axis=1))[:, : fft_size // 2] / fft_size
    if smoothing > 0:
        out = np.empty_like(spec)
        prev = np.zeros(spec.shape[1])
        for i in range(len(spec)):
            prev = smoothing * prev + (1 - smoothing) * spec[i]
            out[i] = prev
        spec = out
    return spec


def band_db(mag: np.ndarray, lo_hz: float, hi_hz: float, sample_rate: int, fft_size: int) -> np.ndarray:
    """Mean power over the band's bins, in dB (the web side's bandDb)."""
    a, b = bin_range(lo_hz, hi_hz, sample_rate, fft_size)
    power = (mag[:, a:b] ** 2).mean(axis=1)
    return 10 * np.log10(power + 1e-12)


def flux(mag: np.ndarray, sample_rate: int, fft_size: int) -> np.ndarray:
    """Spectral flux over bins 1..ONSET_TOP_HZ: the sum of positive magnitude increases from the previous frame."""
    top = bin_range(0, ONSET_TOP_HZ, sample_rate, fft_size)[1]
    d = np.diff(mag[:, 1:top], axis=0, prepend=mag[:1, 1:top])
    return np.clip(d, 0, None).sum(axis=1)


def analyser_readings(y: np.ndarray, sample_rate: int = SAMPLE_RATE, hop: int = HOP) -> dict[str, np.ndarray]:
    """All raw readings for a mono signal at `sample_rate`. Each array has one value per frame."""
    main = magnitudes(y, MAIN_FFT, hop, MAIN_SMOOTHING)
    low = magnitudes(y, LOW_FFT, hop, LOW_SMOOTHING)
    return {
        "lowDb": band_db(low, *BANDS_HZ["low"], sample_rate, LOW_FFT),
        "punchDb": band_db(low, *BANDS_HZ["punch"], sample_rate, LOW_FFT),
        "midDb": band_db(main, *BANDS_HZ["mid"], sample_rate, MAIN_FFT),
        "highDb": band_db(main, *BANDS_HZ["high"], sample_rate, MAIN_FFT),
        "allDb": band_db(main, *BANDS_HZ["all"], sample_rate, MAIN_FFT),
        "flux": flux(main, sample_rate, MAIN_FFT),
    }
