# Handoffs and Routines — Stateless Orchestration

OpenAI's Swarm (October 2024) distilled multi-agent orchestration to two primitives: **routines** (instructions + tools as a system prompt) and **handoffs** (a tool that returns another Agent). No state machine, no branching DSL — the LLM routes by calling the right handoff tool. The OpenAI Agents SDK (March 2025) is the production successor. Swarm itself remains the cleanest conceptual reference — its entire source fits in a few hundred lines. The pattern is viral because the API surface is roughly "agent = prompt + tools; handoff = function returning agent." Limitation: stateless, so memory is the caller's problem.

```
python main.py
```

Needs: standard library only

| File | Open it to… |
|---|---|
| [`main.py`](main.py) | read and run the code |
| [`HOW_IT_WORKS.md`](HOW_IT_WORKS.md) | understand how the code is built |
| [`THEORY.md`](THEORY.md) | learn the idea behind it |
| [`LINKS.md`](LINKS.md) | quiz, diagrams, other languages, skill files, the original |
