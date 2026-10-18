# How it works: Model Context Protocol (MCP)

## `code/main.py`

```text
Phase 11 Lesson 14: a stateless MCP server and in-process client.

Implements the 2026-07-28 request contract with per-request metadata,
server/discover, typed results, and the three server primitives. The transport
is in memory so the protocol remains visible and the demo stays stdlib-only.
Spec: https://modelcontextprotocol.io/specification/2026-07-28
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Tool`](code/main.py#L25)
- [`class Resource`](code/main.py#L34)
- [`class Prompt`](code/main.py#L42)
- [`def request_metadata()`](code/main.py#L49)
- [`class MCPServer`](code/main.py#L63)
  - [`def tool(self, name, description, schema)`](code/main.py#L71)
  - [`def resource(self, uri, name, description)`](code/main.py#L85)
  - [`def prompt(self, name, description, arguments)`](code/main.py#L92)
  - [`def _capabilities(self)`](code/main.py#L99)
  - [`def _complete(self, payload)`](code/main.py#L102)
  - [`def _error(request_id, code, message, data)`](code/main.py#L113)
  - [`def _validate_metadata(self, params, request_id)`](code/main.py#L119)
  - [`def handle(self, message)`](code/main.py#L146)
- [`class MCPClient`](code/main.py#L293)
  - [`def request(self, method, params)`](code/main.py#L298)
- [`def add(a, b)`](code/main.py#L324)
- [`def delete_user(user_id)`](code/main.py#L338)
- [`def app_config()`](code/main.py#L343)
- [`def code_review(language, code)`](code/main.py#L348)
- [`def main()`](code/main.py#L352)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
