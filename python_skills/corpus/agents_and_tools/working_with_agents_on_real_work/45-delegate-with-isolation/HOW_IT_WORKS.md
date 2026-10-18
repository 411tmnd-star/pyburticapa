# How it works: Delegate Agent Work with Isolation and Merge Contracts

## `code/main.py`

Functions and classes, in file order (click to jump to the line):

- [`class WorkUnit`](code/main.py#L14)
- [`def paths_overlap(left, right)`](code/main.py#L22)
- [`def conflicts(units)`](code/main.py#L28)
- [`def waves(units)`](code/main.py#L39)
- [`def delegation_plan(units)`](code/main.py#L57)
- [`def example()`](code/main.py#L72)
- [`def main()`](code/main.py#L80)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
