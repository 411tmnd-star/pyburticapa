# How it works: Tool Registry with Schema Validation

## `main.py`

```text
Tool registry with JSON Schema 2020-12 subset validation.

Conceptual references:
- ./docs/en.md (this lesson)
- IETF draft draft-bhutton-json-schema-2020-12 (subset: type, properties,
  required, enum, minLength, maxLength, pattern, items)
- RFC 6901 (JSON Pointer for error paths)

Stdlib only. Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class ValidationError`](main.py#L37)
  - [`def to_dict(self)`](main.py#L42)
- [`class Ok`](main.py#L47)
- [`class ToolRecord`](main.py#L52)
- [`class ToolRegistry`](main.py#L61): Name-keyed table of tool records with schema validation.
  - [`def register(self, name, schema, handler, description, idempotent, timeout_ms, override)`](main.py#L70)
  - [`def get(self, name)`](main.py#L94)
  - [`def names(self)`](main.py#L99)
  - [`def validate(self, name, args)`](main.py#L102)
- [`def validate_schema_shape(schema)`](main.py#L111): Reject schemas using keywords outside the supported subset.
- [`def _path(prefix, segment)`](main.py#L154)
- [`def _type_matches(value, expected)`](main.py#L159)
- [`def _walk(schema, value, path, errs)`](main.py#L170)
- [`def _check_string(schema, value, path, errs)`](main.py#L195)
- [`def _check_object(schema, value, path, errs)`](main.py#L220)
- [`def _check_array(schema, value, path, errs)`](main.py#L235)
- [`def _demo()`](main.py#L243)

## Run and test

From this folder:

```
python main.py
python -m unittest discover -s tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
