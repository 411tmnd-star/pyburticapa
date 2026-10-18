# How it works: Singular Value Decomposition

## `svd.py`

Functions and classes, in file order (click to jump to the line):

- [`def power_iteration(M, num_iters, tol)`](svd.py#L4)
- [`def svd_from_scratch(A, k)`](svd.py#L24)
- [`def truncated_svd(A, k)`](svd.py#L62)
- [`def reconstruct(U, S, Vt)`](svd.py#L67)
- [`def compression_ratio(m, n, k)`](svd.py#L71)
- [`def pseudoinverse_via_svd(A, tol)`](svd.py#L77)
- [`def demo_svd_basics()`](svd.py#L83)
- [`def demo_geometry()`](svd.py#L120)
- [`def demo_low_rank_approximation()`](svd.py#L161)
- [`def demo_image_compression()`](svd.py#L192)
- [`def demo_recommendation_system()`](svd.py#L234)
- [`def demo_lsa()`](svd.py#L299)
- [`def demo_noise_reduction()`](svd.py#L368)
- [`def demo_pseudoinverse()`](svd.py#L418)
- [`def demo_condition_number()`](svd.py#L485)
- [`def demo_pca_is_svd()`](svd.py#L526)
- [`def demo_matrix_properties()`](svd.py#L590)

## Run and test

From this folder:

```
python svd.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
