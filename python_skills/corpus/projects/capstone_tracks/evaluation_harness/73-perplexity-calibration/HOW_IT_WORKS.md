# How it works: Perplexity and Calibration

## `code/main.py`

```text
Perplexity and calibration: ECE, Brier, reliability diagram.

Conceptual references:
- ./docs/en.md (this lesson)
- lesson 70 (task spec format)
- lesson 71 (classical metrics) for the scalar dispatch pattern

Stdlib + numpy. Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class PerplexityResult`](code/main.py#L22)
  - [`def to_dict(self)`](code/main.py#L27)
  - [`def from_token_nll(cls, neg_log_probs, token_counts)`](code/main.py#L35)
- [`def perplexity(neg_log_probs, token_counts)`](code/main.py#L53)
- [`def _validate_probs(confidences, correct)`](code/main.py#L57)
- [`def _bin_indices(confidences, n_bins)`](code/main.py#L71)
- [`def expected_calibration_error(confidences, correct, bins)`](code/main.py#L78)
- [`def brier_score(confidences, correct)`](code/main.py#L102)
- [`def brier_decomposition(confidences, correct, bins)`](code/main.py#L111)
- [`def reliability_diagram(confidences, correct, bins)`](code/main.py#L143)
- [`class CalibrationReport`](code/main.py#L167)
  - [`def to_dict(self)`](code/main.py#L174)
  - [`def from_predictions(cls, confidences, correct, bins)`](code/main.py#L189)
- [`def synthetic_calibrated(n, seed)`](code/main.py#L202)
- [`def synthetic_overconfident(n, seed)`](code/main.py#L209)
- [`def synthetic_underconfident(n, seed)`](code/main.py#L216)
- [`def synthetic_token_nll(seed)`](code/main.py#L223)
- [`def demo()`](code/main.py#L234)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
