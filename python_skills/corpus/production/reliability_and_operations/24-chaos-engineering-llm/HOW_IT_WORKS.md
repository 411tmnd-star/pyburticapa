# How it works: Chaos Engineering for LLM Production

## `main.py`

```text
Chaos engineering runner with safety plane gates — stdlib Python.

Runs three LLM-specific experiments and applies burn-rate + blast-radius safety gates.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Experiment`](main.py#L16)
- [`def run_experiment(e)`](main.py#L30)
- [`def main()`](main.py#L44)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
