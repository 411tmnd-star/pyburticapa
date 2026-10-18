# How it works: Async and Hogwild! Inference

## `code/main.py`

```text
Hogwild! Inference toy simulator — stdlib Python.

Two workers run concurrently against a shared token cache. Each worker reads
the cache and decides whether to add a work-token to category A or B, using
a simple coordination heuristic: if the other worker already produced enough
tokens in a category, switch.

Outputs:
  - total work-tokens produced in fixed step budget
  - wall-time speedup vs a single-worker baseline
  - a trace of which worker wrote which token and what category
  - a coordination-weight sweep showing the effect of poor coordination

Not a faithful LLM simulation. The point is to demonstrate emergent work
division driven by shared-cache reads.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class SharedCache`](code/main.py#L29)
  - [`def counts(self)`](code/main.py#L32)
- [`class Worker`](code/main.py#L40)
- [`def decide_next_category(worker, cache, target_per_category)`](code/main.py#L47): Read the shared cache. With probability coordination_weight, switch
- [`def run_hogwild(n_workers, step_budget, target_per_category, coordination_weight, seed)`](code/main.py#L71): All workers default to category A. Coordination makes them diverge.
- [`def expected_speedup(T_serial, p, c, N, steps_per_worker)`](code/main.py#L124)
- [`def main()`](code/main.py#L130)

## Run and test

From this folder:

```
python code/main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
