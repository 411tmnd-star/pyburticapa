# How it works: Optimizers

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`class SGD`](main.py#L5)
  - [`def step(self, params, grads)`](main.py#L9)
- [`class SGDMomentum`](main.py#L14)
  - [`def step(self, params, grads)`](main.py#L20)
- [`class Adam`](main.py#L28)
  - [`def step(self, params, grads)`](main.py#L38)
- [`class AdamW`](main.py#L55)
  - [`def step(self, params, grads)`](main.py#L66)
- [`def sigmoid(x)`](main.py#L84)
- [`def make_circle_data(n, seed)`](main.py#L89)
- [`class OptimizerTestNetwork`](main.py#L100)
  - [`def get_params(self)`](main.py#L111)
  - [`def set_params(self, params)`](main.py#L120)
  - [`def forward(self, x)`](main.py#L134)
  - [`def compute_grads(self, target)`](main.py#L147)
  - [`def train(self, data, epochs)`](main.py#L175)
- [`def bias_correction_demo()`](main.py#L200)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
