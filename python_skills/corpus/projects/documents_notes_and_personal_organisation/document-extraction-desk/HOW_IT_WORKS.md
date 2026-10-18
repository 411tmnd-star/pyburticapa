# How it works: Document Extraction Review Desk

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def validate_schema(schema)`](main.py#L9)
- [`def extract_candidates(text, schema)`](main.py#L31)
- [`def typed_value(quote, kind)`](main.py#L46)
- [`def review_document(text, schema, candidates, decisions)`](main.py#L65)
- [`def render_review(report)`](main.py#L122)

## `cli.py`

Functions and classes, in file order (click to jump to the line):

- [`def main()`](cli.py#L9)

## Run and test

From this folder:

```
python cli.py sample.txt --schema schema.json --output output/review.html
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
