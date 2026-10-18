# How it works: Building an MCP Server: Stateless Python and TypeScript

## `code/main.py`

```text
Phase 13 Lesson 07: a stateless MCP server over stdio.
Lesson: phases/13-tools-and-protocols/07-building-an-mcp-server/docs/en.md
Specification: https://modelcontextprotocol.io/specification/2026-07-28/
Implements discovery, three server primitives, and per-request validation.
Run: python3 main.py --demo
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class RpcProblem`](code/main.py#L90)
- [`def reset_notes()`](code/main.py#L97)
- [`def request_meta(version, capabilities)`](code/main.py#L102)
- [`def make_request(request_id, method, params)`](code/main.py#L113)
- [`def rpc_error(request_id, code, message, data)`](code/main.py#L125)
- [`def complete(payload)`](code/main.py#L137)
- [`def validate_request(message)`](code/main.py#L154)
- [`def exec_notes_list(arguments)`](code/main.py#L185)
- [`def exec_notes_search(arguments)`](code/main.py#L195)
- [`def exec_notes_create(arguments)`](code/main.py#L211)
- [`def handle_discover(params)`](code/main.py#L234)
- [`def handle_tools_list(params)`](code/main.py#L246)
- [`def handle_tools_call(params)`](code/main.py#L254)
- [`def handle_resources_list(params)`](code/main.py#L272)
- [`def handle_resources_read(params)`](code/main.py#L280)
- [`def handle_prompts_list(params)`](code/main.py#L296)
- [`def handle_prompts_get(params)`](code/main.py#L304)
- [`def dispatch(message)`](code/main.py#L341)
- [`def serve_stdio()`](code/main.py#L359)
- [`def demo()`](code/main.py#L379)
- [`def main()`](code/main.py#L401)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
