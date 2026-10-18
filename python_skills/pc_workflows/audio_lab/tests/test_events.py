import numpy as np
import soundfile as sf

from audiolab.clicks import beat_diagnostics, render_click_track
from audiolab.config import EventConfig
from audiolab.events import detect_loud_segments

FPS = 10.0  # frames per second, for easy arithmetic


def _segments(levels_db, **kw):
    cfg = EventConfig(**kw)
    levels = np.asarray(levels_db, dtype=float)
    times = np.arange(len(levels)) / FPS
    return detect_loud_segments(levels, times, FPS, cfg)


def test_level_hovering_at_threshold_is_one_segment():
    # Dips to -22 stay above the -26 close level (-20 threshold, 6 dB hysteresis).
    levels = [-30] + [-19, -22, -19, -22, -19, -22] * 5 + [-40]
    segs = _segments(levels, loud_min_duration_s=0.0, loud_merge_gap_s=0.0)
    assert len(segs) == 1


def test_short_blip_is_dropped():
    levels = [-40] * 10 + [-10] * 2 + [-40] * 10  # 0.2 s blip
    assert _segments(levels, loud_min_duration_s=0.5) == []


def test_close_segments_merge_and_far_ones_do_not():
    levels = [-10] * 10 + [-40] * 3 + [-10] * 10 + [-40] * 20 + [-10] * 10
    segs = _segments(levels, loud_min_duration_s=0.5, loud_merge_gap_s=0.5)
    assert len(segs) == 2
    assert segs[0]["start"] == 0.0 and abs(segs[0]["end"] - 2.2) < 1e-9
    assert segs[0]["peak_db"] == -10


def test_segment_open_at_end_of_song_is_kept():
    segs = _segments([-40] * 5 + [-10] * 10, loud_min_duration_s=0.5)
    assert len(segs) == 1 and abs(segs[0]["end"] - 1.4) < 1e-9


def test_click_track_has_clicks_at_beat_times(tmp_path):
    sr = 22050
    y = np.zeros(sr * 2, dtype=np.float32)
    beats = np.array([0.5, 1.0, 1.5])
    path = render_click_track(y, sr, beats, tmp_path / "c.wav")
    data, file_sr = sf.read(path)
    assert file_sr == sr and data.shape == (len(y), 2)
    clicks = data[:, 1]
    for t in beats:
        i = int(round(t * sr))
        assert np.max(np.abs(clicks[i : i + 700])) > 0.05
    assert np.max(np.abs(clicks[: int(0.45 * sr)])) < 1e-6  # silent before the first beat


def test_diagnostics_flag_a_half_beat_shifted_grid():
    # Onset envelope with a peak every 10 frames.
    env = np.zeros(1000)
    env[::10] = 1.0
    sr, hop = 1000, 10  # 100 frames/s -> 10 frames = 0.1 s
    on_beat = np.arange(0, 9.9, 0.1)
    off_beat = on_beat + 0.05
    good = beat_diagnostics(env, on_beat, sr, hop)
    bad = beat_diagnostics(env, off_beat, sr, hop)
    assert good["beat_onset_ratio"] > 5 and abs(good["phase_peak_offset"]) < 0.06
    assert bad["beat_onset_ratio"] < good["beat_onset_ratio"]
    assert abs(abs(bad["phase_peak_offset"]) - 0.5) < 0.06
