# How it works: Risk and Safety Controls for MCP Tool Calls

## `code/main.py`

```text
Companion code for:
certifications/mcpa/lessons/26-risk-and-safety-controls/docs/en.md
Risk and safety controls for the MCP 2026-07-28 tool-call boundary.
Sources: MCP Security Best Practices; MCP 2026-07-28 Authorization Security Considerations.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def make_request(request_id, method, params, capabilities, version)`](code/main.py#L34)
- [`def make_result(request_id, result_type)`](code/main.py#L45)
- [`def make_error(request_id, code, message, data)`](code/main.py#L49)
- [`def scan_for_injection(description)`](code/main.py#L56)
- [`def find_network_ref(node)`](code/main.py#L64)
- [`def describe(name, description, input_schema, annotations)`](code/main.py#L81)
- [`def canonical_hash(definition)`](code/main.py#L89)
- [`class Tool`](code/main.py#L95)
- [`class RegistrationResult`](code/main.py#L106)
- [`class ToolState`](code/main.py#L113)
- [`class RiskGateway`](code/main.py#L124)
  - [`def register(self, tool)`](code/main.py#L128)
  - [`def observe(self, name, description, input_schema, annotations)`](code/main.py#L143)
  - [`def approve(self, name)`](code/main.py#L154)
  - [`def call(self, request, inbound_token)`](code/main.py#L161)
- [`class Client`](code/main.py#L206)
  - [`def call_tool(self, name, arguments, inbound_token)`](code/main.py#L211)
- [`def build_gateway()`](code/main.py#L220)
- [`def run_scenario()`](code/main.py#L243)
- [`def transcript()`](code/main.py#L294)
- [`def demo()`](code/main.py#L299)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
