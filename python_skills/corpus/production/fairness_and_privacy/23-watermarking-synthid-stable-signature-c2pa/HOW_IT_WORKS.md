# How it works: Watermarking — SynthID, Stable Signature, C2PA

## `main.py`

```text
Toy token-watermark (SynthID-text-style) — stdlib Python.

Vocabulary: integers 0..N-1. Each decoding step hashes the previous k tokens
modulo N to partition the vocabulary into green (even hash) and red (odd
hash). Sampling is biased toward green. Detector computes green-token
z-score; reported at 1000 tokens.

Usage: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def green_set(prev_tokens)`](main.py#L25): Pseudorandom partition of the vocabulary into green (half of it).
- [`def unwatermarked_sample(n, seed_prefix)`](main.py#L34)
- [`def watermarked_sample(n, seed_prefix, bias)`](main.py#L41): Bias = probability of sampling from the green set.
- [`def detect(tokens)`](main.py#L52): Returns z-score: (green count - expected) / sqrt(expected * p(1-p)).
- [`def paraphrase(tokens, ratio)`](main.py#L67): Replace ratio of tokens at random with random tokens.
- [`def main()`](main.py#L76)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
