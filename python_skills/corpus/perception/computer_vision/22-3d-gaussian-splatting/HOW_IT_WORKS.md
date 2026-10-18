# How it works: 3D Gaussian Splatting from Scratch

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def eval_2d_gaussian(means, covs, points)`](main.py#L8)
- [`def rasterise_2d(means, covs, colours, opacities, depths, image_size)`](main.py#L19)
- [`class Splats2D`](main.py#L45)
  - [`def covs(self)`](main.py#L57)
  - [`def forward(self, image_size)`](main.py#L67)
- [`def make_target(size)`](main.py#L74)
- [`def sh_degree_3_basis(dirs)`](main.py#L84)
- [`def eval_sh_degree_3(sh_coeffs, dirs)`](main.py#L108)
- [`def main()`](main.py#L113)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
