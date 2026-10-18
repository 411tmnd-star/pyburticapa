# How it works: JSON-RPC 2.0 Over Newline-Delimited Stdio

## `main.py`

```text
JSON-RPC 2.0 over newline-delimited stdio.

Conceptual references:
- ./docs/en.md (this lesson)
- JSON-RPC 2.0 specification (https://www.jsonrpc.org/specification)
- RFC 8259 (JSON)

Stdlib only. Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class JsonRpcError`](main.py#L27)
- [`class MethodNotFound`](main.py#L36)
- [`class InvalidParams`](main.py#L40)
- [`class Request`](main.py#L45)
- [`def _is_valid_envelope(msg)`](main.py#L52)
- [`def parse_request(raw)`](main.py#L70): Parse one JSON line. Returns (Request, None) on success or (None, error_dict).
- [`def _err_envelope(rid, code, message, data)`](main.py#L91)
- [`def _ok_envelope(rid, result)`](main.py#L98)
- [`def _notification_envelope(method, params)`](main.py#L102)
- [`class StdioTransport`](main.py#L109): Newline-delimited JSON-RPC 2.0 over a pair of byte streams.
  - [`def read_line(self)`](main.py#L116)
  - [`def write_response(self, rid, result)`](main.py#L122)
  - [`def write_error(self, rid, code, message, data)`](main.py#L125)
  - [`def write_notification(self, method, params)`](main.py#L128)
  - [`def _write(self, obj)`](main.py#L131)
- [`def _handle_one(handler, transport, req)`](main.py#L140): Dispatch a single Request. Returns the response envelope (or None for notification).
- [`def _process_batch(handler, transport, items)`](main.py#L160)
- [`def _write_raw(transport, obj)`](main.py#L180)
- [`def serve(handler, transport)`](main.py#L186): Read requests from transport until EOF. Dispatch each through handler.
- [`def _demo()`](main.py#L217): Self-terminating demo using io.BytesIO. No process spawn.

## Run and test

From this folder:

```
python main.py
python -m unittest discover -s tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
