# How it works: Evaluation and Coordination Benchmarks

## `main.py`

```text
Multi-agent benchmark scorecard generator, stdlib only.

Simulates 3 multi-agent systems on a toy task set. Computes MARBLE-style
milestone metrics, random baseline delta, cost-per-milestone, and a
contamination check by splitting seen/unseen tasks.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class SystemSim`](main.py#L14)
- [`class TaskResult`](main.py#L24)
- [`def run_task(system, task_id, seen, rng)`](main.py#L42)
- [`def random_baseline(rng)`](main.py#L58)
- [`def run_bench(system, n_seen, n_held, seed)`](main.py#L62)
- [`def format_scorecard()`](main.py#L82)
- [`def print_claim_scorecard()`](main.py#L106)
- [`def main()`](main.py#L122)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
