# Checkpoints and Rollback

Every graph-state transition persists. When a worker crashes, its lease expires and another worker picks up at the latest checkpoint. Cloudflare Durable Objects hold state across hours or weeks. Propose-then-commit (Lesson 15) defines a rollback plan per action. Post-action verification closes the loop. EU AI Act Article 14 makes effective human oversight mandatory for high-risk systems — in practice this means checkpoints must be queryable, rollbacks must be rehearsed, and the audit trail must survive a deploy. The sharp failure mode: without idempotency keys and precondition checks, a retry after a transient failure can double-execute an already-approved action. Post-action verification is what catches it.

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
