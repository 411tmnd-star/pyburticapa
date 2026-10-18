# How it works: World Models & Video Diffusion

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`class VideoPatch3D`](main.py#L6)
  - [`def forward(self, x)`](main.py#L15)
- [`class DividedAttentionBlock`](main.py#L22)
  - [`def forward(self, x, grid)`](main.py#L32)
- [`class TinyVideoDiT`](main.py#L48)
  - [`def forward(self, x)`](main.py#L57)
- [`def count_tokens(T, H, W, p_t, p_h, p_w)`](main.py#L64)
- [`def main()`](main.py#L68)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
