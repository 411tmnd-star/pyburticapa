# How it works: Cross-Encoder Reranker

## `main.py`

```text
Cross-encoder reranker on top of a bi-encoder retriever.

A tiny torch module shows the architectural shape. The two-stage pipeline
demonstrates the latency-vs-quality trade-off on a fixture corpus.

References:
- ./docs/en.md
- Phase 19 lesson 65 (bi-encoder hybrid retriever)
- Phase 19 lesson 68 (eval harness measuring the rerank lift)
- Phase 19 lesson 69 (end-to-end system that uses this reranker)

Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def _set_seed(seed)`](main.py#L35)
- [`def _token_to_id(token)`](main.py#L40)
- [`def tokenize_pair(query, document, max_len)`](main.py#L51)
- [`class CrossEncoder`](main.py#L70)
  - [`def forward(self, input_ids, type_ids)`](main.py#L89)
- [`class Triple`](main.py#L108)
- [`def _batch_encode(pairs, max_len)`](main.py#L114)
- [`def train_tiny(model, triples, epochs, lr)`](main.py#L130): Returns per-epoch loss.
- [`class Candidate`](main.py#L151)
- [`def rerank(model, query, candidates, top_k)`](main.py#L157)
- [`def mock_embed(text, dim)`](main.py#L178)
- [`def cosine(a, b)`](main.py#L191)
- [`class BiEncoder`](main.py#L196)
  - [`def add(self, c)`](main.py#L200)
  - [`def search(self, query, top_n)`](main.py#L204)
- [`def pipeline(query, retriever, reranker, top_n, top_k)`](main.py#L215)
- [`def print_list(label, items, fmt)`](main.py#L281)
- [`def main()`](main.py#L287)

## Run and test

From this folder:

```
python main.py
python -m unittest discover -s tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
