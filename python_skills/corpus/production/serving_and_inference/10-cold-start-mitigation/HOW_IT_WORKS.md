# How it works: Cold Start Mitigation for Serverless LLMs

## `main.py`

```text
Cold-start mitigation path simulator — stdlib Python.

Models a 70B model cold-start with different mitigation stacks:
  RAW              : no mitigations (nominal baseline)
  PRE_SEEDED       : + Bottlerocket pre-seeded node image
  STREAMER         : + NVIDIA Run:ai Model Streamer
  GPU_SNAPSHOT     : + Modal-style GPU snapshots
  WARM_POOL        : min_workers=1 (no cold start at all on warm path)

Reports per-layer seconds and totals. Also computes warm-pool break-even.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Phase`](main.py#L19)
- [`def total_for_stack(stack)`](main.py#L36)
- [`def report_stack(label, stack)`](main.py#L55)
- [`def warm_pool_break_even(gpu_hourly, cold_seconds, sla_tolerated_drops_per_day)`](main.py#L61)
- [`def main()`](main.py#L78)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
