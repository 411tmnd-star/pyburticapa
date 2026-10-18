# How it works: A2A — The Agent-to-Agent Protocol

## `main.py`

```text
A2A-minimal server and client using http.server, on the A2A 1.0 HTTP+JSON binding.

Implements the discovery-submit-poll-result flow:
  - GET /.well-known/agent-card.json  -> Agent Card
  - POST /message:send                -> SendMessage, returns the new task
  - GET /tasks/{id}                   -> GetTask, status + artifacts

Server runs in a background thread; client talks to it and prints the trace.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class TaskStore`](main.py#L49)
  - [`def create(self, message, return_immediately)`](main.py#L54)
  - [`def _run(self, tid)`](main.py#L73)
  - [`def get(self, tid)`](main.py#L101)
- [`class A2AHandler`](main.py#L109)
  - [`def log_message(self, format)`](main.py#L110)
  - [`def _send_json(self, status, body, content_type)`](main.py#L113)
  - [`def _send_error(self, http_status, rpc_status, message, reason)`](main.py#L121)
  - [`def _version_ok(self)`](main.py#L128)
  - [`def do_GET(self)`](main.py#L135)
  - [`def do_POST(self)`](main.py#L151)
- [`def run_server()`](main.py#L164)
- [`def http_json(method, url, body)`](main.py#L170)
- [`def run_client()`](main.py#L179)
- [`def main()`](main.py#L210)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
