# How it works: Theory of Mind and Emergent Coordination

## `main.py`

```text
ToM-aware vs zeroth-order agents on a token-collection task, stdlib only.

Three agents must each collect one token from one of three boxes. They
cannot communicate; they only observe each other's movement. Zeroth-order
agents ignore others; first-order ToM agents model which boxes each other
is targeting. Measured over 200 trials.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class World`](main.py#L15)
  - [`def new(cls, n)`](main.py#L20)
- [`class Agent`](main.py#L25)
  - [`def choose_target(self, world, rng)`](main.py#L32)
  - [`def observe(self, other, box)`](main.py#L47)
- [`def run_trial(n_agents, n_boxes, tom, seed, max_turns)`](main.py#L51): Each turn, agents commit simultaneously. Collisions waste a turn for all
- [`def bench(tom, trials)`](main.py#L120)
- [`def main()`](main.py#L138)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
