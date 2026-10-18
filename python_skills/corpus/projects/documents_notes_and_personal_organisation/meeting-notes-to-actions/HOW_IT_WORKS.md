# How it works: Meeting Notes to Actions

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def parse_notes(text)`](main.py#L6)
- [`def validate_action(action)`](main.py#L23)
- [`def deduplicate(actions)`](main.py#L53)
- [`def publish(actions, today)`](main.py#L67)

## `cli.py`

```text
Create a source-linked commitment inbox; export only explicitly approved actions.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def proposals(text)`](cli.py#L14)
- [`def inbox(text, today, decisions)`](cli.py#L35)
- [`def main()`](cli.py#L103)

## `demo.py`

Functions and classes, in file order (click to jump to the line):

- no functions or classes (a plain script)

## Run and test

From this folder:

```
python cli.py samples/notes.txt --today 2026-09-29 --output actions.json --html actions.html --csv approved.csv
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
