# How it works: Generative Agents and Emergent Simulation

## `main.py`

```text
Generative agents miniature: Smallville-in-stdlib.

Five agents share a small world. Agent 0 is seeded with a party goal. Over
ticks, invitations spread through bilateral memory observations, reflection
synthesizes beliefs, and plans update. By the final tick, 3+ agents converge
at the party location without any central orchestrator.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Memory`](main.py#L19)
- [`class Plan`](main.py#L27)
- [`class Agent`](main.py#L34)
  - [`def observe(self, tick, content, importance)`](main.py#L41)
  - [`def reflect(self, tick)`](main.py#L44)
  - [`def update_plan(self, tick)`](main.py#L53)
  - [`def act(self, tick)`](main.py#L58)
- [`def retrieve_top_k(stream, query, tick, k)`](main.py#L66)
- [`def run_simulation(n_agents, ticks)`](main.py#L75)
- [`def demo_retrieval()`](main.py#L120)
- [`def main()`](main.py#L136)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
