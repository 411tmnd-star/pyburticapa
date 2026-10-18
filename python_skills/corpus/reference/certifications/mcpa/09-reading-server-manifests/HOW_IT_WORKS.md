# How it works: Reading a Server Manifest Like a Reviewer

## `code/main.py`

```text
Companion code for:
certifications/mcpa/lessons/09-reading-server-manifests/docs/en.md
A manifest linter that reads a discover result, a tools/list page, and a server.json like a
reviewer.
Sources: MCP 2026-07-28 Tools and server/discover pages; MCP Registry server.json documentation.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def make_request(request_id, method, params, capabilities, version)`](code/main.py#L26)
- [`def make_result(request_id, result_type)`](code/main.py#L37)
- [`def make_error(request_id, code, message, data)`](code/main.py#L41)
- [`class Finding`](code/main.py#L70)
- [`class ServerNamespace`](code/main.py#L77)
- [`class ManifestReport`](code/main.py#L85)
  - [`def is_clean(self)`](code/main.py#L91)
- [`def effective_annotations(tool)`](code/main.py#L95)
- [`def lint_annotations(tool, findings)`](code/main.py#L103)
- [`def lint_x_mcp_header(tool, findings)`](code/main.py#L114)
- [`def lint_caching(method, result, texts, findings)`](code/main.py#L153)
- [`def lint_instructions(instructions, findings)`](code/main.py#L167)
- [`def parse_server_name(name, findings)`](code/main.py#L180)
- [`def lint_manifest(discover_result, tools_list_result, server_json)`](code/main.py#L197)
- [`class ToolDef`](code/main.py#L216)
  - [`def definition(self)`](code/main.py#L222)
- [`class ManifestServer`](code/main.py#L230)
  - [`def _server_meta(self)`](code/main.py#L236)
  - [`def handle(self, message)`](code/main.py#L239)
- [`class Client`](code/main.py#L262)
  - [`def send(self, method)`](code/main.py#L268)
  - [`def discover(self)`](code/main.py#L275)
  - [`def list_tools(self)`](code/main.py#L278)
- [`def build_acme_server()`](code/main.py#L282)
- [`def build_docs_server()`](code/main.py#L335)
- [`def run_scenario()`](code/main.py#L388)
- [`def transcript()`](code/main.py#L400)
- [`def render_report(label, report)`](code/main.py#L405)
- [`def demo()`](code/main.py#L419)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
