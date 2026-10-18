# How it works: MCP Authorization: CIMD, Issuer Binding, PKCE, and Step-Up

## `code/main.py`

```text
Phase 13 Lesson 16: MCP 2026-07-28 authorization simulator.

Companion to ../docs/en.md. Implements an in-process protocol model with
protected-resource discovery, CIMD-first enrollment, deprecated DCR fallback,
PKCE, issuer validation, resource-bound tokens, scope step-up, discovery, and
tools/list. Lesson 09 supplies the complete Streamable HTTP adapter.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Token`](code/main.py#L71)
- [`class ProtocolError`](code/main.py#L82)
- [`def pkce_pair()`](code/main.py#L90)
- [`def request_meta()`](code/main.py#L97)
- [`def encode_mcp_header_value(value)`](code/main.py#L105)
- [`def decode_mcp_header_value(value)`](code/main.py#L121)
- [`def make_mcp_request(request_id, tool, arguments)`](code/main.py#L139)
- [`def make_discover_request(request_id)`](code/main.py#L150)
- [`def make_tools_list_request(request_id)`](code/main.py#L164)
- [`class AuthorizationServer`](code/main.py#L179)
  - [`def metadata(self)`](code/main.py#L191)
  - [`def _validate_application(metadata)`](code/main.py#L205)
  - [`def enroll_cimd(self, metadata_url, document)`](code/main.py#L249)
  - [`def dynamic_register(self, metadata)`](code/main.py#L285)
  - [`def authorize(self)`](code/main.py#L293)
  - [`def exchange(self)`](code/main.py#L318)
- [`class ResourceServer`](code/main.py#L358)
  - [`def protected_resource_metadata(self)`](code/main.py#L367)
  - [`def _success(request_id, result)`](code/main.py#L375)
  - [`def _error(request_id, error)`](code/main.py#L382)
  - [`def _validate_wire(body, headers)`](code/main.py#L389)
  - [`def discover(self, body, headers)`](code/main.py#L421)
  - [`def call(self, body, headers, token)`](code/main.py#L430)
  - [`def handle(self, body, headers, token)`](code/main.py#L440)
- [`class Client`](code/main.py#L525)
  - [`def _client_document(self)`](code/main.py#L534)
  - [`def enroll(self, auth)`](code/main.py#L544)
  - [`def authorize(self, auth, resource, scopes)`](code/main.py#L559)
  - [`def call_with_step_up(self, tool, server, auth)`](code/main.py#L584)
- [`def demo()`](code/main.py#L608)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
