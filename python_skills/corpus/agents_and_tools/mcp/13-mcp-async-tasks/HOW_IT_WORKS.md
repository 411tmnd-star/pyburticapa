# How it works: MCP Tasks Extension: Durable Work on a Stateless Core

## `code/main.py`

```text
Phase 13 Lesson 13: the stateless MCP Tasks extension.

Lesson: ../docs/en.md
Extension: https://tasks.extensions.modelcontextprotocol.io/specification/draft/tasks
This example uses only Python's standard library.
Run: python3 main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class McpError`](code/main.py#L48)
- [`def request_meta()`](code/main.py#L54)
- [`def _server_meta()`](code/main.py#L63)
- [`def complete()`](code/main.py#L67)
- [`def validate_request_meta(params)`](code/main.py#L71)
- [`def require_tasks_extension(meta)`](code/main.py#L90)
- [`def utc_now()`](code/main.py#L100)
- [`class Task`](code/main.py#L107)
  - [`def to_wire(self)`](code/main.py#L124)
- [`class TaskStore`](code/main.py#L143)
  - [`def reload(self)`](code/main.py#L150)
  - [`def persist(self, task)`](code/main.py#L157)
  - [`def create(self)`](code/main.py#L167)
  - [`def get(self, task_id)`](code/main.py#L183)
  - [`def save(self, task)`](code/main.py#L188)
- [`class TaskService`](code/main.py#L193)
  - [`def server_discover(self, params)`](code/main.py#L197)
  - [`def tools_list(self, params)`](code/main.py#L209)
  - [`def _owned_task(self, task_id)`](code/main.py#L217)
  - [`def tools_call(self, params)`](code/main.py#L223)
  - [`def tasks_get(self, params)`](code/main.py#L238)
  - [`def tasks_update(self, params)`](code/main.py#L244)
  - [`def tasks_cancel(self, params)`](code/main.py#L270)
  - [`def advance_worker(self, task_id)`](code/main.py#L281)
  - [`def subscription_acknowledgement(self, task_ids)`](code/main.py#L324)
  - [`def task_notification(self, task_id)`](code/main.py#L346)
  - [`def dispatch(self, request)`](code/main.py#L363)
- [`def make_request(request_id, method, params)`](code/main.py#L402)
- [`def make_http_request(request_id, method, params)`](code/main.py#L417)
- [`def run_demo(directory)`](code/main.py#L443)
- [`def main()`](code/main.py#L494)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
