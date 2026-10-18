# How it works: Long-Running Work and the Tasks Extension

## `code/main.py`

```text
Companion code for:
certifications/mcpa/lessons/21-long-running-work-and-tasks/docs/en.md
A build-pipeline tool that only becomes a durable task when the client declares
io.modelcontextprotocol/tasks.
Sources: SEP-2663 (tasks extension); MCP tasks extension overview.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def make_request(request_id, method, params, capabilities, version)`](code/main.py#L35)
- [`def make_result(request_id, result_type)`](code/main.py#L46)
- [`def make_error(request_id, code, message, data)`](code/main.py#L50)
- [`def _timestamp()`](code/main.py#L57)
- [`def _client_declares_tasks(meta)`](code/main.py#L61)
- [`class Task`](code/main.py#L68)
  - [`def touch(self)`](code/main.py#L82)
  - [`def snapshot(self, request_id)`](code/main.py#L85)
- [`class Server`](code/main.py#L104)
  - [`def _server_meta(self)`](code/main.py#L111)
  - [`def _supports_tasks(self)`](code/main.py#L114)
  - [`def handle(self, message)`](code/main.py#L117)
  - [`def _discover(self, request_id)`](code/main.py#L145)
  - [`def _list_tools(self, request_id)`](code/main.py#L156)
  - [`def _pipeline_payload(self, project, environment, deployed)`](code/main.py#L168)
  - [`def _call_tool(self, request_id, params, meta)`](code/main.py#L182)
  - [`def _find_task(self, request_id, params, meta)`](code/main.py#L214)
  - [`def _task_get(self, request_id, params, meta)`](code/main.py#L227)
  - [`def _task_update(self, request_id, params, meta)`](code/main.py#L233)
  - [`def _task_cancel(self, request_id, params, meta)`](code/main.py#L248)
  - [`def advance_task(self, task_id)`](code/main.py#L259)
- [`class Client`](code/main.py#L288)
  - [`def send(self, method, params, capabilities, version)`](code/main.py#L294)
- [`def run_scenario()`](code/main.py#L303)
- [`def transcript()`](code/main.py#L345)
- [`def demo()`](code/main.py#L350)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
