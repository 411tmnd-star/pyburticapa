# How it works: A/B Testing LLM Features — GrowthBook, Statsig, and the Vibes Problem

## `main.py`

```text
Sequential A/B test simulator — stdlib Python.

Compares fixed-sample vs always-valid sequential testing on a binary outcome.
Illustrates CUPED-style variance reduction.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def z_statistic(success_a, n_a, success_b, n_b)`](main.py#L13)
- [`def fixed_sample_size(p_baseline, lift, alpha, power)`](main.py#L21)
- [`def simulate(p_a, p_b, seed, max_n)`](main.py#L32)
- [`def main()`](main.py#L66)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
