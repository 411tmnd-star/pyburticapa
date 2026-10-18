# Production Scaling — Queues, Checkpoints, Durability

Scaling multi-agent systems to thousands of concurrent runs requires **durable execution** — work queues plus checkpoints, so any worker can resume any run after any crash, provided lease handling, idempotent side effects, and deterministic replay are in place. LangGraph's runtime is the reference example: it writes a checkpoint after each super-step keyed by `thread_id` (Postgres by default); worker crashes release a lease and another worker resumes. Agents can sleep indefinitely waiting for human input. **MegaAgent** (arXiv:2408.09955) ran a per-agent producer-consumer queue with three states (Idle / Processing / Response) and two-layer coordination (intra-group chat + inter-group admin chat). **Fiber/async** beats thread-per-job for LLM streaming: threads sit idle 99% of the time waiting for tokens, fibers cooperatively yield on I/O. Counterpoint: Ashpreet Bedi's "Scaling Agentic Software" argues for **FastAPI + Postgres + nothing else** until load proves otherwise — simple architectures go further than expected. This lesson builds a durable checkpoint log, a per-agent work queue with state transitions, an async-vs-thread demo, and lands the pragmatic "start simple" rule.

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
