# How it works: Capstone Lesson 26: Sandbox Runner with Denylist and Path Jail

## `code/main.py`

```text
Sandbox runner with denylist, path jail, and timeout.

See: phases/19-capstone-projects/26-sandbox-runner-denylist/docs/en.md
Concept refs:
  - POSIX subprocess semantics (wall-clock timeout, return codes).
  - Symlink-safe path jail via realpath prefix check.
The demo at the bottom runs a battery of allow/deny calls and exits zero.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class SandboxResult`](code/main.py#L97): Structured outcome of a sandbox.run call.
  - [`def ok(self)`](code/main.py#L111)
  - [`def to_dict(self)`](code/main.py#L114)
- [`class SandboxConfig`](code/main.py#L129): All knobs the sandbox accepts.
- [`def _basename(executable)`](code/main.py#L152)
- [`def _check_executable_denylist(argv, cfg)`](code/main.py#L156)
- [`def _check_argv_interpreter(argv, cfg)`](code/main.py#L167)
- [`def _check_shell_metachars(argv, shell)`](code/main.py#L183)
- [`def _looks_like_path(arg)`](code/main.py#L199): Conservative path-like detector.
- [`def _check_path_jail(argv, cfg)`](code/main.py#L215)
- [`def truncate_stream(buf, max_bytes)`](code/main.py#L244)
- [`class Sandbox`](code/main.py#L257): A subprocess runner that refuses dangerous calls and jails paths.
  - [`def run(self, argv)`](code/main.py#L262)
- [`def find_executable(candidates)`](code/main.py#L382)
- [`def _which(name)`](code/main.py#L390)
- [`def _seed_project_root()`](code/main.py#L403): Create a temp project root with a single tracked file.
- [`def _print_outcome(label, result)`](code/main.py#L416)
- [`def run_demo()`](code/main.py#L431): Self-terminating demo. Returns 0 on success.

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
