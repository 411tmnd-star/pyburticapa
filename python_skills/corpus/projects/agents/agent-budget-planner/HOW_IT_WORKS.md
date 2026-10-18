# How it works: Agent Budget Planner

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def nonnegative(value)`](main.py#L1)
- [`def estimate(input_tokens, output_limit, input_rate, output_rate)`](main.py#L7)
- [`def ledger(limit)`](main.py#L13)
- [`def reserve(state, request_id, amount)`](main.py#L17)
- [`def settle(state, request_id, actual)`](main.py#L35)
- [`def schedule(jobs, limit, deadline_ms)`](main.py#L51)

## `cli.py`

```text
Read jobs, reserve before execution, and retain a machine-readable receipt.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def execute_jobs(jobs, limit, deadline_ms, invoke)`](cli.py#L11)
- [`def local_action(job)`](cli.py#L65)
- [`def main()`](cli.py#L74)

## `demo.py`

Functions and classes, in file order (click to jump to the line):

- no functions or classes (a plain script)

## Run and test

From this folder:

```
python cli.py samples/input.json --mode execute --output budget.json
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
