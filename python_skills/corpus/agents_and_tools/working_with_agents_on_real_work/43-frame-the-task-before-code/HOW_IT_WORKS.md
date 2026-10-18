# How it works: Frame the Task Before the Agent Writes Code

## `code/main.py`

Functions and classes, in file order (click to jump to the line):

- [`class RepositoryFact`](code/main.py#L12)
- [`class TaskFrame`](code/main.py#L18)
- [`def validate(frame)`](code/main.py#L27)
- [`def render(frame)`](code/main.py#L46)
- [`def example()`](code/main.py#L65)
- [`def main()`](code/main.py#L79)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
