# How it works: MCP Transports: stdio and Stateless Streamable HTTP

## `code/main.py`

```text
Phase 13 Lesson 09: stateless MCP Streamable HTTP.
Lesson: phases/13-tools-and-protocols/09-mcp-transports/docs/en.md
Specification: https://modelcontextprotocol.io/specification/2026-07-28/
Implements POST-only transport, header validation, JSON, and finite SSE.
Run: python3 main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class RpcFault`](code/main.py#L51)
- [`def request_meta(version)`](code/main.py#L58)
- [`def make_request(request_id, method, params)`](code/main.py#L66)
- [`def rpc_error(request_id, code, message, data)`](code/main.py#L78)
- [`def complete(payload)`](code/main.py#L90)
- [`def origin_allowed(origin)`](code/main.py#L111)
- [`def encode_header_value(value)`](code/main.py#L115)
- [`def decode_header_value(value)`](code/main.py#L124)
- [`def body_name(message)`](code/main.py#L136)
- [`def http_headers_for(message)`](code/main.py#L147)
- [`def validate_request_structure(message)`](code/main.py#L169)
- [`def validate_supported_version(version)`](code/main.py#L193)
- [`def validate_http_headers(headers, message, body_version)`](code/main.py#L202)
- [`def reject_duplicate_routing_headers(headers)`](code/main.py#L222)
- [`def reject_duplicate_origin(headers)`](code/main.py#L231)
- [`def reject_ambiguous_body_framing(headers)`](code/main.py#L237)
- [`def dispatch(message)`](code/main.py#L247)
- [`def accepted_filter(requested)`](code/main.py#L296)
- [`def subscription_messages(message)`](code/main.py#L307)
- [`class Handler`](code/main.py#L346)
  - [`def log_message(self, format_string)`](code/main.py#L347)
  - [`def _write_json(self, status, payload)`](code/main.py#L350)
  - [`def _write_fault(self, status, request_id, fault)`](code/main.py#L358)
  - [`def _valid_path_and_origin(self)`](code/main.py#L361)
  - [`def _method_not_allowed(self)`](code/main.py#L376)
  - [`def _write_subscription_stream(self, message)`](code/main.py#L385)
  - [`def do_POST(self)`](code/main.py#L397)
  - [`def do_GET(self)`](code/main.py#L463)
  - [`def do_DELETE(self)`](code/main.py#L467)
- [`def serve(host, port)`](code/main.py#L472)
- [`def post(url, message, headers)`](code/main.py#L478)
- [`def probe()`](code/main.py#L502)
- [`def main()`](code/main.py#L568)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
