# How it works: Query Rewriting: HyDE, Multi-Query, and Decomposition

## `main.py`

```text
Query rewriting strategies: HyDE, multi-query, decomposition.

Implements three rewriters on top of a shared hybrid retriever. Uses a
deterministic mock LLM so the loop runs offline.

References:
- ./docs/en.md
- Phase 19 lesson 65 (hybrid retriever consumed below)
- Phase 19 lesson 66 (reranker on the rewriter's output in production)
- Phase 19 lesson 69 (end-to-end pipeline composing rewriter + retriever + reranker)

Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def tokenize(text)`](main.py#L31)
- [`def mock_embed(text, dim)`](main.py#L35)
- [`def cosine(a, b)`](main.py#L51)
- [`class Doc`](main.py#L60)
  - [`def field_text(self)`](main.py#L65)
- [`class BM25Index`](main.py#L70)
  - [`def add(self, doc)`](main.py#L79)
  - [`def search(self, query, k)`](main.py#L89)
- [`class DenseIndex`](main.py#L111)
  - [`def add(self, doc)`](main.py#L114)
  - [`def search_vec(self, qv, k)`](main.py#L117)
  - [`def search(self, query, k)`](main.py#L122)
- [`def rrf(rankings, k)`](main.py#L126)
- [`class HybridRetriever`](main.py#L138)
  - [`def add(self, doc)`](main.py#L142)
  - [`def search(self, query, k_each, k_out)`](main.py#L146)
  - [`def search_vec(self, qv, qtext, k_each, k_out)`](main.py#L151)
- [`class MockLLM`](main.py#L226)
  - [`def generate_hypothetical(self, query)`](main.py#L227)
  - [`def paraphrase(self, query, n)`](main.py#L239)
  - [`def decompose(self, query)`](main.py#L257)
- [`class RewriteResult`](main.py#L273)
- [`class Rewriter`](main.py#L279)
  - [`def rewrite(self, query)`](main.py#L282)
- [`class HyDERewriter`](main.py#L287)
  - [`def rewrite(self, query)`](main.py#L291)
- [`class MultiQueryRewriter`](main.py#L297)
  - [`def rewrite(self, query)`](main.py#L302)
- [`class DecomposeRewriter`](main.py#L308)
  - [`def rewrite(self, query)`](main.py#L312)
- [`def retrieve_with_rewriter(query, rewriter, retriever, k_each, k_out)`](main.py#L321)
- [`def rwriter_name(rw)`](main.py#L344)
- [`def build_retriever()`](main.py#L388)
- [`def main()`](main.py#L399)
- [`class _IdentityRewriter`](main.py#L423)
  - [`def rewrite(self, query)`](main.py#L426)

## Run and test

From this folder:

```
python main.py
python -m unittest discover -s tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
