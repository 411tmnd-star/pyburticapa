# How it works: Monte Carlo Methods — Learning from Complete Episodes

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def reset()`](main.py#L11)
- [`def step(state, action)`](main.py#L15)
- [`def states()`](main.py#L25)
- [`def rollout(policy, rng, max_steps)`](main.py#L29)
- [`def returns_from(trajectory, gamma)`](main.py#L42)
- [`def uniform_policy(_state, rng)`](main.py#L52)
- [`def mc_policy_evaluation(policy, episodes, gamma, rng)`](main.py#L56)
- [`def mc_control(episodes, gamma, epsilon, rng)`](main.py#L73)
- [`def print_V(V, title)`](main.py#L100)
- [`def print_policy(policy, title)`](main.py#L107)
- [`def main()`](main.py#L118)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
