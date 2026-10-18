# Handoff kit

`init.py` is the first command of every Claude Code session on this repo. It reports; it does not fix, install or write.

```bash
python -I -X utf8 python_skills/confirmed/handoff_kit/init.py
python -I -X utf8 python_skills/confirmed/handoff_kit/init.py --skip-tests   # environment and next task only
```

| Section | What it shows |
|---|---|
| environment | Python (needs 3.11+), ffmpeg, ffprobe, git, `bpy` (only W09, W10, W13 need it), whether `ANTHROPIC_API_KEY` and `YOUTUBE_API_KEY` are set (the value is never printed; add names with `--keys A,B`), branch, changed files, ahead/behind from local refs |
| tests | runs `python -I -X utf8 -m unittest discover -s tests` and prints the count, time and verdict; the last 15 lines when it fails |
| next | the first workflow in `my_flows/to_confirm/REGISTRY.csv`, in registry order, that is not `confirmed` and whose `notes` do not start with `blocked` or `parked`; its pass test and whether TASKS.md already holds evidence; the rows it skipped and why |

Exit code: 0 when the tests pass (or were skipped) and Python is new enough; 1 when the tests fail or Python is too old; 2 for a bad `--root`.

The full suite takes about 1.5 to 3 minutes, mostly `test_corpus.py`.

Test: [tests/test_handoff_kit.py](../../../tests/test_handoff_kit.py) builds a throwaway repo, so the real suite is not re-run from inside itself.

Joins course parts CC-07 (design the handoff), L14-34 (state in versioned files) and L14-35 (initialization scripts); the course probe framework was reduced to a reporter on purpose.
