# W16 · Demand report with judge

**Type** A: course + our workflow · **Goals** research and 411 · **Status** confirmed 2026-10-18 (see ../REGISTRY.csv)

From accepted claims to a demand report where every sentence can be checked: the course's Research Report Agent drafts from accepted rows only, Document QA's citation receipt and Report Judge check it.

## How the parts connect

1. demand loop steps 1-7 (as today) → accepted.md
2. Research Report Agent: question + accepted claims → report with a citation per sentence (Claude as the model)
3. Document QA's citation receipt separates exact support from mere relevance
4. Report Judge (and W01's judge.py) fails any unsupported sentence; you read the flagged ones

## Run (target)

```bash
python -I -X utf8 python_skills/confirmed/demand_report/report.py question.md accepted.md [--draft draft.md] --out report.md
```

## Pass

On the demand example, every sentence cites an accepted claim and the judge passes; a planted unsupported sentence is caught.

When it passes on the laptop, it moves to `python_skills/confirmed/demand_report` and its row in `../REGISTRY.csv` becomes `confirmed` with the evidence.

Parts: [PARTS.md](PARTS.md) · Tasks for Claude Code: [TASKS.md](TASKS.md)
