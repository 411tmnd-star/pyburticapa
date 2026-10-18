# How it works: Capstone: Ship a Reusable Agent Workbench Pack

## `code/main.py`

```text
Assemble the capstone agent-workbench-pack into outputs/.

Seeds schemas, scripts, and docs from the surfaces built in the
preceding lessons of this mini-track. Idempotent. Prints the tree.

Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def write(path, content)`](code/main.py#L593)
- [`def main()`](code/main.py#L598)

## Run and test

From this folder:

```
python code/main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
