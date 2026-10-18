# How it works: Tool Schema Design — Naming, Descriptions, Parameter Constraints

## `main.py`

```text
Phase 13 Lesson 05 - tool schema design linter.

Audits a tool registry against design rules from the lesson:
  - names: snake_case, verb-noun, no arguments, no tense markers
  - descriptions: Use-when pattern, length bounds, no injection keywords
  - schemas: typed properties, required list, enum on closed sets
  - shape: atomic vs monolithic (flag `action: str` if enum size > 3)

Run on GOOD_REGISTRY (passes) and BAD_REGISTRY (fails on every rule).
Stdlib only.

Run: python code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Finding`](main.py#L32)
- [`def lint_name(name)`](main.py#L41)
- [`def lint_description(desc, tool_name)`](main.py#L54)
- [`def lint_schema(schema, tool_name)`](main.py#L72)
- [`def lint_tool(tool)`](main.py#L96)
- [`def lint_registry(registry)`](main.py#L105)
- [`def report(name, registry)`](main.py#L200)
- [`def main()`](main.py#L218)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
