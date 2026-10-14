"""Assemble song_analysis.json from the analyzer's outputs."""

from __future__ import annotations

import hashlib
import platform
import sys
from dataclasses import asdict
from datetime import datetime, timezone
from importlib import metadata
from pathlib import Path

import numpy as np

from audiolab import __version__
from audiolab.bars import BarGrid
from audiolab.clicks import beat_diagnostics
from audiolab.config import Config
from audiolab.novelty import PEAK_DISTANCE_BEATS, PEAK_HEIGHT, novelty_peaks
from audiolab.schema import (
    SCHEMA_VERSION,
    AnalyzerInfo,
    BarEvent,
    BeatEvent,
    CurveInfo,
    Curves,
    Diagnostics,
    EVENT_TYPE_ORDER,
    LoudSegmentEvent,
    NoveltyPeakEvent,
    OnsetEvent,
    Provenance,
    SongAnalysis,
    SongSettingsInfo,
    Source,
    Tempo,
    TimeBase,
)
from audiolab.songs import SongSettings

_LIBRARIES = ("numpy", "scipy", "librosa", "soundfile", "pydantic", "PyYAML", "matplotlib")

# What each array in analysis.npz is. Keys absent from a given file are skipped.
_CURVES = [
    ("times", "frame", "s", "Time of each frame."),
    ("rms", "frame", "amplitude", "Root-mean-square amplitude per frame."),
    ("rms_db", "frame", "dB", "RMS in dB relative to the loudest frame."),
    ("centroid", "frame", "Hz", "Spectral centroid."),
    ("flatness", "frame", "ratio", "Spectral flatness; near 1 is noise-like, near 0 is tonal."),
    ("onset_env", "frame", "arbitrary", "Onset strength envelope (librosa)."),
    ("band_bass_db", "frame", "dB", "Bass-band energy in dB relative to the loudest frame's total."),
    ("band_mid_db", "frame", "dB", "Mid-band energy in dB relative to the loudest frame's total."),
    ("band_high_db", "frame", "dB", "High-band energy in dB relative to the loudest frame's total."),
    ("band_edges_hz", "frame", "Hz", "[bass_max, mid_max] band edges used."),
    ("mel_db", "mel", "dB", "Mel spectrogram, rows x frames, 0 dB = loudest cell."),
    ("mel_freqs", "mel", "Hz", "Centre frequency of each spectrogram row."),
    ("beat_times", "beat", "s", "Estimated beat times."),
    ("novelty", "beat", "0..1", "Section novelty at each beat (1 = largest change in this song)."),
]


def _sha256(path: Path) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def _original_audio_info(path: Path) -> tuple[int | None, int | None]:
    try:
        import soundfile as sf

        info = sf.info(str(path))
        return int(info.samplerate), int(info.channels)
    except Exception:
        return None, None


def _versions() -> dict[str, str]:
    out = {}
    for name in _LIBRARIES:
        try:
            out[name] = metadata.version(name)
        except metadata.PackageNotFoundError:
            pass
    return out


def _analyzers(cfg: Config, settings: SongSettings, librosa_version: str) -> dict[str, AnalyzerInfo]:
    lib = f"librosa {librosa_version}"
    no_conf = "Not provided by the method, so confidence is null."
    return {
        "features": AnalyzerInfo(
            origin="measured", method="STFT-derived frame features", library=lib,
            params={
                "n_fft": cfg.features.n_fft, "hop_length": cfg.features.hop_length,
                "bass_max_hz": cfg.features.bass_max_hz, "mid_max_hz": cfg.features.mid_max_hz,
                "n_mels": cfg.features.n_mels,
            },
            output="Frame curves in the sidecar file (see curves).",
            confidence="Not applicable: these are measurements, not detections.",
        ),
        "beat_tracker": AnalyzerInfo(
            origin="estimated", method="librosa.beat.beat_track on the onset envelope", library=lib,
            params={"start_bpm": cfg.beats.start_bpm, "tightness": cfg.beats.tightness},
            output="tempo and beat events; beat events also carry bar position from bar_grid "
            "and novelty from novelty.",
            confidence=no_conf + " See diagnostics and each beat's onset_strength as evidence.",
        ),
        "onset_detector": AnalyzerInfo(
            origin="estimated", method="librosa.onset.onset_detect peak picking", library=lib,
            params={"delta": cfg.events.onset_delta, "min_gap_s": cfg.events.min_gap_s},
            output="onset events; strength is the onset envelope at the onset.",
            confidence=no_conf,
        ),
        "loud_segments": AnalyzerInfo(
            origin="measured", method="threshold on RMS dB with hysteresis, gap merging, minimum duration",
            params={
                "threshold_db": cfg.events.loud_threshold_db,
                "hysteresis_db": cfg.events.loud_hysteresis_db,
                "min_duration_s": cfg.events.loud_min_duration_s,
                "merge_gap_s": cfg.events.loud_merge_gap_s,
            },
            output="loud_segment events (dB is relative to the song's loudest frame).",
            confidence="Not applicable: a threshold rule, not a detection with uncertainty.",
        ),
        "bar_grid": AnalyzerInfo(
            origin="user_setting", method="beats grouped by beats_per_bar from downbeat_offset",
            params={"beats_per_bar": settings.beats_per_bar, "downbeat_offset": settings.downbeat_offset},
            output="bar events; bar fields on beat events.",
            confidence="Not detected: meter and downbeat are chosen by a person, ideally checked by ear.",
        ),
        "novelty": AnalyzerInfo(
            origin="estimated", method="Foote checkerboard-kernel novelty on beat-synchronous "
            "timbre, harmony and dynamics features", library=lib,
            params={
                "kernel_beats": cfg.novelty.kernel_beats,
                "peak_height": PEAK_HEIGHT,
                "peak_distance_beats": PEAK_DISTANCE_BEATS,
            },
            output="novelty value on each beat and novelty_peak events. Measures change only; "
            "it does not say what kind of section it is.",
            confidence=no_conf,
        ),
    }


def build_song_analysis(
    song_path: Path,
    cfg: Config,
    analysis: dict[str, np.ndarray],
    raw_events: list[dict],
    grid: BarGrid,
    settings: SongSettings,
    settings_origin: str,
    curves_path: Path,
) -> SongAnalysis:
    import librosa

    sr, hop = int(analysis["sample_rate"]), int(analysis["hop_length"])
    duration = float(analysis["duration"])
    beat_times = np.asarray(analysis["beat_times"])
    onset_env = np.asarray(analysis["onset_env"])
    novelty = np.asarray(analysis["novelty"]) if "novelty" in analysis else None

    beat_frames = np.clip(np.round(beat_times * sr / hop).astype(int), 0, len(onset_env) - 1)
    events = []
    for i, t in enumerate(beat_times):
        events.append(
            BeatEvent(
                id=f"beat:{i:04d}", time_s=float(t), source="beat_tracker",
                beat_in_bar=int(grid.beat_in_bar[i]), bar_index=int(grid.bar_index[i]),
                is_downbeat=bool(grid.is_downbeat[i]), onset_strength=float(onset_env[beat_frames[i]]),
                novelty=float(novelty[i]) if novelty is not None else None,
            )
        )
    for bar in grid.bars(duration):
        events.append(
            BarEvent(
                id=f"bar:{bar['index']}", time_s=bar["start"], end_s=bar["end"], index=bar["index"],
                beats_per_bar=grid.beats_per_bar, source="bar_grid",
            )
        )
    onsets = [e for e in raw_events if e["type"] == "onset"]
    for i, e in enumerate(onsets):
        events.append(
            OnsetEvent(id=f"onset:{i:04d}", time_s=e["time"], strength=e["strength"], source="onset_detector")
        )
    for i, e in enumerate(e for e in raw_events if e["type"] == "loud_segment"):
        events.append(
            LoudSegmentEvent(
                id=f"loud_segment:{i:03d}", time_s=e["start"], end_s=e["end"], peak_db=e["peak_db"],
                source="loud_segments",
            )
        )
    if novelty is not None:
        for i, idx in enumerate(novelty_peaks(novelty)):
            events.append(
                NoveltyPeakEvent(
                    id=f"novelty_peak:{i:03d}", time_s=float(beat_times[idx]),
                    value=float(novelty[idx]), source="novelty",
                )
            )
    events.sort(key=lambda e: (e.time_s, EVENT_TYPE_ORDER.index(e.type)))

    diag = beat_diagnostics(onset_env, beat_times, sr, hop)
    gaps = np.diff(beat_times)
    median_gap = float(np.median(gaps)) if len(gaps) else 0.0
    irregular = int(np.sum(np.abs(gaps - median_gap) > 0.2 * median_gap)) if len(gaps) else 0

    rate, channels = _original_audio_info(song_path)
    curve_infos = [
        CurveInfo(key=k, grid=g, unit=u, description=d) for k, g, u, d in _CURVES if k in analysis
    ]
    return SongAnalysis(
        schema_version=SCHEMA_VERSION,
        source=Source(
            file=song_path.name, sha256=_sha256(song_path), size_bytes=song_path.stat().st_size,
            duration_s=duration, original_sample_rate_hz=rate, original_channels=channels,
            analysis_sample_rate_hz=sr, analysis_channels=1 if cfg.audio.mono else 2,
        ),
        provenance=Provenance(
            created_at=datetime.now(timezone.utc).isoformat(timespec="seconds"),
            audiolab_version=__version__,
            python_version=platform.python_version(),
            libraries=_versions(),
            config=asdict(cfg),
            song_settings=SongSettingsInfo(
                beats_per_bar=settings.beats_per_bar, downbeat_offset=settings.downbeat_offset,
                origin=settings_origin,
            ),
            analyzers=_analyzers(cfg, settings, librosa.__version__),
        ),
        time_base=TimeBase(hop_length=hop, frame_rate_hz=sr / hop, n_frames=len(onset_env)),
        tempo=Tempo(bpm=float(analysis["tempo"]), source="beat_tracker"),
        diagnostics=Diagnostics(
            beat_onset_ratio=diag["beat_onset_ratio"],
            phase_peak_offset=diag["phase_peak_offset"],
            tempo_scores=diag["tempo_scores"],
            beat_interval_std_ms=float(np.std(gaps) * 1000) if len(gaps) else 0.0,
            irregular_beat_gaps=irregular,
        ),
        curves=Curves(file=curves_path.name, sha256=_sha256(curves_path), curves=curve_infos),
        events=events,
    )


def write_song_analysis(model: SongAnalysis, path: str | Path) -> None:
    Path(path).write_text(model.model_dump_json(indent=2), encoding="utf-8")
