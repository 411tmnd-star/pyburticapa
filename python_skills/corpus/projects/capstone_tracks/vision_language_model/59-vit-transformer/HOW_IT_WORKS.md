# How it works: Vision Transformer Encoder

## `code/main.py`

```text
Vision Transformer encoder built on the patch front end from lesson 58.

Twelve pre-LN blocks, twelve heads, GELU feed-forward with 4x expansion. The
encoder consumes a 224x224x3 fixture image, returns the contextual token
sequence, and exposes the CLS pooled vector for downstream heads.

Run with: python3 main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def _load_front_end_module()`](code/main.py#L26)
- [`class ViTConfig`](code/main.py#L49)
  - [`def head_dim(self)`](code/main.py#L60)
  - [`def front_end_config(self)`](code/main.py#L65)
- [`class MultiHeadSelfAttention`](code/main.py#L74)
  - [`def forward(self, x, store_attn)`](code/main.py#L84)
- [`class FeedForward`](code/main.py#L106)
  - [`def forward(self, x)`](code/main.py#L114)
- [`class Block`](code/main.py#L122)
  - [`def forward(self, x, store_attn)`](code/main.py#L130)
- [`class ViT`](code/main.py#L136)
  - [`def forward(self, x, store_attn)`](code/main.py#L143)
- [`class VisionEncoder`](code/main.py#L149): Full encoder: patch front end + ViT stack.
  - [`def forward(self, x, store_attn)`](code/main.py#L162)
- [`def count_params(module)`](code/main.py#L169)
- [`def main()`](code/main.py#L173)

## `code/test_main.py`

```text
Unit tests for the Vision Transformer encoder.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def small_cfg()`](code/test_main.py#L19)
- [`class TestSubLayers`](code/test_main.py#L23)
  - [`def test_attention_preserves_shape(self)`](code/test_main.py#L24)
  - [`def test_attention_rows_sum_to_one(self)`](code/test_main.py#L31)
  - [`def test_feed_forward_expansion(self)`](code/test_main.py#L41)
- [`class TestBlock`](code/test_main.py#L48)
  - [`def test_block_residual_wired(self)`](code/test_main.py#L49)
- [`class TestViTStack`](code/test_main.py#L60)
  - [`def test_full_stack_shape(self)`](code/test_main.py#L61)
  - [`def test_gradient_reaches_patch_projection(self)`](code/test_main.py#L71)
- [`class TestEncoderConfig`](code/test_main.py#L83)
  - [`def test_head_dim_divides(self)`](code/test_main.py#L84)
  - [`def test_invalid_head_dim_rejected(self)`](code/test_main.py#L88)

## Run and test

From this folder:

```
python code/main.py
python code/test_main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
