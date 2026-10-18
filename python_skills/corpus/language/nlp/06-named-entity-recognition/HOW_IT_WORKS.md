# How it works: Named Entity Recognition

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def word_shape(word)`](main.py#L6)
- [`def rule_based_ner(tokens)`](main.py#L20)
- [`def spans_to_bio(tokens, spans)`](main.py#L34)
- [`def bio_to_spans(tokens, labels)`](main.py#L43)
- [`def token_features(token, prev_token, next_token)`](main.py#L62)
- [`def main()`](main.py#L75)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
