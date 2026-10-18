# How it works: Data Provenance and Training-Data Governance

## `main.py`

```text
California AB 2013 dataset-summary scaffold — stdlib Python.

Generates the 12-item high-level summary required by California AB 2013
Section 3111(a) for a toy dataset. Identifies follow-on obligations
triggered by specific items (personal-information flag -> CPRA;
copyright-protected flag -> EU TDM opt-out respect).

Usage: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def flag_followups(summary)`](main.py#L46)
- [`def render_markdown(summary)`](main.py#L61)
- [`def main()`](main.py#L74)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
