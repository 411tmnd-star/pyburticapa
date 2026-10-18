"""The motion vocabulary: primitives, timing policies, scene states and combination rules.

These are definitions, not behaviour. They say what a name means so that a plan can be read, and
checked, without knowing the engine. Tracks and their limits are configuration (config.py), not
vocabulary: the same primitives can be allowed on different tracks in different compositions.
"""

from __future__ import annotations

from dataclasses import dataclass

# Scene states: the overall musical and visual condition. One at a time, with hysteresis and a
# minimum dwell time (state.py). Concurrent motion actions are NOT states.
SCENE_STATES = ("rest", "build", "active", "settle")

STATE_DEFINITIONS = {
    "rest": "Low energy: the scene is quiet and mostly still.",
    "build": "Energy is rising but has not reached the active level.",
    "active": "Sustained high energy.",
    "settle": "Energy is falling away from active, or the audio is ending.",
}


@dataclass(frozen=True)
class Primitive:
    name: str
    kind: str  # "event" (start/peak/end around a source time) or "continuous" (follows a signal)
    definition: str


PRIMITIVES: dict[str, Primitive] = {
    p.name: p
    for p in (
        Primitive("pulse", "event", "A short accent: rises to a peak and falls away."),
        Primitive("burst", "event", "A larger accent with a held peak and a longer settle, usually anticipated."),
        Primitive("transition_out", "event", "The current look leaving: builds toward the transition and drops quickly."),
        Primitive("transition_in", "event", "A new look arriving: rises at the transition and settles slowly."),
        Primitive("drift", "continuous", "A slow level that follows a control channel."),
        Primitive("sway", "continuous", "A continuous movement amount that follows a control channel."),
        Primitive("hold", "continuous", "A constant level held while the scene is in an allowed state."),
    )
}

# When an event action starts relative to the source event it answers.
POLICIES = {
    "reactive": "Starts at the source time; the peak follows after the attack.",
    "anticipatory": "Starts before the source time so that the peak lands on it (or at peak_offset_s from it).",
    "continuous": "Follows a control signal; there is no single source time.",
}

# How simultaneous actions on one property combine (config: tracks.<t>.properties.<p>.combine).
COMBINE_RULES = {
    "add": "Contributions are summed, then limited to the property's amplitude maximum.",
    "max": "At each instant the largest contribution wins.",
    "priority": "At each instant the highest-priority contribution that is active wins; ties go to the larger value.",
    "exclusive": "Overlapping actions cannot coexist: a lower-priority action overlapping a higher-priority one is suppressed when planned.",
}

EVENT_KINDS = ("responses", "channel_peaks")
CONTINUOUS_KINDS = ("continuous", "hold")
