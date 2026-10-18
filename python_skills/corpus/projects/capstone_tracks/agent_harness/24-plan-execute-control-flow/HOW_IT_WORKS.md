# How it works: Plan-Execute Control Flow

## `main.py`

```text
Plan-and-execute agent with replan on failure, plan diffs, and dual budgets.

Conceptual references:
- ./docs/en.md (this lesson)
- Phase 14 lesson 01 (agent loop fundamentals)
- Phase 13 lesson 02 (tool protocols overview)

Stdlib only. Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Step`](main.py#L20)
  - [`def signature(self)`](main.py#L28)
- [`class PlanDiff`](main.py#L33)
  - [`def to_dict(self)`](main.py#L39)
- [`class Event`](main.py#L49)
- [`class SessionResult`](main.py#L56)
  - [`def to_dict(self)`](main.py#L63)
- [`class ToolFailure`](main.py#L81)
- [`def _diff_plans(old, new, revision)`](main.py#L85)
- [`class PlanExecuteAgent`](main.py#L98): Sequential plan executor with replan on failure.
  - [`def _emit(self, etype, payload)`](main.py#L115)
  - [`def run(self, goal)`](main.py#L118)
- [`def _summarize(plan)`](main.py#L194)
- [`def make_deterministic_planner(fail_step_id, recovery)`](main.py#L198): Planner used in the demo and tests.
- [`def _demo()`](main.py#L236)

## Run and test

From this folder:

```
python main.py
python -m unittest discover -s tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
