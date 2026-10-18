# How it works: Tool Use and Function Calling

## `main.py`

```text
Stdlib tool registry with JSON Schema subset validation and parallel dispatch.

Subset: required fields, string/int/number/bool/array/object, enum, minimum/maximum.
Returns structured observations for every validation failure so an agent can retry.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class ToolDef`](main.py#L14)
- [`class ToolCall`](main.py#L23)
- [`class ToolResult`](main.py#L30)
- [`def _coerce(value, schema)`](main.py#L36)
- [`def validate(args, schema)`](main.py#L75)
- [`class ToolRegistry`](main.py#L109)
  - [`def register(self, tool)`](main.py#L113)
  - [`def catalog(self)`](main.py#L116)
  - [`def dispatch(self, call)`](main.py#L123)
  - [`def dispatch_many(self, calls)`](main.py#L138)
- [`def add(a, b)`](main.py#L142)
- [`def multiply(a, b)`](main.py#L146)
- [`def classify(status)`](main.py#L150)
- [`def main()`](main.py#L154)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
