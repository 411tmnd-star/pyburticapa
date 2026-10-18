"""Checks for a written motion timeline: sources, numbers, constraints, causes and reproducibility."""

from __future__ import annotations

from pathlib import Path

import numpy as np

from audiolab.interpretation.context import sha256_file
from audiolab.motion import schema as ms
from audiolab.motion.config import MotionConfig
from audiolab.motion.engine import build_model, mapping_content_sha256, plan_timeline
from audiolab.motion.vocabulary import SCENE_STATES
from audiolab.visual_mapping.validate import check_numerical as check_mapping_numerical
from audiolab.visual_mapping.validate import check_sources as check_mapping_sources
from audiolab.visual_mapping.validate import load_arrays as load_mapping_arrays
from audiolab.visual_mapping.validate import load_mapping


def load_timeline(path: str | Path) -> ms.MotionTimeline:
    return ms.MotionTimeline.model_validate_json(Path(path).read_text(encoding="utf-8"))


def load_arrays(model: ms.MotionTimeline, json_path: str | Path) -> dict[str, np.ndarray]:
    with np.load(Path(json_path).parent / model.numerical.file) as f:
        return {k: f[k] for k in f.files}


def check_sources(model: ms.MotionTimeline, json_path: str | Path) -> list[str]:
    """Is the plan still the plan of these inputs? Reports stale or mismatched sources."""
    base = Path(json_path).parent
    src = model.sources
    mapping_path = base / src.mapping_path
    if not mapping_path.exists():
        return [f"visual mapping not found at {src.mapping_path}"]
    problems = []
    mapping = load_mapping(mapping_path)
    if sha256_file(mapping_path) != src.mapping_file_sha256 and mapping_content_sha256(mapping) != src.mapping_content_sha256:
        problems.append("visual mapping has changed since this plan was made (stale)")
    if mapping.numerical.sha256 != src.mapping_numerical_sha256:
        problems.append("the mapping's numerical file has changed since this plan was made (stale)")
    if (mapping.profile.name, mapping.profile.version) != (src.profile_name, src.profile_version):
        problems.append("the mapping now uses a different profile or profile version")
    if mapping.sources.analysis.content_sha256 != src.analysis_content_sha256:
        problems.append("the analysis behind the mapping has changed (stale)")
    # The mapping must itself still match its own sources.
    problems += [f"mapping: {p}" for p in check_mapping_sources(mapping, mapping_path)]
    return problems


def check_numerical(model: ms.MotionTimeline, json_path: str | Path) -> list[str]:
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
        return problems + ["times missing or of the wrong length"]
    if np.max(np.abs(t - np.arange(tb.n_samples) / tb.rate_hz)) > 1e-9:
        problems.append("times are not on the declared grid k / rate_hz")
    mapping_path = base / model.sources.mapping_path
    if mapping_path.exists():
        mt = load_mapping_arrays(load_mapping(mapping_path), mapping_path)["times"]
        if len(mt) != len(t) or not np.array_equal(mt, t):
            problems.append("times differ from the visual mapping's grid")

    cons = {(c.track, c.property): c for c in model.constraints}
    for track in model.tracks:
        for p in track.properties:
            x = arrays.get(p.array_key)
            c = cons[(track.name, p.name)]
            if x is None or len(x) != tb.n_samples:
                problems.append(f"{track.name}.{p.name}: curve missing or misaligned")
                continue
            if not np.all(np.isfinite(x)) or x.min() < -1e-12 or x.max() > p.amplitude_max + 1e-9:
                problems.append(f"{track.name}.{p.name}: values outside [0, {p.amplitude_max}]")
            if p.max_rate_per_s:
                worst = np.max(np.abs(np.diff(x))) * tb.rate_hz if len(x) > 1 else 0.0
                if worst > p.max_rate_per_s * (1 + 1e-9) + 1e-9:
                    problems.append(f"{track.name}.{p.name}: changes at {worst:.3f}/s, over its limit {p.max_rate_per_s}/s")
            if c.n_clamped_samples < 0 or c.n_rate_limited_samples < 0:
                problems.append(f"{track.name}.{p.name}: negative constraint counts")

    # Scene states: the sampled index must agree with the spans.
    si = arrays.get("scene_state")
    if si is None or len(si) != tb.n_samples:
        problems.append("scene_state missing or misaligned")
    else:
        for s in model.states:
            sel = (t >= s.start_s - 1e-9) & (t < s.end_s - 1e-9)
            if sel.any() and not np.all(si[sel] == SCENE_STATES.index(s.state)):
                problems.append(f"{s.id}: scene_state samples disagree with the span ({s.state})")
        dwell = model.config.spec["scene"]["min_dwell_s"]
        for s, nxt in zip(model.states[:-1], model.states[1:]):
            if not nxt.forced and s.end_s - s.start_s < dwell.get(s.state, 0.0) - 2.0 / tb.rate_hz:  # a span cut short by the forced end-settle is exempt
                problems.append(f"{s.id}: lasted {s.end_s - s.start_s:.2f}s, under the {dwell[s.state]}s minimum dwell for {s.state}")
    return problems


def check_actions(model: ms.MotionTimeline, json_path: str | Path) -> list[str]:
    """Every action must trace to a real source, with the source time preserved."""
    from audiolab.interpretation.engine import load_interpretation
    from audiolab.schema import SongAnalysis

    base = Path(json_path).parent
    mapping_path = base / model.sources.mapping_path
    if not mapping_path.exists():
        return []
    mapping = load_mapping(mapping_path)
    marr = load_mapping_arrays(mapping, mapping_path)
    analysis = SongAnalysis.model_validate_json((base / model.sources.analysis_path).read_text(encoding="utf-8"))
    event_time = {e.id: e.time_s for e in analysis.events}
    interp_time = {}
    if model.sources.interpretation_path:
        interp = load_interpretation(base / model.sources.interpretation_path)
        interp_time = {i.id: i.start_s for i in interp.interpretations}
    n_rows = mapping.responses.count
    rows = {c: marr[f"resp__{c}"] for c in mapping.responses.columns}
    rules = {r["id"]: r for r in model.config.spec["rules"]}
    ids = set(event_time) | set(interp_time)

    problems = []
    for a in model.actions:
        rule = rules.get(a.rule_id)
        if rule is None:
            problems.append(f"{a.id}: rule {a.rule_id} is not in the recorded configuration")
            continue
        if a.priority != rule["priority"] or a.primitive != rule["primitive"] or (a.track, a.property) != (rule["track"], rule["property"]):
            problems.append(f"{a.id}: does not match its rule's track/property/primitive/priority")
        for sid in a.causes.source_ids + a.causes.supporting_ids:
            if sid not in ids:
                problems.append(f"{a.id}: cause {sid} does not exist in the analysis or interpretation")
        for row in a.causes.response_rows:
            if not (0 <= row < n_rows):
                problems.append(f"{a.id}: response row {row} is out of range")
                continue
            if a.causes.kind == "mapping_response":
                if rows["source_id"][row] != a.causes.source_ids[0] or rows["channel"][row] != a.causes.channel:
                    problems.append(f"{a.id}: response row {row} does not match its recorded source")
                if a.source_time_s != float(rows["source_time"][row]):
                    problems.append(f"{a.id}: source time {a.source_time_s} differs from the mapping's {float(rows['source_time'][row])}")
                table = event_time if rows["source_kind"][row] == "analysis_event" else interp_time
                if table.get(a.causes.source_ids[0]) != a.source_time_s:
                    problems.append(f"{a.id}: source time differs from the source artifact")
        if a.kind == "event" and a.time_basis == "event" and a.causes.kind == "channel_peak" and a.causes.source_ids:
            times = [event_time.get(s, interp_time.get(s)) for s in a.causes.source_ids]
            if a.source_time_s not in times:
                problems.append(f"{a.id}: source time {a.source_time_s} is not the time of any of its source events")
        if a.kind == "event":
            if a.policy == "anticipatory":
                where = (a.source_time_s + rule["peak_offset_s"], a.peak_s - rule["anticipation_s"])
                ok = abs(a.peak_s - where[0]) < 1e-6 and abs(a.start_s - where[1]) < 1e-6
            else:
                ok = abs(a.start_s - a.source_time_s) < 1e-6 and abs(a.peak_s - (a.start_s + rule["attack_s"])) < 1e-6
            if not ok:
                problems.append(f"{a.id}: start/peak are not where its {a.policy} timing policy puts them")
            if abs((a.end_s - a.settle_s) - rule["release_s"]) > 1e-6 or abs((a.settle_s - a.peak_s) - rule["hold_s"]) > 1e-6:
                problems.append(f"{a.id}: hold/release do not match its rule")
        if a.amplitude > mapping_limit(model, a) + 1e-9 and not a.clamped:
            problems.append(f"{a.id}: amplitude over the property maximum but not flagged clamped")
    return problems[:30]


def mapping_limit(model: ms.MotionTimeline, a: ms.Action) -> float:
    for t in model.tracks:
        if t.name == a.track:
            for p in t.properties:
                if p.name == a.property:
                    return p.amplitude_max
    return 1.0


def validate_timeline(json_path: str | Path) -> list[str]:
    model = load_timeline(json_path)
    return check_sources(model, json_path) + check_numerical(model, json_path) + check_actions(model, json_path)


def check_reproducible(json_path: str | Path) -> list[str]:
    """Recompute from the recorded mapping and the embedded configuration; compare exactly."""
    json_path = Path(json_path)
    model = load_timeline(json_path)
    cfg = MotionConfig.model_validate(model.config.spec)
    result = plan_timeline(json_path.parent / model.sources.mapping_path, cfg, model.config.file,
                           model.config.file_sha256, [dict(o) for o in model.config.overrides])
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
        problems.append(f"recomputed description differs in: {sorted(k for k in left if left[k] != right[k])}")
    return problems
