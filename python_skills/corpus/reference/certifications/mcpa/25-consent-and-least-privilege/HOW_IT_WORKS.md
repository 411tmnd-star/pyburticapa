# How it works: Consent and Least Privilege

## `code/main.py`

```text
Companion code for:
certifications/mcpa/lessons/25-consent-and-least-privilege/docs/en.md
A consent broker that elicits approval for sensitive tool calls and steps up OAuth scope on a
403 challenge.
Sources: MCP 2026-07-28 Elicitation page and Authorization page (step-up authorization).
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def make_request(request_id, method, params, capabilities, version)`](code/main.py#L32)
- [`def make_result(request_id, result_type)`](code/main.py#L43)
- [`def make_error(request_id, code, message, data)`](code/main.py#L47)
- [`def _arguments_digest(arguments)`](code/main.py#L54)
- [`def _sign_request_state(payload)`](code/main.py#L58)
- [`def _open_request_state(token)`](code/main.py#L64)
- [`def union_scopes(previous, challenge)`](code/main.py#L81)
- [`class Tool`](code/main.py#L86)
  - [`def definition(self)`](code/main.py#L94)
  - [`def needs_consent(self)`](code/main.py#L102)
- [`class ConsentGate`](code/main.py#L109)
  - [`def grant(self, tool_name)`](code/main.py#L112)
  - [`def has(self, tool_name)`](code/main.py#L115)
- [`class Server`](code/main.py#L120)
  - [`def add(self, tool)`](code/main.py#L127)
  - [`def _server_meta(self)`](code/main.py#L130)
  - [`def handle(self, message, scopes)`](code/main.py#L133)
  - [`def _call(self, request_id, params, scopes)`](code/main.py#L160)
  - [`def _elicit_consent(self, request_id, tool, arguments)`](code/main.py#L184)
  - [`def _resolve_consent(self, request_id, tool, arguments, confirm_response, request_state)`](code/main.py#L206)
  - [`def _run(self, request_id, tool, arguments)`](code/main.py#L244)
- [`class Client`](code/main.py#L256)
  - [`def _fresh_id(self)`](code/main.py#L261)
  - [`def send(self, method, params, scopes)`](code/main.py#L265)
  - [`def discover(self)`](code/main.py#L271)
  - [`def list_tools(self, scopes)`](code/main.py#L274)
  - [`def call(self, name, arguments, scopes, input_responses, request_state, violation)`](code/main.py#L277)
  - [`def call_with_step_up(self, name, arguments, scopes, authorize)`](code/main.py#L293)
- [`def build_files_server()`](code/main.py#L325)
- [`def run_scenario()`](code/main.py#L374)
- [`def transcript()`](code/main.py#L438)
- [`def demo()`](code/main.py#L442)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
