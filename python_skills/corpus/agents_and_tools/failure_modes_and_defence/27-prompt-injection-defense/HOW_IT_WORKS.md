# How it works: Prompt Injection and the PVE Defense

## `main.py`

```text
PVE: Prompt-Validator-Executor for tool calls.

Cheap fast validator refuses injection-shaped content before the expensive
main model commits. Demonstrates argument inspection, retrieved-content
rejection, and memory-write guardrails.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Content`](main.py#L18)
- [`def looks_like_directive(text)`](main.py#L31)
- [`class ToolCall`](main.py#L42)
- [`class Validator`](main.py#L49)
  - [`def assess(self, call, contents)`](main.py#L53)
- [`class Executor`](main.py#L75)
  - [`def run(self, call)`](main.py#L78)
- [`def _send_message(to, body)`](main.py#L85)
- [`def _read_memory(query)`](main.py#L89)
- [`def _search(query)`](main.py#L93)
- [`class MemoryWrite`](main.py#L98)
- [`def memory_write_guard(write)`](main.py#L102)
- [`def main()`](main.py#L109)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
