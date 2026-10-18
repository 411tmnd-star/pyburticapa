# How it works: Open-Weight VLM Recipes: What Actually Matters

## `main.py`

```text
Open-weight VLM recipe picker — condensed ablation tables from 2024-2025 papers.

Encodes the key findings from MM1, Idefics2, Cambrian-1, Molmo, Prismatic VLMs
as simple data tables. Lets you ask:
  - given a budget and task mix, which recipe wins
  - if I swap axis X, what is the expected delta
  - which axis to ablate first

No numpy, no pandas — just dicts and print tables. The point is the structure
of the evidence, not the numeric precision.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Recipe`](main.py#L19)
- [`def axis_impact()`](main.py#L44)
- [`def compare_encoders()`](main.py#L64)
- [`def compare_data()`](main.py#L81)
- [`def print_recipes()`](main.py#L98)
- [`def pick_recipe(budget_b, task)`](main.py#L106)
- [`def main()`](main.py#L129)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
