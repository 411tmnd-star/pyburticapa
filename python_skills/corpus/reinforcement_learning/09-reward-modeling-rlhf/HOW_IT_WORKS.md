# How it works: Reward Modeling & RLHF

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def bag(tokens)`](main.py#L12)
- [`def sigmoid(x)`](main.py#L16)
- [`def score(w, tokens)`](main.py#L23)
- [`def sample_pair(rng)`](main.py#L27)
- [`def train_rm(n_pairs, lr, rng)`](main.py#L34)
- [`def rm_accuracy(w, n_pairs, rng)`](main.py#L50)
- [`def softmax(z)`](main.py#L60)
- [`def policy_probs(theta, prompt_idx)`](main.py#L67)
- [`def sample_token(probs, rng)`](main.py#L71)
- [`def kl(p, q)`](main.py#L81)
- [`def rlhf_loop(w, updates, beta, lr, eps, rng)`](main.py#L90)
- [`def main()`](main.py#L132)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
