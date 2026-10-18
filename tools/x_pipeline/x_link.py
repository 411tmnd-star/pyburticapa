"""
x_link.py -- paste X/Twitter links, get one structured folder back.

    python x_link.py https://x.com/someone/status/1234567890123456789
    python x_link.py LINK1 LINK2 --out x_inbox --model small
    python x_link.py --links-file links.txt --no-transcribe

Runs the four existing steps (extractor, fetch_articles, download_videos,
transcribe_notes) on JUST the links you give, inside its own workspace, so your
big output_notes/ folder is never touched:

    x_inbox/
      notes/<tweet-id>.md      text, captions, quoted post, full X Article, transcript
      videos/<tweet-id>/       downloaded videos
      images/<tweet-id>/       tweet, quoted-post and article images (notes point at these)
      SUMMARY.md               one row per link: what was captured, what is missing
      failed_*.txt             leftovers from each step

Every step skips work already done, so it is safe to stop and re-run.
Exit code: 0 all links captured, 1 at least one link could not be fetched, 2 bad input.
Transcripts come from a local speech model (faster-whisper), so treat them as
machine transcripts: names and numbers can be wrong.
"""
from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
if str(HERE) not in sys.path:
    sys.path.insert(0, str(HERE))

# user part may be a handle or "i" / "i/web"; domains include the common mirror hosts
LINK_RE = re.compile(
    r"https?://(?:www\.|mobile\.)?(?:x\.com|twitter\.com|fxtwitter\.com|vxtwitter\.com|fixupx\.com)"
    r"/(?:i/web|i|([A-Za-z0-9_]{1,15}))/status(?:es)?/(\d{5,25})"
)


def parse_links(texts):
    """Pull unique (user, tweet_id) pairs out of any text, keeping first-seen order.
    Links of the form x.com/i/status/ID have no handle, so the user is "i"."""
    seen, out = set(), []
    for text in texts:
        for m in LINK_RE.finditer(text or ""):
            user, tid = m.group(1) or "i", m.group(2)
            if tid not in seen:
                seen.add(tid)
                out.append((user, tid))
    return out


def workspace(out):
    out = Path(out)
    dirs = {"root": out, "notes": out / "notes", "videos": out / "videos", "images": out / "images"}
    for key in ("notes", "videos", "images"):
        dirs[key].mkdir(parents=True, exist_ok=True)
    return dirs


def capture(user, tid, notes_dir, fetch=None, build=None):
    """Step 1 for one link. Returns (status, detail): status is 'saved', 'existing' or 'failed'."""
    note = Path(notes_dir) / f"{tid}.md"
    if note.exists():
        return "existing", str(note)
    if fetch is None or build is None:
        import extractor
        fetch, build = fetch or extractor.fetch_tweet, build or extractor.build_note
    data, err = fetch(user, tid)
    if data is None:
        return "failed", err
    note.write_text(build(f"https://x.com/{user}/status/{tid}", data), encoding="utf-8")
    return "saved", str(note)


def _run_module(module, patches, argv):
    """Call module.main() with its folder constants pointed at our workspace and a fake argv.
    Returns an exit-code-like int (0 ok)."""
    old_attrs = {k: getattr(module, k) for k in patches if hasattr(module, k)}
    old_argv = sys.argv
    try:
        for k, v in patches.items():
            setattr(module, k, v)
        sys.argv = [module.__name__ + ".py", *argv]
        try:
            module.main()
        except SystemExit as e:
            return 0 if e.code in (None, 0) else (e.code if isinstance(e.code, int) else 1)
        return 0
    finally:
        sys.argv = old_argv
        for k, v in old_attrs.items():
            setattr(module, k, v)


def default_stages(ws, args):
    """The three follow-up steps, each as (name, callable returning int)."""
    import download_videos
    import fetch_articles
    import transcribe_notes

    root = ws["root"]
    stages = []
    if not args.no_articles:
        stages.append(("articles", lambda: _run_module(fetch_articles, {
            "NOTES_DIR": ws["notes"], "FAILED_LOG": root / "failed_articles.txt",
            "CHECKED_LOG": root / "articles_checked.txt"}, [])))
    if not args.no_download:
        dl_argv = ["--cookies-browser", args.cookies_browser] if args.cookies_browser else []
        stages.append(("download", lambda: _run_module(download_videos, {
            "NOTES_DIR": ws["notes"], "VIDEOS_DIR": ws["videos"], "IMAGES_DIR": ws["images"],
            "FAILED_LOG": root / "failed_downloads.txt"}, dl_argv)))
    if not args.no_transcribe and not args.no_download:
        tr_argv = ["--model", args.model] if args.model else []
        stages.append(("transcribe", lambda: _run_module(transcribe_notes, {
            "NOTES_DIR": ws["notes"], "FAILED_LOG": root / "failed_transcripts.txt"}, tr_argv)))
    return stages


def inspect_note(path):
    """What a finished note contains, read from the markdown itself."""
    text = Path(path).read_text(encoding="utf-8")
    return {
        "article": bool(re.search(r"^### Article(?!\s+(?:Images|Preview))", text, re.M)),
        "images": len(re.findall(r"!\[[^\]]*\]\([^)]+\)", text)),
        "videos": len(re.findall(r"video\.twimg\.com|\bvideos/", text)),
        "transcript": "### Transcript" in text,
        "chars": len(text),
    }


def write_summary(ws, results):
    """results: {tid: {"user":..., "capture": status, "detail":..., }} -> SUMMARY.md text."""
    lines = ["# X link intake", "",
             "| Tweet | Captured | Article | Images | Video refs | Transcript | Note |",
             "| --- | --- | --- | --- | --- | --- | --- |"]
    for tid, r in results.items():
        if r["capture"] == "failed":
            lines.append(f"| {r['user']}/{tid} | FAILED | - | - | - | - | {r['detail']} |")
            continue
        info = inspect_note(ws["notes"] / f"{tid}.md")
        lines.append(f"| {r['user']}/{tid} | {r['capture']} | {'yes' if info['article'] else 'no'} | "
                     f"{info['images']} | {info['videos']} | {'yes (machine)' if info['transcript'] else 'no'} | "
                     f"notes/{tid}.md |")
    lines += ["", "Transcripts are machine-generated. Check names and numbers before quoting.", ""]
    text = "\n".join(lines)
    (ws["root"] / "SUMMARY.md").write_text(text, encoding="utf-8")
    return text


def run(args, fetch=None, build=None, stages=None):
    texts = list(args.links)
    if args.links_file:
        texts.append(Path(args.links_file).read_text(encoding="utf-8"))
    links = parse_links(texts)
    if not links:
        print("No X/Twitter status links found in the input.", file=sys.stderr)
        return 2
    ws = workspace(args.out)
    results = {}
    for user, tid in links:
        status, detail = capture(user, tid, ws["notes"], fetch, build)
        results[tid] = {"user": user, "capture": status, "detail": detail}
        print(f"[{tid}] {status}" + (f": {detail}" if status == "failed" else ""))
    if any(r["capture"] != "failed" for r in results.values()):
        for name, fn in (stages if stages is not None else default_stages(ws, args)):
            print(f"\n===== {name} =====", flush=True)
            code = fn()
            if code:
                print(f"!! {name} exited with code {code}; continuing")
    print()
    print(write_summary(ws, results))
    return 1 if any(r["capture"] == "failed" for r in results.values()) else 0


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("links", nargs="*", help="X/Twitter status links (any text containing them works)")
    ap.add_argument("--links-file", help="a text/markdown file containing links")
    ap.add_argument("--out", default="x_inbox", help="workspace folder (default x_inbox)")
    ap.add_argument("--no-articles", action="store_true")
    ap.add_argument("--no-download", action="store_true", help="skip saving videos/images (also skips transcripts)")
    ap.add_argument("--no-transcribe", action="store_true")
    ap.add_argument("--model", default=None, help="whisper model, e.g. small or medium")
    ap.add_argument("--cookies-browser", default=None, help="e.g. chrome, for protected posts")
    return run(ap.parse_args(argv))


if __name__ == "__main__":
    sys.exit(main())
