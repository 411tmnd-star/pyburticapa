"""The mapping engine on synthetic songs, the artifact and its checks, the CLI, and the two real songs."""

import hashlib
import json
from pathlib import Path

import numpy as np
import pytest
from pydantic import ValidationError

from audiolab import cli
from audiolab.interpretation import InterpretConfig, interpret, write_interpretation
from audiolab.visual_mapping import review
from audiolab.visual_mapping.engine import StaleInputError, map_song, output_paths, write_mapping
from audiolab.visual_mapping.profile import Profile, load_profile
from audiolab.visual_mapping.schema import VisualMapping, json_schema
from audiolab.visual_mapping.validate import check_reproducible, load_arrays, validate_mapping
from synthetic import make_analysis, regular, step

ROOT = Path(__file__).resolve().parents[1]
PROFILES = ROOT / "configs" / "visual_profiles"
STEPS = {
    "rms_db": step(30, -25, -5),
    "band_bass_db": step(30, -40, -5),
    "band_mid_db": step(30, -35, -10),
    "band_high_db": step(30, -45, -20),
}


@pytest.fixture
def song(tmp_path):
    """A 60 s synthetic song that changes at 30 s, with its interpretation next to it."""
    path = make_analysis(tmp_path, curves=STEPS, onsets=regular([(0, 30, 1), (30, 60, 5)], 60), novelty_peaks=[30.0])
    write_interpretation(interpret(path, output_path=path.parent / "song_interpretation.json"),
                         path.parent / "song_interpretation.json")
    return path


def profile(channels: dict, name="test") -> Profile:
    return Profile.model_validate({"name": name, "channels": channels})


def one(rule: dict, combine="weighted_mean", channel="intensity", **extra) -> Profile:
    return profile({channel: {"combine": combine, "rules": [rule], **extra}})


def at(result, key, seconds, rate=100.0):
    return result.arrays[key][int(round(seconds * rate))]


def sha(path):
    return hashlib.sha256(Path(path).read_bytes()).hexdigest()


# ---- known values ------------------------------------------------------------------------------


def test_feature_with_fixed_normalization_gives_exact_values(song):
    p = one({"id": "loud", "input": {"kind": "feature", "feature": "rms_db"},
             "normalize": {"method": "fixed", "low": -25, "high": -5}})
    r = map_song(song, p, rate_hz=100.0)
    assert at(r, "intensity", 10) == 0.0 and at(r, "intensity", 50) == 1.0
    # Valid from the first analysis frame to one frame after the last; the final output samples
    # past that have no measurement and are marked invalid rather than held.
    valid, t = r.arrays["intensity__valid"], r.arrays["times"]
    from synthetic import FR
    last_frame = (int(60.0 * FR) - 1) / FR
    assert valid[t <= last_frame + 1 / FR].all() and not valid[t > last_frame + 1 / FR + 1e-9].any()


def test_percentile_parameters_are_recorded(song):
    r = map_song(song, one({"id": "loud", "input": {"kind": "feature", "feature": "rms_db"}}), rate_hz=100.0)
    norm = next(x for x in r.meta["rules"] if x.id == "loud").normalization
    assert (norm.method, norm.low, norm.high, norm.computed_on) == ("percentile", 5.0, 95.0, "analysis frames")
    assert (norm.low_value, norm.high_value) == (-25.0, -5.0) and not norm.degenerate


def test_many_to_one_weighted_mean(song):
    p = profile({"intensity": {"combine": "weighted_mean", "rules": [
        {"id": "a", "input": {"kind": "feature", "feature": "rms_db"}, "normalize": {"method": "fixed", "low": -25, "high": -5}, "weight": 3},
        {"id": "b", "input": {"kind": "feature", "feature": "band_high_db"}, "normalize": {"method": "fixed", "low": -45, "high": 5}, "weight": 1},
    ]}})
    r = map_song(song, p, rate_hz=100.0)
    assert at(r, "intensity", 50) == pytest.approx((3 * 1.0 + 1 * 0.5) / 4)
    assert at(r, "intensity", 10) == pytest.approx(0.0)


def test_one_feature_drives_several_channels_independently(song):
    p = profile({
        "scale": {"rules": [{"id": "s", "input": {"kind": "feature", "feature": "rms_db"}, "normalize": {"method": "fixed", "low": -25, "high": -5}}]},
        "motion_weight": {"rules": [{"id": "m", "input": {"kind": "feature", "feature": "rms_db"}, "normalize": {"method": "fixed", "low": -45, "high": 15}}]},
    })
    r = map_song(song, p, rate_hz=100.0)
    assert at(r, "scale", 50) == 1.0 and at(r, "motion_weight", 50) == pytest.approx(40 / 60)


def test_curve_exponent_shapes_the_response(song):
    p = one({"id": "h", "input": {"kind": "feature", "feature": "band_high_db"},
             "normalize": {"method": "fixed", "low": -45, "high": 5}, "curve": 2.0})
    assert at(map_song(song, p, rate_hz=100.0), "intensity", 50) == pytest.approx(0.25)


# ---- missing and unknown inputs ----------------------------------------------------------------


def test_unknown_feature_is_skipped_never_zero(song):
    p = profile({
        "intensity": {"rules": [{"id": "x", "input": {"kind": "feature", "feature": "loudness"}}]},
        "scale": {"rules": [{"id": "s", "input": {"kind": "feature", "feature": "rms_db"}}]},
    })
    r = map_song(song, p, rate_hz=30.0)
    rec = next(x for x in r.meta["rules"] if x.id == "x")
    assert rec.status == "skipped" and "not in the analysis curves" in rec.reason
    ch = next(c for c in r.meta["channels"] if c.name == "intensity")
    assert ch.status == "unavailable" and "intensity" not in r.arrays and "scale" in r.arrays


def test_missing_curve_skips_only_its_rule(tmp_path):
    path = make_analysis(tmp_path, curves={"band_bass_db": None})
    p = profile({"intensity": {"rules": [
        {"id": "bass", "input": {"kind": "feature", "feature": "band_bass_db"}},
        {"id": "loud", "input": {"kind": "feature", "feature": "rms_db"}},
    ]}})
    r = map_song(path, p, rate_hz=30.0)
    assert [x.status for x in r.meta["rules"]] == ["skipped", "applied"]
    assert "intensity" in r.arrays


def test_missing_interpretation_skips_interpretation_rules_with_a_reason(tmp_path):
    path = make_analysis(tmp_path, curves=STEPS)
    p = one({"id": "t", "input": {"kind": "interpretation", "label": "transition_candidate"}}, channel="transition_weight")
    r = map_song(path, p, rate_hz=30.0)
    assert "no song_interpretation.json" in r.meta["rules"][0].reason
    assert r.meta["sources"]["interpretation"] is None


def test_missing_onsets_skip_onset_rules(tmp_path):
    path = make_analysis(tmp_path, analyzers=("beat_tracker", "bar_grid", "features"))
    p = one({"id": "o", "input": {"kind": "onset_rate"}}, channel="density")
    assert "onset_detector" in map_song(path, p).meta["rules"][0].reason


def test_label_absent_from_vocabulary_is_skipped(song):
    p = one({"id": "c", "input": {"kind": "interpretation", "label": "chorus"}}, channel="transition_weight")
    assert "not in the interpretation's vocabulary" in map_song(song, p).meta["rules"][0].reason


# ---- events ------------------------------------------------------------------------------------

PULSE = {"id": "p", "input": {"kind": "events", "events": "beat"},
         "response": {"attack_s": 0.0, "release_s": 0.2, "shape": "linear"}}


def test_beat_pulses_land_on_beats(song):
    r = map_song(song, one(PULSE, combine="max", channel="pulse_strength"), rate_hz=100.0)
    for beat in (10.0, 10.5, 40.0):
        assert at(r, "pulse_strength", beat) == 1.0
        assert at(r, "pulse_strength", beat + 0.1) == pytest.approx(0.5)
        assert at(r, "pulse_strength", beat + 0.3) == 0.0


def test_beat_in_bar_strength(song):
    rule = {**PULSE, "beat_in_bar_strength": {1: 1.0, 2: 0.5, 3: 0.5, 4: 0.5}}
    r = map_song(song, one(rule, combine="max", channel="pulse_strength"), rate_hz=100.0)
    # Synthetic beats start at 0.5 s with beat 1 every 2 s: 10.5 is beat 1, 11.0 is beat 2.
    assert at(r, "pulse_strength", 10.5) == 1.0 and at(r, "pulse_strength", 11.0) == 0.5


@pytest.mark.parametrize("floor, before", [(0.0, 0.0), (0.25, 0.25)])
def test_pulses_modulated_by_bass(song, floor, before):
    rule = {**PULSE, "modulate_by": {"feature": "band_bass_db", "normalize": {"method": "fixed", "low": -40, "high": -5},
                                     "window_s": 0.1, "floor": floor}}
    r = map_song(song, one(rule, combine="max", channel="pulse_strength"), rate_hz=100.0)
    assert at(r, "pulse_strength", 20.0) == pytest.approx(before) and at(r, "pulse_strength", 40.0) == 1.0
    assert next(x for x in r.meta["rules"]).modulation_normalization.low_value == -40.0


def test_overlap_sum_versus_max(song):
    base = {"id": "o", "input": {"kind": "events", "events": "onset"},
            "response": {"attack_s": 0.0, "release_s": 1.0, "shape": "linear"}, "strength": 0.4}
    mx = map_song(song, one({**base, "overlap": "max"}, combine="max", channel="detail_activity"), rate_hz=100.0)
    sm = map_song(song, one({**base, "overlap": "sum"}, combine="max", channel="detail_activity"), rate_hz=100.0)
    assert mx.arrays["detail_activity"].max() == pytest.approx(0.4)
    assert sm.arrays["detail_activity"].max() == 1.0 and sm.arrays["detail_activity"].min() >= 0.0


def test_interpretation_change_response_keeps_source_time_and_ids(song):
    rule = {"id": "t", "input": {"kind": "interpretation", "label": "transition_candidate"},
            "response": {"attack_s": 0.5, "release_s": 1.0, "peak_offset_s": -0.2, "shape": "linear"}}
    r = map_song(song, one(rule, combine="max", channel="transition_weight"), rate_hz=100.0)
    a = r.arrays
    i = list(a["resp__rule"]).index("t")
    assert a["resp__source_kind"][i] == "interpretation"
    assert a["resp__source_id"][i].startswith("transition_candidate@beat:") and a["resp__anchor_id"][i].startswith("beat:")
    assert a["resp__source_time"][i] == 30.0
    assert (a["resp__start"][i], a["resp__peak"][i], a["resp__end"][i]) == pytest.approx((29.3, 29.8, 30.8))
    assert at(r, "transition_weight", 29.8) == pytest.approx(1.0) and at(r, "transition_weight", 29.3) == 0.0


def test_interpretation_passage_is_a_gate(song):
    rule = {"id": "h", "input": {"kind": "interpretation", "label": "high_energy_passage"},
            "response": {"attack_s": 1.0, "release_s": 1.0, "shape": "linear"}}
    r = map_song(song, one(rule, combine="max", channel="scale"), rate_hz=100.0)
    i = list(r.arrays["resp__rule"]).index("h")
    start = r.arrays["resp__start"][i]
    assert at(r, "scale", start + 0.5) == pytest.approx(0.5, abs=0.01) and at(r, "scale", 50) == 1.0


def test_beat_rules_are_valid_only_around_the_beat_grid(tmp_path):
    path = make_analysis(tmp_path, duration=60.0)
    r = map_song(path, one(PULSE, combine="max", channel="pulse_strength"), rate_hz=100.0)
    t, valid = r.arrays["times"], r.arrays["pulse_strength__valid"]
    beats = r.arrays["resp__source_time"]
    # Valid from one beat interval (0.5 s) before the first beat minus the attack, to one interval
    # after the last beat plus hold and release (0.2 s).
    end = beats.max() + 0.5 + 0.2
    assert valid[t <= end - 1e-9].all() and not valid[t > end + 1e-9].any()
    assert r.arrays["pulse_strength"][~valid].tolist() == [0.0] * int((~valid).sum()), "rest value, flagged invalid"


def test_no_beats_means_beat_rules_are_skipped_not_silent(tmp_path):
    path = make_analysis(tmp_path, beats=False)
    r = map_song(path, one(PULSE, combine="max", channel="pulse_strength"), rate_hz=30.0)
    assert "fewer than two beats" in r.meta["rules"][0].reason
    assert r.meta["channels"][0].status == "unavailable" and "pulse_strength" not in r.arrays


def test_event_at_the_edge_is_clipped_and_flagged(song):
    rule = {"id": "p", "input": {"kind": "events", "events": "beat"}, "response": {"attack_s": 1.0, "release_s": 0.2}}
    r = map_song(song, one(rule, combine="max", channel="pulse_strength"), rate_hz=100.0)
    first = int(np.argmin(r.arrays["resp__source_time"]))
    assert r.arrays["resp__clipped"][first] and r.arrays["resp__start"][first] < 0
    assert r.arrays["pulse_strength"][0] > 0


# ---- smoothing ---------------------------------------------------------------------------------


def test_channel_smoothing_attack_is_applied_and_recorded(song):
    rule = {"id": "loud", "input": {"kind": "feature", "feature": "rms_db"}, "normalize": {"method": "fixed", "low": -25, "high": -5}}
    p = one(rule, smoothing={"attack_s": 0.5, "release_s": 0.5})
    r = map_song(song, p, rate_hz=100.0)
    x, t = r.arrays["intensity"], r.arrays["times"]
    crossing = t[np.argmax(x >= 1 - np.exp(-1))]
    assert 30.3 <= crossing <= 30.7, "about attack_s after the step"
    assert next(c for c in r.meta["channels"]).smoothing == {"attack_s": 0.5, "release_s": 0.5}


# Linear interpolation between analysis frames (23 ms apart) can show a trace of a change up to one
# frame early even with trailing smoothing; centred smoothing starts about smooth_s / 2 early.
@pytest.mark.parametrize("align, earliest, latest", [("centered", 28.8, 29.5), ("trailing", 29.97, 30.6)])
def test_feature_smoothing_alignment_moves_the_response(song, align, earliest, latest):
    rule = {"id": "loud", "input": {"kind": "feature", "feature": "rms_db", "smooth_s": 2.0, "align": align},
            "normalize": {"method": "fixed", "low": -25, "high": -5}}
    r = map_song(song, one(rule), rate_hz=100.0)
    x, t = r.arrays["intensity"], r.arrays["times"]
    first_rise = t[np.argmax(x > 0.05)]
    assert earliest <= first_rise <= latest


# ---- timebase, determinism, configuration ------------------------------------------------------


def test_timebase_alignment(song):
    for rate in (24.0, 30.0, 60.0):
        r = map_song(song, one({"id": "l", "input": {"kind": "feature", "feature": "rms_db"}}), rate_hz=rate)
        t = r.arrays["times"]
        assert len(t) == int(np.floor(60.0 * rate)) + 1 and t[-1] <= 60.0
        assert np.array_equal(t, np.arange(len(t)) / rate)
        assert all(len(v) == len(t) for k, v in r.arrays.items() if not k.startswith("resp__"))


def test_identical_inputs_give_identical_arrays(song):
    p, _ = load_profile(PROFILES / "bass_pulse.yaml")
    a, b = map_song(song, p), map_song(song, p)
    assert a.arrays.keys() == b.arrays.keys()
    assert all(np.array_equal(a.arrays[k], b.arrays[k]) for k in a.arrays)


def test_changing_a_weight_changes_output_and_record(song):
    rules = lambda w: [
        {"id": "a", "input": {"kind": "feature", "feature": "rms_db"}, "normalize": {"method": "fixed", "low": -25, "high": -5}, "weight": w},
        {"id": "b", "input": {"kind": "feature", "feature": "band_high_db"}, "normalize": {"method": "fixed", "low": -45, "high": 5}},
    ]
    r1 = map_song(song, profile({"intensity": {"rules": rules(1)}}), rate_hz=100.0)
    r3 = map_song(song, profile({"intensity": {"rules": rules(3)}}), rate_hz=100.0)
    assert at(r1, "intensity", 50) == pytest.approx(0.75) and at(r3, "intensity", 50) == pytest.approx(0.875)
    assert r3.meta["profile"]["spec"]["channels"]["intensity"]["rules"][0]["weight"] == 3


def test_all_profiles_load_and_stay_in_bounds(song):
    for path in sorted(PROFILES.glob("*.yaml")):
        p, file_sha = load_profile(path)
        r = map_song(song, p, profile_file=str(path), profile_sha256=file_sha)
        for c in r.meta["channels"]:
            if c.status == "available":
                x = r.arrays[c.name]
                assert np.all(np.isfinite(x)) and x.min() >= 0 and x.max() <= 1
    assert {load_profile(p)[0].name for p in PROFILES.glob("*.yaml")} == {"balanced", "bass_pulse", "cinematic"}


# ---- profile validation ------------------------------------------------------------------------


@pytest.mark.parametrize("channels, message", [
    ({"glow": {"rules": [{"id": "a", "input": {"kind": "feature", "feature": "rms_db"}}]}}, "unknown channel"),
    ({"intensity": {"rules": [{"id": "a", "input": {"kind": "feature", "feature": "rms_db"}},
                              {"id": "a", "input": {"kind": "feature", "feature": "rms_db"}}]}}, "unique"),
    ({"intensity": {"rules": [{"id": "a", "input": {"kind": "events", "events": "beat"}, "normalize": {}}]}}, "normalize applies"),
    ({"intensity": {"rules": [{"id": "a", "input": {"kind": "interpretation", "label": "x"},
                               "modulate_by": {"feature": "rms_db"}}]}}, "modulate_by"),
    ({"intensity": {"rules": [{"id": "a", "input": {"kind": "feature", "feature": "rms_db"}, "wieght": 1}]}}, "wieght"),
    ({"intensity": {"rules": [{"id": "a", "input": {"kind": "feature", "feature": "rms_db"},
                               "normalize": {"low": 90, "high": 10}}]}}, "greater"),
    ({"intensity": {"rules": []}}, "at least 1"),
])
def test_bad_profiles_are_rejected(channels, message):
    with pytest.raises(ValidationError, match=message):
        profile(channels)


# ---- artifact, validation, staleness -----------------------------------------------------------


@pytest.fixture
def written(song):
    p, file_sha = load_profile(PROFILES / "balanced.yaml")
    j, n = output_paths(song, "balanced")
    write_mapping(map_song(song, p, 30.0, "configs/visual_profiles/balanced.yaml", file_sha), j, n)
    return song, j, n


def test_written_artifact_validates_and_reproduces(written):
    song, j, n = written
    assert validate_mapping(j) == [] and check_reproducible(j) == []
    model = VisualMapping.model_validate_json(j.read_text(encoding="utf-8"))
    assert model.sources.analysis.path == "../song_analysis.json" and model.numerical.file == n.name
    assert model.sources.analysis.file_sha256 == sha(song)
    assert model.sources.interpretation.path == "../song_interpretation.json"
    assert model.numerical.sha256 == sha(n) and model.engine.version and model.profile.file_sha256
    assert {c.name for c in model.channels} == {"intensity", "scale", "density", "motion_weight",
                                               "pulse_strength", "transition_weight", "detail_activity"}


def test_mapping_never_modifies_its_inputs(song):
    before = {p.name: sha(p) for p in song.parent.iterdir() if p.is_file()}
    p, _ = load_profile(PROFILES / "cinematic.yaml")
    j, n = output_paths(song, "cinematic")
    write_mapping(map_song(song, p), j, n)
    assert {p.name: sha(p) for p in song.parent.iterdir() if p.is_file()} == before


def test_changed_analysis_makes_the_mapping_stale(written):
    song, j, _ = written
    doc = json.loads(song.read_text(encoding="utf-8"))
    doc["tempo"]["bpm"] = 99.0
    song.write_text(json.dumps(doc), encoding="utf-8")
    assert any("analysis has changed" in p for p in validate_mapping(j))


def test_re_exported_identical_analysis_is_not_stale(written):
    song, j, _ = written
    doc = json.loads(song.read_text(encoding="utf-8"))
    doc["provenance"]["created_at"] = "2031-01-01T00:00:00+00:00"
    song.write_text(json.dumps(doc), encoding="utf-8")
    assert not any("analysis" in p for p in validate_mapping(j))


def test_changed_interpretation_makes_the_mapping_stale(written):
    song, j, _ = written
    cfg = InterpretConfig()
    cfg.bass_entry.enabled = False
    write_interpretation(interpret(song, cfg, output_path=song.parent / "song_interpretation.json"),
                         song.parent / "song_interpretation.json")
    assert any("interpretation has changed" in p for p in validate_mapping(j))


def test_tampered_numbers_are_detected(written):
    _, j, n = written
    model = VisualMapping.model_validate_json(j.read_text(encoding="utf-8"))
    arrays = load_arrays(model, j)
    arrays["intensity"] = arrays["intensity"] * 0.5
    np.savez(n, **arrays)
    assert any("hash" in p for p in validate_mapping(j))
    assert any("intensity differs" in p for p in check_reproducible(j))


def test_misaligned_or_out_of_range_numbers_are_detected(written):
    _, j, n = written
    model = VisualMapping.model_validate_json(j.read_text(encoding="utf-8"))
    arrays = load_arrays(model, j)
    arrays["times"] = arrays["times"] + 0.001
    arrays["scale"] = arrays["scale"] + 2.0
    np.savez(n, **arrays)
    problems = validate_mapping(j)
    assert any("declared grid" in p for p in problems) and any("outside [0, 1]" in p for p in problems)


def test_stale_interpretation_refuses_to_map(song):
    doc = json.loads(song.read_text(encoding="utf-8"))
    doc["tempo"]["bpm"] = 99.0
    song.write_text(json.dumps(doc), encoding="utf-8")
    with pytest.raises(StaleInputError, match="stale"):
        map_song(song, load_profile(PROFILES / "balanced.yaml")[0])


@pytest.mark.parametrize("mutate, message", [
    (lambda d: d.update(schema_version="2.0.0"), "not compatible"),
    (lambda d: d["channels"].append(dict(d["channels"][0])), "unique"),
    (lambda d: d["channels"][0].update(name="glow"), "unknown channel"),
    (lambda d: d["rules"][0].update(array_key=None), "array_key"),
    (lambda d: d["rules"][0].update(status="skipped", reason=None), "must say why"),
    (lambda d: d["numerical"]["arrays"].pop(1), "not listed"),
    (lambda d: d.update(extra=1), "extra"),
])
def test_schema_rejects_bad_artifacts(written, mutate, message):
    doc = json.loads(written[1].read_text(encoding="utf-8"))
    mutate(doc)
    with pytest.raises(ValidationError, match=message):
        VisualMapping.model_validate(doc)


def test_committed_json_schema_is_up_to_date():
    committed = json.loads((ROOT / "schemas" / "visual_mapping.v1.json").read_text(encoding="utf-8"))
    assert committed == json_schema(), "run: python -m audiolab schema --kind visual_mapping"


# ---- review tools and CLI ----------------------------------------------------------------------


def test_review_statistics_and_timing(written):
    song_path, j, _ = written
    s = review.load_song(song_path, ["balanced"])
    rv = review.song_review(s)["profiles"]["balanced"]
    assert rv["timing"]["within_one_sample"] and rv["timing"]["n_interpretation_responses"] >= 1
    assert rv["contrast_at_focus"]["intensity"]["after"] > rv["contrast_at_focus"]["intensity"]["before"] + 0.5
    shares = rv["contributions"]["intensity"]
    assert sum(shares.values()) == pytest.approx(1.0)
    assert review.focus_time(s) == pytest.approx(30.0)


def test_cli_workflow(song, tmp_path, capsys):
    report = tmp_path / "report.md"
    assert cli.main(["visual", "run", str(song), "--profiles-dir", str(PROFILES), "--report", str(report)]) == 0
    out = capsys.readouterr().out
    assert out.count("recomputed: identical") == 3 and report.exists()
    assert (song.parent / "plots" / "visual_compare_zoom.png").exists()
    j = output_paths(song, "bass_pulse")[0]
    assert cli.main(["visual", "inspect", str(j), "--channel", "pulse_strength"]) == 0
    assert "pulse_strength" in capsys.readouterr().out
    assert cli.main(["validate", str(j), str(song)]) == 0
    out = capsys.readouterr().out
    assert "visual mapping schema" in out and "events" in out


def test_cli_validate_reports_stale_mapping(written, capsys):
    song, j, _ = written
    doc = json.loads(song.read_text(encoding="utf-8"))
    doc["tempo"]["bpm"] = 99.0
    song.write_text(json.dumps(doc), encoding="utf-8")
    capsys.readouterr()
    assert cli.main(["validate", str(j)]) == 1
    assert "STALE" in capsys.readouterr().out


def test_cli_map_reports_a_broken_input(song, capsys):
    (song.parent / "analysis.npz").write_bytes(b"broken")
    assert cli.main(["visual", "map", str(song), "--profiles-dir", str(PROFILES), "--profile", "balanced"]) == 1
    assert "FAILED" in capsys.readouterr().out


# ---- real songs --------------------------------------------------------------------------------

SEYI = ROOT / "outputs" / "Seyi-Vibez-SWAGUU-feat-Quavo" / "song_analysis.json"
DETTY = ROOT / "outputs" / "Detty - Party scatter demo" / "song_analysis.json"


def _profiles():
    return {p.stem: load_profile(p)[0] for p in sorted(PROFILES.glob("*.yaml"))}


@pytest.mark.skipif(not SEYI.exists(), reason="Seyi analysis not generated")
def test_seyi_channels_respond_at_the_bass_entry_and_keep_the_intro_quiet():
    from audiolab.interpretation.engine import load_interpretation

    interp = load_interpretation(SEYI.parent / "song_interpretation.json")
    t0 = next(i.start_s for i in interp.interpretations if i.label == "bass_entry")  # from data
    for name, prof in _profiles().items():
        r = map_song(SEYI, prof, 30.0)
        t, x = r.arrays["times"], r.arrays["intensity"]
        before = x[(t > t0 - 8) & (t < t0 - 0.5)].mean()
        after = x[(t > t0 + 0.5) & (t < t0 + 8)].mean()
        assert before < 0.3 and after > 0.7 and after - before > 0.5, (name, before, after)
        tw = r.arrays["transition_weight"]
        win = (t >= t0 - 3) & (t <= t0 + 3)
        assert abs(t[win][np.argmax(tw[win])] - t0) <= 0.1, f"{name}: transition_weight peaks at the change"
    bp = map_song(SEYI, _profiles()["bass_pulse"], 30.0)
    t = bp.arrays["times"]
    assert bp.arrays["pulse_strength"][(t >= t0) & (t <= t0 + 0.1)].max() >= 0.9


@pytest.mark.skipif(not DETTY.exists(), reason="Detty analysis not generated")
def test_detty_continuous_mapping_answers_repeated_bass_bursts():
    profs = _profiles()
    s = review.Song("detty", DETTY, review.AnalysisContext(DETTY), None, {})
    for name in ("bass_pulse", "cinematic"):
        r = map_song(DETTY, profs[name], 30.0)
        s.mappings[name] = review.Loaded(name, Path("."), VisualMapping.model_construct(
            channels=r.meta["channels"], rules=r.meta["rules"], timebase=r.meta["timebase"],
            responses=r.meta["responses"]), r.arrays)
    bp = review.burst_response(s, s.mappings["bass_pulse"])
    cin = review.burst_response(s, s.mappings["cinematic"])
    assert bp["n_bursts"] >= 50 and bp["scale"] >= 0.6 and bp["scale"] > cin["scale"]
    by_pos = review.pulse_by_beat_position(s, s.mappings["bass_pulse"])
    assert sum(1 for v in by_pos.values() if v >= 0.4) >= 3, "pulses are not reserved for bar starts"


@pytest.mark.skipif(not DETTY.exists(), reason="Detty analysis not generated")
def test_detty_pulse_strength_follows_bass_at_each_beat():
    r = map_song(DETTY, _profiles()["bass_pulse"], 30.0)
    a = r.arrays
    rows = [i for i, rule in enumerate(a["resp__rule"]) if rule == "bp_pulse_bass_beats"]
    ctx = review.AnalysisContext(DETTY)
    bass = ctx.curve("band_bass_db")
    at_beat = [bass[np.searchsorted(ctx.times, a["resp__source_time"][i] - 0.075):
                    np.searchsorted(ctx.times, a["resp__source_time"][i] + 0.075) + 1].max() for i in rows]
    corr = np.corrcoef(at_beat, a["resp__strength"][rows])[0, 1]
    assert corr > 0.8


@pytest.mark.parametrize("path", [SEYI, DETTY], ids=["seyi", "detty"])
def test_real_songs_map_validate_reproduce_and_leave_sources_alone(path, tmp_path):
    if not path.exists():
        pytest.skip("analysis not generated")
    before = {p.name: sha(p) for p in path.parent.iterdir() if p.is_file()}
    for name, prof in _profiles().items():
        j, n = tmp_path / f"visual_mapping.{name}.json", tmp_path / f"visual_mapping.{name}.npz"
        write_mapping(map_song(path, prof, 30.0), j, n)
        assert validate_mapping(j) == [] and check_reproducible(j) == []
    assert {p.name: sha(p) for p in path.parent.iterdir() if p.is_file()} == before
