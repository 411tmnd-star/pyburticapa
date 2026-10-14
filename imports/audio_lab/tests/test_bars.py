import numpy as np
import pytest
import soundfile as sf

from audiolab.bars import build_bars, downbeat_hint
from audiolab.clicks import render_click_track
from audiolab.config import NoveltyConfig, load_config
from audiolab.novelty import compute_novelty
from audiolab.songs import SongSettings, load_song_settings, save_song_settings

BEATS = np.arange(0, 12) * 0.5  # 12 beats, 120 BPM


def test_four_four_numbering():
    grid = build_bars(BEATS, beats_per_bar=4, downbeat_offset=0)
    assert list(grid.beat_in_bar[:6]) == [1, 2, 3, 4, 1, 2]
    assert list(grid.bar_index) == [0] * 4 + [1] * 4 + [2] * 4
    assert list(grid.downbeat_times) == [0.0, 2.0, 4.0]


def test_offset_makes_a_pickup_before_beat_one():
    grid = build_bars(BEATS, beats_per_bar=4, downbeat_offset=2)
    assert list(grid.beat_in_bar[:6]) == [3, 4, 1, 2, 3, 4]
    assert list(grid.bar_index[:6]) == [-1, -1, 0, 0, 0, 0]
    assert list(grid.downbeat_times) == [1.0, 3.0, 5.0]


def test_meter_is_configurable():
    grid = build_bars(BEATS, beats_per_bar=3, downbeat_offset=1)
    assert list(grid.beat_in_bar[:7]) == [3, 1, 2, 3, 1, 2, 3]
    assert grid.is_downbeat.sum() == 4


def test_bar_spans_end_at_next_downbeat_and_song_end():
    grid = build_bars(BEATS, beats_per_bar=4, downbeat_offset=0)
    bars = grid.bars(duration=6.0)
    assert bars == [
        {"index": 0, "start": 0.0, "end": 2.0},
        {"index": 1, "start": 2.0, "end": 4.0},
        {"index": 2, "start": 4.0, "end": 6.0},
    ]


def test_invalid_meter_rejected():
    with pytest.raises(ValueError):
        build_bars(BEATS, beats_per_bar=0)


def test_hint_picks_the_strongest_beat_phase():
    sr, hop = 100, 10  # 10 frames per second
    env = np.zeros(200)
    beat_times = np.arange(0, 19, 0.5)
    frames = np.round(beat_times * sr / hop).astype(int)
    env[frames] = 1.0
    env[frames[3::4]] = 3.0  # every 4th beat starting at index 3 is strongest
    hint = downbeat_hint(env, beat_times, sr, hop, 4)
    assert hint["suggested_offset"] == 3
    assert hint["scores"][3] == max(hint["scores"])


def test_settings_roundtrip_and_defaults(tmp_path):
    path = tmp_path / "songs.yaml"
    assert load_song_settings(path, "a") == SongSettings()  # file missing
    save_song_settings(path, "a", SongSettings(beats_per_bar=3, downbeat_offset=2))
    save_song_settings(path, "b", SongSettings(downbeat_offset=1))
    assert load_song_settings(path, "a") == SongSettings(3, 2)
    assert load_song_settings(path, "b") == SongSettings(4, 1)
    assert load_song_settings(path, "missing") == SongSettings()
    assert load_song_settings(path, "missing", SongSettings(beats_per_bar=6)).beats_per_bar == 6


def test_unknown_setting_key_raises(tmp_path):
    path = tmp_path / "songs.yaml"
    path.write_text("a:\n  nope: 1\n", encoding="utf-8")
    with pytest.raises(TypeError):
        load_song_settings(path, "a")


def test_accented_click_is_louder_than_normal(tmp_path):
    sr = 22050
    y = np.zeros(sr * 2, dtype=np.float32)
    beats = np.array([0.25, 0.75, 1.25, 1.75])
    mask = np.array([True, False, False, True])
    data, _ = sf.read(render_click_track(y, sr, beats, tmp_path / "c.wav", accent_mask=mask))
    peaks = [np.max(np.abs(data[int(t * sr) : int(t * sr) + 1500, 1])) for t in beats]
    assert peaks[0] > 1.5 * peaks[1] and peaks[3] > 1.5 * peaks[2]


def test_novelty_peaks_at_a_change_in_character():
    # 40 s: a low steady tone, then a higher noisy one, switching at 20 s. One beat per 0.5 s.
    sr, hop = 22050, 512
    rng = np.random.default_rng(0)
    t = np.arange(20 * sr) / sr
    a = 0.3 * np.sin(2 * np.pi * 220 * t)
    b = 0.3 * np.sin(2 * np.pi * 1760 * t) + 0.1 * rng.standard_normal(len(t))
    y = np.concatenate([a, b]).astype(np.float32)
    beats = np.arange(0.5, 39.5, 0.5)

    import librosa

    S = np.abs(librosa.stft(y, n_fft=2048, hop_length=hop))
    rms = librosa.feature.rms(S=S, frame_length=2048, hop_length=hop)[0]
    features = {
        "rms_db": librosa.amplitude_to_db(rms, ref=np.max(rms)),
        "centroid": librosa.feature.spectral_centroid(S=S, sr=sr)[0],
    }
    nov = compute_novelty(y, sr, features, beats, hop, NoveltyConfig(kernel_beats=16))

    assert len(nov) == len(beats) and nov.min() >= 0 and abs(nov.max() - 1.0) < 1e-9
    assert abs(beats[int(np.argmax(nov))] - 20.0) <= 1.0
    far = np.abs(beats - 20.0) > 6.0
    assert nov[far].max() < 0.3  # nothing happens away from the switch


def test_default_yaml_has_new_sections():
    from pathlib import Path

    cfg = load_config(Path(__file__).resolve().parents[1] / "configs" / "default.yaml")
    assert cfg.bars.beats_per_bar == 4 and cfg.novelty.kernel_beats == 16
