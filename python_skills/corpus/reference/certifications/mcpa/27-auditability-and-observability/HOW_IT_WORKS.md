# How it works: One Trace ID Ties Auditability to Observability

## `code/main.py`

```text
Companion code for:
certifications/mcpa/lessons/27-auditability-and-observability/docs/en.md
Trace context propagation and a hash-chained audit log for MCP tool calls.
Sources: SEP-414; W3C Trace Context; W3C Baggage.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def new_trace_id()`](code/main.py#L38)
- [`def new_span_id()`](code/main.py#L42)
- [`def make_traceparent(trace_id, span_id, sampled)`](code/main.py#L46)
- [`def parse_traceparent(value)`](code/main.py#L50)
- [`def child_traceparent(value)`](code/main.py#L64)
- [`def new_root_traceparent(sampled)`](code/main.py#L69)
- [`class Principal`](code/main.py#L74)
- [`def authenticate(bearer_token)`](code/main.py#L84)
- [`def make_request(request_id, method, params, capabilities, client_info, version, traceparent, tracestate, baggage)`](code/main.py#L91)
- [`def make_result(request_id, result_type)`](code/main.py#L116)
- [`def make_error(request_id, code, message, data)`](code/main.py#L120)
- [`class Tool`](code/main.py#L128)
- [`class AuditEntry`](code/main.py#L137)
- [`class AuditLog`](code/main.py#L152)
  - [`def _last_hash(self)`](code/main.py#L155)
  - [`def _digest(prev_hash, timestamp, trace_id, request_id, principal, method, tool, arguments, result_channel)`](code/main.py#L159)
  - [`def append(self, trace_id, request_id, principal, method, tool, arguments, result_channel)`](code/main.py#L186)
  - [`def verify(self)`](code/main.py#L215)
- [`class IdSequence`](code/main.py#L231)
  - [`def next(self)`](code/main.py#L234)
- [`class Server`](code/main.py#L241)
  - [`def register(self, tool)`](code/main.py#L247)
  - [`def _redacted(self, tool, arguments)`](code/main.py#L250)
  - [`def _server_meta(self)`](code/main.py#L253)
  - [`def call_upstream(self, ctx, tool, arguments)`](code/main.py#L256)
  - [`def handle(self, request, headers, id_seq, wire_log)`](code/main.py#L278)
- [`class CallContext`](code/main.py#L333)
  - [`def call_upstream(self, tool, arguments)`](code/main.py#L344)
- [`def _list_recent_grants(ctx, arguments)`](code/main.py#L348)
- [`def _reset_api_key(ctx, arguments)`](code/main.py#L352)
- [`def build_vault_server()`](code/main.py#L357)
- [`def build_ops_server(upstream)`](code/main.py#L373)
- [`class Client`](code/main.py#L395)
  - [`def call_tool(self, name, arguments, traceparent, tracestate, baggage)`](code/main.py#L403)
- [`class Scenario`](code/main.py#L430)
- [`def run_scenario()`](code/main.py#L438)
- [`def transcript()`](code/main.py#L461)
- [`def render_log(label, log)`](code/main.py#L465)
- [`def demo()`](code/main.py#L471)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
