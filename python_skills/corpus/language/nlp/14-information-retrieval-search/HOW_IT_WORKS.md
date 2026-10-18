# How it works: Information Retrieval and Search

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def tokenize(text)`](main.py#L6)
- [`class BM25`](main.py#L10)
  - [`def idf(self, term)`](main.py#L24)
  - [`def score(self, query, doc_idx)`](main.py#L28)
  - [`def rank(self, query, top_k)`](main.py#L43)
- [`def reciprocal_rank_fusion(rankings, k)`](main.py#L49)
- [`def fake_dense_rank(query, corpus, top_k)`](main.py#L58)
- [`def main()`](main.py#L77)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
