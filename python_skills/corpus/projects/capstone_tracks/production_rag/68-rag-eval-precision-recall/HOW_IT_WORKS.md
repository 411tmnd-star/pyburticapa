# How it works: RAG Evaluation: Precision, Recall, MRR, nDCG, Faithfulness, Answer Relevance

## `main.py`

```text
RAG eval: precision, recall, MRR, nDCG, faithfulness, answer relevance.

Pure-Python. Mock LLM-as-judge so the eval runs offline.

References:
- ./docs/en.md
- Phase 19 lessons 64-67 (components measured by these metrics)
- Phase 19 lesson 69 (end-to-end system this eval grades)

Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Qrel`](main.py#L27)
- [`def precision_at_k(retrieved, gold, k)`](main.py#L39)
- [`def recall_at_k(retrieved, gold, k)`](main.py#L48)
- [`def reciprocal_rank(retrieved, gold)`](main.py#L55)
- [`def mean_reciprocal_rank(retrieved_per_query, gold_per_query)`](main.py#L62)
- [`def dcg_at_k(retrieved, graded, k)`](main.py#L74)
- [`def ndcg_at_k(retrieved, graded, k)`](main.py#L84)
- [`def extract_claims(answer)`](main.py#L101)
- [`def _content_tokens(text)`](main.py#L109)
- [`class MockJudge`](main.py#L120): Deterministic stand-in for LLM-as-judge.
  - [`def supported(self, claim, context)`](main.py#L131)
  - [`def relevant(self, question, answer)`](main.py#L141)
- [`def faithfulness(claims, context_texts, judge)`](main.py#L150)
- [`def answer_relevance(question, answer, judge)`](main.py#L158)
- [`class Doc`](main.py#L167)
  - [`def text(self)`](main.py#L172)
- [`def _bow(text)`](main.py#L251)
- [`def _score_doc(query, doc)`](main.py#L255)
- [`def _baseline_tokens(text)`](main.py#L268)
- [`def baseline_pipeline(query, k)`](main.py#L272): Bag-of-words term overlap on content tokens only.
- [`def hybrid_pipeline(query, k)`](main.py#L303): Lexical baseline plus a synonym pass; stand-in for the lesson 65 retriever.
- [`def hybrid_plus_rerank_pipeline(query, k)`](main.py#L324): Hybrid + reranker that boosts docs whose title contains query-content tokens.
- [`def evaluate_pipeline(pipeline, qrels, ks, judge)`](main.py#L354)
- [`def _fmt(v)`](main.py#L402)
- [`def main()`](main.py#L406)

## Run and test

From this folder:

```
python main.py
python -m unittest discover -s tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
