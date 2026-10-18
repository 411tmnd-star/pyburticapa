# Agent Economies, Token Incentives, Reputation

Long-horizon autonomous agents (METR's 1-hour to 8-hour work-curve) need economic agency. The emerging **5-layer stack** is: **DePIN** (physical compute) → **Identity** (W3C DIDs + reputation capital) → **Cognition** (RAG + MCP) → **Settlement** (account abstraction) → **Governance** (Agentic DAOs). Production agent-incentive networks include **Bittensor** (TAO subnets reward task-specific models), **Fetch.ai / ASI Alliance** (ASI-1 Mini LLM + FET token), and **Gonka** (transformer-based PoW that reallocates compute to productive AI tasks). Academic work: AAMAS 2025's decentralized LaMAS uses **Shapley-value credit attribution** to fairly reward contributing agents; Google Research "Mechanism design for large language models" proposes **token auctions** with second-price payment under monotone aggregation. This lesson builds a minimal agent marketplace, applies Shapley-value credit attribution to a multi-agent pipeline, and runs a second-price token auction so the game-theory machinery lands concretely.

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
