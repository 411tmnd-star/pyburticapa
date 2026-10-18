# How it works: Dataset Contract Gate

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def validate_contract(contract)`](main.py#L6)
- [`def matches_type(value, kind)`](main.py#L64)
- [`def row_issues(row, contract)`](main.py#L74)
- [`def duplicate_rows(rows, contract)`](main.py#L103)
- [`def evaluate(rows, contract)`](main.py#L123)
- [`def render_html(report)`](main.py#L160)

## `cli.py`

Functions and classes, in file order (click to jump to the line):

- [`def main()`](cli.py#L9)

## Run and test

From this folder:

```
python cli.py samples/input.jsonl --contract samples/contract.json --output demo-output
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
