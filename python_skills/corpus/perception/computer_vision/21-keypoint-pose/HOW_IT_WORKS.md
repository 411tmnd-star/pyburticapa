# How it works: Keypoint Detection & Pose Estimation

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def gaussian_heatmap(size, cx, cy, sigma)`](main.py#L7)
- [`class TinyKeypointNet`](main.py#L12)
  - [`def forward(self, x)`](main.py#L21)
- [`def heatmap_to_coords(heatmaps)`](main.py#L29)
- [`def subpixel_refine(heatmaps)`](main.py#L38)
- [`def make_synthetic_sample(size, rng)`](main.py#L54)
- [`def main()`](main.py#L64)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
