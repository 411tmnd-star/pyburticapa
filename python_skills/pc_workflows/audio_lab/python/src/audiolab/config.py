"""Typed configuration loaded from YAML, with defaults for every key."""

from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path

import yaml


@dataclass
class AudioConfig:
    sample_rate: int = 22050
    mono: bool = True


@dataclass
class FeatureConfig:
    n_fft: int = 2048
    hop_length: int = 512
    bass_max_hz: float = 150.0  # bass band: 0 Hz up to this
    mid_max_hz: float = 2000.0  # mid band: bass_max_hz up to this; high band: this up to Nyquist
    n_mels: int = 96  # rows in the stored spectrogram


@dataclass
class BeatConfig:
    start_bpm: float = 120.0
    tightness: float = 100.0


@dataclass
class EventConfig:
    onset_delta: float = 0.07
    min_gap_s: float = 0.05
    loud_threshold_db: float = -20.0
    loud_hysteresis_db: float = 6.0
    loud_min_duration_s: float = 0.5
    loud_merge_gap_s: float = 0.5


@dataclass
class BarConfig:
    beats_per_bar: int = 4  # default meter; per-song values in configs/songs.yaml override it


@dataclass
class NoveltyConfig:
    kernel_beats: int = 16  # width of the checkerboard kernel, in beats (about 4 bars at 4/4)


@dataclass
class PlotConfig:
    dpi: int = 120
    max_points: int = 200_000


@dataclass
class Config:
    audio: AudioConfig = field(default_factory=AudioConfig)
    features: FeatureConfig = field(default_factory=FeatureConfig)
    beats: BeatConfig = field(default_factory=BeatConfig)
    events: EventConfig = field(default_factory=EventConfig)
    bars: BarConfig = field(default_factory=BarConfig)
    novelty: NoveltyConfig = field(default_factory=NoveltyConfig)
    plots: PlotConfig = field(default_factory=PlotConfig)


def load_config(path: str | Path | None = None) -> Config:
    """Load a YAML config. Missing sections or keys use defaults; unknown keys raise TypeError."""
    data: dict = {}
    if path is not None:
        data = yaml.safe_load(Path(path).read_text(encoding="utf-8")) or {}

    return Config(
        audio=AudioConfig(**data.get("audio", {})),
        features=FeatureConfig(**data.get("features", {})),
        beats=BeatConfig(**data.get("beats", {})),
        events=EventConfig(**data.get("events", {})),
        bars=BarConfig(**data.get("bars", {})),
        novelty=NoveltyConfig(**data.get("novelty", {})),
        plots=PlotConfig(**data.get("plots", {})),
    )
