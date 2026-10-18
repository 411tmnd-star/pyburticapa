# How it works: Hybrid Memory: Vector + Graph + KV

## `main.py`

```text
Mem0-shaped hybrid memory: vector + KV + graph with fusion scoring.

Stdlib only. Vector store uses token-overlap as an embedding stand-in.
Scope taxonomy: user / session / agent. Fusion: relevance + importance + recency.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Record`](main.py#L15)
- [`class VectorStore`](main.py#L26)
  - [`def add(self, record)`](main.py#L30)
  - [`def search(self, query, top_k)`](main.py#L33)
- [`class KVKey`](main.py#L50)
- [`class KVStore`](main.py#L56)
  - [`def put(self, key, record)`](main.py#L60)
  - [`def get(self, key)`](main.py#L63)
  - [`def by_user(self, user_id)`](main.py#L66)
- [`class Edge`](main.py#L71)
- [`class GraphStore`](main.py#L79)
  - [`def add_edge(self, subject, relation, obj)`](main.py#L83)
  - [`def neighbors(self, subject, valid_only)`](main.py#L89)
  - [`def all_edges(self)`](main.py#L93)
- [`class Mem0Config`](main.py#L98)
- [`class Mem0`](main.py#L105)
  - [`def add(self, text)`](main.py#L113)
  - [`def _recency_score(self, record, now)`](main.py#L129)
  - [`def search(self, query)`](main.py#L134)
- [`def main()`](main.py#L161)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
