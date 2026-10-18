# How it works: Infrastructure Plan Explainer

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def _masked(value, sensitive, unknown)`](main.py#L4)
- [`def load_plan(document)`](main.py#L40): Validate Terraform JSON format major 1 and return sanitized {format_version,resources,configuration}. Resource IDs combine address and optional deposed key. Keep masked before/after and actions only; omit variables, prior state and all other potentially secret raw fields.
- [`def classify(actions)`](main.py#L107): Return create,update,delete,replace,read,no-op or forget for supported exact action sequences. Both create/delete orders are replacements. Unknown sequences raise ValueError.
- [`def impact_graph(plan)`](main.py#L125): Return {nodes,edges,unresolved}. Node is {id,address,action}; edge {from,to,reference} means from depends on to. Resolve expression references and depends_on by longest resource-address prefix, including static references to counted instances. Retain unresolved resource references; ignore var/local/path/count/each/terraform roots.
- [`def explain(plan)`](main.py#L175): Return schema_version=1 {graph,resources,markdown}. Markdown lists exact addresses with stable local anchors and escaped code data. Graph edges are declared dependencies, not a prediction of provider execution order or transitive downtime.

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
