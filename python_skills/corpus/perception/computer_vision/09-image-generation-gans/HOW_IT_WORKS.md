# How it works: Image Generation — GANs

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`class Generator`](main.py#L9)
  - [`def forward(self, z)`](main.py#L26)
- [`class Discriminator`](main.py#L30)
  - [`def forward(self, x)`](main.py#L50)
- [`def train_step(G, D, real, z, opt_g, opt_d, device)`](main.py#L54)
- [`def synthetic_circles(num, size, seed)`](main.py#L74)
- [`def sample(G, n, z_dim, device)`](main.py#L89)
- [`def main()`](main.py#L97)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
