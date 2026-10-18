# How it works: The Model Interaction Flow

## `code/main.py`

```text
Companion code for:
certifications/mcpa/lessons/10-model-interaction-flow/docs/en.md
A scripted model driving one host loop over a mock server.
Sources: MCP 2026-07-28 Tools and multi round-trip requests (MRTR) pages.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def make_request(request_id, method, params, capabilities, version)`](code/main.py#L28)
- [`def make_result(request_id, result_type)`](code/main.py#L39)
- [`def make_error(request_id, code, message, data)`](code/main.py#L43)
- [`def encode_request_state(payload)`](code/main.py#L50)
- [`class Tool`](code/main.py#L55)
  - [`def definition(self)`](code/main.py#L62)
- [`class Server`](code/main.py#L70)
  - [`def add(self, tool)`](code/main.py#L74)
  - [`def _server_meta(self)`](code/main.py#L77)
  - [`def handle(self, message)`](code/main.py#L80)
  - [`def _call(self, request_id, params)`](code/main.py#L103)
- [`def handle_get_forecast(request_id, arguments, params, meta)`](code/main.py#L112)
- [`def make_open_ticket_handler(tickets)`](code/main.py#L131)
- [`def make_close_ticket_handler(tickets)`](code/main.py#L184)
- [`def build_server()`](code/main.py#L204)
- [`class Client`](code/main.py#L233)
  - [`def send(self, method, params)`](code/main.py#L240)
  - [`def discover(self)`](code/main.py#L247)
  - [`def list_tools(self)`](code/main.py#L250)
  - [`def call(self, name, arguments, input_responses, request_state)`](code/main.py#L253)
- [`def requires_confirmation(annotations)`](code/main.py#L262)
- [`def missing_argument(error_text)`](code/main.py#L268)
- [`def extract_city(request_text)`](code/main.py#L273)
- [`def extract_title(request_text)`](code/main.py#L278)
- [`def extract_ticket_id(request_text)`](code/main.py#L283)
- [`def choose_priority(title)`](code/main.py#L288)
- [`def approve_close(ticket_id, tickets_view)`](code/main.py#L293)
- [`class SessionResult`](code/main.py#L299)
- [`def run_session()`](code/main.py#L308)
- [`def transcript()`](code/main.py#L380)
- [`def demo()`](code/main.py#L384)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
