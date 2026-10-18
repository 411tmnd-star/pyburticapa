# How it works: Diffusion Models — DDPM from Scratch

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def sin_embed(t, T, dim)`](main.py#L5): Sinusoidal timestep embedding.
- [`def tanh(v)`](main.py#L16)
- [`def tanh_grad(h)`](main.py#L20)
- [`def matmul(W, x)`](main.py#L24)
- [`def add(a, b)`](main.py#L28)
- [`def randn_matrix(rows, cols, rng, scale)`](main.py#L32)
- [`def init_net(x_dim, t_dim, hidden, rng)`](main.py#L36)
- [`def forward(x_t, t_embed, net)`](main.py#L47)
- [`def backward(target_eps, eps_hat, cache, net)`](main.py#L57)
- [`def apply_update(net, grads, lr)`](main.py#L87)
- [`def make_schedule(T)`](main.py#L98)
- [`def sample_data(rng)`](main.py#L108)
- [`def train(net, alpha_bars, T, steps, lr, t_dim, rng)`](main.py#L112)
- [`def sample(net, alphas, alpha_bars, T, t_dim, rng)`](main.py#L128)
- [`def histogram(samples, lo, hi, bins)`](main.py#L142)
- [`def main()`](main.py#L158)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
