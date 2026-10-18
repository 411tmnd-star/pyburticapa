# Chaos Engineering for LLM Production

Chaos engineering for LLMs is its own discipline in 2026. Prerequisites before running experiments in production: defined SLI/SLO, trace+metric+log observability, automated rollback, runbooks, on-call. Architecture has four planes: control (experiment scheduler), target (services, infra, data stores), safety (guards + abort + traffic filters), observability (metrics + traces + logs), feedback (into SLO adjustments). Guardrails are mandatory: burn-rate alerts pause experiments if daily error-budget burn > 2x expected; suppression windows + trace-ID correlation dedupe alert noise. Cadence: weekly small canary + SLO review; monthly game day + postmortem; quarterly cross-team resilience audit + dependency mapping. LLM-specific experiments: memory overload, network failures, provider outages, malformed prompts, KV cache eviction storms. Tooling: Harness Chaos Engineering (LLM-derived recommendations, blast-radius downscaling, MCP tool integration); LitmusChaos (CNCF); Chaos Mesh (CNCF Kubernetes-native).

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
