# How it works: Database Migration Rehearsal

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def _snapshot(connection)`](main.py#L6)
- [`def _clone(source)`](main.py#L45)
- [`def snapshot(source)`](main.py#L60): Read an existing SQLite file through a read-only connection and backup into memory. Return schema definitions, table row counts, order-independent row-content SHA-256 hashes and AUTOINCREMENT sequences. Source is never opened writable.
- [`def _execute(connection, sql)`](main.py#L69)
- [`def _diff(before, after)`](main.py#L101)
- [`def rehearse(source, migration)`](main.py#L111): Apply SQL only to an in-memory backup. Return {before,after,schema_diff,error,applied}; after records even partially applied scripts when an error occurs. ATTACH, DETACH, PRAGMA, virtual-table creation and extension/file functions are denied; long statements are interrupted after a two-second progress deadline. This is SQLite policy, not OS isolation.
- [`def test_rollback(source, migration, rollback)`](main.py#L129): Reapply migration and declared rollback to one disposable backup. Return migration evidence plus {rollback_error,restored,reversible}. restored is the post-rollback snapshot; reversible requires successful forward and rollback scripts and exact equality of schema, row content and sequences to before. No automatic rollback SQL is invented.
- [`def receipt(source, migration, rollback, invariants)`](main.py#L158): Return schema_version=1 rehearsal with invariant_results and release_ready. invariants is [{table,min_rows?,max_rows?,same_rows?,preserve_data?}]. Missing tables fail. preserve_data compares full row hashes, intended for unchanged-schema tables. Release readiness requires all invariants, successful forward SQL and demonstrated exact rollback; this is evidence for a human release decision.

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
