# How it works: AlphaEvolve — Evolutionary Coding Agents

## `main.py`

```text
Minimal AlphaEvolve-like evolutionary loop — stdlib Python.

Toy symbolic regression. The "LLM" proposes a small mutation to a candidate
expression (change a constant, change an operator, add a term). The
"evaluator" scores the expression on training and held-out test points.

MAP-elites grid keeps diverse candidates: cell keyed by (expression depth,
constant magnitude bucket). Without a held-out split the loop overfits
aggressively; with one the best candidate generalizes.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def target(x)`](main.py#L24)
- [`def evaluate_expr(e, x)`](main.py#L31)
- [`def depth(e)`](main.py#L44)
- [`def max_const(e)`](main.py#L51)
- [`def mutate(e)`](main.py#L60): Stand-in for the LLM's targeted edit.
- [`def perturb(e)`](main.py#L73)
- [`def random_leaf()`](main.py#L82)
- [`def render(e)`](main.py#L88)
- [`def mse(e, xs)`](main.py#L98)
- [`class Candidate`](main.py#L110)
- [`def cell_key(e)`](main.py#L117)
- [`def seed_candidate(test_xs, train_xs, gen)`](main.py#L123)
- [`def run_loop(generations, pop, use_holdout, seed)`](main.py#L128)
- [`def main()`](main.py#L174)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
