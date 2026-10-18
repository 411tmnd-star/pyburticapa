# How it works: Multi-Region LLM Serving and KV Cache Locality

## `main.py`

```text
Cache-aware multi-region router simulator — stdlib Python.

Three strategies on the same workload:
  ROUND_ROBIN : blind, ignores KV cache state
  REGIONAL    : cache-aware within region; round-robin across regions
  GLOBAL      : cache-aware globally; considers network RTT

Reports cache hit rate, TTFT P50/P99, and cross-region bill.
Pedagogical: timings are illustrative.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def rtt(a, b)`](main.py#L31)
- [`class Replica`](main.py#L39)
- [`class Request`](main.py#L47)
- [`def make_replicas()`](main.py#L55)
- [`def make_workload(n, seed)`](main.py#L59)
- [`def simulate(strategy, reqs)`](main.py#L70)
- [`def report(row)`](main.py#L133)
- [`def main()`](main.py#L140)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
