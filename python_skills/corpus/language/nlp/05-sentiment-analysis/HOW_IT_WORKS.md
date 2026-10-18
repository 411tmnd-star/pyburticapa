# How it works: Sentiment Analysis

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def tokenize(text)`](main.py#L12)
- [`def apply_negation(tokens)`](main.py#L16)
- [`def build_vocab(docs)`](main.py#L32)
- [`def train_nb(docs_by_class, vocab, alpha)`](main.py#L40)
- [`def predict_nb(doc, class_priors, class_word_probs)`](main.py#L55)
- [`def evaluate(y_true, y_pred)`](main.py#L66)
- [`def main()`](main.py#L77)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
