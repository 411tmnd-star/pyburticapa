# How it works: Projection Layer for Modality Alignment

## `code/main.py`

```text
Two-layer MLP projection from vision-token space to text embedding space.

The vision encoder (lessons 58 and 59) stays frozen. A frozen mock text
embedding table provides target vectors for synthetic captions. Only the
projector trains. The objective is per-pair cosine alignment.

Run with: python3 main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def _load_module(name, path)`](code/main.py#L26)
- [`class AlignConfig`](code/main.py#L49)
- [`class MLPProjector`](code/main.py#L61): Two-layer MLP, the canonical adapter shape used by LLaVA-style VLMs.
  - [`def forward(self, x)`](code/main.py#L69)
- [`class MockTextEmbedding`](code/main.py#L73): Frozen text table used as alignment targets.
  - [`def forward(self, ids)`](code/main.py#L88)
- [`def make_pair(seed, vocab_size, max_len)`](code/main.py#L98): One synthetic (image, caption_ids) pair.
- [`def cosine_alignment_loss(image_emb, text_emb)`](code/main.py#L113)
- [`def freeze(module)`](code/main.py#L124)
- [`class TrainStats`](code/main.py#L130)
- [`def train(cfg)`](code/main.py#L137)
- [`def main()`](code/main.py#L202)

## `code/test_main.py`

```text
Unit tests for the modality-alignment projection layer.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class TestProjector`](code/test_main.py#L20)
  - [`def test_output_shape(self)`](code/test_main.py#L21)
  - [`def test_gradient_flows(self)`](code/test_main.py#L27)
- [`class TestTextTable`](code/test_main.py#L37)
  - [`def test_table_is_frozen(self)`](code/test_main.py#L38)
  - [`def test_pooling_ignores_padding(self)`](code/test_main.py#L43)
- [`class TestCosineLoss`](code/test_main.py#L52)
  - [`def test_zero_loss_on_identical_vectors(self)`](code/test_main.py#L53)
  - [`def test_max_loss_on_antiparallel_vectors(self)`](code/test_main.py#L58)
- [`class TestTrainingLoop`](code/test_main.py#L64)
  - [`def test_loss_drops_over_steps(self)`](code/test_main.py#L65)
- [`def _train_small(cfg)`](code/test_main.py#L82)
- [`class TestPairFixture`](code/test_main.py#L145)
  - [`def test_make_pair_shapes(self)`](code/test_main.py#L146)

## Run and test

From this folder:

```
python code/main.py
python code/test_main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
