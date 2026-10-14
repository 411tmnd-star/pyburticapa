"""The scene state machine and the motion configuration, on made-up signals with known answers."""

import numpy as np
import pytest
import yaml
from pydantic import ValidationError

from audiolab.motion.config import MotionConfig, SceneConfig, load_motion_config, parse_override
from audiolab.motion.state import level_and_slope, run_state_machine
from audiolab.motion.vocabulary import SCENE_STATES

RATE = 30.0


def grid(duration):
    return np.arange(int(duration * RATE) + 1) / RATE


def signal(duration, fn):
    t = grid(duration)
    return t, np.asarray(fn(t), dtype=float)


def scene(**kw):
    base = dict(smooth_s=0.0, slope_window_s=1.0, end_settle_s=0.0, min_dwell_s={s: 0.0 for s in SCENE_STATES})
    return SceneConfig(**{**base, **kw})


def states_of(spans):
    return [s.state for s in spans]


# ---- spans -------------------------------------------------------------------------------------


def test_spans_are_contiguous_and_cover_the_audio():
    t, x = signal(40, lambda t: np.where(t < 20, 0.1, 0.9))
    spans, idx = run_state_machine(t, x, scene(), duration=40.0)
    assert spans[0].start_s == 0.0 and spans[-1].end_s == 40.0
    assert all(a.end_s == b.start_s for a, b in zip(spans, spans[1:]))
    assert len(idx) == len(t) and set(np.unique(idx)) <= set(range(4))
    for s in spans:  # the sampled index agrees with the spans
        sel = (t >= s.start_s) & (t < s.end_s)
        assert np.all(idx[sel] == SCENE_STATES.index(s.state))


def test_rest_to_active_on_a_jump_and_the_reason_is_recorded():
    t, x = signal(40, lambda t: np.where(t < 20, 0.1, 0.9))
    spans, _ = run_state_machine(t, x, scene(), duration=40.0)
    assert states_of(spans) == ["rest", "active"]
    assert spans[1].start_s == pytest.approx(20.0, abs=1 / RATE)
    assert "active_enter" in spans[1].enter_reason and spans[1].signal_at_entry == pytest.approx(0.9)


# ---- hysteresis and dwell ----------------------------------------------------------------------


def test_a_level_between_the_thresholds_does_not_flip_the_state():
    cfg = scene()  # active_exit 0.5, active_enter 0.65
    between = lambda t: np.full_like(t, 0.57)
    t, x = signal(30, between)
    assert states_of(run_state_machine(t, x, cfg, 30.0)[0]) == ["rest"], "a level under active_enter never enters active"
    # A sudden fall has a steep negative slope and would leave active; a gentle drift to 0.57 does not.
    t, x = signal(60, lambda t: np.interp(t, [0, 10, 50, 60], [0.9, 0.9, 0.57, 0.57]))
    assert states_of(run_state_machine(t, x, cfg, 60.0)[0]) == ["active"], "a level over active_exit never leaves active"


def test_noise_around_a_threshold_does_not_make_the_state_flicker():
    rng = np.random.default_rng(3)
    noisy = lambda t: 0.6 + 0.04 * rng.standard_normal(len(t))  # straddles active_enter's neighbourhood
    t, x = signal(60, noisy)
    raw, _ = run_state_machine(t, x, scene(), 60.0)  # no smoothing, no dwell: it flickers
    calm, _ = run_state_machine(t, x, SceneConfig(end_settle_s=0.0), 60.0)  # the shipped defaults
    assert len(raw) > 20 and len(calm) <= 3


def test_minimum_dwell_is_respected_by_every_span_except_one_cut_by_the_forced_end():
    cfg = scene(min_dwell_s={"rest": 2.0, "build": 2.0, "active": 3.0, "settle": 2.0})
    t, x = signal(60, lambda t: 0.5 + 0.45 * np.sin(2 * np.pi * t / 3.0))  # swings every 1.5 s
    spans, _ = run_state_machine(t, x, cfg, 60.0)
    for s in spans[:-1]:
        assert s.end_s - s.start_s >= cfg.min_dwell_s[s.state] - 1 / RATE, (s.state, s.end_s - s.start_s)
    free, _ = run_state_machine(t, x, scene(), 60.0)
    assert len(spans) < len(free), "dwell reduces the number of state changes"


# ---- the transition table ----------------------------------------------------------------------


def test_a_slow_rise_is_a_build_and_a_flat_level_is_not():
    cfg = scene(slope_window_s=2.0)
    t, x = signal(40, lambda t: np.clip(0.3 + 0.03 * t, 0, 0.6))  # 0.03/s is below build_slope 0.08
    assert "build" not in states_of(run_state_machine(t, x, cfg, 40.0)[0])
    t, x = signal(40, lambda t: np.clip(0.3 + 0.12 * (t - 5), 0.3, 0.6))  # 0.12/s
    spans, _ = run_state_machine(t, x, cfg, 40.0)
    assert states_of(spans)[:2] == ["rest", "build"]
    assert spans[1].start_s == pytest.approx(5.0, abs=2.5)


def test_full_cycle_with_a_second_slow_rise():
    path = lambda t: np.interp(t, [0, 10, 15, 20, 30, 40, 50, 60, 70, 80], [0.05, 0.05, 0.6, 0.9, 0.9, 0.9, 0.3, 0.05, 0.05, 0.9])
    t, x = signal(80, path)
    spans, _ = run_state_machine(t, x, scene(slope_window_s=2.0), 80.0)
    assert states_of(spans) == ["rest", "build", "active", "settle", "rest", "build", "active"], states_of(spans)


def test_falling_slope_alone_leaves_active_before_the_level_gets_low():
    t, x = signal(40, lambda t: np.where(t < 15, 0.95, np.clip(0.95 - 0.2 * (t - 15), 0.55, 0.95)))
    spans, _ = run_state_machine(t, x, scene(slope_window_s=1.0), 40.0)
    assert states_of(spans)[:2] == ["active", "settle"]
    assert "slope" in spans[1].enter_reason and spans[1].signal_at_entry > 0.6


def test_settle_returns_to_active_when_the_level_recovers():
    t, x = signal(60, lambda t: np.where((t > 20) & (t < 30), 0.4, 0.9))
    assert states_of(run_state_machine(t, x, scene(), 60.0)[0]) == ["active", "settle", "active"]


# ---- the end of the audio ----------------------------------------------------------------------


def test_the_scene_is_forced_to_settle_in_the_last_seconds_and_this_can_be_disabled():
    t, x = signal(40, lambda t: np.full_like(t, 0.9))
    on, _ = run_state_machine(t, x, scene(end_settle_s=2.0), 40.0)
    assert states_of(on) == ["active", "settle"] and on[-1].forced and on[-1].start_s == pytest.approx(38.0, abs=1 / RATE)
    off, _ = run_state_machine(t, x, scene(end_settle_s=0.0), 40.0)
    assert states_of(off) == ["active"] and not off[-1].forced


def test_once_settled_at_the_end_the_scene_does_not_flip_back_to_active():
    t, x = signal(40, lambda t: np.full_like(t, 0.9))  # high level all the way to the end, no dwell
    spans, _ = run_state_machine(t, x, scene(end_settle_s=2.0), 40.0)
    assert states_of(spans) == ["active", "settle"]


def test_the_forced_settle_ignores_dwell():
    cfg = scene(end_settle_s=2.0, min_dwell_s={"rest": 0, "build": 0, "active": 30.0, "settle": 0})
    t, x = signal(40, lambda t: np.where(t < 37, 0.1, 0.9))
    spans, _ = run_state_machine(t, x, cfg, 40.0)
    assert states_of(spans)[-1] == "settle" and spans[-1].forced


# ---- causality and determinism -----------------------------------------------------------------


def test_the_machine_is_causal_the_future_cannot_change_the_past():
    cfg = scene(smooth_s=1.5, slope_window_s=2.0, min_dwell_s={"rest": 1.0, "build": 1.0, "active": 1.5, "settle": 1.0})
    t, x = signal(60, lambda t: 0.5 + 0.4 * np.sin(2 * np.pi * t / 17.0))
    y = x.copy()
    y[t > 40] = 0.0  # rewrite everything after 40 s
    a_spans, a_idx = run_state_machine(t, x, cfg, 60.0)
    b_spans, b_idx = run_state_machine(t, y, cfg, 60.0)
    assert np.array_equal(a_idx[t <= 40], b_idx[t <= 40])
    lv_a, sl_a = level_and_slope(t, x, cfg)
    lv_b, sl_b = level_and_slope(t, y, cfg)
    assert np.array_equal(lv_a[t <= 40], lv_b[t <= 40]) and np.array_equal(sl_a[t <= 40], sl_b[t <= 40])


def test_identical_input_gives_identical_output():
    t, x = signal(60, lambda t: 0.5 + 0.45 * np.sin(2 * np.pi * t / 11.0))
    a, ai = run_state_machine(t, x, scene(), 60.0)
    b, bi = run_state_machine(t, x, scene(), 60.0)
    assert a == b and np.array_equal(ai, bi)


@pytest.mark.parametrize("initial, level, expected", [("auto", 0.9, "active"), ("auto", 0.1, "rest"), ("rest", 0.9, "rest")])
def test_initial_state(initial, level, expected):
    t, x = signal(20, lambda t: np.full_like(t, level))
    spans, _ = run_state_machine(t, x, scene(initial=initial, min_dwell_s={s: 99.0 for s in SCENE_STATES}), 20.0)
    assert spans[0].state == expected


@pytest.mark.parametrize("kw, message", [
    (dict(rest_exit=0.1), "thresholds"),
    (dict(active_exit=0.7), "thresholds"),
    (dict(min_dwell_s={"sleeping": 1.0}), "scene states"),
    (dict(slope_window_s=0), ""),
])
def test_scene_config_validation(kw, message):
    with pytest.raises(ValidationError, match=message):
        SceneConfig(**kw)


# ---- configuration -----------------------------------------------------------------------------

BASE = {"name": "t", "tracks": {"a": {"primitives": ["pulse", "drift", "burst"], "properties": {"p": {}, "q": {}}}},
        "rules": [{"id": "r", "kind": "responses", "track": "a", "property": "p", "primitive": "pulse", "channel": "c"}]}


def cfg_with(edit=None):
    import copy
    d = copy.deepcopy(BASE)
    if edit:
        edit(d)
    return MotionConfig.model_validate(d)


def test_the_minimal_config_is_valid_and_defaults_to_a_reactive_policy():
    c = cfg_with()
    assert c.rules[0].policy == "reactive" and c.tracks["a"].properties["p"].combine == "max"


@pytest.mark.parametrize("edit, message", [
    (lambda d: d.update(surprise=1), "surprise"),
    (lambda d: d["rules"][0].update(track="nope"), "unknown track"),
    (lambda d: d["rules"][0].update(property="nope"), "no property"),
    (lambda d: d["rules"][0].update(primitive="transition_in"), "not allowed on track"),
    (lambda d: d["rules"][0].update(primitive="spin"), "unknown primitive"),
    (lambda d: d["rules"][0].update(primitive="drift"), "continuous but rule kind"),
    (lambda d: d["rules"][0].update(kind="continuous", primitive="pulse"), "event primitive"),
    (lambda d: d["rules"][0].update(policy="anticipatory"), "anticipation_s"),
    (lambda d: d["rules"][0].update(policy="anticipatory", anticipation_s=0.1, peak_offset_s=0.3), "peak_offset_s"),
    (lambda d: d["rules"][0].update(policy="continuous"), "continuous policy"),
    (lambda d: d["rules"][0].pop("channel"), "need a channel"),
    (lambda d: d["rules"][0].update(states=["asleep"]), "unknown scene state"),
    (lambda d: d["rules"].append(dict(d["rules"][0])), "unique"),
    (lambda d: d["tracks"]["a"]["properties"]["p"].update(amplitude_max=2), "amplitude_max"),
    (lambda d: d["tracks"]["a"]["properties"]["p"].update(combine="blend"), "combine"),
    (lambda d: d["tracks"]["a"].update(primitives=["wave"]), "unknown primitive"),
])
def test_bad_configurations_are_rejected(edit, message):
    with pytest.raises(ValidationError, match=message):
        cfg_with(edit)


def test_the_shipped_default_config_loads_and_covers_the_four_abstract_tracks():
    cfg, sha, applied = load_motion_config("configs/motion/default.yaml")
    assert set(cfg.tracks) == {"camera", "main_element", "background", "particles"}
    assert len(sha) == 64 and applied == []
    assert {r.policy for r in cfg.rules} == {"reactive", "anticipatory", "continuous"}
    assert {t.properties[p].combine for t in cfg.tracks.values() for p in t.properties} >= {"add", "max", "priority"}


# ---- explicit, recorded overrides --------------------------------------------------------------


@pytest.fixture
def cfg_file(tmp_path):
    p = tmp_path / "m.yaml"
    d = {**BASE, "scene": {"smooth_s": 1.0}}
    p.write_text(yaml.safe_dump(d), encoding="utf-8")
    return p


def test_command_line_overrides_are_applied_and_recorded(cfg_file):
    cfg, sha, applied = load_motion_config(cfg_file, ["rules.r.min_strength=0.4", "scene.smooth_s=3"])
    assert cfg.rules[0].min_strength == 0.4 and cfg.scene.smooth_s == 3
    assert applied == [
        {"path": "rules.r.min_strength", "old": 0.0, "new": 0.4, "source": "command line"},
        {"path": "scene.smooth_s", "old": 1.0, "new": 3, "source": "command line"},
    ]
    assert cfg.overrides == {"rules.r.min_strength": 0.4, "scene.smooth_s": 3}


def test_overrides_in_the_file_apply_first_and_are_marked(cfg_file):
    d = yaml.safe_load(cfg_file.read_text(encoding="utf-8"))
    d["overrides"] = {"scene.smooth_s": 5}
    cfg_file.write_text(yaml.safe_dump(d), encoding="utf-8")
    cfg, _, applied = load_motion_config(cfg_file, ["scene.smooth_s=7"])
    assert [a["source"] for a in applied] == ["file", "command line"] and cfg.scene.smooth_s == 7


@pytest.mark.parametrize("override", ["rules.nope.gain=1", "scene.nope=1", "tracks.a.primitives=x", "gain", "rules.r.gain=-1"])
def test_bad_overrides_fail_loudly(cfg_file, override):
    with pytest.raises((KeyError, ValueError, ValidationError)):
        load_motion_config(cfg_file, [override])


def test_override_values_are_parsed_as_yaml():
    assert parse_override("a.b=[1, 2]") == ("a.b", [1, 2])
    assert parse_override("a.b=true") == ("a.b", True)
    assert parse_override("a.b=0.25") == ("a.b", 0.25)
