# How it works: AI Gateways — LiteLLM, Portkey, Kong AI Gateway, Bifrost

## `main.py`

```text
AI gateway routing + fallback simulator — stdlib Python.

Models a gateway fronting OpenAI, Anthropic, and self-hosted. Injects 429/5xx
errors per provider. Compares fallback strategies.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Provider`](main.py#L14)
- [`def call_provider(p, rng)`](main.py#L35)
- [`def simulate_fallback(gateway, n, seed)`](main.py#L41)
- [`def report(row)`](main.py#L73)
- [`def main()`](main.py#L79)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
