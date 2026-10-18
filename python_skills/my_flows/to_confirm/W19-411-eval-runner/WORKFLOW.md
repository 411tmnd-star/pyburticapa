# W19 · 411 eval runner

**Type** C: course + course · **Goals** research and 411 · **Status** to confirm

Run the 411 10-task eval set reproducibly against Claude: recorded responses, explicit checks, a comparison between runs, and a regression gate.

## How the parts connect

1. the 10 tasks as fixtures with explicit pass checks: [EVAL_TASKS.md](EVAL_TASKS.md)
2. Local Model Evaluation Harness's recording and comparison format, pointed at the Claude API instead of a local model
3. CC-14: trace, eval, regression gate
4. Prompt Regression Tester compares two prompt or model versions on the same recordings

## Run (target)

```bash
python eval_411.py tasks/ --record runs/ && python eval_411.py --compare runs/a runs/b
```

## Pass

A recorded run replays offline with the same scores; the compare step names each task that got worse.

When it passes on the laptop, it moves to `python_skills/confirmed/eval_411` and its row in `../REGISTRY.csv` becomes `confirmed` with the evidence.

Parts: [PARTS.md](PARTS.md) · Tasks for Claude Code: [TASKS.md](TASKS.md)
