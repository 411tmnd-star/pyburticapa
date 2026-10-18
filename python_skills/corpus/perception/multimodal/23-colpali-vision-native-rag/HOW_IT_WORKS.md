# How it works: ColPali and Vision-Native Document RAG

## `main.py`

```text
ColPali toy: patch encoder + MaxSim retrieval — stdlib.

Five mock "pages" of patch embeddings, three text queries with token embeddings,
MaxSim scoring with top-k retrieval. Prints ranked pages + interpretation.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Page`](main.py#L17)
- [`class Query`](main.py#L23)
- [`def cosine(a, b)`](main.py#L28)
- [`def maxsim(query_tokens, patches)`](main.py#L35): ColBERT MaxSim: sum over query tokens of max over patches.
- [`def random_emb(dim, bias)`](main.py#L45)
- [`def build_pages(n_pages, n_patches, dim)`](main.py#L49)
- [`def build_queries(dim)`](main.py#L59)
- [`def retrieve(query, pages, k)`](main.py#L70)
- [`def storage_estimate()`](main.py#L76)
- [`def compare_maxsim_vs_mean()`](main.py#L86)
- [`def main()`](main.py#L102)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
