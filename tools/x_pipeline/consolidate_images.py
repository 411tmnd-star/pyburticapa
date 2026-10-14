"""
Move all images from images/<note-id>/*.jpg|png|gif into a flat images/ folder
with names like image_001.jpg, image_002.jpg, etc.
Update all markdown notes to point to the new flat structure.

Usage:
    python consolidate_images.py --dry-run    # see what would happen
    python consolidate_images.py               # do it
"""

import argparse
import shutil
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent
IMAGES_DIR = ROOT / "images"
NOTES_DIR = ROOT / "output_notes"


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    # Find all images in subfolders
    images = []
    for ext in ("*.jpg", "*.jpeg", "*.png", "*.gif", "*.webp"):
        images.extend(IMAGES_DIR.glob(f"*/{ext}"))
    images.sort()

    if not images:
        print("No images found in subfolders.")
        return

    print(f"Found {len(images)} images in subfolders.")

    # Map old path -> new name (keep extension)
    mapping = {}  # old_path -> new_name
    for i, old_path in enumerate(images, 1):
        ext = old_path.suffix
        new_name = f"image_{i:03d}{ext}"
        mapping[old_path] = new_name
        print(f"  {old_path.relative_to(ROOT)} -> {new_name}")

    if args.dry_run:
        return

    # Move images
    print("\nMoving images...")
    for old_path, new_name in mapping.items():
        new_path = IMAGES_DIR / new_name
        shutil.move(str(old_path), str(new_path))
        print(f"  Moved to {new_path.relative_to(ROOT)}")

    # Remove empty subfolders
    for subdir in IMAGES_DIR.iterdir():
        if subdir.is_dir() and not any(subdir.iterdir()):
            subdir.rmdir()

    # Update markdown notes
    print("\nUpdating markdown notes...")
    updated = 0
    for note in NOTES_DIR.glob("*.md"):
        text = note.read_text(encoding="utf-8")
        new_text = text
        for old_path, new_name in mapping.items():
            old_ref = f"../images/{old_path.parent.name}/{old_path.name}"
            new_ref = f"../images/{new_name}"
            new_text = new_text.replace(old_ref, new_ref)
        if new_text != text:
            note.write_text(new_text, encoding="utf-8")
            updated += 1

    print(f"Updated {updated} notes.")
    print(f"Done. All images now in {IMAGES_DIR}/ (flat).")


if __name__ == "__main__":
    main()
