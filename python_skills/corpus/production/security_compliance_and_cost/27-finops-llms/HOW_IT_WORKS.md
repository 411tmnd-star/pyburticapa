# How it works: FinOps for LLMs — Unit Economics and Multi-Tenant Attribution

## `main.py`

```text
Multi-tenant LLM FinOps simulator with enforcement ladder — stdlib Python.

Three-tier enforcement:
  1. rate limit per tenant
  2. daily spend cap per tenant
  3. kill switch on spend z-score > 4
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class TenantPolicy`](main.py#L17)
- [`class TenantState`](main.py#L25)
- [`def simulate_day(day, verbose)`](main.py#L39)
- [`def main()`](main.py#L63)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
