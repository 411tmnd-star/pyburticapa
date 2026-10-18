# How it works: Proximal Policy Optimization (PPO)

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def reset()`](main.py#L13)
- [`def step(state, action_idx)`](main.py#L17)
- [`def features(state)`](main.py#L27)
- [`def softmax(z)`](main.py#L34)
- [`def logits(theta, x)`](main.py#L41)
- [`def value(w, x)`](main.py#L45)
- [`def sample(probs, rng)`](main.py#L49)
- [`def init_theta(rng)`](main.py#L59)
- [`def init_w(_rng)`](main.py#L63)
- [`def collect_rollout(theta, w, rng, horizon, n_envs)`](main.py#L67)
- [`def gae(buffer, gamma, lam)`](main.py#L90)
- [`def normalize(xs)`](main.py#L103)
- [`def ppo_update(theta, w, buffer, advantages, returns, lr_a, lr_v, eps, epochs, batch, rng)`](main.py#L112)
- [`def greedy_policy(theta)`](main.py#L162)
- [`def print_policy(policy, title)`](main.py#L173)
- [`def evaluate(theta, rng, episodes)`](main.py#L188)
- [`def main()`](main.py#L204)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
