# How it works: A Tool Loop Is Controlled Delegation

## `code/main.py`

```text
Companion code for:
certifications/claude/lessons/10-tool-use-and-agentic-loops/docs/en.md
It models Claude tool_use and tool_result content-block sequencing.
Behavior follows official Anthropic client-tool and Messages documentation.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class ToolLoopError`](code/main.py#L15)
- [`class RuntimeNeeds`](code/main.py#L20): Facts that decide how much agent-loop infrastructure to adopt.
- [`def choose_runtime(needs)`](code/main.py#L31): Choose a workflow, hand-written loop, Tool Runner, or managed agent.
- [`class CapabilityNeeds`](code/main.py#L45): Separate executable capability from optional reusable procedure.
- [`def choose_capability_surface(needs)`](code/main.py#L54)
- [`def _matches_json_type(value, expected)`](code/main.py#L84)
- [`def _integer_bound(schema, name)`](code/main.py#L99)
- [`def _validate_schema_value(value, schema, location)`](code/main.py#L108)
- [`class Tool`](code/main.py#L181)
  - [`def validate(self, arguments)`](code/main.py#L188)
- [`class ToolRegistry`](code/main.py#L194)
  - [`def execute(self, block, approve)`](code/main.py#L201)
- [`class ScriptedModel`](code/main.py#L221)
  - [`def create(self, messages)`](code/main.py#L226)
- [`class ToolLoop`](code/main.py#L233)
  - [`def run(self, request)`](code/main.py#L246)
- [`def demo()`](code/main.py#L268)
- [`def decision_lab()`](code/main.py#L282): Return checked architecture decisions without importing an SDK.

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
