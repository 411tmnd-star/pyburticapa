# How it works: Introduction to JAX

## `jax_intro.py`

Functions and classes, in file order (click to jump to the line):

- [`def get_mnist_data()`](jax_intro.py#L7)
- [`def init_params(key)`](jax_intro.py#L17)
- [`def forward(params, x)`](jax_intro.py#L39)
- [`def loss_fn(params, x, y)`](jax_intro.py#L48)
- [`def train_step(params, opt_state, x, y)`](jax_intro.py#L58)
- [`def accuracy(params, x, y)`](jax_intro.py#L66)
- [`def train()`](jax_intro.py#L72)
- [`def demo_grad()`](jax_intro.py#L109)
- [`def demo_vmap()`](jax_intro.py#L123)
- [`def demo_jit()`](jax_intro.py#L142)

## Run and test

From this folder:

```
python jax_intro.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
