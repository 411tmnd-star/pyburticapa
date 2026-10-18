# Human-in-the-Loop: Propose-Then-Commit

The 2026 consensus on HITL is specific. It is not "the agent asks, the user clicks Approve." It is propose-then-commit: the proposed action is persisted to a durable store with an idempotency key; surfaced to a reviewer with intent, data lineage, permissions touched, blast radius, and a rollback plan; committed only after positive acknowledgement; verified after execution to confirm the side effect actually happened. LangGraph's `interrupt()` plus PostgreSQL checkpointing, Microsoft Agent Framework's `RequestInfoEvent`, and Cloudflare's `waitForApproval()` all implement the same shape. The canonical failure mode is the rubber-stamp approval: "Approve?" is clicked without review. The documented mitigation is challenge-and-response with an explicit checklist.

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
