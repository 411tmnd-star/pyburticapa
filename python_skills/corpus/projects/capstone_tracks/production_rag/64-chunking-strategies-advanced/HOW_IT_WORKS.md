# How it works: Chunking Strategies, Compared

## `main.py`

```text
Chunking strategies, compared on a fixture corpus.

Five strategies, one recall@k harness, no third-party retrieval libs.

References (lesson-internal):
- ./docs/en.md
- Phase 11 lesson 06 (RAG fundamentals)
- Phase 19 lesson 65 (hybrid retrieval that ranks these chunks)
- Phase 19 lesson 68 (eval harness that scores the chunker)

Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Chunk`](main.py#L23)
  - [`def overlaps(self, gold_start, gold_end)`](main.py#L30)
- [`def fixed_window(doc_id, text, size, overlap)`](main.py#L38)
- [`def split_sentences(text)`](main.py#L63)
- [`def sentence_chunks(doc_id, text, target)`](main.py#L76)
- [`def _recursive_split(text, base_offset, separators, target)`](main.py#L110)
- [`def recursive_split(doc_id, text, target, separators)`](main.py#L145)
- [`def _token_hashes(text, dim)`](main.py#L155)
- [`def mock_embed(text, dim)`](main.py#L168)
- [`def cosine(a, b)`](main.py#L172)
- [`def semantic_chunks(doc_id, text, similarity_threshold, max_chars)`](main.py#L180)
- [`def structural_markdown(doc_id, text)`](main.py#L229)
- [`class DenseIndex`](main.py#L248)
  - [`def add(self, chunk)`](main.py#L251)
  - [`def search(self, query, k)`](main.py#L254)
- [`def _locate(doc, span_text)`](main.py#L331)
- [`def build_fixture()`](main.py#L336)
- [`def eval_recall(chunker, fixture, ks)`](main.py#L363)
- [`def main()`](main.py#L389)

## Run and test

From this folder:

```
python main.py
python -m unittest discover -s tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
