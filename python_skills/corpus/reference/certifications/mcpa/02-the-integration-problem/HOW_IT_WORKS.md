# How it works: The Integration Problem MCP Solves

## `code/main.py`

```text
Companion code for:
certifications/mcpa/lessons/02-the-integration-problem/docs/en.md
One client driving two servers it was never built for.
Sources: MCP 2026-07-28 architecture overview, server/discover, and Tools pages.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def make_request(request_id, method, params, capabilities, version)`](code/main.py#L25)
- [`def make_result(request_id, result_type)`](code/main.py#L36)
- [`def make_error(request_id, code, message, data)`](code/main.py#L40)
- [`def integrations_without_protocol(hosts, systems)`](code/main.py#L47)
- [`def integrations_with_protocol(hosts, systems)`](code/main.py#L51)
- [`class Tool`](code/main.py#L56)
  - [`def definition(self)`](code/main.py#L62)
- [`class Server`](code/main.py#L67)
  - [`def add(self, tool)`](code/main.py#L71)
  - [`def _server_meta(self)`](code/main.py#L74)
  - [`def handle(self, message)`](code/main.py#L77)
  - [`def _call(self, request_id, params)`](code/main.py#L107)
- [`class Client`](code/main.py#L131)
  - [`def send(self, method, params, version)`](code/main.py#L137)
  - [`def discover(self)`](code/main.py#L144)
  - [`def list_tools(self)`](code/main.py#L147)
  - [`def call(self, name, arguments)`](code/main.py#L150)
- [`def build_weather_server()`](code/main.py#L154)
- [`def build_ticket_server()`](code/main.py#L165)
- [`def run_scenario()`](code/main.py#L182)
- [`def transcript()`](code/main.py#L196)
- [`def demo()`](code/main.py#L201)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
