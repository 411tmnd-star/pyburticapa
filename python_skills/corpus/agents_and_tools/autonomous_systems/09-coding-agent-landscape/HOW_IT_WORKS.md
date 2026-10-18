# How it works: The Autonomous Coding Agent Landscape (2026)

## `main.py`

```text
CodeAct vs JSON tool-call scaffold comparison — stdlib Python.

Both scaffolds use the same stub "model" (deterministic rules) so the
comparison isolates the scaffold from model quality. Metrics:
  - tasks solved
  - turns used
  - per-action blast radius (number of files an action can touch)

The point is pedagogical: scaffolding is load-bearing. OpenHands
(arXiv:2407.16741) made the CodeAct bet explicitly; JSON tool calls
dominate managed services where the provider controls the executor.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def run_tests(repo)`](main.py#L44): Deterministic stub: simulate the test suite against the repo string.
- [`def _apply_fix(repo, path)`](main.py#L60): Apply the per-path fix in place. Returns True iff a fix was applied.
- [`class JsonScaffold`](main.py#L73)
  - [`def step(self)`](main.py#L77): Return one JSON action at a time, based on current failing test.
  - [`def blast_radius(self)`](main.py#L88)
  - [`def run(self, max_turns)`](main.py#L91)
- [`class CodeActScaffold`](main.py#L103)
  - [`def step(self)`](main.py#L111): Return one Python snippet that may edit multiple files in one go.
  - [`def blast_radius(self)`](main.py#L127)
  - [`def run(self, max_turns)`](main.py#L131)
- [`def report(name, passed, turns, blast)`](main.py#L142)
- [`def main()`](main.py#L148)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
