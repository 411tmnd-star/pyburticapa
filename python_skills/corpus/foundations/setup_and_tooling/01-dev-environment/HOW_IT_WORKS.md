# How it works: Dev Environment

## `verify.py`

```text
Route-aware environment preflight for AI Engineering from Scratch.

Lesson: phases/00-setup-and-tooling/01-dev-environment/docs/en.md
Run this file from the repository root before starting a learning route.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Result`](verify.py#L20)
- [`class Probe`](verify.py#L26)
- [`class Route`](verify.py#L33)
- [`def command_result(command, minimum_major)`](verify.py#L41)
- [`def python_result()`](verify.py#L74)
- [`def module_result(module)`](verify.py#L82)
- [`def gpu_result()`](verify.py#L88)
- [`def git_fix()`](verify.py#L105)
- [`def parse_args()`](verify.py#L222)
- [`def print_probe(key, required)`](verify.py#L240)
- [`def main()`](verify.py#L257)

## Run and test

From this folder:

```
python verify.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
