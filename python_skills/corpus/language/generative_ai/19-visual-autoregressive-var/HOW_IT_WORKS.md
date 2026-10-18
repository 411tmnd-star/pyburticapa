# How it works: Visual Autoregressive Modeling (VAR): Next-Scale Prediction

## `main.py`

```text
Toy Visual Autoregressive (VAR) model: next-scale prediction over a pyramid.

A minimal numpy implementation of the VAR mechanism described in
docs/en.md. Three pieces:

1. A multi-scale residual VQ tokenizer over tiny 8x8 "images" (a small
   library of patterns: solid, gradient, ring, checker, cross). Tokens at
   scale k encode the residual left by scales 1..k-1. The decoder is the
   sum of upsampled scale embeddings.
2. A scale-conditioned next-scale predictor (a logistic / softmax mini-LM
   over the small vocab). The "transformer" is approximated by per-scale
   conditional histograms; the geometry the lesson teaches is the
   scale-ordered conditioning and the parallel-within-scale prediction,
   not deep attention.
3. A generation loop that runs K transformer passes (one per scale) and
   samples every position at the current scale in parallel from the
   conditional. Decoded sums of scale embeddings reconstruct an image.

The point is to exercise the scale-ordered training data, the parallel-
within-scale sampling, and the residual-VQ reconstruction. A real VAR
swaps the histogram for a transformer and the pattern library for an
image dataset; the harness around them stays the same.

Stdlib + numpy only.

Run:
    python main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def make_patterns(rng, n)`](main.py#L40): Return n grayscale 8x8 patterns drawn from a tiny library.
- [`def fit_codebook(samples, k, iters, seed)`](main.py#L63): k-means on scalar samples; returns codebook of length k.
- [`def encode(values, codebook)`](main.py#L82): Snap each value to the nearest code; return integer tokens.
- [`def downsample(img, target)`](main.py#L88): Average-pool an HxW image down to target x target.
- [`def upsample(grid, target)`](main.py#L97): Nearest-neighbor upsample a HxW grid up to target x target.
- [`def tokenize_multiscale(img, codebooks)`](main.py#L106): Residual VQ: each scale tokenizes what previous scales missed.
- [`def detokenize_multiscale(tokens, codebooks)`](main.py#L120): Decoder: sum upsampled scale embeddings.
- [`def train_codebooks(images)`](main.py#L129): Fit per-scale codebooks on residuals from a small image set.
- [`def context_key(prev_tokens)`](main.py#L143): Hashable summary of all previous scales' tokens.
- [`def fit_predictor(token_streams)`](main.py#L148): One conditional histogram per scale, keyed on previous-scale summary.
- [`def sample_categorical(probs, rng)`](main.py#L171)
- [`def generate(predictors, codebooks, rng)`](main.py#L175): One VAR sample: K passes, parallel-within-scale, causal across scales.
- [`def reconstruction_mse(images, codebooks)`](main.py#L194)
- [`def main()`](main.py#L204)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
