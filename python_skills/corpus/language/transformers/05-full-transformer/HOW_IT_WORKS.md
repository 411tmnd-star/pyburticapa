# How it works: The Full Transformer — Encoder + Decoder

## `main.py`

```text
The full transformer: encoder + decoder blocks in pure stdlib.

Demonstrates:
- LayerNorm vs RMSNorm
- ReLU-FFN vs SwiGLU FFN
- encoder block (bidirectional) vs decoder block (causal + cross-attn)
- pre-norm wiring (2026 default)
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Matrix`](main.py#L15)
  - [`def get(self, i, j)`](main.py#L23)
  - [`def set(self, i, j, v)`](main.py#L26)
  - [`def row(self, i)`](main.py#L29)
  - [`def copy(self)`](main.py#L32)
- [`def randn(rows, cols, rng, scale)`](main.py#L36)
- [`def matmul(A, B)`](main.py#L45)
- [`def transpose(A)`](main.py#L59)
- [`def add(A, B)`](main.py#L67)
- [`def softmax_rows(A, mask)`](main.py#L72)
- [`def layer_norm(X, eps)`](main.py#L86)
- [`def rms_norm(X, eps)`](main.py#L98)
- [`def silu(x)`](main.py#L108)
- [`def ffn_swiglu(X, W1, W2, W3)`](main.py#L112)
- [`def ffn_relu(X, W1, W2)`](main.py#L121)
- [`def scaled_dot_product_attention(Q, K, V, causal)`](main.py#L129)
- [`def multi_head_attention(X, Wq, Wk, Wv, Wo, n_heads, causal, kv_source)`](main.py#L142)
- [`class BlockParams`](main.py#L162): All weights for one encoder or decoder block.
- [`def encoder_block(x, p)`](main.py#L187)
- [`def decoder_block(x, enc_out, p)`](main.py#L198)
- [`def main()`](main.py#L213)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
