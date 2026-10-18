# How it works: Agent Harness Loop Contract

## `main.py`

```text
Agent harness loop contract — deterministic state machine, hooks, pull points.

Conceptual references:
- ./docs/en.md (this lesson)
- Phase 14 lesson 01 (agent loop fundamentals)
- Phase 13 lesson 02 (tool protocols overview)

Stdlib only. Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class State`](main.py#L20)
- [`class HookAbort`](main.py#L57): Raised by a hook to cancel the in-flight turn.
- [`class Event`](main.py#L62)
  - [`def to_dict(self)`](main.py#L67)
- [`class Budget`](main.py#L72)
  - [`def remaining_seconds(self)`](main.py#L80)
  - [`def exceeded(self)`](main.py#L83)
- [`class Step`](main.py#L94)
- [`class PullRequest`](main.py#L105): Returned from run()/resume() when the loop yields control.
- [`class SessionResult`](main.py#L113)
- [`class HookRegistry`](main.py#L120)
  - [`def on(self, topic, fn)`](main.py#L124)
  - [`def fire(self, topic, payload)`](main.py#L129)
- [`def _default_planner(goal, history)`](main.py#L139): Deterministic stand-in planner. Returns a fixed three-step plan.
- [`class HarnessLoop`](main.py#L152): Six-state deterministic loop with hook topics and event stream.
  - [`def events(self)`](main.py#L173)
  - [`def plan(self)`](main.py#L177)
  - [`def _emit(self, etype, payload)`](main.py#L180)
  - [`def _transition(self, target)`](main.py#L185)
  - [`def _check_budget(self)`](main.py#L198)
  - [`def _pause(self, reason)`](main.py#L208)
  - [`def run(self, goal)`](main.py#L214)
  - [`def resume(self, payload)`](main.py#L222)
  - [`def _begin_plan(self)`](main.py#L253)
  - [`def _step(self)`](main.py#L267)
  - [`def _complete(self, reason)`](main.py#L310)
- [`def _demo()`](main.py#L318)

## Run and test

From this folder:

```
python main.py
python -m unittest discover -s tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
