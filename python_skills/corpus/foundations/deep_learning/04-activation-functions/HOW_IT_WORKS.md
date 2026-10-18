# How it works: Activation Functions

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def sigmoid(x)`](main.py#L5)
- [`def sigmoid_derivative(x)`](main.py#L10)
- [`def tanh_act(x)`](main.py#L15)
- [`def tanh_derivative(x)`](main.py#L19)
- [`def relu(x)`](main.py#L24)
- [`def relu_derivative(x)`](main.py#L28)
- [`def leaky_relu(x, alpha)`](main.py#L32)
- [`def leaky_relu_derivative(x, alpha)`](main.py#L36)
- [`def gelu(x)`](main.py#L40)
- [`def gelu_derivative(x)`](main.py#L44)
- [`def swish(x)`](main.py#L50)
- [`def swish_derivative(x)`](main.py#L54)
- [`def softmax(xs)`](main.py#L59)
- [`def gradient_scan(name, derivative_fn, start, end, n)`](main.py#L66)
- [`def vanishing_gradient_experiment(activation_fn, name, n_layers, n_inputs)`](main.py#L81)
- [`def dead_neuron_detector(n_inputs, hidden_size, n_samples)`](main.py#L96)
- [`def make_circle_data(n, seed)`](main.py#L126)
- [`class ActivationNetwork`](main.py#L137)
  - [`def forward(self, x)`](main.py#L150)
  - [`def backward(self, target)`](main.py#L163)
  - [`def train(self, data, epochs)`](main.py#L175)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
