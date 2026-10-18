# How it works: Backpropagation from Scratch

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`class Value`](main.py#L5)
  - [`def sigmoid(self)`](main.py#L50)
  - [`def backward(self)`](main.py#L61)
- [`def mse_loss(predicted, target)`](main.py#L78)
- [`class Neuron`](main.py#L83)
  - [`def parameters(self)`](main.py#L93)
- [`class Layer`](main.py#L97)
  - [`def parameters(self)`](main.py#L105)
- [`class Network`](main.py#L112)
  - [`def parameters(self)`](main.py#L125)
  - [`def zero_grad(self)`](main.py#L131)
- [`def train_xor()`](main.py#L136)
- [`def generate_circle_data(n)`](main.py#L178)
- [`def train_circle()`](main.py#L188)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
