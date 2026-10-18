# How it works: Workshop Materials Planner

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def _number(value)`](main.py#L5)
- [`def _factor(source, target, conversions)`](main.py#L15)
- [`def validate(document)`](main.py#L37): Return a deep-copied model. participants is a nonnegative integer; materials have unique id,name,kind,quantity,unit and shared materials need positive integer share. Inventory IDs must exist. Explicit positive conversion factors map from->to. Reject inconsistent conversion cycles.
- [`def scale(model, participants)`](main.py#L75): Return [{id,name,kind,unit,groups,required}] using quantity*participants for consumables and quantity*ceil(participants/share) for reusable shared equipment. required is a decimal string; zero participants requires zero of both kinds.
- [`def shortages(model, participants)`](main.py#L90): Return scaled rows plus available,shortage (decimal strings or None) and unresolved inventory entries. Sum compatible inventory through explicit reciprocal conversion paths. Any unconvertible inventory for an item leaves availability and shortage unknown; never silently infer density or package size.
- [`def export_plan(model, counts)`](main.py#L114): Return schema_version=1 {participants,packing,scenarios,csv,uncertain_items}. counts is a unique list of nonnegative integers for comparison. CSV contains id,name,required,available,shortage,unit,status; unknown quantities are blank with status=review.

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
