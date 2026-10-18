# How it works: Discovering a Server and Negotiating What It Can Do

## `code/main.py`

```text
Companion code for:
certifications/mcpa/lessons/07-discovery-and-capability-negotiation/docs/en.md
The server/discover request and per-request capability negotiation.
Sources: MCP 2026-07-28 server/discover and versioning pages; SEP-2575.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def make_request(request_id, method, params, capabilities, version)`](code/main.py#L26)
- [`def make_result(request_id, result_type)`](code/main.py#L37)
- [`def make_error(request_id, code, message, data)`](code/main.py#L41)
- [`class DeployServer`](code/main.py#L68)
  - [`def _server_meta(self)`](code/main.py#L72)
  - [`def handle(self, message)`](code/main.py#L75)
  - [`def _discover(self, request_id)`](code/main.py#L95)
  - [`def _call(self, request_id, params, client_capabilities)`](code/main.py#L106)
- [`class Client`](code/main.py#L129)
  - [`def send(self, method, params, capabilities, version)`](code/main.py#L135)
  - [`def discover(self, version)`](code/main.py#L143)
  - [`def call(self, name, arguments, capabilities)`](code/main.py#L146)
- [`def run_scenario()`](code/main.py#L150)
- [`def transcript()`](code/main.py#L162)
- [`def demo()`](code/main.py#L166)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
