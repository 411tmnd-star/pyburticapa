# How it works: GANs — Generator vs Discriminator

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def sigmoid(x)`](main.py#L5)
- [`def leaky_relu(x, a)`](main.py#L13)
- [`def leaky_grad(x, a)`](main.py#L17)
- [`def randn_matrix(rows, cols, rng, scale)`](main.py#L21)
- [`def matmul(W, x)`](main.py#L25)
- [`def add(a, b)`](main.py#L29)
- [`def init_mlp(in_dim, hidden, out_dim, rng)`](main.py#L33)
- [`def forward_g(z, G)`](main.py#L42)
- [`def forward_d(x, D)`](main.py#L49)
- [`def sample_real(n, rng)`](main.py#L56)
- [`def sample_noise(n, z_dim, rng)`](main.py#L66)
- [`def update_d(reals, fakes, D, lr)`](main.py#L70): Gradient step on D to maximize log D(x) + log(1 - D(G(z))).
- [`def update_g(noise_batch, G, D, lr)`](main.py#L108): Non-saturating G loss: maximize log D(G(z)). Gradient flows through both.
- [`def mean(xs)`](main.py#L153)
- [`def main()`](main.py#L157)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
