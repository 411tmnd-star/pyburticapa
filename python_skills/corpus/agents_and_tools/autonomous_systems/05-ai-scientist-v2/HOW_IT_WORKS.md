# How it works: AI Scientist v2 — Workshop-Level Autonomous Research

## `main.py`

```text
AI Scientist v2 loop simulator — stdlib Python.

Models the research loop as a state machine with configurable per-stage
failure probabilities, seeded from Beel et al. (2025) findings on AI
Scientist's real behavior. Runs many trials and reports the distribution
of outcomes, including the critical "polished paper with flawed
experiment" class.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class LoopConfig`](main.py#L21)
- [`class Outcome`](main.py#L39)
- [`def run_one(cfg)`](main.py#L48)
- [`def report(n, cfg)`](main.py#L117)
- [`def main()`](main.py#L153)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
