# How it works: RAG Freshness Pipeline

## `cli.py`

```text
A complete-corpus ingestion contract, with durable POSIX snapshots.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def ingest(path, documents, expected_version)`](cli.py#L10)
- [`def query(path, text, now, max_age, k)`](cli.py#L22)
- [`def main()`](cli.py#L35)

## `changes.py`

```text
Plan inserts updates deletions and refreshes.

Lesson: projects/rag-freshness-pipeline/stages/02-changes/docs/en.md
The implementation is original and uses explicit local data contracts.
Run its tests through scripts/project_test.py.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def diff(previous, incoming)`](changes.py#L11)

## `demo.py`

Functions and classes, in file order (click to jump to the line):

- no functions or classes (a plain script)

## `fingerprint.py`

```text
Normalize documents and fingerprint content.

Lesson: projects/rag-freshness-pipeline/stages/01-fingerprint/docs/en.md
The implementation is original and uses explicit local data contracts.
Run its tests through scripts/project_test.py.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def normalize(doc)`](fingerprint.py#L12)

## `retrieve.py`

```text
Exclude expired evidence at query time.

Lesson: projects/rag-freshness-pipeline/stages/04-retrieve/docs/en.md
The implementation is original and uses explicit local data contracts.
Run its tests through scripts/project_test.py.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def retrieve(documents, query, now, max_age, k)`](retrieve.py#L11)

## `snapshot.py`

```text
Persist an index with atomic replacement.

Lesson: projects/rag-freshness-pipeline/stages/03-snapshot/docs/en.md
The implementation is original and uses explicit local data contracts.
Run its tests through scripts/project_test.py.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def read_snapshot(path)`](snapshot.py#L18)
- [`def commit(path, documents, expected_version)`](snapshot.py#L27)

## Run and test

From this folder:

```
python cli.py --help
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
