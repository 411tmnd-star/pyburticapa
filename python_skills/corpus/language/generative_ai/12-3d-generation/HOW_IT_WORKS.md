# How it works: 3D Generation

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def make_target(size)`](main.py#L8): Target: a smooth bright blob in the upper-left, dimmer one in the lower-right.
- [`def init_gaussians(n, rng)`](main.py#L19)
- [`def gaussian_value(x, y, g)`](main.py#L27)
- [`def render(gaussians)`](main.py#L34)
- [`def mse(a, b)`](main.py#L43)
- [`def finite_diff_step(gaussians, target, lr, eps)`](main.py#L51)
- [`def ascii_img(img, chars)`](main.py#L72)
- [`def main()`](main.py#L82)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
