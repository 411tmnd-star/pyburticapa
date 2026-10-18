# How it works: Vision-Language Pretraining

## `code/main.py`

```text
Vision-language pretraining: contrastive InfoNCE plus language modeling.

The model combines a small ViT encoder (lesson 59), a two-layer projection
(lesson 60), and a cross-attention decoder (lesson 61). Training runs for 50
steps over a synthetic 200-pair mock corpus. Both contrastive and LM losses
share gradients through the encoder and projection.

Run with: python3 main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def _load_module(name, path)`](code/main.py#L30)
- [`class PretrainConfig`](code/main.py#L58)
- [`def info_nce_loss(image_emb, text_emb, log_tau)`](code/main.py#L73): Bidirectional InfoNCE used in CLIP and friends.
- [`def lm_loss(logits, target_ids, padding_id)`](code/main.py#L98): Next-token cross-entropy with padding masked.
- [`class TextSideEncoder`](code/main.py#L114): Tiny text encoder: embedding lookup + mean pool over non-padding tokens.
  - [`def forward(self, ids)`](code/main.py#L121)
- [`class MultimodalModel`](code/main.py#L130): Encoder + projection + text side + cross-attention decoder, all trainable.
  - [`def encode_image(self, images)`](code/main.py#L163)
  - [`def caption_logits(self, memory, text_ids)`](code/main.py#L167)
  - [`def forward(self, images, text_ids)`](code/main.py#L170)
- [`def make_mock_corpus(seed, n_pairs, vocab_size, max_len)`](code/main.py#L192): Build a deterministic mock corpus of n_pairs synthetic image-caption pairs.
- [`def sample_batch(pairs, indices)`](code/main.py#L222)
- [`def train(cfg)`](code/main.py#L229)
- [`def main()`](code/main.py#L263)

## `code/test_main.py`

```text
Unit tests for vision-language pretraining.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def small_cfg(steps)`](code/test_main.py#L21)
- [`class TestInfoNCE`](code/test_main.py#L36)
  - [`def test_zero_loss_on_perfect_diagonal(self)`](code/test_main.py#L37)
  - [`def test_symmetric_across_directions(self)`](code/test_main.py#L45)
  - [`def test_shape_mismatch_raises(self)`](code/test_main.py#L55)
- [`class TestLMLoss`](code/test_main.py#L60)
  - [`def test_pad_positions_excluded(self)`](code/test_main.py#L61)
- [`class TestModel`](code/test_main.py#L73)
  - [`def test_forward_returns_two_losses(self)`](code/test_main.py#L74)
  - [`def test_training_reduces_total_loss(self)`](code/test_main.py#L84)
- [`class TestCorpus`](code/test_main.py#L113)
  - [`def test_make_mock_corpus_shapes(self)`](code/test_main.py#L114)

## Run and test

From this folder:

```
python code/main.py
python code/test_main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
