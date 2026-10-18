# How it works: Supervisor / Orchestrator-Worker Pattern

## `main.py`

```text
Supervisor / Orchestrator-Worker pattern (Anthropic Research style).

Lead agent decomposes a query, spawns workers in parallel threads, synthesizes.
No real LLM calls -- workers are scripted fetch-and-summarize simulations.

The point is the wall-clock win from parallel subagents, plus the pattern.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class WorkerResult`](main.py#L16)
- [`class TraceEntry`](main.py#L24)
- [`class Trace`](main.py#L32)
  - [`def log(self, worker_id, event, sub_question)`](main.py#L36)
- [`def fake_web_fetch(query)`](main.py#L43): Simulate web fetch + summarization latency.
- [`class Worker`](main.py#L49)
  - [`def run(self, sub_question, results, idx)`](main.py#L54)
- [`class Lead`](main.py#L68): Supervisor. Plans, spawns workers in parallel, synthesizes.
  - [`def plan(self, query)`](main.py#L74): Decompose. Real lead uses an LLM; this splits by heuristic.
  - [`def synthesize(self, query, results)`](main.py#L82)
  - [`def run(self, query)`](main.py#L87)
- [`def render_trace(trace, t0)`](main.py#L114)
- [`def main()`](main.py#L122)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
