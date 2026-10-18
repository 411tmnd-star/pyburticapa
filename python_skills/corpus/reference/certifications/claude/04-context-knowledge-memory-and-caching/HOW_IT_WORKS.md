# How it works: Put Each Fact in the Right Kind of Context

## `code/main.py`

```text
Companion code for:
certifications/claude/lessons/04-context-knowledge-memory-and-caching/docs/en.md
It validates source lifecycle metadata, prompt budget, and cache eligibility.
The scenario runner keeps correctness separate from cache economics.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def validate_registry(registry)`](code/main.py#L18)
- [`def build_context_plan(registry)`](code/main.py#L71)
- [`def _iso_date(value)`](code/main.py#L84)
- [`def load_registry(path)`](code/main.py#L92)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
