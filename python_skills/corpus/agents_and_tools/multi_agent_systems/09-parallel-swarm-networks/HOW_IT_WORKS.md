# How it works: Parallel / Swarm / Networked Architectures

## `main.py`

```text
Swarm architecture demo: workers pull from a shared queue.

Compares three scheduling strategies on a variable-duration workload:
  - sequential (1 worker processes all tasks)
  - fixed assignment (each task pre-assigned to a specific worker)
  - swarm (4 workers pull from a shared queue)

Swarm balances load automatically; fixed assignment leaves fast workers idle.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Task`](main.py#L19)
- [`def fake_work(task)`](main.py#L25)
- [`def run_sequential(tasks)`](main.py#L30)
- [`def run_fixed_assignment(tasks, n_workers)`](main.py#L39): Each task is pre-assigned to worker id. Worker processes its tasks serially.
- [`def run_swarm(tasks, n_workers)`](main.py#L60): Workers pull from a shared queue.
- [`def make_tasks(n_workers)`](main.py#L88): 8 tasks: half fast (0.1s), half slow (0.4s). Pre-assignment is pessimal:
- [`def main()`](main.py#L104)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
