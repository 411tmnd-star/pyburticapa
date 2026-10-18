# How it works: Debugging Neural Networks

## `debug_neural_nets.py`

Functions and classes, in file order (click to jump to the line):

- [`class NetworkDebugger`](debug_neural_nets.py#L7)
  - [`def _register_hooks(self)`](debug_neural_nets.py#L16)
  - [`def _make_activation_hook(self, name)`](debug_neural_nets.py#L24)
  - [`def _make_gradient_hook(self, name)`](debug_neural_nets.py#L37)
  - [`def record_loss(self, loss_value)`](debug_neural_nets.py#L50)
  - [`def check_loss_health(self)`](debug_neural_nets.py#L53)
  - [`def check_activations(self)`](debug_neural_nets.py#L70)
  - [`def check_gradients(self)`](debug_neural_nets.py#L87)
  - [`def print_report(self)`](debug_neural_nets.py#L109)
  - [`def remove_hooks(self)`](debug_neural_nets.py#L134)
- [`def overfit_one_batch(model, x_batch, y_batch, criterion, lr, steps)`](debug_neural_nets.py#L140)
- [`def find_learning_rate(model, x_data, y_data, criterion, start_lr, end_lr, steps)`](debug_neural_nets.py#L174)
- [`def _flat_to_multi_index(flat_idx, shape)`](debug_neural_nets.py#L226)
- [`def gradient_check(model, x, y, criterion, eps)`](debug_neural_nets.py#L235)
- [`def demo_broken_networks()`](debug_neural_nets.py#L297)

## Run and test

From this folder:

```
python debug_neural_nets.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
