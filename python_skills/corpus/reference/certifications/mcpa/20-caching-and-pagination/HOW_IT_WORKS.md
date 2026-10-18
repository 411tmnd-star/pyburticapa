# How it works: Cache Freshness and Cursor-Based Pagination

## `code/main.py`

```text
Companion code for:
certifications/mcpa/lessons/20-caching-and-pagination/docs/en.md
A client cache that honors ttlMs, cacheScope, and list-changed invalidation while paging through
opaque cursors.
Sources: SEP-2549; MCP 2026-07-28 Caching and Pagination pages.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def make_request(request_id, method, params, capabilities, version)`](code/main.py#L28)
- [`def make_result(request_id, result_type)`](code/main.py#L39)
- [`def make_error(request_id, code, message, data)`](code/main.py#L43)
- [`def make_notification(method, params)`](code/main.py#L50)
- [`def encode_cursor(offset)`](code/main.py#L54)
- [`def decode_cursor(cursor)`](code/main.py#L60)
- [`class NotesServer`](code/main.py#L89)
  - [`def _server_meta(self)`](code/main.py#L93)
  - [`def _record(self, method)`](code/main.py#L96)
  - [`def handle(self, message, token)`](code/main.py#L99)
  - [`def _list(self, request_id, params)`](code/main.py#L115)
  - [`def _read(self, request_id, params, token)`](code/main.py#L132)
  - [`def _read_vault(self, request_id, params, token)`](code/main.py#L157)
- [`class CacheEntry`](code/main.py#L191)
- [`class ClientCache`](code/main.py#L196)
  - [`def _key(self, method, cache_params, token, private)`](code/main.py#L201)
  - [`def get(self, method, cache_params, token)`](code/main.py#L204)
  - [`def store(self, method, cache_params, token, result)`](code/main.py#L211)
  - [`def invalidate_method(self, method)`](code/main.py#L219)
- [`class FakeClock`](code/main.py#L224)
  - [`def now(self)`](code/main.py#L228)
  - [`def advance(self, delta_ms)`](code/main.py#L231)
- [`class Client`](code/main.py#L235)
  - [`def _send(self, method, params)`](code/main.py#L246)
  - [`def list_resources(self, cursor)`](code/main.py#L254)
  - [`def read_resource(self, uri)`](code/main.py#L267)
  - [`def _resolve_input_required(self, response, original_params)`](code/main.py#L281)
  - [`def listen(self, notifications)`](code/main.py#L296)
  - [`def deliver_list_changed(self)`](code/main.py#L310)
  - [`def close_listen(self)`](code/main.py#L318)
- [`def legacy_server_violation()`](code/main.py#L325)
- [`def run_scenario()`](code/main.py#L339)
- [`def transcript()`](code/main.py#L370)
- [`def demo()`](code/main.py#L375)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
