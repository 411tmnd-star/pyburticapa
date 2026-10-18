# How it works: Voting, Self-Consistency, and Debate Topology

## `main.py`

```text
Voting and debate topology harness, stdlib only.

Runs star / chain / tree / graph topologies under a scripted task. Each
agent has a base-accuracy probability and an error_bias direction (which
wrong answer it drifts to on miss). We simulate N agents, rounds of
refinement, and measure (accuracy, tokens, simulated latency).
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class SimAgent`](main.py#L15)
  - [`def answer(self, correct, rng)`](main.py#L21)
- [`class RunResult`](main.py#L26)
  - [`def accuracy(self)`](main.py#L34)
- [`def majority(items)`](main.py#L38)
- [`def run_star(agents, correct, rng)`](main.py#L45)
- [`def run_chain(agents, correct, rng)`](main.py#L54)
- [`def run_tree(agents, correct, rng)`](main.py#L64)
- [`def run_graph(agents, correct, rng, rounds)`](main.py#L79)
- [`def make_agents(n, heterogeneous, seed)`](main.py#L97)
- [`def bench(correct, trials, heterogeneous)`](main.py#L111)
- [`def main()`](main.py#L139)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
