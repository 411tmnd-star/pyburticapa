# How it works: MCP Apps on the Stateless Protocol

## `code/main.py`

```text
Phase 13 Lesson 14: MCP Apps on the MCP 2026-07-28 wire.
Lesson: phases/13-tools-and-protocols/14-mcp-apps/docs/en.md
Spec: https://modelcontextprotocol.io/specification/2026-07-28
Models discovery, tools, resources, and a self-contained MCP Apps UI.
Lesson 09 owns the HTTP adapter; the UI pins its postMessage origin.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class ProtocolError`](code/main.py#L42)
- [`def request_meta()`](code/main.py#L48)
- [`def make_request(method, request_id, params)`](code/main.py#L57)
- [`def timeline_html(notes)`](code/main.py#L73)
- [`class McpAppServer`](code/main.py#L119)
  - [`def _validate(self, body, headers)`](code/main.py#L120)
  - [`def _apps_enabled(meta)`](code/main.py#L152)
  - [`def _success(request_id, result)`](code/main.py#L161)
  - [`def _error(request_id, error)`](code/main.py#L168)
  - [`def _error_status(error)`](code/main.py#L175)
  - [`def handle(self, body, headers)`](code/main.py#L178)
- [`def demo()`](code/main.py#L265)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
