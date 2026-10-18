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

## 2026-10-18 · W01 evidence judge

- **Built:** `python_skills/confirmed/evidence_judge/judge.py` with README and a worked example (`write-up.md`, `accepted.md`); `tests/test_evidence_judge.py` (14 tests). `verify.py`'s README step 8 now points to it.
- **Pass:** the example gives `6 sentence(s): 4 supported, 2 flagged`, exit 1; the two flags are the uncited sentence (S2) and the one citing the rejected c5 (S5). Full suite 64 OK.
- **Decisions:** evidence for a sentence is the cited claims' text plus their quotes (a paraphrase of the claim is allowed); several citations pool their evidence; overlap threshold 0.5, picked from a 17-sentence calibration set rather than guessed; exposed `judge.judge()` and `judge.parse_accepted()` so W16 can import it.
- **Surprises:** the first run flagged exactly the two planted faults, but one good sentence scored exactly at the 0.6 threshold, so the example was passing by luck; hence the calibration set. Adding "nobody" as a negation word caught "Roommates always know who paid" but also flags the honest paraphrase "lose track of who paid"; kept the strict direction and listed it as a known false flag. `verify.py`'s shipped example has no `status:` lines, so `--accepted` writes zero claims from it; the judge example carries its own `accepted.md`, and a test proves it matches what `verify.py` writes once statuses are set.

## 2026-10-18 · W16 demand report with judge

- **Built:** `python_skills/confirmed/demand_report/report.py` with README and `example/` (question, accepted, good draft, draft with one planted sentence); `tests/test_demand_report.py` (10 tests). `verify_quotes.py` gained `--accepted`.
- **Pass:** the example report is written and `judge.py` also passes on the finished report; the planted sentence ("Most renters in the city would pay 20 pounds a month") is caught by the number check, exit 1, no file. Full suite 74 OK.
- **Decisions:** no API call anywhere. The course agent's "live model optional" became `--prompt-out` (the instruction for Claude) plus `--draft` (Claude's answer goes through the gate), which keeps the $20 budget untouched and the model step visible. A report with no draft is mechanical: one cited sentence per accepted claim. Receipts and counts are in fenced blocks so `judge.py` can be run on the finished report. Small samples carry a caution (below 3 claims or 2 distinct URLs), because the demand loop's "one story, many copies" trap is real: the example is 2 claims from 1 URL and says so.
- **Surprises:** the demand example had no route from `claims.jsonl` to `accepted.md` (only `verify.py` could write one), so W16 as specified could not start from the demand loop's own output; fixed by adding `--accepted` to `verify_quotes.py`. The planted sentence's word overlap was exactly 0.50, so only the number check caught it; worth knowing when writing future fixtures. Two of my own shell edits were mangled by escape handling (a `\n` became a real newline); I now write multi-line edits to script files.

