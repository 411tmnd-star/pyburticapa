# W01 tasks for Claude Code

One task per session. Read WORKFLOW.md and PARTS.md first. Do not change the course or corpus; copy what you need.

1. **Read the parts.** Open each course path in PARTS.md and run its existing tests or demo. Note in this file what each part actually does.
2. **Build the join** described in WORKFLOW.md, in a new folder `W01-build/` here (or as an extension of the "ours" part, keeping its existing tests green).
3. **Write the pass test** from WORKFLOW.md as an automated test with fixtures only (no real people's names, emails or media).
4. **Run it** and paste the output under "Evidence" below.
5. **If it passes:** move the build to `python_skills/confirmed/evidence_judge`, set this row in `../REGISTRY.csv` to `confirmed` with the path and evidence, commit. **If not:** write what failed below and stop.

## Evidence

Done 2026-10-18.

1. **Parts read.** Course Report Judge (`projects/report-judge/solution/support.py`) checks a claim against its cited source in order: uncited, dangling id, negation mismatch, a number missing from the source, word order, then lexical overlap. CC-05 and L14-38 give the principle (the model does not mark its own work done). Not run as separate demos; the Report Judge idea was re-implemented for our `accepted.md` format and the course code left untouched.
2. **Built** `python_skills/confirmed/evidence_judge/judge.py` (+ README, `example/write-up.md`, `example/accepted.md`). `accepted.md` in the example has the same content as `verify.py --accepted` writes from the shipped renter claims (checked by a test that runs verify.py).
3. **Pass test** `tests/test_evidence_judge.py`, 14 tests, fixtures only.
4. **Tuning.** A 17-sentence calibration set (7 must pass, 10 must flag) is in the test file. Off-topic sentences score at most 0.29 overlap; paraphrases that should pass score 0.67 or more. Threshold set to 0.5 (0.6 left a good sentence exactly on the line). "nobody" and similar were added as negation words after "Roommates always know who paid" slipped through; the price is that the paraphrase "lose track of who paid" is now flagged against "nobody knows". Documented in the README as a known false flag.

```
$ python -I -X utf8 python_skills/confirmed/evidence_judge/judge.py python_skills/confirmed/evidence_judge/example/write-up.md python_skills/confirmed/evidence_judge/example/accepted.md
S1 ok   line 3 [c1] overlap 0.86: One renter says they would pay for something that tracks rent automatically
S2 FLAG line 4 -: Most renters would drop their spreadsheet for a free tool tomorrow
      -> uncited
S3 ok   line 5 [c2] overlap 0.67: The same thread says the landlord's reminder portal never gets opened
S4 ok   line 5 [c3] overlap 0.67: Spreadsheets turn into a mess every month
S5 FLAG line 6 [c5]: Everyone has abandoned spreadsheets for rent tracking
      -> cites a claim that is not accepted: c5
S6 ok   line 7 [c4] overlap 1.00: Two paid apps at $15 a month felt too expensive
note: accepted but never cited: c6
6 sentence(s): 4 supported, 2 flagged
exit=1
```

Full suite after this change: 64 tests OK.
