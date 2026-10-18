# How it works: Attention Variants — Sliding Window, Sparse, Differential

## `main.py`

```text
Attention variants: full, sliding-window, local+strided sparse, differential.

Pure stdlib. We compare the structure of the score mask and the KV cache
size per variant at a realistic long-context budget.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def causal_mask(n)`](main.py#L13)
- [`def swa_mask(n, window)`](main.py#L21)
- [`def strided_mask(n, window, stride)`](main.py#L30)
- [`def count_nonmasked(M)`](main.py#L41)
- [`def render(M, label)`](main.py#L45)
- [`def softmax(xs)`](main.py#L54)
- [`def attention_row(q, Ks, Vs, mask_row)`](main.py#L61)
- [`def diff_attention_row(q1, q2, K1, K2, V, mask_row, lam)`](main.py#L90)
- [`def kv_cache_bytes(n_layers, n_kv_heads, d_head, seq_len, dtype_bytes)`](main.py#L102)
- [`def main()`](main.py#L106)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
