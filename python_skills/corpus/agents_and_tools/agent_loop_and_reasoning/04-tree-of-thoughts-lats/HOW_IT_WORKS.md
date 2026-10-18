# How it works: Tree of Thoughts and LATS: Deliberate Search

## `main.py`

```text
Toy Tree-of-Thoughts BFS and LATS MCTS on a stylized arithmetic search.

Task: given integers [4, 6, 4, 1], find an expression using +, -, *, / that
evaluates to 24. This mirrors the Game of 24 benchmark from Yao et al.

ToT is a BFS with a prompted value function. LATS is MCTS over the same
search space with UCT selection.

Stdlib only; no LLM. Value function is symbolic (distance from 24).
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Node`](main.py#L26)
  - [`def q(self)`](main.py#L34)
- [`def evaluate(a, op, b)`](main.py#L38)
- [`def expand(node)`](main.py#L50)
- [`def value(node)`](main.py#L68)
- [`def tot_bfs(root, max_expansions_per_level, max_depth)`](main.py#L76)
- [`def uct(parent, child, c)`](main.py#L94)
- [`def select(node)`](main.py#L100)
- [`def simulate(node, depth, rng)`](main.py#L106)
- [`def backprop(path, reward)`](main.py#L116)
- [`def mcts(root, iterations, rng)`](main.py#L122)
- [`def _all_leaves(node)`](main.py#L142)
- [`def main()`](main.py#L151)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
