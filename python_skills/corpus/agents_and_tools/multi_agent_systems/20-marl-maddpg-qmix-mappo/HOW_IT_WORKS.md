# How it works: MARL — MADDPG, QMIX, MAPPO

## `main.py`

```text
MARL patterns — CTDE, value decomposition, centralized value — on a tiny grid.

Two agents, 4x4 grid, one pellet. All four styles share the same environment
and reward. Scripted policies demonstrate how CTDE variants converge faster
than the independent baseline even without gradient updates.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Env`](main.py#L17): Cooperative task: TWO pellets, each agent must collect one; step cost
  - [`def new(rng)`](main.py#L28)
  - [`def done(self)`](main.py#L37)
  - [`def collect_if_on_pellet(self)`](main.py#L40)
- [`def manhattan(a, b)`](main.py#L45)
- [`def step_toward(pos, target)`](main.py#L49)
- [`def move_or_wait(pos, target, wait)`](main.py#L63)
- [`def run_independent(env, max_steps)`](main.py#L69): Each agent independently targets the nearest pellet; no awareness of
- [`def _assigned_targets(env)`](main.py#L83): Centralized optimal pellet assignment: minimize total Manhattan.
- [`def run_maddpg_style(env, max_steps)`](main.py#L94): Centralized critic assigns each agent a distinct pellet; each agent's
- [`def run_qmix_style(env, max_steps)`](main.py#L107): Value decomposition: each agent picks the pellet with higher local Q
- [`def run_mappo_style(env, max_steps)`](main.py#L124): PPO with centralized value function. Behaves like CTDE at deploy; the
- [`def bench(label, runner)`](main.py#L131)
- [`def main()`](main.py#L141)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
