# How it works: Reading One MCP Exchange End to End

## `code/main.py`

```text
Companion code for:
certifications/mcpa/lessons/33-mcpa-capstone-readiness/docs/en.md
Capstone: one 2026-07-28 incident-response exchange touching every MCPA domain.
Sources: MCP 2026-07-28 specification and the sources cited by lessons 00 to 32.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def make_request(request_id, method, params, capabilities, version, client_info, traceparent, progress_token)`](code/main.py#L42)
- [`def make_result(request_id, result_type)`](code/main.py#L63)
- [`def make_error(request_id, code, message, data)`](code/main.py#L67)
- [`def new_trace_id()`](code/main.py#L74)
- [`def new_span_id()`](code/main.py#L78)
- [`def make_traceparent(trace_id, span_id, sampled)`](code/main.py#L82)
- [`def parse_traceparent(value)`](code/main.py#L86)
- [`def child_traceparent(value)`](code/main.py#L95)
- [`def new_root_traceparent(sampled)`](code/main.py#L100)
- [`def _timestamp()`](code/main.py#L104)
- [`def digest_request(name, arguments)`](code/main.py#L108)
- [`def mint_request_state(secret, principal, name, arguments, issued_at, nonce, ttl_ticks)`](code/main.py#L113)
- [`class StateVerdict`](code/main.py#L127)
- [`def verify_request_state(secret, state, principal, name, arguments, now, consumed)`](code/main.py#L133)
- [`class AuditEntry`](code/main.py#L157)
- [`class AuditLog`](code/main.py#L171)
  - [`def _last_hash(self)`](code/main.py#L174)
  - [`def _digest(prev_hash, timestamp, trace_id, request_id, principal, method, tool, detail)`](code/main.py#L178)
  - [`def append(self, trace_id, request_id, principal, method, tool, detail)`](code/main.py#L195)
  - [`def verify(self)`](code/main.py#L206)
- [`class AccessToken`](code/main.py#L220)
- [`def authorize_bearer(authorization_header, tokens, canonical_uri)`](code/main.py#L226)
- [`class Task`](code/main.py#L240)
  - [`def touch(self)`](code/main.py#L251)
  - [`def snapshot(self, request_id)`](code/main.py#L254)
- [`class Server`](code/main.py#L307)
  - [`def _server_meta(self)`](code/main.py#L318)
  - [`def _mint_nonce(self)`](code/main.py#L321)
  - [`def _trace_id(self, meta)`](code/main.py#L325)
  - [`def handle(self, message, principal)`](code/main.py#L334)
  - [`def _discover(self, request_id)`](code/main.py#L359)
  - [`def _list_tools(self, request_id)`](code/main.py#L370)
  - [`def _call_tool(self, request_id, params, meta, principal, trace_id)`](code/main.py#L373)
  - [`def _scan_fleet_health(self, request_id, meta, principal, trace_id)`](code/main.py#L393)
  - [`def _restart_service(self, request_id, params, meta, principal, trace_id)`](code/main.py#L420)
  - [`def _run_diagnostics(self, request_id, params, meta, principal, trace_id)`](code/main.py#L503)
  - [`def _find_task(self, request_id, params, meta)`](code/main.py#L544)
  - [`def _task_get(self, request_id, params, meta, principal, trace_id)`](code/main.py#L556)
  - [`def _task_cancel(self, request_id, params, meta, principal, trace_id)`](code/main.py#L565)
  - [`def advance_task(self, task_id)`](code/main.py#L577)
  - [`def handle_http_tool_call(self, message, authorization_header)`](code/main.py#L591)
- [`def build_server()`](code/main.py#L615)
- [`class Client`](code/main.py#L624)
  - [`def _id(self)`](code/main.py#L631)
  - [`def send(self, method, params, capabilities, version, traceparent, progress_token, input_responses, request_state, violation)`](code/main.py#L635)
  - [`def call_http(self, name, arguments, authorization_header, traceparent)`](code/main.py#L663)
- [`def run_scenario()`](code/main.py#L678)
- [`def transcript()`](code/main.py#L750)
- [`def demo()`](code/main.py#L755)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
