# How it works: KV Cache, Flash Attention & Inference Optimization

## `main.py`

```text
KV cache + tiled (Flash-style) attention in pure stdlib.

Shows:
- naive O(N^2) incremental decoder vs KV-cached O(N) decoder
- running-max softmax that yields bit-identical output tile-by-tile
- KV cache size math for realistic 2026 models
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def dot(a, b)`](main.py#L13)
- [`def softmax(xs)`](main.py#L17)
- [`def attention_full(q, Ks, Vs)`](main.py#L24): Single-query attention against full lists of keys and values.
- [`def tiled_softmax_dot(q, Ks, Vs, tile)`](main.py#L35): Flash-attention-style incremental softmax(qK^T)V with tile size `tile`.
- [`class KVCache`](main.py#L59)
  - [`def append(self, k, v)`](main.py#L64)
- [`def decode_naive(all_K, all_V, all_queries)`](main.py#L72): Recompute attention over the full prefix at every step.
- [`def decode_cached(all_K, all_V, all_queries)`](main.py#L87): KV cache: each new step appends one K,V and queries against the cache.
- [`def kv_cache_bytes(N, n_layers, n_heads_kv, d_head, dtype)`](main.py#L100): Total KV cache bytes. dtype=2 for fp16/bf16, 1 for int8, 4 for fp32.
- [`def main()`](main.py#L105)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
