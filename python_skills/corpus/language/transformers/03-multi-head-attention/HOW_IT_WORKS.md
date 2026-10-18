# How it works: Multi-Head Attention

## `main.py`

```text
Multi-head attention from scratch in pure stdlib.

No numpy, no torch. A tiny Matrix class carries the ops we need.
Demonstrates: split heads, per-head scaled dot-product attention,
combine heads, output projection, and a Grouped-Query variant.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Matrix`](main.py#L13): Row-major 2D matrix of floats. Just enough ops for attention.
  - [`def get(self, i, j)`](main.py#L26)
  - [`def set(self, i, j, v)`](main.py#L29)
  - [`def row(self, i)`](main.py#L32)
- [`def randn_matrix(rows, cols, rng, scale)`](main.py#L36)
- [`def matmul(A, B)`](main.py#L45)
- [`def transpose(A)`](main.py#L60)
- [`def softmax_rows(A)`](main.py#L68)
- [`def scaled_dot_product_attention(Q, K, V)`](main.py#L80)
- [`def split_heads(X, n_heads)`](main.py#L91)
- [`def combine_heads(heads)`](main.py#L104)
- [`def multi_head_attention(X, Wq, Wk, Wv, Wo, n_heads)`](main.py#L116)
- [`def grouped_query_attention(X, Wq, Wk, Wv, Wo, n_heads, n_kv_heads)`](main.py#L133): Same as MHA but K and V have fewer heads, repeated to match Q.
- [`def print_matrix(name, M, width, prec)`](main.py#L152)
- [`def main()`](main.py#L159)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
