# How it works: Orchestration Patterns: Supervisor, Swarm, Hierarchical

## `main.py`

```text
Four orchestration patterns: supervisor, swarm, hierarchical, debate.

Same three-intent task (refund / bug / sales) handled four ways. Measure
op count per pattern to see cost trade-offs.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def classify(text)`](main.py#L14)
- [`def supervisor_worker(tasks)`](main.py#L32)
- [`def swarm(tasks)`](main.py#L45)
- [`def hierarchical(tasks)`](main.py#L63)
- [`def debate(tasks)`](main.py#L79)
- [`def main()`](main.py#L97)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
