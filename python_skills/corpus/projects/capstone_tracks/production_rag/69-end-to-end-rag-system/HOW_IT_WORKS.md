# How it works: End-to-End RAG System

## `main.py`

```text
End-to-end RAG pipeline composing lessons 64-68.

Self-terminating demo: ingests fixture corpus, runs queries, runs eval,
prints results, exits 0 on success or non-zero on threshold failure.

References:
- ./docs/en.md
- Phase 19 lesson 64 (chunker)
- Phase 19 lesson 65 (hybrid retriever)
- Phase 19 lesson 66 (cross-encoder reranker)
- Phase 19 lesson 67 (query rewriter)
- Phase 19 lesson 68 (eval suite)

Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def tokenize(text)`](main.py#L45)
- [`def _content_tokens(text)`](main.py#L54)
- [`def _stable_hash(tok)`](main.py#L58)
- [`def mock_embed(text, dim)`](main.py#L66)
- [`def cosine(a, b)`](main.py#L79)
- [`class Chunk`](main.py#L88)
  - [`def anchor(self)`](main.py#L93)
- [`def _recursive_split(text, separators, target)`](main.py#L104)
- [`class Chunker`](main.py#L130)
  - [`def chunk(self, doc_id, text)`](main.py#L134)
- [`class BM25Index`](main.py#L144)
  - [`def add(self, c)`](main.py#L153)
  - [`def search(self, query, k)`](main.py#L163)
- [`class DenseIndex`](main.py#L185)
  - [`def add(self, c)`](main.py#L188)
  - [`def search_vec(self, qv, k)`](main.py#L191)
  - [`def search(self, query, k)`](main.py#L196)
- [`def rrf(rankings, k)`](main.py#L200)
- [`class HybridIndex`](main.py#L212)
  - [`def add(self, c)`](main.py#L216)
  - [`def search(self, query, k_each, k_out)`](main.py#L220)
  - [`def search_with_hypothetical(self, query, hypothetical, k_each, k_out)`](main.py#L225)
- [`class Rewriter`](main.py#L249)
  - [`def pick_strategy(self, query)`](main.py#L250)
  - [`def rewrite_hyde(self, query)`](main.py#L257)
  - [`def rewrite_multiquery(self, query)`](main.py#L260)
  - [`def rewrite_decompose(self, query)`](main.py#L268)
- [`def _token_to_id(token)`](main.py#L278)
- [`def tokenize_pair(query, document, max_len)`](main.py#L282)
- [`class CrossEncoder`](main.py#L297)
  - [`def forward(self, ids, tids)`](main.py#L313)
- [`def train_reranker(model, triples, epochs, lr)`](main.py#L371)
- [`def rerank(model, query, candidates, top_k, overlap_weight)`](main.py#L397): Blend the cross-encoder score with a content-overlap signal.
- [`def generate_answer(query, ranked)`](main.py#L435)
- [`class Result`](main.py#L462)
- [`class Pipeline`](main.py#L471)
  - [`def ingest(self, docs)`](main.py#L479)
  - [`def train_reranker_on(self, triples)`](main.py#L484)
  - [`def query(self, question)`](main.py#L487)
- [`class EvalQuery`](main.py#L565)
- [`def doc_level_recall(retrieved_chunks, gold, k)`](main.py#L588)
- [`def doc_level_precision(retrieved_chunks, gold, k)`](main.py#L595)
- [`def doc_level_mrr(retrieved_chunks, gold)`](main.py#L604)
- [`def faithfulness_score(answer, top_k)`](main.py#L617)
- [`def answer_relevance_score(query, answer)`](main.py#L642)
- [`def build_pipeline()`](main.py#L663)
- [`def run_eval(p)`](main.py#L670)
- [`def run_demo()`](main.py#L684)

## Run and test

From this folder:

```
python main.py
python -m unittest discover -s tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
