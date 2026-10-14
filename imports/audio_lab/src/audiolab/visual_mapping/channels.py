"""The visual control channels a mapping can produce.

Every channel is a unitless control signal in [0, 1]. 0 is the channel's resting state and 1 its
strongest response within one mapping. Values are relative to the song and the profile, not
physical quantities: a 1.0 in one song is not "as loud" as a 1.0 in another.

What a renderer does with a channel is a later decision. The meanings below say what each channel
is intended to steer, so profiles can be written consistently.
"""

from __future__ import annotations

from dataclasses import dataclass

RANGE = (0.0, 1.0)


@dataclass(frozen=True)
class ChannelDef:
    name: str
    meaning: str
    behaviour: str  # "continuous", "impulsive" or "event-driven": how the signal is expected to move


CHANNELS: dict[str, ChannelDef] = {
    c.name: c
    for c in (
        ChannelDef(
            "intensity", "Overall visual energy of the composition (brightness, saturation, contrast).",
            "continuous",
        ),
        ChannelDef(
            "scale", "Size of the main visual elements relative to their base size.",
            "continuous, may carry pulses",
        ),
        ChannelDef(
            "density", "How many visual elements are present or active.", "continuous, slow",
        ),
        ChannelDef(
            "motion_weight", "How much and how heavily things move (amplitude and inertia of motion).",
            "continuous, slow",
        ),
        ChannelDef(
            "pulse_strength", "Short accents synchronised to rhythmic events.", "impulsive",
        ),
        ChannelDef(
            "transition_weight", "Readiness for a scene or composition change around musical changes.",
            "event-driven",
        ),
        ChannelDef(
            "detail_activity", "Activity of fine detail (texture, small particles, flicker).",
            "continuous, fast",
        ),
    )
}
