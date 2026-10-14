"""
Transcribe the videos attached to each note in output_notes/ and append the
transcript to that note. Runs locally, uses no Claude usage.
Videos are first downloaded into videos/<note-id>/ and KEPT (not deleted).
Silent videos (no audio track) are noted as such instead of crashing.

Setup (once):
    pip install faster-whisper yt-dlp
    (ffmpeg is only needed for the yt-dlp fallback on .m3u8 streams)

Usage:
    python transcribe_notes.py --dry-run             # list what would be done
    python transcribe_notes.py --limit 3             # test on 3 notes first
    python transcribe_notes.py --only 1925334915383538077
    python transcribe_notes.py                       # everything
    python transcribe_notes.py --model medium        # better accuracy, slower

Safe to stop and re-run: notes that already have a transcript are skipped.
Failures are logged to failed_transcripts.txt.
"""

import argparse
import re
import sys
from pathlib import Path

from download_videos import download, local_path, find_videos

ROOT = Path(__file__).resolve().parent
NOTES_DIR = ROOT / "output_notes"
FAILED_LOG = ROOT / "failed_transcripts.txt"

MARKER = "### Transcript"


def has_audio(path: Path) -> bool:
    """False for silent videos (screen recordings etc.). faster-whisper raises
    IndexError('tuple index out of range') on files with no audio stream."""
    import av
    with av.open(str(path)) as container:
        return len(container.streams.audio) > 0


def format_transcript(segments, gap: float = 1.5, max_chars: int = 500) -> str:
    """Join segments into paragraphs, breaking on pauses longer than `gap` seconds,
    or once a paragraph passes `max_chars` and the segment ends a sentence."""
    paragraphs, current, last_end = [], [], None
    for seg in segments:
        text = seg.text.strip()
        if not text:
            continue
        if last_end is not None and current:
            long_enough = sum(len(t) + 1 for t in current) >= max_chars
            if seg.start - last_end > gap or (long_enough and current[-1][-1] in ".?!"):
                paragraphs.append(" ".join(current))
                current = []
        current.append(text)
        last_end = seg.end
    if current:
        paragraphs.append(" ".join(current))
    return "\n\n".join(paragraphs)


def source_of(note: Path):
    m = re.search(r"\*\*Source:\*\*\s*(\S+)", note.read_text(encoding="utf-8"))
    return m.group(1) if m else None


def log_failure(note: Path, reason: str) -> None:
    with open(FAILED_LOG, "a", encoding="utf-8") as f:
        f.write(f"{note.name}\t{reason}\n")


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--model", default="small", help="tiny/base/small/medium/large-v3 (default: small)")
    ap.add_argument("--device", default="auto", help="auto/cpu/cuda (default: auto)")
    ap.add_argument("--compute-type", default="auto", help="e.g. int8 for CPU, float16 for GPU (default: auto)")
    ap.add_argument("--language", default=None, help="force language code, e.g. en (default: auto-detect)")
    ap.add_argument("--limit", type=int, default=None, help="process at most N notes")
    ap.add_argument("--only", default=None, help="process only the note whose filename contains this id")
    ap.add_argument("--dry-run", action="store_true", help="list notes to process, do nothing else")
    args = ap.parse_args()

    if not NOTES_DIR.is_dir():
        sys.exit(f"Notes folder not found: {NOTES_DIR}")

    todo = []
    for note in sorted(NOTES_DIR.glob("*.md")):
        if args.only and args.only not in note.name:
            continue
        text = note.read_text(encoding="utf-8")
        if MARKER in text:
            continue
        urls = find_videos(text)
        if urls:
            todo.append((note, urls))

    if args.limit:
        todo = todo[: args.limit]

    print(f"{len(todo)} note(s) to transcribe.")
    if args.dry_run:
        for note, urls in todo:
            print(f"  {note.name}  ({len(urls)} video)")
        return
    if not todo:
        return

    from faster_whisper import WhisperModel  # imported late so --dry-run needs no install

    print(f"Loading model '{args.model}' ...")
    model = WhisperModel(args.model, device=args.device, compute_type=args.compute_type)

    for i, (note, urls) in enumerate(todo, 1):
        print(f"[{i}/{len(todo)}] {note.name}")
        sections = []
        try:
            for n, url in enumerate(urls, 1):
                media = download(url, local_path(note.stem, n), source_of(note))
                print(f"  video {n}: saved {media.relative_to(ROOT)}")
                if not has_audio(media):
                    print(f"  video {n}: no audio track, skipping transcription")
                    label = f"{MARKER}" if len(urls) == 1 else f"{MARKER} (video {n})"
                    sections.append(f"{label}\n\n_(video has no audio track - nothing to transcribe)_")
                    continue
                segments, info = model.transcribe(
                    str(media), language=args.language, vad_filter=True
                )
                total = info.duration or 0

                def with_progress(segs, n=n, total=total):
                    for s in segs:
                        if total:
                            print(f"\r  video {n}: {min(100, int(s.end / total * 100))}% of {int(total)}s", end="", flush=True)
                        yield s

                body = format_transcript(with_progress(segments))
                print()
                if not body:
                    body = "_(no speech detected)_"
                label = f"{MARKER}" if len(urls) == 1 else f"{MARKER} (video {n})"
                sections.append(f"{label}\n_Language: {info.language}_\n\n{body}")
        except Exception as e:
            print(f"  FAILED: {e}")
            log_failure(note, repr(e))
            continue

        text = note.read_text(encoding="utf-8").rstrip()
        tmp_note = note.with_suffix(".md.tmp")
        tmp_note.write_text(text + "\n\n---\n\n" + "\n\n".join(sections) + "\n", encoding="utf-8")
        tmp_note.replace(note)  # atomic: a crash never leaves a half-written note
        print("  done")

    print("Finished. Failures (if any) are in failed_transcripts.txt")


if __name__ == "__main__":
    main()
