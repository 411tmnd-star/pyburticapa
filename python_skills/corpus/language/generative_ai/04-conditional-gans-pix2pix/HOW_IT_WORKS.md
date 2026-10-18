# How it works: Conditional GANs & Pix2Pix

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def sigmoid(x)`](main.py#L5)
- [`def leaky(x, a)`](main.py#L13)
- [`def leaky_grad(x, a)`](main.py#L17)
- [`def randn_matrix(rows, cols, rng, scale)`](main.py#L21)
- [`def matmul(W, x)`](main.py#L25)
- [`def add(a, b)`](main.py#L29)
- [`def one_hot(c, num)`](main.py#L33)
- [`def init_mlp(in_dim, hidden, out_dim, rng)`](main.py#L39)
- [`def g_forward(z, c, G, num_classes)`](main.py#L48)
- [`def d_forward(x, c, D, num_classes)`](main.py#L56)
- [`def sample_real_conditional(n, num_classes, rng)`](main.py#L64)
- [`def update_d(reals, fakes, D, num_classes, lr)`](main.py#L76)
- [`def accumulate_d_grad(x, c, target, D, num_classes, grads)`](main.py#L86)
- [`def update_g(noise, cs, G, D, num_classes, lr, l1_w, targets)`](main.py#L100): Non-saturating G loss + optional conditional L1 toward a target.
- [`def init_grads(net)`](main.py#L131)
- [`def apply_grads(net, grads, lr, n)`](main.py#L141)
- [`def mean(xs)`](main.py#L152)
- [`def main()`](main.py#L156)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
