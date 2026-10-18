# How it works: Planning with HTN and Evolutionary Search

## `main.py`

```text
HTN planner (with scripted LLM fallback) plus a toy evolutionary search.

Two demos, one file. HTN shows the ChatHTN pattern: symbolic planner falls back
to an LLM for decomposition when no method matches. Evolutionary search shows
the AlphaEvolve pattern: ensemble mutations filtered by a deterministic evaluator.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Operator`](main.py#L16)
  - [`def applicable(self, state)`](main.py#L22)
  - [`def apply(self, state)`](main.py#L25)
- [`class Method`](main.py#L35)
  - [`def applicable(self, state)`](main.py#L41)
- [`class ScriptedLLM`](main.py#L45): Stands in for ChatHTN's LLM fallback. Returns scripted decompositions.
  - [`def decompose(self, task, state)`](main.py#L52)
- [`class HTNPlanner`](main.py#L58)
  - [`def plan(self, task, state, depth, max_depth)`](main.py#L64)
  - [`def _expand(self, subtasks, state, depth)`](main.py#L88)
- [`def htn_demo()`](main.py#L104)
- [`def evolutionary_demo()`](main.py#L147)
- [`def main()`](main.py#L197)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
