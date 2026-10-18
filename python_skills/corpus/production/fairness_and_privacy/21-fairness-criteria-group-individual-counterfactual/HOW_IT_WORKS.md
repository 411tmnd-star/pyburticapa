# How it works: Fairness Criteria — Group, Individual, Counterfactual

## `main.py`

```text
Three group-fairness criteria on a toy classifier — stdlib Python.

Binary classification: sensitive attribute A in {0, 1} with unequal base rates.
A simple logistic classifier is trained; we report:
  demographic parity, equalized odds, conditional use accuracy equality.
Then apply a re-weighting targeted at demographic parity and observe the
cost on the other two.

Usage: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def gen(n)`](main.py#L21): Returns list of (features, label, sensitive_attribute).
- [`def train(data, steps, lr, sample_weights)`](main.py#L37)
- [`def predict(model, data)`](main.py#L56)
- [`def demographic_parity(preds)`](main.py#L65)
- [`def equalized_odds(preds)`](main.py#L71)
- [`def conditional_use(preds)`](main.py#L80)
- [`def report(name, preds)`](main.py#L89)
- [`def main()`](main.py#L101)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
