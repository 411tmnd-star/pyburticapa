# How it works: Scaling Laws

## `main.py`

```text
Scaling laws — Chinchilla loss equation, compute-optimal (N, D), over-training cost.

Pure stdlib. Validates the D/N ≈ 20 rule numerically by grid search.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def chinchilla_loss(N, D, A, B, alpha, beta, E)`](main.py#L16)
- [`def compute_optimal(C_flops, n_grid)`](main.py#L20): Find (N, D) minimizing loss subject to 6ND = C by grid search over log N.
- [`def pretty(n)`](main.py#L38): human-readable.
- [`def main()`](main.py#L46)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
