# How it works: Subword Tokenization — BPE, WordPiece, Unigram, SentencePiece

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def word_counts(text)`](main.py#L5)
- [`def init_vocab(counts)`](main.py#L10)
- [`def pair_counts(vocab)`](main.py#L14)
- [`def merge_pair(vocab, pair)`](main.py#L22)
- [`def train_bpe(text, num_merges)`](main.py#L40)
- [`def encode_bpe(word, merges)`](main.py#L59)
- [`def main()`](main.py#L72)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
