# How it works: MCP Fundamentals: Stateless Requests and JSON-RPC

## `code/main.py`

```text
Phase 13 Lesson 06: trace the stateless MCP request lifecycle.
Lesson: phases/13-tools-and-protocols/06-mcp-fundamentals/docs/en.md
Specification: https://modelcontextprotocol.io/specification/2026-07-28/
Builds JSON-RPC requests, validates per-request metadata, and emits results.
Run: python3 main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Trace`](code/main.py#L49)
- [`def request_meta(version, capabilities, include_client_info)`](code/main.py#L56)
- [`def make_request(request_id, method, params)`](code/main.py#L70)
- [`def rpc_error(request_id, code, message, data)`](code/main.py#L88)
- [`def complete_result(payload)`](code/main.py#L100)
- [`def validate_request(message)`](code/main.py#L117)
- [`def dispatch(message)`](code/main.py#L149)
- [`def trace_message(message)`](code/main.py#L200)
- [`def show(message)`](code/main.py#L222)
- [`def main()`](code/main.py#L228)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
