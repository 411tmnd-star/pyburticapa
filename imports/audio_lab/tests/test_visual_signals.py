"""The mapping layer's signal math with known inputs and exact expected outputs."""

import numpy as np
import pytest

from audiolab.visual_mapping import signals as sg

T100 = np.arange(0, 2001) / 100.0  # 0..20 s at 100 Hz: event times on 0.01 s land on samples


# ---- normalize ---------------------------------------------------------------------------------


def test_percentile_normalization_maps_known_percentiles():
    x = np.arange(101, dtype=float)
    out, res = sg.normalize(x, np.ones(101, bool), "percentile", 10, 90)
    assert (res.low_value, res.high_value, res.degenerate) == (10.0, 90.0, False)
    assert out[50] == pytest.approx(0.5) and out[10] == 0.0 and out[90] == 1.0
    assert out[0] == 0.0 and out[100] == 1.0, "clipped outside the percentiles"


def test_percentile_uses_only_valid_samples():
    x = np.array([0.0, 10.0, 1000.0])
    out, res = sg.normalize(x, np.array([True, True, False]), "percentile", 0, 100)
    assert res.high_value == 10.0 and out[1] == 1.0 and out[2] == 1.0


def test_fixed_normalization_uses_input_units():
    out, res = sg.normalize(np.array([-60.0, -40.0, -20.0, 0.0, 5.0]), np.ones(5, bool), "fixed", -40, 0)
    assert list(out) == [0.0, 0.0, 0.5, 1.0, 1.0] and res.low_value == -40.0


def test_constant_input_is_degenerate_not_divided_by_zero():
    out, res = sg.normalize(np.full(10, -12.0), np.ones(10, bool), "percentile", 5, 95)
    assert res.degenerate and np.all(out == 0.0) and np.all(np.isfinite(out))


def test_no_valid_samples_is_degenerate():
    out, res = sg.normalize(np.ones(4), np.zeros(4, bool), "percentile", 5, 95)
    assert res.degenerate and np.isnan(res.low_value) and np.all(out == 0.0)


def test_extreme_values_stay_bounded_and_finite():
    rng = np.random.default_rng(0)
    x = rng.normal(0, 1e12, 1000)
    out, _ = sg.normalize(x, np.ones(1000, bool), "percentile", 1, 99)
    assert np.all(np.isfinite(out)) and out.min() >= 0.0 and out.max() <= 1.0


# ---- moving average and resampling -------------------------------------------------------------


def test_centered_average_looks_ahead_and_trailing_lags():
    x = np.where(np.arange(100) < 50, 0.0, 1.0)
    centered = sg.moving_average(x, 11, False, "centered")
    trailing = sg.moving_average(x, 11, False, "trailing")
    # A width-11 centred window at i covers i-5..i+5, so it first sees the step at 50 from i = 45.
    assert centered[44] == 0.0 and centered[45] == pytest.approx(1 / 11), "centered sees the step early"
    assert centered[50] == pytest.approx(6 / 11)
    assert trailing[49] == 0.0 and trailing[50] == pytest.approx(1 / 11) and trailing[60] == 1.0
    # Centred reaches half-height exactly at the step (no lag); trailing half a width later.
    assert np.argmax(centered >= 0.5) == 50 and np.argmax(trailing >= 0.5) == 55


def test_db_average_is_taken_in_the_power_domain():
    x = np.array([-10.0, -10.0, -40.0])
    out = sg.moving_average(x, 3, True, "trailing")
    expected = 10 * np.log10((0.1 + 0.1 + 1e-4) / 3)
    assert out[2] == pytest.approx(expected, abs=1e-6)
    assert np.allclose(sg.moving_average(np.full(20, -20.0), 5, True), -20.0)


def test_unknown_alignment_is_rejected():
    with pytest.raises(ValueError):
        sg.moving_average(np.ones(5), 3, False, "sideways")


def test_resample_marks_samples_outside_the_source_invalid():
    src_t = np.arange(0, 11, 1.0)
    out, valid = sg.resample(src_t, src_t * 2, np.array([-1.0, 0.0, 5.5, 10.0, 10.5, 12.0]), tail_s=1.0)
    assert out[2] == pytest.approx(11.0)
    assert list(valid) == [False, True, True, True, True, False]


# ---- envelopes ---------------------------------------------------------------------------------


def test_event_timing_separates_source_time_from_response():
    tm = sg.event_timing(10.0, attack_s=0.1, hold_s=0.05, release_s=0.2, peak_offset_s=-0.05)
    assert (tm.start, tm.peak, tm.end) == pytest.approx((9.85, 9.95, 10.2))


@pytest.mark.parametrize("shape, quarter", [("linear", 0.25), ("smooth", 0.15625)])
def test_single_event_envelope_known_values(shape, quarter):
    tm = sg.event_timing(10.0, 0.4, 0.0, 0.8, 0.0)
    out = sg.render_events(T100, [tm], [1.0], [0.4], [10.0], [0.8], shape, "max")
    at = lambda s: out[int(round(s * 100))]
    assert at(9.6) == 0.0 and at(10.0) == 1.0 and at(10.8) == 0.0
    assert at(9.7) == pytest.approx(quarter) and at(9.8) == pytest.approx(0.5)
    assert at(10.4) == pytest.approx(0.5), "halfway through the release"
    assert out.min() >= 0.0 and out.max() <= 1.0


def test_zero_attack_is_an_instant_step_and_strength_scales():
    tm = sg.event_timing(5.0, 0.0, 0.0, 0.5, 0.0)
    out = sg.render_events(T100, [tm], [0.6], [0.0], [5.0], [0.5], "linear", "max")
    assert out[499] == 0.0 and out[500] == pytest.approx(0.6) and out[525] == pytest.approx(0.3)


def test_overlapping_events_max_versus_sum():
    tms = [sg.event_timing(t, 0.0, 0.0, 1.0, 0.0) for t in (5.0, 5.5)]
    args = (T100, tms, [0.6, 0.6], [0.0, 0.0], [5.0, 5.5], [1.0, 1.0], "linear")
    mx = sg.render_events(*args, "max")
    sm = sg.render_events(*args, "sum")
    assert mx[550] == pytest.approx(0.6) and sm[550] == pytest.approx(0.6 * 0.5 + 0.6)
    many = sg.render_events(T100, [tms[0]] * 5, [0.6] * 5, [0.0] * 5, [5.0] * 5, [1.0] * 5, "linear", "sum")
    assert many.max() == 1.0, "sums are clipped to 1"


def test_passage_gate_rises_holds_and_releases():
    tm = sg.passage_timing(5.0, 8.0, attack_s=1.0, release_s=2.0)
    assert (tm.start, tm.peak, tm.end) == (5.0, 6.0, 10.0)
    out = sg.render_events(T100, [tm], [1.0], [1.0], [8.0], [2.0], "linear", "max")
    assert [out[int(s * 100)] for s in (5, 5.5, 6, 8, 9, 10)] == pytest.approx([0, 0.5, 1, 1, 0.5, 0])


def test_short_passage_falls_from_the_level_it_reached():
    tm = sg.passage_timing(5.0, 5.5, attack_s=1.0, release_s=2.0)
    assert tm.peak == 5.5
    out = sg.render_events(T100, [tm], [1.0], [1.0], [5.5], [2.0], "linear", "max")
    assert out[550] == pytest.approx(0.5) and int(np.argmax(out)) == 550, "no rise after the passage ends"
    assert out[650] == pytest.approx(0.5 * 0.5)


def test_events_before_zero_or_after_the_end_are_cut_cleanly():
    tm = sg.event_timing(0.1, 0.5, 0.0, 0.5, 0.0)
    out = sg.render_events(T100, [tm], [1.0], [0.5], [0.1], [0.5], "linear", "max")
    assert out[0] == pytest.approx(0.8) and out[10] == 1.0
    tm = sg.event_timing(19.9, 0.0, 0.0, 1.0, 0.0)
    out = sg.render_events(T100, [tm], [1.0], [0.0], [19.9], [1.0], "linear", "max")
    assert out[-1] == pytest.approx(0.9)


# ---- follower ----------------------------------------------------------------------------------


def test_attack_and_release_time_constants():
    x = np.concatenate([np.zeros(100), np.ones(300), np.zeros(300)])
    y = sg.follower(x, 0.01, attack_s=0.2, release_s=0.5)
    # The first update happens on the step sample itself, so n updates end at index step + n - 1.
    assert y[100 + 20 - 1] == pytest.approx(1 - np.exp(-1), abs=1e-9), "63% of the rise after attack_s"
    assert y[400 + 50 - 1] == pytest.approx(y[399] * np.exp(-1), abs=1e-9), "37% left after release_s"
    assert y[0] == 0.0 and np.all(np.diff(y[100:400]) >= 0)


def test_follower_starts_at_the_first_value_and_zero_times_are_identity():
    x = np.array([0.7, 0.2, 0.9])
    assert sg.follower(x, 0.01, 0.0, 0.0).tolist() == x.tolist()
    assert sg.follower(x, 0.01, 1.0, 1.0)[0] == 0.7


# ---- combine -----------------------------------------------------------------------------------


def test_weighted_mean_renormalises_over_valid_inputs():
    a, b = np.array([1.0, 1.0, 0.0]), np.array([0.5, 0.5, 0.5])
    va, vb = np.array([True, True, False]), np.array([True, False, False])
    out, valid = sg.combine([a, b], [va, vb], [3.0, 1.0], "weighted_mean", rest=0.2)
    assert out[0] == pytest.approx(0.875) and out[1] == pytest.approx(1.0)
    assert out[2] == 0.2 and valid.tolist() == [True, True, False]


def test_max_and_sum_combine():
    a, b = np.array([0.4, 0.9]), np.array([0.8, 0.5])
    v = np.ones(2, bool)
    assert sg.combine([a, b], [v, v], [1.0, 0.5], "max", 0.0)[0].tolist() == pytest.approx([0.4, 0.9])
    assert sg.combine([a, b], [v, v], [1.0, 1.0], "sum", 0.0)[0].tolist() == pytest.approx([1.0, 1.0])
    assert sg.combine([a, b], [v, v], [0.5, 0.5], "sum", 0.0)[0].tolist() == pytest.approx([0.6, 0.7])


def test_invalid_input_never_counts_as_zero_in_max():
    out, _ = sg.combine([np.array([0.3]), np.array([0.0])], [np.array([True]), np.array([False])], [1, 1], "weighted_mean", 0)
    assert out[0] == pytest.approx(0.3), "an invalid input must not pull the mean down"


# ---- onset rate --------------------------------------------------------------------------------


def test_onset_rate_counts_per_second_and_handles_edges():
    onsets = np.arange(0, 20, 0.5)  # 2 per second
    rate = sg.onset_rate(T100, onsets, 2.0, 20.0)
    assert rate[1000] == pytest.approx(2.0) and rate[0] == pytest.approx(2.0), "clipped window at t=0"


def test_onset_rate_alignment():
    onsets = np.arange(10, 20, 0.25)  # nothing before 10 s, 4/s after
    centered = sg.onset_rate(T100, onsets, 2.0, 20.0, "centered")
    trailing = sg.onset_rate(T100, onsets, 2.0, 20.0, "trailing")
    assert centered[950] > 0 and trailing[1000] == 0.0 and trailing[1200] == pytest.approx(4.0)
