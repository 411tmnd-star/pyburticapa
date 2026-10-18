# How it works: Any-Resolution Vision: Patch-n'-Pack and NaFlex

## `main.py`

```text
Patch-n'-pack for variable-resolution vision transformer batches — stdlib.

Given a batch of (H, W) image sizes at patch P, computes:
  - per-image patch grid (H/P, W/P) and sequence length n_i = (H/P)(W/P)
  - packed total length N = sum(n_i)
  - block-diagonal attention mask (dense, N x N)
  - AnyRes tiling cost (tile + thumbnail) for comparison
  - square-resize cost (fixed sequence length) for comparison

Prints a budget table for a realistic workload: receipt, chart, screenshot, photo.
No numpy, no torch — bytes-per-cell math stays transparent.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Image`](main.py#L20)
  - [`def grid(self, p)`](main.py#L25)
  - [`def seq(self, p)`](main.py#L28)
- [`class PackResult`](main.py#L34)
- [`def pack_batch(images, patch)`](main.py#L42)
- [`def build_dense_mask(pack)`](main.py#L52)
- [`def anyres_cost(img, tile, thumb)`](main.py#L64)
- [`def square_cost(img, side, patch)`](main.py#L92)
- [`def fmt(n)`](main.py#L97)
- [`def demo_toy_pack()`](main.py#L105)
- [`def budget_table(workload)`](main.py#L124)
- [`def main()`](main.py#L150)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
