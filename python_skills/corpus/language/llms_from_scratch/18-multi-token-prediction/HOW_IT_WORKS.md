# How it works: Multi-Token Prediction (MTP)

## `code/main.py`

```text
DeepSeek-V3 Multi-Token Prediction (MTP) module — stdlib Python.

Implements:
  - shared embedding table (used by main model and every MTP module)
  - per-depth MTP module: projection + 1-block transformer + shared head
  - joint MTP loss across depths
  - parameter-count accounting (per module, shared, total)
  - a toy sequential evaluation that matches DeepSeek-V3's Section 2.2 equations

Pedagogical: single-head linear-projection attention, element-wise SwiGLU.
The goal is to show the structure of the MTP module, not to train a real LLM.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def rand_matrix(rows, cols, rng, scale)`](code/main.py#L22)
- [`def matvec(M, v)`](code/main.py#L27)
- [`def add(a, b)`](code/main.py#L34)
- [`def rms_norm(v, eps)`](code/main.py#L38)
- [`def silu(x)`](code/main.py#L44)
- [`def swiglu(v, W_gate, W_up, W_down)`](code/main.py#L48)
- [`def softmax(row)`](code/main.py#L56)
- [`class MTPModule`](code/main.py#L64): A single depth-k MTP module.
- [`def make_mtp_module(hidden, ff, rng)`](code/main.py#L82)
- [`def attention_single(v_in, Wq, Wk, Wv, Wo)`](code/main.py#L96): One-token self-attention stand-in. For a full sequence you would
- [`def mtp_forward(prev_hidden, next_embed, module)`](code/main.py#L110): Equation from DeepSeek-V3 Section 2.2:
- [`def shared_head_logits(hidden, E)`](code/main.py#L126): Tied LM head: reuse the embedding table transposed. logits[v] = E_v . hidden.
- [`def cross_entropy(logits, target)`](code/main.py#L132)
- [`def mtp_loss(backbone_hidden, tokens, modules, E, lam)`](code/main.py#L137): Compute joint MTP loss over D depths.
- [`class ParamReport`](code/main.py#L165)
- [`def count_parameters(vocab, hidden, ff, n_layers, D)`](code/main.py#L176)
- [`def fmt(n)`](code/main.py#L192)
- [`def main()`](code/main.py#L202)

## Run and test

From this folder:

```
python code/main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
