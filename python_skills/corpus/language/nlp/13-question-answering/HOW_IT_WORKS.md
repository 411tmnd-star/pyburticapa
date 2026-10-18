# How it works: Question Answering Systems

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def tokenize(text)`](main.py#L5)
- [`def normalize(text)`](main.py#L9)
- [`def exact_match(pred, gold)`](main.py#L16)
- [`def token_f1(pred, gold)`](main.py#L20)
- [`def refusal_from_score(top_retrieval_score, threshold)`](main.py#L34)
- [`def toy_bm25_score(query, doc)`](main.py#L46)
- [`def toy_retrieve(question, top_k)`](main.py#L57)
- [`def main()`](main.py#L63)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
