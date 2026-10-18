# How it works: Dataset Split Auditor

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def fingerprint(text)`](main.py#L6)
- [`def validate(records)`](main.py#L13)
- [`def audit(train, test)`](main.py#L26)
- [`def split_groups(records, test_fraction, seed)`](main.py#L39)
- [`def summarize(train, test)`](main.py#L60)

## `cli.py`

```text
Audit supplied partitions or build and audit a deterministic group split.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def evidence(train, test)`](cli.py#L10)
- [`def main()`](cli.py#L32)

## `demo.py`

Functions and classes, in file order (click to jump to the line):

- no functions or classes (a plain script)

## Run and test

From this folder:

```
python cli.py samples/input.json --output split-audit.json --html split-audit.html
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
