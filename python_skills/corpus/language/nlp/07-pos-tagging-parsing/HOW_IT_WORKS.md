# How it works: POS Tagging and Syntactic Parsing

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def train_mft(examples)`](main.py#L15)
- [`def predict_mft(tokens, word_best, default_tag)`](main.py#L27)
- [`def train_hmm(examples, alpha)`](main.py#L31)
- [`def log_prob(table, given, key, smooth_denom, alpha)`](main.py#L48)
- [`def viterbi(tokens, transitions, emissions, tags, vocab, alpha)`](main.py#L52)
- [`def main()`](main.py#L89)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
