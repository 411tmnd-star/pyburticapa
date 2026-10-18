# How it works: Checkpoints and Rollback

## `main.py`

```text
Checkpointed workflow with idempotency, precondition, verify, rollback.

Simulates four scenarios:
  1. clean run
  2. retry after commit-crash  -> idempotency prevents double-execute
  3. precondition fail         -> workflow aborts without firing
  4. verify fail               -> rollback fires
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def persist_transfer(txid, from_acct, to_acct, amount)`](main.py#L24)
- [`def rollback_transfer(txid, from_acct, to_acct, amount, prior_last_transfer_id)`](main.py#L30)
- [`class Checkpoint`](main.py#L41)
  - [`def load(self)`](main.py#L49)
  - [`def save(self, k, v)`](main.py#L53)
- [`def key(txid)`](main.py#L70)
- [`def run_transfer(cp, txid, from_acct, to_acct, amount, min_balance, inject_crash_after_execute, inject_verify_fail)`](main.py#L74)
- [`def main()`](main.py#L136)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
