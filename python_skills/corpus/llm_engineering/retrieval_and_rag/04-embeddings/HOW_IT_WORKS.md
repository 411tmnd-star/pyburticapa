# How it works: Embeddings & Vector Representations

## `embeddings.py`

Functions and classes, in file order (click to jump to the line):

- [`def chunk_text(text, chunk_size, overlap)`](embeddings.py#L6)
- [`def chunk_by_sentences(text, max_chunk_tokens)`](embeddings.py#L18)
- [`class SimpleEmbedder`](embeddings.py#L37)
  - [`def fit(self, documents)`](embeddings.py#L43)
  - [`def embed(self, text)`](embeddings.py#L55)
  - [`def embed_batch(self, texts)`](embeddings.py#L69)
- [`def cosine_similarity(a, b)`](embeddings.py#L73)
- [`def dot_product(a, b)`](embeddings.py#L82)
- [`def euclidean_distance(a, b)`](embeddings.py#L86)
- [`def hamming_distance(a, b)`](embeddings.py#L90)
- [`def binarize(vec)`](embeddings.py#L94)
- [`class VectorIndex`](embeddings.py#L98)
  - [`def add(self, vector, text, meta)`](embeddings.py#L104)
  - [`def search(self, query_vector, top_k, metric)`](embeddings.py#L109)
  - [`def size(self)`](embeddings.py#L134)
- [`class SemanticSearchEngine`](embeddings.py#L138)
  - [`def index_documents(self, documents, source_names)`](embeddings.py#L145)
  - [`def search(self, query, top_k, metric)`](embeddings.py#L159)
  - [`def search_with_scores(self, query, top_k)`](embeddings.py#L163)
- [`def compare_metrics(engine, query, top_k)`](embeddings.py#L175)
- [`def truncate_embedding(vec, dimensions)`](embeddings.py#L186)

## Run and test

From this folder:

```
python embeddings.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
