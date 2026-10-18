# How it works: CSV Question Workbench

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def load_csv(text, max_rows)`](main.py#L12)
- [`def plan_question(question, data)`](main.py#L55)
- [`def run_query(data, sql, max_rows, max_steps)`](main.py#L80)
- [`def render_report(report)`](main.py#L140)

## `cli.py`

Functions and classes, in file order (click to jump to the line):

- [`def propose_sql(question, data)`](cli.py#L12)
- [`def main()`](cli.py#L43)

## Run and test

From this folder:

```
python cli.py sample.csv --question "sum units by region" --output output/report.html
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
