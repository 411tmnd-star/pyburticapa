# How it works: Capstone 01 — Terminal-Native Coding Agent

## `main.py`

```text
Terminal-native coding agent — minimal plan/act/observe loop scaffold.

The hard architectural primitive in a 2026 coding agent is not the model call
or any single tool. It is the plan-act-observe-recover loop with bounded
context, a structured plan state, a sandboxed tool dispatcher, and hook
callbacks at every lifecycle point. This file implements that loop end to end
in stdlib Python. The LLM is stubbed out with a deterministic script so the
loop logic stays observable and testable without network calls.

Run:  python main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class TodoItem`](main.py#L29)
- [`class PlanState`](main.py#L37)
  - [`def summary(self)`](main.py#L41)
- [`class Budget`](main.py#L54)
  - [`def step(self, tokens, dollars)`](main.py#L62)
  - [`def exceeded(self)`](main.py#L67)
- [`class HookBus`](main.py#L84)
  - [`def on(self, event, fn)`](main.py#L91)
  - [`def fire(self, event, payload)`](main.py#L94)
- [`def tool_read_file(sandbox, path)`](main.py#L107)
- [`def tool_run_shell(sandbox, cmd, timeout)`](main.py#L115)
- [`def model_step(plan, turn)`](main.py#L151): Stubbed model: returns a plan rewrite and (optionally) a tool call.
- [`def destructive_guard(payload)`](main.py#L164)
- [`def run_agent(task, sandbox)`](main.py#L172)
- [`def main()`](main.py#L227)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
