# Disaggregated Prefill/Decode — NVIDIA Dynamo and llm-d

Prefill is compute-bound; decode is memory-bound. Running both on the same GPU wastes one resource. Disaggregation splits them onto separate pools and transfers KV cache between them over NIXL (RDMA/InfiniBand or TCP fallback). NVIDIA Dynamo (GTC 2025 announce, 1.0 GA) sits above vLLM/SGLang/TRT-LLM — its Planner Profiler + SLA Planner auto-rate-match prefill:decode ratios to meet SLOs. NVIDIA publishes throughput gains in this ballpark — developer.nvidia.com (2025-06) shows a ~6x improvement for DeepSeek-R1 MoE on GB200 NVL72 + Dynamo in the medium-latency regime, and the Dynamo product page (developer.nvidia.com, undated) advertises up to 50x MoE throughput on GB300 NVL72 + Dynamo vs Hopper. The "30x" figure is a community aggregate across full-stack Blackwell + Dynamo + DeepSeek-R1 reports; we have not found a single primary source stating exactly 30x, so treat it as a directional claim. llm-d (Red Hat + AWS) is Kubernetes-native: prefill / decode / router as independent Services with per-role HPA. llm-d 0.5 adds hierarchical KV offloading, cache-aware LoRA routing, UCCL networking, scale-to-zero. Economics: internal rollup of multiple customer disclosures suggests 30–40% savings on $2M-class inference spend (i.e., $600-800K/year) when switching from colocated serving to disaggregated with Dynamo at constant SLA; the specific $2M→$600-800K figure is an internal composite, not a single published case study — use it as an order-of-magnitude anchor, not a reference citation. Short prompts (<512 tokens, short output) don't justify the transfer cost.

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
