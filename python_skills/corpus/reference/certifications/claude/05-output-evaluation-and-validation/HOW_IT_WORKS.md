# How it works: Validate the Claim, Not the Confidence

## `code/main.py`

```text
Companion code for:
certifications/claude/lessons/05-output-evaluation-and-validation/docs/en.md
It validates claim provenance, evaluator fit, and release-gate consistency.
The local packet contains one intentional blocker to exercise revision logic.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def validate_record(record)`](code/main.py#L24)
- [`def summarize(record)`](code/main.py#L91)
- [`def load_record(path)`](code/main.py#L99)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
