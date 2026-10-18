# How it works: Build a Feedback Ratchet with Ownership and Retirement

## `code/main.py`

Functions and classes, in file order (click to jump to the line):

- [`class Signal`](code/main.py#L14)
- [`class RatchetAction`](code/main.py#L24)
- [`def destination(signal)`](code/main.py#L34)
- [`def promote(signal)`](code/main.py#L47)
- [`def backlog(signals)`](code/main.py#L77)
- [`def example()`](code/main.py#L82)
- [`def main()`](code/main.py#L90)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
