# How it works: CSV Repair Workbench

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def profile(text)`](main.py#L4): Parse CSV text into {columns, rows, profile}; profile maps each column to {missing, unique}. Reject empty/duplicate headers and ragged rows. Preserve cells exactly.
- [`def propose(table, aliases, date_columns)`](main.py#L34): Return schema_version=1 recipe with ordered trim, alias, date rules. aliases maps column to exact trimmed spelling->canonical spelling. Dates accept ISO or unambiguous DD/MM/YYYY; ambiguous dates await review.
- [`def preview(table, recipe)`](main.py#L54): Return {rows,changes,pending,fingerprint}; row numbers are CSV data rows starting at 1. Changes name row,column,before,after; ambiguous/invalid dates remain unchanged and appear in pending. Never mutate input.
- [`def repair(table, recipe, decisions)`](main.py#L115): Return {csv,recipe,changes,pending,fingerprint}. Optional {fingerprint,cells:[{row,column,value}]} resolves pending cells only, rejecting stale fingerprints, duplicate edits and non-ISO replacement dates. Unresolved cells stay original.

## `cli.py`

Functions and classes, in file order (click to jump to the line):

- no functions or classes (a plain script)

## `presentation.py`

Functions and classes, in file order (click to jump to the line):

- [`def page(title, sections, path, review)`](presentation.py#L5): Write standalone accessible HTML. Review data is downloadable and edited as JSON.

## Run and test

From this folder:

```
python cli.py samples/input.json --output demo-output
python cli.py /absolute/path/to/your-input.json --output your-output
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
