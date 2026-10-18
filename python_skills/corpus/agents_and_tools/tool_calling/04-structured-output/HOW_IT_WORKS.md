# How it works: Structured Output — JSON Schema, Pydantic, Zod, Constrained Decoding

## `main.py`

```text
Phase 13 Lesson 04 - structured output, JSON Schema 2020-12 subset.

Stdlib JSON Schema validator supporting type, required, enum, minimum,
maximum, minLength, maxLength, pattern, items, and additionalProperties.
Wrapped around an Invoice schema to show the three failure modes:

  - parse error (invalid JSON; impossible in strict mode)
  - schema violation (parsed but wrong)
  - refusal (model declined; handled as typed outcome)

Run: python code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class ValidationError`](main.py#L52)
- [`def validate(schema, value, path)`](main.py#L60)
- [`class ParsedResult`](main.py#L119)
- [`def process_model_output(raw, schema)`](main.py#L125): Three-branch handler: parse error, refusal, success/violation.
- [`def main()`](main.py#L176)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
