# How it works: Security — Secrets, API Key Rotation, Audit Logs, Guardrails

## `main.py`

```text
PII scrubber with consistent tokenization + audit log — stdlib Python.

Masks SSNs, emails, phone numbers; maps each distinct value to a stable
placeholder so the LLM can still reason about relationships. Appends to an
immutable audit log on every call.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Scrubber`](main.py#L23)
  - [`def _token_for(self, kind, value)`](main.py#L27)
  - [`def scrub(self, text)`](main.py#L35)
- [`class AuditEntry`](main.py#L43)
- [`def hash_short(s)`](main.py#L56)
- [`def audit_log_call(entry)`](main.py#L60)
- [`def main()`](main.py#L75)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
