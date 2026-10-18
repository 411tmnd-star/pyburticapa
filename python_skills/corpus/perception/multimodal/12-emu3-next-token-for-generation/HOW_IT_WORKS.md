# How it works: Emu3: Next-Token Prediction for Image and Video Generation

## `main.py`

```text
Emu3 token-count + CFG-sampling toys — stdlib.

Two mini-tools:
  1. Token-count calculator for images + video at various resolutions and FPS.
  2. Autoregressive sampler with classifier-free guidance (CFG).
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class TokCost`](main.py#L18)
  - [`def tokens(self)`](main.py#L26)
- [`def token_table()`](main.py#L35)
- [`def softmax(xs, temperature)`](main.py#L54)
- [`def cfg_mix(cond_logits, uncond_logits, gamma)`](main.py#L61): Classifier-free guidance: mixed = uncond + gamma * (cond - uncond).
- [`def sample(probs)`](main.py#L67)
- [`def demo_cfg()`](main.py#L77)
- [`def sample_tokens(cond, uncond, gamma, temp)`](main.py#L92): Sample a sequence of length len(cond) with CFG + temperature.
- [`def demo_sampling()`](main.py#L103)
- [`def main()`](main.py#L120)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
