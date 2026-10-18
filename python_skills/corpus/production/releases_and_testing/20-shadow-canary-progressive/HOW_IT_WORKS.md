# How it works: Shadow Traffic, Canary Rollout, and Progressive Deployment for LLMs

## `main.py`

```text
Canary rollout simulator — stdlib Python.

Progressively increases candidate traffic share and checks five gates at each
step. Halts when any gate breaches. Supports injected regressions.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Regression`](main.py#L33)
- [`def measure_stage(stage, reg, seed)`](main.py#L41)
- [`def check_gates(metrics)`](main.py#L53)
- [`def rollout(name, reg)`](main.py#L61)
- [`def stage_seed(i)`](main.py#L81)
- [`def main()`](main.py#L85)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
