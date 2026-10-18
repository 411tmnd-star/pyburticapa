# Capstone 11 — LLM Observability & Eval Dashboard

Langfuse went open-core. Arize Phoenix published the 2026 GenAI semconv mappings. Helicone and Braintrust both doubled down on per-user cost attribution. Traceloop's OpenLLMetry became the de-facto SDK instrumentation. The production shape is ClickHouse for traces, Postgres for metadata, Next.js for UI, and a small army of eval jobs (DeepEval, RAGAS, LLM-judge) running over sampled traces. Build one self-hosted, ingest from at least four SDK families, and demonstrate catching an injected regression in under five minutes.

```
python main.py
```

Needs: standard library only

| File | Open it to… |
|---|---|
| [`main.py`](main.py) | read and run the code |
| [`ts/`](ts) | files the code uses |
| [`HOW_IT_WORKS.md`](HOW_IT_WORKS.md) | understand how the code is built |
| [`THEORY.md`](THEORY.md) | learn the idea behind it |
| [`LINKS.md`](LINKS.md) | quiz, diagrams, other languages, skill files, the original |
