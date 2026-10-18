# How it works: Tool Contracts, Errors, and Progressive Discovery

## `code/main.py`

```text
Companion validator for this lesson's docs/en.md tool catalog.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def validate_text(text)`](code/main.py#L25)
- [`def validate_artifact(path)`](code/main.py#L37)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
