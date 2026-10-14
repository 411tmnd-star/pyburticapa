"""Handlers for `audiolab motion ...` and the motion-timeline branch of `audiolab validate`."""

from __future__ import annotations

import json
from pathlib import Path

from pydantic import ValidationError

from audiolab.interpretation.context import IntegrityError
from audiolab.motion import review
from audiolab.motion.config import load_motion_config
from audiolab.motion.engine import output_paths, plan_timeline, write_timeline
from audiolab.motion.validate import check_reproducible, load_arrays, load_timeline, validate_timeline
from audiolab.visual_mapping.engine import StaleInputError

PROFILES = ("balanced", "bass_pulse", "cinematic")


def add_parser(sub) -> None:
    mo = sub.add_parser("motion", help="Motion timelines: a traceable plan for how abstract tracks move.")
    msub = mo.add_subparsers(dest="motion_command", required=True)

    def common(p):
        p.add_argument("analyses", nargs="+", help="Paths to song_analysis.json files.")
        p.add_argument("--profile", action="append", help="Visual profile to plan from (repeatable). Default: all that exist.")

    pl = msub.add_parser("plan", help="Write motion_timeline.<profile>.json/.npz in <song>/motion/.")
    common(pl)
    pl.add_argument("--config", default="configs/motion/default.yaml")
    pl.add_argument("--set", action="append", default=[], metavar="PATH=VALUE", help="Explicit, recorded override (repeatable).")

    pt = msub.add_parser("plot", help="Write review plots for existing timelines.")
    common(pt)
    pt.add_argument("--window", type=float, nargs=2, metavar=("START", "END"))

    i = msub.add_parser("inspect", help="Print states, action counts, constraints and actions around a time.")
    i.add_argument("timeline", help="Path to motion_timeline.<profile>.json")
    i.add_argument("--at", type=float, help="Show event actions around this time (s).")
    i.add_argument("--top", type=int, default=12)

    k = msub.add_parser("check", help="Validate timelines and confirm they recompute exactly.")
    k.add_argument("timelines", nargs="+")
    k.add_argument("--no-repro", action="store_true")

    r = msub.add_parser("run", help="plan + check + plot + report for every profile.")
    common(r)
    r.add_argument("--config", default="configs/motion/default.yaml")
    r.add_argument("--set", action="append", default=[], metavar="PATH=VALUE")
    r.add_argument("--report", default="outputs/motion_review.md")


def _mappings(args) -> list[Path]:
    out = []
    for a in args.analyses:
        for p in args.profile or PROFILES:
            m = Path(a).parent / "visual" / f"visual_mapping.{p}.json"
            if m.exists():
                out.append(m)
    return out


def do_plan(args) -> int:
    cfg, sha, applied = load_motion_config(args.config, args.set)
    status = 0
    mappings = _mappings(args)
    if not mappings:
        print("no visual mappings found; run `audiolab visual map` first")
        return 1
    for mp in mappings:
        try:
            result = plan_timeline(mp, cfg, Path(args.config).as_posix(), sha, applied)
        except (IntegrityError, StaleInputError, ValidationError, ValueError, OSError) as exc:
            print(f"FAILED {mp}: {exc}")
            status = 1
            continue
        j, n = output_paths(mp)
        model = write_timeline(result, j, n)
        sm = review.summary(model)
        print(f"{j}  ({sm['states']} states, {sm['actions_scheduled']} actions, {sm['actions_suppressed']} suppressed"
              + (f", skipped {sm['skipped_rules']}" if sm["skipped_rules"] else "") + ")")
        if applied:
            print("   overrides:", ", ".join(f"{o['path']}: {o['old']} -> {o['new']}" for o in applied))
    return status


def _loaded(args):
    return [review.load_song(a, tuple(args.profile or PROFILES)) for a in args.analyses]


def do_plot(args) -> int:
    for song in _loaded(args):
        if not song.plans:
            print(f"no motion timelines for {song.name}; run `audiolab motion plan` first")
            return 1
        for p in review.write_plots(song, tuple(args.window) if args.window else None):
            print(p)
    return 0


def do_inspect(args) -> int:
    model = load_timeline(args.timeline)
    for line in review.inspect(model, load_arrays(model, args.timeline), args.at, args.top):
        print(line)
    return 0


def do_check(args) -> int:
    failed = 0
    for path in args.timelines:
        try:
            problems = validate_timeline(path)
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
    status = do_plan(args)
    args.timelines = [str(output_paths(m)[0]) for m in _mappings(args) if output_paths(m)[0].exists()]
    args.no_repro = False
    status |= do_check(args)
    args.window = None
    status |= do_plot(args)
    songs = _loaded(args)
    md, js = review.write_report(songs, Path(args.report))
    print(f"{md}\n{js}")
    return status


def run(args) -> int:
    return {"plan": do_plan, "plot": do_plot, "inspect": do_inspect, "check": do_check, "run": do_run}[args.motion_command](args)


def validate_any(files: list[str]) -> int:
    """`audiolab validate`: motion timelines here, everything else via the visual-mapping handler."""
    from audiolab.visual_mapping.cli import validate_any as validate_visual

    failed, others = 0, []
    for f in files:
        try:
            text = Path(f).read_text(encoding="utf-8")
            kind = json.loads(text).get("artifact") if text.lstrip().startswith("{") else None
        except (OSError, ValueError):
            kind = None
        if kind != "motion_timeline":
            others.append(f)
            continue
        try:
            problems = validate_timeline(f)
        except (ValidationError, ValueError, OSError) as exc:
            failed += 1
            print(f"INVALID {f}: {exc}")
            continue
        if problems:
            failed += 1
            label = "STALE" if any("stale" in p for p in problems) else "INVALID"
            print(f"{label} {f}: " + "; ".join(problems))
        else:
            m = load_timeline(f)
            print(f"OK {f}: motion timeline schema {m.schema_version}, profile {m.sources.profile_name}, "
                  f"{len(m.states)} states, {len(m.actions)} actions")
    if others:
        failed += validate_visual(others)
    return 1 if failed else 0
