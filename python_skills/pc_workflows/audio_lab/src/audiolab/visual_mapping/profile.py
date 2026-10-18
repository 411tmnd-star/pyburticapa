"""Mapping profiles: which inputs drive which channel, and how. Loaded from YAML.

A profile is data, not code. Each channel lists rules; each rule reads one input and turns it into
a signal in [0, 1]; the channel combines its rules. Inputs are:

- feature: a curve from the analysis curves file (e.g. rms_db, band_bass_db, onset_env, novelty)
- onset_rate: onsets per second around each output sample, counted from the analysis onset events
- events: analysis events (beat, downbeat, onset, novelty_peak), each producing a response envelope
- interpretation: a label from song_interpretation.json; changes produce a response envelope,
  passages produce a gate over their span

Unknown keys are errors, so a typo in a profile can't silently do nothing.
"""

from __future__ import annotations

import hashlib
from pathlib import Path
from typing import Annotated, Literal, Union

import yaml
from pydantic import BaseModel, ConfigDict, Field, model_validator

from audiolab.visual_mapping.channels import CHANNELS


class _M(BaseModel):
    model_config = ConfigDict(extra="forbid")


class Normalize(_M):
    """percentile: low/high are percentiles of the input over the song (song-relative).
    fixed: low/high are values in the input's own units (absolute)."""

    method: Literal["percentile", "fixed"] = "percentile"
    low: float = 5.0
    high: float = 95.0

    @model_validator(mode="after")
    def _ordered(self):
        if self.high <= self.low:
            raise ValueError("normalize.high must be greater than normalize.low")
        if self.method == "percentile" and not (0 <= self.low and self.high <= 100):
            raise ValueError("percentiles must lie in 0..100")
        return self


class FeatureInput(_M):
    kind: Literal["feature"]
    feature: str
    smooth_s: float = Field(default=0.0, ge=0)  # moving average before normalising
    # centered: no lag, but the average sees up to smooth_s/2 into the future, so a response can
    # begin before the change it follows. trailing: only the past, lagging by about smooth_s/2.
    align: Literal["centered", "trailing"] = "centered"
    # Activity relative to a slower baseline: the (smoothed) feature minus its own moving average
    # over baseline_s, in the feature's units (dB for dB curves). "above" keeps only the excess
    # over the baseline; "absolute" keeps the size of the deviation either way. Pair it with a
    # fixed normalization whose low value is a dead band, so small noise around the baseline gives
    # zero and only deviations of a meaningful size reach the top of the range.
    baseline_s: float = Field(default=0.0, ge=0)
    baseline_mode: Literal["above", "absolute"] = "above"
    # trailing (default): the baseline is the average of the recent past, so it never looks ahead
    # and a loud stretch is not measured against silence that has not happened yet. centered: the
    # baseline is the surrounding average on both sides.
    baseline_align: Literal["trailing", "centered"] = "trailing"

    @model_validator(mode="after")
    def _baseline_is_slower(self):
        if self.baseline_s and self.baseline_s <= self.smooth_s:
            raise ValueError("baseline_s must be longer than smooth_s")
        return self


class OnsetRateInput(_M):
    kind: Literal["onset_rate"]
    window_s: float = Field(default=2.0, gt=0)
    align: Literal["centered", "trailing"] = "centered"  # as for FeatureInput.align


class EventInput(_M):
    kind: Literal["events"]
    events: Literal["beat", "downbeat", "onset", "novelty_peak"]


class InterpretationInput(_M):
    kind: Literal["interpretation"]
    label: str


Input = Annotated[
    Union[FeatureInput, OnsetRateInput, EventInput, InterpretationInput], Field(discriminator="kind")
]


class Response(_M):
    """Envelope for one event. The peak sits at event time + peak_offset_s, so the response starts
    attack_s before the peak, holds for hold_s, then falls over release_s. For a passage, the rise
    starts at the passage start and the fall begins at its end."""

    attack_s: float = Field(default=0.02, ge=0)
    hold_s: float = Field(default=0.0, ge=0)
    release_s: float = Field(default=0.25, ge=0)
    peak_offset_s: float = 0.0
    shape: Literal["linear", "smooth"] = "smooth"


class Modulation(_M):
    """Scale each event's strength by a feature's normalised value around the event:
    strength *= floor + (1 - floor) * value, value = max over [t - window/2, t + window/2]."""

    feature: str
    normalize: Normalize = Normalize()
    window_s: float = Field(default=0.1, gt=0)
    floor: float = Field(default=0.0, ge=0, le=1)
    smooth_s: float = Field(default=0.0, ge=0)  # smooth the feature first, so brief dips don't set the range


class Rule(_M):
    id: str
    input: Input
    weight: float = Field(default=1.0, ge=0)
    normalize: Normalize | None = None  # features and onset_rate; defaults to percentile 5..95
    curve: float = Field(default=1.0, gt=0)  # exponent applied after normalising (1 = linear)
    response: Response | None = None  # events and interpretation; defaults to Response()
    strength: float = Field(default=1.0, ge=0, le=1)
    beat_in_bar_strength: dict[int, float] | None = None  # beat events only; missing positions = 1.0
    modulate_by: Modulation | None = None  # events only
    overlap: Literal["max", "sum"] = "max"  # how overlapping event responses combine (sum is clipped)

    @model_validator(mode="after")
    def _fits_input(self):
        continuous = self.input.kind in ("feature", "onset_rate")
        if continuous:
            if self.response or self.modulate_by or self.beat_in_bar_strength:
                raise ValueError(f"{self.id}: response/modulate_by/beat_in_bar_strength need an event input")
            self.normalize = self.normalize or Normalize()
        else:
            if self.normalize is not None:
                raise ValueError(f"{self.id}: normalize applies to features; events use strength")
            self.response = self.response or Response()
            if self.beat_in_bar_strength and not (
                self.input.kind == "events" and self.input.events in ("beat", "downbeat")
            ):
                raise ValueError(f"{self.id}: beat_in_bar_strength needs beat or downbeat events")
            if self.modulate_by and self.input.kind == "interpretation":
                raise ValueError(f"{self.id}: modulate_by applies to analysis events only")
        return self


class Smoothing(_M):
    """Attack/release follower on the combined channel. Causal: it lags by about attack_s on rises
    and release_s on falls."""

    attack_s: float = Field(default=0.0, ge=0)
    release_s: float = Field(default=0.0, ge=0)


class ChannelSpec(_M):
    combine: Literal["weighted_mean", "max", "sum"] = "weighted_mean"
    smoothing: Smoothing = Smoothing()
    rest: float = Field(default=0.0, ge=0, le=1)  # value where no rule has valid input
    rules: list[Rule] = Field(min_length=1)


class Profile(_M):
    name: str
    version: str = "1"
    description: str = ""
    channels: dict[str, ChannelSpec]

    @model_validator(mode="after")
    def _check(self):
        unknown = set(self.channels) - set(CHANNELS)
        if unknown:
            raise ValueError(f"unknown channel(s) {sorted(unknown)}; known: {sorted(CHANNELS)}")
        ids = [r.id for c in self.channels.values() for r in c.rules]
        dupes = {i for i in ids if ids.count(i) > 1}
        if dupes:
            raise ValueError(f"rule ids must be unique across the profile: {sorted(dupes)}")
        return self


def load_profile(path: str | Path) -> tuple[Profile, str]:
    """Return the profile and the sha256 of its file."""
    text = Path(path).read_text(encoding="utf-8")
    return Profile.model_validate(yaml.safe_load(text)), hashlib.sha256(text.encode("utf-8")).hexdigest()


def find_profile(name_or_path: str, profiles_dir: str | Path = "configs/visual_profiles") -> Path:
    p = Path(name_or_path)
    if p.suffix in (".yaml", ".yml") and p.exists():
        return p
    candidate = Path(profiles_dir) / f"{name_or_path}.yaml"
    if not candidate.exists():
        raise FileNotFoundError(f"profile {name_or_path!r} not found (looked for {candidate})")
    return candidate
