# Case Studies and the 2026 State of the Art

Three production-grade references to study end-to-end, each illustrating a different slice of multi-agent engineering. **Anthropic's Research system** (orchestrator-worker, 15x tokens, +90.2% over single-agent Opus 4, rainbow deployments) is the canonical supervisor case. **MetaGPT / ChatDev** (SOP-encoded role specialization for software engineering; ChatDev's "communicative dehallucination"; MacNet extension to >1000 agents via DAGs, arXiv:2406.07155) is the canonical role-decomposition case. **OpenClaw / Moltbook** (originally Clawdbot by Peter Steinberger, November 2025; renamed twice; 247k GitHub stars by March 2026; local ReAct-loop agents; Moltbook as an agent-only social network with ~2.3M agent accounts within days of launch, acquired by Meta 2026-03-10) illustrates what happens at population scale: emergent economic activity, prompt-injection risks, state-level regulation (China restricted OpenClaw on government computers, March 2026). **Framework landscape April 2026:** LangGraph and CrewAI lead production; AG2 is the community AutoGen continuation; Microsoft AutoGen is in maintenance mode (merged into Microsoft Agent Framework, RC Feb 2026); OpenAI Agents SDK is the production Swarm successor; Google ADK (April 2025) is the A2A-native entrant. Every major framework now ships MCP support; most ship A2A. This lesson reads each case end-to-end and distills the common patterns so you can pick the right reference for your next production system.

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
