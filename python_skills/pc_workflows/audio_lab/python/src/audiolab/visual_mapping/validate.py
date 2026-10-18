"""Checks for a written visual mapping: schema, source hashes, time alignment and reproducibility."""

from __future__ import annotations

from pathlib import Path

import numpy as np

from audiolab.interpretation.context import analysis_content_sha256, sha256_file
from audiolab.interpretation.engine import load_interpretation
from audiolab.schema import SongAnalysis
from audiolab.visual_mapping.engine import build_model, interpretation_content_sha256, map_song
from audiolab.visual_mapping.profile import Profile
from audiolab.visual_mapping.schema import VisualMapping


def load_mapping(path: str | Path) -> VisualMapping:
    return VisualMapping.model_validate_json(Path(path).read_text(encoding="utf-8"))


def load_arrays(model: VisualMapping, json_path: str | Path) -> dict[str, np.ndarray]:
    with np.load(Path(json_path).parent / model.numerical.file) as f:
        return {k: f[k] for k in f.files}


def check_sources(model: VisualMapping, json_path: str | Path) -> list[str]:
    """Problems with the inputs the mapping claims to come from (stale or mismatched)."""
    base = Path(json_path).parent
    problems = []
    a = model.sources.analysis
    a_path = base / a.path
    if not a_path.exists():
        return [f"analysis not found at {a.path}"]
    analysis = SongAnalysis.model_validate_json(a_path.read_text(encoding="utf-8"))
    if analysis_content_sha256(analysis) != a.content_sha256:
        problems.append("analysis has changed since this mapping was made (stale)")
    if analysis.source.sha256 != a.audio_sha256:
        problems.append("analysis now describes different audio")
    if analysis.curves.sha256 != a.curves_sha256:
        problems.append("analysis now references a different curves file")
    curves = a_path.parent / analysis.curves.file
    if not curves.exists() or sha256_file(curves) != a.curves_sha256:
        problems.append("curves file is missing or does not match its recorded hash")
    i = model.sources.interpretation
    if i is not None:
        i_path = base / i.path
        if not i_path.exists():
            problems.append(f"interpretation not found at {i.path}")
        elif interpretation_content_sha256(load_interpretation(i_path)) != i.content_sha256:
            problems.append("interpretation has changed since this mapping was made (stale)")
    elif (a_path.parent / "song_interpretation.json").exists():
        problems.append("an interpretation now exists but this mapping was made without one (stale)")
    return problems


def check_numerical(model: VisualMapping, json_path: str | Path) -> list[str]:
    """Problems with the numerical file: hash, listing, time alignment, bounds, responses."""
    base = Path(json_path).parent
    npz = base / model.numerical.file
    if not npz.exists():
        return [f"numerical file not found: {model.numerical.file}"]
    problems = []
    if sha256_file(npz) != model.numerical.sha256:
        problems.append("numerical file does not match its recorded hash")
    arrays = load_arrays(model, json_path)
    listed = {a.key: a for a in model.numerical.arrays}
    if set(listed) != set(arrays):
        problems.append(f"arrays differ from the listing: {sorted(set(listed) ^ set(arrays))}")
    for key, info in listed.items():
        if key in arrays and (list(arrays[key].shape) != info.shape or str(arrays[key].dtype) != info.dtype):
            problems.append(f"array {key} has shape/dtype {arrays[key].shape}/{arrays[key].dtype}, listed {info.shape}/{info.dtype}")

    tb = model.timebase
    t = arrays.get("times")
    if t is None or len(t) != tb.n_samples:
        problems.append("times missing or of the wrong length")
        return problems
    if np.max(np.abs(t - np.arange(tb.n_samples) / tb.rate_hz)) > 1e-9:
        problems.append("times are not on the declared grid k / rate_hz")
    if t[-1] > tb.duration_s + 1e-9:
        problems.append("times run past the end of the audio")

    for c in model.channels:
        if c.status != "available":
            continue
        x, v = arrays.get(c.array_key), arrays.get(c.valid_key)
        if x is None or v is None or len(x) != tb.n_samples or len(v) != tb.n_samples:
            problems.append(f"channel {c.name}: arrays missing or misaligned")
            continue
        if not np.all(np.isfinite(x)) or x.min() < -1e-12 or x.max() > 1 + 1e-12:
            problems.append(f"channel {c.name}: values outside [0, 1] or not finite")
        if v.dtype != bool:
            problems.append(f"channel {c.name}: validity mask is not boolean")
    for r in model.rules:
        if r.status == "applied" and len(arrays.get(r.array_key, [])) != tb.n_samples:
            problems.append(f"rule {r.id}: signal missing or misaligned")

    cols = {c: arrays.get(f"resp__{c}") for c in model.responses.columns}
    if any(v is None or len(v) != model.responses.count for v in cols.values()):
        problems.append("response columns missing or of unequal length")
    elif model.responses.count:
        if np.any(cols["start"] > cols["peak"] + 1e-9) or np.any(cols["peak"] > cols["end"] + 1e-9):
            problems.append("some responses do not satisfy start <= peak <= end")
        problems += _check_response_sources(model, json_path, cols)
    return problems


def _check_response_sources(model, json_path, cols) -> list[str]:
    base = Path(json_path).parent
    analysis = SongAnalysis.model_validate_json((base / model.sources.analysis.path).read_text(encoding="utf-8"))
    event_time = {e.id: e.time_s for e in analysis.events}
    interp_time = {}
    if model.sources.interpretation is not None:
        interp = load_interpretation(base / model.sources.interpretation.path)
        interp_time = {i.id: i.start_s for i in interp.interpretations}
    problems = []
    for kind, sid, anchor, t in zip(cols["source_kind"], cols["source_id"], cols["anchor_id"], cols["source_time"]):
        table = event_time if kind == "analysis_event" else interp_time
        if sid not in table:
            problems.append(f"response source {sid} does not exist in its source artifact")
        elif table[sid] != t:
            problems.append(f"response source time for {sid} differs from the source ({t} vs {table[sid]})")
        if anchor and anchor not in event_time:
            problems.append(f"response anchor {anchor} is not an analysis event")
        if len(problems) > 10:
            break
    return problems


def validate_mapping(json_path: str | Path) -> list[str]:
    model = load_mapping(json_path)
    return check_sources(model, json_path) + check_numerical(model, json_path)


def check_reproducible(json_path: str | Path) -> list[str]:
    """Recompute from the recorded inputs and embedded profile; compare every array exactly."""
    json_path = Path(json_path)
    model = load_mapping(json_path)
    profile = Profile.model_validate(model.profile.spec)
    result = map_song(
        json_path.parent / model.sources.analysis.path, profile, model.timebase.rate_hz,
        model.profile.file, model.profile.file_sha256,
    )
    stored = load_arrays(model, json_path)
    problems = []
    if set(stored) != set(result.arrays):
        problems.append(f"recomputed arrays differ in keys: {sorted(set(stored) ^ set(result.arrays))}")
    for key in sorted(set(stored) & set(result.arrays)):
        a, b = stored[key], result.arrays[key]
        if a.dtype != b.dtype or a.shape != b.shape or not np.array_equal(a, b):
            problems.append(f"array {key} differs when recomputed")
    rebuilt = build_model(result, json_path, json_path.parent / model.numerical.file, model.numerical.sha256)
    left, right = model.model_dump(mode="json"), rebuilt.model_dump(mode="json")
    left["provenance"].pop("created_at")
    right["provenance"].pop("created_at")
    if left != right:
        diff = sorted(k for k in left if left[k] != right[k])
        problems.append(f"recomputed description differs in: {diff}")
    return problems
