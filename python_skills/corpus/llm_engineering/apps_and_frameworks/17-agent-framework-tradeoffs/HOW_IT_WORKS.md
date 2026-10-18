# How it works: Agent Framework Tradeoffs — Graph, Role, and Actor Orchestration

## `main.py`

```text
Decision-tree recommender for agent frameworks.

Takes a problem descriptor and recommends LangGraph, CrewAI, AutoGen, Agno, or
"no framework" with a one-sentence justification. The tree encodes the tradeoffs
described in docs/en.md.

Run:
    python main.py           # runs the bundled test suite
    python main.py --ask     # interactive prompt mode
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Problem`](main.py#L22): Shape descriptor for an agentic task.
- [`class Recommendation`](main.py#L36)
- [`def recommend(p)`](main.py#L41)
- [`def _check(label, actual, expected_framework)`](main.py#L103)
- [`def run_tests()`](main.py#L110)
- [`def run_interactive()`](main.py#L158)
- [`def main()`](main.py#L178)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
