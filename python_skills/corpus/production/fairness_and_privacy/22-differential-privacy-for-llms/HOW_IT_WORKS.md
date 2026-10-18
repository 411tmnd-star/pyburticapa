# How it works: Differential Privacy for LLMs

## `main.py`

```text
DP-SGD toy on binary logistic regression — stdlib Python.

Sweeps noise multiplier sigma, reports accuracy vs (epsilon, delta) budget.
Illustrates the privacy-utility tradeoff without a real privacy accountant;
the displayed epsilon is a Gaussian-mechanism analytical proxy.

Usage: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def sigmoid(z)`](main.py#L19)
- [`def gen(n)`](main.py#L23)
- [`def clip(g, C)`](main.py#L32)
- [`def dp_sgd(data, epochs, lr, sigma, C)`](main.py#L39)
- [`def accuracy(model, data)`](main.py#L59)
- [`def analytical_epsilon(sigma, steps, delta)`](main.py#L69): Rough Gaussian-mechanism composition proxy.
- [`def main()`](main.py#L76)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
