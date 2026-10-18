# How it works: Deep Q-Networks (DQN)

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def reset()`](main.py#L11)
- [`def step(state, action)`](main.py#L15)
- [`def state_features(state)`](main.py#L25)
- [`def init_net(n_in, n_hidden, n_out, rng)`](main.py#L32)
- [`def forward(net, x)`](main.py#L41)
- [`def clone(net)`](main.py#L53)
- [`def epsilon_greedy(net, state, rng, epsilon)`](main.py#L62)
- [`def train_step(online, target, batch, gamma, lr)`](main.py#L69)
- [`def main()`](main.py#L116)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
