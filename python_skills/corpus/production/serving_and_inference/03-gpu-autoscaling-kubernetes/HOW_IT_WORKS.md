# How it works: GPU Autoscaling on Kubernetes — Karpenter, KAI Scheduler, Gang Scheduling

## `main.py`

```text
Three-layer GPU autoscaling simulator — stdlib Python.

Compares three autoscaling strategies on the same bursty workload:
  DUTY_CYCLE   : HPA on DCGM_FI_DEV_GPU_UTIL (the broken default)
  QUEUE_DEPTH  : HPA on request queue depth (correct signal)
  KAI_GANG     : Gang-scheduled with topology awareness (prevents partial alloc)

Reports dropped requests, idle GPU-minutes, and composite score.
Pedagogical: latencies and provisioning times are illustrative.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Request`](main.py#L31)
- [`def make_workload(duration_sec, seed)`](main.py#L38)
- [`def simulate(strategy, reqs)`](main.py#L55)
- [`def report(row)`](main.py#L152)
- [`def main()`](main.py#L159)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
