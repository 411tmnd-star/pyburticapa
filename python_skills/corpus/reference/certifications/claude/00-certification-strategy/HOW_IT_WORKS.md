# How it works: Study the Decisions, Not the Vocabulary

## `code/main.py`

```text
Companion code for:
certifications/claude/lessons/00-certification-strategy/docs/en.md
It validates a readiness packet and ranks domains by weighted weakness.
It uses only local JSON and never reconstructs confidential exam content.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def validate_plan(plan)`](code/main.py#L28)
- [`def rank_domains(plan)`](code/main.py#L86)
- [`def build_report(plan)`](code/main.py#L98)
- [`def _number(value)`](code/main.py#L108)
- [`def _iso_date(value)`](code/main.py#L112)
- [`def load_plan(path)`](code/main.py#L121)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
