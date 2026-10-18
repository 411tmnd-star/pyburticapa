# How it works: GloVe, FastText, and Subword Embeddings

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def char_ngrams(word, n_min, n_max)`](main.py#L4)
- [`def learn_bpe(corpus, k_merges)`](main.py#L13)
- [`def apply_bpe(word, merges)`](main.py#L46)
- [`def main()`](main.py#L62)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
