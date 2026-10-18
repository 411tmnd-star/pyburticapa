# How it works: The Workbench on a Real Repo

## `main.py`

```text
Run the same task on a sample app twice: prompt-only vs workbench-guided.

Both pipelines are scripted (no LLM) so the measurement is reproducible.
Writes before-after-report.md and comparison.json next to this file.

Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class TaskOutcome`](main.py#L39)
- [`def run_prompt_only()`](main.py#L52): Edits a couple of files, never runs the test, claims done.
- [`def run_workbench()`](main.py#L65): Reads scope, edits inside scope, runs acceptance through feedback, gates, reviews, hands off.
- [`def write_report(po, wb)`](main.py#L78)
- [`def write_sample()`](main.py#L102)
- [`def main()`](main.py#L111)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
