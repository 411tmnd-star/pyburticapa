# How it works: EchoLeak and the Emergence of CVEs for AI

## `main.py`

```text
EchoLeak attack trace reconstruction — stdlib Python.

Illustrates the three-boundary LLM Scope Violation model: retrieval, scope,
output. Attacker email enters via retrieval; instruction triggers scope
access; exfiltration crosses output boundary via a CSP-approved URL.

Defense: scope separation -- tool calls derived from untrusted content are
blocked before they access privileged scope.

Usage: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class State`](main.py#L19)
- [`def retrieve(user_prompt)`](main.py#L42): RAG step: returns recent emails including the attacker email.
- [`def naive_copilot(state)`](main.py#L47)
- [`def scope_separated_copilot(state)`](main.py#L65): Defense: block tool calls whose trigger is untrusted-retrieved content.
- [`def trace(label, state)`](main.py#L78)
- [`def main()`](main.py#L86)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
