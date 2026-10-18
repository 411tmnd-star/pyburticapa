# How it works: Optimization

## `optimizers.py`

Functions and classes, in file order (click to jump to the line):

- [`def rosenbrock(params)`](optimizers.py#L4)
- [`def rosenbrock_gradient(params)`](optimizers.py#L9)
- [`class GradientDescent`](optimizers.py#L16)
  - [`def step(self, params, grads)`](optimizers.py#L20)
- [`class SGDMomentum`](optimizers.py#L24)
  - [`def step(self, params, grads)`](optimizers.py#L30)
- [`class Adam`](optimizers.py#L40)
  - [`def step(self, params, grads)`](optimizers.py#L50)
- [`def optimize(optimizer, func, grad_func, start, steps)`](optimizers.py#L75)
- [`def distance_to_minimum(params, target)`](optimizers.py#L92)
- [`def find_convergence_step(history, func, threshold)`](optimizers.py#L96)
- [`def print_trajectory(name, history, func, steps_to_show)`](optimizers.py#L103)
- [`def print_ascii_convergence(results, func, steps)`](optimizers.py#L123)
- [`def demo_comparison()`](optimizers.py#L167)
- [`def demo_learning_rate_effect()`](optimizers.py#L203)
- [`def demo_momentum_effect()`](optimizers.py#L227)
- [`def demo_saddle_point()`](optimizers.py#L249)

## Run and test

From this folder:

```
python optimizers.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
