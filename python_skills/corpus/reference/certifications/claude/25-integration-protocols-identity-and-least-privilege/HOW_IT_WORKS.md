# How it works: Integration Protocols, Identity, and Least Privilege

## `code/main.py`

```text
Integration and least-privilege lab for this lesson's docs/en.md.

Models protocol selection, capability discovery, scope checks, and approvals.
Authorization is evaluated at execution time instead of delegated to a prompt.
Uses only the Python standard library so the control boundary is inspectable.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class IntegrationRequirements`](code/main.py#L15)
- [`def select_protocol(requirements)`](code/main.py#L23)
- [`class Principal`](code/main.py#L43)
- [`class ToolContract`](code/main.py#L50)
- [`class AuthorizationDecision`](code/main.py#L59)
- [`def authorize(principal, tool)`](code/main.py#L64)
- [`def discover_tools(principal, tools)`](code/main.py#L73)
- [`def execute_tool(principal, tool, arguments)`](code/main.py#L77)
- [`def demo()`](code/main.py#L92)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
