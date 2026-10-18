# How it works: T5, BART — Encoder-Decoder Models

## `main.py`

```text
T5 span corruption + BART denoising noise functions.

Pure stdlib. Shows how encoder-decoder models turn any input into
a supervised (corrupted_input -> clean_spans) training pair.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def sentinel(i)`](main.py#L10)
- [`def corrupt_spans(tokens, mask_rate, mean_span, rng)`](main.py#L14): T5-style span corruption.
- [`def round_trip(source, target)`](main.py#L74): Reconstruct original by replacing sentinels in source with corresponding target spans.
- [`def token_mask(tokens, rate, rng, mask_token)`](main.py#L98)
- [`def token_delete(tokens, rate, rng)`](main.py#L104)
- [`def text_infill(tokens, rate, mean_span, rng, mask_token)`](main.py#L110): BART text infill: mask spans with a SINGLE mask; decoder infers length.
- [`def sentence_permute(sentences, rng)`](main.py#L130)
- [`def document_rotate(tokens, rng)`](main.py#L138)
- [`def main()`](main.py#L147)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
