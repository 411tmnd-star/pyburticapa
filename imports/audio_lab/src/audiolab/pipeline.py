"""Run every stage for one song and write its outputs."""

from __future__ import annotations

import json
from pathlib import Path

import numpy as np

from audiolab import io
from audiolab.bars import build_bars, downbeat_hint
from audiolab.beats import detect_beats
from audiolab.clicks import render_click_track
from audiolab.config import Config
from audiolab.events import detect_events
from audiolab.export import build_song_analysis, write_song_analysis
from audiolab.features import compute_features
from audiolab.novelty import compute_novelty
from audiolab.plots import plot_bands, plot_bars, plot_overview, plot_spectral
from audiolab.songs import SongSettings


def analyze_song(
    song_path: str | Path,
    cfg: Config,
    outputs_root: str | Path,
    settings: SongSettings | None = None,
    settings_origin: str = "default",
) -> Path:
    """Analyze one song. Writes outputs/<stem>/{analysis.npz, events.json, song_analysis.json,
    bars.json, clicks_bars.wav, plots/*.png}.

    `settings` holds the meter and downbeat offset (defaults to cfg.bars); `settings_origin` is
    "stored" when they came from the per-song settings file. Returns the per-song output directory.
    """
    out_dir = io.song_output_dir(outputs_root, song_path)
    plots_dir = out_dir / "plots"
    plots_dir.mkdir(exist_ok=True)

    y, sr = io.load_audio(song_path, cfg.audio)
    hop = cfg.features.hop_length

    features = compute_features(y, sr, cfg.features)
    beats = detect_beats(features["onset_env"], sr, hop, cfg.beats)
    events = detect_events(features, sr, hop, cfg.events)
    novelty = compute_novelty(y, sr, features, beats["beat_times"], hop, cfg.novelty)

    io.save_analysis(
        out_dir / "analysis.npz",
        **features,
        beat_times=beats["beat_times"],
        novelty=novelty,
        tempo=beats["tempo"],
        sample_rate=sr,
        hop_length=hop,
        duration=len(y) / sr,
    )
    io.save_events(out_dir / "events.json", events)
    plot_overview(y, sr, features, beats["beat_times"], events, plots_dir / "overview.png", cfg.plots)
    plot_spectral(features, plots_dir / "spectral.png", cfg.plots)
    render_bars(song_path, cfg, outputs_root, settings, y=y, settings_origin=settings_origin)

    return out_dir


def render_bars(
    song_path: str | Path,
    cfg: Config,
    outputs_root: str | Path,
    settings: SongSettings | None = None,
    window: tuple[float, float] | None = None,
    y: np.ndarray | None = None,
    settings_origin: str = "default",
) -> dict:
    """Rebuild the bar grid from saved analysis and write song_analysis.json, bars.json, the bar
    plots and the accented click track. Cheap enough to rerun while tuning the downbeat offset.

    The default window starts one second before the first beat and lasts 24 s.
    """
    out_dir = io.song_output_dir(outputs_root, song_path)
    plots_dir = out_dir / "plots"
    plots_dir.mkdir(exist_ok=True)
    analysis = io.load_analysis(out_dir / "analysis.npz")
    sr, hop = int(analysis["sample_rate"]), int(analysis["hop_length"])
    beat_times = analysis["beat_times"]
    if y is None:
        y, _ = io.load_audio(song_path, cfg.audio)
    settings = settings or SongSettings(beats_per_bar=cfg.bars.beats_per_bar)

    grid = build_bars(beat_times, settings.beats_per_bar, settings.downbeat_offset)
    hint = downbeat_hint(analysis["onset_env"], beat_times, sr, hop, settings.beats_per_bar)
    novelty = analysis["novelty"] if "novelty" in analysis else None
    if window is None:
        start = max(0.0, float(beat_times[0]) - 1.0) if len(beat_times) else 0.0
        window = (start, start + 24.0)

    features = {k: analysis[k] for k in ("times", "rms_db", "onset_env")}
    plot_bars(y, sr, features, beat_times, grid, novelty, plots_dir / "bars.png", cfg.plots)
    plot_bars(
        y, sr, features, beat_times, grid, novelty, plots_dir / "bars_window.png", cfg.plots, window
    )
    render_click_track(y, sr, beat_times, out_dir / "clicks_bars.wav", accent_mask=grid.is_downbeat)
    if "mel_db" in analysis:
        spectral = {k: analysis[k] for k in analysis if k.startswith(("band_", "mel_")) or k == "times"}
        plot_bands(spectral, beat_times, grid, plots_dir / "bands.png", cfg.plots)
        plot_bands(spectral, beat_times, grid, plots_dir / "bands_window.png", cfg.plots, window)

    report = {
        "song": Path(song_path).name,
        "beats_per_bar": grid.beats_per_bar,
        "downbeat_offset": grid.downbeat_offset,
        "downbeat_hint": hint,
        "bars": grid.bars(float(analysis["duration"])),
        "beats": [
            {"time": float(t), "beat_in_bar": int(n), "bar_index": int(b)}
            for t, n, b in zip(beat_times, grid.beat_in_bar, grid.bar_index)
        ],
    }
    (out_dir / "bars.json").write_text(json.dumps(report, indent=2), encoding="utf-8")

    model = build_song_analysis(
        Path(song_path), cfg, analysis, io.load_events(out_dir / "events.json"), grid, settings,
        settings_origin, out_dir / "analysis.npz",
    )
    write_song_analysis(model, out_dir / "song_analysis.json")
    return report


def render_offset_previews(
    song_path: str | Path,
    cfg: Config,
    outputs_root: str | Path,
    beats_per_bar: int,
    seconds: float = 40.0,
) -> list[Path]:
    """Write one short accented click track per possible downbeat offset, to pick by ear.

    Files are outputs/<stem>/offset_<k>.wav (k = 0..beats_per_bar-1), each covering the first
    `seconds` of the song, so they are quick to audition one after another.
    """
    out_dir = io.song_output_dir(outputs_root, song_path)
    analysis = io.load_analysis(out_dir / "analysis.npz")
    y, sr = io.load_audio(song_path, cfg.audio)
    beat_times = analysis["beat_times"]
    n_samples = int(seconds * sr)
    y_short = y[:n_samples]
    keep = beat_times < seconds
    paths = []
    for k in range(beats_per_bar):
        grid = build_bars(beat_times, beats_per_bar, k)
        paths.append(
            render_click_track(
                y_short, sr, beat_times[keep], out_dir / f"offset_{k}.wav",
                accent_mask=grid.is_downbeat[keep],
            )
        )
    return paths
