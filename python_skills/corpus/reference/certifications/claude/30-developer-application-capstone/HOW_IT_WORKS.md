# How it works: Ship a Claude Application You Can Defend

## `code/main.py`

```text
Companion code for:
certifications/claude/lessons/30-developer-application-capstone/docs/en.md
It combines validation, policy, tools, tracing, and deterministic evaluation.
Protocol ideas follow official Anthropic Messages and evaluation guidance.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class MessagesTransport`](code/main.py#L27): Small dependency-injection boundary for a Messages API call.
  - [`def create_message(self, payload)`](code/main.py#L30)
- [`class AnthropicMessagesHTTPTransport`](code/main.py#L33): Opt-in stdlib HTTP transport that never logs or persists its API key.
  - [`def create_message(self, payload)`](code/main.py#L50)
- [`def build_live_order_request(request, model)`](code/main.py#L72): Build an inspectable wire payload with the same bounded lookup contract.
- [`def run_live_wire(transport, request, model)`](code/main.py#L97): Exercise the real serialization boundary and return only safe metadata.
- [`class TraceEvent`](code/main.py#L114)
- [`class SupportResult`](code/main.py#L120)
  - [`def contract(self)`](code/main.py#L127)
- [`class LeastPrivilegeGate`](code/main.py#L136)
  - [`def allow(self, tool, arguments, approved)`](code/main.py#L137)
- [`class ToolRegistry`](code/main.py#L145)
  - [`def call(self, tool, arguments)`](code/main.py#L149)
- [`class SupportAgent`](code/main.py#L158)
  - [`def run(self, request)`](code/main.py#L163)
- [`def validate_contract(value)`](code/main.py#L203)
- [`def load_eval_plan(path)`](code/main.py#L217)
- [`def _default_agent_factory(fixture)`](code/main.py#L228)
- [`def _trace_tools(trace)`](code/main.py#L232)
- [`def _trace_effects(trace)`](code/main.py#L240)
- [`def evaluate(plan, agent_factory)`](code/main.py#L249)
- [`def demo()`](code/main.py#L337)
- [`def main()`](code/main.py#L347)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
