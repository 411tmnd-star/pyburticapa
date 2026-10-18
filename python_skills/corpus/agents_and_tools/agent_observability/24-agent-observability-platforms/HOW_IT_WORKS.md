# How it works: Agent Observability: Langfuse, Phoenix, Opik

## `main.py`

```text
Stdlib trace collector + LLM-judge evaluator.

Mirrors what Langfuse / Phoenix / Opik do with richer UIs: ingest spans,
group by session, score with an LLM judge, surface failure categories.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class SpanEvent`](main.py#L15)
- [`class SessionSummary`](main.py#L24)
- [`class TraceCollector`](main.py#L32)
  - [`def ingest(self, span)`](main.py#L36)
  - [`def by_session(self)`](main.py#L39)
- [`def scripted_llm_judge(session_spans)`](main.py#L46)
- [`def categorize_failures(session_spans)`](main.py#L71)
- [`def summarize(collector)`](main.py#L81)
- [`def main()`](main.py#L96)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
