# How it works: Resources: Addressable Content for a Stateless Server

## `code/main.py`

```text
Companion code for:
certifications/mcpa/lessons/12-the-resources-primitive/docs/en.md
A resource server over an in-memory project tree with a URI template, binary contents, traversal
protection, and cache hints.
Sources: MCP 2026-07-28 Resources page; RFC 6570; RFC 3986.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def make_request(request_id, method, params, capabilities, version)`](code/main.py#L36)
- [`def make_result(request_id, result_type)`](code/main.py#L47)
- [`def make_error(request_id, code, message, data)`](code/main.py#L51)
- [`def expand_template(template, values)`](code/main.py#L58)
- [`def resolve_under_root(uri)`](code/main.py#L69)
- [`class Resource`](code/main.py#L80)
  - [`def definition(self)`](code/main.py#L91)
  - [`def content(self)`](code/main.py#L102)
- [`class WorkspaceServer`](code/main.py#L112)
  - [`def add(self, resource)`](code/main.py#L118)
  - [`def _server_meta(self)`](code/main.py#L121)
  - [`def handle(self, message)`](code/main.py#L124)
  - [`def _list(self, request_id)`](code/main.py#L155)
  - [`def _list_templates(self, request_id)`](code/main.py#L159)
  - [`def _resolve(self, uri)`](code/main.py#L165)
  - [`def _read(self, request_id, params)`](code/main.py#L175)
- [`class Client`](code/main.py#L190)
  - [`def send(self, method, params, version)`](code/main.py#L196)
  - [`def discover(self)`](code/main.py#L203)
  - [`def list_resources(self)`](code/main.py#L206)
  - [`def list_templates(self)`](code/main.py#L209)
  - [`def read(self, uri)`](code/main.py#L212)
  - [`def read_template(self, template)`](code/main.py#L215)
- [`def build_workspace_server()`](code/main.py#L219)
- [`def run_scenario()`](code/main.py#L295)
- [`def transcript()`](code/main.py#L311)
- [`def demo()`](code/main.py#L315)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
