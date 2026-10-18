# How it works: Leaderboard Aggregation

## `code/main.py`

```text
Leaderboard aggregation: pivot, mean, win-rate, bootstrap CI, markdown.

Conceptual references:
- ./docs/en.md (this lesson)
- lesson 71 (classical metrics) for per-task score shape
- lesson 73 (calibration) for the multi-model report pattern

Stdlib + numpy. Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class EvalRun`](code/main.py#L24)
- [`class LeaderboardRow`](code/main.py#L34)
  - [`def to_dict(self)`](code/main.py#L43)
- [`class PairwiseDiff`](code/main.py#L56)
  - [`def to_dict(self)`](code/main.py#L64)
- [`def _validate_runs(runs)`](code/main.py#L75)
- [`def _by_model(runs)`](code/main.py#L86)
- [`def _by_task(runs)`](code/main.py#L93)
- [`def bootstrap_mean_ci(scores, b, alpha, seed)`](code/main.py#L100)
- [`def bootstrap_pairwise_diff(paired_a, paired_b, b, alpha, seed)`](code/main.py#L120)
- [`def _win_rate(model_id, runs_by_task)`](code/main.py#L146)
- [`def _category_means(runs)`](code/main.py#L162)
- [`def aggregate(runs, b, alpha, seed)`](code/main.py#L169)
- [`def pairwise_diffs(runs, b, alpha, seed)`](code/main.py#L202)
- [`def render_markdown(rows)`](code/main.py#L241)
- [`def render_json(rows)`](code/main.py#L254)
- [`def _synthetic_runs(seed)`](code/main.py#L258)
- [`def demo()`](code/main.py#L280)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
