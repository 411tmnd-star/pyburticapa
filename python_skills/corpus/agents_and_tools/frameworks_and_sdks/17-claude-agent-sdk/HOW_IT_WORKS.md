# How it works: The Harness as a Library — Subagents and Session Store

## `main.py`

```text
Claude Agent SDK harness shape in stdlib.

Built-in tools, subagents with isolated context, lifecycle hooks, session store.
Demonstrates how spawning subagents keeps the orchestrator's context bounded.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Tool`](main.py#L14)
- [`class ToolRegistry`](main.py#L20)
  - [`def register(self, tool)`](main.py#L24)
  - [`def get(self, name)`](main.py#L27)
  - [`def names(self)`](main.py#L30)
- [`class Hooks`](main.py#L35)
- [`class Turn`](main.py#L43)
- [`class SessionStore`](main.py#L48)
  - [`def append(self, session_id, turn)`](main.py#L53)
  - [`def load(self, session_id)`](main.py#L56)
  - [`def list_sessions(self)`](main.py#L59)
  - [`def delete(self, session_id)`](main.py#L62)
  - [`def list_subkeys(self, session_id)`](main.py#L68)
  - [`def link_sub(self, parent, sub)`](main.py#L71)
- [`class AgentRun`](main.py#L76)
- [`class Harness`](main.py#L83)
  - [`def _dispatch(self, tool_name, args)`](main.py#L91)
  - [`def run_agent(self, session_id, prompt, tool_calls, parent_session)`](main.py#L106)
  - [`def spawn_subagents(self, parent_session, tasks)`](main.py#L133)
- [`def _read_file_demo(path)`](main.py#L146)
- [`def _list_dir_demo(path)`](main.py#L150)
- [`def main()`](main.py#L154)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
