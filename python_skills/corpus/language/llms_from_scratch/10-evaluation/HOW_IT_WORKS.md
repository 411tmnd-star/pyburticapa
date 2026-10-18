# How it works: Evaluation: Benchmarks, Evals, LM Harness

## `code/main.py`

Functions and classes, in file order (click to jump to the line):

- [`class EvalCase`](code/main.py#L8)
- [`class EvalSuite`](code/main.py#L15)
  - [`def run(self, model_fn)`](code/main.py#L21)
- [`def exact_match(prediction, expected)`](code/main.py#L37)
- [`def token_f1(prediction, expected)`](code/main.py#L41)
- [`def llm_judge_simulated(prediction, expected)`](code/main.py#L54)
- [`class ELOTracker`](code/main.py#L64)
  - [`def _ensure_player(self, name)`](code/main.py#L71)
  - [`def expected_score(self, rating_a, rating_b)`](code/main.py#L75)
  - [`def record_match(self, player_a, player_b, outcome)`](code/main.py#L78)
  - [`def leaderboard(self)`](code/main.py#L102)
- [`def perplexity(log_probs)`](code/main.py#L106)
- [`def token_log_probs_simulated(text, model_quality)`](code/main.py#L113)
- [`def summarize_results(results, threshold)`](code/main.py#L128)
- [`def print_summary(summary, suite_name)`](code/main.py#L149)
- [`def demo_model_good(prompt)`](code/main.py#L163)
- [`def demo_model_bad(prompt)`](code/main.py#L177)
- [`def demo_model_random(prompt)`](code/main.py#L191)
- [`def run_eval_demo()`](code/main.py#L197)
- [`def run_elo_demo()`](code/main.py#L232)
- [`def run_perplexity_demo()`](code/main.py#L288)
- [`def run_metric_comparison()`](code/main.py#L307)

## Run and test

From this folder:

```
python code/main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
