# How it works: Role-Based Agent Teams — Roles, Tasks, Processes

## `main.py`

```text
CrewAI-shaped Crew and Flow primitives in stdlib.

Three-agent crew (researcher, writer, editor) producing a brief on
"agent engineering 2026". Same crew is run Sequential, Hierarchical, and
through a Flow to show all three execution shapes.

Stdlib + numpy. Mock LLM responses are deterministic hardcoded strings
keyed off agent role and input prefix.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def tool(name)`](main.py#L20): Mirror of CrewAI's @tool decorator. Marks a function as a tool the
- [`def search(query)`](main.py#L33): Return top results for the query.
- [`class Agent`](main.py#L46)
- [`class Task`](main.py#L55)
- [`class SequentialCrew`](main.py#L63)
  - [`def kickoff(self, inputs)`](main.py#L68)
- [`class HierarchicalCrew`](main.py#L93)
  - [`def kickoff(self, topic)`](main.py#L99)
- [`class Flow`](main.py#L121): Deterministic event-driven workflow. @start fires on kickoff;
  - [`def start(self, fn)`](main.py#L131)
  - [`def listen(self, topic)`](main.py#L135)
  - [`def kickoff(self, payload)`](main.py#L142)
- [`class Memory`](main.py#L158): Four-store memory matching CrewAI's short, long, entity, contextual.
  - [`def _embed(self, text)`](main.py#L169)
  - [`def write_short_term(self, role, value)`](main.py#L179)
  - [`def write_long_term(self, role, value)`](main.py#L182)
  - [`def write_entity(self, entity_id, key, value)`](main.py#L185)
  - [`def recall_long_term(self, query, k)`](main.py#L188)
  - [`def reset_short_term(self)`](main.py#L196)
- [`def _researcher(prior, tools, memory)`](main.py#L200)
- [`def _writer(prior, tools, memory)`](main.py#L211)
- [`def _editor(prior, tools, memory)`](main.py#L216)
- [`def _manager(prior, tools, memory)`](main.py#L221)
- [`def build_agents()`](main.py#L232)
- [`def main()`](main.py#L255)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
