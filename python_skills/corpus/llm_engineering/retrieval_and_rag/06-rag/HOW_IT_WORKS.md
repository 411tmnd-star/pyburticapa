# How it works: RAG (Retrieval-Augmented Generation)

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def chunk_text(text, chunk_size, overlap)`](main.py#L5)
- [`def build_vocabulary(documents)`](main.py#L17)
- [`def compute_tf(text, vocab)`](main.py#L24)
- [`def compute_idf(documents, vocab)`](main.py#L33)
- [`def tfidf_embed(text, vocab, idf)`](main.py#L42)
- [`def cosine_similarity(a, b)`](main.py#L47)
- [`def search(query_embedding, stored_embeddings, top_k)`](main.py#L56)
- [`def build_rag_prompt(query, retrieved_chunks)`](main.py#L65)
- [`def simple_generate(prompt, retrieved_chunks)`](main.py#L80)
- [`class RAGPipeline`](main.py#L105)
  - [`def index(self, documents, source_names)`](main.py#L116)
  - [`def query(self, question, top_k)`](main.py#L135)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
