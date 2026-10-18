# How it works: PR Review Reporter

## `diff_parser.py`

```text
Parse ordinary textual Git unified diffs; retain physical new-file line numbers.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def decode_path(raw)`](diff_parser.py#L9)
- [`def parse(raw)`](diff_parser.py#L35)

## Run and test

From this folder:

```
node cli.ts --diff samples/change.diff --output review.json --html review.html --sarif review.sarif
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
