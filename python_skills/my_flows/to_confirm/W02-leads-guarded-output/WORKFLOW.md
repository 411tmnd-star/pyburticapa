# W02 · Leads guarded output

**Type** A: course + our workflow · **Goals** job leads, sales · **Status** to confirm

Make leads.py's model steps safe and cheap: every model reply is checked against a schema before use, the filter prompt gets a regression test, and token spend is metered against the $20 budget.

## How the parts connect

1. filter reply → schema check (`{"verdict": bool}` only) → bounded repair or reject (Output Guard + CC-09)
2. recorded filter replies in fixtures → Prompt Regression Tester compares prompt revisions before a change ships
3. usage from each API response → integer cost meter; stop the run at a budget you set

## Run (target)

```bash
python3 -I leads.py --dry-run --out leads_out && python3 -I test_prompts.py
```

## Pass

Dry run still gives 1 draft, 4 not drafted; a malformed verdict fixture is rejected, not drafted; cost report prints a total and stops at a fixture budget.

When it passes on the laptop, it moves to `python_skills/confirmed/job_leads` and its row in `../REGISTRY.csv` becomes `confirmed` with the evidence.

Parts: [PARTS.md](PARTS.md) · Tasks for Claude Code: [TASKS.md](TASKS.md)
