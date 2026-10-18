# How it works: Flow Matching & Rectified Flows

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def tanh(v)`](main.py#L5)
- [`def tanh_grad(h)`](main.py#L9)
- [`def matmul(W, x)`](main.py#L13)
- [`def add(a, b)`](main.py#L17)
- [`def randn_matrix(rows, cols, rng, scale)`](main.py#L21)
- [`def init_net(in_dim, hidden, out_dim, rng)`](main.py#L25)
- [`def forward(x, t, net)`](main.py#L36)
- [`def backward(target, out, cache, net)`](main.py#L46)
- [`def apply(net, grads, lr)`](main.py#L73)
- [`def sample_data(rng)`](main.py#L84)
- [`def train(net, steps, lr, rng)`](main.py#L88)
- [`def sample(net, num_steps, rng)`](main.py#L100)
- [`def histogram(samples, lo, hi, bins)`](main.py#L110)
- [`def main()`](main.py#L126)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
