# How it works: Model, System, and Dataset Cards

## `main.py`

```text
Minimal model-card, datasheet, system-card generator — stdlib Python.

Generates three canonical documents for a toy deployment:
  - Model Card (Mitchell et al. 2019)
  - Datasheet (Gebru et al. 2018)
  - System Card (Sidhpurwala 2024 / "Blueprints of Trust" 2025)

Each is a Markdown string printed to stdout. Sections follow the canonical
templates.

Usage: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def model_card()`](main.py#L17)
- [`def datasheet()`](main.py#L57)
- [`def system_card()`](main.py#L89)
- [`def main()`](main.py#L117)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
