# How it works: A2A — Agent-to-Agent Protocol

## `main.py`

```text
Phase 13 Lesson 19 - A2A agent-to-agent protocol.

Research agent calls writer agent via A2A 1.0:
  1. Research agent fetches writer's Agent Card
  2. Sends SendMessage with text + file parts
  3. Writer task moves TASK_STATE_WORKING -> TASK_STATE_INPUT_REQUIRED
     -> TASK_STATE_WORKING -> TASK_STATE_COMPLETED
  4. Research agent receives an Artifact

Stdlib only; in-process transport stands in for JSON-RPC over HTTP.
Wire names follow A2A 1.0.1: docs/specification.md and specification/a2a.proto.

Run: python code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def part_content(part)`](main.py#L54)
- [`def new_message(role, parts, task_id)`](main.py#L61)
- [`def transition(task, state, message)`](main.py#L71)
- [`def writer_send_message(params)`](main.py#L79)
- [`def finish(task, length)`](main.py#L106)
- [`def writer_endpoint(headers, request)`](main.py#L117)
- [`def send_message(request_id, message)`](main.py#L128)
- [`def research_agent_flow()`](main.py#L136)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
