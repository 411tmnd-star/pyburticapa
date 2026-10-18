"""Phase 7.1 profile calibration: each approved refinement tested on synthetic songs with known
answers, then on the real songs against the frozen Phase 7.0 baseline."""

import copy
import hashlib
from pathlib import Path

import numpy as np
import pytest
import yaml

from audiolab.visual_mapping import calibration as cal
from audiolab.visual_mapping.engine import map_song
from audiolab.visual_mapping.profile import Profile, load_profile
from audiolab.visual_mapping.validate import validate_mapping
from synthetic import FR, make_analysis, step

ROOT = Path(__file__).resolve().parents[1]
PROFILES = ROOT / "configs" / "visual_profiles"
BASELINE_PROFILES = PROFILES / "baseline_v1"
DURATION = 60.0
BEATS = np.arange(0.5, DURATION - 0.1, 0.5)  # the beat grid make_analysis uses at 120 BPM


def prof(name, baseline=False) -> Profile:
    return load_profile((BASELINE_PROFILES if baseline else PROFILES) / f"{name}.yaml")[0]


def spec_with(name, edit) -> Profile:
    """The shipped profile with one edit applied to its spec (to test a parameter)."""
    spec = copy.deepcopy(prof(name).model_dump(mode="json"))
    edit(spec)
    return Profile.model_validate(spec)


def region(r, key, lo, hi):
    t = r.arrays["times"]
    return r.arrays[key][(t >= lo) & (t < hi)]


# ---- 1. detail_activity: relative to a slower baseline -----------------------------------------


def _high_band(quiet_amp, lively_amp, switch=30.0):
    """Three non-harmonic tones (0.7, 1.9 and 3.3 Hz) so no smoothing window can cancel the signal
    by matching its period. `amp` is the peak-to-peak-ish size: the three tones sum to at most amp."""
    wave = lambda t: (np.sin(2 * np.pi * 0.7 * t) + np.sin(2 * np.pi * 1.9 * t + 1.0) + np.sin(2 * np.pi * 3.3 * t + 2.0)) / 3.0
    return lambda t: -30.0 + np.where(t < switch, quiet_amp, lively_amp) * wave(t)


@pytest.mark.parametrize("name", ["balanced", "bass_pulse", "cinematic"])
def test_small_high_band_noise_gives_no_detail_activity_but_large_swings_do(tmp_path, name):
    path = make_analysis(tmp_path, curves={"band_high_db": _high_band(0.4, 14.0)})
    r = map_song(path, prof(name), rate_hz=30.0)
    quiet, lively = region(r, "detail_activity", 5, 28), region(r, "detail_activity", 35, 58)
    assert quiet.max() < 0.05, f"{name}: noise inside the dead band must stay at zero"
    assert lively.mean() > 0.03 and lively.max() > 0.3, f"{name}: large deviations must register"


def test_percentile_normalization_would_have_stretched_that_noise(tmp_path):
    """The failure the dead band prevents: percentile scaling turns tiny noise into a big signal."""
    path = make_analysis(tmp_path, curves={"band_high_db": _high_band(0.4, 0.4)})
    p = Profile.model_validate({"name": "old_style", "channels": {"detail_activity": {"rules": [
        {"id": "pct", "input": {"kind": "feature", "feature": "band_high_db"}}]}}})
    r = map_song(path, p, rate_hz=30.0)
    assert r.arrays["detail_activity"].max() > 0.9
    fixed = map_song(path, prof("balanced"), rate_hz=30.0)
    assert fixed.arrays["detail_activity"].max() < 0.05


def test_a_sustained_high_band_level_is_not_activity(tmp_path):
    steady = lambda t: np.full_like(t, -10.0)
    r = map_song(make_analysis(tmp_path, curves={"band_high_db": steady}), prof("balanced"), rate_hz=30.0)
    assert r.arrays["detail_activity"].max() < 0.01, "level alone is not activity"


def test_a_sudden_burst_of_high_frequency_energy_registers_then_fades(tmp_path):
    burst = lambda t: np.where((t >= 30) & (t < 31), -10.0, -40.0)
    r = map_song(make_analysis(tmp_path, curves={"band_high_db": burst}), prof("balanced"), rate_hz=30.0)
    x = r.arrays["detail_activity"]
    assert region(r, "detail_activity", 30, 31.5).max() > 0.9 and region(r, "detail_activity", 40, 58).max() < 0.05
    assert x[:int(29 * 30)].max() < 0.05


def test_the_baseline_input_validates_its_timescales():
    with pytest.raises(Exception, match="baseline_s must be longer"):
        Profile.model_validate({"name": "x", "channels": {"detail_activity": {"rules": [
            {"id": "a", "input": {"kind": "feature", "feature": "band_high_db", "smooth_s": 2.0, "baseline_s": 1.0}}]}}})


def test_baseline_modes_above_versus_absolute(tmp_path):
    drop = lambda t: np.where(t < 30, -10.0, -40.0)  # high band collapses: deviation below baseline
    rule = lambda mode: Profile.model_validate({"name": "m", "channels": {"detail_activity": {"rules": [
        {"id": "r", "input": {"kind": "feature", "feature": "band_high_db", "smooth_s": 0.15, "baseline_s": 4.0,
                              "baseline_mode": mode}, "normalize": {"method": "fixed", "low": 1.0, "high": 5.0}}]}}})
    path = make_analysis(tmp_path, curves={"band_high_db": drop})
    above = map_song(path, rule("above"), rate_hz=30.0).arrays["detail_activity"]
    absolute = map_song(path, rule("absolute"), rate_hz=30.0).arrays["detail_activity"]
    assert above.max() < 0.05 and absolute.max() > 0.9


# ---- 2. cinematic channels have distinct sources and response characteristics ------------------


def test_cinematic_intensity_scale_and_motion_use_different_inputs():
    p = prof("cinematic")
    feats = {ch: {r.input.feature if r.input.kind == "feature" else f"{r.input.kind}:{getattr(r.input, 'label', '')}"
                  for r in p.channels[ch].rules} for ch in ("intensity", "scale", "motion_weight")}
    assert feats["intensity"] == {"rms_db"} and "band_bass_db" in feats["scale"] and "novelty" in feats["motion_weight"]
    assert len({frozenset(v) for v in feats.values()}) == 3
    s = {ch: p.channels[ch].smoothing for ch in ("intensity", "scale", "motion_weight")}
    assert s["scale"].attack_s > s["intensity"].attack_s > s["motion_weight"].attack_s, "size is slowest to grow"


def test_motion_weight_responds_to_change_while_intensity_does_not(tmp_path):
    novelty = np.where(np.abs(BEATS - 30.0) < 2.0, 0.9, 0.1)  # a novelty hump; loudness stays level
    path = make_analysis(tmp_path, curves={"rms_db": lambda t: np.full_like(t, -10.0), "novelty": novelty})
    r = map_song(path, prof("cinematic"), rate_hz=30.0)
    motion, intensity = r.arrays["motion_weight"], r.arrays["intensity"]
    assert motion[(r.arrays["times"] > 29) & (r.arrays["times"] < 32)].max() - motion[:300].max() > 0.1
    assert np.ptp(intensity) < 0.02, "level loudness gives a flat intensity"


def test_scale_grows_more_slowly_than_intensity_on_the_same_step(tmp_path):
    path = make_analysis(tmp_path, curves={"rms_db": step(30, -25, -5), "band_bass_db": step(30, -45, -5)})
    r = map_song(path, prof("cinematic"), rate_hz=30.0)
    loaded = type("L", (), {"arrays": r.arrays, "model": type("M", (), {"timebase": r.meta["timebase"]})()})()
    scale, intensity = cal.rise_time(loaded, "scale", 30.0), cal.rise_time(loaded, "intensity", 30.0)
    assert scale > 1.2 * intensity > 0


# ---- 3. pulses follow loudness, with a configurable minimum ------------------------------------


def _beat_strengths(r, rule_id, lo, hi):
    a = r.arrays
    keep = (a["resp__rule"] == rule_id) & (a["resp__source_time"] >= lo) & (a["resp__source_time"] < hi)
    return a["resp__strength"][keep]


QUIET_THEN_LOUD = {"rms_db": step(30, -30, -5)}


def test_balanced_pulses_are_weak_in_a_quiet_passage_and_full_in_a_loud_one(tmp_path):
    r = map_song(make_analysis(tmp_path, curves=QUIET_THEN_LOUD), prof("balanced"), rate_hz=30.0)
    quiet, loud = _beat_strengths(r, "bal_pulse_beats", 5, 25), _beat_strengths(r, "bal_pulse_beats", 36, 58)
    assert quiet.max() <= 0.3 + 1e-3 and quiet.min() > 0, "weak but not absent: the floor keeps a subtle pulse"
    assert loud.max() == 1.0 and loud.min() >= 0.7 - 1e-9


@pytest.mark.parametrize("floor, ceiling", [(0.0, 1e-3), (0.5, 0.5 + 1e-3)])
def test_the_pulse_floor_is_a_parameter(tmp_path, floor, ceiling):
    def edit(spec):
        for rule in spec["channels"]["pulse_strength"]["rules"]:
            rule["modulate_by"]["floor"] = floor
    r = map_song(make_analysis(tmp_path, curves=QUIET_THEN_LOUD), spec_with("balanced", edit), rate_hz=30.0)
    assert _beat_strengths(r, "bal_pulse_beats", 5, 25).max() <= ceiling
    assert _beat_strengths(r, "bal_pulse_beats", 36, 58).max() == 1.0


def test_pulse_floor_is_recorded_in_the_artifact_profile(tmp_path):
    r = map_song(make_analysis(tmp_path, curves=QUIET_THEN_LOUD), prof("balanced"), rate_hz=30.0)
    rules = r.meta["profile"]["spec"]["channels"]["pulse_strength"]["rules"]
    assert rules[0]["modulate_by"]["floor"] == 0.3


# ---- 4. bass_pulse motion_weight is smoother, still responsive ---------------------------------


def _alternating_bass(t):
    return np.where(t < 30, np.where((t % 2.0) < 1.0, -5.0, -40.0), np.where(t < 45, -5.0, -40.0))


def test_motion_weight_no_longer_swings_with_every_bass_gap_but_still_follows_sustained_bass(tmp_path):
    path = make_analysis(tmp_path, curves={"band_bass_db": _alternating_bass})
    new = map_song(path, prof("bass_pulse"), rate_hz=30.0).arrays
    old = map_song(path, prof("bass_pulse", baseline=True), rate_hz=30.0).arrays
    t = new["times"]
    gaps = (t > 8) & (t < 28)
    assert np.ptp(new["motion_weight"][gaps]) < 0.6 * np.ptp(old["motion_weight"][gaps])
    # Sustained bass from 30 s: still reaches nearly full scale, and releases slowly afterwards.
    assert new["motion_weight"][(t > 33) & (t < 44)].min() > 0.85
    fall = t[(t > 45) & (new["motion_weight"] < 0.5)][0] - 45.0
    old_fall = t[(t > 45) & (old["motion_weight"] < 0.5)][0] - 45.0
    assert fall >= 1.0 and fall > old_fall


def test_beat_responsive_channels_of_bass_pulse_are_unchanged(tmp_path):
    path = make_analysis(tmp_path, curves={"band_bass_db": _alternating_bass})
    new = map_song(path, prof("bass_pulse"), rate_hz=30.0).arrays
    old = map_song(path, prof("bass_pulse", baseline=True), rate_hz=30.0).arrays
    for ch in ("scale", "pulse_strength", "intensity", "density"):
        assert np.array_equal(new[ch], old[ch]), f"{ch} must keep its beat-responsive character"


# ---- 5. bass_pulse transition_weight: continuous, without inventing transitions ----------------


def _novelty(flat=0.15, hump=0.9, lo=30.0, hi=34.0):
    return np.where((BEATS >= lo) & (BEATS < hi), hump, flat)


def test_flat_or_low_novelty_contributes_nothing(tmp_path):
    path = make_analysis(tmp_path, curves={"novelty": _novelty(0.25, 0.25)})
    r = map_song(path, prof("bass_pulse"), rate_hz=30.0)
    rule = next(x for x in r.meta["rules"] if x.id == "bp_transition_novelty")
    assert rule.status == "applied" and r.arrays["rule__bp_transition_novelty"].max() == 0.0
    assert r.arrays["transition_weight"].max() == 0.0, "no interpretation and no novelty: no transition"


def test_a_real_novelty_hump_raises_transition_weight_but_no_more_than_half(tmp_path):
    path = make_analysis(tmp_path, curves={"novelty": _novelty()})
    r = map_song(path, prof("bass_pulse"), rate_hz=30.0)
    x, t = r.arrays["transition_weight"], r.arrays["times"]
    assert x[(t > 30.5) & (t < 33.5)].min() > 0.3 and x.max() <= 0.5 + 1e-9
    assert x[t < 28].max() == 0.0 and x[t > 40].max() == 0.0


def test_interpreted_changes_still_reach_full_strength(tmp_path):
    from audiolab.interpretation import interpret, write_interpretation

    curves = {"rms_db": step(30, -25, -5), "band_bass_db": step(30, -40, -5), "band_mid_db": step(30, -35, -10),
              "band_high_db": step(30, -45, -20), "novelty": _novelty()}
    from synthetic import regular
    path = make_analysis(tmp_path, curves=curves, onsets=regular([(0, 30, 1), (30, 60, 5)], 60), novelty_peaks=[30.0])
    write_interpretation(interpret(path, output_path=path.parent / "song_interpretation.json"), path.parent / "song_interpretation.json")
    assert map_song(path, prof("bass_pulse"), rate_hz=30.0).arrays["transition_weight"].max() == pytest.approx(1.0, abs=0.01)


# ---- 6. beat-four weakness: a creative override, never a changed measurement -------------------


def test_a_profile_override_strengthens_beat_four_without_touching_the_measurements(tmp_path):
    bass = lambda t: np.full_like(t, -20.0) + 12.0 * np.sin(2 * np.pi * 0.1 * t)  # moderate, varying bass
    path = make_analysis(tmp_path, curves={"band_bass_db": bass})
    before = {p.name: hashlib.sha256(p.read_bytes()).hexdigest() for p in path.parent.iterdir()}

    def edit(spec):
        next(r for r in spec["channels"]["pulse_strength"]["rules"] if r["id"] == "bp_pulse_bass_beats")["beat_in_bar_strength"] = {"4": 1.5}
    plain = map_song(path, prof("bass_pulse"), rate_hz=30.0)
    boosted = map_song(path, spec_with("bass_pulse", edit), rate_hz=30.0)

    def by_position(r):
        a = r.arrays
        keep = a["resp__rule"] == "bp_pulse_bass_beats"
        pos = np.array([int(s.split(":")[1]) % 4 + 1 for s in a["resp__source_id"][keep]])
        return pos, a["resp__strength"][keep]

    pos, s0 = by_position(plain)
    _, s1 = by_position(boosted)
    assert np.all(s1[pos == 4] > s0[pos == 4]) and np.array_equal(s1[pos != 4], s0[pos != 4])
    assert {p.name: hashlib.sha256(p.read_bytes()).hexdigest() for p in path.parent.iterdir()} == before
    rec = next(r for r in boosted.meta["profile"]["spec"]["channels"]["pulse_strength"]["rules"] if r["id"] == "bp_pulse_bass_beats")
    assert rec["beat_in_bar_strength"] == {"4": 1.5}, "the override is recorded in the artifact"


# ---- the shipped profiles ----------------------------------------------------------------------


def test_profiles_are_versioned_and_the_phase_70_originals_are_kept():
    for name in ("balanced", "bass_pulse", "cinematic"):
        assert prof(name).version == "2" and prof(name, baseline=True).version == "1"
        assert yaml.safe_load((PROFILES / f"{name}.yaml").read_text(encoding="utf-8"))["name"] == name


# ---- real songs against the frozen baseline ----------------------------------------------------

SEYI = ROOT / "outputs" / "Seyi-Vibez-SWAGUU-feat-Quavo" / "song_analysis.json"
DETTY = ROOT / "outputs" / "Detty - Party scatter demo" / "song_analysis.json"
have = lambda p: p.exists() and (p.parent / cal.BASELINE_DIR).exists() and (p.parent / "visual").exists()
needs_seyi = pytest.mark.skipif(not have(SEYI), reason="Seyi mappings not generated")
needs_detty = pytest.mark.skipif(not have(DETTY), reason="Detty mappings not generated")
needs_both = pytest.mark.skipif(not (have(SEYI) and have(DETTY)), reason="mappings not generated")


@needs_both
@pytest.mark.parametrize("song", [SEYI, DETTY], ids=["seyi", "detty"])
def test_the_frozen_baseline_still_validates_against_its_sources(song):
    for name in ("balanced", "bass_pulse", "cinematic"):
        assert validate_mapping(song.parent / cal.BASELINE_DIR / f"visual_mapping.{name}.json") == []


@needs_both
@pytest.mark.parametrize("song", [SEYI, DETTY], ids=["seyi", "detty"])
def test_detail_activity_is_no_longer_saturated_and_separates_calm_from_lively(song):
    from audiolab.interpretation.context import AnalysisContext
    ctx = AnalysisContext(song)
    for name in ("balanced", "bass_pulse", "cinematic"):
        old, new = cal.load_version(song, name, cal.BASELINE_DIR), cal.load_version(song, name, "visual")
        d_old, d_new = cal.detail_metrics(ctx, old), cal.detail_metrics(ctx, new)
        assert d_old["share_above_0.8"] > 0.3 and d_new["share_above_0.8"] < 0.1, name
        assert d_new["std"] > 0.1 and d_new["mean_in_liveliest_fifth"] > d_new["mean_in_calmest_fifth"], name


@needs_both
@pytest.mark.parametrize("song", [SEYI, DETTY], ids=["seyi", "detty"])
def test_cinematic_motion_weight_is_more_distinct_from_intensity_than_before(song):
    old, new = (cal.channel_distinctness(cal.load_version(song, "cinematic", d)) for d in (cal.BASELINE_DIR, "visual"))
    assert new["intensity~motion_weight"]["detrended"] < old["intensity~motion_weight"]["detrended"] - 0.05
    assert new["intensity~motion_weight"]["detrended"] < 0.9 and new["scale~motion_weight"]["detrended"] < 0.75


@needs_seyi
def test_seyi_quiet_intro_stays_sparse_for_balanced_pulses():
    reg = cal.regions(SEYI)
    assert reg["sparse"] and reg["body"], "regions come from the interpretation"
    old, new = (cal.intro_pulses(cal.load_version(SEYI, "balanced", d), reg) for d in (cal.BASELINE_DIR, "visual"))
    assert old["intro_max"] > 0.9 and new["intro_max"] <= 0.5 and new["body_max"] >= 0.9
    assert new["intro_p90"] < 0.5 * new["body_p90"]


@needs_detty
def test_detty_quiet_middle_differs_by_profile_as_intended():
    reg = cal.regions(DETTY)
    assert reg["quiet"] and reg["main_before_quiet"], "regions come from the interpretation"
    r = {p: cal.quiet_ratios(cal.load_version(DETTY, p, "visual"), reg) for p in ("balanced", "bass_pulse", "cinematic")}
    # Intensity: balanced keeps the most, cinematic the least; all three reduce.
    assert r["balanced"]["intensity"] > r["bass_pulse"]["intensity"] > r["cinematic"]["intensity"]
    assert r["balanced"]["intensity"] < 0.8 and r["bass_pulse"]["intensity"] <= 0.6 and r["cinematic"]["intensity"] <= 0.4
    # Balanced keeps rhythm: onset-driven density does not fall and pulses survive at reduced strength.
    assert r["balanced"]["density"] >= 1.0 and 0.3 <= r["balanced"]["pulse_strength"] < 0.8
    # Cinematic pulses fade the most; bass_pulse follows the bass.
    assert r["cinematic"]["pulse_strength"] < r["bass_pulse"]["pulse_strength"] < r["balanced"]["pulse_strength"]
    assert r["bass_pulse"]["motion_weight"] < 0.5 * r["balanced"]["motion_weight"]


@needs_both
@pytest.mark.parametrize("song", [SEYI, DETTY], ids=["seyi", "detty"])
def test_bass_pulse_motion_is_smoother_and_transitions_gain_a_supported_continuous_part(song):
    from audiolab.interpretation.context import AnalysisContext
    from audiolab.interpretation.engine import load_interpretation
    old, new = (cal.load_version(song, "bass_pulse", d) for d in (cal.BASELINE_DIR, "visual"))
    act = lambda ld: np.mean(np.abs(np.diff(ld.arrays["motion_weight"]))) * ld.model.timebase.rate_hz
    assert act(new) < 0.7 * act(old)
    ctx, interp = AnalysisContext(song), load_interpretation(song.parent / "song_interpretation.json")
    te_old, te_new = (cal.transition_evidence(ctx, interp, ld) for ld in (old, new))
    assert te_new["share_above_0.05"] > te_old["share_above_0.05"] and te_new["unsupported_samples"] <= 5


@needs_both
@pytest.mark.parametrize("song", [SEYI, DETTY], ids=["seyi", "detty"])
def test_bass_pulse_beat_position_pattern_comes_from_the_measurements_not_the_profile_tweaks(song):
    from audiolab.visual_mapping.review import pulse_by_beat_position
    from audiolab.interpretation.context import AnalysisContext
    ctx = type("S", (), {"ctx": AnalysisContext(song)})()
    old, new = (pulse_by_beat_position(ctx, cal.load_version(song, "bass_pulse", d)) for d in (cal.BASELINE_DIR, "visual"))
    assert old == new
