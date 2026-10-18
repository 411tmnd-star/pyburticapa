# How it works: Tiny Coding Agent

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def safe_path(workspace, relative)`](main.py#L11)
- [`def apply_patch(workspace, relative, old, new)`](main.py#L22)
- [`def run_tests(workspace, timeout)`](main.py#L43)
- [`def agent_loop(workspace, actions, max_steps)`](main.py#L105)
- [`def drive(workspace, planner, max_steps)`](main.py#L131): Call the planner after every observation. Tests are executable trusted code.
- [`def proposal_planner(proposals)`](main.py#L151): Select an exact repair only when its failure marker appears in a test result.

## `cli.py`

```text
Repair a disposable copy of a trusted Python workspace using observed failures.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def main()`](cli.py#L8)

## `demo.py`

Functions and classes, in file order (click to jump to the line):

- no functions or classes (a plain script)

## Run and test

From this folder:

```
python cli.py --help
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
