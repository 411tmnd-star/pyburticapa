"""Versioned schema for the visual mapping artifact (visual_mapping.<profile>.json).

The JSON describes how a set of visual control channels was produced: from which analysis and
interpretation (with hashes), by which profile and engine version, with which normalization
values, and where the numbers are. The curves themselves live in the sidecar .npz it names.

Paths are relative to the JSON file. Change the major version for anything that breaks readers.
"""

from __future__ import annotations

from typing import Any, Literal

from pydantic import BaseModel, ConfigDict, Field, model_validator

from audiolab.visual_mapping.channels import CHANNELS

SCHEMA_VERSION = "1.0.0"
ARTIFACT = "visual_mapping"


class _M(BaseModel):
    model_config = ConfigDict(extra="forbid")


class AnalysisSource(_M):
    path: str
    file_sha256: str = Field(min_length=64, max_length=64)
    content_sha256: str = Field(min_length=64, max_length=64)  # ignores created_at
    audio_file: str
    audio_sha256: str = Field(min_length=64, max_length=64)
    curves_file: str
    curves_sha256: str = Field(min_length=64, max_length=64)
    duration_s: float = Field(gt=0)


class InterpretationSource(_M):
    path: str
    file_sha256: str = Field(min_length=64, max_length=64)
    content_sha256: str = Field(min_length=64, max_length=64)  # ignores created_at
    schema_version: str
    method_version: str


class Sources(_M):
    analysis: AnalysisSource
    interpretation: InterpretationSource | None
    interpretation_status: str  # "used", or why it was not


class ProfileRecord(_M):
    name: str
    version: str
    file: str | None
    file_sha256: str | None
    spec: dict[str, Any]  # the full resolved profile, enough to reproduce the mapping without the file


class Engine(_M):
    name: str
    version: str


class Provenance(_M):
    created_at: str  # UTC ISO 8601; the only field that differs between identical runs
    python_version: str
    libraries: dict[str, str]


class Timebase(_M):
    unit: Literal["seconds"] = "seconds"
    rate_hz: float = Field(gt=0)
    n_samples: int = Field(gt=0)
    duration_s: float = Field(gt=0)
    sample_time: str  # how sample k maps to time
    feature_resampling: str
    boundary: str


class NormalizationRecord(_M):
    method: str
    low: float
    high: float
    low_value: float | None  # input value mapped to 0 (None if undefined)
    high_value: float | None  # input value mapped to 1
    degenerate: bool
    computed_on: str


class RuleRecord(_M):
    id: str
    channel: str
    input: dict[str, Any]
    weight: float
    curve: float
    strength: float
    overlap: str
    status: Literal["applied", "skipped"]
    reason: str | None = None
    normalization: NormalizationRecord | None = None
    modulation_normalization: NormalizationRecord | None = None
    response: dict[str, Any] | None = None
    n_responses: int = 0
    valid_fraction: float = 0.0
    array_key: str | None = None
    valid_key: str | None = None


class ChannelStats(_M):
    min: float
    max: float
    mean: float
    p95: float
    std: float


class ChannelRecord(_M):
    name: str
    range: tuple[float, float]
    meaning: str
    behaviour: str
    status: Literal["available", "unavailable"]
    reason: str | None = None
    combine: str
    smoothing: dict[str, float]
    rest: float
    rule_ids: list[str]
    coverage: float = 0.0  # share of samples where at least one rule had valid input
    stats: ChannelStats | None = None
    array_key: str | None = None
    valid_key: str | None = None


class ArrayInfo(_M):
    key: str
    shape: list[int]
    dtype: str
    description: str


class Numerical(_M):
    file: str
    sha256: str = Field(min_length=64, max_length=64)
    arrays: list[ArrayInfo]


class Responses(_M):
    """Event responses, one row per event per rule, stored as columns in the numerical file."""

    count: int
    columns: list[str]
    by_rule: dict[str, int]


class VisualMapping(_M):
    artifact: Literal["visual_mapping"] = ARTIFACT
    schema_version: str
    engine: Engine
    sources: Sources
    profile: ProfileRecord
    provenance: Provenance
    timebase: Timebase
    channels: list[ChannelRecord]
    rules: list[RuleRecord]
    responses: Responses
    numerical: Numerical
    limitations: list[str]

    @model_validator(mode="after")
    def _check(self):
        if self.schema_version.split(".")[0] != SCHEMA_VERSION.split(".")[0]:
            raise ValueError(f"schema_version {self.schema_version} is not compatible with {SCHEMA_VERSION}")
        names = [c.name for c in self.channels]
        if len(set(names)) != len(names):
            raise ValueError("channel names must be unique")
        unknown = set(names) - set(CHANNELS)
        if unknown:
            raise ValueError(f"unknown channel(s): {sorted(unknown)}")
        ids = [r.id for r in self.rules]
        if len(set(ids)) != len(ids):
            raise ValueError("rule ids must be unique")
        for r in self.rules:
            if r.channel not in names:
                raise ValueError(f"rule {r.id} refers to unknown channel {r.channel}")
            if r.status == "applied" and not r.array_key:
                raise ValueError(f"applied rule {r.id} has no array_key")
            if r.status == "skipped" and not r.reason:
                raise ValueError(f"skipped rule {r.id} must say why")
        for c in self.channels:
            if c.status == "available" and not (c.array_key and c.valid_key and c.stats):
                raise ValueError(f"available channel {c.name} needs array_key, valid_key and stats")
            if c.status == "unavailable" and not c.reason:
                raise ValueError(f"unavailable channel {c.name} must say why")
        keys = {a.key for a in self.numerical.arrays}
        for key in [c.array_key for c in self.channels] + [r.array_key for r in self.rules]:
            if key and key not in keys:
                raise ValueError(f"array {key} is not listed in numerical.arrays")
        return self


def json_schema() -> dict:
    schema = VisualMapping.model_json_schema()
    schema["title"] = f"VisualMapping v{SCHEMA_VERSION.split('.')[0]}"
    return schema
