# How it works: Hybrid Retrieval with BM25 and Dense Embeddings

## `main.py`

```text
Hybrid retrieval: BM25 + dense + reciprocal rank fusion.

Pure-Python implementation. BM25 from the Robertson/Sparck Jones paper.
RRF from the 2009 Cormack/Clarke/Buettcher SIGIR paper.

References:
- ./docs/en.md
- Phase 19 lesson 64 (chunkers feeding this retriever)
- Phase 19 lesson 66 (reranker consuming the fused top-k)
- Phase 19 lesson 68 (eval harness over this retriever)

Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Doc`](main.py#L25)
  - [`def field_text(self, field_name)`](main.py#L30)
- [`def tokenize(text)`](main.py#L41)
- [`class BM25Index`](main.py#L50)
  - [`def _doc_tokens(self, doc)`](main.py#L60)
  - [`def add(self, doc)`](main.py#L67)
  - [`def search(self, query, k)`](main.py#L77)
- [`def mock_embed(text, dim)`](main.py#L103)
- [`def cosine(a, b)`](main.py#L120)
- [`class DenseIndex`](main.py#L125)
  - [`def add(self, doc)`](main.py#L128)
  - [`def search(self, query, k)`](main.py#L132)
- [`def rrf(rankings, k, weights)`](main.py#L143)
- [`class HybridRetriever`](main.py#L167)
  - [`def add(self, doc)`](main.py#L174)
  - [`def search(self, query, k_each, k_out)`](main.py#L178)
- [`def print_ranking(label, hits, top)`](main.py#L225)
- [`def main()`](main.py#L231)

## Run and test

From this folder:

```
python main.py
python -m unittest discover -s tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
