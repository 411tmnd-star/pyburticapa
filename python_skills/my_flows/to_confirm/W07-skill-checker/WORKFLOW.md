# W07 · Skill checker

**Type** A: course + our workflow · **Goals** all · **Status** to confirm

Check every instruction file we keep (518 in llm_instructions/ plus the chat skills): valid front matter, a description that says when to use it, no risky patterns, and a router test so the right skill is picked for a request.

## How the parts connect

1. SKILL.md Validator reads each file's metadata and size
2. Skill Supply-Chain Scanner flags risky instruction patterns with the exact line
3. Skill Router scores 20 sample requests against the chat skills; mistakes become labelled examples
4. Self-Improving Skill Loop proposes description fixes, gated by a separate evaluation set; you approve each change

## Run (target)

```bash
python check_skills.py ../../llm_instructions --report skills_report.md
```

## Pass

Report lists every file with pass or the exact problem; the 20 sample requests route to the expected chat skill at least 18 times.

When it passes on the laptop, it moves to `python_skills/confirmed/skill_checker` and its row in `../REGISTRY.csv` becomes `confirmed` with the evidence.

Parts: [PARTS.md](PARTS.md) · Tasks for Claude Code: [TASKS.md](TASKS.md)
