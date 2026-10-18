# How it works: Production Runtimes: Queue, Event, Cron

## `main.py`

```text
Four production runtime shapes: request-response, streaming, queue, event.

Same agent logic, four different outer shells. Stdlib only.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def _agent_fn(input_text)`](main.py#L13)
- [`def request_response(input_text)`](main.py#L24)
- [`def streaming(input_text)`](main.py#L29)
- [`class Job`](main.py#L35)
- [`class QueueRuntime`](main.py#L42)
  - [`def enqueue(self, payload)`](main.py#L48)
  - [`def worker(self, fail_policy)`](main.py#L54)
- [`class EventBus`](main.py#L73)
  - [`def subscribe(self, event_type, handler)`](main.py#L76)
  - [`def publish(self, event_type, payload)`](main.py#L79)
- [`def main()`](main.py#L86)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
