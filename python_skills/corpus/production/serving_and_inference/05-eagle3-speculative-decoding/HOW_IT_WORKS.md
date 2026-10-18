# How it works: EAGLE-3 Speculative Decoding in Production

## `main.py`

```text
Toy speculative-decoding analyzer — stdlib Python.

Compute expected speedup and break-even alpha for EAGLE-3-style speculative
decoding across a range of (alpha, K, verify_overhead, concurrency) points.
Pedagogical — numbers track shape, not absolute latency.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class SpecPoint`](main.py#L16)
- [`def expected_speedup(p)`](main.py#L23): Plain decode: 1 token per target forward.
- [`def breakeven_alpha(k, verify_overhead, concurrency)`](main.py#L35)
- [`def simulate_tail(p, n_tokens, seed)`](main.py#L42): Simulate per-token latency distribution.
- [`def plain_tail(concurrency, n_tokens, seed)`](main.py#L79)
- [`def print_table(title, rows)`](main.py#L87)
- [`def main()`](main.py#L96)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
