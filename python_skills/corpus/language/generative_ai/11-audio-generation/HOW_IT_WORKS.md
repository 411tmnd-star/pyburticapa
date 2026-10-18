# How it works: Audio Generation

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def make_tokens(style, length, rng)`](main.py#L9): Synthetic 'audio token' sequences by style.
- [`def init_counts()`](main.py#L16)
- [`def update_counts(counts, sequence, style)`](main.py#L20)
- [`def probs(counts, style, prev_tok)`](main.py#L25)
- [`def entropy(p)`](main.py#L31)
- [`def sample_from(p, rng)`](main.py#L35)
- [`def generate(counts, style, start, length, rng, temperature)`](main.py#L45)
- [`def main()`](main.py#L57)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
