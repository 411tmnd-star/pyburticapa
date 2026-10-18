# How it works: Actor-Critic — A2C and A3C

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
- [`def rollout(theta, w, rng, max_steps)`](main.py#L67)
- [`def gae_advantages(traj, gamma, lam)`](main.py#L82)
- [`def normalize(xs)`](main.py#L95)
- [`def actor_critic(episodes, lr_a, lr_v, gamma, lam, ent_coef, rng)`](main.py#L104)
- [`def greedy_policy(theta)`](main.py#L138)
- [`def print_policy(policy, title)`](main.py#L149)
- [`def block_mean(xs, block)`](main.py#L164)
- [`def main()`](main.py#L168)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
