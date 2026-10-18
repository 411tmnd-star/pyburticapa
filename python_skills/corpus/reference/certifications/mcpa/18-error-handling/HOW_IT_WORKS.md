# How it works: Two Ways for a Request to Fail

## `code/main.py`

```text
Companion code for:
certifications/mcpa/lessons/18-error-handling/docs/en.md
An error classifier and responder that refuses legacy and retired JSON-RPC codes.
Sources: JSON-RPC 2.0; SEP-1303; SEP-2164; MCP 2026-07-28 error code allocation.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def make_request(request_id, method, params, capabilities, version)`](code/main.py#L48)
- [`def make_result(request_id, result_type)`](code/main.py#L59)
- [`def make_error(request_id, code, message, data)`](code/main.py#L63)
- [`class ForbiddenErrorCode`](code/main.py#L70)
- [`def is_forbidden_error_code(code)`](code/main.py#L74)
- [`def safe_error(request_id, code, message, data)`](code/main.py#L82)
- [`def parse_client_message(raw)`](code/main.py#L90)
- [`class Server`](code/main.py#L112)
  - [`def _server_meta(self)`](code/main.py#L116)
  - [`def handle(self, message)`](code/main.py#L119)
  - [`def _call(self, request_id, params, client_capabilities)`](code/main.py#L149)
  - [`def _validate(self, name, tool, arguments)`](code/main.py#L174)
- [`class Client`](code/main.py#L184)
  - [`def send(self, method, params, capabilities, version)`](code/main.py#L190)
  - [`def call(self, name, arguments, capabilities)`](code/main.py#L198)
- [`def wrap_errors_with_http_status(entries)`](code/main.py#L202)
- [`def run_scenario()`](code/main.py#L214)
- [`def transcript()`](code/main.py#L250)
- [`def demo()`](code/main.py#L254)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
