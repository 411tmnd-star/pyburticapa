# Swarm Optimization for LLMs (PSO, ACO)

Bio-inspired optimization is making an LLM comeback. **LMPSO** (arXiv:2504.09247) uses PSO where each particle's velocity is a prompt and the LLM generates the next candidate; works well on structured-sequence outputs (math expressions, programs). **Model Swarms** (arXiv:2410.11163) treats each LLM expert as a PSO particle on a model-weight manifold and reports **13.3% average gain** over 12 baselines on 9 datasets with just 200 instances. **SwarmPrompt** (ICAART 2025) hybridizes PSO + Grey Wolf for prompt optimization. **AMRO-S** (arXiv:2603.12933) is ACO-inspired pheromone specialists for multi-agent LLM routing — **4.7x speedup**, interpretable routing evidence, quality-gated asynchronous update that decouples inference from learning. This lesson implements PSO on prompt parameter space and ACO on agent routing, measures why these classical algorithms fit the LLM era, and when they do not.

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
