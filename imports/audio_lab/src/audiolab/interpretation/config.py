"""Configuration for the interpretation layer, kept apart from the analyzer's Config.

Every threshold is relative to something the song itself provides (its own loudest level, its own
beat spacing, its own onset rate) or to a physical unit (dB, onsets per second), so the same
values can be applied to any track. They are provisional starting points, not tuned constants.
Unknown YAML keys raise TypeError, like the analyzer's config.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path

import yaml


@dataclass
class CommonConfig:
    window_beats: int = 8  # compare this many beats before and after a point (about 2 bars)
    min_window_fraction: float = 0.5  # skip points where a window is truncated below this share
    min_separation_beats: int = 8  # keep only the strongest hit of a label within this spacing
    smooth_s: float = 1.0  # moving-average length for smoothed loudness curves
    link_tolerance_beats: float = 2.0  # how close another interpretation must be to be related


@dataclass
class BassEntryConfig:
    enabled: bool = True
    min_rise_db: float = 12.0  # bass band energy rise, after window vs before window
    min_after_level_db: float = -30.0  # bass must end up at least this loud (dB re loudest frame)
    min_sustained_fraction: float = 0.5  # share of after-window frames above before + rise/2


@dataclass
class EnergyDropConfig:
    enabled: bool = True
    min_drop_db: float = 6.0  # loudness fall, after window vs before window


@dataclass
class EnergyBuildConfig:
    enabled: bool = True
    smooth_s: float = 3.0  # smoothing before taking the slope
    min_slope_db_per_s: float = 0.4  # a rise starts when the smoothed slope exceeds this
    end_slope_db_per_s: float = 0.1  # ...and ends when it falls below this (not 0: flat is noisy)
    min_duration_s: float = 6.0
    min_rise_db: float = 6.0  # net loudness gain across the passage
    merge_gap_s: float = 2.0
    step_window_s: float = 2.0  # a rise of more than max_step_db within this is a jump, not a build
    max_step_db: float = 6.0


@dataclass
class HighEnergyConfig:
    enabled: bool = True
    reference_percentile: float = 95.0  # the song's own "loud" level
    within_db: float = 6.0  # elevated = within this many dB of the reference
    hysteresis_db: float = 2.0
    min_duration_s: float = 8.0
    merge_gap_s: float = 2.0
    min_dynamic_range_db: float = 6.0  # reference minus 10th percentile; below this the song has
    # no contrast, so no passage is called elevated


@dataclass
class SparseConfig:
    enabled: bool = True
    below_reference_db: float = 12.0  # sparse = this far below the song's loud reference level
    max_onset_ratio: float = 0.75  # ...and onset rate at most this share of the song's overall rate
    hysteresis_db: float = 2.0
    min_duration_s: float = 4.0
    merge_gap_s: float = 2.0
    reference_percentile: float = 95.0


@dataclass
class DensityChangeConfig:
    enabled: bool = True
    min_abs_change: float = 1.0  # onsets per second
    min_ratio: float = 1.5  # larger rate over smaller rate
    ratio_floor: float = 0.25  # added to both rates so a rate of zero gives a finite ratio


@dataclass
class TransitionConfig:
    enabled: bool = True
    min_channels: int = 3  # how many independent features must change together
    loudness_db: float = 6.0
    bass_db: float = 10.0
    mid_db: float = 6.0
    high_db: float = 6.0
    onset_min_abs_change: float = 1.0
    onset_min_ratio: float = 1.5
    onset_ratio_floor: float = 0.25
    novelty_tolerance_beats: float = 2.0  # a novelty peak this close counts as the novelty channel


@dataclass
class InterpretConfig:
    common: CommonConfig = field(default_factory=CommonConfig)
    bass_entry: BassEntryConfig = field(default_factory=BassEntryConfig)
    energy_drop: EnergyDropConfig = field(default_factory=EnergyDropConfig)
    energy_build: EnergyBuildConfig = field(default_factory=EnergyBuildConfig)
    high_energy_passage: HighEnergyConfig = field(default_factory=HighEnergyConfig)
    sparse_passage: SparseConfig = field(default_factory=SparseConfig)
    rhythmic_density_change: DensityChangeConfig = field(default_factory=DensityChangeConfig)
    transition_candidate: TransitionConfig = field(default_factory=TransitionConfig)


def load_interpret_config(path: str | Path | None = None) -> InterpretConfig:
    """Load a YAML config. Missing sections or keys use defaults; unknown keys raise TypeError."""
    data: dict = {}
    if path is not None:
        data = yaml.safe_load(Path(path).read_text(encoding="utf-8")) or {}
    unknown = set(data) - set(InterpretConfig.__dataclass_fields__)
    if unknown:
        raise TypeError(f"unknown config section(s): {sorted(unknown)}")
    return InterpretConfig(
        **{
            name: type(fld.default_factory())(**(data.get(name) or {}))
            for name, fld in InterpretConfig.__dataclass_fields__.items()
        }
    )
