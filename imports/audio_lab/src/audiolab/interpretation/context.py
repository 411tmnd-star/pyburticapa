"""Read-only access to a song_analysis.json and the curves file it references.

Everything the interpretation rules know about a song comes through here. The audio file is never
opened, the analysis is validated with the analyzer's own schema, and the curves file is checked
against the hash the analysis recorded, so a rule can't silently run on mismatched data.

Measurements of continuous curves are windowed means taken in the power domain: a dB curve is
converted to power, averaged, and converted back. A mean of dB values would let a few very quiet
frames drag a window down, which is not how loudness is perceived.
"""

from __future__ import annotations

import hashlib
import json
from dataclasses import dataclass
from pathlib import Path

import numpy as np

from audiolab.interpretation.schema import CurveRef, Window
from audiolab.schema import BeatEvent, NoveltyPeakEvent, OnsetEvent, SongAnalysis


class IntegrityError(ValueError):
    """The analysis and its curves file do not match, or the curves are inconsistent."""


def sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for chunk in iter(lambda: f.read(1 << 20), b""):
            h.update(chunk)
    return h.hexdigest()


def analysis_content_sha256(analysis: SongAnalysis) -> str:
    """Hash of the analysis ignoring created_at, so a re-export of identical results matches."""
    data = analysis.model_dump(mode="json")
    data["provenance"].pop("created_at", None)
    blob = json.dumps(data, sort_keys=True, separators=(",", ":"))
    return hashlib.sha256(blob.encode("utf-8")).hexdigest()


@dataclass(frozen=True)
class WindowStat:
    """A summary of one curve (or the onset events) over one window."""

    feature: str
    value: float
    window: Window  # the window actually used, clipped to the audio
    frame_start: int  # curve frames [frame_start, frame_end); equal for event-based stats
    frame_end: int
    event_ids: tuple[str, ...] = ()

    def curve_ref(self, file: str) -> CurveRef | None:
        if self.event_ids or self.feature == "onset_rate":
            return None
        return CurveRef(
            file=file, key=self.feature, frame_start=self.frame_start, frame_end=self.frame_end
        )


class AnalysisContext:
    def __init__(self, analysis_path: str | Path):
        self.path = Path(analysis_path)
        self.file_sha256 = sha256_file(self.path)
        self.analysis = SongAnalysis.model_validate_json(self.path.read_text(encoding="utf-8"))
        a = self.analysis

        self.curves_path = self.path.parent / a.curves.file
        if not self.curves_path.exists():
            raise IntegrityError(f"curves file not found: {self.curves_path}")
        actual = sha256_file(self.curves_path)
        if actual != a.curves.sha256:
            raise IntegrityError(
                f"{a.curves.file} does not match the hash recorded in {self.path.name}; "
                "re-run the analysis"
            )
        self._npz = np.load(self.curves_path)
        self._declared = {c.key for c in a.curves.curves}
        self._cache: dict = {}

        self.duration = a.source.duration_s
        self.frame_rate = a.time_base.frame_rate_hz
        self.n_frames = a.time_base.n_frames
        self.times = self.curve("times") if self.has_curve("times") else np.arange(self.n_frames) / self.frame_rate
        if len(self.times) != self.n_frames:
            raise IntegrityError("times curve length differs from time_base.n_frames")
        if np.max(np.abs(self.times - np.arange(self.n_frames) / self.frame_rate)) > 1e-6:
            raise IntegrityError("times curve is not on the uniform frame grid the analysis declares")

        self.beats: list[BeatEvent] = [e for e in a.events if e.type == "beat"]
        self.beat_times = np.array([b.time_s for b in self.beats])
        self.onsets: list[OnsetEvent] = [e for e in a.events if e.type == "onset"]
        self.onset_times = np.array([o.time_s for o in self.onsets])
        self.novelty_peaks: list[NoveltyPeakEvent] = [e for e in a.events if e.type == "novelty_peak"]

        gaps = np.diff(self.beat_times)
        self.beat_interval = float(np.median(gaps)) if len(gaps) else None

    # ---- availability -------------------------------------------------------------------------

    def has_curve(self, key: str) -> bool:
        return key in self._declared and key in self._npz.files

    def has_events(self, kind: str) -> bool:
        return {"beat": len(self.beats) >= 2}.get(kind, False)

    def has_analyzer(self, name: str) -> bool:
        return name in self.analysis.provenance.analyzers

    def curve(self, key: str) -> np.ndarray:
        if not self.has_curve(key):
            raise KeyError(f"curve {key!r} is not available in this analysis")
        if key not in self._cache:
            self._cache[key] = np.asarray(self._npz[key])
        return self._cache[key]

    # ---- windows ------------------------------------------------------------------------------

    def window_s(self, window_beats: int) -> float | None:
        return None if self.beat_interval is None else window_beats * self.beat_interval

    def frame_slice(self, start_s: float, end_s: float) -> tuple[int, int]:
        """Frames whose time lies in [start_s, end_s)."""
        i0 = int(np.ceil(start_s * self.frame_rate - 1e-9))
        i1 = int(np.ceil(end_s * self.frame_rate - 1e-9))
        return max(0, min(i0, self.n_frames)), max(0, min(i1, self.n_frames))

    def clip(self, start_s: float, end_s: float) -> Window:
        return Window(start_s=max(0.0, start_s), end_s=min(self.duration, end_s))

    def mean_power_db(self, key: str, start_s: float, end_s: float) -> WindowStat | None:
        w = self.clip(start_s, end_s)
        i0, i1 = self.frame_slice(w.start_s, w.end_s)
        if i1 <= i0:
            return None
        cache_key = ("mean", key, i0, i1)
        if cache_key not in self._cache:
            power = 10.0 ** (self.curve(key)[i0:i1] / 10.0)
            self._cache[cache_key] = float(10.0 * np.log10(np.mean(power) + 1e-12))
        return WindowStat(key, self._cache[cache_key], w, i0, i1)

    def mean_db(self, key: str, start_s: float, end_s: float) -> float | None:
        """Plain mean of the dB values in a window. Used to localise steps, not to report levels."""
        i0, i1 = self.frame_slice(*self._bounds(start_s, end_s))
        return float(np.mean(self.curve(key)[i0:i1])) if i1 > i0 else None

    def fraction_above_db(self, key: str, start_s: float, end_s: float, level_db: float) -> float | None:
        i0, i1 = self.frame_slice(*self._bounds(start_s, end_s))
        if i1 <= i0:
            return None
        return float(np.mean(self.curve(key)[i0:i1] >= level_db))

    def _bounds(self, start_s: float, end_s: float) -> tuple[float, float]:
        w = self.clip(start_s, end_s)
        return w.start_s, w.end_s

    def onset_rate(self, start_s: float, end_s: float) -> WindowStat | None:
        w = self.clip(start_s, end_s)
        length = w.end_s - w.start_s
        if length <= 0:
            return None
        inside = (self.onset_times >= w.start_s) & (self.onset_times < w.end_s)
        ids = tuple(o.id for o, keep in zip(self.onsets, inside) if keep)
        return WindowStat("onset_rate", len(ids) / length, w, 0, 0, ids)

    def smoothed_db(self, key: str, smooth_s: float) -> np.ndarray:
        """Moving average in the power domain, with edges averaged over the frames that exist."""
        cache_key = ("smooth", key, smooth_s)
        if cache_key not in self._cache:
            width = max(1, int(round(smooth_s * self.frame_rate)))
            power = 10.0 ** (self.curve(key) / 10.0)
            kernel = np.ones(width)
            num = np.convolve(power, kernel, mode="same")
            den = np.convolve(np.ones_like(power), kernel, mode="same")
            self._cache[cache_key] = 10.0 * np.log10(num / den + 1e-12)
        return self._cache[cache_key]

    def change_windows(
        self, beat_index: int, window_s: float, min_fraction: float
    ) -> tuple[Window, Window] | None:
        """The windows just before and just after a beat, or None if either is too truncated."""
        t = float(self.beat_times[beat_index])
        before = self.clip(t - window_s, t)
        after = self.clip(t, t + window_s)
        need = min_fraction * window_s
        if before.end_s - before.start_s < need or after.end_s - after.start_s < need:
            return None
        return before, after

    def nearest_beat(self, time_s: float) -> int | None:
        if len(self.beat_times) == 0:
            return None
        return int(np.argmin(np.abs(self.beat_times - time_s)))

    def peaks_near(self, time_s: float, tolerance_s: float) -> list[NoveltyPeakEvent]:
        return [p for p in self.novelty_peaks if abs(p.time_s - time_s) <= tolerance_s]
