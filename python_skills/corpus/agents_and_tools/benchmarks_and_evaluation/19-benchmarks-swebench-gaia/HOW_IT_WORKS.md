# How it works: Benchmarks: SWE-bench, GAIA, AgentBench

## `main.py`

```text
Toy SWE-bench-style harness plus a GAIA-style difficulty classifier.

SWE-bench: bug-fix tasks with FAIL_TO_PASS and PASS_TO_PASS gates.
GAIA: simple-for-humans, hard-for-AI questions scored by decomposition depth.
Both are synthetic; the point is to make the evaluator rules concrete.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Task`](main.py#L15)
- [`class TaskResult`](main.py#L25)
- [`def run_task(task)`](main.py#L34)
- [`def gaia_level(question)`](main.py#L56)
- [`def swe_demo()`](main.py#L71)
- [`def gaia_demo()`](main.py#L116)
- [`def main()`](main.py#L132)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
