# How it works: Design the Handoff Before the Automation

## `code/main.py`

```text
Companion code for:
certifications/claude/lessons/07-workflow-design-and-human-handoffs/docs/en.md
It validates step ownership, review boundaries, checkpoints, and fallback.
The local runner returns the next decision from a filled handoff packet.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def validate_workflow(workflow)`](code/main.py#L18)
- [`def next_action(workflow)`](code/main.py#L58)
- [`def load_workflow(path)`](code/main.py#L66)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
