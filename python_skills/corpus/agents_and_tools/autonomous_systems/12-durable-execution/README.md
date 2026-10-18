# Long-Running Background Agents: Durable Execution

Production long-horizon agents do not run in `while True`. Every LLM call becomes an activity with checkpoint, retry, and replay. Temporal's OpenAI Agents SDK integration went GA March 2026. Claude Code Routines (Anthropic) runs scheduled Claude Code invocations without a persistent local process. Sessions pause on human-input, survive deploys, and resume from the latest checkpoint keyed by `thread_id`. Behind the new ergonomics sits an old pattern — workflow orchestration — with one new input: LLM calls as non-deterministic activities that must be deterministically replayed on recovery.

```
python main.py
```

Needs: standard library only

| File | Open it to… |
|---|---|
| [`main.py`](main.py) | read and run the code |
| [`HOW_IT_WORKS.md`](HOW_IT_WORKS.md) | understand how the code is built |
| [`THEORY.md`](THEORY.md) | learn the idea behind it |
| [`LINKS.md`](LINKS.md) | quiz, diagrams, other languages, skill files, the original |
