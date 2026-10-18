# How it works: Production Serving Stack — KV Offloading and Cache-Aware Routing

## `main.py`

```text
vLLM production stack + LMCache simulator — stdlib Python.

Compares three configs on a preemption-heavy workload:
  NATIVE_ONLY   : vLLM with no offload, requests re-prefill on preemption
  CPU_OFFLOAD   : native CPU offload, engine-local
  LMCACHE       : cluster LMCache shared across 4 engines

Reports re-prefill count avoided, throughput gain, and break-even HBM utilization.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Request`](main.py#L25)
- [`def make_workload(n, seed)`](main.py#L31)
- [`def simulate(config, reqs)`](main.py#L41): Model a small cluster under HBM pressure.
- [`def report(row, baseline)`](main.py#L99)
- [`def main()`](main.py#L107)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
