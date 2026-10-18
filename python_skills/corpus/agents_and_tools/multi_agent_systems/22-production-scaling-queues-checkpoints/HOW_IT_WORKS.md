# How it works: Production Scaling — Queues, Checkpoints, Durability

## `main.py`

```text
Production scaling demo: checkpoints, queues, async vs threads.

All stdlib. CheckpointStore uses SQLite. AgentQueue is a per-agent state
machine with 3 states. async vs threads benchmark runs 500 concurrent
simulated LLM calls.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class CheckpointStore`](main.py#L22)
  - [`def write(self, thread_id, super_step, state)`](main.py#L34)
  - [`def latest(self, thread_id)`](main.py#L41)
- [`def run_agent_with_checkpoint(store, thread_id, start, crash_at, goal)`](main.py#L51): Run a tiny 5-step agent; optionally crash at a given step.
- [`class AgentState`](main.py#L74)
- [`class AgentQueue`](main.py#L81)
  - [`def enqueue(self, msg)`](main.py#L87)
  - [`def step(self)`](main.py#L90)
- [`def demo_queue()`](main.py#L101)
- [`def sim_llm_call_async(delay)`](main.py#L116)
- [`def sim_llm_call_sync(delay)`](main.py#L120)
- [`def bench_async(n)`](main.py#L124)
- [`def bench_threads(n)`](main.py#L130)
- [`def demo_async_vs_threads()`](main.py#L140)
- [`def demo_checkpoint_resume()`](main.py#L156)
- [`def main()`](main.py#L182)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
