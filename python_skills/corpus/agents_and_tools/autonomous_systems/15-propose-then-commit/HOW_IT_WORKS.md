# How it works: Human-in-the-Loop: Propose-Then-Commit

## `main.py`

```text
Propose-then-commit HITL state machine — stdlib Python.

Four phases:
  1. propose:  agent persists the proposed action with idempotency key
  2. surface:  reviewer sees metadata (intent, lineage, blast, rollback)
  3. commit:   positive ack required; idempotent
  4. verify:   re-read target resource after commit

Three demos:
  - clean approval flow
  - retry after transient failure -> idempotency catches
  - rubber-stamp UI vs challenge-and-response checklist
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Proposal`](main.py#L25)
  - [`def key(self)`](main.py#L34)
- [`class Store`](main.py#L41)
  - [`def all(self)`](main.py#L49)
  - [`def save(self, key, record)`](main.py#L53)
- [`def execute(proposal)`](main.py#L65)
- [`def verify(proposal)`](main.py#L70)
- [`def propose(store, p)`](main.py#L78)
- [`def surface(store, k)`](main.py#L91)
- [`def rubber_stamp_approve(store, k)`](main.py#L100)
- [`def checklist_approve(store, k, understood, verified, rollback_ready)`](main.py#L110)
- [`def commit(store, k)`](main.py#L125)
- [`def main()`](main.py#L149)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
