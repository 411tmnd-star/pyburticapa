# How it works: MCP Security: Poisoned Metadata, Routing, and MRTR State

## `code/main.py`

```text
Phase 13 Lesson 15: secure MCP 2026-07-28 tool dispatch.
Lesson: phases/13-tools-and-protocols/15-mcp-security-tool-poisoning/docs/en.md
Spec: https://modelcontextprotocol.io/specification/2026-07-28
Scans metadata, pins descriptors, detects collisions, and validates routing.
It also protects MRTR continuation state; Lesson 09 owns HTTP transport.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Finding`](code/main.py#L77)
- [`class ProtocolError`](code/main.py#L84)
- [`class ReplayStore`](code/main.py#L90)
  - [`def claim_and_consume(self, nonce)`](code/main.py#L104)
- [`def descriptor_digest(tool)`](code/main.py#L129)
- [`def scan_description(description)`](code/main.py#L134)
- [`def build_manifest(catalog)`](code/main.py#L138)
- [`def scan_catalog(catalog, approved)`](code/main.py#L146)
- [`def request_meta()`](code/main.py#L169)
- [`def make_request(method, request_id, params)`](code/main.py#L177)
- [`def seal_state(state, secret)`](code/main.py#L187)
- [`def open_state(token, secret)`](code/main.py#L194)
- [`class SecurityGateway`](code/main.py#L209)
  - [`def _validate(self, body, headers)`](code/main.py#L221)
  - [`def _response(request_id, result)`](code/main.py#L250)
  - [`def _error(request_id, error)`](code/main.py#L256)
  - [`def _error_status(error)`](code/main.py#L263)
  - [`def _visible_tools(self)`](code/main.py#L266)
  - [`def _export(self, params)`](code/main.py#L276)
  - [`def handle(self, body, headers)`](code/main.py#L393)
- [`def demo()`](code/main.py#L440)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
