# How it works: Catalog Record Linker

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def import_catalog(text, source)`](main.py#L4): Parse CSV requiring nonempty unique id and title, optional creator and extra fields. Return records with source and source_id keys; preserve original fields. Reject ragged rows, duplicate headers and blank source names.
- [`def _tokens(text)`](main.py#L32)
- [`def _score(a, b)`](main.py#L36)
- [`def candidates(left, right, threshold)`](main.py#L41): Return descending candidate pairs {left,right,score,title_score,creator_score}; title Jaccard contributes 0.8, creator Jaccard 0.2. Include scores >= threshold; use source IDs to break ties. Threshold must be finite in [0,1].
- [`def reconcile(left, right, decisions)`](main.py#L64): Return merged entities with sources (complete original records), fields and unresolved conflicts. Decisions are [{left,right,match:bool,values:{field:chosen string}}]. Require one-to-one accepted links, known IDs and unique pair decisions. Unmatched records remain separate.
- [`def export_catalog(left, right, review)`](main.py#L130): Return schema_version=1 {fingerprint,entities,crosswalk,ready}; crosswalk is CSV source_id,entity_id. Optional review {fingerprint,pairs:[decisions]} is bound to source records. ready means every accepted merge has resolved field conflicts, not that every candidate was reviewed.

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
