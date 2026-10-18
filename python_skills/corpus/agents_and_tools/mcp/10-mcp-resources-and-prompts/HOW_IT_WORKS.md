# How it works: MCP Resources and Prompts: Addressable Context for Stateless Servers

## `code/main.py`

```text
Runnable companion to docs/en.md for MCP protocol version 2026-07-28.
Official resources contract: https://modelcontextprotocol.io/specification/2026-07-28/server/resources
Official prompts contract: https://modelcontextprotocol.io/specification/2026-07-28/server/prompts
Official subscription contract: https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/subscriptions
The simulator keeps transport details small so the wire invariants remain visible.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class RpcError`](code/main.py#L52)
  - [`def as_json(self)`](code/main.py#L59)
- [`def request_meta(client_name)`](code/main.py#L66)
- [`def response_meta()`](code/main.py#L74)
- [`def complete()`](code/main.py#L78)
- [`def validate_request_meta(params)`](code/main.py#L82)
- [`def server_discover(_)`](code/main.py#L99)
- [`def resources_list(_)`](code/main.py#L112)
- [`def resources_read(params)`](code/main.py#L120)
- [`def prompts_list(_)`](code/main.py#L132)
- [`def prompts_get(params)`](code/main.py#L137)
- [`class SubscriptionStream`](code/main.py#L167)
  - [`def _meta(self)`](code/main.py#L171)
  - [`def acknowledged(self)`](code/main.py#L174)
  - [`def resource_updated(self, uri)`](code/main.py#L181)
  - [`def resources_list_changed(self)`](code/main.py#L190)
  - [`def prompts_list_changed(self)`](code/main.py#L199)
  - [`def close(self)`](code/main.py#L208)
- [`def subscriptions_listen(request_id, params)`](code/main.py#L219)
- [`def handle(request)`](code/main.py#L244)
- [`def rpc_request(request_id, method)`](code/main.py#L275)
- [`def demo()`](code/main.py#L284)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
