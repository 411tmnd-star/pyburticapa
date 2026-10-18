# How it works: Capstone 13: Stateless MCP Server with Registry and Governance

## `code/main.py`

```text
Stateless MCP server, registry metadata, policy, and audit simulation.

This stdlib-only model keeps two discovery layers separate:

* ``server.json`` describes installation and remote transport metadata to a
  registry.
* ``server/discover`` reports live protocol versions and capabilities.

It does not open a network listener, validate a real OAuth token, call OPA, or
publish to a registry. Run with ``python3 code/main.py`` from the lesson root.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def request_meta()`](code/main.py#L33)
- [`def error(code, message, data)`](code/main.py#L44)
- [`def validate_meta(meta)`](code/main.py#L51)
- [`class ToolSchema`](code/main.py#L69)
- [`class MCPServer`](code/main.py#L81)
  - [`def server_info(self)`](code/main.py#L92)
  - [`def register(self, schema, handler)`](code/main.py#L95)
  - [`def result(self)`](code/main.py#L101)
  - [`def discover(self, meta)`](code/main.py#L108)
  - [`def tools_list(self, meta)`](code/main.py#L119)
  - [`def registry_document(self)`](code/main.py#L137)
- [`class Token`](code/main.py#L149)
  - [`def has_scope(self, scope)`](code/main.py#L156)
  - [`def is_expired(self, now)`](code/main.py#L159)
- [`def arguments_digest(args)`](code/main.py#L163)
- [`class ApprovalRecord`](code/main.py#L174)
  - [`def for_action(cls, actor, tool, args, target, expires_at)`](code/main.py#L182)
  - [`def authorize(self, actor, tool, args, target, now)`](code/main.py#L192)
- [`def policy_decide(server, tool, token, args, now, approval)`](code/main.py#L213)
- [`def redact(payload)`](code/main.py#L249)
- [`class AuditEntry`](code/main.py#L257)
- [`def dispatch(server, token, tool, args, meta, audit, approval)`](code/main.py#L267)
- [`def validate_registry_document(document)`](code/main.py#L314): Validate the official fields used by this lesson's remote-only profile.
- [`def reverse_dns_namespace(domain)`](code/main.py#L377)
- [`def validate_publisher_namespace(document, verified_domain)`](code/main.py#L385): Check domain ownership outside the server.json shape contract.
- [`def validate_runtime_alignment(document, discovery)`](code/main.py#L398): Compare publication identity with the live server/discover identity.
- [`class Registry`](code/main.py#L418)
  - [`def register(self, server)`](code/main.py#L423)
  - [`def search(self, query)`](code/main.py#L438)
- [`def build_readonly_server()`](code/main.py#L449)
- [`def build_destructive_server()`](code/main.py#L491)
- [`def main()`](code/main.py#L518)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
