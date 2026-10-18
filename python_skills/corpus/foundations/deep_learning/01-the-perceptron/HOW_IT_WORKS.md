# How it works: The Perceptron

## `perceptron.py`

Functions and classes, in file order (click to jump to the line):

- [`class Perceptron`](perceptron.py#L1)
  - [`def predict(self, inputs)`](perceptron.py#L7)
  - [`def train(self, training_data, epochs)`](perceptron.py#L12)
- [`def test_gate(name, n_inputs, data)`](perceptron.py#L29)
- [`def xor_network(x1, x2)`](perceptron.py#L81)
- [`class TwoLayerNetwork`](perceptron.py#L107)
  - [`def sigmoid(self, x)`](perceptron.py#L117)
  - [`def forward(self, inputs)`](perceptron.py#L122)
  - [`def train(self, training_data, epochs)`](perceptron.py#L132)

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
