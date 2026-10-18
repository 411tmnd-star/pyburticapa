# How it works: Capstone 05 — Autonomous Research Agent (AI-Scientist Class)

## `main.py`

```text
Autonomous research agent — plan/execute/verify tree search scaffold.

The hard architectural primitive is best-first tree search over experiment
nodes with budgeted expansion, per-node sandboxed execution, and a novelty x
quality x budget scoring function. The LLM planner and the actual PyTorch
experiments are stubbed so the tree-search skeleton is observable end to end
without real compute.

Run:  python main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Node`](main.py#L25)
  - [`def score(self, remaining_budget)`](main.py#L36)
- [`def expand(node, next_id)`](main.py#L45): Propose children by varying one config dimension at a time.
- [`def run_experiment(node, rng)`](main.py#L70): Simulates running the experiment in a sandboxed container.
- [`def verify(node)`](main.py#L95)
- [`class Tree`](main.py#L109)
  - [`def push(self, node)`](main.py#L118)
  - [`def pop(self)`](main.py#L124)
- [`def tree_search(seed, rng)`](main.py#L131)
- [`def best_branch(tree)`](main.py#L169)
- [`def main()`](main.py#L181)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
