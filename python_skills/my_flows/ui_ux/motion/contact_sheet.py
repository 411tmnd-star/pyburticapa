"""
contact_sheet.py — build the "iteration wall" the team in the talk showed (2-up, 4-up, then
all 56 versions at once) from a folder of renders or video exports.

    python contact_sheet.py renders/ wall.png --cols 8 --width 320 --label

Takes the middle frame of each .mp4/.mov (needs ffmpeg) or each image as-is, in natural name order
(v2 before v10), labels each tile with its file name (or v001, v002 ... with --number), and tiles them.
A file that cannot be read is skipped with a message; the output image itself is never included. Looking at every version
side by side is how you spot the one that "feels right" and why.
"""
import argparse, subprocess, tempfile, os, glob, re, sys
from PIL import Image, ImageDraw


def frame_of(path, tmp):
    if path.lower().endswith((".png", ".jpg", ".jpeg", ".webp")):
        return Image.open(path).convert("RGB")
    probe = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path],
                           capture_output=True, text=True).stdout.strip()
    try:
        dur = float(probe)
    except ValueError:
        dur = 0.0
    out = os.path.join(tmp, "f.png")
    subprocess.run(["ffmpeg", "-v", "error", "-y", "-ss", str(dur / 2), "-i", path, "-frames:v", "1", out], check=True)
    return Image.open(out).convert("RGB")


def natural(path):
    """Sort key that puts v2 before v10."""
    return [int(t) if t.isdigit() else t.lower() for t in re.split(r"(\d+)", os.path.basename(path))]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("folder"); ap.add_argument("out")
    ap.add_argument("--cols", type=int, default=8); ap.add_argument("--width", type=int, default=320)
    ap.add_argument("--gap", type=int, default=6); ap.add_argument("--label", action="store_true")
    ap.add_argument("--number", action="store_true", help="label tiles v001, v002 ... instead of file names")
    a = ap.parse_args()
    out_abs = os.path.abspath(a.out)
    files = sorted((f for f in glob.glob(os.path.join(a.folder, "*"))
                    if f.lower().endswith((".png", ".jpg", ".jpeg", ".webp", ".mp4", ".mov")) and os.path.abspath(f) != out_abs),
                   key=natural)
    if not files:
        raise SystemExit("no renders found")
    with tempfile.TemporaryDirectory() as tmp:
        tiles, names = [], []
        for f in files:
            try:
                im = frame_of(f, tmp)
            except (OSError, subprocess.CalledProcessError) as e:
                print(f"skipped {os.path.basename(f)}: {type(e).__name__}", file=sys.stderr)
                continue
            names.append(os.path.splitext(os.path.basename(f))[0])
            h = round(im.height * a.width / im.width)
            tiles.append(im.resize((a.width, h)))
    if not tiles:
        raise SystemExit("no readable renders found")
    rows = -(-len(tiles) // a.cols)
    th = max(t.height for t in tiles)
    sheet = Image.new("RGB", (a.cols * (a.width + a.gap) + a.gap, rows * (th + a.gap) + a.gap), (245, 245, 248))
    d = ImageDraw.Draw(sheet)
    for i, t in enumerate(tiles):
        x, y = a.gap + (i % a.cols) * (a.width + a.gap), a.gap + (i // a.cols) * (th + a.gap)
        sheet.paste(t, (x, y))
        if a.label:
            label = f"v{i + 1:03d}" if a.number else names[i][:24]
            d.rectangle([x, y, x + 8 + 6 * len(label), y + 16], fill=(0, 0, 0))
            d.text((x + 4, y + 2), label, fill=(255, 255, 255))
    sheet.save(a.out)
    print(f"{len(tiles)} versions -> {a.out}")


if __name__ == "__main__":
    main()
