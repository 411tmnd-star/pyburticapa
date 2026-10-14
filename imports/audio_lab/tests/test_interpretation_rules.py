"""Each interpretation rule on synthetic songs: what it finds, what it must not, and its edges."""

import numpy as np
import pytest

from audiolab.interpretation import InterpretConfig, interpret
from audiolab.interpretation.checks import bass_burst_alignment
from audiolab.interpretation.context import AnalysisContext
from synthetic import FR, make_analysis, ramp, regular, step, const


def run(tmp_path, cfg=None, **kwargs):
    return interpret(make_analysis(tmp_path, **kwargs), cfg or InterpretConfig())


def labelled(model, label):
    return [i for i in model.interpretations if i.label == label]


def skipped(model, label):
    return {s.label: s.reason for s in model.skipped_rules}.get(label)


# ---- bass_entry --------------------------------------------------------------------------------


def test_bass_entry_found_on_the_beat_where_bass_arrives(tmp_path):
    m = run(tmp_path, curves={"band_bass_db": step(30, -40, -5)})
    (entry,) = labelled(m, "bass_entry")
    assert entry.kind == "change" and entry.start_s == entry.end_s == pytest.approx(30.0)
    assert entry.attributes["rise_db"] == pytest.approx(35, abs=0.5)
    assert all(c.met for c in entry.evidence.criteria)
    assert entry.anchor_event_id in entry.evidence.supporting_event_ids


@pytest.mark.parametrize("hi, expected", [(-18.5, 0), (-17.5, 1)])  # rise 11.5 dB vs 12.5 dB
def test_bass_entry_threshold_boundary(tmp_path, hi, expected):
    m = run(tmp_path, curves={"band_bass_db": step(30, -30, hi)})
    assert len(labelled(m, "bass_entry")) == expected


def test_a_single_bass_burst_is_not_an_entry(tmp_path):
    burst = lambda t: np.where((t >= 30) & (t < 30.3), -5.0, -40.0)
    assert labelled(run(tmp_path, curves={"band_bass_db": burst}), "bass_entry") == []


def test_bass_entry_follows_the_configuration(tmp_path):
    cfg = InterpretConfig()
    cfg.bass_entry.min_rise_db = 40.0  # more than the 35 dB step
    assert labelled(run(tmp_path, cfg, curves={"band_bass_db": step(30, -40, -5)}), "bass_entry") == []


def test_bass_that_stays_quiet_is_not_an_entry(tmp_path):
    cfg = InterpretConfig()
    # A 14 dB rise, but ending at -50 dB: below min_after_level_db.
    m = run(tmp_path, cfg, curves={"band_bass_db": step(30, -64, -50)})
    assert labelled(m, "bass_entry") == []


# ---- energy_drop -------------------------------------------------------------------------------


def test_energy_drop_found_at_the_step(tmp_path):
    m = run(tmp_path, curves={"rms_db": step(30, -5, -15)})
    (drop,) = labelled(m, "energy_drop")
    assert drop.start_s == pytest.approx(30.0) and drop.attributes["drop_db"] == pytest.approx(10, abs=0.3)


@pytest.mark.parametrize("lo, expected", [(-10.0, 0), (-12.0, 1)])  # 5 dB vs 7 dB fall
def test_energy_drop_threshold_boundary(tmp_path, lo, expected):
    assert len(labelled(run(tmp_path, curves={"rms_db": step(30, -5, lo)}), "energy_drop")) == expected


def test_a_rise_is_not_an_energy_drop(tmp_path):
    assert labelled(run(tmp_path, curves={"rms_db": step(30, -15, -5)}), "energy_drop") == []


# ---- energy_build ------------------------------------------------------------------------------


def test_gradual_ramp_is_one_build(tmp_path):
    m = run(tmp_path, curves={"rms_db": ramp(10, 40, -30, -5)})
    (build,) = labelled(m, "energy_build")
    assert build.kind == "passage"
    assert 8 <= build.start_s <= 14 and 36 <= build.end_s <= 42
    assert build.attributes["rise_db"] >= 18
    assert {x.name for x in build.evidence.measurements} == {"loudness_at_start", "loudness_at_end", "mean_slope"}


def test_a_sudden_jump_is_not_a_build(tmp_path):
    assert labelled(run(tmp_path, curves={"rms_db": step(30, -30, -5)}), "energy_build") == []


def test_a_build_is_cut_where_it_meets_a_jump(tmp_path):
    ramp_then_jump = lambda t: np.where(t < 30, ramp(10, 30, -35, -15)(t), -5.0)
    (build,) = labelled(run(tmp_path, curves={"rms_db": ramp_then_jump}), "energy_build")
    assert build.end_s <= 28.5, "the passage must stop before the jump"
    assert build.attributes["rise_db"] >= 12


def test_short_or_shallow_ramps_are_not_builds(tmp_path):
    assert labelled(run(tmp_path, curves={"rms_db": ramp(20, 23, -30, -20)}), "energy_build") == []  # 3 s
    assert labelled(run(tmp_path, curves={"rms_db": ramp(10, 30, -20, -16)}), "energy_build") == []  # 0.2 dB/s


# ---- high_energy_passage / sparse_passage ------------------------------------------------------

LOUD_MIDDLE = lambda t: np.where((t >= 20) & (t < 45), -5.0, -25.0)


def test_loud_stretch_is_one_high_energy_passage(tmp_path):
    (p,) = labelled(run(tmp_path, curves={"rms_db": LOUD_MIDDLE}), "high_energy_passage")
    assert p.start_s == pytest.approx(20, abs=1.0) and p.end_s == pytest.approx(45, abs=1.0)
    assert {x.name for x in p.evidence.measurements} == {"passage_level", "reference_level"}


def test_short_loud_blip_is_not_a_passage(tmp_path):
    blip = lambda t: np.where((t >= 20) & (t < 26), -5.0, -25.0)  # 6 s < min_duration_s
    assert labelled(run(tmp_path, curves={"rms_db": blip}), "high_energy_passage") == []


def test_uniform_loudness_has_no_elevated_passage_and_says_why(tmp_path):
    m = run(tmp_path, curves={"rms_db": const(-10.0)})
    assert labelled(m, "high_energy_passage") == []
    assert "no contrast" in skipped(m, "high_energy_passage")


def test_quiet_and_sparse_stretches_are_sparse_passages(tmp_path):
    onsets = regular([(0, 20, 1), (20, 45, 5), (45, 60, 1)], 60)
    m = run(tmp_path, curves={"rms_db": LOUD_MIDDLE}, onsets=onsets)
    spans = [(round(p.start_s), round(p.end_s)) for p in labelled(m, "sparse_passage")]
    assert len(spans) == 2 and spans[0][0] == 0 and 18 <= spans[0][1] <= 21 and 44 <= spans[1][0] <= 47
    assert all(p.attributes["onset_ratio"] <= 0.75 for p in labelled(m, "sparse_passage"))


def test_quiet_but_busy_is_not_sparse(tmp_path):
    onsets = regular([(0, 60, 5)], 60)
    assert labelled(run(tmp_path, curves={"rms_db": LOUD_MIDDLE}, onsets=onsets), "sparse_passage") == []


def test_sparse_needs_onsets_and_reports_when_there_are_none(tmp_path):
    m = run(tmp_path, curves={"rms_db": LOUD_MIDDLE}, onsets=[])
    assert "no onsets" in skipped(m, "sparse_passage")


# ---- rhythmic_density_change -------------------------------------------------------------------


def test_onset_rate_step_up_is_a_density_change(tmp_path):
    m = run(tmp_path, onsets=regular([(0, 30, 1), (30, 60, 5)], 60))
    (c,) = labelled(m, "rhythmic_density_change")
    assert abs(c.start_s - 30.0) <= 0.5
    assert c.attributes["direction"] == "increase" and c.attributes["ratio"] > 3
    assert all(x.event_ids for x in c.evidence.measurements), "event-based evidence lists its onsets"


def test_onset_rate_step_down_is_a_decrease(tmp_path):
    m = run(tmp_path, onsets=regular([(0, 30, 5), (30, 60, 1)], 60))
    assert labelled(m, "rhythmic_density_change")[0].attributes["direction"] == "decrease"


@pytest.mark.parametrize(
    "before, after, expected",
    [(1, 1.4, 0), (5, 6.2, 0), (1, 2.2, 1)],  # small absolute change / small ratio / both met
)
def test_density_thresholds_need_both_absolute_and_relative_change(tmp_path, before, after, expected):
    m = run(tmp_path, onsets=regular([(0, 30, before), (30, 60, after)], 60))
    assert len(labelled(m, "rhythmic_density_change")) == expected


# ---- transition_candidate ----------------------------------------------------------------------

ALL_STEP = {
    "rms_db": step(30, -25, -5),
    "band_bass_db": step(30, -40, -5),
    "band_mid_db": step(30, -35, -10),
    "band_high_db": step(30, -45, -20),
}


def test_features_changing_together_make_a_transition_candidate(tmp_path):
    m = run(tmp_path, curves=ALL_STEP, onsets=regular([(0, 30, 1), (30, 60, 5)], 60), novelty_peaks=[30.0])
    (t,) = labelled(m, "transition_candidate")
    assert abs(t.start_s - 30) <= 0.5 and t.attributes["channels_changed"] == 6
    assert "novelty_peak:000" in t.evidence.supporting_event_ids
    assert any(i.startswith("bass_entry@") for i in t.related_ids)


def test_two_changing_features_are_not_enough(tmp_path):
    curves = {"rms_db": step(30, -25, -5), "band_bass_db": step(30, -40, -5)}
    m = run(tmp_path, curves=curves, onsets=regular([(0, 60, 3)], 60))
    assert labelled(m, "transition_candidate") == []


def test_a_third_channel_from_novelty_tips_it_over(tmp_path):
    curves = {"rms_db": step(30, -25, -5), "band_bass_db": step(30, -40, -5)}
    m = run(tmp_path, curves=curves, onsets=regular([(0, 60, 3)], 60), novelty_peaks=[30.0])
    (t,) = labelled(m, "transition_candidate")
    assert t.attributes["channels"] == "loudness,bass,novelty"
    failing = [c for c in t.evidence.criteria if not c.met]
    assert failing, "evidence lists the channels that did not change as well"


# ---- missing features --------------------------------------------------------------------------


def test_missing_band_curve_skips_only_the_rules_that_need_it(tmp_path):
    m = run(tmp_path, curves={"band_bass_db": None, "rms_db": step(30, -5, -15)})
    assert "band_bass_db" in skipped(m, "bass_entry")
    assert len(labelled(m, "energy_drop")) == 1, "unrelated rules still run"


def test_too_few_channels_skips_transition_candidate(tmp_path):
    none = {k: None for k in ("band_bass_db", "band_mid_db", "band_high_db")}
    m = run(tmp_path, curves=none, analyzers=("beat_tracker", "bar_grid", "features"))
    assert "only 1 change channel" in skipped(m, "transition_candidate")
    assert "onset_detector" in skipped(m, "rhythmic_density_change")


def test_no_beats_skips_change_rules_but_passage_rules_still_run(tmp_path):
    m = run(tmp_path, beats=False, curves={"rms_db": LOUD_MIDDLE})
    for label in ("bass_entry", "energy_drop", "rhythmic_density_change", "transition_candidate"):
        assert "events:beat" in skipped(m, label)
    assert len(labelled(m, "high_energy_passage")) == 1
    assert m.provenance.evaluated_range_s is None


def test_disabled_rule_is_absent_from_vocabulary_and_results(tmp_path):
    cfg = InterpretConfig()
    cfg.bass_entry.enabled = False
    m = run(tmp_path, cfg, curves={"band_bass_db": step(30, -40, -5)})
    assert "bass_entry" not in {v.label for v in m.vocabulary} and labelled(m, "bass_entry") == []


# ---- edges of the audio ------------------------------------------------------------------------


def test_changes_too_close_to_the_ends_are_not_evaluated(tmp_path):
    # A step 0.7 s in leaves under half of the 4 s window before it (8 beats at 120 BPM), so no
    # beat that close to the start can be compared; the first evaluable beat is 2 s in.
    m = run(tmp_path, curves={"rms_db": step(0.7, -5, -25), "band_bass_db": step(59.3, -5, -40)})
    r = m.provenance.evaluated_range_s
    assert r.start_s == pytest.approx(0.5 * m.provenance.window_s, abs=0.5)
    assert r.end_s == pytest.approx(m.source_analysis.duration_s - 0.5 * m.provenance.window_s, abs=0.5)
    changes = [i for i in m.interpretations if i.kind == "change"]
    assert all(r.start_s - 1e-6 <= i.start_s <= r.end_s + 1e-6 for i in changes)
    assert labelled(m, "bass_entry") == [], "a step in the last 0.7 s cannot be compared"


def test_a_truncated_window_is_disclosed(tmp_path):
    # Step 2.5 s from the end: the after window is 2.5 s of the configured 4 s, above the 50% bar.
    m = run(tmp_path, curves={"rms_db": step(57.5, -5, -20)})
    (drop,) = labelled(m, "energy_drop")
    assert any("shortened" in text for text in drop.limitations)


# ---- measurement alignment and evidence --------------------------------------------------------


def test_every_curve_reference_reproduces_its_measurement(tmp_path):
    path = make_analysis(
        tmp_path, curves=ALL_STEP, onsets=regular([(0, 30, 1), (30, 60, 5)], 60), novelty_peaks=[30.0]
    )
    model = interpret(path)
    ctx = AnalysisContext(path)
    checked = 0
    for it in model.interpretations:
        for m in it.evidence.measurements:
            assert 0 <= m.window.start_s <= m.window.end_s <= model.source_analysis.duration_s + 1e-9
            if m.curve is None:
                continue
            assert m.curve.file == "analysis.npz" and m.curve.key == m.feature
            lo, hi = m.curve.frame_start, m.curve.frame_end
            if m.statistic == "mean_power_db":
                values = ctx.curve(m.feature)[lo:hi]
                assert 10 * np.log10(np.mean(10 ** (values / 10))) == pytest.approx(m.value, abs=1e-6)
                assert ctx.times[lo] >= m.window.start_s - 1e-9
                assert ctx.times[hi - 1] < m.window.end_s + 1e-9
                checked += 1
    assert checked >= 8


def test_event_evidence_points_at_real_analysis_events(tmp_path):
    path = make_analysis(tmp_path, onsets=regular([(0, 30, 1), (30, 60, 5)], 60), novelty_peaks=[30.0])
    model = interpret(path)
    ctx = AnalysisContext(path)
    ids = {e.id for e in ctx.analysis.events}
    times = {e.id: e.time_s for e in ctx.analysis.events}
    for it in model.interpretations:
        assert set(it.evidence.supporting_event_ids) <= ids
        if it.anchor_event_id:
            assert it.anchor_event_id in ids and times[it.anchor_event_id] == it.start_s
        for m in it.evidence.measurements:
            assert set(m.event_ids) <= ids
            for eid in m.event_ids:
                assert m.window.start_s <= times[eid] < m.window.end_s + 1e-9


def test_no_confidence_is_ever_invented(tmp_path):
    m = run(tmp_path, curves=ALL_STEP, onsets=regular([(0, 30, 1), (30, 60, 5)], 60), novelty_peaks=[30.0])
    assert m.interpretations and all(i.confidence is None for i in m.interpretations)


def test_every_interpretation_has_a_rule_limitations_and_criteria(tmp_path):
    m = run(tmp_path, curves=ALL_STEP, onsets=regular([(0, 30, 1), (30, 60, 5)], 60), novelty_peaks=[30.0])
    versions = {v.label: v.rule_version for v in m.vocabulary}
    for it in m.interpretations:
        assert it.rule.name == it.label and it.rule.version == versions[it.label]
        assert it.limitations and it.evidence.criteria and it.evidence.measurements


# ---- checks ------------------------------------------------------------------------------------


def _bursts_at(times, duration=60.0):
    def bass(t):
        out = np.full_like(t, -50.0)
        for b in times:
            out[(t >= b) & (t < b + 0.25)] = -5.0
        return out

    return bass


def test_bass_burst_check_finds_bursts_on_the_downbeat(tmp_path):
    downbeats = np.arange(0.5, 58.0, 2.0)  # every 4th beat at 120 BPM
    path = make_analysis(tmp_path, curves={"band_bass_db": _bursts_at(downbeats)})
    result = bass_burst_alignment(AnalysisContext(path))
    assert result["n_bursts"] == len(downbeats)
    assert result["within_downbeat"] == pytest.approx(1.0) and result["by_beat_in_bar"] == {"1": len(downbeats)}
    assert result["chance_downbeat"] < 0.2


def test_bass_burst_check_reports_bursts_off_the_grid_as_misaligned(tmp_path):
    off_grid = np.arange(0.75, 58.0, 2.0)  # a quarter of a second after the downbeats
    path = make_analysis(tmp_path, curves={"band_bass_db": _bursts_at(off_grid)})
    result = bass_burst_alignment(AnalysisContext(path), tolerance_s=0.1)
    assert result["n_bursts"] > 20 and result["within_any_beat"] == 0.0
