# How it works: Explicit Scope and Stateless Elicitation

## `code/main.py`

```text
Phase 13 Lesson 12: explicit scope and elicitation through MRTR.

Lesson: ../docs/en.md
Specification: https://modelcontextprotocol.io/specification/2026-07-28/basic/patterns/mrtr
This example uses only Python's standard library.
Run: python3 main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class McpError`](code/main.py#L72)
- [`class ReplayStore`](code/main.py#L78)
  - [`def claim_and_consume(self, nonce)`](code/main.py#L92)
- [`def request_meta()`](code/main.py#L117)
- [`def _server_meta()`](code/main.py#L128)
- [`def complete()`](code/main.py#L132)
- [`def validate_request_meta(params)`](code/main.py#L136)
- [`def supports_form_elicitation(capabilities)`](code/main.py#L155)
- [`def _normalized_uri_parts(uri)`](code/main.py#L164)
- [`def uri_within_workspace(workspace_uri, candidate_uri)`](code/main.py#L174)
- [`def _b64(data)`](code/main.py#L189)
- [`def _unb64(value)`](code/main.py#L193)
- [`def _arguments_digest(arguments)`](code/main.py#L197)
- [`def seal_request_state(payload)`](code/main.py#L202)
- [`def verify_request_state(token)`](code/main.py#L208)
- [`class NotesServer`](code/main.py#L242)
  - [`def server_discover(self, params)`](code/main.py#L253)
  - [`def tools_list(self, params)`](code/main.py#L262)
  - [`def _require_authorized_workspace(self, workspace_uri)`](code/main.py#L270)
  - [`def _elicitation_result(self)`](code/main.py#L277)
  - [`def _delete_note_once(self)`](code/main.py#L317)
  - [`def tools_call(self, params)`](code/main.py#L339)
  - [`def dispatch(self, request)`](code/main.py#L440)
- [`def tool_request(request_id, title)`](code/main.py#L473)
- [`def run_mrtr()`](code/main.py#L489)
- [`def main()`](code/main.py#L508)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
