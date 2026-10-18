# How it works: 3D Vision — Point Clouds & NeRFs

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`class PointNet`](main.py#L6)
  - [`def forward(self, x)`](main.py#L25)
- [`def positional_encoding(x, L)`](main.py#L32)
- [`class TinyNeRF`](main.py#L39)
  - [`def forward(self, x, d)`](main.py#L58)
- [`def volumetric_render(sigma, rgb, t_vals)`](main.py#L67)
- [`def permutation_invariance_check()`](main.py#L80)
- [`def main()`](main.py#L91)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
