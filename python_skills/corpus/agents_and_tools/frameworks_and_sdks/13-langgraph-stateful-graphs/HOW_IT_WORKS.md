# How it works: Stateful Graph Orchestration — Durable Execution and Checkpoints

## `main.py`

```text
LangGraph-shaped stateful graph in stdlib, with checkpoint and resume.

State is a typed dict. Nodes return update dicts. Runtime serializes state
after every node so resume picks up exactly where it left off.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Edge`](main.py#L26)
- [`class StateGraph`](main.py#L32)
  - [`def add_node(self, name, fn)`](main.py#L38)
  - [`def set_entry(self, name)`](main.py#L41)
  - [`def add_edge(self, src, dst)`](main.py#L44)
  - [`def add_conditional_edges(self, src, router, targets)`](main.py#L47)
  - [`def _next(self, current, state)`](main.py#L54)
- [`def _make_router(router, expected)`](main.py#L61)
- [`class InMemoryCheckpointer`](main.py#L67)
  - [`def save(self, session_id, step_name, state)`](main.py#L71)
  - [`def load_latest(self, session_id)`](main.py#L74)
  - [`def history(self, session_id)`](main.py#L80)
- [`class PausedAtNode`](main.py#L84)
- [`class Runner`](main.py#L91)
  - [`def run(self, session_id, initial_state, resume_from, state_override)`](main.py#L97)
- [`def _classify(state)`](main.py#L123)
- [`def _refund(state)`](main.py#L136)
- [`def _bug(state)`](main.py#L141)
- [`def _sales(state)`](main.py#L146)
- [`def _human_gate(state)`](main.py#L151)
- [`def _send(state)`](main.py#L158)
- [`def build_graph()`](main.py#L163)
- [`def main()`](main.py#L186)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
