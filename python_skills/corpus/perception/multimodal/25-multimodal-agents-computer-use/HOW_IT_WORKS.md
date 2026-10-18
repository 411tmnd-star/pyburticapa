# How it works: Multimodal Agents and Computer-Use (Capstone)

## `main.py`

```text
Multimodal agent capstone — action schema + agent loop + 10-task benchmark.

Stdlib. A mock browser with deterministic page transitions, a toy VLM that
emits actions from a fixed policy table, an outer loop tracking progress
across 10 synthetic booking-site tasks.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class BrowserState`](main.py#L29)
- [`class Task`](main.py#L36)
- [`def mock_tasks()`](main.py#L42)
- [`def apply_action(state, action)`](main.py#L66)
- [`def run_task(task)`](main.py#L87)
- [`def print_schema()`](main.py#L98)
- [`def run_benchmark()`](main.py#L105)
- [`def benchmark_leaderboard()`](main.py#L122)
- [`def main()`](main.py#L137)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
