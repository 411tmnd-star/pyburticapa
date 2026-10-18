# How it works: Agent Workbench Engineering: Why Capable Models Still Fail

## `code/main.py`

```text
Compare a prompt-only run against a workbench-guided run on a tiny repo task.

The agent is a rule-based stub; the point is the surrounding surfaces. Each
surface is wired in for the second run and we count which surfaces would have
caught each failure on the first run.

Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class RepoTask`](code/main.py#L29)
- [`class RunResult`](code/main.py#L37)
  - [`def missing_surfaces(self)`](code/main.py#L46)
- [`def stub_agent(task, surfaces)`](code/main.py#L50): Tiny deterministic stand-in for an LLM-backed coding agent.
- [`def failure_report(result)`](code/main.py#L87)
- [`def main()`](code/main.py#L101)

## Run and test

From this folder:

```
python code/main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
