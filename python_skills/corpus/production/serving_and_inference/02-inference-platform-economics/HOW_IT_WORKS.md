# How it works: Inference Platform Economics — Fireworks, Together, Baseten, Modal, Replicate, Anyscale

## `main.py`

```text
Inference platform economics comparator — stdlib Python.

Models six providers (Fireworks, Together, Baseten, Modal, Replicate, Anyscale)
on the same synthetic workload. Normalizes per-token vs per-minute vs per-prediction
pricing so you can compare head-to-head.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Vendor`](main.py#L14)
- [`def cost_per_day(v, tokens_per_day, predictions_per_day)`](main.py#L36): Effective $/day given the vendor's pricing model.
- [`def effective_rate(v, tokens_per_day, predictions_per_day)`](main.py#L56): Normalize to $/M tokens for cross-vendor comparison.
- [`def run_scenario(label, tokens_per_day, predictions_per_day)`](main.py#L62)
- [`def utilization_breakeven()`](main.py#L74)
- [`def cold_start_penalty()`](main.py#L90)
- [`def main()`](main.py#L100)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
