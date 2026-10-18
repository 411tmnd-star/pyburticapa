# How it works: Coreference Resolution

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def extract_mentions(text)`](main.py#L27)
- [`def infer_gender(name)`](main.py#L62)
- [`def agreement_score(mention, candidate)`](main.py#L71)
- [`def recency_score(mention, candidate)`](main.py#L84)
- [`def resolve(mentions)`](main.py#L89)
- [`def clusters(mentions, links)`](main.py#L103)
- [`def main()`](main.py#L125)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
