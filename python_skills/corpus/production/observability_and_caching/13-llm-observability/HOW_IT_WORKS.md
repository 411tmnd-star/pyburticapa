# How it works: LLM Observability Stack Selection

## `main.py`

```text
Observability sampling and cost simulator — stdlib Python.

Simulates a 1M-trace day across retention strategies. Reports storage cost
and what's lost under each. Pedagogical: costs are 2026 approximations.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Strategy`](main.py#L20)
- [`def simulate_day(strategy, traces_per_day)`](main.py#L36)
- [`def report(row)`](main.py#L65)
- [`def main()`](main.py#L73)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
