# How it works: Mixture of Experts (MoE)

## `main.py`

```text
Mixture of Experts (MoE) in pure stdlib.

Implements:
- top-k router with softmax gating
- auxiliary-loss-free bias update (DeepSeek-V3)
- expert-usage tracking over many tokens
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def silu(x)`](main.py#L13)
- [`def make_expert(d_in, d_hidden, rng)`](main.py#L17): Tiny 'expert': input -> silu -> output. Linear for illustration.
- [`def apply_expert(x, W)`](main.py#L24)
- [`def route(hidden, W_router, top_k, bias)`](main.py#L35): Return (top-k expert indices, gate weights over those experts).
- [`def moe_layer_forward(x, experts, W_router, top_k, bias)`](main.py#L53): Compute MoE output for a single token `x`. Returns output vector.
- [`def update_bias(bias, usage_counts, target, gamma)`](main.py#L65): Aux-loss-free balance: nudge bias up/down based on usage vs target.
- [`def run_epoch(tokens, experts, W_router, top_k, bias)`](main.py#L75)
- [`def entropy(counts)`](main.py#L84)
- [`def dense_active_params(n_experts, expert_params, top_k, d_model)`](main.py#L92): Total params, active params per token. d_model used for attention est.
- [`def main()`](main.py#L99)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
