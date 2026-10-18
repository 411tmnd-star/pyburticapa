# W20 · Handoff kit

**Type** C: course + course · **Goals** all · **Status** confirmed 2026-10-18 (see ../REGISTRY.csv)

Make every chat-to-laptop handoff the same: a HANDOFF.md, task briefs, and an init script Claude Code runs first so it never starts cold.

## How the parts connect

1. CC-07: a workflow is done when the next person can verify, decide, act and recover
2. L14-34: state lives in versioned files (HANDOFF.md, REGISTRY.csv), not chat
3. L14-35: `init.py` checks Python, ffmpeg, keys present (not printed), runs the tests, prints the next task
4. the task-tier-loop chat skill writes the briefs

## Run (target)

```bash
python init.py
```

## Pass

On a fresh clone, init.py reports the environment, the test result and the first open W task, and exits 1 if tests fail.

When it passes on the laptop, it moves to `python_skills/confirmed/handoff_kit` and its row in `../REGISTRY.csv` becomes `confirmed` with the evidence.

Parts: [PARTS.md](PARTS.md) · Tasks for Claude Code: [TASKS.md](TASKS.md)
