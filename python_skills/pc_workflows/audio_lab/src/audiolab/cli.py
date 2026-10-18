"""Command line.

    audiolab analyze <songs...>   full analysis, plus bars at the stored settings
    audiolab bars <songs...>      redo only the bar grid / plots / accented clicks (fast)
    audiolab clicks <songs...>    plain click track on every beat
    audiolab validate <files...>  check song_analysis.json / song_interpretation.json files
    audiolab schema [--kind K]    write the JSON Schema for an artifact
    audiolab interpret <files...> describe musical changes from song_analysis.json files
    audiolab visual <action> ...  visual control channels: map, plot, compare, calibrate, inspect, check, run
    audiolab motion <action> ...  motion timelines: plan, plot, inspect, check, run
"""

from __future__ import annotations

import argparse
import sys
from pathlib import Path

from audiolab.config import load_config
from audiolab.pipeline import analyze_song, render_bars, render_offset_previews
from audiolab.songs import SongSettings, has_song_settings, load_song_settings, save_song_settings


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(prog="audiolab", description="Analyze songs.")
    sub = parser.add_subparsers(dest="command", required=True)

    def common(p: argparse.ArgumentParser) -> None:
        p.add_argument("songs", nargs="+", help="Audio file paths.")
        p.add_argument("--config", default="configs/default.yaml", help="YAML config file.")
        p.add_argument("--out", default="outputs", help="Root directory for outputs.")
        p.add_argument(
            "--settings", default="configs/songs.yaml", help="Per-song meter/downbeat settings."
        )

    run = sub.add_parser("analyze", help="Analyze one or more audio files.")
    common(run)

    clk = sub.add_parser("clicks", help="Render a song + click-track WAV from saved beats.")
    common(clk)
    clk.add_argument("--bar", type=int, default=0, help="Accent every Nth click (0 = none).")

    bars = sub.add_parser("bars", help="Rebuild bars, plots and accented clicks from saved analysis.")
    common(bars)
    bars.add_argument("--beats-per-bar", type=int, help="Meter; overrides the stored value.")
    bars.add_argument(
        "--offset", type=int, help="Index (0-based) of the detected beat that is beat one."
    )
    bars.add_argument("--save", action="store_true", help="Store --beats-per-bar/--offset for the song.")
    bars.add_argument(
        "--window", type=float, nargs=2, metavar=("START", "END"), help="Seconds shown in bars_window.png."
    )
    bars.add_argument(
        "--try-offsets",
        action="store_true",
        help="Write offset_0.wav, offset_1.wav, ... (first 40 s each) to pick the right one by ear.",
    )

    val = sub.add_parser(
        "validate", help="Validate analysis, interpretation or visual mapping JSON files."
    )
    val.add_argument("files", nargs="+", help="Paths to song_analysis.json / song_interpretation.json / visual_mapping.*.json.")

    sch = sub.add_parser("schema", help="Write the JSON Schema for an artifact.")
    sch.add_argument(
        "--kind", choices=["analysis", "interpretation", "visual_mapping", "motion_timeline"], default="analysis",
        help="Which artifact's schema to write (default: analysis).",
    )
    sch.add_argument("--out", default=None, help="Default: schemas/song_<kind>.v1.json (visual_mapping.v1.json)")

    from audiolab.visual_mapping.cli import add_parser as add_visual_parser

    add_visual_parser(sub)

    from audiolab.motion.cli import add_parser as add_motion_parser

    add_motion_parser(sub)

    itp = sub.add_parser(
        "interpret", help="Describe musical changes from song_analysis.json files (reads only)."
    )
    itp.add_argument("analyses", nargs="+", help="Paths to song_analysis.json files.")
    itp.add_argument("--config", default="configs/interpretation.yaml", help="Interpretation config.")
    itp.add_argument("--out-name", default="song_interpretation.json", help="Written next to each analysis.")
    itp.add_argument("--plot", action="store_true", help="Also write interpretation.png for review.")
    itp.add_argument("--verify", action="store_true", help="Also print the bass-burst vs bar alignment check.")

    args = parser.parse_args(argv)

    if args.command == "interpret":
        from audiolab.interpretation.cli import run_interpret

        return run_interpret(args)

    if args.command == "visual":
        from audiolab.visual_mapping.cli import run as run_visual

        return run_visual(args)

    if args.command == "motion":
        from audiolab.motion.cli import run as run_motion

        return run_motion(args)

    if args.command == "validate":
        from audiolab.motion.cli import validate_any

        return validate_any(args.files)

    if args.command == "schema":
        import json

        if args.kind == "interpretation":
            from audiolab.interpretation.schema import json_schema
        elif args.kind == "visual_mapping":
            from audiolab.visual_mapping.schema import json_schema
        elif args.kind == "motion_timeline":
            from audiolab.motion.schema import json_schema
        else:
            from audiolab.schema import json_schema

        default = (f"schemas/{args.kind}.v1.json" if args.kind in ("visual_mapping", "motion_timeline")
                   else f"schemas/song_{args.kind}.v1.json")
        out = Path(args.out or default)
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(json.dumps(json_schema(), indent=2) + "\n", encoding="utf-8")
        print(out)
        return 0

    cfg = load_config(args.config)

    def stored(song: str) -> SongSettings:
        default = SongSettings(beats_per_bar=cfg.bars.beats_per_bar)
        return load_song_settings(args.settings, Path(song).stem, default)

    def origin_of(song: str, settings: SongSettings) -> str:
        """Origin is "stored" only when the per-song file holds exactly the settings in use."""
        stem = Path(song).stem
        if has_song_settings(args.settings, stem) and load_song_settings(args.settings, stem) == settings:
            return "stored"
        return "default"

    if args.command == "clicks":
        from audiolab import io
        from audiolab.clicks import beat_diagnostics, render_click_track

        for song in args.songs:
            out_dir = io.song_output_dir(args.out, song)
            analysis = io.load_analysis(out_dir / "analysis.npz")
            y, sr = io.load_audio(song, cfg.audio)
            wav = render_click_track(
                y, sr, analysis["beat_times"], out_dir / "clicks.wav", downbeat_every=args.bar
            )
            diag = beat_diagnostics(
                analysis["onset_env"], analysis["beat_times"], sr, int(analysis["hop_length"])
            )
            print(f"{song} -> {wav}")
            print(f"  tempo={float(analysis['tempo']):.1f} BPM  {diag}")
        return 0

    if args.command == "bars":
        for song in args.songs:
            settings = stored(song)
            if args.beats_per_bar is not None:
                settings.beats_per_bar = args.beats_per_bar
            if args.offset is not None:
                settings.downbeat_offset = args.offset
            if args.try_offsets:
                paths = render_offset_previews(song, cfg, args.out, settings.beats_per_bar)
                for p in paths:
                    print(f"  {p}")
                continue
            if args.save:
                save_song_settings(args.settings, Path(song).stem, settings)
            report = render_bars(
                song, cfg, args.out, settings, window=tuple(args.window) if args.window else None,
                settings_origin=origin_of(song, settings),
            )
            hint = report["downbeat_hint"]
            print(
                f"{song}: {settings.beats_per_bar} beats/bar, offset {settings.downbeat_offset}"
                f"{' (saved)' if args.save else ''}; {len(report['bars'])} bars"
            )
            print(
                f"  hint (check by ear): offset {hint['suggested_offset']}, "
                f"phase scores {[round(s, 2) for s in hint['scores']]}"
            )
        return 0

    for song in args.songs:
        settings = stored(song)
        out_dir = analyze_song(
            song, cfg, args.out, settings, settings_origin=origin_of(song, settings)
        )
        print(f"{song} -> {out_dir}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
