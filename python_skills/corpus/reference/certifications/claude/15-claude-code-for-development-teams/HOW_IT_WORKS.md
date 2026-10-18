# How it works: Claude Code Scales Through Shared Constraints

## `code/main.py`

```text
Companion validator for this lesson's docs/en.md team review artifact.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def validate_text(text)`](code/main.py#L40)
- [`def validate_artifact(path)`](code/main.py#L53)
- [`def validate_permission_decision(payload)`](code/main.py#L64)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
