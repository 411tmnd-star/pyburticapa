# How it works: Choosing MCP's Shape for the Job

## `code/main.py`

```text
Companion code for:
certifications/mcpa/lessons/29-operational-use-cases/docs/en.md
A use-case recommender mapping operational scenarios to MCP primitives, transport, auth,
extensions, and cache scope.
Sources: MCP extensions overview; MCP 2026-07-28 Authorization page.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def make_request(request_id, method, params, capabilities, version)`](code/main.py#L34)
- [`def make_result(request_id, result_type)`](code/main.py#L45)
- [`def make_error(request_id, code, message, data)`](code/main.py#L49)
- [`class UseCaseProfile`](code/main.py#L57)
- [`class Recommendation`](code/main.py#L71)
- [`def recommend(profile)`](code/main.py#L84)
- [`class ToolDef`](code/main.py#L185)
  - [`def definition(self)`](code/main.py#L191)
- [`class Server`](code/main.py#L196)
  - [`def add(self, tool)`](code/main.py#L200)
  - [`def _server_meta(self)`](code/main.py#L203)
  - [`def handle(self, message)`](code/main.py#L206)
  - [`def _call(self, request_id, params, meta)`](code/main.py#L237)
- [`def handle_search(arguments, capabilities)`](code/main.py#L248)
- [`def handle_dashboard(arguments, capabilities)`](code/main.py#L253)
- [`def build_opsdesk_server()`](code/main.py#L260)
- [`class Client`](code/main.py#L277)
  - [`def send(self, method, params, capabilities, version)`](code/main.py#L283)
  - [`def discover(self)`](code/main.py#L291)
  - [`def list_tools(self)`](code/main.py#L294)
  - [`def call(self, name, arguments, capabilities)`](code/main.py#L297)
- [`def run_scenario()`](code/main.py#L301)
- [`def transcript()`](code/main.py#L312)
- [`def demo()`](code/main.py#L316)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
