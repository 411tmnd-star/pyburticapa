# How it works: Transfusion: Autoregressive Text + Diffusion Image in One Transformer

## `main.py`

```text
Transfusion toy: two-loss trainer on a 4x4 grayscale + short caption.

Stdlib. The transformer is a shared linear map; the point is the two-loss
plumbing and the block-triangular attention mask.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Pair`](main.py#L23)
- [`def make_dataset(n)`](main.py#L28)
- [`def patch_to_vec(patch)`](main.py#L40)
- [`def build_mask(tokens)`](main.py#L44): Block-triangular mask: causal over text, bidirectional within image.
- [`def mse(a, b)`](main.py#L80)
- [`def cross_entropy_toy(prob)`](main.py#L84)
- [`def two_loss_step(pair, weights)`](main.py#L89): Simulate one training step: compute text loss + image loss.
- [`def train(pairs, steps)`](main.py#L113)
- [`def demo_mask()`](main.py#L126)
- [`def main()`](main.py#L136)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
