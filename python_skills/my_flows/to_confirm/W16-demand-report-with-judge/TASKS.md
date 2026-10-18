# W16 tasks for Claude Code

One task per session. Read WORKFLOW.md and PARTS.md first. Do not change the course or corpus; copy what you need.

1. **Read the parts.** Open each course path in PARTS.md and run its existing tests or demo. Note in this file what each part actually does.
2. **Build the join** described in WORKFLOW.md, in a new folder `W16-build/` here (or as an extension of the "ours" part, keeping its existing tests green).
3. **Write the pass test** from WORKFLOW.md as an automated test with fixtures only (no real people's names, emails or media).
4. **Run it** and paste the output under "Evidence" below.
5. **If it passes:** move the build to `python_skills/confirmed/demand_report`, set this row in `../REGISTRY.csv` to `confirmed` with the path and evidence, commit. **If not:** write what failed below and stop.

## Evidence

Done 2026-10-18.

1. **Parts read.** Research Report Agent (`projects/research-report-agent`): write only from snippets with offsets, and a terminal state per run (`completed`, `needs_review`, `failed`). Document QA with Citations: a receipt that keeps exact support apart from relevance. Report Judge: already used through W01's `judge.py`. The Rust/TypeScript/replay-model machinery was not copied; the ideas kept are cited-only writing, a receipt per citation, and a state line.
2. **Built** `python_skills/confirmed/demand_report/report.py` (+ README, `example/`). It makes **no model call**: the model step is Claude's, outside the script. `--prompt-out` writes the instruction, Claude writes `draft.md`, and `--draft` sends it through `judge.py`; the report file exists only if every sentence passes. Without `--draft` each accepted claim becomes one cited sentence.
3. **Gap closed.** The `claims.jsonl` route had no way to produce `accepted.md`. `my_flows/research/demand_research/verify_quotes.py` now takes `--accepted accepted.md` (claims that pass the quote check and carry `review_status: accepted`), same format as `verify.py`. Plain usage is unchanged (the existing 2/4 test still passes).
4. **Pass test** `tests/test_demand_report.py`, 10 tests.

```
$ python -I -X utf8 python_skills/confirmed/demand_report/report.py python_skills/confirmed/demand_report/example/question.md python_skills/confirmed/demand_report/example/accepted.md --draft python_skills/confirmed/demand_report/example/draft.md --out report.md
report written to report.md: 2 sentence(s), all supported        (exit 0)
$ python -I -X utf8 python_skills/confirmed/evidence_judge/judge.py report.md python_skills/confirmed/demand_report/example/accepted.md
2 sentence(s): 2 supported, 0 flagged                              (exit 0)
$ python -I -X utf8 python_skills/confirmed/demand_report/report.py python_skills/confirmed/demand_report/example/question.md python_skills/confirmed/demand_report/example/accepted.md --draft python_skills/confirmed/demand_report/example/draft_bad.md --out report.md
S1 ok   line 1 [d1] overlap 0.90: One renter says they would honestly pay a small monthly fee for something that splits rent
S2 FLAG line 2 [d1] overlap 0.50: Most renters in the city would pay 20 pounds a month for it
      -> number not in the cited evidence: 20
S3 ok   line 3 [d2] overlap 0.71: The same thread says a shared spreadsheet is always out of date
3 sentence(s): 2 supported, 1 flagged
report not written: 1 sentence(s) flagged by judge.py              (exit 1, no file)
```

Full suite after this change: 74 tests OK.
