# How it works: Capstone 12 — Video Understanding Pipeline (Scene, QA, Search)

## `main.py`

```text
Video understanding pipeline — multi-vector scene index scaffold.

The hard architectural primitive is a multi-vector-per-scene index with
three representations (caption, frame, transcript), queried in parallel and
merged with reciprocal rank fusion, then refined by a temporal-grounding
step that picks a sub-window inside the best scene. This scaffold implements
the index shape, the triple-query fusion, and the sub-window grounding.

Run:  python main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def tokenize(s)`](main.py#L24)
- [`def fake_embed(text)`](main.py#L28)
- [`def cosine(a, b)`](main.py#L38)
- [`class Scene`](main.py#L47)
  - [`def embed(self)`](main.py#L59)
- [`def multi_vector_search(query, scenes, k)`](main.py#L91)
- [`def ground_window(query, scene)`](main.py#L115): Stand-in: pick a sub-window of the scene based on query keyword position.
- [`def fmt_ms(ms)`](main.py#L136)
- [`def main()`](main.py#L141)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
