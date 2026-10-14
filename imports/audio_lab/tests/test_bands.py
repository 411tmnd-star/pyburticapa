import librosa
import numpy as np

from audiolab.config import FeatureConfig
from audiolab.features import band_energies, compute_features, mel_spectrogram

SR = 22050
CFG = FeatureConfig()


def _tone(freq, seconds=2.0):
    t = np.arange(int(seconds * SR)) / SR
    return (0.5 * np.sin(2 * np.pi * freq * t)).astype(np.float32)


def _stft(y):
    return np.abs(librosa.stft(y, n_fft=CFG.n_fft, hop_length=CFG.hop_length))


def test_each_tone_lands_in_its_own_band():
    for freq, loud in ((60, "bass"), (700, "mid"), (5000, "high")):
        bands = band_energies(_stft(_tone(freq)), SR, CFG)
        mid_frame = len(bands["band_bass_db"]) // 2
        levels = {n: bands[f"band_{n}_db"][mid_frame] for n in ("bass", "mid", "high")}
        others = [v for n, v in levels.items() if n != loud]
        assert levels[loud] > max(others) + 25, (freq, levels)


def test_band_powers_add_up_to_total_power():
    rng = np.random.default_rng(1)
    S = _stft(rng.standard_normal(SR * 2).astype(np.float32) * 0.1)
    bands = band_energies(S, SR, CFG)
    total_db = 10 * np.log10((S**2).sum(axis=0) / (S**2).sum(axis=0).max())
    summed = 10 * np.log10(sum(10 ** (bands[f"band_{n}_db"] / 10) for n in ("bass", "mid", "high")))
    assert np.allclose(summed, total_db, atol=0.01)


def test_loudest_frame_is_about_zero_db():
    bands = band_energies(_stft(_tone(100)), SR, CFG)
    assert -0.5 < bands["band_bass_db"].max() <= 0.01


def test_band_follows_a_tone_that_changes_over_time():
    y = np.concatenate([_tone(60), _tone(5000)])
    f = compute_features(y, SR, CFG)
    t = f["times"]
    first, second = t < 1.8, t > 2.2
    assert f["band_bass_db"][first].mean() > f["band_high_db"][first].mean() + 25
    assert f["band_high_db"][second].mean() > f["band_bass_db"][second].mean() + 25


def test_custom_band_edges_move_the_split():
    S = _stft(_tone(300))
    narrow = band_energies(S, SR, FeatureConfig(bass_max_hz=100, mid_max_hz=1000))
    wide = band_energies(S, SR, FeatureConfig(bass_max_hz=400, mid_max_hz=1000))
    mid = len(narrow["band_bass_db"]) // 2
    assert narrow["band_mid_db"][mid] > narrow["band_bass_db"][mid] + 20
    assert wide["band_bass_db"][mid] > wide["band_mid_db"][mid] + 20
    assert list(wide["band_edges_hz"]) == [400, 1000]


def test_spectrogram_shape_matches_frames_and_peaks_at_the_tone():
    f = compute_features(_tone(1000), SR, CFG)
    mel_db, freqs = f["mel_db"], f["mel_freqs"]
    assert mel_db.shape == (CFG.n_mels, len(f["times"])) and len(freqs) == CFG.n_mels
    assert mel_db.max() == 0.0 and mel_db.min() >= -80.0
    peak_row = int(np.argmax(mel_db[:, len(f["times"]) // 2]))
    assert abs(freqs[peak_row] - 1000) < 150


def test_mel_spectrogram_keys():
    out = mel_spectrogram(_stft(_tone(440)), SR, CFG)
    assert set(out) == {"mel_db", "mel_freqs"}
