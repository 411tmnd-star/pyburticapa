# How it works: Spend Capability Where Failure Is Expensive

## `code/main.py`

```text
Companion code for:
certifications/claude/lessons/02-model-selection-and-token-economics/docs/en.md
It validates and summarizes a ten-case local model-routing benchmark.
It also validates repeated mode trials against dated support evidence and gates.
Rates are illustrative units, so no provider price or credential is required.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def validate_benchmark(benchmark)`](code/main.py#L22)
- [`def summarize(benchmark)`](code/main.py#L60)
- [`def validate_mode_trials(experiment)`](code/main.py#L74)
- [`def summarize_mode_trials(experiment)`](code/main.py#L210)
- [`def _validate_repeated_runs(configuration_id, runs, minimum_run_count)`](code/main.py#L229)
- [`def _summarize_runs(runs, gate)`](code/main.py#L258)
- [`def _valid_gate(value)`](code/main.py#L276)
- [`def _number_between(value, minimum, maximum)`](code/main.py#L288)
- [`def _positive_number(value)`](code/main.py#L292)
- [`def _nonempty_strings(value)`](code/main.py#L296)
- [`def _iso_date(value)`](code/main.py#L300)
- [`def load_benchmark(path)`](code/main.py#L310)
- [`def load_mode_trials(path)`](code/main.py#L317)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
