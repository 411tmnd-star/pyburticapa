# How it works: The Stateless Core of MCP

## `code/main.py`

```text
Companion code for:
certifications/mcpa/lessons/04-the-stateless-core/docs/en.md
Two stateless replicas sharing one handle store answer any client's call.
Sources: SEP-2575 (stateless MCP); SEP-2567 (sessionless MCP); MCP 2026-07-28 basic protocol.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def make_request(request_id, method, params, capabilities, version)`](code/main.py#L25)
- [`def make_result(request_id, result_type)`](code/main.py#L36)
- [`def make_error(request_id, code, message, data)`](code/main.py#L40)
- [`class Clock`](code/main.py#L52)
  - [`def advance(self, ticks)`](code/main.py#L55)
- [`class Basket`](code/main.py#L60)
- [`class SharedStore`](code/main.py#L68): Durable storage every replica reads and writes; no basket lives inside a replica process.
  - [`def create_basket(self, owner)`](code/main.py#L76)
  - [`def get(self, handle)`](code/main.py#L84)
  - [`def is_expired(self, basket)`](code/main.py#L87)
- [`class ToolSpec`](code/main.py#L92)
  - [`def definition(self)`](code/main.py#L97)
- [`class Replica`](code/main.py#L129)
  - [`def _server_meta(self)`](code/main.py#L133)
  - [`def handle(self, message, principal)`](code/main.py#L136)
  - [`def _call(self, request_id, params, principal)`](code/main.py#L155)
  - [`def _with_basket(self, request_id, arguments, principal, action)`](code/main.py#L173)
  - [`def _add_item(self, request_id, basket, arguments)`](code/main.py#L199)
  - [`def _checkout(self, request_id, basket, arguments)`](code/main.py#L218)
- [`class Router`](code/main.py#L228): Round robin dispatch across replicas that share one SharedStore; no replica is sticky to a client.
  - [`def pick(self)`](code/main.py#L235)
- [`class Client`](code/main.py#L241)
  - [`def send(self, method, params)`](code/main.py#L248)
  - [`def list_tools(self)`](code/main.py#L257)
  - [`def call(self, name, arguments)`](code/main.py#L260)
- [`def build_deployment()`](code/main.py#L264)
- [`def run_scenario()`](code/main.py#L274)
- [`def transcript()`](code/main.py#L287)
- [`def demo()`](code/main.py#L292)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
