# How it works: OpenAI Agents SDK: Handoffs, Guardrails, Tracing

## `main.py`

```text
OpenAI Agents SDK-shaped runtime in stdlib.

Five primitives: Agent, FunctionTool, Handoff, Guardrail, Tracing.
Handoffs are tools named transfer_to_<agent>. Guardrails trip on input/output.
A span tree mirrors what the real SDK emits.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class GuardrailTripped`](main.py#L14)
- [`class FunctionTool`](main.py#L22)
- [`class Handoff`](main.py#L29)
  - [`def tool_name(self)`](main.py#L33)
- [`class Agent`](main.py#L38)
- [`class InputGuardrail`](main.py#L47)
- [`class OutputGuardrail`](main.py#L53)
- [`class Span`](main.py#L59)
- [`class Runner`](main.py#L66)
  - [`def run(self, agent, user_input)`](main.py#L72)
- [`def _print_span(span, indent)`](main.py#L149)
- [`def _triage_policy(user_input)`](main.py#L157)
- [`def _billing_policy(user_input)`](main.py#L166)
- [`def _support_policy(user_input)`](main.py#L170)
- [`def _pii_check(text)`](main.py#L174)
- [`def _length_check(text)`](main.py#L180)
- [`def main()`](main.py#L184)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
