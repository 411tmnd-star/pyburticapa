# How it works: Scalable Oversight and Weak-to-Strong Generalization

## `main.py`

```text
Weak-to-Strong Generalization simulator — stdlib Python.

Task: binary classification on a synthetic 3-feature problem.
Weak labeler: accuracy 0.70 with errors concentrated on a sub-class.
Strong model: 0.95 ceiling on gold labels (linear separator).

Procedure: fine-tune strong on weak labels, measure PGR.

Usage: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def gen(n)`](main.py#L20)
- [`def weak_label(x, accuracy)`](main.py#L29): Weak labeler: simple threshold on x[0] alone, plus noise to reach target
- [`def train_strong(data, steps, lr)`](main.py#L38): Fit a 3-feature linear classifier by SGD.
- [`def accuracy(model, data)`](main.py#L56)
- [`def run(label, weak_acc)`](main.py#L67)
- [`def main()`](main.py#L91)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
