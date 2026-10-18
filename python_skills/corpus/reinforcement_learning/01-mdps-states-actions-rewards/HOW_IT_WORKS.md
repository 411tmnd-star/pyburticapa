# How it works: MDPs, States, Actions & Rewards

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def all_states()`](main.py#L9)
- [`def step(state, action)`](main.py#L13)
- [`def uniform_policy(_state)`](main.py#L23)
- [`def greedy_policy(_state)`](main.py#L27)
- [`def sample_action(dist, rng)`](main.py#L31)
- [`def rollout(policy, rng, max_steps)`](main.py#L41)
- [`def policy_evaluation(policy, gamma, tol, max_iter)`](main.py#L55)
- [`def print_value_grid(values, title)`](main.py#L75)
- [`def main()`](main.py#L84)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
