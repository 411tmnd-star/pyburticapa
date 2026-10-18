# How it works: Jamba — Hybrid SSM-Transformer

## `code/main.py`

```text
Jamba / Mamba-3 memory calculator — stdlib Python.

Computes KV cache, SSM state, and total attention-layer memory for a range
of hybrid configurations: pure Transformer, Jamba 1:7, 1:3, 1:15, and pure
SSM. Prints the comparison at 8k, 64k, 128k, 256k context.

Numbers are illustrative, not exact production memory budgets. The point is
to show why the hybrid ratio matters and where Jamba's 256k-on-80GB claim
comes from.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class HybridConfig`](code/main.py#L22)
- [`def kv_cache_bytes(cfg, ctx, bytes_per_elem)`](code/main.py#L33)
- [`def ssm_state_bytes(cfg, bytes_per_elem)`](code/main.py#L38)
- [`def fmt_bytes(b)`](code/main.py#L43)
- [`def main()`](code/main.py#L51)

## Run and test

From this folder:

```
python code/main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
