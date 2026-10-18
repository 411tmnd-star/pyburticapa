# How it works: The Tool Invocation Lifecycle

## `code/main.py`

```text
Companion code for:
certifications/mcpa/lessons/17-tool-invocation-lifecycle/docs/en.md
A tool-call lifecycle state machine from discover through final.
Sources: MCP 2026-07-28 Tools, multi round-trip requests, and Cancellation pages.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def make_request(request_id, method, params, capabilities, version, progress_token)`](code/main.py#L26)
- [`def make_result(request_id, result_type)`](code/main.py#L40)
- [`def make_error(request_id, code, message, data)`](code/main.py#L44)
- [`class Tool`](code/main.py#L69)
  - [`def definition(self)`](code/main.py#L77)
- [`class Build`](code/main.py#L117)
- [`def _encode_state(payload)`](code/main.py#L122)
- [`def _decode_state(state)`](code/main.py#L126)
- [`class LifecycleServer`](code/main.py#L136): Runs every tools/call through validate (is the tool known) then execute (schema, then handler).
  - [`def _server_meta(self)`](code/main.py#L144)
  - [`def discover(self, message)`](code/main.py#L147)
  - [`def list_tools(self, message)`](code/main.py#L158)
  - [`def seed_build(self, service, ticks, total)`](code/main.py#L163)
  - [`def call(self, message)`](code/main.py#L169): Checkpoint validate, then checkpoint execute. Returns (notifications, response).
  - [`def _missing(self, tool, arguments)`](code/main.py#L184)
  - [`def _start_build(self, request_id, arguments)`](code/main.py#L187)
  - [`def _get_build_status(self, request_id, arguments, progress_token)`](code/main.py#L205)
  - [`def _publish_release(self, request_id, params, arguments)`](code/main.py#L260)
- [`class Run`](code/main.py#L321): One lifecycle trace: the ordered stages a single logical call moved through, and how it ended.
  - [`def enter(self, stage)`](code/main.py#L329)
- [`class Client`](code/main.py#L333)
  - [`def _new_id(self)`](code/main.py#L340)
  - [`def discover(self, run)`](code/main.py#L344)
  - [`def list_tools(self, run)`](code/main.py#L352)
  - [`def call(self, run, name, arguments)`](code/main.py#L360)
  - [`def cancel(self, run, request_id, reason)`](code/main.py#L410)
  - [`def deliver_late(self, run, request_id, response)`](code/main.py#L416): A response for a cancelled request arrives anyway. It is ignored, not appended to the log.
- [`def run_happy_path(server, client)`](code/main.py#L424)
- [`def run_needs_input_then_retry(server, client)`](code/main.py#L436)
- [`def run_confirmation_denied(server, client)`](code/main.py#L454)
- [`def run_unknown_tool(server, client)`](code/main.py#L465)
- [`def run_invalid_arguments(server, client)`](code/main.py#L476)
- [`def run_broken_stream_reissue(server, client)`](code/main.py#L487)
- [`def run_timeout_then_cancel(server, client)`](code/main.py#L502)
- [`def run_internal_fault(server, client)`](code/main.py#L526)
- [`def run_all()`](code/main.py#L538)
- [`def transcript()`](code/main.py#L554)
- [`def demo()`](code/main.py#L559)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
