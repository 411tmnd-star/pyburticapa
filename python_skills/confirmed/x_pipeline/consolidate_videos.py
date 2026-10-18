"""
Move all videos from videos/<note-id>/video_N.mp4 into a flat videos/ folder
with names like video_001.mp4, video_002.mp4, etc.
Update all markdown notes to point to the new flat structure.

Usage:
    python consolidate_videos.py --dry-run    # see what would happen
    python consolidate_videos.py               # do it
"""

import argparse
import shutil
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
VIDEOS_DIR = ROOT / "videos"
NOTES_DIR = ROOT / "output_notes"


def _use_workdir(wd):
    """Point every folder and log of this step at `wd` (same layout as the script folder: output_notes/, videos/, images/)."""
    global ROOT, VIDEOS_DIR, NOTES_DIR
    wd = Path(wd).resolve()
    ROOT = wd
    VIDEOS_DIR, NOTES_DIR = wd / "videos", wd / "output_notes"


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--workdir", default=None, help="folder holding output_notes/, videos/, images/ and the logs (default: this script's folder)")
    args = ap.parse_args()
    if args.workdir:
        _use_workdir(args.workdir)

    # Find all videos in subfolders
    videos = list(VIDEOS_DIR.glob("*/video_*.mp4"))
    if not videos:
        print("No videos found in subfolders.")
        return

    videos.sort()
    print(f"Found {len(videos)} videos in subfolders.")

    # Map old path -> new name
    mapping = {}  # old_path -> new_name
    for i, old_path in enumerate(videos, 1):
        new_name = f"video_{i:03d}.mp4"
        mapping[old_path] = new_name
        print(f"  {old_path.relative_to(ROOT)} -> {new_name}")

    if args.dry_run:
        return

    # Move videos
    print("\nMoving videos...")
    for old_path, new_name in mapping.items():
        new_path = VIDEOS_DIR / new_name
        shutil.move(str(old_path), str(new_path))
        print(f"  Moved to {new_path.relative_to(ROOT)}")

    # Remove empty subfolders
    for subdir in VIDEOS_DIR.iterdir():
        if subdir.is_dir() and not any(subdir.iterdir()):
            subdir.rmdir()

    # Update markdown notes
    print("\nUpdating markdown notes...")
    updated = 0
    for note in NOTES_DIR.glob("*.md"):
        text = note.read_text(encoding="utf-8")
        new_text = text
        for old_path, new_name in mapping.items():
            # Old pattern: ../videos/<note-id>/video_N.mp4
            old_pattern = f"../videos/{old_path.parent.name}/video_[0-9]*.mp4"
            new_link = f"../videos/{new_name}"
            # Replace relative video links
            new_text = re.sub(
                rf"!\[([^\]]*)\]\(\.\.\/videos\/[^/]+\/video_\d+\.mp4\)",
                lambda m: f"![{m.group(1)}]({new_link})" if old_path.parent.name in text else m.group(0),
                new_text,
                count=1
            )
        # Simpler: replace all ../videos/<anything>/video_N.mp4 with ../videos/video_NNN.mp4
        # Build map of old refs to new refs
        for old_path, new_name in mapping.items():
            old_ref = f"../videos/{old_path.parent.name}/{old_path.name}"
            new_ref = f"../videos/{new_name}"
            new_text = new_text.replace(old_ref, new_ref)
        if new_text != text:
            note.write_text(new_text, encoding="utf-8")
            updated += 1

    print(f"Updated {updated} notes.")
    print(f"Done. All videos now in {VIDEOS_DIR}/ (flat).")


if __name__ == "__main__":
    main()
