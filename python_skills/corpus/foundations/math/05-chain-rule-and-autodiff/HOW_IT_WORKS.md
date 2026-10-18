# How it works: Chain Rule & Automatic Differentiation

## `autodiff.py`

Functions and classes, in file order (click to jump to the line):

- [`class Value`](autodiff.py#L4)
  - [`def relu(self)`](autodiff.py#L58)
  - [`def tanh(self)`](autodiff.py#L65)
  - [`def exp(self)`](autodiff.py#L74)
  - [`def log(self)`](autodiff.py#L83)
  - [`def backward(self)`](autodiff.py#L91)
- [`def demo_basic()`](autodiff.py#L107)
- [`def demo_power()`](autodiff.py#L125)
- [`def demo_complex()`](autodiff.py#L138)
- [`def demo_neuron()`](autodiff.py#L157)
- [`class Neuron`](autodiff.py#L191)
  - [`def parameters(self)`](autodiff.py#L200)
- [`class Layer`](autodiff.py#L204)
  - [`def parameters(self)`](autodiff.py#L212)
- [`class MLP`](autodiff.py#L216)
  - [`def parameters(self)`](autodiff.py#L225)
- [`def gradient_check(build_expr, x_val, h)`](autodiff.py#L229)
- [`def demo_mlp_training()`](autodiff.py#L243)
- [`def demo_gradient_check()`](autodiff.py#L275)
- [`def demo_exp_log()`](autodiff.py#L303)
- [`def demo_verify_pytorch()`](autodiff.py#L323)

## Run and test

From this folder:

```
python autodiff.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
