# How it works: Literature Retrieval

## `code/main.py`

```text
Literature retrieval: BM25 over abstracts plus citation graph traversal, merged.

Conceptual references:
- ./docs/en.md (this lesson)
- Phase 19 Track A lessons 20-29 (agent harness primitives)

Stdlib only. Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Paper`](code/main.py#L24)
  - [`def to_dict(self)`](code/main.py#L34)
- [`def tokenise(text)`](code/main.py#L46)
- [`class BM25Index`](code/main.py#L50): Okapi BM25 with default k1=1.5, b=0.75. Stdlib only.
  - [`def add(self, doc_id, text)`](code/main.py#L62)
  - [`def finalise(self)`](code/main.py#L71)
  - [`def idf(self, term)`](code/main.py#L77)
  - [`def score(self, doc_id, query_terms)`](code/main.py#L81)
  - [`def search(self, query, top_k)`](code/main.py#L96)
- [`class CitationGraph`](code/main.py#L110): Directed citation graph with forward and backward adjacency lists.
  - [`def add_paper(self, paper)`](code/main.py#L117)
  - [`def neighbours(self, doc_id)`](code/main.py#L121)
  - [`def expand(self, seeds, max_hops)`](code/main.py#L126): Return a mapping of paper id to shortest hop distance from any seed.
- [`class ArxivMockClient`](code/main.py#L143): Returns title, abstract, year, authors. No reference graph.
  - [`def search(self, query)`](code/main.py#L149)
- [`class SemanticScholarMockClient`](code/main.py#L166): Returns the same papers as arxiv plus references and citations.
  - [`def search(self, query)`](code/main.py#L172)
  - [`def fetch(self, paper_id)`](code/main.py#L190)
- [`class RetrievalConfig`](code/main.py#L207)
- [`class RankedPaper`](code/main.py#L220)
  - [`def to_dict(self)`](code/main.py#L227)
- [`class RetrievalResult`](code/main.py#L240)
  - [`def to_dict(self)`](code/main.py#L247)
- [`class RetrievalClient`](code/main.py#L257): Wraps arxiv and semantic scholar mocks and merges lexical and graph hits.
  - [`def _recency(self, year)`](code/main.py#L282)
  - [`def _graph_score(self, distance)`](code/main.py#L287)
  - [`def _merge_paper(self, lexical, s2)`](code/main.py#L298)
  - [`def search(self, query)`](code/main.py#L311)
- [`def build_corpus()`](code/main.py#L355): Return a hundred paper mock corpus across five topics, with a citation graph.
- [`def build_client(config)`](code/main.py#L400)
- [`def _demo()`](code/main.py#L405)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
