"""Motion plan configuration (YAML): tracks, scene state machine and action rules.

Everything here is a creative choice and can be edited without touching Python. Unknown keys are
errors. A timeline uses one primary profile (the visual mapping it consumes) and may override any
parameter here with `overrides` or `--set path=value`; every override is recorded in the artifact.
"""

from __future__ import annotations

import copy
import hashlib
from pathlib import Path
from typing import Any, Literal

import yaml
from pydantic import BaseModel, ConfigDict, Field, model_validator

from audiolab.motion.vocabulary import COMBINE_RULES, POLICIES, PRIMITIVES, SCENE_STATES


class _M(BaseModel):
    model_config = ConfigDict(extra="forbid")


class PropertySpec(_M):
    """One controllable quantity of a track, in [0, 1] (abstract units for v0.1)."""

    description: str = ""
    combine: Literal["add", "max", "priority", "exclusive"] = "max"
    amplitude_max: float = Field(default=1.0, gt=0, le=1)
    max_rate_per_s: float | None = Field(default=None, gt=0)  # slew limit on the combined curve


class TrackSpec(_M):
    description: str = ""
    primitives: list[str] = Field(min_length=1)
    properties: dict[str, PropertySpec] = Field(min_length=1)

    @model_validator(mode="after")
    def _known(self):
        unknown = set(self.primitives) - set(PRIMITIVES)
        if unknown:
            raise ValueError(f"unknown primitive(s) {sorted(unknown)}; known: {sorted(PRIMITIVES)}")
        return self


class SceneConfig(_M):
    """Scene-level state machine. See state.py for the transition table."""

    signal: str = "intensity"  # visual mapping channel the machine watches
    smooth_s: float = Field(default=2.0, ge=0)  # trailing average before deciding (no look-ahead)
    slope_window_s: float = Field(default=2.0, gt=0)
    rest_enter: float = 0.20
    rest_exit: float = 0.35
    active_enter: float = 0.65
    active_exit: float = 0.50
    build_slope: float = Field(default=0.08, ge=0)  # level change per second that counts as rising
    fall_slope: float = Field(default=0.12, ge=0)  # ...and as falling
    min_dwell_s: dict[str, float] = {"rest": 2.0, "build": 1.5, "active": 3.0, "settle": 2.0}
    end_settle_s: float = Field(default=2.0, ge=0)  # force settle in the last seconds (0 disables)
    initial: Literal["auto", "rest", "active"] = "auto"

    @model_validator(mode="after")
    def _ordered(self):
        if not (self.rest_enter <= self.rest_exit < self.active_exit <= self.active_enter):
            raise ValueError("thresholds must satisfy rest_enter <= rest_exit < active_exit <= active_enter")
        if set(self.min_dwell_s) - set(SCENE_STATES):
            raise ValueError(f"min_dwell_s keys must be scene states {SCENE_STATES}")
        return self


class AmplitudeScale(_M):
    """Multiply an event's amplitude by a channel's value at the source time:
    amplitude *= floor + (1 - floor) * value."""

    channel: str
    floor: float = Field(default=0.0, ge=0, le=1)


class Rule(_M):
    id: str
    kind: Literal["responses", "channel_peaks", "continuous", "hold"]
    track: str
    property: str
    primitive: str
    states: list[str] = list(SCENE_STATES)  # scene states in which the rule may act
    priority: int = 1  # for 'priority' and 'exclusive' properties; higher wins
    gain: float = Field(default=1.0, ge=0)
    enabled: bool = True

    # sources
    channel: str | None = None  # the mapping channel read (responses, channel_peaks, continuous)
    mapping_rule_ids: list[str] | None = None  # responses: only these mapping rules
    min_strength: float = Field(default=0.0, ge=0, le=1)  # responses: ignore weaker responses
    min_height: float = Field(default=0.5, ge=0, le=1)  # channel_peaks
    min_prominence: float = Field(default=0.3, ge=0, le=1)
    min_distance_s: float = Field(default=2.0, gt=0)
    link_tolerance_s: float = Field(default=1.5, ge=0)  # supporting events/interpretations this close
    level: float = Field(default=1.0, ge=0, le=1)  # hold: the constant level
    amplitude_scale_by: AmplitudeScale | None = None

    # timing (event actions)
    policy: Literal["reactive", "anticipatory", "continuous"] | None = None
    anticipation_s: float = Field(default=0.0, ge=0)  # anticipatory: start this long before the peak
    attack_s: float = Field(default=0.02, ge=0)  # reactive: start-to-peak time
    hold_s: float = Field(default=0.0, ge=0)
    release_s: float = Field(default=0.25, ge=0)
    peak_offset_s: float = 0.0  # anticipatory: peak at source time + this
    shape: Literal["linear", "smooth"] = "smooth"
    # continuous
    fade_s: float = Field(default=0.5, ge=0)  # ramp at state boundaries

    @model_validator(mode="after")
    def _consistent(self):
        if self.primitive not in PRIMITIVES:
            raise ValueError(f"{self.id}: unknown primitive {self.primitive!r}")
        prim = PRIMITIVES[self.primitive]
        if self.kind in ("responses", "channel_peaks"):
            if prim.kind != "event":
                raise ValueError(f"{self.id}: {self.primitive} is continuous but rule kind is {self.kind}")
            if self.channel is None:
                raise ValueError(f"{self.id}: {self.kind} rules need a channel")
            self.policy = self.policy or "reactive"
            if self.policy == "continuous":
                raise ValueError(f"{self.id}: event rules cannot use the continuous policy")
            if self.policy == "anticipatory" and self.anticipation_s <= 0:
                raise ValueError(f"{self.id}: anticipatory rules need anticipation_s > 0")
            if self.policy == "anticipatory" and self.peak_offset_s > self.anticipation_s:
                raise ValueError(f"{self.id}: peak_offset_s cannot exceed anticipation_s (the action would start after its source)")
        else:
            if prim.kind != "continuous":
                raise ValueError(f"{self.id}: {self.primitive} is an event primitive but rule kind is {self.kind}")
            if self.kind == "continuous" and self.channel is None:
                raise ValueError(f"{self.id}: continuous rules need a channel")
            if self.policy not in (None, "continuous"):
                raise ValueError(f"{self.id}: continuous rules use the continuous policy")
            self.policy = "continuous"
        unknown = set(self.states) - set(SCENE_STATES)
        if unknown:
            raise ValueError(f"{self.id}: unknown scene state(s) {sorted(unknown)}")
        return self


class MotionConfig(_M):
    name: str = "default"
    version: str = "1"
    description: str = ""
    scene: SceneConfig = SceneConfig()
    tracks: dict[str, TrackSpec]
    rules: list[Rule]
    overrides: dict[str, Any] = {}  # dotted path -> value, applied after loading and recorded

    @model_validator(mode="after")
    def _check(self):
        ids = [r.id for r in self.rules]
        if len(set(ids)) != len(ids):
            raise ValueError("rule ids must be unique")
        for r in self.rules:
            track = self.tracks.get(r.track)
            if track is None:
                raise ValueError(f"{r.id}: unknown track {r.track!r}")
            if r.property not in track.properties:
                raise ValueError(f"{r.id}: track {r.track} has no property {r.property!r}")
            if r.primitive not in track.primitives:
                raise ValueError(f"{r.id}: primitive {r.primitive!r} is not allowed on track {r.track}")
        return self


def _set_path(data: dict, path: str, value: Any) -> Any:
    """Set a dotted path; list items are addressed by rule id (rules.<id>.field) or index."""
    parts = path.split(".")
    node: Any = data
    for i, part in enumerate(parts[:-1]):
        if isinstance(node, list):
            idx = next((k for k, item in enumerate(node) if isinstance(item, dict) and item.get("id") == part), None)
            if idx is None:
                idx = int(part) if part.isdigit() else None
            if idx is None or idx >= len(node):
                raise KeyError(f"override path {path!r}: no list item {part!r}")
            node = node[idx]
        elif part in node:
            node = node[part]
        else:
            raise KeyError(f"override path {path!r}: no key {part!r}")
    last = parts[-1]
    if isinstance(node, list):
        raise KeyError(f"override path {path!r} ends at a list")
    if last not in node:
        raise KeyError(f"override path {path!r}: no key {last!r}")
    old, node[last] = node[last], value
    return old


def parse_override(text: str) -> tuple[str, Any]:
    path, _, raw = text.partition("=")
    if not path or not _:
        raise ValueError(f"override must look like path=value, got {text!r}")
    return path.strip(), yaml.safe_load(raw)


def load_motion_config(path: str | Path, overrides: list[str] | dict[str, Any] | None = None):
    """Return (config, file sha256, applied overrides). Overrides in the file's `overrides` section
    are applied first, then the ones passed in. Each applied override records old and new values."""
    text = Path(path).read_text(encoding="utf-8")
    data = yaml.safe_load(text)
    file_overrides = dict(data.get("overrides") or {})
    extra = dict(parse_override(o) for o in overrides) if isinstance(overrides, list) else dict(overrides or {})
    applied = []
    # Work on the fully resolved configuration, so any real parameter can be overridden even if the
    # file leaves it at its default, and a misspelt path still fails (the key does not exist).
    edited = MotionConfig.model_validate({**data, "overrides": {}}).model_dump(mode="json")
    for source, items in (("file", file_overrides), ("command line", extra)):
        for p, v in items.items():
            old = _set_path(edited, p, v)
            applied.append({"path": p, "old": old, "new": v, "source": source})
    edited["overrides"] = {a["path"]: a["new"] for a in applied}
    return MotionConfig.model_validate(edited), hashlib.sha256(text.encode("utf-8")).hexdigest(), applied
