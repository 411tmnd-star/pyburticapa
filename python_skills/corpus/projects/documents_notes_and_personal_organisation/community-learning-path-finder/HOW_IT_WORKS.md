# How it works: Community Learning Path Finder

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def catalog(resources)`](main.py#L4): Validate and copy at most 18 resources {id,title,minutes,goals:[str],prerequisites:[id]}. IDs are unique; minutes positive integer. Known-resource cycles are rejected. Missing prerequisite IDs remain explicit for later feasibility checks.
- [`def path_for(index, target, completed)`](main.py#L44): Return {target,steps,missing,minutes,feasible}, with prerequisites before target and completed IDs excluded from steps. completed can satisfy a prerequisite outside the catalog. Unknown targets are missing rather than fabricated resources.
- [`def rank_paths(index, goals, budget, completed)`](main.py#L72): Return {best,alternatives,unmet_prerequisites}. Exact search combines prerequisite-closed routes for requested goals; rank by most distinct goals covered, then fewest minutes, then IDs. Budget is nonnegative integer. best includes steps,minutes,covered,uncovered; completed resources contribute goals without consuming budget. Keep top three distinct alternatives.
- [`def export_path(index, goals, budget, completed, decisions)`](main.py#L142): Return schema_version=1 {fingerprint,path,alternatives,unmet_prerequisites,remaining_minutes}. path entries contain original resource fields, selected reasons and completed status. Review {fingerprint,completed:[selected IDs]} can mark progress only when all prerequisites are previously completed or included. Fingerprint binds catalog, goals, budget and previous completion.

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
