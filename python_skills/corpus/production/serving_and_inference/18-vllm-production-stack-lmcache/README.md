# Production Serving Stack — KV Offloading and Cache-Aware Routing

A production serving stack wires router, engines, and observability into one Kubernetes deployment — and treats KV cache as a resource that can leave the GPU. KV offloading extracts KV cache out of GPU memory and reuses it across queries and engines (CPU DRAM, then disk/Ceph). vLLM's production-stack is the reference deployment; LMCache is the offloading layer. The vLLM 0.11.0 KV Offloading Connector (January 2026) makes this asynchronous and pluggable via the Connector API (v0.9.0+). The offload path is usually hidden from the request path, though cache misses and promotions can add end-to-end latency. LMCache is valuable even without shared prefixes — when a GPU runs out of KV slots, preempted requests can be restored from CPU instead of recomputing prefill. Published benchmarks on 16x H100 (80GB HBM) across 4 a3-highgpu-4g: when KV cache exceeds HBM, both native CPU offload and LMCache substantially improve throughput; at low KV footprint, all configs match baseline with small overhead.

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
