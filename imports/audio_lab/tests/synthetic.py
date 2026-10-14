"""Build a consistent, valid song_analysis.json + curves file from made-up data.

The interpretation layer reads only these two files, so tests can describe a song by its curves
(functions of time in seconds) and event times, with no audio at all.
"""

from __future__ import annotations

import hashlib
from pathlib import Path

import numpy as np

from audiolab.schema import (
    EVENT_TYPE_ORDER,
    SCHEMA_VERSION,
    AnalyzerInfo,
    BeatEvent,
    CurveInfo,
    Curves,
    Diagnostics,
    NoveltyPeakEvent,
    OnsetEvent,
    Provenance,
    SongAnalysis,
    SongSettingsInfo,
    Source,
    Tempo,
    TimeBase,
)

SR, HOP = 22050, 512
FR = SR / HOP

ALL_ANALYZERS = ("beat_tracker", "onset_detector", "novelty", "bar_grid", "features")


def step(at: float, lo: float, hi: float):
    return lambda t: np.where(t < at, lo, hi)


def const(v: float):
    return lambda t: np.full_like(t, v)


def ramp(t0: float, t1: float, lo: float, hi: float):
    return lambda t: np.clip(lo + (hi - lo) * (t - t0) / (t1 - t0), min(lo, hi), max(lo, hi))


def regular(rate_by_time, duration: float) -> list[float]:
    """Onset times for a piecewise rate: rate_by_time = [(start, end, per_second), ...]."""
    out = []
    for start, end, rate in rate_by_time:
        out += list(np.arange(start, min(end, duration - 0.05), 1.0 / rate))
    return sorted(out)


DEFAULT_CURVES = {
    "rms_db": const(-10.0),
    "band_bass_db": const(-20.0),
    "band_mid_db": const(-20.0),
    "band_high_db": const(-30.0),
}


def make_analysis(
    tmp_path: Path,
    duration: float = 60.0,
    bpm: float = 120.0,
    curves: dict | None = None,
    onsets=(),
    novelty_peaks=(),
    analyzers=ALL_ANALYZERS,
    beats: bool = True,
    name: str = "synthetic",
) -> Path:
    """Write <tmp_path>/song_analysis.json and analysis.npz; return the JSON path.

    `curves` overrides DEFAULT_CURVES; a value of None removes that curve. Functions are called
    with the frame times in seconds.
    """
    n = int(duration * FR)
    times = np.arange(n) / FR
    spec = {**DEFAULT_CURVES, **(curves or {})}
    arrays = {"times": times}
    for key, value in spec.items():
        if value is not None:
            arrays[key] = np.asarray(value(times) if callable(value) else value, dtype=float)

    beat_times = np.arange(0.5, duration - 0.1, 60.0 / bpm) if beats else np.array([])
    events = []
    for i, t in enumerate(beat_times):
        events.append(
            BeatEvent(
                id=f"beat:{i:04d}", time_s=float(t), source="beat_tracker",
                beat_in_bar=i % 4 + 1, bar_index=i // 4, is_downbeat=i % 4 == 0, onset_strength=1.0,
            )
        )
    for i, t in enumerate(onsets):
        events.append(OnsetEvent(id=f"onset:{i:04d}", time_s=float(t), strength=1.0, source="onset_detector"))
    for i, t in enumerate(novelty_peaks):
        events.append(NoveltyPeakEvent(id=f"novelty_peak:{i:03d}", time_s=float(t), value=0.8, source="novelty"))
    events.sort(key=lambda e: (e.time_s, EVENT_TYPE_ORDER.index(e.type)))

    arrays["beat_times"] = beat_times
    npz = tmp_path / "analysis.npz"
    np.savez(npz, **arrays)

    def sha(path: Path) -> str:
        return hashlib.sha256(path.read_bytes()).hexdigest()

    info = AnalyzerInfo(origin="estimated", method="synthetic", output="synthetic", confidence="none")
    model = SongAnalysis(
        schema_version=SCHEMA_VERSION,
        source=Source(
            file=f"{name}.wav", sha256=hashlib.sha256(name.encode()).hexdigest(), size_bytes=1,
            duration_s=duration, analysis_sample_rate_hz=SR, analysis_channels=1,
        ),
        provenance=Provenance(
            created_at="2026-01-01T00:00:00+00:00", audiolab_version="test", python_version="3",
            libraries={}, config={},
            song_settings=SongSettingsInfo(beats_per_bar=4, downbeat_offset=0, origin="default"),
            analyzers={a: info for a in analyzers},
        ),
        time_base=TimeBase(hop_length=HOP, frame_rate_hz=FR, n_frames=n),
        tempo=Tempo(bpm=bpm, source="beat_tracker"),
        diagnostics=Diagnostics(
            beat_onset_ratio=1.0, phase_peak_offset=0.0, tempo_scores={}, beat_interval_std_ms=0.0,
            irregular_beat_gaps=0,
        ),
        curves=Curves(
            file=npz.name, sha256=sha(npz),
            curves=[CurveInfo(key=k, grid="frame", unit="dB", description="synthetic") for k in arrays],
        ),
        events=events,
    )
    path = tmp_path / "song_analysis.json"
    path.write_text(model.model_dump_json(indent=2), encoding="utf-8")
    return path
