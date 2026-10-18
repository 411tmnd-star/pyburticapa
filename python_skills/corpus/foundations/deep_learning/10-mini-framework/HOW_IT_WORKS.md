# How it works: Build Your Own Mini Framework

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`class Module`](main.py#L5)
  - [`def forward(self, x)`](main.py#L9)
  - [`def backward(self, grad)`](main.py#L12)
  - [`def parameters(self)`](main.py#L15)
  - [`def train(self)`](main.py#L18)
  - [`def eval(self)`](main.py#L21)
- [`class Linear`](main.py#L25)
  - [`def forward(self, x)`](main.py#L37)
  - [`def backward(self, grad)`](main.py#L47)
  - [`def parameters(self)`](main.py#L56)
- [`class ReLU`](main.py#L65)
  - [`def forward(self, x)`](main.py#L70)
  - [`def backward(self, grad)`](main.py#L74)
- [`class Sigmoid`](main.py#L78)
  - [`def forward(self, x)`](main.py#L83)
  - [`def backward(self, grad)`](main.py#L90)
- [`class Tanh`](main.py#L94)
  - [`def forward(self, x)`](main.py#L99)
  - [`def backward(self, grad)`](main.py#L103)
- [`class Dropout`](main.py#L107)
  - [`def forward(self, x)`](main.py#L113)
  - [`def backward(self, grad)`](main.py#L119)
- [`class BatchNorm`](main.py#L125)
  - [`def forward_batch(self, batch)`](main.py#L141)
  - [`def forward(self, x)`](main.py#L180)
  - [`def backward(self, grad)`](main.py#L193)
  - [`def parameters(self)`](main.py#L202)
- [`class Sequential`](main.py#L210)
  - [`def forward(self, x)`](main.py#L215)
  - [`def backward(self, grad)`](main.py#L220)
  - [`def parameters(self)`](main.py#L225)
  - [`def train(self)`](main.py#L231)
  - [`def eval(self)`](main.py#L236)
  - [`def count_parameters(self)`](main.py#L241)
- [`class MSELoss`](main.py#L245)
  - [`def backward(self)`](main.py#L253)
- [`class BCELoss`](main.py#L258)
  - [`def backward(self)`](main.py#L271)
- [`class SGD`](main.py#L281)
  - [`def step(self)`](main.py#L286)
  - [`def zero_grad(self)`](main.py#L293)
- [`class Adam`](main.py#L301)
  - [`def step(self)`](main.py#L312)
  - [`def zero_grad(self)`](main.py#L333)
- [`class DataLoader`](main.py#L341)
- [`def make_circle_data(n, seed)`](main.py#L362)
- [`def train_framework()`](main.py#L373)
- [`def train_with_sgd()`](main.py#L446)
- [`def train_with_dropout()`](main.py#L497)
- [`def sample_predictions(model, data)`](main.py#L544)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
