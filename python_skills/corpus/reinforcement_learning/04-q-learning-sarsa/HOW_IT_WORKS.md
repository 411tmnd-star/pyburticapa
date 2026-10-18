# How it works: Temporal Difference — Q-Learning & SARSA

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def reset()`](main.py#L11)
- [`def step(state, action)`](main.py#L15)
- [`def epsilon_greedy(Q, state, rng, epsilon)`](main.py#L25)
- [`def sarsa(episodes, alpha, gamma, epsilon, rng)`](main.py#L32)
- [`def q_learning(episodes, alpha, gamma, epsilon, rng)`](main.py#L54)
- [`def greedy_policy(Q)`](main.py#L76)
- [`def print_policy(policy, title)`](main.py#L80)
- [`def block_means(xs, block)`](main.py#L95)
- [`def main()`](main.py#L99)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
