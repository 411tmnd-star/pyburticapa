# How it works: Multi-Agent RL

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def move(pos, action)`](main.py#L11)
- [`def reset()`](main.py#L17)
- [`def step(state, action_pair)`](main.py#L21)
- [`def default_q()`](main.py#L30)
- [`def epsilon_greedy(q_table, state, rng, epsilon)`](main.py#L34)
- [`def independent_q(episodes, alpha, gamma, epsilon, rng)`](main.py#L41)
- [`def joint_q_learning(episodes, alpha, gamma, epsilon, rng)`](main.py#L67)
- [`def block_mean(xs, block)`](main.py#L92)
- [`def evaluate_ind(Q1, Q2, episodes, rng)`](main.py#L96)
- [`def evaluate_joint(Q, episodes, rng)`](main.py#L111)
- [`def main()`](main.py#L126)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
