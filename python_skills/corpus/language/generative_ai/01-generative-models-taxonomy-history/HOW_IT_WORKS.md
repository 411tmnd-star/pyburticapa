# How it works: Generative Models — Taxonomy & History

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def sample_mixture(n, rng)`](main.py#L5): Two-mode Gaussian mixture. Mode A at -2 (sigma 0.6), mode B at +2 (sigma 0.9).
- [`def histogram_density(samples, x, bin_width)`](main.py#L16): Explicit density via histogram. Returns p(x) as (count in bin) / (n * bin_width).
- [`def kde_density(samples, x, bandwidth)`](main.py#L24): Approximate density via Gaussian kernel density estimate.
- [`def implicit_generator(samples, k, rng)`](main.py#L34): Implicit generator: sample a training point and add tiny noise. No p(x).
- [`def integrate_density(density_fn, samples, lo, hi, steps)`](main.py#L43): Trapezoid-rule integration of a density over [lo, hi].
- [`def ascii_histogram(samples, lo, hi, bins, height)`](main.py#L53): Tiny text histogram so you can see the two modes without a plotting lib.
- [`def main()`](main.py#L71)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
