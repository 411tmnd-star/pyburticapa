# How it works: Hosts, Clients, and Servers: MCP's Process Topology

## `code/main.py`

```text
Companion code for:
certifications/mcpa/lessons/06-hosts-clients-and-servers/docs/en.md
A host aggregates three servers behind one collision-safe tool registry.
Sources: MCP 2026-07-28 architecture overview and Tools pages (tool name collisions).
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def make_request(request_id, method, params, capabilities, version)`](code/main.py#L24)
- [`def make_result(request_id, result_type)`](code/main.py#L35)
- [`def make_error(request_id, code, message, data)`](code/main.py#L39)
- [`class Tool`](code/main.py#L47)
  - [`def definition(self)`](code/main.py#L53)
- [`class Server`](code/main.py#L58)
  - [`def add(self, tool)`](code/main.py#L64)
  - [`def _server_meta(self)`](code/main.py#L67)
  - [`def handle(self, message)`](code/main.py#L70)
  - [`def _call(self, request_id, params)`](code/main.py#L93)
- [`class Client`](code/main.py#L115)
  - [`def send(self, method, params)`](code/main.py#L124)
  - [`def discover(self)`](code/main.py#L131)
  - [`def list_tools(self)`](code/main.py#L137)
  - [`def call(self, name, arguments)`](code/main.py#L140)
- [`class Host`](code/main.py#L145)
  - [`def connect(self, server_id, server)`](code/main.py#L149)
  - [`def build_registry(self)`](code/main.py#L155)
  - [`def route(self, tool_name, arguments)`](code/main.py#L168)
- [`def build_files_server()`](code/main.py#L176)
- [`def build_notes_server()`](code/main.py#L193)
- [`def build_metrics_server()`](code/main.py#L210)
- [`def build_host()`](code/main.py#L218)
- [`def run_scenario()`](code/main.py#L227)
- [`def transcript()`](code/main.py#L237)
- [`def demo()`](code/main.py#L242)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
