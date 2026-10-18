# How it works: GPT Model Assembly

## `code/main.py`

```text
Assemble the lesson 34 transformer block into a 124M parameter GPT model.

Twelve blocks, a token embedding, a learned position embedding, a final LayerNorm,
and a language model head that ties to the token embedding. Parameter count
lands on ~124M at the reference configuration. The demo also runs a tiny
configuration end to end and exercises generation with temperature, top-k, and
multinomial sampling under a sliding window context.

Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class GPTConfig`](code/main.py#L23): Reference 124M configuration matches the GPT-2 small architecture.
- [`class LayerNorm`](code/main.py#L37)
  - [`def forward(self, x)`](code/main.py#L44)
- [`class MultiHeadAttention`](code/main.py#L50)
  - [`def forward(self, x)`](code/main.py#L71)
- [`class FeedForward`](code/main.py#L94)
  - [`def forward(self, x)`](code/main.py#L103)
- [`class TransformerBlock`](code/main.py#L107): Pre-LN block. Lesson 34 explains both configurations; the GPT-2 reference is pre-LN.
  - [`def forward(self, x)`](code/main.py#L117)
- [`class GPTModel`](code/main.py#L123): A decoder only transformer language model with weight tied LM head.
  - [`def _init_weights(self, module)`](code/main.py#L145)
  - [`def _scale_residual_projections(self)`](code/main.py#L153)
  - [`def forward(self, tokens)`](code/main.py#L159)
- [`def count_parameters(model)`](code/main.py#L175): Count unique parameters. Weight tied tensors are counted once.
- [`def top_k_filter(logits, top_k)`](code/main.py#L183)
- [`def generate(model, prompt, max_new_tokens, temperature, top_k, seed)`](code/main.py#L192): Autoregressive generation with multinomial sampling, temperature, top-k.
- [`def demo()`](code/main.py#L228)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
