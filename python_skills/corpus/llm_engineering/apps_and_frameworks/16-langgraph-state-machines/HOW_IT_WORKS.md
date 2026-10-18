# How it works: Agent State Machines — Graphs, Nodes, Checkpoints

## `main.py`

```text
Minimal LangGraph ReAct agent with a checkpointer, an interrupt, and time-travel.

Runs with an Anthropic API key (`ANTHROPIC_API_KEY`). The agent has two toy
tools (calculator, web_lookup). It:

1. Builds a four-node StateGraph (agent -> tools -> agent) with `add_messages`
   as the reducer for the message list.
2. Compiles with a `MemorySaver` checkpointer and an `interrupt_before` on the
   `tools` node so we pause before any side effect.
3. Runs a two-turn conversation, streaming update events.
4. Pauses before the first tool call, inspects the pending tool_calls, then
   resumes with `Command(resume=True)`.
5. Prints the checkpoint history and demonstrates time-travel by forking from
   an earlier checkpoint.

Install:
    pip install "langgraph>=0.2.50" "langchain-anthropic>=0.3.0"

Run:
    python main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class State`](main.py#L41)
- [`def calculator(expression)`](main.py#L49): Evaluate a Python arithmetic expression like '2 + 2 * 3'. Returns the
- [`def web_lookup(query)`](main.py#L62): Fake web search. Returns canned facts for known queries and 'unknown'
- [`def build_app()`](main.py#L78): Wire the four-node ReAct graph and return (compiled_app, llm_with_tools).
- [`def pretty(msg)`](main.py#L109)
- [`def run()`](main.py#L117)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
