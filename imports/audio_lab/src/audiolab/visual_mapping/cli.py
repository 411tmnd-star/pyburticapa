"""Handlers for `audiolab visual ...` and the visual-mapping branch of `audiolab validate`."""

from __future__ import annotations

import json
from pathlib import Path

from pydantic import ValidationError

from audiolab.interpretation.context import IntegrityError
from audiolab.visual_mapping import review
from audiolab.visual_mapping.engine import StaleInputError, map_song, output_paths, write_mapping
from audiolab.visual_mapping.profile import find_profile, load_profile
from audiolab.visual_mapping.validate import (
    check_reproducible,
    load_arrays,
    load_mapping,
    validate_mapping,
)


def add_parser(sub) -> None:
    vis = sub.add_parser("visual", help="Visual control channels from analysis + interpretation.")
    vsub = vis.add_subparsers(dest="visual_command", required=True)

    def songs(p):
        p.add_argument("analyses", nargs="+", help="Paths to song_analysis.json files.")
        p.add_argument("--profile", action="append", help="Profile name or YAML path (repeatable). Default: all.")
        p.add_argument("--profiles-dir", default="configs/visual_profiles")

    m = vsub.add_parser("map", help="Write visual_mapping.<profile>.json/.npz next to each analysis.")
    songs(m)
    m.add_argument("--rate", type=float, default=30.0, help="Output sample rate in Hz (default 30).")

    p = vsub.add_parser("plot", help="Write review plots for existing mappings.")
    songs(p)
    p.add_argument("--window", type=float, nargs=2, metavar=("START", "END"), help="Zoom window in seconds.")

    c = vsub.add_parser("compare", help="Compare profiles and write a markdown + JSON report.")
    songs(c)
    c.add_argument("--report", default="outputs/visual_review.md")

    cal = vsub.add_parser("calibrate", help="Compare current mappings with a frozen baseline snapshot.")
    cal.add_argument("analyses", nargs="+", help="Paths to song_analysis.json files.")
    cal.add_argument("--baseline-dir", default="visual_baseline_v1", help="Snapshot folder next to each analysis.")
    cal.add_argument("--report", default="outputs/visual_calibration.md")

    i = vsub.add_parser("inspect", help="Print channel ranges, peaks and fast rises of a mapping.")
    i.add_argument("mapping", help="Path to visual_mapping.<profile>.json")
    i.add_argument("--channel")
    i.add_argument("--top", type=int, default=6)

    k = vsub.add_parser("check", help="Validate mappings and confirm they recompute exactly.")
    k.add_argument("mappings", nargs="+")
    k.add_argument("--no-repro", action="store_true", help="Skip the recomputation.")

    r = vsub.add_parser("run", help="map + check + plot + compare for every profile.")
    songs(r)
    r.add_argument("--rate", type=float, default=30.0)
    r.add_argument("--report", default="outputs/visual_review.md")


def _profiles(args) -> list[Path]:
    if args.profile:
        return [find_profile(p, args.profiles_dir) for p in args.profile]
    return sorted(Path(args.profiles_dir).glob("*.yaml"))


def _names(args) -> list[str]:
    return [load_profile(p)[0].name for p in _profiles(args)]


def do_map(args) -> int:
    status = 0
    for analysis in args.analyses:
        for path in _profiles(args):
            profile, sha = load_profile(path)
            try:
                result = map_song(analysis, profile, args.rate, path.as_posix(), sha)
            except (IntegrityError, StaleInputError, ValidationError, OSError) as exc:
                print(f"FAILED {analysis} [{profile.name}]: {exc}")
                status = 1
                continue
            j, n = output_paths(analysis, profile.name)
            model = write_mapping(result, j, n)
            skipped = [r.id for r in model.rules if r.status == "skipped"]
            print(f"{j}  ({model.timebase.n_samples} samples, {model.responses.count} responses"
                  + (f", skipped {skipped}" if skipped else "") + ")")
            for ch in model.channels:
                s = ch.stats
                print(f"   {ch.name:<17} " + (f"mean {s.mean:.2f} p95 {s.p95:.2f} max {s.max:.2f} coverage {ch.coverage:.3f}"
                                             if s else f"unavailable: {ch.reason}"))
    return status


def do_plot(args) -> int:
    for analysis in args.analyses:
        song = review.load_song(analysis, _names(args))
        if not song.mappings:
            print(f"no mappings for {analysis}; run `audiolab visual map` first")
            return 1
        for p in review.write_plots(song, tuple(args.window) if args.window else None):
            print(p)
    return 0


def do_compare(args) -> int:
    songs = [review.load_song(a, _names(args)) for a in args.analyses]
    if not any(s.mappings for s in songs):
        print("no mappings found; run `audiolab visual map` first")
        return 1
    md, js = review.write_report(songs, Path(args.report))
    print(f"{md}\n{js}")
    return 0


def do_calibrate(args) -> int:
    from audiolab.visual_mapping import calibration

    md, js = calibration.write_report(args.analyses, Path(args.report), args.baseline_dir)
    print(f"{md}\n{js}")
    return 0


def do_inspect(args) -> int:
    model = load_mapping(args.mapping)
    for line in review.inspect(model, load_arrays(model, args.mapping), args.channel, args.top):
        print(line)
    return 0


def do_check(args) -> int:
    failed = 0
    for path in args.mappings:
        try:
            problems = validate_mapping(path)
            if not problems and not args.no_repro:
                problems = check_reproducible(path)
        except (ValidationError, ValueError, OSError) as exc:
            problems = [str(exc)]
        if problems:
            failed += 1
            print(f"FAILED {path}")
            for p in problems:
                print(f"   {p}")
        else:
            print(f"OK {path}" + ("" if args.no_repro else " (recomputed: identical)"))
    return 1 if failed else 0


def do_run(args) -> int:
    status = do_map(args)
    mappings = [str(output_paths(a, n)[0]) for a in args.analyses for n in _names(args)]
    args.mappings, args.no_repro = [m for m in mappings if Path(m).exists()], False
    status |= do_check(args)
    args.window = None
    status |= do_plot(args)
    status |= do_compare(args)
    return status


def run(args) -> int:
    return {
        "map": do_map, "plot": do_plot, "compare": do_compare, "calibrate": do_calibrate, "inspect": do_inspect,
        "check": do_check, "run": do_run,
    }[args.visual_command](args)


def validate_any(files: list[str]) -> int:
    """`audiolab validate`: visual mappings here, everything else via the interpretation handler."""
    from audiolab.interpretation.cli import validate_files

    failed = 0
    others = []
    for f in files:
        try:
            text = Path(f).read_text(encoding="utf-8")
            kind = json.loads(text).get("artifact") if text.lstrip().startswith("{") else None
        except (OSError, ValueError):
            kind = None
        if kind != "visual_mapping":
            others.append(f)
            continue
        try:
            problems = validate_mapping(f)
        except (ValidationError, ValueError, OSError) as exc:
            failed += 1
            print(f"INVALID {f}: {exc}")
            continue
        if problems:
            failed += 1
            label = "STALE" if any("stale" in p for p in problems) else "INVALID"
            print(f"{label} {f}: " + "; ".join(problems))
        else:
            model = load_mapping(f)
            avail = sum(c.status == "available" for c in model.channels)
            print(f"OK {f}: visual mapping schema {model.schema_version}, profile {model.profile.name}, "
                  f"{avail}/{len(model.channels)} channels, {model.timebase.n_samples} samples")
    if others:
        failed += validate_files(others)
    return 1 if failed else 0
