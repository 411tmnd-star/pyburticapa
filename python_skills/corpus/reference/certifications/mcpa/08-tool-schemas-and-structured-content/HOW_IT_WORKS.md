# How it works: The Contract Inside a Tool Definition

## `code/main.py`

```text
Companion code for:
certifications/mcpa/lessons/08-tool-schemas-and-structured-content/docs/en.md
A tool's schema contract, enforced as tool execution errors, not protocol errors.
Sources: MCP 2026-07-28 Tools page; JSON Schema 2020-12; SEP-1303.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def make_request(request_id, method, params, capabilities, version)`](code/main.py#L38)
- [`def make_result(request_id, result_type)`](code/main.py#L49)
- [`def make_error(request_id, code, message, data)`](code/main.py#L53)
- [`def is_valid_tool_name(name)`](code/main.py#L60)
- [`def find_network_refs(node)`](code/main.py#L64)
- [`def _matches_type(value, expected)`](code/main.py#L78)
- [`def validate_arguments(schema, arguments)`](code/main.py#L87)
- [`class Tool`](code/main.py#L120)
  - [`def definition(self)`](code/main.py#L127)
- [`class Server`](code/main.py#L135)
  - [`def register(self, tool)`](code/main.py#L139)
  - [`def _server_meta(self)`](code/main.py#L150)
  - [`def handle(self, message)`](code/main.py#L153)
  - [`def _call(self, request_id, params)`](code/main.py#L167)
- [`class Client`](code/main.py#L192)
  - [`def send(self, method, params)`](code/main.py#L198)
  - [`def list_tools(self)`](code/main.py#L205)
  - [`def call(self, name, arguments)`](code/main.py#L208)
- [`def build_catalog_server()`](code/main.py#L212)
- [`def attempt_network_ref_registration()`](code/main.py#L261)
- [`def run_scenario()`](code/main.py#L282)
- [`def transcript()`](code/main.py#L296)
- [`def demo()`](code/main.py#L314)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
