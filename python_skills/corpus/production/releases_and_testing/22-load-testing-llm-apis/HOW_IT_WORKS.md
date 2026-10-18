# How it works: Load Testing LLM APIs — Why k6 and Locust Lie

## `main.py`

```text
Load-test anti-pattern demonstrator — stdlib Python.

Simulates how uniform prompts inflate reported throughput via prefix-cache
and request-coalescing, while realistic distribution reveals the true ceiling.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Request`](main.py#L21)
- [`def make_uniform_workload(n)`](main.py#L26)
- [`def make_realistic_workload(n, seed)`](main.py#L30)
- [`def simulate(reqs, concurrency)`](main.py#L40)
- [`def main()`](main.py#L65)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
