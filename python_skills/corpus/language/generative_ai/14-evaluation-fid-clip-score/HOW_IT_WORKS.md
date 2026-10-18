# How it works: Evaluation — FID, CLIP Score, Human Preference

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def mean_vec(vectors)`](main.py#L5)
- [`def covariance(vectors, mu)`](main.py#L11)
- [`def trace(M)`](main.py#L22)
- [`def matmul(A, B)`](main.py#L26)
- [`def jacobi_sqrt(M, iters)`](main.py#L38): Matrix square root by Denman-Beavers iteration (stable for PSD M).
- [`def inverse(M)`](main.py#L51)
- [`def fid(real_features, gen_features)`](main.py#L73)
- [`def clip_like(a, b)`](main.py#L84)
- [`def elo_update(r_a, r_b, winner, k)`](main.py#L91)
- [`def make_features(center, n, d, rng, scale)`](main.py#L98)
- [`def main()`](main.py#L102)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
