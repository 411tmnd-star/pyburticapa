# How it works: Structured Output Is an Untrusted Contract

## `code/main.py`

```text
Companion code for:
certifications/claude/lessons/09-structured-output-and-defensive-parsing/docs/en.md
It demonstrates schema-first parsing, validation, and bounded repair.
Concepts follow official Anthropic structured-output documentation.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class ValidationIssue`](code/main.py#L15)
- [`class ContractError`](code/main.py#L20)
- [`def parse_and_validate(raw, schema)`](code/main.py#L39): Accept exactly one JSON value, then validate the supported schema subset.
- [`def validate(value, schema, path)`](code/main.py#L51)
- [`class BoundedExtractor`](code/main.py#L98): Call a model-like function and request repair only within a fixed budget.
  - [`def extract(self, task)`](code/main.py#L108)
- [`def demo()`](code/main.py#L126)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
