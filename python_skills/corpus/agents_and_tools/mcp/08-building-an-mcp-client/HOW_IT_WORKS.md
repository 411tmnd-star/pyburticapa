# How it works: Building an MCP Client: Discovery, Routing, and Dual-Era Fallback

## `code/main.py`

```text
Phase 13 Lesson 08: a stateless multi-server MCP client.
Lesson: phases/13-tools-and-protocols/08-building-an-mcp-client/docs/en.md
Specification: https://modelcontextprotocol.io/specification/2026-07-28/
Demonstrates discovery, fail-closed legacy probing, deterministic merge, and routing.
Run: python3 main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class RpcFault`](code/main.py#L28)
- [`def request_meta(version, capabilities)`](code/main.py#L35)
- [`def modern_request(request_id, method, params, version, capabilities)`](code/main.py#L46)
- [`def legacy_request(request_id, method, params)`](code/main.py#L58)
- [`def rpc_error(request_id, code, message, data)`](code/main.py#L66)
- [`def complete(server_info, payload)`](code/main.py#L78)
- [`def decode_rpc_response(response, expected_id)`](code/main.py#L96)
- [`def validate_modern_request(message, supported)`](code/main.py#L126)
- [`class ModernFakeServer`](code/main.py#L146)
- [`class LegacyFakeServer`](code/main.py#L221)
- [`class Peer`](code/main.py#L270)
- [`class MergedTool`](code/main.py#L283)
- [`class MultiServerClient`](code/main.py#L290)
  - [`def _new_id(self)`](code/main.py#L314)
  - [`def add_server(self, name, transport)`](code/main.py#L319)
  - [`def _send(peer, message, timeout_ms)`](code/main.py#L333)
  - [`def _mutual_version(self, advertised)`](code/main.py#L340)
  - [`def _activate_modern(self, peer, result, version)`](code/main.py#L344)
  - [`def _probe_legacy(self, peer, trigger)`](code/main.py#L353)
  - [`def _connect_peer(self, peer)`](code/main.py#L402)
  - [`def connect_all(self)`](code/main.py#L468)
  - [`def _request(self, peer, method, params)`](code/main.py#L472)
  - [`def discover_tools(self)`](code/main.py#L499)
  - [`def merge(self, policy)`](code/main.py#L506)
  - [`def call(self, canonical_name, arguments)`](code/main.py#L529)
- [`def tool(name, description)`](code/main.py#L551)
- [`def main()`](code/main.py#L559)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
