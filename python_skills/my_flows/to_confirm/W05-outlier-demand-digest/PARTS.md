# W05 parts

Paths are relative to `python_skills/`. Course paths point at the untouched course; the matching corpus unit (same id) has the exact Python plus HOW_IT_WORKS and THEORY pages.

## Ours

- `confirmed/yt_outliers`
- `my_flows/research/demand_research`
- `my_flows/research/evidence_verification/verify.py`

## Course

| Id | Title | Course path | What it is | Code |
|---|---|---|---|---|
| `P-feedback-theme-board` | Feedback Theme Board | `course/ai_engineering/projects/feedback-theme-board` | Group product feedback with inspectable phrase evidence, count distinct sources, and export local issue drafts. | no Python here (JavaScript, TypeScript): port the idea to Python |
| `P-chart-storyboard-builder` | Chart Storyboard Builder | `course/ai_engineering/projects/chart-storyboard-builder` | Turn a table into a visual explanation people can inspect. | Python: `solution/cli.py`… |

## Outside

- none

## Port note

The Python in this workflow is a port. Its course source is `P-feedback-theme-board` (JavaScript/TypeScript), left untouched under `course/`. The port keeps the theme board's behaviour and fixtures' intent, in stdlib Python tested with unittest.
