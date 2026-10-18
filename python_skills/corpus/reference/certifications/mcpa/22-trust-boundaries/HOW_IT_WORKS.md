# How it works: Trust Zones in an MCP Exchange

## `code/main.py`

```text
Companion code for:
certifications/mcpa/lessons/22-trust-boundaries/docs/en.md
Labels MCP context by trust zone and blocks a cross-server instruction hidden in server content.
Sources: SEP-1024; MCP Security Best Practices; MCP 2026-07-28 basic protocol (icons).
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def make_request(request_id, method, params, capabilities, version)`](code/main.py#L25)
- [`def make_result(request_id, result_type)`](code/main.py#L36)
- [`def make_error(request_id, code, message, data)`](code/main.py#L40)
- [`def same_name(left, right)`](code/main.py#L65)
- [`class ContextItem`](code/main.py#L70)
- [`class QuarantineEntry`](code/main.py#L78)
- [`class TrustLabeler`](code/main.py#L86)
  - [`def label_host_config(self, label, text)`](code/main.py#L91)
  - [`def label_server_content(self, server_id, label, text)`](code/main.py#L94)
  - [`def is_trusted_server(self, server_id)`](code/main.py#L107)
  - [`def effective_annotations(self, server_id, declared)`](code/main.py#L110)
  - [`def accepts_icon(self, uri)`](code/main.py#L118)
  - [`def attempt_relay(self, item, requested_server, requested_tool)`](code/main.py#L121)
  - [`def resolve_local_launch(self, item, command)`](code/main.py#L131)
- [`class Tool`](code/main.py#L138)
  - [`def definition(self)`](code/main.py#L146)
- [`class Server`](code/main.py#L156)
  - [`def add(self, tool)`](code/main.py#L161)
  - [`def _server_meta(self)`](code/main.py#L164)
  - [`def handle(self, message)`](code/main.py#L167)
  - [`def _call(self, request_id, params)`](code/main.py#L181)
- [`class Host`](code/main.py#L191)
  - [`def send(self, server, method, params)`](code/main.py#L197)
- [`def build_notes_server()`](code/main.py#L206)
- [`def build_tickets_server()`](code/main.py#L229)
- [`def build_calendar_server()`](code/main.py#L249)
- [`def run_wire_scenario()`](code/main.py#L261)
- [`def naive_relay_request(request_id)`](code/main.py#L323)
- [`def transcript()`](code/main.py#L327)
- [`def demo()`](code/main.py#L343)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
