# W20 tasks for Claude Code

One task per session. Read WORKFLOW.md and PARTS.md first. Do not change the course or corpus; copy what you need.

1. **Read the parts.** Open each course path in PARTS.md and run its existing tests or demo. Note in this file what each part actually does.
2. **Build the join** described in WORKFLOW.md, in a new folder `W20-build/` here (or as an extension of the "ours" part, keeping its existing tests green).
3. **Write the pass test** from WORKFLOW.md as an automated test with fixtures only (no real people's names, emails or media).
4. **Run it** and paste the output under "Evidence" below.
5. **If it passes:** move the build to `python_skills/confirmed/handoff_kit`, set this row in `../REGISTRY.csv` to `confirmed` with the path and evidence, commit. **If not:** write what failed below and stop.

## Evidence

Done 2026-10-18. Built `python_skills/confirmed/handoff_kit/init.py` (reporter only: environment, test run, first open workflow; writes nothing). The course's initialization-script lesson (L14-35) is a larger probe framework with lock files; only its probe idea was kept.

Pass test, run on a fresh `git clone` of commit 8e7ed0a9:

```
$ python -I -X utf8 python_skills/confirmed/handoff_kit/init.py
[environment] python ok 3.11.0 / ffmpeg ok / ffprobe ok / git ok / bpy missing / keys not set (values never printed)
[tests]       PASS 50 test(s) in 326.970s, OK (wall 328s)
[next]        first open: W01 (registry order) ... skipped W09, W10, W13 (blocked), W19 (parked)
== READY
exit=0
```

Exit 1 on failing tests, exit 2 on a bad --root, key values never printed: `tests/test_handoff_kit.py`, 7 tests OK.
