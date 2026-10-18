# How it works: The Multi-Agent Primitive Model

## `main.py`

```text
Four multi-agent primitives, stdlib only.

Primitives:
  - Agent(name, system_prompt, tools, policy)
  - Handoff(from_agent, to_agent, reason)
  - SharedState (thread-safe message pool)
  - Orchestrator (Static, Handoff-driven, LLM-selected)

Runs the same three-agent pipeline (researcher -> writer -> reviewer) under
three orchestrator types. Agents are scripted policies, not LLM calls -- the
point is the coordination structure.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class SharedState`](main.py#L24)
  - [`def append(self, msg)`](main.py#L28)
  - [`def snapshot(self)`](main.py#L32)
  - [`def last_by(self, name)`](main.py#L36)
- [`class Agent`](main.py#L45)
  - [`def run(self, state)`](main.py#L50)
- [`def researcher_policy(state)`](main.py#L56)
- [`def writer_policy(state)`](main.py#L62)
- [`def reviewer_policy(state)`](main.py#L68)
- [`def make_team()`](main.py#L74)
- [`class StaticOrchestrator`](main.py#L82): Fixed sequential order, LangGraph-style deterministic edges.
  - [`def run(self, team, state, max_steps)`](main.py#L88)
- [`class HandoffOrchestrator`](main.py#L94): OpenAI Swarm-style: the current agent returns its own handoff target.
  - [`def run(self, team, state, max_steps)`](main.py#L100)
- [`class LLMSelectorOrchestrator`](main.py#L113): AutoGen GroupChat-style speaker selection. The selector function is
  - [`def run(self, team, state, max_steps)`](main.py#L121)
- [`def round_robin_selector(state, team)`](main.py#L131)
- [`def render_pool(label, state)`](main.py#L142)
- [`def main()`](main.py#L149)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
