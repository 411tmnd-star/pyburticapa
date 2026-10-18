# How it works: Serving Engine Internals — PagedAttention, Continuous Batching, Chunked Prefill

## `main.py`

```text
Toy continuous-batching scheduler — stdlib Python.

Simulates four serving modes on the same workload:
  NAIVE            : one request at a time, no batching
  STATIC           : pad to batch boundary, wait for slowest
  CONTINUOUS       : iteration-level admit/release
  CONTINUOUS+CHUNK : continuous + chunked prefill (512-token slices)

Reports throughput (tok / virt-sec), mean TTFT, and P99 ITL so you can
reproduce the shape of the vLLM benchmarks without a GPU. Pedagogical:
the latency constants are illustrative, not measured.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Request`](main.py#L31)
  - [`def in_prefill(self)`](main.py#L43)
  - [`def done(self)`](main.py#L47)
  - [`def blocks_needed(self)`](main.py#L50)
- [`def make_workload(n, seed)`](main.py#L55)
- [`def report(label, reqs, sim_end)`](main.py#L67)
- [`def simulate_naive(reqs)`](main.py#L79): One at a time. Prefill the whole prompt, then decode until done.
- [`def simulate_static(reqs, batch)`](main.py#L98): Group into fixed batches; wait for the slowest to finish.
- [`def simulate_continuous(reqs, chunked)`](main.py#L124)
- [`def main()`](main.py#L178)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
