# How it works: Recursive Self-Improvement — Capability vs Alignment

## `main.py`

```text
Capability-vs-alignment race simulator — stdlib Python.

Two compounding processes per RSI cycle. Capability rate r_c, alignment
rate r_a, each with configurable noise. The simulator tracks the gap
M(t) = C(t) - A(t) and the cycle at which the gap would cross a safety
threshold.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Config`](main.py#L21)
- [`def run(cycles, cfg)`](main.py#L29)
- [`def crossing_cycle(trajectory, threshold)`](main.py#L42)
- [`def print_trajectory(label, cfg, cycles)`](main.py#L49)
- [`def monte_carlo(cfg, cycles, trials)`](main.py#L70)
- [`def main()`](main.py#L86)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
