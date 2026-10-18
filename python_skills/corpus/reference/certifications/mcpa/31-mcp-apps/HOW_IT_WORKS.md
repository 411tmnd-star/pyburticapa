# How it works: Interactive Interfaces Inside the Conversation

## `code/main.py`

```text
Companion code for:
certifications/mcpa/lessons/31-mcp-apps/docs/en.md
A host-side loader that constructs CSP from declared domains, grants only the permissions its
own policy allows, enforces tool visibility, and falls back to text otherwise.
Sources: SEP-1865; MCP Apps specification 2026-01-26 (ext-apps).
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def make_request(request_id, method, params, capabilities, version)`](code/main.py#L48)
- [`def make_result(request_id, result_type)`](code/main.py#L59)
- [`def make_error(request_id, code, message, data)`](code/main.py#L63)
- [`def _resource_catalog()`](code/main.py#L70)
- [`class Server`](code/main.py#L109)
  - [`def _server_meta(self)`](code/main.py#L118)
  - [`def handle(self, message)`](code/main.py#L121)
  - [`def _discover(self, request_id)`](code/main.py#L147)
  - [`def _list_tools(self, request_id)`](code/main.py#L158)
  - [`def _call_tool(self, request_id, params)`](code/main.py#L185)
  - [`def _list_resources(self, request_id)`](code/main.py#L214)
  - [`def _read_resource(self, request_id, params)`](code/main.py#L224)
- [`class Client`](code/main.py#L233)
  - [`def send(self, method, params, capabilities, version)`](code/main.py#L239)
- [`def negotiated_extensions(client_capabilities, server_capabilities)`](code/main.py#L248)
- [`def tool_visibility(tool)`](code/main.py#L254)
- [`def agent_visible_tools(tools)`](code/main.py#L259)
- [`def build_csp(csp)`](code/main.py#L263)
- [`def review_app_resource(content, host_trusted_domains)`](code/main.py#L290)
- [`def grant_permissions(requested, host_granted_permissions)`](code/main.py#L305)
- [`class HostAppLoader`](code/main.py#L310)
  - [`def load(self, tool, arguments, declare_ui)`](code/main.py#L316)
- [`def request_tool_call_from_app(client, tool, arguments, approved)`](code/main.py#L342)
- [`def run_scenario()`](code/main.py#L352)
- [`def transcript()`](code/main.py#L403)
- [`def demo()`](code/main.py#L408)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
