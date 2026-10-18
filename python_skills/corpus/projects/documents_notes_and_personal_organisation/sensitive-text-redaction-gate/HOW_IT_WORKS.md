# How it works: Sensitive Text Redaction Gate

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def detect(text, literals)`](main.py#L13)
- [`def merge_spans(spans, text_length)`](main.py#L49)
- [`def redact(text, literals)`](main.py#L76)
- [`def process(records, literals)`](main.py#L98)
- [`def render_html(report)`](main.py#L136)

## `cli.py`

Functions and classes, in file order (click to jump to the line):

- [`def main()`](cli.py#L9)

## Run and test

From this folder:

```
python cli.py samples/input.jsonl --literals samples/literals.json --output demo-output
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
