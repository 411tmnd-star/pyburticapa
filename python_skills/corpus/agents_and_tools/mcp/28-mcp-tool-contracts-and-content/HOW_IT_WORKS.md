# How it works: MCP Tool Contracts and Content

## `code/main.py`

```text
Phase 13 Lesson 28: MCP tool contracts and content.
Lesson: ../docs/en.md
Specification: https://modelcontextprotocol.io/specification/2026-07-28/server/tools
Utilities: completion and pagination in the MCP 2026-07-28 specification.
This example uses only Python's standard library.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class ContractViolation`](code/main.py#L38): Raised when a descriptor or result violates the enforced contract.
- [`class McpError`](code/main.py#L43)
- [`def request_meta()`](code/main.py#L49)
- [`def server_meta()`](code/main.py#L57)
- [`def complete()`](code/main.py#L61)
- [`def validate_request_meta(params)`](code/main.py#L65)
- [`def _matches_type(value, expected)`](code/main.py#L82)
- [`def validate_json_schema(value, schema, path)`](code/main.py#L100): Validate the small JSON Schema 2020-12 subset used by this lesson.
- [`def iter_header_annotation_nodes(node, path)`](code/main.py#L137): Find x-mcp-header anywhere, including combinators and definitions.
- [`def validate_header_annotations(tool)`](code/main.py#L157): Validate x-mcp-header plus a deployment policy for sensitive fields.
- [`def validate_tool_descriptor(tool)`](code/main.py#L190)
- [`def _validate_base64(value, field)`](code/main.py#L204)
- [`def validate_content_block(block)`](code/main.py#L213)
- [`def validate_tool_result(tool, result)`](code/main.py#L237)
- [`def _descriptor(name, description, input_schema, output_schema)`](code/main.py#L255)
- [`class ContractServer`](code/main.py#L328)
  - [`def server_discover(self, params)`](code/main.py#L332)
  - [`def tools_list(self, params)`](code/main.py#L341)
  - [`def tools_call(self, params)`](code/main.py#L363)
  - [`def completion_complete(self, params)`](code/main.py#L435)
  - [`def dispatch(self, request)`](code/main.py#L465)
- [`def make_request(request_id, method, params)`](code/main.py#L500)
- [`def _read_path(arguments, path)`](code/main.py#L512)
- [`def _parameter_text(value, expected_type)`](code/main.py#L521)
- [`def _is_plain_visible_ascii(value)`](code/main.py#L533)
- [`def encode_parameter_header_value(value)`](code/main.py#L537): Apply MCP's exact sentinel encoding when plain transport is ambiguous.
- [`def decode_parameter_header_value(value)`](code/main.py#L547): Decode a canonical MCP parameter-header value at the HTTP boundary.
- [`def build_parameter_headers(tool, arguments, audit_log)`](code/main.py#L569)
- [`def validate_parameter_headers(tool, arguments, headers, audit_log)`](code/main.py#L598): Compare recognized parameter headers with body arguments exactly.
- [`def streamable_http_tool_call(server, request, headers, audit_log)`](code/main.py#L640): Model the Streamable HTTP parity gate before JSON-RPC dispatch.
- [`class ContractClient`](code/main.py#L671)
  - [`def discover_tools(self)`](code/main.py#L688)
  - [`def call(self, name, arguments)`](code/main.py#L722)
  - [`def complete_environment(self, prefix)`](code/main.py#L737)
- [`def main()`](code/main.py#L754)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
