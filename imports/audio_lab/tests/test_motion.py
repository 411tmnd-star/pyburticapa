"""The motion planner on synthetic songs: timing policies, source preservation, state gating,
combination, constraints, provenance, validation, the CLI, and the two real songs."""

import copy
import hashlib
import json
import shutil
from pathlib import Path

import numpy as np
import pytest
import yaml
from pydantic import ValidationError

from audiolab import cli
from audiolab.interpretation import interpret, write_interpretation
from audiolab.motion import schema as ms
from audiolab.motion import review
from audiolab.motion.config import MotionConfig
from audiolab.motion.engine import (
    Contribution, channel_lookahead, combine_property, event_times, output_paths, plan_timeline, rate_limit,
    render_event, schedule_exclusive, write_timeline,
)
from audiolab.motion.validate import check_reproducible, load_arrays, load_timeline, validate_timeline
from audiolab.visual_mapping.engine import StaleInputError, map_song, write_mapping
from audiolab.visual_mapping.engine import output_paths as vis_paths
from audiolab.visual_mapping.profile import load_profile
from synthetic import FR, make_analysis, regular, step

ROOT = Path(__file__).resolve().parents[1]
DEFAULT = yaml.safe_load((ROOT / "configs" / "motion" / "default.yaml").read_text(encoding="utf-8"))
STEPS = {"rms_db": step(30, -25, -5), "band_bass_db": step(30, -40, -5), "band_mid_db": step(30, -35, -10),
         "band_high_db": step(30, -45, -20)}
ONSETS = regular([(0, 30, 1), (30, 60, 5)], 60)


def build_song(tmp_path, profile="balanced", curves=None, interpretation=True, **kw):
    """A 60 s synthetic song that changes at 30 s, with a visual mapping for `profile`."""
    kw.setdefault("onsets", ONSETS)
    kw.setdefault("novelty_peaks", [30.0])
    analysis = make_analysis(tmp_path, curves=STEPS if curves is None else curves, **kw)
    if interpretation:
        write_interpretation(interpret(analysis, output_path=analysis.parent / "song_interpretation.json"), analysis.parent / "song_interpretation.json")
    prof, sha = load_profile(ROOT / "configs" / "visual_profiles" / f"{profile}.yaml")
    mj, mn = vis_paths(analysis, prof.name)
    write_mapping(map_song(analysis, prof, 30.0, f"configs/visual_profiles/{profile}.yaml", sha), mj, mn)
    return analysis, mj


def cfg(edit=None, base=None) -> MotionConfig:
    d = copy.deepcopy(base or DEFAULT)
    if edit:
        edit(d)
    return MotionConfig.model_validate(d)


def rule_of(d, rule_id):
    return next(r for r in d["rules"] if r["id"] == rule_id)


def plan(mapping, config=None):
    return plan_timeline(mapping, config or cfg())


def actions(result, rule_id=None, status="scheduled"):
    return [a for a in result.meta["actions"] if (rule_id is None or a.rule_id == rule_id) and (status is None or a.status == status)]


def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


@pytest.fixture
def song(tmp_path):
    return build_song(tmp_path)


# ---- the single-action renderer: known values --------------------------------------------------

T100 = np.arange(0, 2001) / 100.0


def test_event_times_follow_each_policy_and_never_move_the_source():
    r = cfg().rules  # anticipatory transition burst: anticipation 0.7, hold 0.2, release 1.0
    burst = next(x for x in r if x.id == "transition_burst")
    assert event_times(burst, 10.0) == pytest.approx((9.3, 10.0, 10.2, 11.2))
    reactive = cfg(lambda d: rule_of(d, "beat_particles").update(attack_s=0.05, release_s=0.4)).rules
    bp = next(x for x in reactive if x.id == "beat_particles")
    assert event_times(bp, 10.0) == pytest.approx((10.0, 10.05, 10.05, 10.45))
    off = cfg(lambda d: rule_of(d, "transition_burst").update(peak_offset_s=0.1)).rules
    assert event_times(next(x for x in off if x.id == "transition_burst"), 10.0) == pytest.approx((9.4, 10.1, 10.3, 11.3))


@pytest.mark.parametrize("shape, quarter", [("linear", 0.25), ("smooth", 0.15625)])
def test_rendered_action_known_values(shape, quarter):
    c = render_event(T100, start=9.6, peak=10.0, settle=10.2, end=11.0, amplitude=0.8, shape=shape)
    x = np.zeros(len(T100))
    x[c.i0:c.i0 + len(c.values)] = c.values
    at = lambda s: x[int(round(s * 100))]
    assert at(9.5) == 0.0 and at(10.0) == pytest.approx(0.8) and at(10.1) == pytest.approx(0.8) and at(11.0) == pytest.approx(0.0)
    assert at(9.7) == pytest.approx(0.8 * quarter) and at(9.8) == pytest.approx(0.4)
    assert at(10.6) == pytest.approx(0.4), "halfway down the release"


# ---- anticipation and source preservation ------------------------------------------------------


def test_beat_accents_land_on_the_beat_and_start_just_before_it(song):
    r = plan(song[1])
    beats = {b.id: b.time_s for b in __import__("audiolab.interpretation.context", fromlist=["x"]).AnalysisContext(song[0]).beats}
    acc = actions(r, "beat_accent")
    assert len(acc) > 100
    for a in acc:
        src = a.causes.source_ids[0]
        assert a.source_time_s == beats[src], "the source time is the musical event, untouched"
        assert a.policy == "anticipatory" and a.peak_s == pytest.approx(a.source_time_s)
        assert a.start_s == pytest.approx(a.source_time_s - 0.03) and a.lookahead_s == pytest.approx(0.03)
        assert a.settle_s == pytest.approx(a.peak_s) and a.end_s == pytest.approx(a.peak_s + 0.25)
        assert a.causes.kind == "mapping_response" and a.causes.response_rows and a.time_basis == "event"


def test_the_reactive_policy_never_starts_before_its_source(song):
    c = cfg(lambda d: rule_of(d, "beat_accent").update(policy="reactive", attack_s=0.04))
    for a in actions(plan(song[1], c), "beat_accent"):
        assert a.policy == "reactive" and a.start_s == a.source_time_s and a.peak_s == pytest.approx(a.source_time_s + 0.04)
        assert a.lookahead_s == 0.0


def test_a_transition_is_anticipated_peaks_on_the_event_and_cites_it(song):
    r = plan(song[1])
    (burst,) = [a for a in actions(r, "transition_burst") if abs(a.source_time_s - 30.0) < 1.0]
    assert burst.source_time_s == 30.0 and burst.time_basis == "event"
    assert (burst.start_s, burst.peak_s, burst.settle_s, burst.end_s) == pytest.approx((29.3, 30.0, 30.2, 31.2))
    assert burst.lookahead_s == pytest.approx(0.7) and burst.policy == "anticipatory"
    assert burst.causes.kind == "channel_peak" and any(i.startswith("transition_candidate@beat:") for i in burst.causes.source_ids)
    assert "novelty_peak:000" in burst.causes.supporting_ids and burst.causes.channel_value == pytest.approx(1.0, abs=0.01)
    # The sampled curve peaks on the event, not on the start of the preparation.
    t, accent = r.arrays["times"], r.arrays["prop__main_element__accent"]
    k = int(np.argmax(accent[(t > 29) & (t < 32)])) + int(np.searchsorted(t, 29))
    assert t[k] == pytest.approx(30.0, abs=1 / 30.0) or accent[int(round(30.0 * 30))] == pytest.approx(accent.max(), abs=1e-6)


def test_the_sampled_curve_reaches_its_amplitude_at_the_planned_peak(song):
    r = plan(song[1])
    t = r.arrays["times"]
    (burst,) = [a for a in actions(r, "transition_burst") if abs(a.source_time_s - 30.0) < 1.0]
    value = r.arrays["prop__main_element__accent"][int(round(burst.peak_s * 30))]
    assert value == pytest.approx(burst.amplitude, abs=1e-9)
    assert r.arrays["prop__main_element__accent"][int(round(29.0 * 30))] < 0.3, "only a beat accent before the burst starts at 29.3 s"
    assert r.arrays["prop__main_element__accent"][int(round(29.6 * 30))] > 0.3, "the anticipated build-up is under way"


def test_a_peak_with_no_matching_event_uses_the_sampled_time_and_says_so(tmp_path):
    novelty = np.where((np.arange(0.5, 59.9, 0.5) >= 30) & (np.arange(0.5, 59.9, 0.5) < 34), 0.9, 0.15)
    curves = {**STEPS, "novelty": novelty}
    analysis, mj = build_song(tmp_path, profile="bass_pulse", curves=curves, interpretation=False)
    r = plan(mj, cfg(lambda d: rule_of(d, "transition_burst").update(min_height=0.3, min_prominence=0.2)))
    bursts = actions(r, "transition_burst")
    assert bursts and all(b.time_basis == "channel_peak_sampled" for b in bursts)
    assert all(b.causes.source_ids == [] and b.causes.kind == "channel_peak" for b in bursts)
    assert all(abs((b.source_time_s * 30) - round(b.source_time_s * 30)) < 1e-6 for b in bursts), "sampled times sit on the grid"


def test_an_anticipated_action_before_the_start_of_the_audio_is_flagged_not_clipped(song):
    c = cfg(lambda d: rule_of(d, "beat_accent").update(anticipation_s=1.0, release_s=0.3))
    r = plan(song[1], c)
    first = min(actions(r, "beat_accent"), key=lambda a: a.source_time_s)
    assert first.source_time_s == pytest.approx(0.5) and first.start_s == pytest.approx(-0.5) and first.extends_outside_audio
    assert r.arrays["prop__main_element__accent"][0] > 0, "the part that falls inside the audio is still rendered"
    assert any(not a.extends_outside_audio for a in actions(r, "beat_accent"))


def test_a_late_event_that_runs_past_the_end_is_flagged(song):
    last = max(actions(plan(song[1]), "beat_accent"), key=lambda a: a.source_time_s)
    assert last.end_s <= 60.0 + 1e-9 or last.extends_outside_audio


# ---- scene-state gating ------------------------------------------------------------------------


def test_actions_outside_their_allowed_states_are_recorded_as_suppressed_with_a_reason(song):
    r = plan(song[1])
    mine = [a for a in r.meta["actions"] if a.rule_id == "strong_beat_shake"]
    sup = [a for a in mine if a.status == "suppressed"]
    assert sup and all("allowed states" in a.reason and a.scene_state != "active" for a in sup)
    assert all(a.scene_state == "active" for a in mine if a.status == "scheduled")


def test_suppressed_actions_are_absent_from_the_curves(song):
    c = cfg(lambda d: rule_of(d, "strong_beat_shake").update(states=["rest"], min_strength=0.0, gain=1.0))
    r = plan(song[1], c)
    shake = r.arrays["prop__camera__shake"]
    sched = actions(r, "strong_beat_shake")
    assert all(a.scene_state == "rest" for a in sched) and shake[int(35 * 30):].max() == 0.0


def test_continuous_follows_are_zero_outside_their_states_and_fade_at_the_edges(song):
    r = plan(song[1])
    sway = actions(r, "main_sway_follow")
    assert sway and all(a.kind == "continuous" and a.policy == "continuous" and a.source_time_s is None for a in sway)
    states = {s.start_s: s.state for s in r.meta["states"]}
    t, x = r.arrays["times"], r.arrays["prop__main_element__sway"]
    first_rest = next(s for s in r.meta["states"] if s.state == "rest")
    assert x[(t >= first_rest.start_s) & (t < first_rest.end_s - 0.01)].max() == 0.0, "no sway while the scene rests"
    a0 = min(sway, key=lambda a: a.start_s)
    assert x[int(round(a0.start_s * 30))] < 0.1, "fades in at the state boundary"


def test_a_continuous_action_follows_its_channel_scaled_by_gain(song):
    def edit(d):
        rule_of(d, "particles_density_follow").update(gain=0.5, fade_s=0.0)
        d["tracks"]["particles"]["properties"]["density"]["max_rate_per_s"] = None  # no slew limit: exact values
    r = plan(song[1], cfg(edit))
    mapping = load_mapping_of(song[1])
    from audiolab.visual_mapping.validate import load_arrays as load_mapping_arrays
    channel = load_mapping_arrays(mapping, song[1])["density"]
    assert np.allclose(r.arrays["prop__particles__density"], 0.5 * channel, atol=1e-12)


def load_mapping_of(path):
    from audiolab.visual_mapping.validate import load_mapping
    return load_mapping(path)


def test_hold_keeps_a_constant_level_in_its_states(song):
    extra = {"id": "bg_hold", "kind": "hold", "track": "background", "property": "drift", "primitive": "hold", "level": 0.3,
             "states": ["rest"], "fade_s": 0.0}
    def edit(d):
        d["tracks"]["background"]["primitives"].append("hold")
        d["rules"] = [r for r in d["rules"] if r["id"] != "background_drift_follow"] + [extra]
    r = plan(song[1], cfg(edit))
    t, x = r.arrays["times"], r.arrays["prop__background__drift"]
    rest = next(s for s in r.meta["states"] if s.state == "rest")
    mid = (t > rest.start_s + 0.2) & (t < rest.end_s - 0.2)
    assert np.allclose(x[mid], 0.3) and x[t > 40].max() == 0.0


# ---- filters, scaling, missing inputs ----------------------------------------------------------


def test_min_strength_drops_weak_responses_and_says_how_many(song):
    loose, strict = plan(song[1], cfg(lambda d: rule_of(d, "beat_accent").update(min_strength=0.0))), plan(song[1], cfg(lambda d: rule_of(d, "beat_accent").update(min_strength=0.6)))
    assert len(actions(strict, "beat_accent")) < len(actions(loose, "beat_accent"))
    assert any("beat_accent" in n and "min_strength" in n for n in strict.meta["limitations"])
    assert all(a.amplitude >= 0.6 * 0.99 for a in actions(strict, "beat_accent"))


def test_amplitude_scaling_by_a_channel(song):
    base = plan(song[1])
    scaled = plan(song[1], cfg(lambda d: rule_of(d, "transition_burst").update(amplitude_scale_by={"channel": "intensity", "floor": 0.2})))
    pick = lambda r: next(a for a in actions(r, "transition_burst") if abs(a.source_time_s - 30) < 1)
    assert pick(scaled).amplitude < pick(base).amplitude
    assert pick(scaled).amplitude >= 0.2 * pick(base).amplitude - 1e-9


def test_a_rule_on_a_missing_channel_is_skipped_with_a_reason_not_run_on_zeros(song):
    c = cfg(lambda d: rule_of(d, "beat_accent").update(channel="no_such_channel"))
    r = plan(song[1], c)
    assert {s.id: s.reason for s in r.meta["skipped_rules"]}["beat_accent"].startswith("the mapping has no channel")
    assert not actions(r, "beat_accent", None)


def test_a_rule_with_no_responses_to_answer_is_skipped(song):
    c = cfg(lambda d: rule_of(d, "beat_accent").update(channel="intensity"))
    assert "no event responses" in {s.id: s.reason for s in plan(song[1], c).meta["skipped_rules"]}["beat_accent"]


def test_an_unavailable_mapping_channel_is_skipped_with_its_reason(tmp_path):
    from audiolab.visual_mapping.profile import Profile
    analysis = make_analysis(tmp_path, curves={**STEPS, "novelty": None})
    only_novelty = Profile.model_validate({"name": "sparse", "channels": {
        "intensity": {"rules": [{"id": "i", "input": {"kind": "feature", "feature": "rms_db"}}]},
        "transition_weight": {"rules": [{"id": "t", "input": {"kind": "feature", "feature": "novelty"}}]}}})
    mj, mn = vis_paths(analysis, "sparse")
    write_mapping(map_song(analysis, only_novelty, 30.0), mj, mn)
    r = plan(mj)
    reasons = {s.id: s.reason for s in r.meta["skipped_rules"]}
    assert "unavailable" in reasons["transition_burst"] and "unavailable" in reasons["transition_out"]
    assert "pulse_strength" in reasons["beat_accent"] and not actions(r, "transition_burst", None)
    assert actions(r, "main_scale_follow", None) == [] and "scale" in reasons["main_scale_follow"]


def test_disabled_rules_are_listed_not_run(song):
    r = plan(song[1], cfg(lambda d: rule_of(d, "beat_accent").update(enabled=False)))
    assert {s.id: s.reason for s in r.meta["skipped_rules"]}["beat_accent"] == "disabled in the configuration"


def test_the_scene_signal_must_exist(song):
    with pytest.raises(ValueError, match="scene signal"):
        plan(song[1], cfg(lambda d: d["scene"].update(signal="nope")))


# ---- combination rules -------------------------------------------------------------------------


def C(i0, values, priority=1, action_id="x"):
    return Contribution(action_id, priority, i0, np.asarray(values, dtype=float))


def test_add_sums_and_max_takes_the_larger():
    cs = [C(0, [0.5, 0.5, 0.5]), C(1, [0.3, 0.3, 0.3])]
    add, depth = combine_property(5, "add", cs)
    assert add.tolist() == pytest.approx([0.5, 0.8, 0.8, 0.3, 0.0]) and depth.tolist() == [1, 2, 2, 1, 0]
    assert combine_property(5, "max", cs)[0].tolist() == pytest.approx([0.5, 0.5, 0.5, 0.3, 0.0])


def test_priority_hides_a_lower_priority_action_even_when_it_is_larger():
    cs = [C(0, [0.9, 0.9, 0.9], priority=1), C(1, [0.2, 0.2], priority=2)]
    out, _ = combine_property(4, "priority", cs)
    assert out.tolist() == pytest.approx([0.9, 0.2, 0.2, 0.0])


def test_priority_ties_go_to_the_larger_value_and_order_does_not_matter():
    a, b = C(0, [0.4, 0.4], priority=2, action_id="a"), C(0, [0.6, 0.6], priority=2, action_id="b")
    assert combine_property(2, "priority", [a, b])[0].tolist() == combine_property(2, "priority", [b, a])[0].tolist() == pytest.approx([0.6, 0.6])


@pytest.mark.parametrize("how", ["add", "max", "priority"])
def test_combination_is_independent_of_the_order_of_actions(how):
    rng = np.random.default_rng(1)
    cs = [C(int(rng.integers(0, 20)), rng.random(10), priority=int(rng.integers(1, 3)), action_id=f"a{i}") for i in range(8)]
    ref = combine_property(40, how, cs)[0]
    for _ in range(5):
        rng.shuffle(cs)
        assert np.array_equal(combine_property(40, how, cs)[0], ref)


class D:  # a draft stand-in with the fields the scheduler reads
    def __init__(self, rule_id, priority, start, end):
        self.rule = type("R", (), {"id": rule_id, "priority": priority})()
        self.start, self.end, self.key, self.suppressed = start, end, f"{start}", None


def test_exclusive_suppresses_the_lower_priority_overlapping_action_and_names_the_winner():
    low, high, apart = D("low", 1, 1.0, 3.0), D("high", 2, 2.0, 4.0), D("low2", 1, 10.0, 11.0)
    schedule_exclusive([low, high, apart])
    assert low.suppressed and "overlaps high" in low.suppressed[0] and low.suppressed[1] == "high@2.0"
    assert high.suppressed is None and apart.suppressed is None


def test_exclusive_through_the_planner_records_the_suppressed_action(song):
    def edit(d):
        d["tracks"]["main_element"]["properties"]["accent"]["combine"] = "exclusive"
    r = plan(song[1], cfg(edit))
    sup = actions(r, status="suppressed")
    clashed = [a for a in sup if a.suppressed_by and a.track == "main_element" and a.property == "accent"]
    assert clashed and all(a.priority < 2 or a.rule_id == "beat_accent" for a in clashed)
    res = next(x for x in r.meta["resolutions"] if (x.track, x.property) == ("main_element", "accent"))
    assert res.combine == "exclusive" and res.n_suppressed == len(clashed)
    # a suppressed action contributes nothing: during a transition burst, no beat accent is audible
    burst = next(a for a in actions(r, "transition_burst") if abs(a.source_time_s - 30) < 1)
    t, x = r.arrays["times"], r.arrays["prop__main_element__accent"]
    assert x[int(round(30.0 * 30))] == pytest.approx(burst.amplitude)


def test_overlap_and_simultaneity_are_counted(song):
    res = {(x.track, x.property): x for x in plan(song[1]).meta["resolutions"]}
    assert res[("main_element", "accent")].max_simultaneous >= 2 and res[("main_element", "accent")].n_overlap_samples > 0
    assert res[("camera", "push")].combine == "max"


# ---- constraints -------------------------------------------------------------------------------


def test_amplitude_is_clamped_and_counted():
    cs = [C(0, [0.8, 0.8, 0.8]), C(0, [0.7, 0.7, 0.7])]
    raw, _ = combine_property(3, "add", cs)
    assert raw.max() == pytest.approx(1.5)
    out = np.minimum(raw, 0.6)
    assert out.tolist() == [0.6, 0.6, 0.6] and int((raw > 0.6).sum()) == 3


def test_rate_limit_caps_the_slope_and_counts_limited_samples():
    x = np.where(np.arange(100) < 50, 0.0, 1.0)
    y, limited = rate_limit(x, rate_hz=10.0, max_rate=2.0)  # 0.2 per sample
    assert np.max(np.abs(np.diff(y))) <= 0.2 + 1e-12 and y[-1] == pytest.approx(1.0) and limited > 0
    assert y[50] == pytest.approx(0.2) and y[54] == pytest.approx(1.0)
    same, none = rate_limit(np.full(10, 0.5), 10.0, 2.0)
    assert none == 0 and np.array_equal(same, np.full(10, 0.5))


def test_planner_applies_amplitude_maximum_and_slew_limit_and_records_them(song):
    r = plan(song[1])
    for track in r.meta["tracks"]:
        for p in track.properties:
            x = r.arrays[p.array_key]
            assert x.min() >= 0 and x.max() <= p.amplitude_max + 1e-12
            if p.max_rate_per_s:
                assert np.max(np.abs(np.diff(x))) * 30 <= p.max_rate_per_s * (1 + 1e-9) + 1e-9
    cons = {(c.track, c.property): c for c in r.meta["constraints"]}
    assert cons[("camera", "push")].max_rate_per_s == 1.0 and cons[("camera", "push")].n_rate_limited_samples > 0


def test_a_tighter_amplitude_limit_clamps_and_flags_the_actions(song):
    r = plan(song[1], cfg(lambda d: d["tracks"]["main_element"]["properties"]["accent"].update(amplitude_max=0.5)))
    assert r.arrays["prop__main_element__accent"].max() <= 0.5 + 1e-12
    clamped = [a for a in actions(r) if a.track == "main_element" and a.property == "accent" and a.clamped]
    assert clamped and all(a.amplitude > 0.5 for a in clamped)
    assert next(c for c in r.meta["constraints"] if (c.track, c.property) == ("main_element", "accent")).n_clamped_samples > 0


# ---- lookahead ---------------------------------------------------------------------------------


def test_channel_lookahead_comes_from_the_mapping_rules(song):
    spec = load_mapping_of(song[1]).profile.spec
    assert channel_lookahead(spec, "pulse_strength") >= 0.1  # modulate_by smooths 1 s centred plus a 0.1 s window
    assert channel_lookahead(spec, "no_such_channel") == 0.0
    la = {a.rule_id: a.channel_lookahead_s for a in actions(plan(song[1]))}
    assert la["beat_accent"] == pytest.approx(channel_lookahead(spec, "pulse_strength"))


def test_every_action_records_the_lookahead_it_needs(song):
    for a in actions(plan(song[1])):
        if a.kind == "event":
            assert a.lookahead_s == pytest.approx(max(0.0, a.source_time_s - a.start_s))
        else:
            assert a.lookahead_s == 0.0 and a.source_time_s is None


# ---- determinism and provenance ----------------------------------------------------------------


def test_identical_inputs_give_identical_plans(song):
    a, b = plan(song[1]), plan(song[1])
    assert a.arrays.keys() == b.arrays.keys() and all(np.array_equal(a.arrays[k], b.arrays[k]) for k in a.arrays)
    assert [x.model_dump() for x in a.meta["actions"]] == [x.model_dump() for x in b.meta["actions"]]


def test_the_order_of_rules_in_the_config_does_not_change_the_curves(song):
    def shuffled(d):
        d["rules"] = list(reversed(d["rules"]))
    a, b = plan(song[1]), plan(song[1], cfg(shuffled))
    for k in a.arrays:
        assert np.array_equal(a.arrays[k], b.arrays[k]), k


def test_ids_are_stable_unique_and_name_their_source(song):
    ids = [a.id for a in plan(song[1]).meta["actions"]]
    assert len(ids) == len(set(ids)) and ids == [a.id for a in plan(song[1]).meta["actions"]]
    assert all(i.startswith(("beat_accent@beat:", "transition_burst@")) for i in ids if i.startswith(("beat_accent", "transition_burst")))


@pytest.fixture
def written(song):
    analysis, mj = song
    c, c_sha = cfg(), "0" * 64
    result = plan_timeline(mj, c, "configs/motion/default.yaml", c_sha, [])
    j, n = output_paths(mj)
    write_timeline(result, j, n)
    return analysis, mj, j, n


def test_written_artifact_records_every_source_and_validates(written):
    analysis, mj, j, n = written
    m = load_timeline(j)
    s = m.sources
    assert s.mapping_file_sha256 == sha(mj) and s.mapping_numerical_sha256 == sha(mj.with_suffix(".npz"))
    assert s.mapping_path == "../visual/visual_mapping.balanced.json" and s.analysis_path == "../song_analysis.json"
    assert s.interpretation_path == "../song_interpretation.json" and (s.profile_name, s.profile_version) == ("balanced", "2")
    assert m.numerical.sha256 == sha(n) and m.config.spec["scene"]["signal"] == "intensity"
    assert m.engine.version and {p.name for p in m.vocabulary.primitives} >= {"pulse", "burst", "drift", "transition_in"}
    assert validate_timeline(j) == [] and check_reproducible(j) == []
    assert any("execution adapter" in text for text in m.limitations)


def test_planning_never_modifies_its_inputs(song):
    analysis, mj = song
    before = {p.name: sha(p) for d in (analysis.parent, mj.parent) for p in d.iterdir() if p.is_file()}
    j, n = output_paths(mj)
    write_timeline(plan(mj), j, n)
    assert {p.name: sha(p) for d in (analysis.parent, mj.parent) for p in d.iterdir() if p.is_file()} == before


def test_overrides_are_recorded_and_the_plan_reproduces_from_the_embedded_config(song, tmp_path):
    from audiolab.motion.config import load_motion_config
    p = tmp_path / "m.yaml"
    p.write_text(yaml.safe_dump(DEFAULT), encoding="utf-8")
    c, c_sha, applied = load_motion_config(p, ["rules.transition_burst.anticipation_s=1.2", "scene.min_dwell_s.active=4"])
    result = plan_timeline(song[1], c, "m.yaml", c_sha, applied)
    j, n = output_paths(song[1])
    m = write_timeline(result, j, n)
    assert [(o["path"], o["old"], o["new"]) for o in m.config.overrides] == [
        ("rules.transition_burst.anticipation_s", 0.7, 1.2), ("scene.min_dwell_s.active", 3.0, 4)]
    burst = next(a for a in m.actions if a.rule_id == "transition_burst" and abs(a.source_time_s - 30) < 1)
    assert burst.start_s == pytest.approx(30 - 1.2) and burst.lookahead_s == pytest.approx(1.2)
    assert validate_timeline(j) == [] and check_reproducible(j) == []


def test_the_committed_json_schema_is_up_to_date():
    committed = json.loads((ROOT / "schemas" / "motion_timeline.v1.json").read_text(encoding="utf-8"))
    assert committed == ms.json_schema(), "run: python -m audiolab schema --kind motion_timeline"


# ---- stale and tampered inputs -----------------------------------------------------------------


def test_a_changed_mapping_makes_the_plan_stale(written):
    _, mj, j, _ = written
    prof, sha_ = load_profile(ROOT / "configs" / "visual_profiles" / "balanced.yaml")
    changed = copy.deepcopy(prof.model_dump(mode="json"))
    changed["channels"]["intensity"]["rules"][0]["weight"] = 0.2
    from audiolab.visual_mapping.profile import Profile
    mjson, mnpz = vis_paths(written[0], "balanced")
    write_mapping(map_song(written[0], Profile.model_validate(changed), 30.0), mjson, mnpz)
    assert any("stale" in p for p in validate_timeline(j))


def test_a_changed_analysis_makes_the_plan_and_the_mapping_stale(written):
    analysis, mj, j, _ = written
    doc = json.loads(analysis.read_text(encoding="utf-8"))
    doc["tempo"]["bpm"] = 99.0
    analysis.write_text(json.dumps(doc), encoding="utf-8")
    assert any("stale" in p for p in validate_timeline(j))
    with pytest.raises(StaleInputError):
        plan(mj)


def test_re_exporting_identical_inputs_is_not_stale(written):
    analysis, mj, j, _ = written
    doc = json.loads(mj.read_text(encoding="utf-8"))
    doc["provenance"]["created_at"] = "2031-01-01T00:00:00+00:00"
    mj.write_text(json.dumps(doc), encoding="utf-8")
    assert not any("visual mapping has changed" in p for p in validate_timeline(j))


def test_tampered_numbers_are_detected(written):
    _, _, j, n = written
    m = load_timeline(j)
    arrays = load_arrays(m, j)
    arrays["prop__camera__push"] = arrays["prop__camera__push"] * 0.5
    np.savez(n, **arrays)
    assert any("hash" in p for p in validate_timeline(j))
    assert any("differs when recomputed" in p for p in check_reproducible(j))


def _rewrite(written, edit):
    _, _, j, n = written
    m = load_timeline(j)
    arrays = load_arrays(m, j)
    edit(arrays)
    np.savez(n, **arrays)
    doc = json.loads(j.read_text(encoding="utf-8"))
    doc["numerical"]["sha256"] = sha(n)
    j.write_text(json.dumps(doc), encoding="utf-8")
    return validate_timeline(j)


def test_out_of_range_values_misaligned_times_and_a_violated_slew_limit_are_detected(written):
    assert any("outside [0" in p for p in _rewrite(written, lambda a: a.__setitem__("prop__camera__shake", a["prop__camera__shake"] + 2.0)))
    assert any("grid" in p for p in _rewrite(written, lambda a: a.__setitem__("times", a["times"] + 0.01)))

    def spike(a):
        x = a["prop__camera__push"].copy()
        x[100] = 0.8
        x[101] = 0.0
        a["prop__camera__push"] = x
    assert any("over its limit" in p for p in _rewrite(written, spike))


def test_a_scene_state_array_that_disagrees_with_the_spans_is_detected(written):
    def flip(a):
        s = a["scene_state"].copy()
        s[300:330] = (s[300:330] + 1) % 4
        a["scene_state"] = s
    assert any("disagree" in p for p in _rewrite(written, flip))


def _edit_json(written, edit):
    _, _, j, _ = written
    doc = json.loads(j.read_text(encoding="utf-8"))
    edit(doc)
    j.write_text(json.dumps(doc), encoding="utf-8")
    return j


def test_a_tampered_source_time_or_cause_is_detected(written):
    j = _edit_json(written, lambda d: next(a for a in d["actions"] if a["rule_id"] == "beat_accent").update(source_time_s=1.2345))
    assert any("source time" in p or "lookahead" in p for p in (lambda: _safe(j))())


def _safe(j):
    try:
        return validate_timeline(j)
    except ValidationError as exc:
        return [str(exc)]


def test_an_unknown_cause_id_is_detected(written):
    j = _edit_json(written, lambda d: next(a for a in d["actions"] if a["rule_id"] == "beat_accent")["causes"].update(supporting_ids=["beat:9999"]))
    assert any("does not exist" in p for p in validate_timeline(j))


@pytest.mark.parametrize("mutate, message", [
    (lambda d: d["actions"][1].update(id=d["actions"][0]["id"]), "duplicate"),
    (lambda d: d["actions"][0].update(primitive="sway"), "not allowed|is continuous|is event"),
    (lambda d: next(a for a in d["actions"] if a["kind"] == "event").update(peak_s=None), "needs source_time_s"),
    (lambda d: next(a for a in d["actions"] if a["policy"] == "reactive" and a["kind"] == "event").update(start_s=-5.0), "reactive|extends_outside|lookahead"),
    (lambda d: next(a for a in d["actions"] if a["kind"] == "event").update(lookahead_s=9.0), "lookahead_s"),
    (lambda d: d["states"][1].update(start_s=d["states"][1]["start_s"] + 1.0), "contiguous"),
    (lambda d: d["states"][0].update(state="dozing"), "unknown scene state"),
    (lambda d: next(a for a in d["actions"] if a["status"] == "scheduled").update(status="suppressed", reason=None), "must say why"),
    (lambda d: d.update(schema_version="2.0.0"), "not compatible"),
    (lambda d: d.update(extra=1), "extra"),
])
def test_schema_rejects_bad_timelines(written, mutate, message):
    doc = json.loads(written[2].read_text(encoding="utf-8"))
    mutate(doc)
    with pytest.raises(ValidationError, match=message):
        ms.MotionTimeline.model_validate(doc)


# ---- CLI ---------------------------------------------------------------------------------------


def test_cli_workflow_override_inspect_validate_and_stale(song, tmp_path, capsys):
    analysis, mj = song
    report = tmp_path / "r.md"
    assert cli.main(["visual", "map", str(analysis), "--profiles-dir", str(ROOT / "configs" / "visual_profiles")]) == 0
    assert cli.main(["motion", "run", str(analysis), "--config", str(ROOT / "configs" / "motion" / "default.yaml"),
                     "--set", "rules.transition_burst.anticipation_s=1.0", "--report", str(report)]) == 0
    out = capsys.readouterr().out
    assert out.count("recomputed: identical") == 3 and "overrides: rules.transition_burst.anticipation_s: 0.7 -> 1.0" in out
    assert report.exists() and (analysis.parent / "plots" / "motion_states.png").exists()
    j = output_paths(vis_paths(analysis, "balanced")[0])[0]
    assert cli.main(["motion", "inspect", str(j), "--at", "30"]) == 0
    assert "transition_burst@" in capsys.readouterr().out
    assert cli.main(["validate", str(j), str(analysis), str(mj)]) == 0
    assert "motion timeline schema" in capsys.readouterr().out
    doc = json.loads(analysis.read_text(encoding="utf-8"))
    doc["tempo"]["bpm"] = 99.0
    analysis.write_text(json.dumps(doc), encoding="utf-8")
    capsys.readouterr()
    assert cli.main(["validate", str(j)]) == 1 and "STALE" in capsys.readouterr().out


def test_cli_plan_reports_a_stale_mapping(song, capsys):
    analysis, mj = song
    doc = json.loads(analysis.read_text(encoding="utf-8"))
    doc["tempo"]["bpm"] = 99.0
    analysis.write_text(json.dumps(doc), encoding="utf-8")
    assert cli.main(["motion", "plan", str(analysis), "--config", str(ROOT / "configs" / "motion" / "default.yaml")]) == 1
    assert "FAILED" in capsys.readouterr().out


def test_cli_without_mappings_says_what_to_run(tmp_path, capsys):
    analysis = make_analysis(tmp_path)
    assert cli.main(["motion", "plan", str(analysis)]) == 1 and "visual map" in capsys.readouterr().out


def test_cli_schema_kind(tmp_path):
    out = tmp_path / "s.json"
    assert cli.main(["schema", "--kind", "motion_timeline", "--out", str(out)]) == 0
    assert json.loads(out.read_text(encoding="utf-8")) == ms.json_schema()


# ---- the two real songs ------------------------------------------------------------------------

SEYI = ROOT / "outputs" / "Seyi-Vibez-SWAGUU-feat-Quavo" / "song_analysis.json"
DETTY = ROOT / "outputs" / "Detty - Party scatter demo" / "song_analysis.json"
have = lambda p: p.exists() and all((p.parent / "visual" / f"visual_mapping.{x}.json").exists() for x in review.PROFILES)
needs_seyi = pytest.mark.skipif(not have(SEYI), reason="Seyi mappings not generated")
needs_detty = pytest.mark.skipif(not have(DETTY), reason="Detty mappings not generated")
needs_both = pytest.mark.skipif(not (have(SEYI) and have(DETTY)), reason="mappings not generated")


@pytest.fixture(scope="module")
def real(tmp_path_factory):
    """Plan every real song x profile in a scratch copy, so the repository outputs stay untouched."""
    out = {}
    root = tmp_path_factory.mktemp("real")
    for name, src in (("seyi", SEYI), ("detty", DETTY)):
        if not have(src):
            continue
        dst = root / name
        shutil.copytree(src.parent, dst, ignore=shutil.ignore_patterns("plots", "motion", "visual_baseline_v1", "*.wav"))
        for prof in review.PROFILES:
            mj = dst / "visual" / f"visual_mapping.{prof}.json"
            r = plan_timeline(mj, cfg())
            j, n = output_paths(mj)
            write_timeline(r, j, n)
            out[(name, prof)] = (dst / "song_analysis.json", j)
    return out


@needs_seyi
@pytest.mark.parametrize("prof", review.PROFILES)
def test_seyi_transition_is_anticipated_and_lands_on_the_interpreted_change(real, prof):
    from audiolab.interpretation.engine import load_interpretation
    analysis, j = real[("seyi", prof)]
    m, arr = load_timeline(j), load_arrays(load_timeline(j), j)
    interp = load_interpretation(analysis.parent / "song_interpretation.json")
    entry = next(i for i in interp.interpretations if i.label == "bass_entry")  # found from data, not hard-coded
    burst = next(a for a in m.actions if a.rule_id == "transition_burst" and abs(a.source_time_s - entry.start_s) < 0.2)
    assert burst.source_time_s == entry.start_s and burst.time_basis == "event"
    assert burst.start_s == pytest.approx(entry.start_s - 0.7) and burst.peak_s == entry.start_s and burst.lookahead_s == pytest.approx(0.7)
    assert any(s.startswith("transition_candidate@") for s in burst.causes.source_ids)
    t, acc = arr["times"], arr["prop__main_element__accent"]
    # the planned peak falls between two samples, so the nearest sample is within a hair of it
    assert acc[int(round(burst.peak_s * m.timebase.rate_hz))] == pytest.approx(burst.amplitude, abs=1e-3)
    assert acc[(t > burst.start_s - 2.0) & (t < burst.start_s - 0.1)].max() < 0.5, "quiet before the anticipation begins"
    before = [s for s in m.states if s.start_s <= entry.start_s - 1.0 < s.end_s][0]
    after = [s for s in m.states if s.start_s <= entry.start_s + 4.0 < s.end_s][0]
    assert before.state == "rest" and after.state in ("build", "active")


@needs_seyi
@pytest.mark.parametrize("prof", review.PROFILES)
def test_seyi_state_follows_the_sections_and_lags_the_drop_by_a_documented_amount(real, prof):
    m = load_timeline(real[("seyi", prof)][1])
    first_active = next(s for s in m.states if s.state == "active")
    assert 16.6 <= first_active.start_s <= 20.5 and m.states[0].state == "rest" and m.states[-1].state in ("settle", "rest")
    assert len(m.states) / (m.timebase.duration_s / 60) < 10, "section-level, not beat-level"


@needs_detty
def test_detty_recurring_beats_get_accents_at_every_beat_position(real):
    from audiolab.interpretation.context import AnalysisContext
    analysis, j = real[("detty", "balanced")]
    ctx = AnalysisContext(analysis)
    m = load_timeline(j)
    pos = {b.id: b.beat_in_bar for b in ctx.beats}
    acc = [a for a in m.actions if a.rule_id == "beat_accent" and a.status == "scheduled"]
    assert len(acc) == len(ctx.beats), "balanced pulses every beat; none is skipped or invented"
    assert {pos[a.causes.source_ids[0]] for a in acc} == {1, 2, 3, 4}, "pulses are not reserved for bar starts"
    assert all(a.source_time_s == ctx.beat_times[int(a.causes.source_ids[0].split(":")[1])] for a in acc)
    bp = [a for a in load_timeline(real[("detty", "bass_pulse")][1]).actions if a.rule_id == "beat_accent" and a.status == "scheduled"]
    assert len(bp) >= 0.75 * len(ctx.beats) and {pos[a.causes.source_ids[0]] for a in bp} == {1, 2, 3, 4}


@needs_detty
def test_detty_quiet_middle_reaches_rest_only_in_the_cinematic_profile(real):
    from audiolab.visual_mapping import calibration as cal
    reg = cal.regions(DETTY)
    lo, hi = reg["quiet"]
    rested = {}
    for prof in review.PROFILES:
        m = load_timeline(real[("detty", prof)][1])
        rested[prof] = any(s.state == "rest" and s.start_s < hi and s.end_s > lo and s.start_s > 5 for s in m.states)
    assert rested == {"balanced": False, "bass_pulse": False, "cinematic": True}, rested
    acc = {p: load_arrays(load_timeline(real[("detty", p)][1]), real[("detty", p)][1]) for p in review.PROFILES}
    t = acc["balanced"]["times"]
    q = (t >= lo + 0.6) & (t < hi)
    main = (t >= reg["main_before_quiet"][0]) & (t < reg["main_before_quiet"][1])
    ratio = {p: acc[p]["prop__main_element__accent"][q].mean() / acc[p]["prop__main_element__accent"][main].mean() for p in acc}
    assert ratio["cinematic"] < ratio["bass_pulse"] < ratio["balanced"], ratio


@needs_both
@pytest.mark.parametrize("song_name", ["seyi", "detty"])
@pytest.mark.parametrize("prof", review.PROFILES)
def test_real_timelines_validate_reproduce_and_respect_every_constraint(real, song_name, prof):
    if (song_name, prof) not in real:
        pytest.skip("not generated")
    j = real[(song_name, prof)][1]
    assert validate_timeline(j) == [] and check_reproducible(j) == []
    m = load_timeline(j)
    assert all(a.reason for a in m.actions if a.status == "suppressed")
    assert m.skipped_rules == [] and not any(a.extends_outside_audio and a.kind == "continuous" for a in m.actions)
    tm = review.timing_checks(review.Loaded(prof, j, m, load_arrays(m, j)))
    assert tm["n_checked"] >= 1 and tm["dominant_event_peak_error_ms_max"] <= tm["one_sample_ms"] + 1e-6


@needs_both
def test_real_planning_leaves_the_sources_untouched(tmp_path):
    for src in (SEYI, DETTY):
        dst = tmp_path / src.parent.name
        shutil.copytree(src.parent, dst, ignore=shutil.ignore_patterns("plots", "motion", "visual_baseline_v1", "*.wav"))
        before = {p.relative_to(dst).as_posix(): sha(p) for p in dst.rglob("*") if p.is_file()}
        mj = dst / "visual" / "visual_mapping.balanced.json"
        j, n = output_paths(mj)
        write_timeline(plan_timeline(mj, cfg()), j, n)
        after = {p.relative_to(dst).as_posix(): sha(p) for p in dst.rglob("*") if p.is_file() and "motion" not in p.parts}
        assert {k: v for k, v in before.items()} == after
