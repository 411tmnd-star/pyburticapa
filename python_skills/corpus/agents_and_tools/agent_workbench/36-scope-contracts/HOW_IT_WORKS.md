# How it works: Scope Contracts and Task Boundaries

## `main.py`

```text
Scope contract checker with violation budgets, severity, and multi-contract merge.

Loads a per-task scope_contract.json and a RunSummary (touched files, commands,
elapsed minutes), produces a typed Finding list with severity tags, applies a
violation budget the runtime can survive without halting, and supports merging
multiple contracts (project-wide + task-specific) into a single effective one.

Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class ScopeContract`](main.py#L23)
- [`class RunSummary`](main.py#L38)
- [`class Finding`](main.py#L46)
- [`class ScopeReport`](main.py#L53)
  - [`def passed(self)`](main.py#L63)
- [`def matches_any(path, patterns)`](main.py#L67)
- [`def merge_contracts(parent, child)`](main.py#L71): Least-privilege merge: intersect allowed, union forbidden, narrowest budgets.
- [`def _merge_egress(a, b)`](main.py#L96)
- [`def _min_optional(a, b)`](main.py#L106)
- [`def scope_check(contract, run)`](main.py#L114)
- [`def archive(report)`](main.py#L163)
- [`def main()`](main.py#L175)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
