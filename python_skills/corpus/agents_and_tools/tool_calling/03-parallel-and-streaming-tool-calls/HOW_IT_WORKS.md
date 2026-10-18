# How it works: Parallel Tool Calls and Streaming with Tools

## `main.py`

```text
Phase 13 Lesson 03 - parallel and streaming tool calls.

Two demos, stdlib only:
  1. Three-city weather run, sequential vs parallel (thread pool).
     Measures wall-clock and shows the max vs sum pattern.
  2. Stream accumulator for out-of-order argument chunks.
     Replays a fake OpenAI-shaped stream of three interleaved parallel calls
     and reassembles each per-id before executing.

Run: python code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def executor_weather(city)`](main.py#L28)
- [`def run_sequential(cities)`](main.py#L34)
- [`def run_parallel(cities)`](main.py#L41)
- [`class CallBuffer`](main.py#L54)
  - [`def try_parse(self)`](main.py#L60)
- [`class StreamAccumulator`](main.py#L67)
  - [`def on_event(self, event)`](main.py#L70)
- [`def fake_openai_stream()`](main.py#L86): Three interleaved parallel calls. Real streams look like this.
- [`def replay_and_execute()`](main.py#L103)
- [`def main()`](main.py#L123)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
