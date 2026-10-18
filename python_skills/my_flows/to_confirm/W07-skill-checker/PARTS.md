# W07 parts

Paths are relative to `python_skills/`. Course paths point at the untouched course; the matching corpus unit (same id) has the exact Python plus HOW_IT_WORKS and THEORY pages.

## Ours

- `llm_instructions`
- `llm_instructions/chat_skills`

## Course

| Id | Title | Course path | What it is | Code |
|---|---|---|---|---|
| `P-skill-validator` | SKILL.md Validator and Loader | `course/ai_engineering/projects/skill-validator` | Validate skill metadata and load only the context the task needs. | Python: `solution/demo.py`… |
| `P-skill-router` | Skill Router | `course/ai_engineering/projects/skill-router` | Route a request to a skill using explainable keyword scores, path rules, permission gates, and dependency ordering. | no Python here (TypeScript): port the idea to Python |
| `P-skill-scanner` | Skill Supply-Chain Scanner | `course/ai_engineering/projects/skill-scanner` | Find risky instruction patterns with exact source evidence. | Python: `solution/demo.py`… |
| `P-self-improving-skill-loop` | Self-Improving Skill Loop | `course/ai_engineering/projects/self-improving-skill-loop` | Improve an explicit routing skill from labeled development errors, then require a separate evaluation gate before promotion. | Python: `solution/cli.py`… |
| `L13-27` | Skill Evals, Packaging, and Portability | `course/ai_engineering/phases/13-tools-and-protocols/27-skill-evals-packaging-and-portability` | A skill is finished when its package survives linting, routes on the right requests, improves a measured task, stays inside policy, and degrades honestly on another host. | Python: `code/main.py`… |

## Outside

- none

## Port note

The Python in this workflow is a port. Its course source is `P-skill-router` (TypeScript), left untouched under `course/`. The port keeps the skill router's behaviour and fixtures' intent, in stdlib Python tested with unittest.
