# How it works: OpenTelemetry GenAI — Tracing Tool Calls End-to-End

## `main.py`

```text
Phase 13 Lesson 20 - OTel GenAI span emitter, stdlib only.

Emits spans in an OTLP-JSON-like format to stdout for an agent that:
  - invokes an LLM chat (gen_ai.operation.name = "chat")
  - dispatches two tools (gen_ai.operation.name = "execute_tool")
  - makes one MCP client call (CLIENT span with traceparent propagation)

Content capture (gen_ai.content.prompt / completion) is off by default;
enable by setting OTEL_CAPTURE_CONTENT=1 before running.

Run: python code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def _hex(n_bytes)`](main.py#L28)
- [`class Span`](main.py#L33)
  - [`def finish(self)`](main.py#L44)
  - [`def add_event(self, name, attrs)`](main.py#L47)
  - [`def to_otlp(self)`](main.py#L50)
- [`def start_span(name, kind, parent, attrs)`](main.py#L67)
- [`def fake_llm_call(span, prompt)`](main.py#L77)
- [`def fake_tool_execute(span, tool, args)`](main.py#L92)
- [`def fake_mcp_call(parent, tool)`](main.py#L101)
- [`def agent_loop()`](main.py#L116)
- [`def main()`](main.py#L150)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
