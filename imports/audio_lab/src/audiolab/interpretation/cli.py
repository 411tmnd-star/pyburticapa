"""Command handlers for `audiolab interpret` and the interpretation side of `audiolab validate`."""

from __future__ import annotations

import json
from collections import Counter
from pathlib import Path

from pydantic import ValidationError

from audiolab.interpretation.checks import bass_burst_alignment
from audiolab.interpretation.config import load_interpret_config
from audiolab.interpretation.context import AnalysisContext, IntegrityError
from audiolab.interpretation.engine import (
    check_source,
    interpret,
    load_interpretation,
    write_interpretation,
)
from audiolab.interpretation.schema import SongInterpretation


def _describe(it) -> str:
    when = f"{it.start_s:7.2f}s" if it.kind == "change" else f"{it.start_s:7.2f}-{it.end_s:.2f}s"
    keys = ("rise_db", "drop_db", "direction", "ratio", "channels", "below_reference_db")
    detail = ", ".join(f"{k}={it.attributes[k]}" for k in keys if k in it.attributes)
    return f"  {when:>18}  {it.label:<24} {detail}"


def run_interpret(args) -> int:
    cfg = load_interpret_config(args.config if Path(args.config).exists() else None)
    status = 0
    for path in args.analyses:
        path = Path(path)
        out_path = path.parent / args.out_name
        try:
            model = interpret(path, cfg, output_path=out_path)
        except (IntegrityError, ValidationError, OSError) as exc:
            print(f"FAILED {path}: {exc}")
            status = 1
            continue
        write_interpretation(model, out_path)
        counts = Counter(i.label for i in model.interpretations)
        print(f"{path} -> {out_path}")
        print(f"  {len(model.interpretations)} interpretations: {dict(sorted(counts.items()))}")
        for s in model.skipped_rules:
            print(f"  skipped {s.label}: {s.reason}")
        for it in model.interpretations:
            print(_describe(it))
        if args.plot:
            from audiolab.interpretation.plot import plot_interpretation

            png = path.parent / "plots" / "interpretation.png"
            png.parent.mkdir(exist_ok=True)
            plot_interpretation(AnalysisContext(path), model, png)
            print(f"  plot: {png}")
        if args.verify:
            ctx = AnalysisContext(path)
            if ctx.has_curve("band_bass_db"):
                print("  bass bursts vs bar grid:", json.dumps(
                    {k: (round(v, 3) if isinstance(v, float) else v)
                     for k, v in bass_burst_alignment(ctx).items() if k != "burst_times_s"}
                ))
    return status


def validate_files(files: list[str]) -> int:
    from audiolab.schema import SongAnalysis

    failed = 0
    for f in files:
        try:
            text = Path(f).read_text(encoding="utf-8")
            kind = json.loads(text).get("artifact") if text.lstrip().startswith("{") else None
            if kind == "song_interpretation":
                m = SongInterpretation.model_validate_json(text)
                problem = check_source(m, f)
                if problem:
                    failed += 1
                    print(f"STALE {f}: {problem}")
                    continue
                counts = Counter(i.label for i in m.interpretations)
                print(f"OK {f}: interpretation schema {m.schema_version}, {len(m.interpretations)} interpretations {dict(sorted(counts.items()))}")
            else:
                m = SongAnalysis.model_validate_json(text)
                kinds: dict[str, int] = {}
                for ev in m.events:
                    kinds[ev.type] = kinds.get(ev.type, 0) + 1
                print(f"OK {f}: schema {m.schema_version}, {len(m.events)} events {kinds}")
        except (ValidationError, ValueError, OSError) as exc:
            failed += 1
            print(f"INVALID {f}: {exc}")
    return 1 if failed else 0
