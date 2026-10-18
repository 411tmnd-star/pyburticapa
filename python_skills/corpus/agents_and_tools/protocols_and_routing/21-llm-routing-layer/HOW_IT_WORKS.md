# How it works: LLM Routing Layer — LiteLLM, OpenRouter, Portkey

## `main.py`

```text
Phase 13 Lesson 21 - LLM routing gateway, stdlib.

OpenAI-compatible request in; priority fallback chain picks a backend; cost
tracker accumulates spend per-request. PII redaction runs pre-dispatch.

Backend providers are stubs. Switching one to "outage" shows fallback.

Run: python code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def provider_call(model, messages)`](main.py#L32)
- [`def redact_pii(text)`](main.py#L60)
- [`class Invocation`](main.py#L70)
- [`def route(alias, messages)`](main.py#L82)
- [`def demo()`](main.py#L111)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
