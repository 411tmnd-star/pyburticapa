# How it works: Telling a Modern MCP Server From a Legacy One

## `code/main.py`

```text
Companion code for:
certifications/mcpa/lessons/05-protocol-eras-and-compatibility/docs/en.md
A dual-era client probing modern, modern-with-a-different-version, and legacy stdio servers.
Sources: MCP 2026-07-28 versioning, stdio transport, and Streamable HTTP transport pages.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def make_request(request_id, method, params, capabilities, version)`](code/main.py#L27)
- [`def make_result(request_id, result_type)`](code/main.py#L38)
- [`def make_error(request_id, code, message, data)`](code/main.py#L42)
- [`def make_legacy_initialize_request(request_id, version)`](code/main.py#L49)
- [`class ProbeTimeout`](code/main.py#L62)
- [`class ModernServer`](code/main.py#L67)
  - [`def _server_meta(self)`](code/main.py#L71)
  - [`def handle(self, message)`](code/main.py#L74)
- [`class LegacyErrorServer`](code/main.py#L107)
  - [`def handle(self, message)`](code/main.py#L110)
- [`class LegacyTimeoutServer`](code/main.py#L127)
  - [`def handle(self, message)`](code/main.py#L130)
- [`class DualEraClient`](code/main.py#L149)
  - [`def _new_id(self)`](code/main.py#L154)
  - [`def _record(self, message, legacy)`](code/main.py#L158)
  - [`def probe(self, server)`](code/main.py#L161)
  - [`def _fall_back_to_legacy(self, server)`](code/main.py#L198)
  - [`def demonstrate_rejection(self, server)`](code/main.py#L206)
- [`def run_scenario()`](code/main.py#L214)
- [`def transcript()`](code/main.py#L233)
- [`def _preview(entry)`](code/main.py#L238)
- [`def demo()`](code/main.py#L244)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
