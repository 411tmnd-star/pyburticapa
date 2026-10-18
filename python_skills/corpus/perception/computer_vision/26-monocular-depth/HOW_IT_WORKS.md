# How it works: Monocular Depth & Geometry Estimation

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def abs_rel_error(pred, target, mask)`](main.py#L8)
- [`def delta_accuracy(pred, target, threshold, mask)`](main.py#L15)
- [`def align_scale_shift(pred, target, mask)`](main.py#L23)
- [`def depth_to_point_cloud(depth, intrinsics)`](main.py#L36)
- [`def synthetic_depth(size)`](main.py#L46)
- [`def write_ply(path, points, colors)`](main.py#L54)
- [`def main()`](main.py#L76)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
