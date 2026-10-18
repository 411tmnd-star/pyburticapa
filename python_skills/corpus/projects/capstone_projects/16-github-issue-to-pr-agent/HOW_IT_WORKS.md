# How it works: Capstone 16 — GitHub Issue-to-PR Autonomous Agent

## `main.py`

```text
GitHub issue-to-PR async cloud agent — dispatcher + budget + safety gates.

The hard architectural primitive is the dispatcher that enforces per-repo
budgets, scoped GitHub App credentials, and a sandbox lifecycle that never
lets the agent force-push or escape the repo scope. This scaffold implements
the dispatcher, budget ledger, sandbox state machine, and verification gates.

Run:  python main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Task`](main.py#L25)
- [`class BudgetLedger`](main.py#L38)
  - [`def permit(self, repo, estimated_cost)`](main.py#L45)
  - [`def record(self, repo, spent, opened_pr)`](main.py#L60)
- [`class InstallationToken`](main.py#L71)
  - [`def mint(cls, repo)`](main.py#L77)
  - [`def can(self, action)`](main.py#L83)
- [`class SState`](main.py#L96)
- [`class SandboxRun`](main.py#L107)
- [`def run_agent(run, difficulty, rng, turn_cap, dollar_cap, minute_cap)`](main.py#L124)
- [`def run_verify(run, difficulty, rng)`](main.py#L156)
- [`def open_pr(run, token)`](main.py#L172)
- [`def dispatch(task, ledger, rng)`](main.py#L191)
- [`def main()`](main.py#L219)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
