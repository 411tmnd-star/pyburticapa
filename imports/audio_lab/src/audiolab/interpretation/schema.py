"""Versioned schema for the interpretation artifact (song_interpretation.json).

An interpretation is a described change or passage in a song, backed by evidence from the
analysis artifact (song_analysis.json and its curves file). It says what was observed and which
rule produced the description; it does not say what the music means beyond its operational
definition, and it never edits the analysis it reads.

Conventions
- Times are seconds from the start of the audio, as in the analysis artifact.
- `kind` is "change" (a point on the beat grid, start_s == end_s) or "passage" (a span).
- `confidence` is always null in v1: no rule has a calibrated confidence. Judge an interpretation
  by its `evidence`, which lists every measurement and every criterion with its observed value and
  threshold.
- Source event IDs are copied verbatim from the analysis artifact.
- Continuous evidence is referenced by curve key and time window (`CurveRef`), so a reader can
  recompute it from the curves file without knowing how the analyzer works.

Change the major version for anything that breaks readers; bump minor/patch for additions.
"""

from __future__ import annotations

from typing import Any, Literal

from pydantic import BaseModel, ConfigDict, Field, model_validator

SCHEMA_VERSION = "1.0.0"
ARTIFACT = "song_interpretation"


class _Model(BaseModel):
    model_config = ConfigDict(extra="forbid")


class Window(_Model):
    start_s: float = Field(ge=0)
    end_s: float = Field(ge=0)

    @model_validator(mode="after")
    def _ordered(self) -> "Window":
        if self.end_s < self.start_s:
            raise ValueError("window end_s is before start_s")
        return self


class CurveRef(_Model):
    """A slice of one array in the curves file: frames [frame_start, frame_end)."""

    file: str
    key: str
    frame_start: int = Field(ge=0)
    frame_end: int = Field(ge=0)


class Measurement(_Model):
    name: str  # unique within the interpretation, referenced in prose and by criteria
    feature: str  # curve key, or "onset_rate" for a rate derived from onset events
    statistic: str  # how the window was summarised, e.g. "mean_power_db"
    value: float
    unit: str
    window: Window
    curve: CurveRef | None = None  # present when the value comes from a curve
    event_ids: list[str] = []  # present when the value comes from events


class Criterion(_Model):
    description: str
    observed: float
    comparator: Literal["ge", "le"]
    threshold: float
    met: bool


class Evidence(_Model):
    measurements: list[Measurement]
    criteria: list[Criterion]
    supporting_event_ids: list[str] = []  # events in the analysis artifact that support it


class RuleRef(_Model):
    name: str
    version: str


class Interpretation(_Model):
    id: str
    label: str
    kind: Literal["change", "passage"]
    start_s: float = Field(ge=0)
    end_s: float = Field(ge=0)
    anchor_event_id: str | None = None  # the beat a change is placed on
    rule: RuleRef
    evidence: Evidence
    related_ids: list[str] = []  # other interpretations close in time (transition candidates)
    attributes: dict[str, str | float | int | bool] = {}
    confidence: float | None = Field(default=None, ge=0, le=1)
    limitations: list[str] = []


class VocabularyEntry(_Model):
    label: str
    kind: Literal["change", "passage"]
    rule_version: str
    definition: str  # the operational definition the rule implements
    requires: list[str]  # features the rule needs; if absent the rule is skipped


class SkippedRule(_Model):
    label: str
    reason: str


class SourceAnalysis(_Model):
    path: str  # relative to this file
    file_sha256: str = Field(min_length=64, max_length=64)
    content_sha256: str = Field(min_length=64, max_length=64)  # of the analysis minus created_at
    schema_version: str
    audio_file: str
    audio_sha256: str = Field(min_length=64, max_length=64)
    curves_file: str
    curves_sha256: str = Field(min_length=64, max_length=64)
    duration_s: float = Field(gt=0)
    frame_rate_hz: float = Field(gt=0)


class Method(_Model):
    name: str
    version: str


class InterpretationProvenance(_Model):
    created_at: str  # UTC ISO 8601; the only field that differs between identical runs
    python_version: str
    libraries: dict[str, str]
    config: dict[str, Any]
    window_s: float  # the comparison window the beat-based setting resolved to for this song
    evaluated_range_s: Window | None  # where change rules could compare full windows


class SongInterpretation(_Model):
    artifact: Literal["song_interpretation"] = ARTIFACT
    schema_version: str
    source_analysis: SourceAnalysis
    method: Method
    provenance: InterpretationProvenance
    vocabulary: list[VocabularyEntry]
    skipped_rules: list[SkippedRule]
    limitations: list[str]
    interpretations: list[Interpretation]

    @model_validator(mode="after")
    def _check(self) -> "SongInterpretation":
        if self.schema_version.split(".")[0] != SCHEMA_VERSION.split(".")[0]:
            raise ValueError(
                f"schema_version {self.schema_version} is not compatible with {SCHEMA_VERSION}"
            )
        vocab = {v.label: v for v in self.vocabulary}
        duration = self.source_analysis.duration_s
        slack = 2.0 / self.source_analysis.frame_rate_hz

        seen: set[str] = set()
        last = (-1.0, "")
        for it in self.interpretations:
            if it.id in seen:
                raise ValueError(f"duplicate interpretation id {it.id}")
            seen.add(it.id)
            if it.label not in vocab:
                raise ValueError(f"{it.id}: label {it.label!r} is not in the vocabulary")
            if vocab[it.label].kind != it.kind:
                raise ValueError(f"{it.id}: kind {it.kind!r} contradicts the vocabulary")
            if it.end_s < it.start_s:
                raise ValueError(f"{it.id}: end_s is before start_s")
            if it.kind == "change" and it.end_s != it.start_s:
                raise ValueError(f"{it.id}: a change must have start_s == end_s")
            if it.end_s > duration + slack:
                raise ValueError(f"{it.id}: ends after the audio")
            if (it.start_s, it.label) < last:
                raise ValueError(f"{it.id}: interpretations must be sorted by start time, then label")
            last = (it.start_s, it.label)

            names = [m.name for m in it.evidence.measurements]
            if len(set(names)) != len(names):
                raise ValueError(f"{it.id}: measurement names must be unique")
        for it in self.interpretations:
            for rid in it.related_ids:
                if rid not in seen:
                    raise ValueError(f"{it.id}: related id {rid} does not exist")
        return self


def json_schema() -> dict:
    schema = SongInterpretation.model_json_schema()
    schema["title"] = f"SongInterpretation v{SCHEMA_VERSION.split('.')[0]}"
    return schema
