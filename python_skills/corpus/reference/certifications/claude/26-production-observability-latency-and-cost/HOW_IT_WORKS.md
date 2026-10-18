# How it works: Production Observability, Latency, and Cost

## `code/main.py`

```text
Production telemetry lab for this lesson's docs/en.md.

Aggregates traces into latency, reliability, cache, error, and economic signals.
Evaluates cost per successful outcome instead of reporting call price alone.
Uses only the Python standard library and synthetic, non-sensitive trace data.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Trace`](code/main.py#L17)
- [`def percentile(values, probability)`](code/main.py#L30)
- [`def summarize(traces)`](code/main.py#L40)
- [`def by_variant(traces)`](code/main.py#L70)
- [`class ServiceObjectives`](code/main.py#L78)
- [`def evaluate_objectives(summary, objectives)`](code/main.py#L84)
- [`def demo()`](code/main.py#L93)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
