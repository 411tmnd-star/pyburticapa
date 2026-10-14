"""Versioned schema for the motion timeline artifact (motion_timeline.<profile>.json).

A motion timeline is a plan for how abstract visual targets (tracks) should move: scene states over
time and a list of motion actions, each with start, peak and end times, an amplitude, a timing
policy and the sources that caused it. It is not a rendering and says nothing about pixels, units
or hardware. The sampled property curves live in the sidecar .npz.

Shared plan properties (timing, target, primitive, amplitude, easing, source references, constraint
status) belong here. Physical units, actuator limits, execution latency and safety validation belong
to a future execution adapter, never to this plan.

Times are seconds from the start of the audio. Paths are relative to the JSON file. Change the major
version for anything that breaks readers.
"""

from __future__ import annotations

from typing import Any, Literal

from pydantic import BaseModel, ConfigDict, Field, model_validator

from audiolab.motion.vocabulary import PRIMITIVES, SCENE_STATES

SCHEMA_VERSION = "1.0.0"
ARTIFACT = "motion_timeline"
TIME_TOLERANCE = 1e-6


class _M(BaseModel):
    model_config = ConfigDict(extra="forbid")


class Sources(_M):
    mapping_path: str
    mapping_file_sha256: str = Field(min_length=64, max_length=64)
    mapping_content_sha256: str = Field(min_length=64, max_length=64)  # ignores created_at
    mapping_schema_version: str
    mapping_engine_version: str
    mapping_numerical_sha256: str = Field(min_length=64, max_length=64)
    profile_name: str
    profile_version: str
    profile_file_sha256: str | None
    analysis_path: str
    analysis_content_sha256: str = Field(min_length=64, max_length=64)
    audio_sha256: str = Field(min_length=64, max_length=64)
    interpretation_path: str | None
    interpretation_content_sha256: str | None
    duration_s: float = Field(gt=0)


class ConfigRecord(_M):
    name: str
    version: str
    file: str | None
    file_sha256: str | None
    spec: dict[str, Any]  # the full resolved configuration: enough to reproduce without the file
    overrides: list[dict[str, Any]]  # every override applied: path, old, new, source


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
    note: str


class PrimitiveDef(_M):
    name: str
    kind: str
    definition: str


class Vocabulary(_M):
    primitives: list[PrimitiveDef]
    policies: dict[str, str]
    scene_states: dict[str, str]
    combine_rules: dict[str, str]


class PropertyRecord(_M):
    name: str
    description: str
    combine: str
    amplitude_max: float
    max_rate_per_s: float | None
    array_key: str
    mean: float
    max: float
    p95: float


class TrackRecord(_M):
    name: str
    description: str
    primitives: list[str]
    properties: list[PropertyRecord]


class StateSpan(_M):
    id: str
    state: str
    start_s: float = Field(ge=0)
    end_s: float = Field(ge=0)
    enter_reason: str
    signal_at_entry: float
    slope_at_entry: float
    forced: bool = False  # entered by the end-of-audio rule, so minimum dwell does not apply


class Causes(_M):
    kind: Literal["mapping_response", "channel_peak", "channel", "constant"]
    channel: str | None = None
    mapping_rule_ids: list[str] = []
    source_ids: list[str] = []  # analysis event or interpretation ids, verbatim
    response_rows: list[int] = []  # rows of the mapping's response table
    supporting_ids: list[str] = []  # nearby events / interpretations that corroborate it
    channel_value: float | None = None  # the channel's value at the source time


class Action(_M):
    id: str
    rule_id: str
    track: str
    property: str
    primitive: str
    kind: Literal["event", "continuous"]
    policy: Literal["reactive", "anticipatory", "continuous"]
    status: Literal["scheduled", "suppressed"]
    reason: str | None = None  # why it was suppressed
    suppressed_by: str | None = None
    # Timing. The source time is the musical event; start, peak, settle and end are the visual response.
    source_time_s: float | None = None
    time_basis: Literal["event", "channel_peak_sampled", "none"] = "none"
    start_s: float
    peak_s: float | None = None
    settle_s: float | None = None  # where the hold ends and the fall begins (event actions)
    end_s: float
    amplitude: float = Field(ge=0, le=1)
    clamped: bool = False  # amplitude exceeded the property's maximum (the sampled curve is clamped)
    priority: int
    easing: Literal["linear", "smooth"]
    scene_state: str | None = None  # the scene state at the source time (event) or start (continuous)
    lookahead_s: float = Field(ge=0)  # how far before its source time the action starts
    channel_lookahead_s: float = Field(ge=0)  # look-ahead built into the mapping channel it reads
    extends_outside_audio: bool = False
    causes: Causes


class Resolution(_M):
    track: str
    property: str
    combine: str
    n_actions: int
    n_suppressed: int
    n_overlap_samples: int  # samples where two or more actions were active together
    max_simultaneous: int


class Constraint(_M):
    track: str
    property: str
    amplitude_max: float
    max_rate_per_s: float | None
    n_clamped_samples: int
    n_rate_limited_samples: int


class SkippedRule(_M):
    id: str
    reason: str


class ArrayInfo(_M):
    key: str
    shape: list[int]
    dtype: str
    description: str


class Numerical(_M):
    file: str
    sha256: str = Field(min_length=64, max_length=64)
    arrays: list[ArrayInfo]


class MotionTimeline(_M):
    artifact: Literal["motion_timeline"] = ARTIFACT
    schema_version: str
    engine: Engine
    sources: Sources
    config: ConfigRecord
    provenance: Provenance
    timebase: Timebase
    vocabulary: Vocabulary
    tracks: list[TrackRecord]
    states: list[StateSpan]
    actions: list[Action]
    resolutions: list[Resolution]
    constraints: list[Constraint]
    skipped_rules: list[SkippedRule]
    limitations: list[str]
    numerical: Numerical

    @model_validator(mode="after")
    def _check(self):
        if self.schema_version.split(".")[0] != SCHEMA_VERSION.split(".")[0]:
            raise ValueError(f"schema_version {self.schema_version} is not compatible with {SCHEMA_VERSION}")
        duration = self.sources.duration_s
        tracks = {t.name: t for t in self.tracks}
        props = {(t.name, p.name) for t in self.tracks for p in t.properties}

        if not self.states:
            raise ValueError("a timeline needs at least one scene state")
        prev_end = 0.0
        for i, s in enumerate(self.states):
            if s.state not in SCENE_STATES:
                raise ValueError(f"{s.id}: unknown scene state {s.state!r}")
            if abs(s.start_s - prev_end) > TIME_TOLERANCE:
                raise ValueError(f"{s.id}: states must be contiguous (starts at {s.start_s}, previous ended {prev_end})")
            if s.end_s < s.start_s:
                raise ValueError(f"{s.id}: ends before it starts")
            prev_end = s.end_s
        if abs(prev_end - duration) > 2.0 / self.timebase.rate_hz:
            raise ValueError(f"states end at {prev_end}, not at the end of the audio ({duration})")

        seen: set[str] = set()
        for a in self.actions:
            if a.id in seen:
                raise ValueError(f"duplicate action id {a.id}")
            seen.add(a.id)
            if (a.track, a.property) not in props:
                raise ValueError(f"{a.id}: no property {a.track}.{a.property}")
            if a.primitive not in tracks[a.track].primitives:
                raise ValueError(f"{a.id}: primitive {a.primitive} is not allowed on track {a.track}")
            if PRIMITIVES[a.primitive].kind != a.kind:
                raise ValueError(f"{a.id}: primitive {a.primitive} is {PRIMITIVES[a.primitive].kind}, not {a.kind}")
            if a.status == "suppressed" and not a.reason:
                raise ValueError(f"{a.id}: a suppressed action must say why")
            if a.end_s < a.start_s - TIME_TOLERANCE:
                raise ValueError(f"{a.id}: ends before it starts")
            if a.kind == "event":
                if a.peak_s is None or a.settle_s is None or a.source_time_s is None:
                    raise ValueError(f"{a.id}: an event action needs source_time_s, peak_s and settle_s")
                if not (a.start_s - TIME_TOLERANCE <= a.peak_s <= a.settle_s + TIME_TOLERANCE <= a.end_s + 2 * TIME_TOLERANCE):
                    raise ValueError(f"{a.id}: times must satisfy start <= peak <= settle <= end")
                expected = max(0.0, a.source_time_s - a.start_s)
                if abs(a.lookahead_s - expected) > 1e-5:
                    raise ValueError(f"{a.id}: lookahead_s {a.lookahead_s} does not match source_time_s - start_s = {expected}")
                if a.policy == "reactive" and a.start_s < a.source_time_s - TIME_TOLERANCE:
                    raise ValueError(f"{a.id}: a reactive action cannot start before its source time")
                if a.policy == "anticipatory" and a.start_s > a.source_time_s + TIME_TOLERANCE:
                    raise ValueError(f"{a.id}: an anticipatory action must start at or before its source time")
            elif a.policy != "continuous":
                raise ValueError(f"{a.id}: a continuous action must use the continuous policy")
            outside = a.start_s < -TIME_TOLERANCE or a.end_s > duration + TIME_TOLERANCE
            if outside != a.extends_outside_audio:
                raise ValueError(f"{a.id}: extends_outside_audio is {a.extends_outside_audio} but the times say {outside}")
        for a in self.actions:
            if a.suppressed_by and a.suppressed_by not in seen:
                raise ValueError(f"{a.id}: suppressed_by {a.suppressed_by} does not exist")
        keys = {x.key for x in self.numerical.arrays}
        for t in self.tracks:
            for p in t.properties:
                if p.array_key not in keys:
                    raise ValueError(f"array {p.array_key} is not listed in numerical.arrays")
        return self


def json_schema() -> dict:
    schema = MotionTimeline.model_json_schema()
    schema["title"] = f"MotionTimeline v{SCHEMA_VERSION.split('.')[0]}"
    return schema
