# How it works: Turn Every Agent Correction into a System Improvement

## `code/main.py`

Functions and classes, in file order (click to jump to the line):

- [`class Correction`](code/main.py#L16)
- [`class Control`](code/main.py#L24)
- [`def choose_target(correction)`](code/main.py#L35)
- [`def normalize_cause(cause)`](code/main.py#L48)
- [`def promote(correction)`](code/main.py#L62)
- [`def ratchet(corrections)`](code/main.py#L85)
- [`def example()`](code/main.py#L95)
- [`def main()`](code/main.py#L103)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
