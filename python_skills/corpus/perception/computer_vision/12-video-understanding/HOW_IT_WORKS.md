# How it works: Video Understanding — Temporal Modeling

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def sample_uniform(num_frames_total, T)`](main.py#L7)
- [`def sample_dense(num_frames_total, T, rng)`](main.py#L16)
- [`class FramePool`](main.py#L26)
  - [`def forward(self, x)`](main.py#L34)
- [`def inflate_2d_to_3d(conv2d, time_kernel)`](main.py#L42)
- [`class Conv2Plus1D`](main.py#L63)
  - [`def forward(self, x)`](main.py#L79)
- [`def main()`](main.py#L83)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
