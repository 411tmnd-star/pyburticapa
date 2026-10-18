# How it works: Multi-Object Tracking & Video Memory

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def bbox_iou(a, b)`](main.py#L5)
- [`class Track`](main.py#L19)
  - [`def update(self, bbox, frame)`](main.py#L26)
- [`class SimpleTracker`](main.py#L32)
  - [`def step(self, detections, frame)`](main.py#L39)
- [`def synthetic_frames(num_frames, num_objects, H, W, seed, drop_prob)`](main.py#L70)
- [`def count_id_switches(tracks_per_frame, gt_per_frame)`](main.py#L94)
- [`def main()`](main.py#L113)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
