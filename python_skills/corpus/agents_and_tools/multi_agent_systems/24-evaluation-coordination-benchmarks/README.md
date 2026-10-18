# Evaluation and Coordination Benchmarks

Five 2025-2026 benchmarks cover the multi-agent evaluation space. **MultiAgentBench / MARBLE** (ACL 2025, arXiv:2503.01935) evaluates star/chain/tree/graph topologies with milestone KPIs; **graph is best for research**, cognitive planning adds ~3% milestone achievement. **COMMA** evaluates multimodal asymmetric-information coordination; state-of-the-art models including GPT-4o struggle to beat a random baseline. **MedAgentBoard** (arXiv:2505.12371) covers four medical task categories and often finds multi-agent does not dominate single-LLM. **AgentArch** (arXiv:2509.10769) benchmarks enterprise agent architectures combining tool-use + memory + orchestration. **SWE-bench Pro** ([arXiv:2509.16941](https://arxiv.org/abs/2509.16941)) has 1865 problems across 41 repos spanning business apps, B2B services, and developer tools; frontier models score ~23% on Pro vs 70%+ on Verified — a reality check on contamination. Claude Opus 4.7 (April 2026) is reported at **64.3%** on Pro with explicit agent-teams coordination (no Anthropic primary source published yet — treat as preliminary); Verdent (agent scaffold) hits **76.1% pass@1** on Verified ([Verdent technical report](https://www.verdent.ai/blog/swe-bench-verified-technical-report)). **AAAI 2026 Bridge Program WMAC** (https://multiagents.org/2026/) is the 2026 community focal point. This lesson builds on MARBLE's metrics, runs a topology-vs-metric sweep, and pins the "just passing SWE-bench Verified is not evidence of generalization" rule.

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
