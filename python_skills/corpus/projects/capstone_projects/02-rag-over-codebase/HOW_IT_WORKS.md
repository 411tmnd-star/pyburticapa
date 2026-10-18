# How it works: Capstone 02 — RAG over Codebase (Cross-Repo Semantic Search)

## `main.py`

```text
Code RAG — AST-aware chunking + hybrid retrieval scaffold.

The hard architectural primitive here is hybrid retrieval with rank fusion:
two index structures (dense vector, BM25) run in parallel, results are merged
with reciprocal rank fusion, then a re-ranker picks the final top-k. This
scaffold implements both halves with stdlib: a naive dense index (hash-based
fake embeddings so the loop runs deterministically offline) and a real BM25
from scratch. The fusion + rerank logic is the part that matters.

Run:  python main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Chunk`](main.py#L26)
  - [`def anchor(self)`](main.py#L35)
- [`def fake_embed(text, dim)`](main.py#L65): Hash-based deterministic embedding; stands in for Voyage-code-3.
- [`def cosine(a, b)`](main.py#L76)
- [`class DenseIndex`](main.py#L81)
  - [`def add(self, chunk)`](main.py#L84)
  - [`def search(self, query, k)`](main.py#L88)
- [`def tokenize(text)`](main.py#L99)
- [`class BM25Index`](main.py#L104)
  - [`def add(self, chunk)`](main.py#L113)
  - [`def search(self, query, k)`](main.py#L126)
- [`def rrf(dense, sparse, k_rrf)`](main.py#L149)
- [`def rerank(query, candidates, top_k)`](main.py#L167)
- [`def answer(query, dense, bm25)`](main.py#L183)
- [`def main()`](main.py#L198)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
