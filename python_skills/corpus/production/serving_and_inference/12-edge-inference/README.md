# Edge Inference — Apple Neural Engine, Qualcomm Hexagon, WebGPU/WebLLM, Jetson

The core edge constraint is memory bandwidth, not compute. Mobile DRAM sits at 50-90 GB/s; datacenter HBM3 clears 2-3 TB/s — a 30-50x gap. Decode is memory-bound so the gap is decisive. In 2026 the landscape splits four ways. Apple M4/A18 Neural Engine peaks at 38 TOPS with unified memory (no CPU↔NPU copy). Qualcomm Snapdragon X Elite / 8 Gen 4 Hexagon hits 45 TOPS. WebGPU + WebLLM runs Llama 3.1 8B (Q4) at ~41 tok/s on M3 Max (roughly 70-80% of native); 17.6k GitHub stars, OpenAI-compatible API, ~70-75% mobile coverage. NVIDIA Jetson Orin Nano Super (8GB) fits Llama 3.2 3B / Phi-3; AGX Orin runs gpt-oss-20b via vLLM at ~40 tok/s; Jetson T4000 (JetPack 7.1) is 2x AGX Orin. TensorRT Edge-LLM supports EAGLE-3, NVFP4, chunked prefill — shown at CES 2026 by Bosch, ThunderSoft, MediaTek.

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
