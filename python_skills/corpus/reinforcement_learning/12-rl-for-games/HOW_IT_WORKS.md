# How it works: RL for Games — AlphaZero, MuZero, and the LLM-Reasoning Era

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def softmax(z)`](main.py#L14)
- [`def policy_probs(theta, p_idx)`](main.py#L21)
- [`def sample(probs, rng)`](main.py#L25)
- [`def verify(p_idx, answer)`](main.py#L35)
- [`def grpo_step(theta, reference, rng, G, beta, lr)`](main.py#L39)
- [`def reinforce_step(theta, rng, lr)`](main.py#L63)
- [`def train_grpo(updates, rng)`](main.py#L74)
- [`def train_reinforce(updates, rng)`](main.py#L85)
- [`def evaluate(theta, episodes, rng)`](main.py#L95)
- [`def main()`](main.py#L106)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
