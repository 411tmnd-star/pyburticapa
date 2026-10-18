"""
Run the whole pipeline, in order:

    1. extractor.py        -> one note per link in output_notes/ (text, captions, quoted post, media URLs)
    2. fetch_articles.py   -> full X Article text + cover/inline images appended to the notes
    3. download_videos.py  -> saves every video and image locally, relinks images in the notes
    4. transcribe_notes.py -> transcripts for every video, appended to the notes

Every step skips work that is already done, so this is safe to stop and re-run.

Usage:
    python run_all.py LINK_OR_FILE ...  # everything, for these links / link files
    python run_all.py LINKS... --workdir DIR   # keep everything in DIR instead of the script folder
    python run_all.py --skip extract   # steps 2-4 only, on notes already in output_notes/
    python run_all.py --skip transcribe
    python run_all.py --only articles
    python run_all.py --limit 3        # try 3 notes per step first (steps 2-4)
    python run_all.py --model medium   # whisper model for step 4
"""

import argparse
import os
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent
STEPS = [
    ("extract", "extractor.py"),
    ("articles", "fetch_articles.py"),
    ("download", "download_videos.py"),
    ("transcribe", "transcribe_notes.py"),
]


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("inputs", nargs="*", help="X links and/or text files containing X links (step 1 input)")
    ap.add_argument("--skip", action="append", default=[], choices=[s for s, _ in STEPS])
    ap.add_argument("--only", action="append", default=[], choices=[s for s, _ in STEPS])
    ap.add_argument("--workdir", default=None, help="folder for output_notes/, videos/, images/ and logs (default: this script's folder)")
    ap.add_argument("--limit", type=int, default=None, help="max notes per step (not used by extract)")
    ap.add_argument("--model", default=None, help="whisper model for the transcribe step")
    ap.add_argument("--cookies-browser", default=None, help="e.g. chrome (for login-only videos)")
    args = ap.parse_args()

    results = []
    for name, script in STEPS:
        if name in args.skip or (args.only and name not in args.only):
            continue
        if name == "extract" and not args.inputs:
            print("\n===== extract: skipped (no links given; pass links or a file of links) =====")
            continue
        cmd = [sys.executable, str(ROOT / script)]
        if args.workdir:
            cmd += ["--workdir", os.path.abspath(args.workdir)]
        if name == "extract":
            cmd += [os.path.abspath(i) if os.path.exists(i) else i for i in args.inputs]
        if args.limit and name != "extract":
            cmd += ["--limit", str(args.limit)]
        if name == "transcribe" and args.model:
            cmd += ["--model", args.model]
        if name == "download" and args.cookies_browser:
            cmd += ["--cookies-browser", args.cookies_browser]
        print(f"\n===== {name}: {script} =====", flush=True)
        code = subprocess.run(cmd, cwd=ROOT).returncode
        results.append((name, code))
        if code:
            print(f"!! {name} exited with code {code}; continuing with the next step")

    print("\n===== summary =====")
    for name, code in results:
        print(f"  {name:<11} {'ok' if code == 0 else f'FAILED ({code})'}")
    print("Check failed_links.txt, failed_articles.txt, failed_downloads.txt, failed_transcripts.txt for leftovers.")


if __name__ == "__main__":
    main()
