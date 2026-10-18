# How it works: Deprecated, Not Removed: Roots, Sampling, and Logging

## `code/main.py`

```text
Companion code for:
certifications/mcpa/lessons/15-deprecated-client-features/docs/en.md
Roots and sampling still ride MRTR while logging rides per-request logLevel.
Sources: SEP-2577; MCP 2026-07-28 deprecated-features registry.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def make_request(request_id, method, params, capabilities, version)`](code/main.py#L29)
- [`def make_result(request_id, result_type)`](code/main.py#L40)
- [`def make_error(request_id, code, message, data)`](code/main.py#L44)
- [`def add_months(iso_date, months)`](code/main.py#L72)
- [`def earliest_removal(deprecated_since, window_months)`](code/main.py#L81)
- [`class MigrationFinding`](code/main.py#L86)
- [`def advise_migrations(server_capabilities, client_capabilities)`](code/main.py#L93)
- [`class Server`](code/main.py#L108)
  - [`def _server_meta(self)`](code/main.py#L112)
  - [`def handle(self, message)`](code/main.py#L115)
  - [`def _call(self, request_id, params, meta)`](code/main.py#L126)
  - [`def _summarize_workspace(self, request_id, params, meta)`](code/main.py#L134)
  - [`def _run_diagnostic(self, request_id, meta)`](code/main.py#L181)
- [`class Client`](code/main.py#L205)
  - [`def send(self, method, params, log_level)`](code/main.py#L212)
  - [`def call(self, name, arguments, input_responses, request_state, log_level)`](code/main.py#L222)
- [`def legacy_logging_set_level_example(server)`](code/main.py#L232)
- [`def run_scenario()`](code/main.py#L241)
- [`def transcript()`](code/main.py#L272)
- [`def demo()`](code/main.py#L277)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
