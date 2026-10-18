# Voting, Self-Consistency, and Debate Topology

The cheapest aggregation: sample N independent agents, majority-vote. Wang et al. 2022 self-consistency did this with one model sampled N times. Multi-agent extends it with **heterogeneous** agents to escape monoculture — different models, different prompts, different temperatures, different contexts. Beyond majority vote, debate topology matters: MultiAgentBench (arXiv:2503.01935, ACL 2025) evaluated star / chain / tree / graph coordination and found **graph best for research**, with a "coordination tax" past ~4 agents. AgentVerse (ICLR 2024) documents two emergent patterns — volunteer behaviors and conformity behaviors — and conformity is both a feature (finding consensus) and a risk (groupthink, Lesson 24). This lesson maps the topology space, builds each variant, and measures the coordination tax.

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
