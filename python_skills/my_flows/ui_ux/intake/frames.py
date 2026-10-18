#!/usr/bin/env python3
"""frames.py - turn a design video into numbered frames plus frames.json, ready for a contact sheet or a rebuild.

    python frames.py clip.mp4 out/frames --fps 4            # 4 frames per second (good default for study)
    python frames.py clip.mp4 out/frames --all              # every frame (short loops under ~3 s)
    python frames.py clip.mp4 out/frames --fps 4 --width 960

Writes out/frames/f_0001.jpg, f_0002.jpg ... and out/frames/frames.json:
    {"count", "pattern": "f_{n}.jpg", "pad": 4, "width", "height", "fps", "source"}
That is the same frames.json the scroll-scrub page (motion/scroll_scrub/index.html) reads, so a clip can go
straight into a scroll-scrubbed sequence. "source" is the file name only, never a full path.

Needs ffmpeg and ffprobe on PATH. Nothing is downloaded: the video comes from you (attached, or saved on the
laptop by x_link.py). Keep the video and its frames on your own machine; the repo ignores intake media.
Exit: 0 = frames written, 1 = ffmpeg failed or produced nothing, 2 = bad input.
"""
import argparse, json, shutil, subprocess, sys
from pathlib import Path

PATTERN, PAD = "f_{n}.jpg", 4


def probe(video):
    """Width, height and frame rate of the first video stream."""
    out = subprocess.run(["ffprobe", "-v", "error", "-select_streams", "v:0", "-show_entries",
                          "stream=width,height,r_frame_rate", "-of", "json", str(video)],
                         capture_output=True, text=True)
    streams = json.loads(out.stdout or "{}").get("streams") or []
    if out.returncode or not streams:
        return None
    s = streams[0]
    num, _, den = s.get("r_frame_rate", "0/1").partition("/")
    rate = float(num) / float(den or 1) if float(den or 1) else 0.0
    return int(s["width"]), int(s["height"]), rate


def extract(video, out_dir, fps=4.0, every_frame=False, width=None):
    rate = probe(video)[2]                           # the video's own rate; frame images carry none
    out_dir.mkdir(parents=True, exist_ok=True)
    for old in out_dir.glob("f_*.jpg"):              # a re-run replaces the old set instead of mixing with it
        old.unlink()
    filters = [] if every_frame else [f"fps={fps}"]
    if width:
        filters.append(f"scale={width}:-2")
    cmd = ["ffmpeg", "-v", "error", "-y", "-i", str(video)]
    if filters:
        cmd += ["-vf", ",".join(filters)]
    cmd += ["-q:v", "3", str(out_dir / f"f_%0{PAD}d.jpg")]
    if subprocess.run(cmd).returncode:
        return None
    files = sorted(out_dir.glob("f_*.jpg"))
    if not files:
        return None
    w, h, _ = probe(files[0])
    meta = {"count": len(files), "pattern": PATTERN, "pad": PAD, "width": w, "height": h,
            "fps": round(rate if every_frame else fps, 3), "source": Path(video).name}
    (out_dir / "frames.json").write_text(json.dumps(meta) + "\n", encoding="utf-8")
    return meta


def main(argv=None):
    ap = argparse.ArgumentParser(description="Video to numbered frames + frames.json.")
    ap.add_argument("video")
    ap.add_argument("out_dir")
    ap.add_argument("--fps", type=float, default=4.0, help="frames per second to keep (default 4)")
    ap.add_argument("--all", action="store_true", help="keep every frame")
    ap.add_argument("--width", type=int, help="scale frames to this width, keeping the aspect ratio")
    a = ap.parse_args(argv)
    if not (shutil.which("ffmpeg") and shutil.which("ffprobe")):
        print("ffmpeg and ffprobe are needed on PATH", file=sys.stderr)
        return 2
    video = Path(a.video)
    if not video.is_file() or probe(video) is None:
        print(f"not a readable video: {video}", file=sys.stderr)
        return 2
    if a.fps <= 0:
        print("--fps must be above 0", file=sys.stderr)
        return 2
    meta = extract(video, Path(a.out_dir), a.fps, a.all, a.width)
    if not meta:
        print("ffmpeg produced no frames", file=sys.stderr)
        return 1
    print(f"{meta['count']} frames, {meta['width']}x{meta['height']}, {meta['fps']} fps -> {a.out_dir}/frames.json")
    return 0


if __name__ == "__main__":
    sys.exit(main())
