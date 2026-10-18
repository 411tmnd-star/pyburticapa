# How it works: Capstone: Stateless Tool Ecosystem

## `code/main.py`

```text
Phase 13 Capstone - stateless in-process research-and-report simulation.

Several Phase 13 boundaries in one readable demo:
  - gateway-shaped static token lookup and RBAC
  - per-request protocol metadata and mandatory server discovery
  - local tool functions returning task-extension and ui-shaped data
  - A2A-shaped writer delegation represented by a nested span
  - in-memory trace dictionaries sharing one trace id
  - pinned-hash manifest guarding description mutations

This file does not implement an MCP or A2A transport, OAuth exchange, MCP App
bridge, telemetry exporter, or execution sandbox. Stdlib only.

Run: python code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def request_meta()`](code/main.py#L35)
- [`def _server_meta()`](code/main.py#L47)
- [`def complete_result()`](code/main.py#L51)
- [`def protocol_error(code, message, data)`](code/main.py#L55)
- [`def validate_request_meta(meta)`](code/main.py#L62)
- [`def server_discover(meta)`](code/main.py#L93)
- [`def _hex(n)`](code/main.py#L108)
- [`def span(name, kind, trace_id, parent, attrs)`](code/main.py#L112)
- [`def finish(sp)`](code/main.py#L121)
- [`def research_arxiv_search(args)`](code/main.py#L140)
- [`def research_generate_report(args, trace_id, parent)`](code/main.py#L149)
- [`def tasks_get(task_id, meta)`](code/main.py#L198)
- [`def pin_ok(tool_name, description)`](code/main.py#L220)
- [`def gateway_call(token, tool_name, args, trace_id, parent, meta)`](code/main.py#L224)
- [`def orchestrator(token, user_query)`](code/main.py#L255)
- [`def demo()`](code/main.py#L285)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
