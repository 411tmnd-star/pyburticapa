# How it works: Stateless MCP Gateways and Registry Admission

## `code/main.py`

```text
Phase 13 Lesson 17: a stateless MCP gateway and admission catalog.

Companion to ../docs/en.md. This in-process protocol model implements current
discovery, routing validation, deterministic tool aggregation, Registry
server.json admission, RBAC, rate limits, descriptor pins, stateless backend
forwarding, and a modeled subscriptions/listen response. Lesson 09 supplies
the complete Streamable HTTP adapter.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class ProtocolError`](code/main.py#L96)
- [`def request_meta(client_name)`](code/main.py#L102)
- [`def request_name(method, params)`](code/main.py#L110)
- [`def make_request(method, request_id, params)`](code/main.py#L116)
- [`def descriptor_digest(tool)`](code/main.py#L126)
- [`def registry_record_is_admissible(record, admission, namespace)`](code/main.py#L131)
- [`def validate_wire(body, headers)`](code/main.py#L160)
- [`class BackendServer`](code/main.py#L191)
  - [`def _success(self, request_id, result)`](code/main.py#L196)
  - [`def handle(self, body, headers)`](code/main.py#L202)
- [`class TokenBucket`](code/main.py#L231)
  - [`def consume(self, now)`](code/main.py#L237)
- [`class Gateway`](code/main.py#L247)
  - [`def _success(request_id, result)`](code/main.py#L297)
  - [`def _error(request_id, error)`](code/main.py#L304)
  - [`def _error_status(error)`](code/main.py#L311)
  - [`def _is_pinned(self, canonical_name, tool)`](code/main.py#L314)
  - [`def _visible_tools(self, user_id)`](code/main.py#L318)
  - [`def _forward(self, canonical_name, arguments)`](code/main.py#L332)
  - [`def handle(self, bearer, body, headers)`](code/main.py#L345)
- [`def demo()`](code/main.py#L451)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
