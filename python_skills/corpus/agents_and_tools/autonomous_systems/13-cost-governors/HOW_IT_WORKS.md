# How it works: Action Budgets, Iteration Caps, and Cost Governors

## `main.py`

```text
Layered cost-governor simulator — stdlib Python.

Simulates an agent that drifts into a polling loop after 30 turns. Compares
three configurations:

  1. no caps: unbounded spend
  2. monthly cap only: catches eventually, spends a lot first
  3. layered stack: per-request + iteration + velocity limit + monthly cap

Metrics: turns executed, total tokens, total dollars, trigger that fired.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def turn_cost(turn)`](main.py#L28)
- [`class Governor`](main.py#L35)
- [`class Run`](main.py#L54)
- [`def velocity_exceeded(run, gov, now_min)`](main.py#L65)
- [`def simulate(gov, label)`](main.py#L82)
- [`def main()`](main.py#L117)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
