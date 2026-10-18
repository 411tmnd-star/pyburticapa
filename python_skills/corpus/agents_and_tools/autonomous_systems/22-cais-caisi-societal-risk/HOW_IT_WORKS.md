# How it works: CAIS, CAISI, and Societal-Scale Risk

## `main.py`

```text
CAIS four-risk inventory — stdlib Python.

Given a proposed deployment described by a short feature set, tag the
deployment against the CAIS four-risk categories (malicious use, AI
races, organizational risks, rogue AIs) and return a mitigation checklist.
Pedagogical only; the framework requires human judgment for real use.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Deployment`](main.py#L15)
- [`def tag(d)`](main.py#L52)
- [`def report(d)`](main.py#L72)
- [`def main()`](main.py#L94)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
