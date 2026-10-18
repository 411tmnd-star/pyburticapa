# How it works: Model Routing as a Cost-Reduction Primitive

## `main.py`

```text
Model routing simulator — stdlib Python.

Three patterns on the same workload:
  NO_ROUTE   : all requests to frontier
  PRE_ROUTE  : classifier up front routes to cheap or frontier
  CASCADE    : cheap first, escalate on low confidence

Reports blended cost, quality loss, escalation rate.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Query`](main.py#L24)
- [`def make_workload(n, seed)`](main.py#L30)
- [`def cost_of(route, q)`](main.py#L44)
- [`def quality(route, q)`](main.py#L50): Toy quality score per difficulty on route.
- [`def simulate(pattern, reqs)`](main.py#L57)
- [`def report(row, baseline)`](main.py#L92)
- [`def main()`](main.py#L98)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
