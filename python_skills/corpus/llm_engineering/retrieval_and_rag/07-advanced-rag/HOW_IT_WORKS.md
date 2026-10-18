# How it works: Advanced RAG (Chunking, Reranking, Hybrid Search)

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def chunk_text(text, chunk_size, overlap)`](main.py#L5)
- [`def build_vocabulary(documents)`](main.py#L17)
- [`def compute_tf(text, vocab)`](main.py#L24)
- [`def compute_idf(documents, vocab)`](main.py#L33)
- [`def tfidf_embed(text, vocab, idf)`](main.py#L42)
- [`def cosine_similarity(a, b)`](main.py#L47)
- [`def vector_search(query_embedding, stored_embeddings, top_k)`](main.py#L56)
- [`class BM25`](main.py#L65)
  - [`def index(self, documents)`](main.py#L75)
  - [`def score(self, query, doc_idx)`](main.py#L90)
  - [`def search(self, query, top_k)`](main.py#L109)
- [`def reciprocal_rank_fusion(ranked_lists, k)`](main.py#L115)
- [`def hybrid_search(query, chunks, vector_embeddings, vocab, idf, bm25_index, top_k, retrieval_pool)`](main.py#L126)
- [`def rerank(query, candidates, chunks)`](main.py#L134)
- [`def hyde_generate_hypothesis(query)`](main.py#L173)
- [`def hyde_search(query, vector_embeddings, vocab, idf, top_k)`](main.py#L195)
- [`def create_parent_child_chunks(text, parent_size, child_size)`](main.py#L202)
- [`def evaluate_faithfulness(answer, retrieved_chunks)`](main.py#L230)
- [`def evaluate_retrieval_recall(queries_with_relevant, retrieval_fn, k)`](main.py#L260)
- [`def build_rag_prompt(query, retrieved_chunks)`](main.py#L282)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
