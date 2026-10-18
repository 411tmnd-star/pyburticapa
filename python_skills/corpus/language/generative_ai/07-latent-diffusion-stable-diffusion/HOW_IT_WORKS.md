# How it works: Latent Diffusion & Stable Diffusion

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def sin_embed(t, T, dim)`](main.py#L5)
- [`def one_hot(c, num)`](main.py#L15)
- [`def tanh(v)`](main.py#L21)
- [`def tanh_grad(h)`](main.py#L25)
- [`def matmul(W, x)`](main.py#L29)
- [`def add(a, b)`](main.py#L33)
- [`def randn_matrix(rows, cols, rng, scale)`](main.py#L37)
- [`def init_net(x_dim, t_dim, c_dim, hidden, rng)`](main.py#L44)
- [`def forward(x_t, t_emb, c_emb, net)`](main.py#L55)
- [`def backward(target, out, cache, net)`](main.py#L65)
- [`def apply(net, grads, lr)`](main.py#L94)
- [`def make_schedule(T)`](main.py#L105)
- [`def encode(x)`](main.py#L115)
- [`def decode(z)`](main.py#L119)
- [`def sample_data(rng)`](main.py#L123)
- [`def main()`](main.py#L129)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
