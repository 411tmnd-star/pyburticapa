# Build log

Newest entry last. One entry per workflow: what was built, the pass command and result, what surprised me, and the decisions made. Written by Claude Code so the owner and the next chat session can read progress from GitHub.

## 2026-10-18 · housekeeping (commit 25e06204)

- Regenerated `to_confirm/CANDIDATES.csv` with `match.py` (379 rows: A 319, B 49, C 11).
- Fixed stale text: HANDOFF's 3.13 line (laptop has 3.11 and 3.14; `bpy` deferred), W02's `test_prompts.py` command (written by the workflow), W11/W14 commands now use `unittest`.
- REGISTRY.csv has a new `notes` column. W09, W10, W13 are `blocked: needs bpy/3.13`; W19 is `parked`. Port notes added to the PARTS.md of W02, W05, W07, W14.
- Decisions (owner, 2026-10-18): defer `bpy`/3.13; no pytest; port the TypeScript/Go course parts to Python; W19 parked, no API call.
- Tests: 43 OK.

## 2026-10-18 · W20 handoff kit

- **Built:** `python_skills/confirmed/handoff_kit/init.py` and README; `tests/test_handoff_kit.py` (7 tests).
- **Pass:** on a fresh clone of 8e7ed0a9, `python -I -X utf8 python_skills/confirmed/handoff_kit/init.py` printed the environment, `PASS 50 test(s)`, named W01 as first open, exit 0. Failing suite gives exit 1 (unit-tested on a throwaway repo).
- **Decisions:** kept it a reporter (writes nothing, no lock files or TTL from the course lesson). "First open" is registry order, skipping rows whose `notes` start with `blocked` or `parked`, so it names W01 now, not W16; the HANDOFF order is advice for the human. Key values are never printed. The unit test uses a fake repo so it does not re-run the whole suite from inside itself.
- **Surprises:** the full suite is slower than before on a cold clone (about 5.5 minutes versus 1.5 to 3 on a warm tree); `test_corpus.py` dominates. `git -version` is not a valid flag (git wants `--version`), caught by running it.
