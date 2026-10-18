# How it works: Dynamic Programming — Policy Iteration & Value Iteration

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def states()`](main.py#L8)
- [`def apply_move(state, direction)`](main.py#L12)
- [`def perpendiculars(action)`](main.py#L20)
- [`def transitions(state, action)`](main.py#L26)
- [`def q_value(state, action, V, gamma)`](main.py#L37)
- [`def policy_evaluation(policy, gamma, tol, max_iter)`](main.py#L41)
- [`def greedy_from_V(V, gamma)`](main.py#L57)
- [`def policy_iteration(gamma, tol)`](main.py#L68)
- [`def value_iteration(gamma, tol, max_iter)`](main.py#L81)
- [`def print_V(V, title)`](main.py#L96)
- [`def print_policy(policy, title)`](main.py#L103)
- [`def main()`](main.py#L111)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
