# How it works: Self-Attention from Scratch

## `self_attention.py`

Functions and classes, in file order (click to jump to the line):

- [`def softmax(x)`](self_attention.py#L4)
- [`def scaled_dot_product_attention(Q, K, V)`](self_attention.py#L10)
- [`class SelfAttention`](self_attention.py#L18)
  - [`def forward(self, X)`](self_attention.py#L28)
- [`class MultiHeadSelfAttention`](self_attention.py#L35)
  - [`def forward(self, X)`](self_attention.py#L49)
- [`def print_attention_matrix(weights, tokens)`](self_attention.py#L61)
- [`def ascii_heatmap(weights, tokens, chars)`](self_attention.py#L73)

## Run and test

From this folder:

```
python self_attention.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
