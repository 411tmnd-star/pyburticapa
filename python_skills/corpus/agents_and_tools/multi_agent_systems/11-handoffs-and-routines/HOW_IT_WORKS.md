# How it works: Handoffs and Routines — Stateless Orchestration

## `main.py`

```text
Handoff-driven orchestration -- OpenAI Swarm in miniature.

Two primitives:
  - Agent(name, instructions, functions)
  - handoff = a function returning an Agent

Run loop detects Agent-valued returns and switches the active agent.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Agent`](main.py#L16)
- [`class Msg`](main.py#L23)
- [`def triage_agent_factory()`](main.py#L29)
- [`def refund_agent_factory()`](main.py#L46)
- [`def sales_agent_factory()`](main.py#L57)
- [`def support_agent_factory()`](main.py#L68)
- [`def scripted_router(current, user_msg)`](main.py#L85): Stands in for an LLM that reads the user message and the current agent's
- [`def run_swarm(start_agent, user_messages)`](main.py#L113)
- [`def render(history)`](main.py#L129)
- [`def main()`](main.py#L135)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
