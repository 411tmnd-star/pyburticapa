# How it works: Open Models: Architecture Walkthroughs

## `code/main.py`

```text
Architecture calculator for open LLMs.

Given a HuggingFace-style config dict, compute parameter counts by component,
KV cache at max context, MLP ratio, and a verdict on the architecture. Ships
with configs for Llama 3 8B, Mistral 7B, Mixtral 8x7B, DeepSeek V3, Qwen 2.5,
and GPT-2 Small for direct comparison.

Stdlib only. No torch, no downloads. The point is to read configs, not weights.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Breakdown`](code/main.py#L83)
- [`def attention_scheme(config)`](code/main.py#L96)
- [`def attention_params_per_layer(config)`](code/main.py#L108)
- [`def mlp_params(h, ff, activation)`](code/main.py#L122)
- [`def mlp_params_per_layer(config)`](code/main.py#L130)
- [`def layer_norm_params_per_layer(config)`](code/main.py#L138)
- [`def analyze(name, config)`](code/main.py#L145)
- [`def fmt_billions(x)`](code/main.py#L240)
- [`def fmt_bytes(b)`](code/main.py#L248)
- [`def print_breakdown(b, config)`](code/main.py#L256)
- [`def main()`](code/main.py#L270)

## Run and test

From this folder:

```
python code/main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
