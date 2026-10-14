"""The scene-level state machine.

One state at a time (rest, build, active, settle), chosen from a smoothed level L and its slope S
(change per second over slope_window_s), with hysteresis and a minimum dwell time. Both are
causal: they use only the past, so the machine could run live. Everything is configurable
(SceneConfig); the transition table below is the fixed part.

    from     to        when
    -------  --------  ---------------------------------------------------------------
    any      active    L >= active_enter                      (not from active)
    active   settle    L <  active_exit  or  S <= -fall_slope
    build    rest      L <  rest_enter
    build    settle    S <= -fall_slope
    settle   rest      L <  rest_enter
    rest     build     L >= rest_exit and S >= build_slope
    settle   build     L >= rest_exit and S >= build_slope
    active/build  settle  in the last end_settle_s of the audio (forced: dwell does not apply)

A transition other than the forced one waits until the current state has lasted its minimum dwell.
Rules are tried in the order listed; the first that applies wins.
"""

from __future__ import annotations

from dataclasses import dataclass

import numpy as np

from audiolab.motion.config import SceneConfig
from audiolab.motion.vocabulary import SCENE_STATES
from audiolab.visual_mapping import signals as sg


@dataclass
class Span:
    state: str
    start_s: float
    end_s: float
    enter_reason: str
    signal_at_entry: float
    slope_at_entry: float
    forced: bool = False


def level_and_slope(t: np.ndarray, x: np.ndarray, cfg: SceneConfig):
    """Trailing-average level and trailing slope (change per second over slope_window_s)."""
    rate = 1.0 / float(np.median(np.diff(t)))
    width = int(round(cfg.smooth_s * rate))
    level = sg.moving_average(x, width, False, "trailing") if width > 1 else np.asarray(x, dtype=float)
    k = max(1, int(round(cfg.slope_window_s * rate)))
    slope = np.zeros_like(level)
    slope[k:] = (level[k:] - level[:-k]) / (k / rate)
    return level, slope


def _next(state: str, level: float, slope: float, cfg: SceneConfig):
    """The state that applies now, with the reason, or None to stay."""
    if state != "active" and level >= cfg.active_enter:
        return "active", f"level {level:.2f} >= active_enter {cfg.active_enter:g}"
    if state == "active":
        if level < cfg.active_exit:
            return "settle", f"level {level:.2f} < active_exit {cfg.active_exit:g}"
        if slope <= -cfg.fall_slope:
            return "settle", f"slope {slope:.2f}/s <= -fall_slope {-cfg.fall_slope:g}"
    if state == "build":
        if level < cfg.rest_enter:
            return "rest", f"level {level:.2f} < rest_enter {cfg.rest_enter:g}"
        if slope <= -cfg.fall_slope:
            return "settle", f"slope {slope:.2f}/s <= -fall_slope {-cfg.fall_slope:g}"
    if state == "settle" and level < cfg.rest_enter:
        return "rest", f"level {level:.2f} < rest_enter {cfg.rest_enter:g}"
    if state in ("rest", "settle") and level >= cfg.rest_exit and slope >= cfg.build_slope:
        return "build", f"level {level:.2f} >= rest_exit {cfg.rest_exit:g} and slope {slope:.2f}/s >= build_slope {cfg.build_slope:g}"
    return None


def run_state_machine(t: np.ndarray, x: np.ndarray, cfg: SceneConfig, duration: float):
    """Return (spans covering [0, duration], per-sample state index array)."""
    level, slope = level_and_slope(t, x, cfg)
    if cfg.initial == "auto":
        state = "active" if level[0] >= cfg.active_enter else "rest"
    else:
        state = cfg.initial
    entered_at = 0.0
    spans = [Span(state, 0.0, 0.0, f"initial state ({cfg.initial})", float(level[0]), float(slope[0]))]
    idx = np.zeros(len(t), dtype=np.int8)
    end_zone = duration - cfg.end_settle_s if cfg.end_settle_s > 0 else None

    for i, ti in enumerate(t):
        in_end_zone = end_zone is not None and ti >= end_zone
        forced = in_end_zone and state in ("active", "build")
        if forced:
            nxt = ("settle", f"end of the audio: last {cfg.end_settle_s:g} s")
        elif ti - entered_at >= cfg.min_dwell_s.get(state, 0.0):
            nxt = _next(state, float(level[i]), float(slope[i]), cfg)
            if in_end_zone and nxt and nxt[0] in ("active", "build"):
                nxt = None  # the audio is ending: once settled, the scene stays settled (or goes to rest)
        else:
            nxt = None
        if nxt and nxt[0] != state:
            spans[-1].end_s = float(ti)
            state, entered_at = nxt[0], float(ti)
            spans.append(Span(state, float(ti), float(ti), nxt[1], float(level[i]), float(slope[i]), forced))
        idx[i] = SCENE_STATES.index(state)
    spans[-1].end_s = float(duration)
    return spans, idx
