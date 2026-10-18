# How it works: Choose the Smallest Surface That Can Carry the Work

## `code/main.py`

```text
Companion code for:
certifications/claude/lessons/01-claude-product-and-model-landscape/docs/en.md
It validates surface, model, and deployment decisions plus their dated evidence.
All measurements come from a local filled scenario rather than provider calls.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def validate_record(record)`](code/main.py#L36)
- [`def recommend(record)`](code/main.py#L85)
- [`def _passes_model_gate(candidate, gate)`](code/main.py#L97)
- [`def _validate_deployment_matrix(matrix, adr, evidence)`](code/main.py#L106)
- [`def _valid_score(value)`](code/main.py#L186)
- [`def _official_doc_url(value)`](code/main.py#L190)
- [`def _nonempty_strings(value)`](code/main.py#L194)
- [`def _iso_date(value)`](code/main.py#L198)
- [`def load_record(path)`](code/main.py#L206)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
