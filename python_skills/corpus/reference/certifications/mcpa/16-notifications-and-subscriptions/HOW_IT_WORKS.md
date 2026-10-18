# How it works: The Subscription Stream: Notifications, Progress, and Cancellation

## `code/main.py`

```text
Companion code for:
certifications/mcpa/lessons/16-notifications-and-subscriptions/docs/en.md
A subscriptions/listen stream demultiplexed by subscription id, next to a request's own progress
notifications.
Sources: MCP 2026-07-28 Subscriptions, Progress, and Cancellation pages.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def make_request(request_id, method, params, capabilities, version, progress_token)`](code/main.py#L31)
- [`def make_result(request_id, result_type)`](code/main.py#L45)
- [`def make_error(request_id, code, message, data)`](code/main.py#L49)
- [`def make_notification(method, params)`](code/main.py#L56)
- [`class Subscription`](code/main.py#L61)
- [`class SubscriptionServer`](code/main.py#L68)
  - [`def _server_meta(self)`](code/main.py#L75)
  - [`def listen(self, request)`](code/main.py#L78)
  - [`def resource_updated(self, subscription_id, uri)`](code/main.py#L88)
  - [`def list_changed(self, subscription_id, which)`](code/main.py#L99)
  - [`def cancel(self, subscription_id)`](code/main.py#L107)
  - [`def close_gracefully(self, subscription_id)`](code/main.py#L112)
  - [`def call_long_job(self, request)`](code/main.py#L119)
- [`class SubscriberClient`](code/main.py#L145)
  - [`def _new_id(self)`](code/main.py#L151)
  - [`def listen(self, notifications)`](code/main.py#L155)
  - [`def receive_stream(self, notification)`](code/main.py#L164)
  - [`def cancel(self, subscription_id, reason)`](code/main.py#L175)
  - [`def close_gracefully(self, subscription_id)`](code/main.py#L181)
  - [`def call_with_progress(self, name, arguments, progress_token)`](code/main.py#L188)
- [`def run_scenario()`](code/main.py#L200)
- [`def transcript()`](code/main.py#L233)
- [`def demo()`](code/main.py#L238)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
