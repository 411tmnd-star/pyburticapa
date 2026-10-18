# How it works: Streaming Agent Shell in Rust

## `client.py`

```text
Send versioned JSON requests through the bounded Rust action loop.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def encode(request)`](client.py#L24)
- [`def receipts(rows, stdout, reason, abnormal)`](client.py#L49)
- [`def main()`](client.py#L90)

## `demo.py`

Functions and classes, in file order (click to jump to the line):

- no functions or classes (a plain script)

## Run and test

From this folder:

```
python client.py --help
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
