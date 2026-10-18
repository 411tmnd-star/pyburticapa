# How it works: Multi-Head Self-Attention

## `main.py`

```text
Multi-head self-attention with causal mask, single QKV projection, and
weight inspection.

The demo trains a tiny model (attention + token/positional embeddings + LM head)
on a copy task and prints the loss curve plus a per-head attention heatmap.

Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class MultiHeadSelfAttention`](main.py#L20): Multi-head self-attention with a single QKV linear and a causal mask.
  - [`def _split_heads(self, x)`](main.py#L55)
  - [`def _merge_heads(self, x)`](main.py#L59)
  - [`def forward(self, x, return_weights)`](main.py#L63)
- [`class TokenEmbedding`](main.py#L101): Vocab id to vector lookup (compact copy of lesson 32).
  - [`def forward(self, ids)`](main.py#L110)
- [`class SinusoidalPositionalEmbedding`](main.py#L114): Parameter-free sin/cos positional table (compact copy of lesson 32).
  - [`def forward(self, seq_len)`](main.py#L135)
- [`class TinyAttentionLM`](main.py#L145): Embedding + attention + LM head. Just enough to train a copy task.
  - [`def forward(self, ids, return_weights)`](main.py#L165)
- [`class DemoConfig`](main.py#L184)
- [`def _make_repeat_batch(cfg, generator)`](main.py#L196): Repeat task. Pick a random id per row, repeat it across the row.
- [`def _train(model, cfg)`](main.py#L209)
- [`def _print_section(title)`](main.py#L230)
- [`def _heatmap_row(row, width)`](main.py#L235)
- [`def main()`](main.py#L244)

## Run and test

From this folder:

```
python main.py
python -m unittest discover -s tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
