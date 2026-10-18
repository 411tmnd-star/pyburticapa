# How it works: Transformer Block from Scratch

## `code/main.py`

```text
Transformer block from scratch: LayerNorm, multi head causal attention, residual, MLP, residual.

Implements both pre-LN and post-LN configurations behind a single flag. The demo
builds a six layer stack of each, sends a single forward and backward pass through,
and prints the gradient norm at the input embedding for each variant. The pre-LN
stack carries an order of magnitude larger gradient at the embedding than the
post-LN stack at identical learning rate, which is the mechanism that lets
modern decoder LLMs train without a warmup schedule.

Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class BlockConfig`](code/main.py#L24): Hyperparameters shared across attention, MLP, and the wrapping block.
- [`class LayerNorm`](code/main.py#L37): Layer normalization with learnable scale and shift.
  - [`def forward(self, x)`](code/main.py#L51)
- [`class MultiHeadAttention`](code/main.py#L57): Multi head causal self attention with a fused QKV projection.
  - [`def forward(self, x)`](code/main.py#L87)
- [`class FeedForward`](code/main.py#L114): Position wise MLP. No token mixing happens here; all of that lives in attention.
  - [`def forward(self, x)`](code/main.py#L125)
- [`class TransformerBlock`](code/main.py#L133): One transformer block. Toggle pre_ln to switch between configurations.
  - [`def forward(self, x)`](code/main.py#L152)
- [`class BlockStack`](code/main.py#L162): A small stack used by the demo. The lesson 35 GPT uses the same pattern with twelve blocks.
  - [`def forward(self, tokens)`](code/main.py#L171)
- [`def gradient_norm_at_embedding(stack, tokens)`](code/main.py#L179): Send one forward and one backward through the stack, return the embedding gradient norm.
- [`def _set_eval_mode(stack)`](code/main.py#L195): Disable dropout so the comparison between pre-LN and post-LN is deterministic.
- [`def demo()`](code/main.py#L200)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
