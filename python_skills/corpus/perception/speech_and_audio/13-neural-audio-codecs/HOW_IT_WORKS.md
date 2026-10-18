# How it works: Neural Audio Codecs — EnCodec, SNAC, Mimi, DAC and the Semantic-Acoustic Split

## `main.py`

```text
Residual Vector Quantization (RVQ) from scratch.

Builds a toy 1-D signal, quantizes it with a cascade of tiny codebooks,
measures reconstruction error as codebooks are added. Illustrates why
modern audio codecs use RVQ rather than a single huge codebook.

Stdlib only. Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def generate_signal(n, seed)`](main.py#L14)
- [`def learn_codebook(values, size, iterations, seed)`](main.py#L19)
- [`def quantize_with_codebook(values, codebook)`](main.py#L36)
- [`def rvq_encode(values, codebook_size, n_codebooks)`](main.py#L46)
- [`def rvq_decode(all_indices, codebooks, length)`](main.py#L58)
- [`def mse(a, b)`](main.py#L66)
- [`def main()`](main.py#L70)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
