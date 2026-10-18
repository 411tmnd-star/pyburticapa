# How it works: The Tools Primitive: Calling Actions and Reading Their Results

## `code/main.py`

```text
Companion code for:
certifications/mcpa/lessons/11-the-tools-primitive/docs/en.md
Calling a tool and reading every shape its result can take.
Sources: MCP 2026-07-28 Tools and Subscriptions pages.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def make_request(request_id, method, params, capabilities, version)`](code/main.py#L34)
- [`def make_result(request_id, result_type)`](code/main.py#L45)
- [`def make_error(request_id, code, message, data)`](code/main.py#L49)
- [`def _start_for_cursor(cursor)`](code/main.py#L56)
- [`def _cursor_for_start(index)`](code/main.py#L68)
- [`def render_for_audience(blocks, audience)`](code/main.py#L72)
- [`def effective_tool_annotations(tool_definition)`](code/main.py#L81)
- [`class Tool`](code/main.py#L87)
  - [`def definition(self)`](code/main.py#L95)
- [`class Server`](code/main.py#L105)
  - [`def add_tool(self, tool)`](code/main.py#L110)
  - [`def _server_meta(self)`](code/main.py#L113)
  - [`def _meta_error(self, request_id, meta)`](code/main.py#L116)
  - [`def handle(self, message)`](code/main.py#L121)
  - [`def _list_tools(self, request_id, cursor)`](code/main.py#L134)
  - [`def _call_tool(self, request_id, params)`](code/main.py#L146)
  - [`def acknowledge_subscription(self, request)`](code/main.py#L160)
  - [`def queue_tools_list_changed(self, subscription_id)`](code/main.py#L169)
  - [`def pop_notification(self)`](code/main.py#L176)
  - [`def close_subscription(self, subscription_id)`](code/main.py#L179)
- [`class Client`](code/main.py#L187)
  - [`def _new_id(self)`](code/main.py#L193)
  - [`def send(self, method, params)`](code/main.py#L197)
  - [`def list_tools_page(self, cursor)`](code/main.py#L203)
  - [`def list_all_tool_definitions(self)`](code/main.py#L207)
  - [`def call(self, name, arguments)`](code/main.py#L217)
  - [`def open_listen(self, notification_filter)`](code/main.py#L220)
  - [`def expect_list_changed(self)`](code/main.py#L226)
  - [`def close_listen(self, listen_request)`](code/main.py#L231)
- [`def _summarize_ticket(args)`](code/main.py#L237)
- [`def build_tool_server()`](code/main.py#L245)
- [`def build_triage_incident_tool()`](code/main.py#L346)
- [`def run_tool_scenario()`](code/main.py#L356)
- [`def transcript()`](code/main.py#L375)
- [`def demo()`](code/main.py#L379)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
