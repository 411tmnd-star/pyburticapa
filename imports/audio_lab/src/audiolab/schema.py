"""Versioned schema for the analyzer's output (song_analysis.json).

The file describes what was measured or estimated about one song, and nothing about what it
means. Interpretation ("this is a drop") and design ("so scale up") belong to later layers, which
should cite events by `id`.

Conventions
- Every time is in seconds from the start of the audio file. Spans use `time_s` (start) and `end_s`.
- `confidence` is a 0..1 value or null. It is null whenever the underlying method provides none;
  nothing here is a made-up score. `strength` and similar fields are measurements, not confidence.
- Every event names the analyzer that produced it in `source`, which is a key of
  `provenance.analyzers`. That entry says whether the output is `measured`, `estimated` or a
  `user_setting`.
- Continuous curves (loudness, band energy, spectrogram) live in a sidecar .npz that this file
  describes in `curves`, so the JSON stays readable.

Change the major version for anything that breaks readers; bump minor/patch for additions.
"""

from __future__ import annotations

from typing import Annotated, Any, Literal, Union

from pydantic import BaseModel, ConfigDict, Field, model_validator

SCHEMA_VERSION = "1.0.0"

# Order used to break ties between events at the same time.
EVENT_TYPE_ORDER = ["bar", "beat", "onset", "loud_segment", "novelty_peak"]


class _Model(BaseModel):
    model_config = ConfigDict(extra="forbid")


class Source(_Model):
    file: str
    sha256: str = Field(min_length=64, max_length=64)
    size_bytes: int = Field(ge=0)
    duration_s: float = Field(gt=0)
    original_sample_rate_hz: int | None = None
    original_channels: int | None = None
    analysis_sample_rate_hz: int = Field(gt=0)
    analysis_channels: int = Field(ge=1)


class AnalyzerInfo(_Model):
    origin: Literal["measured", "estimated", "user_setting"]
    method: str
    library: str | None = None
    params: dict[str, Any] = {}
    output: str
    confidence: str  # what, if anything, the confidence field means for this analyzer


class SongSettingsInfo(_Model):
    beats_per_bar: int = Field(ge=1)
    downbeat_offset: int
    origin: Literal["default", "stored"]  # "stored" = read from the per-song settings file


class Provenance(_Model):
    created_at: str  # UTC, ISO 8601; the only field that differs between identical runs
    audiolab_version: str
    python_version: str
    libraries: dict[str, str]
    config: dict[str, Any]
    song_settings: SongSettingsInfo
    analyzers: dict[str, AnalyzerInfo]


class TimeBase(_Model):
    unit: Literal["seconds"] = "seconds"
    hop_length: int = Field(gt=0)
    frame_rate_hz: float = Field(gt=0)
    n_frames: int = Field(gt=0)


class Tempo(_Model):
    bpm: float = Field(gt=0)
    source: str
    confidence: float | None = Field(default=None, ge=0, le=1)


class Diagnostics(_Model):
    """Numbers about the beat grid. Informational: not warnings and not rejection criteria."""

    beat_onset_ratio: float
    phase_peak_offset: float
    tempo_scores: dict[str, float]
    beat_interval_std_ms: float
    irregular_beat_gaps: int = Field(ge=0)  # intervals more than 20% off the median


class CurveInfo(_Model):
    key: str
    grid: Literal["frame", "beat", "mel"]
    unit: str
    description: str


class Curves(_Model):
    file: str
    sha256: str = Field(min_length=64, max_length=64)
    curves: list[CurveInfo]


class _EventBase(_Model):
    id: str
    time_s: float = Field(ge=0)
    source: str
    confidence: float | None = Field(default=None, ge=0, le=1)


class BeatEvent(_EventBase):
    type: Literal["beat"] = "beat"
    beat_in_bar: int = Field(ge=1)
    bar_index: int
    is_downbeat: bool
    onset_strength: float = Field(ge=0)
    novelty: float | None = Field(default=None, ge=0, le=1)


class BarEvent(_EventBase):
    type: Literal["bar"] = "bar"
    end_s: float
    index: int
    beats_per_bar: int = Field(ge=1)


class OnsetEvent(_EventBase):
    type: Literal["onset"] = "onset"
    strength: float = Field(ge=0)


class LoudSegmentEvent(_EventBase):
    type: Literal["loud_segment"] = "loud_segment"
    end_s: float
    peak_db: float


class NoveltyPeakEvent(_EventBase):
    type: Literal["novelty_peak"] = "novelty_peak"
    value: float = Field(ge=0, le=1)


Event = Annotated[
    Union[BeatEvent, BarEvent, OnsetEvent, LoudSegmentEvent, NoveltyPeakEvent],
    Field(discriminator="type"),
]


class SongAnalysis(_Model):
    schema_version: str
    source: Source
    provenance: Provenance
    time_base: TimeBase
    tempo: Tempo
    diagnostics: Diagnostics
    curves: Curves
    events: list[Event]

    @model_validator(mode="after")
    def _check(self) -> "SongAnalysis":
        if self.schema_version.split(".")[0] != SCHEMA_VERSION.split(".")[0]:
            raise ValueError(
                f"schema_version {self.schema_version} is not compatible with {SCHEMA_VERSION}"
            )
        slack = 2.0 / self.time_base.frame_rate_hz
        limit = self.source.duration_s + slack

        seen: set[str] = set()
        last_key = (-1.0, -1)
        for ev in self.events:
            if ev.id in seen:
                raise ValueError(f"duplicate event id {ev.id}")
            seen.add(ev.id)
            if ev.source not in self.provenance.analyzers:
                raise ValueError(f"{ev.id}: source {ev.source!r} is not in provenance.analyzers")
            end = getattr(ev, "end_s", ev.time_s)
            if end < ev.time_s:
                raise ValueError(f"{ev.id}: end_s is before time_s")
            if end > limit:
                raise ValueError(f"{ev.id}: ends at {end:.3f}s, after the audio ({limit:.3f}s)")
            key = (ev.time_s, EVENT_TYPE_ORDER.index(ev.type))
            if key < last_key:
                raise ValueError(f"{ev.id}: events must be sorted by time, then by type")
            last_key = key

        beats = [e.time_s for e in self.events if e.type == "beat"]
        if any(b2 <= b1 for b1, b2 in zip(beats, beats[1:])):
            raise ValueError("beat times must be strictly increasing")
        return self


def json_schema() -> dict:
    schema = SongAnalysis.model_json_schema()
    schema["title"] = f"SongAnalysis v{SCHEMA_VERSION.split('.')[0]}"
    return schema
