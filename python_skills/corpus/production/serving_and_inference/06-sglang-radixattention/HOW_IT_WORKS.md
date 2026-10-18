# How it works: Prefix-Cache Serving — RadixAttention and KV Reuse

## `main.py`

```text
Toy RadixAttention scheduler — stdlib Python.

Simulate an SGLang-style radix-tree KV cache plus two schedulers:
  FCFS         : naive first-come first-served
  CACHE_AWARE  : depth-first dispatch on hottest branch

Also show how scrambled prompt ordering collapses hit rate. Pedagogical
constants — the shape matches the published numbers, not the absolute
latencies.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def token_count(seg)`](main.py#L23)
- [`class Request`](main.py#L36)
- [`class RadixCache`](main.py#L41): Represent the tree as a dict: path_tuple -> blocks (last_used).
  - [`def walk(self, segments)`](main.py#L51): Return number of tokens that are already cached at the longest matching
  - [`def insert(self, segments)`](main.py#L65): Insert any missing segments on the path, evicting LRU leaves if over budget.
  - [`def _evict_one(self)`](main.py#L77)
- [`def simulate(requests, scheduler)`](main.py#L87)
- [`def workload_rag(n, docs, seed)`](main.py#L121)
- [`def workload_scrambled(n, docs, seed)`](main.py#L132): Prompts reorder [SYSTEM, TOOLS, DOC] randomly. Tree cannot share the prefix.
- [`def report(label, res)`](main.py#L146)
- [`def main()`](main.py#L151)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
