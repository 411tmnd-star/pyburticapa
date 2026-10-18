# How it works: Prompt Regression Tester

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def validate_cases(cases)`](main.py#L5)
- [`def reject_json_constant(value)`](main.py#L30)
- [`def score_response(response, checks)`](main.py#L34)
- [`def compare(cases, baseline, candidate)`](main.py#L61)
- [`def release_gate(report, min_pass, max_regressions)`](main.py#L84)

## `cli.py`

```text
Compare provenance-bound recorded prompt runs and return a CI exit status.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def case_digest(cases)`](cli.py#L8)
- [`def load_run(raw, cases)`](cli.py#L14)
- [`def run(cases, baseline, candidate, allow_configuration_change)`](cli.py#L36)
- [`def main()`](cli.py#L62)

## `demo.py`

Functions and classes, in file order (click to jump to the line):

- no functions or classes (a plain script)

## Run and test

From this folder:

```
python cli.py --help
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
