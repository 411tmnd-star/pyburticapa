# How it works: Research Report Agent

## `run_report.py`

```text
Command line entry point for the Research Report Agent.

Lesson: projects/research-report-agent/README.md
Usage: python3 solution/run_report.py "question" --out out/
       python3 solution/run_report.py --eval heldout/questions.json [--code DIR]
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def parse_args(argv)`](run_report.py#L17)
- [`def main(argv)`](run_report.py#L52)

## Run and test

From this folder:

```
python run_report.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
