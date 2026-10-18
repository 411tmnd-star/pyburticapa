# How it works: DeepSeek-V3 Architecture Walkthrough

## `code/main.py`

```text
DeepSeek-V3 architecture calculator — stdlib Python.

Given the DeepSeek-V3 config, computes:
  - total parameter count by component
  - active parameter count per forward (MoE sparse)
  - KV cache at 128k context (MLA vs GQA hypothetical)
  - per-layer breakdown (attention / MLP / experts / router / norms)

Also runs what-if variants: rank 256 MLA, 512 experts, top-16 routing. The
goal is reading-a-config-becomes-reading-the-architecture. Same style as the
Phase 10 · 14 calculator, specialized to DeepSeek-V3's full detail.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class ComponentParams`](code/main.py#L42)
- [`def mla_attention_params(hidden, n_heads, head_dim, kv_lora, q_lora)`](code/main.py#L54): MLA attention parameter count.
- [`def swiglu_mlp_params(hidden, ff)`](code/main.py#L72)
- [`def router_params(hidden, n_experts)`](code/main.py#L76)
- [`def rmsnorm_params(hidden)`](code/main.py#L80)
- [`def mtp_module_params(hidden, ff)`](code/main.py#L84): Per DeepSeek paper Section 2.2: projection M_k (2h x h) + transformer
- [`def compute_components(cfg)`](code/main.py#L95)
- [`class ArchReport`](code/main.py#L129)
- [`def compute_totals(cfg, ctx)`](code/main.py#L141)
- [`def fmt(n)`](code/main.py#L194)
- [`def fmt_bytes(b)`](code/main.py#L204)
- [`def print_report(name, cfg, ctx)`](code/main.py#L212)
- [`def main()`](code/main.py#L230)

## Run and test

From this folder:

```
python code/main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
