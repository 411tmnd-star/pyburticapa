# How it works: ReWOO and Plan-and-Execute: Decoupled Planning

## `main.py`

```text
Toy ReWOO — Planner, Workers, Solver. Stdlib only.

Demonstrates the decoupled pattern from Xu et al. (arXiv:2305.18323):
  1. Planner emits a DAG of (tool, args) steps with references (#E1, #E2, ...).
  2. Workers run each step in topological order.
  3. Solver composes the final answer from question + plan + evidence.

Compare run_rewoo() vs run_react() at the bottom for token-use intuition.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class PlanStep`](main.py#L19)
- [`class Plan`](main.py#L26)
- [`class ToolRegistry`](main.py#L30)
  - [`def register(self, name, fn)`](main.py#L34)
  - [`def dispatch(self, name, args)`](main.py#L37)
- [`def resolve_references(value, evidence)`](main.py#L50)
- [`def topological(plan)`](main.py#L57)
- [`def run_workers(plan, tools)`](main.py#L78)
- [`class ScriptedPlanner`](main.py#L86)
  - [`def plan_for(self, question)`](main.py#L90)
- [`class ScriptedSolver`](main.py#L94)
  - [`def solve(self, question, plan, evidence)`](main.py#L98)
- [`def fake_search(query)`](main.py#L102)
- [`def rounded_million(text)`](main.py#L112)
- [`class ReWOORun`](main.py#L120)
- [`def run_rewoo(question, planner, tools, solver)`](main.py#L130)
- [`def run_react_mock(question, tools, trajectory)`](main.py#L146)
- [`def main()`](main.py#L159)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
