# How it works: Regularization

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`class Dropout`](main.py#L5)
  - [`def forward(self, x)`](main.py#L11)
  - [`def backward(self, grad_output)`](main.py#L25)
- [`def l2_regularization(weights, lambda_reg)`](main.py#L35)
- [`def l2_gradient(weights, lambda_reg)`](main.py#L42)
- [`class BatchNorm`](main.py#L46)
  - [`def forward(self, batch)`](main.py#L57)
- [`class LayerNorm`](main.py#L93)
  - [`def forward(self, x)`](main.py#L100)
- [`class RMSNorm`](main.py#L113)
  - [`def forward(self, x)`](main.py#L119)
- [`def sigmoid(x)`](main.py#L127)
- [`def make_circle_data(n, seed)`](main.py#L132)
- [`class RegularizedNetwork`](main.py#L143)
  - [`def forward(self, x, training)`](main.py#L157)
  - [`def backward(self, target)`](main.py#L177)
  - [`def evaluate(self, data)`](main.py#L198)
  - [`def train_model(self, train_data, test_data, epochs)`](main.py#L210)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
