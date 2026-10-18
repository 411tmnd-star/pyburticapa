# How it works: Transports and the HTTP Header Contract

## `code/main.py`

```text
Companion code for:
certifications/mcpa/lessons/19-transports-and-http-headers/docs/en.md
Framing a stdio message and validating an HTTP header mirror.
Sources: MCP 2026-07-28 stdio and Streamable HTTP transport pages; SEP-2243.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def make_request(request_id, method, params, capabilities, version)`](code/main.py#L29)
- [`def make_result(request_id, result_type)`](code/main.py#L40)
- [`def make_error(request_id, code, message, data)`](code/main.py#L44)
- [`def frame_line(text)`](code/main.py#L51)
- [`def frame_message(message)`](code/main.py#L57)
- [`def parse_frames(stream)`](code/main.py#L61)
- [`def _is_safe_header_char(character)`](code/main.py#L65)
- [`def needs_base64_encoding(text)`](code/main.py#L70)
- [`def stringify_header_value(value)`](code/main.py#L80)
- [`def encode_header_value(value)`](code/main.py#L86)
- [`def decode_header_value(value)`](code/main.py#L94)
- [`def build_http_headers(message, header_params)`](code/main.py#L104)
- [`def validate_http_headers(headers, message, header_params)`](code/main.py#L120)
- [`def handle_http_request(headers, message, header_params)`](code/main.py#L147)
- [`def handle_http_get_or_delete(http_method)`](code/main.py#L157)
- [`def validate_origin(origin, allowed_origins)`](code/main.py#L161)
- [`def handle_http_notification(message)`](code/main.py#L167)
- [`class Tool`](code/main.py#L174)
  - [`def definition(self)`](code/main.py#L181)
- [`class Server`](code/main.py#L186)
  - [`def add(self, tool)`](code/main.py#L190)
  - [`def _server_meta(self)`](code/main.py#L193)
  - [`def handle(self, message)`](code/main.py#L196)
- [`class Client`](code/main.py#L213)
  - [`def _next_id(self)`](code/main.py#L219)
  - [`def _build_request(self, tool, arguments)`](code/main.py#L223)
  - [`def call_stdio(self, tool, arguments)`](code/main.py#L226)
  - [`def call_http(self, tool, arguments)`](code/main.py#L233)
  - [`def call_http_with_header_mismatch(self, tool, arguments, reason)`](code/main.py#L245)
- [`def build_server()`](code/main.py#L255)
- [`def run_scenario()`](code/main.py#L274)
- [`def transcript()`](code/main.py#L286)
- [`def demo()`](code/main.py#L290)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
