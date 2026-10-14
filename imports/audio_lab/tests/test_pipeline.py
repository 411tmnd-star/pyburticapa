import numpy as np
import soundfile as sf

from audiolab import io
from audiolab.config import load_config
from audiolab.pipeline import analyze_song


def _click_track(path, bpm=120.0, seconds=8.0, sr=22050):
    """Write a synthetic click track: a short 1 kHz burst on every beat."""
    y = np.zeros(int(seconds * sr), dtype=np.float32)
    burst_len = int(0.03 * sr)
    t_burst = np.arange(burst_len) / sr
    burst = (np.sin(2 * np.pi * 1000 * t_burst) * np.exp(-t_burst * 150)).astype(np.float32)
    period = int(round(60.0 / bpm * sr))
    for start in range(0, len(y) - burst_len, period):
        y[start : start + burst_len] += burst
    sf.write(path, y, sr)
    return path


def test_analyze_song_writes_all_outputs(tmp_path):
    song = _click_track(tmp_path / "clicks.wav")
    out_root = tmp_path / "outputs"
    cfg = load_config(None)

    out_dir = analyze_song(song, cfg, out_root)

    assert out_dir == out_root / "clicks"
    assert (out_dir / "events.json").exists()
    assert (out_dir / "plots" / "overview.png").exists()
    assert (out_dir / "plots" / "spectral.png").exists()

    analysis = io.load_analysis(out_dir / "analysis.npz")
    for key in ["times", "rms", "rms_db", "centroid", "flatness", "onset_env", "beat_times", "tempo"]:
        assert key in analysis
    assert 100 <= float(analysis["tempo"]) <= 140  # 120 BPM click track, tolerant of octave/tempo drift

    events = io.load_events(out_dir / "events.json")
    onsets = [ev for ev in events if ev["type"] == "onset"]
    assert len(onsets) >= 6  # 8 s at 120 BPM ~ 16 clicks; allow for missed peaks

    gaps = np.diff([ev["time"] for ev in onsets])
    assert np.all(gaps >= cfg.events.min_gap_s)


def test_offset_previews_one_file_per_offset_and_accents_move(tmp_path):
    from audiolab.pipeline import render_offset_previews

    song = _click_track(tmp_path / "clicks.wav", seconds=12.0)
    out_root = tmp_path / "outputs"
    cfg = load_config(None)
    analyze_song(song, cfg, out_root)

    paths = render_offset_previews(song, cfg, out_root, beats_per_bar=4, seconds=8.0)
    assert [p.name for p in paths] == [f"offset_{k}.wav" for k in range(4)]

    import soundfile as sf

    loud_windows = []
    for p in paths:
        data, sr = sf.read(p)
        assert len(data) == 8 * sr
        clicks = data[:, 1]
        env = np.abs(clicks).reshape(-1, sr // 10).max(axis=1)  # 100 ms blocks
        loud_windows.append(frozenset(np.flatnonzero(env > 0.7 * env.max())))
    assert len(set(loud_windows)) == 4  # each offset accents a different set of beats
