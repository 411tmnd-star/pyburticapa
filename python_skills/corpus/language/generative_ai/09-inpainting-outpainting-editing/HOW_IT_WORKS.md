# How it works: Inpainting, Outpainting & Image Editing

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def sin_embed(t, T, dim)`](main.py#L5)
- [`def tanh(v)`](main.py#L15)
- [`def tanh_grad(h)`](main.py#L19)
- [`def matmul(W, x)`](main.py#L23)
- [`def add(a, b)`](main.py#L27)
- [`def randn_matrix(rows, cols, rng, scale)`](main.py#L31)
- [`def init_net(x_dim, t_dim, hidden, rng)`](main.py#L35)
- [`def forward(x_t, t_emb, net)`](main.py#L46)
- [`def backward(target, out, cache, net)`](main.py#L56)
- [`def apply(net, grads, lr)`](main.py#L85)
- [`def make_schedule(T)`](main.py#L96)
- [`def sample_data(rng, d)`](main.py#L106)
- [`def train(net, alpha_bars, T, steps, lr, t_dim, d, rng)`](main.py#L112)
- [`def sample_unconditional(net, alphas, alpha_bars, T, t_dim, d, rng)`](main.py#L125)
- [`def inpaint(net, alphas, alpha_bars, T, t_dim, d, clean, mask, rng)`](main.py#L140): mask[i] == True means that dim is to be regenerated. Unmasked dims pinned to clean.
- [`def main()`](main.py#L163)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
