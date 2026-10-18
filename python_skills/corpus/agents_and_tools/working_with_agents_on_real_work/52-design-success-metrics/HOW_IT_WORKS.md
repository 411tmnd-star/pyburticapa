# How it works: Design Success Metrics Before the Result Exists

## `code/main.py`

Functions and classes, in file order (click to jump to the line):

- [`class Metric`](code/main.py#L14)
- [`class MeasurementPlan`](code/main.py#L24)
- [`def validate(plan)`](code/main.py#L30)
- [`def evaluate(metric, value)`](code/main.py#L51)
- [`def report(plan, values)`](code/main.py#L59)
- [`def example()`](code/main.py#L75)
- [`def main()`](code/main.py#L87)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
