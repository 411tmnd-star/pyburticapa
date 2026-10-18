# How it works: Code Exec Metric

## `code/main.py`

```text
Code execution metric: extract, sandbox subprocess, pass-at-k.

Conceptual references:
- ./docs/en.md (this lesson)
- lesson 70 (task spec format) for code_exec task shape
- lesson 71 (classical metrics) for the dispatcher pattern

Stdlib + numpy. Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class ExecResult`](code/main.py#L45)
  - [`def to_dict(self)`](code/main.py#L53)
- [`def extract_code(text)`](code/main.py#L135)
- [`def _build_runner(code, assertions)`](code/main.py#L144)
- [`def run_candidate(code, assertions, timeout_s)`](code/main.py#L151)
- [`def score_code_exec(prediction, assertions, timeout_s)`](code/main.py#L246)
- [`def pass_at_k(n, c, k)`](code/main.py#L253)
- [`def pass_at_k_estimator(samples, ks)`](code/main.py#L268)
- [`def _demo_examples()`](code/main.py#L280)
- [`def demo()`](code/main.py#L321)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
