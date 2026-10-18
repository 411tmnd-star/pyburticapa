# How it works: Pre-Training a Mini GPT (124M Parameters)

## `code/main.py`

Functions and classes, in file order (click to jump to the line):

- [`class Embedding`](code/main.py#L4)
  - [`def forward(self, token_ids)`](code/main.py#L9)
- [`class LayerNorm`](code/main.py#L16)
  - [`def forward(self, x)`](code/main.py#L22)
- [`class MultiHeadAttention`](code/main.py#L28)
  - [`def forward(self, x, mask)`](code/main.py#L38)
- [`class FeedForward`](code/main.py#L55)
  - [`def forward(self, x)`](code/main.py#L62)
- [`class TransformerBlock`](code/main.py#L68)
  - [`def forward(self, x, mask)`](code/main.py#L75)
- [`class MiniGPT`](code/main.py#L81)
  - [`def forward(self, token_ids)`](code/main.py#L93)
  - [`def count_parameters(self)`](code/main.py#L105)
- [`def cross_entropy_loss(logits, targets)`](code/main.py#L120)
- [`def generate(model, prompt_tokens, max_new_tokens, temperature)`](code/main.py#L134)
- [`def layernorm_backward(dy, x, ln)`](code/main.py#L153)
- [`def ffn_backward(dy, x_in, ffn)`](code/main.py#L172)
- [`def train_mini_gpt(text, vocab_size, embed_dim, num_heads, num_layers, seq_len, num_steps, lr)`](code/main.py#L190)
- [`def parameter_breakdown()`](code/main.py#L273)
- [`def memory_estimate()`](code/main.py#L300)

## Run and test

From this folder:

```
python code/main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
