# How it works: Multi-Session Handoff

## `main.py`

```text
Generate a handoff packet from workbench artifacts.

Reads state, verdict, review, and feedback (here stubbed in-memory),
writes handoff.md for humans and handoff.json for the next agent.

Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class WorkbenchSnapshot`](main.py#L20)
- [`class HandoffPayload`](main.py#L30)
- [`def trim_feedback(records)`](main.py#L42)
- [`def derive_risks(snapshot)`](main.py#L56)
- [`def generate_handoff(snapshot)`](main.py#L73)
- [`def main()`](main.py#L124)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
