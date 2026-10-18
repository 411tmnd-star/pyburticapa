# How it works: StyleGAN

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def leaky(x, a)`](main.py#L5)
- [`def randn_matrix(rows, cols, rng, scale)`](main.py#L9)
- [`def matmul(W, x)`](main.py#L13)
- [`def add(a, b)`](main.py#L17)
- [`def mean_std(xs)`](main.py#L21)
- [`def adain(features, scale, bias)`](main.py#L27)
- [`def mapping(z, layers)`](main.py#L32)
- [`def init_mapping(z_dim, w_dim, depth, rng)`](main.py#L40)
- [`def stylegan_forward(w, const, synth, noise_sigma, rng, adain_on)`](main.py#L48): Very small 'synthesis' network: three resolution blocks on a 4-channel constant.
- [`def init_synth(hidden, w_dim, rng)`](main.py#L65)
- [`def main()`](main.py#L75)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
