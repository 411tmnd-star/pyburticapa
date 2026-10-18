# How it works: Multimodal Evaluation

## `code/main.py`

```text
Multimodal evaluation: retrieval, VQA, and captioning.

Three metric surfaces:
  - Recall@K from a cosine similarity matrix between image and caption vectors
  - VQA exact match between predicted and reference answer ids
  - BLEU-4 with multi-reference smoothing

The demo evaluates an untrained model, trains it for 50 steps on a synthetic
mock corpus, and re-evaluates to show the metrics move above their random
baselines.

Run with: python3 main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def _load_module(name, path)`](code/main.py#L31)
- [`class RetrievalPair`](code/main.py#L52)
- [`class VQATriple`](code/main.py#L58)
- [`class CaptionSample`](code/main.py#L65)
- [`class EvalSuite`](code/main.py#L71)
- [`def recall_at_k(sim, k)`](code/main.py#L77): Return (i2t, t2i) recall@k.
- [`def vqa_exact_match(predictions, references)`](code/main.py#L100)
- [`def _ngrams(seq, n)`](code/main.py#L109)
- [`def _count(ngrams)`](code/main.py#L115)
- [`def bleu4(generated, references, smoothing)`](code/main.py#L122): BLEU-4 against multiple reference captions.
- [`def build_eval_suite(seed, n_samples, vocab_size, max_len)`](code/main.py#L173): Build a deterministic eval suite with three surfaces.
- [`def _stack_images(samples)`](code/main.py#L209)
- [`def evaluate(model, suite)`](code/main.py#L213)
- [`def _print_metrics(label, metrics)`](code/main.py#L270)
- [`def main()`](code/main.py#L276)

## `code/test_main.py`

```text
Unit tests for multimodal evaluation metrics.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class TestRecallAtK`](code/test_main.py#L18)
  - [`def test_perfect_identity_matrix(self)`](code/test_main.py#L19)
  - [`def test_flipped_matrix_below_top(self)`](code/test_main.py#L26)
  - [`def test_rejects_invalid_k(self)`](code/test_main.py#L33)
- [`class TestVQAExactMatch`](code/test_main.py#L41)
  - [`def test_all_correct(self)`](code/test_main.py#L42)
  - [`def test_half_correct(self)`](code/test_main.py#L46)
  - [`def test_length_mismatch_raises(self)`](code/test_main.py#L50)
- [`class TestBLEU`](code/test_main.py#L55)
  - [`def test_exact_match_returns_one(self)`](code/test_main.py#L56)
  - [`def test_disjoint_vocab_returns_zero_without_smoothing(self)`](code/test_main.py#L61)
  - [`def test_disjoint_vocab_smoothed_is_below_match(self)`](code/test_main.py#L67)
  - [`def test_brevity_penalty_applies_when_generated_short(self)`](code/test_main.py#L74)
- [`class TestEvalSuite`](code/test_main.py#L81)
  - [`def test_build_shapes(self)`](code/test_main.py#L82)

## Run and test

From this folder:

```
python code/main.py
python code/test_main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
