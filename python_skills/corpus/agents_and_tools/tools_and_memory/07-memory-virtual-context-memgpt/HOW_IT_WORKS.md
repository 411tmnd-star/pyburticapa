# How it works: Agent Memory — Virtual Context and Memory Paging

## `main.py`

```text
MemGPT-shaped two-tier memory in stdlib.

Main context is a fixed-size prompt buffer (core dict + messages list).
Archival memory is an external searchable store. Agents page data in and out
via memory tools. No LLM call — a scripted agent drives the scenario so the
control flow is testable offline.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Message`](main.py#L16)
- [`class MainContext`](main.py#L22)
  - [`def append(self, role, text)`](main.py#L28)
  - [`def render(self)`](main.py#L33)
- [`class ArchivalRecord`](main.py#L44)
- [`class ArchivalStore`](main.py#L52)
  - [`def insert(self, text)`](main.py#L57)
  - [`def search(self, query, top_k)`](main.py#L67)
  - [`def count(self)`](main.py#L82)
- [`class MemoryTools`](main.py#L86)
  - [`def core_memory_append(self, section, text)`](main.py#L91)
  - [`def core_memory_replace(self, section, old, new)`](main.py#L96)
  - [`def archival_memory_insert(self, text, tags)`](main.py#L103)
  - [`def archival_memory_search(self, query, top_k)`](main.py#L107)
  - [`def conversation_search(self, query)`](main.py#L113)
- [`class ToolCall`](main.py#L122)
- [`def run_scripted_agent(tools, script)`](main.py#L127)
- [`def main()`](main.py#L141)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
