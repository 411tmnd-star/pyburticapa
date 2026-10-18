# How it works: Self-Hosted Serving Selection — Matching Engine to Hardware and Scale

## `main.py`

```text
Self-hosted LLM engine decision-tree walker — stdlib Python.

Given hardware, scale, and workload, pick an engine with explanation.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def pick_engine(hardware, scale, workload)`](main.py#L9)
- [`def main()`](main.py#L70)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
