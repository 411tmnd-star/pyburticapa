"""
Download every video AND image referenced in output_notes/ to permanent local folders:

    videos/<note-id>/video_1.mp4, video_2.mp4, ...
    images/<note-id>/<name>.jpg ...      (tweet images, quoted-post images, article cover + inline images)

After an image is saved, the note's remote pbs.twimg.com link is rewritten to the local
file (../images/<note-id>/<name>), so notes keep working if the tweet is deleted.
Covers ALL notes, including ones already transcribed. Safe to stop and re-run:
files that already exist are skipped. Failures go to failed_downloads.txt.

Usage:
    python download_videos.py --dry-run
    python download_videos.py
    python download_videos.py --limit 5
    python download_videos.py --images-only     # or --videos-only
    python download_videos.py --cookies-browser chrome   # for protected posts
"""

from __future__ import annotations

import argparse
import re
import shutil
import subprocess
import sys
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent
NOTES_DIR = ROOT / "output_notes"
VIDEOS_DIR = ROOT / "videos"
IMAGES_DIR = ROOT / "images"
FAILED_LOG = ROOT / "failed_downloads.txt"

VIDEO_RE = re.compile(r"https://video\.twimg\.com/[^\s)>\]\"']+")
SOURCE_RE = re.compile(r"\*\*Source:\*\*\s*(\S+)")
# tweet/quote/article images and video thumbnails (never profile pictures)
IMAGE_RE = re.compile(
    r"https://pbs\.twimg\.com/(?:media|amplify_video_thumb|ext_tw_video_thumb|tweet_video_thumb)/[^\s)>\]\"']+"
)


def find_videos(text: str) -> list[str]:
    seen, urls = set(), []
    for url in VIDEO_RE.findall(text):
        if url not in seen:
            seen.add(url)
            urls.append(url)
    return urls


def local_path(note_id: str, n: int) -> Path:
    return VIDEOS_DIR / note_id / f"video_{n}.mp4"


def _direct(url: str, dest: Path) -> None:
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    tmp = dest.with_suffix(".part")
    with urllib.request.urlopen(req, timeout=60) as resp, open(tmp, "wb") as out:
        shutil.copyfileobj(resp, out)
    tmp.replace(dest)


def _ytdlp(url: str, dest: Path, cookies_browser: str | None, item: int | None = None) -> None:
    cmd = [sys.executable, "-m", "yt_dlp", "-q", "--no-warnings",
           "-f", "bv*+ba/b", "--merge-output-format", "mp4",
           "-o", str(dest.with_suffix(".%(ext)s")), url]
    if item:
        # tweet pages with several videos are playlists: pick the matching one
        cmd[3:3] = ["--playlist-items", str(item)]
    if cookies_browser:
        cmd[3:3] = ["--cookies-from-browser", cookies_browser]
    subprocess.run(cmd, check=True)
    if not dest.exists():
        raise RuntimeError("yt-dlp produced no .mp4")


def find_images(text: str) -> list[str]:
    seen, urls = set(), []
    for url in IMAGE_RE.findall(text):
        if url not in seen:
            seen.add(url)
            urls.append(url)
    return urls


def image_filename(url: str) -> str:
    """Stable file name from the URL: <media id>.<ext>, ext from the path or ?format=."""
    parsed = urllib.parse.urlparse(url)
    name = Path(parsed.path).name
    fmt = urllib.parse.parse_qs(parsed.query).get("format", [None])[0]
    stem, dot, ext = name.rpartition(".")
    if not dot:
        stem, ext = name, fmt or "jpg"
    return f"{stem}.{ext}"


def image_download_url(url: str) -> str:
    """Ask for the original-size file (pbs.twimg.com serves ?name=orig)."""
    parsed = urllib.parse.urlparse(url)
    if "/media/" not in parsed.path:
        return url
    q = urllib.parse.parse_qs(parsed.query)
    q["name"] = ["orig"]
    if "format" not in q and "." not in Path(parsed.path).name:
        q["format"] = ["jpg"]
    return urllib.parse.urlunparse(parsed._replace(query=urllib.parse.urlencode({k: v[0] for k, v in q.items()})))


def download_image(url: str, dest: Path) -> Path:
    """Save one image (skipped if already there). Falls back to the URL as written if ?name=orig fails."""
    if dest.exists() and dest.stat().st_size > 0:
        return dest
    dest.parent.mkdir(parents=True, exist_ok=True)
    last = None
    for candidate in dict.fromkeys([image_download_url(url), url]):
        try:
            _direct(candidate, dest)
            if dest.exists() and dest.stat().st_size > 0:
                return dest
        except Exception as e:
            last = e
    raise RuntimeError(f"image download failed: {last!r}")


def download(url: str, dest: Path, source: str | None = None, cookies_browser: str | None = None) -> Path:
    """Get `url` into `dest` (skipped if already there).
    Order: direct HTTP -> yt-dlp on the video URL -> yt-dlp on the tweet page."""
    if dest.exists() and dest.stat().st_size > 0:
        return dest
    dest.parent.mkdir(parents=True, exist_ok=True)
    attempts = []
    if ".m3u8" not in url:
        attempts.append(lambda: _direct(url, dest))
    attempts.append(lambda: _ytdlp(url, dest, cookies_browser))
    if source:
        m = re.fullmatch(r"video_(\d+)", dest.stem)
        item = int(m.group(1)) if m else None
        attempts.append(lambda: _ytdlp(source, dest, cookies_browser, item))
    last = None
    for attempt in attempts:
        try:
            attempt()
            if dest.exists() and dest.stat().st_size > 0:
                return dest
        except Exception as e:
            last = e
    raise RuntimeError(f"all download methods failed: {last!r}")


def run_images(args) -> int:
    """Download every image in the notes and relink the notes to the local copies. Returns failures."""
    jobs = []  # (note, url)
    for note in sorted(NOTES_DIR.glob("*.md")):
        if args.only and args.only not in note.name:
            continue
        for url in find_images(note.read_text(encoding="utf-8")):
            jobs.append((note, url))
    if args.limit:
        keep = set(sorted({n.stem for n, _ in jobs})[: args.limit])
        jobs = [j for j in jobs if j[0].stem in keep]
    print(f"{len(jobs)} image link(s) to save -> {IMAGES_DIR}")
    if args.dry_run:
        for note, url in jobs:
            print(f"  {note.stem}  {url}")
        return 0

    failed = 0
    by_note: dict[Path, dict[str, str]] = {}
    for i, (note, url) in enumerate(jobs, 1):
        dest = IMAGES_DIR / note.stem / image_filename(url)
        print(f"[{i}/{len(jobs)}] {note.stem} {dest.name}", end=" ", flush=True)
        try:
            download_image(url, dest)
            print(f"ok ({dest.stat().st_size // 1024} KB)")
            by_note.setdefault(note, {})[url] = f"../images/{note.stem}/{dest.name}"
        except Exception as e:
            failed += 1
            print(f"FAILED: {e}")
            with open(FAILED_LOG, "a", encoding="utf-8") as f:
                f.write(f"{note.stem}\timage\t{url}\t{e!r}\n")
    for note, mapping in by_note.items():  # relink once per note, longest URLs first
        text = note.read_text(encoding="utf-8")
        for url in sorted(mapping, key=len, reverse=True):
            text = text.replace(url, mapping[url])
        tmp = note.with_suffix(".md.tmp")
        tmp.write_text(text, encoding="utf-8")
        tmp.replace(note)
    print(f"Images done. {len(jobs) - failed} saved, {failed} failed.")
    return failed


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--limit", type=int, default=None, help="process at most N notes")
    ap.add_argument("--only", default=None, help="only notes whose filename contains this id")
    ap.add_argument("--cookies-browser", default=None, help="e.g. chrome, edge, firefox (for login-only posts)")
    ap.add_argument("--images-only", action="store_true", help="skip videos")
    ap.add_argument("--videos-only", action="store_true", help="skip images")
    args = ap.parse_args()

    if not args.videos_only:
        run_images(args)
        if args.images_only:
            return

    jobs = []
    for note in sorted(NOTES_DIR.glob("*.md")):
        if args.only and args.only not in note.name:
            continue
        text = note.read_text(encoding="utf-8")
        m = SOURCE_RE.search(text)
        for n, url in enumerate(find_videos(text), 1):
            jobs.append((note.stem, n, url, m.group(1) if m else None))
    if args.limit:
        keep = {j[0] for j in jobs}
        keep = set(sorted(keep)[: args.limit])
        jobs = [j for j in jobs if j[0] in keep]

    todo = [j for j in jobs if not local_path(j[0], j[1]).exists()]
    print(f"{len(jobs)} video(s) found, {len(todo)} still to download -> {VIDEOS_DIR}")
    if args.dry_run:
        for note_id, n, url, _ in todo:
            print(f"  {note_id} video_{n}  {url}")
        return

    failed = 0
    for i, (note_id, n, url, source) in enumerate(todo, 1):
        print(f"[{i}/{len(todo)}] {note_id} video_{n}", end=" ", flush=True)
        try:
            p = download(url, local_path(note_id, n), source, args.cookies_browser)
            print(f"ok ({p.stat().st_size // 1024} KB)")
        except Exception as e:
            failed += 1
            print(f"FAILED: {e}")
            with open(FAILED_LOG, "a", encoding="utf-8") as f:
                f.write(f"{note_id}\tvideo_{n}\t{url}\t{e!r}\n")
    print(f"Done. {len(todo) - failed} downloaded, {failed} failed (see {FAILED_LOG.name}).")


if __name__ == "__main__":
    main()
