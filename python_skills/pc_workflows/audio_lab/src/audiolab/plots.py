"""Plots for one song. Uses the Figure API directly so no GUI backend is needed."""

from __future__ import annotations

from pathlib import Path

import numpy as np
from matplotlib.figure import Figure

from audiolab.config import PlotConfig


def plot_overview(
    y: np.ndarray,
    sr: int,
    features: dict[str, np.ndarray],
    beat_times: np.ndarray,
    events: list[dict],
    out_path: str | Path,
    cfg: PlotConfig,
) -> None:
    """Waveform, loudness with loud segments, and onset strength with beats and onsets."""
    step = max(1, len(y) // cfg.max_points)
    wave_t = np.arange(0, len(y), step) / sr
    onset_times = [ev["time"] for ev in events if ev["type"] == "onset"]
    segments = [ev for ev in events if ev["type"] == "loud_segment"]

    fig = Figure(figsize=(12, 8), dpi=cfg.dpi)
    ax_wave, ax_rms, ax_onset = fig.subplots(3, 1, sharex=True)

    ax_wave.plot(wave_t, y[::step], lw=0.4, color="#4a6fa5")
    ax_wave.set_ylabel("amplitude")
    ax_wave.set_title("Waveform")

    ax_rms.plot(features["times"], features["rms_db"], lw=0.8, color="#2a9d8f")
    for seg in segments:
        ax_rms.axvspan(seg["start"], seg["end"], color="#e9c46a", alpha=0.3)
    ax_rms.set_ylabel("RMS (dB)")
    ax_rms.set_title("Loudness (shaded = loud segments)")

    ax_onset.plot(features["times"], features["onset_env"], lw=0.8, color="#264653")
    ax_onset.vlines(beat_times, 0, features["onset_env"].max(), color="#e76f51", lw=0.8, label="beats")
    ax_onset.plot(onset_times, [0] * len(onset_times), "x", color="#f4a261", label="onsets")
    ax_onset.set_ylabel("onset strength")
    ax_onset.set_xlabel("time (s)")
    ax_onset.set_title("Onset envelope with beats and onsets")
    ax_onset.legend(loc="upper right")

    fig.tight_layout()
    fig.savefig(out_path)


def plot_spectral(
    features: dict[str, np.ndarray], out_path: str | Path, cfg: PlotConfig
) -> None:
    """Spectral centroid and flatness over time."""
    fig = Figure(figsize=(12, 5), dpi=cfg.dpi)
    ax_c, ax_f = fig.subplots(2, 1, sharex=True)

    ax_c.plot(features["times"], features["centroid"], lw=0.8, color="#6a4c93")
    ax_c.set_ylabel("centroid (Hz)")
    ax_c.set_title("Spectral centroid")

    ax_f.plot(features["times"], features["flatness"], lw=0.8, color="#8ac926")
    ax_f.set_ylabel("flatness")
    ax_f.set_xlabel("time (s)")
    ax_f.set_title("Spectral flatness (near 1 = noise-like, near 0 = tonal)")

    fig.tight_layout()
    fig.savefig(out_path)


def plot_bars(
    y: np.ndarray,
    sr: int,
    features: dict[str, np.ndarray],
    beat_times: np.ndarray,
    grid,
    novelty: np.ndarray | None,
    out_path: str | Path,
    cfg: PlotConfig,
    window: tuple[float, float] | None = None,
) -> None:
    """Waveform, loudness, onsets with numbered beats, and the section-novelty curve.

    Red lines are bar starts (beat 1) across every panel. Beat numbers are drawn only when the
    view holds at most 80 beats, so zoom in with `window` to read them.
    """
    from audiolab.novelty import novelty_peaks

    step = max(1, len(y) // cfg.max_points)
    wave_t = np.arange(0, len(y), step) / sr
    n_panels = 4 if novelty is not None else 3
    fig = Figure(figsize=(14, 9), dpi=cfg.dpi)
    axes = fig.subplots(n_panels, 1, sharex=True)
    ax_wave, ax_rms, ax_onset = axes[0], axes[1], axes[2]

    ax_wave.plot(wave_t, y[::step], lw=0.4, color="#4a6fa5")
    ax_wave.set_ylabel("amplitude")
    ax_wave.set_title("Waveform")
    ax_rms.plot(features["times"], features["rms_db"], lw=0.8, color="#2a9d8f")
    ax_rms.set_ylabel("RMS (dB)")
    ax_rms.set_title("Loudness")
    ax_onset.plot(features["times"], features["onset_env"], lw=0.8, color="#264653")
    top = float(features["onset_env"].max())
    ax_onset.vlines(beat_times, 0, top, color="#999999", lw=0.6)
    ax_onset.set_ylabel("onset strength")
    ax_onset.set_title(
        f"Onset envelope: beats (grey), bar starts (red), {grid.beats_per_bar} beats per bar, "
        f"downbeat offset {grid.downbeat_offset}"
    )
    if novelty is not None:
        ax_nov = axes[3]
        ax_nov.plot(beat_times, novelty, lw=1.0, color="#6a4c93")
        peaks = novelty_peaks(novelty)
        ax_nov.plot(beat_times[peaks], novelty[peaks], "o", color="#e76f51", ms=4)
        ax_nov.set_ylabel("novelty (0-1)")
        ax_nov.set_title("Section novelty: how much the music changes at each beat (dots = local peaks)")
    axes[-1].set_xlabel("time (s)")

    for ax in axes:
        for t in grid.downbeat_times:
            ax.axvline(t, color="#d62828", lw=1.1, alpha=0.7)
    ax_onset.plot(grid.downbeat_times, [top] * len(grid.downbeat_times), "v", color="#d62828", ms=6)

    lo, hi = window if window else (0.0, len(y) / sr)
    in_view = (beat_times >= lo) & (beat_times <= hi)
    if in_view.sum() <= 80:
        for t, n in zip(beat_times[in_view], grid.beat_in_bar[in_view]):
            ax_onset.text(
                t, 1.0, str(n), transform=ax_onset.get_xaxis_transform(), ha="center",
                va="bottom", fontsize=8, fontweight="bold" if n == 1 else "normal",
                color="#d62828" if n == 1 else "#555555",
            )
        in_bar_view = (grid.downbeat_times >= lo) & (grid.downbeat_times <= hi)
        first_bar = int(grid.bar_index[grid.is_downbeat][0]) if len(grid.downbeat_times) else 0
        for t, idx in zip(grid.downbeat_times[in_bar_view], np.flatnonzero(in_bar_view)):
            ax_wave.text(
                t, 1.0, f"bar {first_bar + idx}", transform=ax_wave.get_xaxis_transform(),
                ha="left", va="bottom", fontsize=7, color="#d62828",
            )
    ax_onset.set_xlim(lo, hi)

    fig.tight_layout()
    fig.savefig(out_path)


def plot_bands(
    features: dict[str, np.ndarray],
    beat_times: np.ndarray,
    grid,
    out_path: str | Path,
    cfg: PlotConfig,
    window: tuple[float, float] | None = None,
) -> None:
    """Spectrogram on top, bass/mid/high energy below, with bar starts (red) and beats (grey).

    Dashed lines on the spectrogram mark the band edges. Band energies are in dB relative to the
    loudest frame's total power, so the three lines are directly comparable.
    """
    times = features["times"]
    mel_db, mel_freqs = features["mel_db"], features["mel_freqs"]
    edges = features["band_edges_hz"]
    lo, hi = window if window else (float(times[0]), float(times[-1]))

    fig = Figure(figsize=(14, 7), dpi=cfg.dpi)
    ax_spec, ax_band = fig.subplots(2, 1, sharex=True)

    ax_spec.imshow(
        mel_db, origin="lower", aspect="auto", cmap="magma", vmin=-80, vmax=0,
        extent=[float(times[0]), float(times[-1]), 0, len(mel_freqs)],
    )
    row = np.arange(len(mel_freqs))
    tick_hz = [h for h in (100, 250, 500, 1000, 2000, 4000, 8000) if h < mel_freqs[-1]]
    ax_spec.set_yticks(np.interp(tick_hz, mel_freqs, row) + 0.5)
    ax_spec.set_yticklabels([f"{h/1000:g}k" if h >= 1000 else str(h) for h in tick_hz])
    for hz in edges:
        ax_spec.axhline(np.interp(hz, mel_freqs, row) + 0.5, color="white", ls="--", lw=0.8)
    ax_spec.set_ylabel("frequency (Hz, mel scale)")
    ax_spec.set_title("Spectrogram (dashed = band edges)")

    colors = {"bass": "#e63946", "mid": "#2a9d8f", "high": "#4361ee"}
    for name, color in colors.items():
        ax_band.plot(times, features[f"band_{name}_db"], lw=0.8, color=color, label=name)
    ax_band.set_ylim(-60, 3)
    ax_band.set_ylabel("energy (dB)")
    ax_band.set_xlabel("time (s)")
    ax_band.set_title(
        f"Band energy: bass < {edges[0]:g} Hz, mid < {edges[1]:g} Hz, high above"
    )
    ax_band.legend(loc="upper right", ncol=3)

    for ax in (ax_spec, ax_band):
        for t in grid.downbeat_times:
            ax.axvline(t, color="#d62828" if ax is ax_band else "white", lw=1.0, alpha=0.7)
    in_view = beat_times[(beat_times >= lo) & (beat_times <= hi)]
    if len(in_view) <= 80:
        for t in in_view:
            ax_band.axvline(t, color="#999999", lw=0.5, zorder=0)
    ax_band.set_xlim(lo, hi)

    fig.tight_layout()
    fig.savefig(out_path)
