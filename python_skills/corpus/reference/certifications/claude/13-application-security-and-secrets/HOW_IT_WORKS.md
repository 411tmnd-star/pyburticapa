# How it works: Security Lives Outside the Prompt

## `code/main.py`

```text
Companion code for:
certifications/claude/lessons/13-application-security-and-secrets/docs/en.md
It separates untrusted model intent from deterministic authorization.
Controls follow official Anthropic safety guidance and OWASP LLM concepts.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Action`](code/main.py#L23)
- [`class Decision`](code/main.py#L31)
- [`class PolicyGate`](code/main.py#L37): Evaluate high-risk capabilities before a tool handler sees them.
  - [`def evaluate(self, action)`](code/main.py#L44)
  - [`def _read_file(self, action)`](code/main.py#L61)
  - [`def _run_command(self, action)`](code/main.py#L74)
  - [`def _http_get(self, action)`](code/main.py#L87)
- [`def redact(value)`](code/main.py#L97): Remove common secret assignments before a string reaches logs.
- [`class EnvironmentSecrets`](code/main.py#L102): Return secret values to trusted code without logging or serialization helpers.
  - [`def require(self, name)`](code/main.py#L105)
- [`def demo()`](code/main.py#L114)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
