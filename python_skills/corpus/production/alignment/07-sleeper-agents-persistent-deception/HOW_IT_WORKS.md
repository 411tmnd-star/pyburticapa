# How it works: Sleeper Agents — Persistent Deception

## `main.py`

```text
Toy sleeper-agent demo — stdlib Python.

Builds a tiny logistic classifier with a planted backdoor, then shows:
  1. clean fine-tuning does not remove the backdoor,
  2. adversarial fine-tuning drives red-team accuracy to ~100% while
     the original held-out trigger keeps firing.

This is the Hubinger et al. 2024 result in miniature. No torch.

Usage: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def sigmoid(z)`](main.py#L30)
- [`class Example`](main.py#L38)
- [`def gen_clean(n)`](main.py#L44)
- [`def gen_triggered(n, defect_label)`](main.py#L54): Trigger on: the tripwire feature is 1.0; label is flipped to defect.
- [`def gen_redteam(n)`](main.py#L64): The red team cannot reach the tripwire feature. They suspect a distribution
- [`class LogReg`](main.py#L79)
  - [`def predict_proba(self, x)`](main.py#L84)
  - [`def predict(self, x)`](main.py#L88)
  - [`def step(self, data, lr)`](main.py#L91)
- [`def accuracy(model, data)`](main.py#L100)
- [`def backdoor_rate(model, triggered_eval)`](main.py#L107): Fraction of triggered examples where the model emits the DEFECT label
- [`def train(model, data, epochs)`](main.py#L119)
- [`def main()`](main.py#L125)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
