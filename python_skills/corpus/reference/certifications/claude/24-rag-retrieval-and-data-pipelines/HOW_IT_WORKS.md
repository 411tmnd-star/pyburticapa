# How it works: RAG, Retrieval, and Data Pipelines

## `code/main.py`

```text
Retrieval incident lab for docs/en.md in this lesson.

Implements chunking, a compact BM25-style index, provenance, and retrieval evals.
Uses only the Python standard library so every ranking decision stays visible.
The production comparison is described in the lesson documentation.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def tokenize(text)`](code/main.py#L20)
- [`class Document`](code/main.py#L25)
- [`class Chunk`](code/main.py#L33)
- [`class RetrievalHit`](code/main.py#L42)
- [`def chunk_document(document, max_words, overlap_words)`](code/main.py#L50)
- [`class RetrievalIndex`](code/main.py#L78)
  - [`def build(cls, documents, max_words, overlap_words)`](code/main.py#L89)
  - [`def _inverse_document_frequency(self, term)`](code/main.py#L96)
  - [`def _score(self, query_terms, index, k1, b)`](code/main.py#L103)
  - [`def search(self, query, top_k)`](code/main.py#L117)
- [`class RetrievalCase`](code/main.py#L142)
- [`def evaluate_retrieval(index, cases, top_k)`](code/main.py#L147)
- [`def demo()`](code/main.py#L165)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
