# How it works: Autoencoders & Variational Autoencoders (VAE)

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def matmul(W, x)`](main.py#L5)
- [`def add(a, b)`](main.py#L9)
- [`def tanh(v)`](main.py#L13)
- [`def tanh_grad(h)`](main.py#L17)
- [`def randn_matrix(rows, cols, rng, scale)`](main.py#L21)
- [`def init_vae(in_dim, hidden, z_dim, rng)`](main.py#L25)
- [`def clamp(v, lo, hi)`](main.py#L44)
- [`def forward(x, params, eps)`](main.py#L48): Forward pass with a fixed epsilon for the reparameterization.
- [`def loss_value(x, fwd, beta)`](main.py#L64)
- [`def backward(x, fwd, params, beta)`](main.py#L71): Hand-written backprop. Returns gradient dict matching params shape.
- [`def apply_update(params, grads, lr)`](main.py#L128)
- [`def sample_mixture(n, d, rng)`](main.py#L141)
- [`def mean(xs)`](main.py#L152)
- [`def main()`](main.py#L156)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
