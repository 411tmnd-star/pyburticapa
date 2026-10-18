# How it works: Cross-Attention Fusion

## `code/main.py`

```text
Cross-attention fusion for a vision-language decoder.

The decoder block runs:
  1. causal self-attention over text tokens
  2. cross-attention with queries from text and keys/values from image memory
  3. feed-forward MLP

Mask discipline:
  - self-attention uses a (Nt, Nt) lower-triangular causal mask
  - cross-attention uses no mask; the whole image is visible to every text
    position

Run with: python3 main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class DecoderConfig`](code/main.py#L27)
  - [`def head_dim(self)`](code/main.py#L39)
- [`def causal_mask(length)`](code/main.py#L45): Lower-triangular boolean mask of shape (length, length).
- [`class CausalSelfAttention`](code/main.py#L53)
  - [`def forward(self, x, mask)`](code/main.py#L62)
- [`class CrossAttention`](code/main.py#L80): Multi-head cross-attention.
  - [`def project_memory(self, memory)`](code/main.py#L97)
  - [`def forward(self, x, memory, kv_cache)`](code/main.py#L105)
- [`class FeedForward`](code/main.py#L135)
  - [`def forward(self, x)`](code/main.py#L142)
- [`class DecoderBlock`](code/main.py#L146)
  - [`def forward(self, x, memory, text_mask, kv_cache)`](code/main.py#L156)
- [`class VisionLanguageDecoder`](code/main.py#L166)
  - [`def build_kv_cache(self, memory)`](code/main.py#L176)
  - [`def forward(self, text_ids, memory, use_cache)`](code/main.py#L183)
- [`def synth_memory(batch, n_tokens, dim, seed)`](code/main.py#L205)
- [`def synth_text(batch, length, vocab, seed)`](code/main.py#L210)
- [`def main()`](code/main.py#L215)

## `code/test_main.py`

```text
Unit tests for cross-attention fusion.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def small_cfg()`](code/test_main.py#L21)
- [`class TestCausalMask`](code/test_main.py#L34)
  - [`def test_shape(self)`](code/test_main.py#L35)
  - [`def test_lower_triangular(self)`](code/test_main.py#L40)
- [`class TestCrossAttention`](code/test_main.py#L46)
  - [`def test_output_shape_independent_of_key_length(self)`](code/test_main.py#L47)
  - [`def test_kv_cache_matches_uncached(self)`](code/test_main.py#L58)
  - [`def test_batch_mismatch_raises(self)`](code/test_main.py#L70)
- [`class TestSelfAttention`](code/test_main.py#L79)
  - [`def test_rejects_wrong_mask_shape(self)`](code/test_main.py#L80)
- [`class TestDecoder`](code/test_main.py#L89)
  - [`def test_forward_shape(self)`](code/test_main.py#L90)
  - [`def test_cache_path_matches(self)`](code/test_main.py#L99)
  - [`def test_rejects_too_long_input(self)`](code/test_main.py#L110)

## Run and test

From this folder:

```
python code/main.py
python code/test_main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
