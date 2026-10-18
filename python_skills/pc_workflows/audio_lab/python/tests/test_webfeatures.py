import numpy as np

from audiolab import webfeatures as wf

SR = wf.SAMPLE_RATE


def tone(freq, seconds, amp=0.5):
    t = np.arange(int(seconds * SR)) / SR
    return amp * np.sin(2 * np.pi * freq * t)


def test_bin_range_matches_the_web_rule():
    # Same values the TypeScript tests assert for binRange.
    assert wf.bin_range(60, 150, 44100, 4096) == (5, 14)
    assert wf.bin_range(20, 150, 44100, 4096) == (1, 14)
    assert wf.bin_range(2000, 10000, 44100, 2048) == (92, 465)


def test_frame_count_and_channels():
    r = wf.analyser_readings(tone(100, 2.0))
    n = {len(v) for v in r.values()}
    assert len(n) == 1
    assert n.pop() == 1 + (2 * SR) // wf.HOP
    assert set(r) == set(wf.CHANNELS)


def test_a_bass_tone_lands_in_punch_and_low_not_in_high():
    r = wf.analyser_readings(tone(100, 2.0))
    k = len(r["punchDb"]) - 5
    assert r["punchDb"][k] > r["highDb"][k] + 40
    assert r["lowDb"][k] > r["highDb"][k] + 40


def test_a_sub_tone_is_in_low_but_not_punch():
    r = wf.analyser_readings(tone(30, 2.0))
    k = len(r["punchDb"]) - 5
    assert r["lowDb"][k] > r["punchDb"][k] + 15


def test_trailing_window_delays_a_hit_and_flux_marks_it():
    y = np.zeros(SR * 3)
    hit = 2 * SR  # a click-like burst of 100 Hz at t = 2 s
    y[hit : hit + 2048] = tone(100, 2048 / SR)
    r = wf.analyser_readings(y)
    t = np.arange(len(r["flux"])) * wf.HOP / SR
    # Nothing is visible before the hit enters the window; the first reading after it is the flux peak.
    assert r["punchDb"][t < 1.99].max() < -100
    peak = t[np.argmax(r["flux"])]
    assert 2.0 <= peak <= 2.1  # within the window length plus smoothing
    assert r["flux"][t < 1.99].max() < 1e-9


def test_deterministic():
    y = tone(80, 1.5) + tone(1000, 1.5, 0.1)
    a = wf.analyser_readings(y)
    b = wf.analyser_readings(y)
    assert all(np.array_equal(a[k], b[k]) for k in a)
