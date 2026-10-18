# How it works: Policy Gradient — REINFORCE from Scratch

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def reset()`](main.py#L13)
- [`def step(state, action_idx)`](main.py#L17)
- [`def features(state)`](main.py#L27)
- [`def init_theta(rng)`](main.py#L34)
- [`def logits(theta, x)`](main.py#L38)
- [`def softmax(z)`](main.py#L42)
- [`def sample(probs, rng)`](main.py#L49)
- [`def rollout(theta, rng, max_steps)`](main.py#L59)
- [`def returns_to_go(traj, gamma)`](main.py#L74)
- [`def reinforce(episodes, lr, gamma, use_baseline, rng)`](main.py#L84)
- [`def greedy_policy(theta)`](main.py#L104)
- [`def print_policy(policy, title)`](main.py#L115)
- [`def block_mean(xs, block)`](main.py#L130)
- [`def main()`](main.py#L134)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
