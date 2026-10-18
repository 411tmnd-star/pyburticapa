# How it works: Retrieval Evaluation Lab

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def validate(ranking, judgments, k)`](main.py#L4)
- [`def precision_recall(ranking, judgments, k)`](main.py#L21)
- [`def rank_metrics(ranking, judgments, k)`](main.py#L28)
- [`def compare_systems(systems, judgments, k)`](main.py#L49)

## `cli.py`

```text
Compare JSON ranking runs against graded judgments with query-level deltas.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def run(baseline, candidate, judgments, k)`](cli.py#L8)
- [`def main()`](cli.py#L32)

## `demo.py`

Functions and classes, in file order (click to jump to the line):

- no functions or classes (a plain script)

## Run and test

From this folder:

```
python cli.py --help
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
