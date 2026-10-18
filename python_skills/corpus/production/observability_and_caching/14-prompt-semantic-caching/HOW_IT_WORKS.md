# How it works: Prompt Caching and Semantic Caching Economics

## `main.py`

```text
Two-layer caching simulator — stdlib Python.

Models L1 (semantic) + L2 (prompt-prefix) caching on a mixed workload.
Reports bill, hit rates, and the parallelization penalty.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Request`](main.py#L21)
- [`class Config`](main.py#L29)
- [`def make_workload(n, seed)`](main.py#L38)
- [`def simulate(reqs, cfg)`](main.py#L57)
- [`def report(label, cfg, reqs)`](main.py#L97)
- [`def main()`](main.py#L103)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
