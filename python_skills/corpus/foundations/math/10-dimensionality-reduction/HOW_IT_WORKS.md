# How it works: Dimensionality Reduction

## `dim_reduction.py`

Functions and classes, in file order (click to jump to the line):

- [`class PCA`](dim_reduction.py#L4)
  - [`def fit(self, X)`](dim_reduction.py#L12)
  - [`def transform(self, X)`](dim_reduction.py#L31)
  - [`def fit_transform(self, X)`](dim_reduction.py#L35)
  - [`def inverse_transform(self, X_reduced)`](dim_reduction.py#L39)
- [`def demo_synthetic()`](dim_reduction.py#L43)
- [`def demo_mnist()`](dim_reduction.py#L72)
- [`def demo_sklearn_comparison(X, X_ours)`](dim_reduction.py#L103)
- [`def demo_tsne(X, y)`](dim_reduction.py#L124)
- [`def demo_umap(X, y)`](dim_reduction.py#L142)
- [`def demo_pca_preprocessing(X, y)`](dim_reduction.py#L164)
- [`def kernel_pca(X, n_components, kernel, gamma)`](dim_reduction.py#L197)
- [`def reconstruction_error(X, X_reconstructed)`](dim_reduction.py#L227)
- [`def demo_kernel_pca()`](dim_reduction.py#L231)
- [`def demo_reconstruction_error()`](dim_reduction.py#L285)

## Run and test

From this folder:

```
python dim_reduction.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
