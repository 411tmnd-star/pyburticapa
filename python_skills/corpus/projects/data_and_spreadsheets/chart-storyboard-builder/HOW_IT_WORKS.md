# How it works: Chart Storyboard Builder

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def parse_table(text, roles)`](main.py#L4): Return {rows,roles,missing}; roles requires group,value,unit strings naming CSV columns and a display unit. Rows retain raw values plus group and number (float or None for blanks). Reject duplicate headers, ragged rows, blank groups and non-finite numbers.
- [`def aggregate(table, reducer, periods, grammar)`](main.py#L40): Return chart spec {schema_version,grammar,reducer,unit,points,axis,source_rows,missing_values}. Reducers: sum,mean,count (nonblank values). Supplied unique periods define order and expose absent groups as null. Reject omitted observed groups. Axis always includes zero.
- [`def annotate(spec, requests)`](main.py#L84): Return a copied spec with annotations [{group,value,text}]. Requests {group,text} must identify a nonmissing point; generated text appends the exact plotted value and unit. Reject duplicate or unknown groups.
- [`def render_svg(spec)`](main.py#L106): Render a standalone accessible SVG with title, desc, explicit zero baseline, values, unit and missing-point labels. Line charts break across missing points. All supplied text is XML-escaped; no JavaScript or external resources.

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
