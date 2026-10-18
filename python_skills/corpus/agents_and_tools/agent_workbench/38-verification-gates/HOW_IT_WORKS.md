# How it works: Verification Gates

## `main.py`

```text
Deterministic verification gate with coverage floor, --strict mode, and signed overrides.

Combines a task's scope_report, rule_report, feedback log, and an optional
coverage_report into a single verification_report.json. No LLM judges; LLM
judgment lives on the reviewer side (Phase 14 · 39). Overrides require a signed
entry in overrides.jsonl with reason, user, and HEAD commit.

Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def _load_override_secret()`](main.py#L36)
- [`class Finding`](main.py#L54)
- [`class Artifacts`](main.py#L61)
- [`class VerdictReport`](main.py#L72)
- [`def _acceptance_findings(art)`](main.py#L81)
- [`def _scope_findings(art)`](main.py#L99)
- [`def _rule_findings(art)`](main.py#L110)
- [`def _coverage_findings(art, floor)`](main.py#L115): Anthropic Hybrid Norm: pair verifiable rewards (tests + coverage) with rubric judging.
- [`def verify(art, strict, coverage_floor)`](main.py#L143)
- [`def _sign(payload)`](main.py#L169)
- [`def record_override(task_id, finding_code, reason, user_id, head_commit)`](main.py#L174): Append a signed override entry. Refuses without all five fields populated.
- [`def verify_signature(entry)`](main.py#L194)
- [`def main()`](main.py#L200)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
