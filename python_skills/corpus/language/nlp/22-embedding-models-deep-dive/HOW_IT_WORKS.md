# How it works: Embedding Models — The 2026 Deep Dive

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def tokenize(text)`](main.py#L7)
- [`def hash_token(token, dim, seed)`](main.py#L11)
- [`def hash_embed(text, dim)`](main.py#L16)
- [`def cosine(a, b)`](main.py#L28)
- [`def truncate_matryoshka(vec, new_dim)`](main.py#L34)
- [`def rank(corpus_embs, query_emb)`](main.py#L42)
- [`def sparse_embed(text)`](main.py#L48)
- [`def sparse_score(q_sparse, d_sparse)`](main.py#L52)
- [`def rrf_fuse(rankings, k)`](main.py#L59)
- [`def main()`](main.py#L67)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
