# How it works: MCP Separates Capability From Host

## `code/main.py`

Functions and classes, in file order (click to jump to the line):

- [`class ProtocolError`](code/main.py#L28)
- [`class Capability`](code/main.py#L37)
  - [`def validate_arguments(self, arguments)`](code/main.py#L43)
- [`class RequestStateSigner`](code/main.py#L70): Produces an opaque, integrity-protected MRTR requestState value.
  - [`def issue(self, method, tool, arguments)`](code/main.py#L78)
  - [`def verify(self, token, method, tool, arguments)`](code/main.py#L88)
- [`class MCPServer`](code/main.py#L107)
  - [`def handle(self, request)`](code/main.py#L139)
  - [`def exchange(self, request)`](code/main.py#L143)
  - [`def _validate_notification(method, params)`](code/main.py#L187)
  - [`def _validate_request_metadata(self, params)`](code/main.py#L202)
  - [`def _dispatch(self, method, params, metadata)`](code/main.py#L229)
  - [`def _call_tool(self, params, metadata)`](code/main.py#L306)
  - [`def _prepare_review(self, params, metadata, arguments)`](code/main.py#L333)
  - [`def _progress(token, progress, total, message)`](code/main.py#L438)
  - [`def _complete()`](code/main.py#L451)
  - [`def _input_required()`](code/main.py#L459)
  - [`def _error(request_id, code, message, data)`](code/main.py#L467)
- [`class MCPClient`](code/main.py#L476)
  - [`def build_request(self, method, params)`](code/main.py#L492)
  - [`def send(self, method, params)`](code/main.py#L514)
  - [`def request(self, method, params)`](code/main.py#L530)
  - [`def call_with_mrtr(self, params)`](code/main.py#L540)
  - [`def fulfill(input_requests)`](code/main.py#L569)
- [`def streamable_http_profile()`](code/main.py#L594)
- [`def canonicalize_demo_transcript(transcript)`](code/main.py#L609)
- [`def demo()`](code/main.py#L623)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
