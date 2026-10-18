# How it works: MCP Reliability, Cancellation, and Flow Control

## `code/main.py`

```text
Phase 13 Lesson 29: MCP reliability, cancellation, and flow control.
Lesson: ../docs/en.md
Cancellation: https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/cancellation
Transport: https://modelcontextprotocol.io/specification/2026-07-28/basic/transports/streamable-http
This deterministic simulator uses only Python's standard library.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class ReliabilityError`](code/main.py#L27): Raised when a reliability invariant is violated.
- [`class InFlightRequest`](code/main.py#L32)
- [`class RequestCoordinator`](code/main.py#L50): Model request cancellation and completion races without wall-clock sleeps.
  - [`def start(self, request_id, operation)`](code/main.py#L57)
  - [`def progress(self, request_id, value)`](code/main.py#L90)
  - [`def timeout_signal(self, request_id)`](code/main.py#L122)
  - [`def client_cancel_signal(self, request_id)`](code/main.py#L138)
  - [`def receive_stdio_cancellation(self, notification)`](code/main.py#L157): Process the fire-and-forget notification and never return JSON-RPC.
  - [`def close_http_stream(self, request_id)`](code/main.py#L183)
  - [`def complete(self, request_id, result)`](code/main.py#L199)
  - [`def server_cancel_subscription(self, request_id)`](code/main.py#L215)
- [`class RetryDecision`](code/main.py#L239)
- [`def classify_retry()`](code/main.py#L244)
- [`class MutationLedger`](code/main.py#L262): Commit a simulated mutation and its idempotency record atomically.
  - [`def close(self)`](code/main.py#L303)
  - [`def executions(self)`](code/main.py#L308)
  - [`def _fingerprint(account, cents)`](code/main.py#L318)
  - [`def charge(self, account, cents)`](code/main.py#L326)
- [`class DurableTask`](code/main.py#L397)
- [`class DurableTaskService`](code/main.py#L403): Keep durable task cancellation separate from in-flight request cancellation.
  - [`def create(self, task_id)`](code/main.py#L409)
  - [`def cancel(self, task_id)`](code/main.py#L414)
  - [`def worker_checkpoint(self, task_id)`](code/main.py#L420)
  - [`def finish(self, task_id)`](code/main.py#L426)
- [`class BoundedSseBuffer`](code/main.py#L433): Bound progress memory while preserving a final response.
  - [`def _drop_oldest_progress(self)`](code/main.py#L444)
  - [`def push_progress(self, token, value)`](code/main.py#L453)
  - [`def push_final(self, response)`](code/main.py#L466)
  - [`def drain(self)`](code/main.py#L472)
- [`def sse_response_headers()`](code/main.py#L478)
- [`def sse_keepalive()`](code/main.py#L486)
- [`def reconnect_plan(previous_subscription_id, affected_resources)`](code/main.py#L490)
- [`def retry_delay_ms(client_id, attempt)`](code/main.py#L504)
- [`def main()`](code/main.py#L514)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
