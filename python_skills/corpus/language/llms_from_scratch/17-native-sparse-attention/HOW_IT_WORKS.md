# How it works: Native Sparse Attention (DeepSeek NSA)

## `code/main.py`

```text
Native Sparse Attention (DeepSeek NSA) in stdlib Python.

Implements the three parallel branches from Yuan et al. 2025:
  - compressed branch: coarse-grained attention over block-averaged keys
  - selected branch: fine-grained attention over top-k uncompressed blocks
  - sliding-window branch: attention over the last W tokens

Combines them with a gate and prints the per-query key count for each branch
vs. full attention. Scales the key-count report to 64k and 128k contexts to
show the long-sequence savings NSA targets.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def dot(a, b)`](code/main.py#L21)
- [`def softmax(row)`](code/main.py#L25)
- [`def attention(q, K, V)`](code/main.py#L32): Returns (weights, output).
- [`def compress_mean(K, l)`](code/main.py#L44): Collapse every l consecutive keys into their mean. Real NSA uses a
- [`def top_k_blocks(scores, k)`](code/main.py#L59)
- [`def fine_grained_keys(K, V, l, block_indices)`](code/main.py#L64): Load the raw (uncompressed) tokens from the selected blocks.
- [`def sliding_window(K, V, W)`](code/main.py#L75)
- [`def gate(q, Wg)`](code/main.py#L82): Gate MLP: 1-layer linear + sigmoid, produces 3 branch weights.
- [`class NSAConfig`](code/main.py#L89)
- [`def nsa_step(q, K, V, Wg, cfg)`](code/main.py#L95)
- [`def synthesize_sequence(n, d, signal_blocks, l, rng)`](code/main.py#L127): Build K, V where `signal_blocks` carry a shared pattern and the query
- [`def count_full_attention(N)`](code/main.py#L144)
- [`def count_nsa(N, l, k, W)`](code/main.py#L148)
- [`def main()`](code/main.py#L152)

## Run and test

From this folder:

```
python code/main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
