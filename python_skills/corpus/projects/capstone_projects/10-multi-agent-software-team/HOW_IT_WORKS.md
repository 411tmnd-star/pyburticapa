# How it works: Capstone 10 — Multi-Agent Software Engineering Team

## `main.py`

```text
Multi-agent software team — typed task board + handoff accounting scaffold.

The hard architectural primitive is the typed message task board that
coordinates an architect, N parallel coders, a reviewer, and a tester, with
every role boundary producing a trace span. This scaffold runs the full
message flow with stubbed LLM calls so the handoff logic and token accounting
are observable end to end.

Run:  python main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class MsgKind`](main.py#L24)
- [`class Msg`](main.py#L37)
- [`class Board`](main.py#L46)
  - [`def post(self, m)`](main.py#L50)
  - [`def inbox(self, role)`](main.py#L54)
- [`class Subtask`](main.py#L63)
- [`def architect_plan(issue, rng)`](main.py#L70): Stubbed architect plan.
- [`def coder_implement(sub, rng)`](main.py#L83)
- [`def reviewer_check(diffs, rng)`](main.py#L89): Reviewer stub. Catches bugs ~85% of the time; 15% false-approve rate.
- [`def tester_run(diffs, rng)`](main.py#L99): Tester stub. Catches any remaining bugs, with ~3% flake rate.
- [`def run_team(issue, n_coders, rng)`](main.py#L113)
- [`def single_agent_baseline(issue, rng)`](main.py#L187): Stub: one Sonnet 4.7 in a single worktree does the whole thing.
- [`def main()`](main.py#L196)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
