# How it works: Function Call Dispatcher

## `main.py`

```text
Function call dispatcher with timeout, retry, idempotency, concurrency limit.

Conceptual references:
- ./docs/en.md (this lesson)
- JSON-RPC 2.0 specification (error envelope shape)
- IETF draft draft-bhutton-json-schema-2020-12 (schema subset reused)

Stdlib only. Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class TransientError`](main.py#L28): Raised by a handler to indicate the failure is worth retrying.
- [`class _DispatchedError`](main.py#L32): Internal sentinel that wraps a DispatchError so dedup followers preserve kind.
- [`class DispatchError`](main.py#L41)
  - [`def to_envelope(self)`](main.py#L50)
- [`class DispatchOk`](main.py#L59)
- [`class _ToolRecord`](main.py#L65)
- [`class MiniRegistry`](main.py#L73): A trimmed registry: name, schema, handler, idempotent, timeout.
  - [`def register(self, name, schema, handler)`](main.py#L79)
  - [`def get(self, name)`](main.py#L88)
  - [`def validate(self, name, args)`](main.py#L93)
- [`def _walk(schema, value, path, errs)`](main.py#L100)
- [`class _InFlight`](main.py#L124)
- [`class Dispatcher`](main.py#L129): Per-call timeout, retry, idempotency, concurrency limit.
  - [`def dispatch(self, name, args)`](main.py#L151)
  - [`def _run_with_retries(self, rec, args, timeout_override, idempotency_key)`](main.py#L196)
  - [`def gather_bounded(self, calls)`](main.py#L259)
- [`def _invoke(handler, args)`](main.py#L263)
- [`def _backoff(attempt)`](main.py#L272)
- [`def _map_exception(exc, attempts)`](main.py#L277)
- [`def _demo()`](main.py#L293)

## Run and test

From this folder:

```
python main.py
python -m unittest discover -s tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
