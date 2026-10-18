# How it works: MCP Tool Discovery Workbench

## `cli.py`

```text
Serve a scoped MCP inventory or print a context-budgeted tool selection.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def configured_catalog(inventory)`](cli.py#L28)
- [`def main()`](cli.py#L43)

## `audit.py`

```text
Audit catalog coverage through protocol pages.

Lesson: projects/mcp-at-scale/stages/04-audit/docs/en.md
The implementation is original and uses explicit local data contracts.
Run its tests through scripts/project_test.py.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def audit_catalog(inventory)`](audit.py#L11)

## `demo.py`

Functions and classes, in file order (click to jump to the line):

- no functions or classes (a plain script)

## `discovery.py`

```text
Select tools under an explicit context budget.

Lesson: projects/mcp-at-scale/stages/02-discovery/docs/en.md
The implementation is original and uses explicit local data contracts.
Run its tests through scripts/project_test.py.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def discover(tools, query, max_chars, k)`](discovery.py#L12)

## `protocol.py`

```text
Implement initialized JSON-RPC over stdio.

Lesson: projects/mcp-at-scale/stages/03-protocol/docs/en.md
The implementation is original and uses explicit local data contracts.
Run its tests through scripts/project_test.py.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def handle(request, state, inventory)`](protocol.py#L15)
- [`def serve(lines, output, inventory, tools)`](protocol.py#L113)

## `registry.py`

```text
Build a catalog of 250 read-only tools.

Lesson: projects/mcp-at-scale/stages/01-registry/docs/en.md
The implementation is original and uses explicit local data contracts.
Run its tests through scripts/project_test.py.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def catalog()`](registry.py#L14)
- [`def execute(tool, arguments, inventory)`](registry.py#L42)

## `rest_adapter.py`

```text
Import a narrow OpenAPI GET surface; preserve schema provenance and explicit recordings.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class NoRedirect`](rest_adapter.py#L10)
  - [`def redirect_request(self, req, fp, code, msg, headers, newurl)`](rest_adapter.py#L11)
- [`def import_openapi(spec)`](rest_adapter.py#L15)
- [`def execute_rest(tool, arguments, recordings, base_url)`](rest_adapter.py#L77)

## Run and test

From this folder:

```
python cli.py samples/inventory.json --query "pods count" --max-chars 500
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
