# How it works: Multi-Agent Debate and Collaboration

## `main.py`

```text
Multi-agent debate: full mesh vs sparse (star) topology.

Scripted debaters with different opinion drifts. Measures convergent answer,
rounds to consensus, and total critique ops (as a cost proxy).
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Debater`](main.py#L15)
- [`def _make_debater(name, bias, corrections)`](main.py#L20)
- [`def full_mesh_round(debaters, question, prior)`](main.py#L32)
- [`def sparse_star_round(hub, spokes, question, prior)`](main.py#L43)
- [`def run_debate(debaters, question, rounds, topology)`](main.py#L60)
- [`def main()`](main.py#L84)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
