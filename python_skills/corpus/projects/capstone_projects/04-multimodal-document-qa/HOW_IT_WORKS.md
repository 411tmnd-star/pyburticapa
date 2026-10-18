# How it works: Capstone 04 — Multimodal Document QA (Vision-First PDF, Tables, Charts)

## `main.py`

```text
Multimodal document QA — ColPali-style late interaction scaffold.

The hard architectural primitive is late-interaction retrieval: every query
token scores against every document patch, the MaxSim per query token is
summed, the top-k pages are returned. This scaffold implements MaxSim end to
end on synthetic patch embeddings so the algorithm is observable without
loading a real ColQwen model. Includes DocPruner-style patch pruning.

Run:  python main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def tokenize(text)`](main.py#L27)
- [`def hash_embed(tok)`](main.py#L31)
- [`class Page`](main.py#L39)
  - [`def embed_patches(self)`](main.py#L45): Multi-vector: each content token becomes a patch vector.
- [`def doc_prune(patches, keep_fraction)`](main.py#L54): Keep patches with highest per-patch norm (poor proxy for info density
- [`def dot(a, b)`](main.py#L67)
- [`def max_sim_score(query_tokens, doc_patches)`](main.py#L71): For every query token embedding, take max dot product against any
- [`class Index`](main.py#L91)
  - [`def add(self, p)`](main.py#L94)
  - [`def retrieve(self, query, k)`](main.py#L97)
- [`def build_index(prune)`](main.py#L122)
- [`def main()`](main.py#L133)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
