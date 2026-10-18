# How it works: Natural Language Inference — Textual Entailment

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def tokenize(text)`](main.py#L12)
- [`def content_words(tokens)`](main.py#L16)
- [`def has_negation(tokens)`](main.py#L20)
- [`def lexical_overlap(prem_tokens, hyp_tokens)`](main.py#L24)
- [`def predict_nli(premise, hypothesis)`](main.py#L34)
- [`def evaluate(examples)`](main.py#L51)
- [`def main()`](main.py#L66)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
