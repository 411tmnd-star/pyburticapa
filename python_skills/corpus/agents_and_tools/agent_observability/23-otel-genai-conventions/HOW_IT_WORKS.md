# How it works: OpenTelemetry GenAI Semantic Conventions

## `main.py`

```text
Stdlib span emitter matching OpenTelemetry GenAI semantic conventions.

Emits invoke_agent INTERNAL spans, per-tool spans, chat spans for LLM calls.
Content capture is opt-in: prompts go to an external store, spans carry IDs.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Span`](main.py#L15)
  - [`def duration_ms(self)`](main.py#L24)
- [`class ExternalContentStore`](main.py#L28)
  - [`def put(self, content)`](main.py#L33)
  - [`def get(self, cid)`](main.py#L39)
  - [`def items(self)`](main.py#L42)
- [`class Tracer`](main.py#L46)
  - [`def start_span(self, name, kind, attributes)`](main.py#L54)
  - [`def end_span(self)`](main.py#L62)
  - [`def add_content(self, span, key, content)`](main.py#L66)
- [`def _scripted_llm(prompt)`](main.py#L74)
- [`def _search_tool(query)`](main.py#L82)
- [`def main()`](main.py#L86)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
