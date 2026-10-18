# How it works: Chameleon and Early-Fusion Token-Only Multimodal Models

## `main.py`

```text
Chameleon-style early-fusion: toy VQ quantizer + shared-vocab autoregressive decoder.

End-to-end pipeline:
  1. VQ-VAE-ish quantizer: 8x8 grayscale patch -> integer codebook index, K=16.
  2. Shared vocab: text ids 0..31, image ids 32..47, separators 48 (<image>), 49 (</image>).
  3. Bigram decoder trained on synthetic (text + <image> codes </image>) pairs.
  4. Sampling loop that emits mixed-modality output.

Stdlib only. The transformer is a bigram count table — the point is to see the
shared-vocabulary loop in miniature, not to get image quality.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def quantize_patch(patch)`](main.py#L32): Nearest-codebook lookup by L2 distance.
- [`def image_to_tokens(img)`](main.py#L44): 8x8 grayscale -> 4 patches of 4 floats (downsampled). Return token IDs.
- [`def synthesize_caption(kind)`](main.py#L61): Pick a short synthetic text token sequence.
- [`def synth_image(kind)`](main.py#L72)
- [`def make_dataset(n)`](main.py#L77)
- [`def train_bigram(corpus)`](main.py#L89)
- [`def sample_next(bigram, prev)`](main.py#L97)
- [`def generate(bigram, prompt, max_len)`](main.py#L111)
- [`def render(tokens)`](main.py#L121)
- [`def main()`](main.py#L135)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
