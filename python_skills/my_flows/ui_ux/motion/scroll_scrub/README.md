# Scroll scrub

A page where native scroll position is the only source of truth for which frame shows: forwards and backwards, exact. Built from one video turned into frames.

```bash
python ../../intake/frames.py your-clip.mp4 frames --fps 24 --width 1280
python -m http.server 8000        # from this folder, then open http://localhost:8000
```

`frames.py` writes `frames/f_0001.jpg …` and `frames/frames.json` (`count`, `pattern`, `pad`, `width`, `height`), which is exactly what [index.html](index.html) reads. The frames folder is not in the repo.

## Rules the page follows

- One normalised progress value from native scroll; scroll position picks the frame.
- Frames nearest the current one load first (6 parallel requests, 12 ahead); the poster stays until a real frame paints.
- Redraw only when the frame changes; canvas DPR capped at 2.
- Copy is real HTML text over the canvas, never baked into frames; it switches at set progress stops.
- `prefers-reduced-motion` removes the pinning and shows one frame.
- Every tunable lives in the `CONFIG` block at the top of the script.
