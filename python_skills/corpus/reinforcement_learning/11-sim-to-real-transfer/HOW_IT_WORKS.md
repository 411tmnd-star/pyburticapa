# How it works: Sim-to-Real Transfer

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def step(state, action, slip, rng)`](main.py#L11)
- [`def default_q()`](main.py#L24)
- [`def epsilon_greedy(Q, s, rng, eps)`](main.py#L28)
- [`def train_fixed(slip, episodes, alpha, gamma, eps, rng)`](main.py#L35)
- [`def train_dr(slip_low, slip_high, episodes, alpha, gamma, eps, rng)`](main.py#L52)
- [`def evaluate(Q, slip, episodes, rng)`](main.py#L70)
- [`def main()`](main.py#L86)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
