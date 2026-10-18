# How it works: Differential Attention (V2)

## `code/main.py`

```text
Differential attention (Ye et al., ICLR 2025) in stdlib Python.

Builds two softmax maps from split Q, K, subtracts the second from the first
scaled by a learned lambda, multiplies by V. Measures the signal-to-noise
ratio of the resulting attention weights on a synthetic long-context query
and compares to standard softmax attention. Also prints the parameter-count
diff for DIFF V1 and DIFF V2 against a baseline Transformer.

Pure stdlib. No numpy, no torch.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def dot(a, b)`](code/main.py#L20)
- [`def softmax_row(row)`](code/main.py#L24)
- [`def standard_attention(Q, K, V)`](code/main.py#L31)
- [`def diff_attention(Q1, K1, Q2, K2, V, lam)`](code/main.py#L47): Differential attention:
- [`def random_projection(d_in, d_out, rng)`](code/main.py#L72): d_in x d_out projection matrix with unit-variance columns.
- [`def matmul(X, W)`](code/main.py#L79)
- [`def build_signal_plus_noise(n_tokens, signal_pos, d_embed, noise_scale, rng)`](code/main.py#L88): Return an input embedding sequence X[n_tokens][d_embed] and a query
- [`def snr(weights_row, signal_pos)`](code/main.py#L113)
- [`class ParamDiff`](code/main.py#L123)
- [`def attention_params_baseline(hidden)`](code/main.py#L131)
- [`def attention_params_diff_v1(hidden, n_heads, d_head)`](code/main.py#L135)
- [`def attention_params_diff_v2(hidden, n_heads, d_head, kv_heads)`](code/main.py#L144)
- [`def compute_param_diff(hidden, n_heads, kv_heads)`](code/main.py#L154)
- [`def fmt_m(n)`](code/main.py#L168)
- [`def main()`](code/main.py#L176)

## Run and test

From this folder:

```
python code/main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
