# How it works: Inference Optimization

## `code/main.py`

Functions and classes, in file order (click to jump to the line):

- [`class KVCache`](code/main.py#L5)
  - [`def update(self, layer_idx, new_keys, new_values)`](code/main.py#L21)
  - [`def advance(self, num_tokens)`](code/main.py#L31)
  - [`def memory_bytes(self)`](code/main.py#L34)
  - [`def used_bytes(self)`](code/main.py#L37)
- [`def scaled_dot_product_attention(query, keys, values)`](code/main.py#L42)
- [`class MultiHeadAttention`](code/main.py#L56)
  - [`def forward(self, x, kv_cache, layer_idx)`](code/main.py#L66)
- [`class Request`](code/main.py#L84)
  - [`def is_done(self)`](code/main.py#L94)
- [`def simulate_static_batching(requests, batch_size)`](code/main.py#L98)
- [`def simulate_continuous_batching(requests, batch_size)`](code/main.py#L122)
- [`def batching_stats(completed)`](code/main.py#L164)
- [`class TrieNode`](code/main.py#L177)
- [`class PrefixCache`](code/main.py#L184)
  - [`def _walk(self, token_ids)`](code/main.py#L192)
  - [`def lookup(self, token_ids)`](code/main.py#L202)
  - [`def insert(self, token_ids, kv_per_token)`](code/main.py#L220)
  - [`def hit_rate(self)`](code/main.py#L233)
- [`class DraftModel`](code/main.py#L238)
  - [`def generate(self, context, num_tokens)`](code/main.py#L243)
  - [`def get_probs(self, context, token)`](code/main.py#L246)
- [`class TargetModel`](code/main.py#L250)
  - [`def get_probs(self, context, tokens)`](code/main.py#L254)
- [`def speculative_decode(draft_model, target_model, context, num_speculative, draft_cost, target_cost, verify_cost)`](code/main.py#L260)
- [`def kv_cache_memory(config, seq_len, dtype_bytes)`](code/main.py#L335)
- [`def memory_budget(config, gpu_memory_gb, model_dtype_bytes, kv_dtype_bytes)`](code/main.py#L347)

## Run and test

From this folder:

```
python code/main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
