"""Run the interpretation rules over one song_analysis.json and build the artifact."""

from __future__ import annotations

import os
import platform
from dataclasses import asdict
from datetime import datetime, timezone
from importlib import metadata
from pathlib import Path

from audiolab.interpretation.config import InterpretConfig
from audiolab.interpretation.context import (
    AnalysisContext,
    analysis_content_sha256,
    sha256_file,
)
from audiolab.interpretation.rules import RULES, Rule
from audiolab.interpretation.schema import (
    SCHEMA_VERSION,
    InterpretationProvenance,
    Method,
    SkippedRule,
    SongInterpretation,
    SourceAnalysis,
    VocabularyEntry,
    Window,
)
from audiolab.schema import SongAnalysis

METHOD_NAME = "audiolab.interpretation"
METHOD_VERSION = "0.1.0"
_LIBRARIES = ("numpy", "scipy", "pydantic")

GLOBAL_LIMITATIONS = [
    "v0.1 thresholds are provisional defaults, checked by eye on two songs only. They are not "
    "tuned for and may not hold on other genres or arrangements.",
    "No confidence is estimated. Judge each interpretation by its evidence and criteria.",
    "Changes are placed on beats of the analyzer's estimated beat grid and inherit its errors.",
    "Labels follow their operational definitions and nothing more: none of them says chorus, "
    "drop, verse, breakdown or mood.",
]


def _evaluated_range(ctx: AnalysisContext, cfg: InterpretConfig) -> Window | None:
    window_s = ctx.window_s(cfg.common.window_beats)
    if window_s is None:
        return None
    ok = [
        float(ctx.beat_times[k])
        for k in range(len(ctx.beats))
        if ctx.change_windows(k, window_s, cfg.common.min_window_fraction) is not None
    ]
    return Window(start_s=min(ok), end_s=max(ok)) if ok else None


def _link(interpretations, ctx: AnalysisContext, cfg: InterpretConfig) -> None:
    """Point each transition candidate at the other interpretations near it in time."""
    if ctx.beat_interval is None:
        return
    tol = cfg.common.link_tolerance_beats * ctx.beat_interval

    def near(other, t: float) -> bool:
        if other.label == "transition_candidate":
            return False
        inside = other.start_s <= t <= other.end_s
        at_edge = min(abs(other.start_s - t), abs(other.end_s - t)) <= tol
        return inside or at_edge

    for cand in (i for i in interpretations if i.label == "transition_candidate"):
        cand.related_ids = sorted(o.id for o in interpretations if near(o, cand.start_s))


def interpret(
    analysis_path: str | Path,
    cfg: InterpretConfig | None = None,
    output_path: str | Path | None = None,
    rules: list[Rule] | None = None,
) -> SongInterpretation:
    """Interpret one song from its analysis artifact. Reads only; never touches the analysis.

    `output_path` is only used to record the analysis path relative to where the result will live.
    """
    cfg = cfg or InterpretConfig()
    rules = RULES if rules is None else rules
    analysis_path = Path(analysis_path)
    ctx = AnalysisContext(analysis_path)
    a = ctx.analysis

    vocabulary, skipped, found = [], [], []
    for rule in rules:
        if not getattr(cfg, rule.label).enabled:
            continue
        vocabulary.append(
            VocabularyEntry(
                label=rule.label, kind=rule.kind, rule_version=rule.version,
                definition=rule.definition, requires=list(rule.requires),
            )
        )
        reason = rule.missing(ctx)
        if reason:
            skipped.append(SkippedRule(label=rule.label, reason=reason))
            continue
        result = rule.evaluate(ctx, cfg)
        if result.skipped_reason:
            skipped.append(SkippedRule(label=rule.label, reason=result.skipped_reason))
            continue
        found.extend(result.interpretations)

    found.sort(key=lambda i: (i.start_s, i.label))
    _link(found, ctx, cfg)

    base = Path(output_path).parent if output_path else analysis_path.parent
    window_s = ctx.window_s(cfg.common.window_beats)
    libs = {}
    for name in _LIBRARIES:
        try:
            libs[name] = metadata.version(name)
        except metadata.PackageNotFoundError:
            pass

    return SongInterpretation(
        schema_version=SCHEMA_VERSION,
        source_analysis=SourceAnalysis(
            path=os.path.relpath(analysis_path, base).replace("\\", "/"),
            file_sha256=ctx.file_sha256,
            content_sha256=analysis_content_sha256(a),
            schema_version=a.schema_version,
            audio_file=a.source.file,
            audio_sha256=a.source.sha256,
            curves_file=a.curves.file,
            curves_sha256=a.curves.sha256,
            duration_s=a.source.duration_s,
            frame_rate_hz=a.time_base.frame_rate_hz,
        ),
        method=Method(name=METHOD_NAME, version=METHOD_VERSION),
        provenance=InterpretationProvenance(
            created_at=datetime.now(timezone.utc).isoformat(timespec="seconds"),
            python_version=platform.python_version(),
            libraries=libs,
            config=asdict(cfg),
            window_s=float(window_s) if window_s is not None else 0.0,
            evaluated_range_s=_evaluated_range(ctx, cfg),
        ),
        vocabulary=vocabulary,
        skipped_rules=skipped,
        limitations=list(GLOBAL_LIMITATIONS),
        interpretations=found,
    )


def write_interpretation(model: SongInterpretation, path: str | Path) -> None:
    Path(path).write_text(model.model_dump_json(indent=2), encoding="utf-8")


def load_interpretation(path: str | Path) -> SongInterpretation:
    return SongInterpretation.model_validate_json(Path(path).read_text(encoding="utf-8"))


def check_source(model: SongInterpretation, interpretation_path: str | Path) -> str | None:
    """None if the interpretation still matches its analysis; otherwise what is wrong.

    Compares the analysis content hash (ignoring created_at), so re-exporting identical results
    does not make an interpretation look stale.
    """
    src = model.source_analysis
    path = (Path(interpretation_path).parent / src.path).resolve()
    if not path.exists():
        return f"source analysis not found at {src.path}"
    try:
        current = SongAnalysis.model_validate_json(path.read_text(encoding="utf-8"))
    except ValueError as exc:
        return f"source analysis no longer validates: {exc}"
    if analysis_content_sha256(current) != src.content_sha256:
        return "source analysis has changed since this interpretation was made (stale)"
    if current.source.sha256 != src.audio_sha256:
        return "source audio hash differs from the one this interpretation was made from"
    return None
