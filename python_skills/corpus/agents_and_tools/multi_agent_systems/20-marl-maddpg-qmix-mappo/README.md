# MARL — MADDPG, QMIX, MAPPO

The reinforcement-learning heritage of multi-agent coordination, which still informs LLM-agent systems in 2026. **MADDPG** (Lowe et al., NeurIPS 2017, arXiv:1706.02275) introduced Centralized Training, Decentralized Execution (CTDE): each critic sees all agents' states and actions during training; at test time only local actors run. Works for cooperative, competitive, and mixed settings. **QMIX** (Rashid et al., ICML 2018, arXiv:1803.11485) is value-decomposition with a monotonic mixing network; per-agent Qs combine into joint Q so `argmax` distributes cleanly — dominant on StarCraft Multi-Agent Challenge (SMAC). **MAPPO** (Yu et al., NeurIPS 2022, arXiv:2103.01955) is PPO with a centralized value function; "surprisingly effective" on particle-world, SMAC, Google Research Football, Hanabi with minimal tuning. These underpin training policies for agent teams that must act decentrally. MAPPO is the **default 2026 cooperative-MARL baseline**. This lesson builds each from a small grid-world toy and lands the three ideas in muscle memory before touching LLM-agent training.

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
