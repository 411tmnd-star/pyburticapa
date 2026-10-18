# How it works: Edge Inference — Apple Neural Engine, Qualcomm Hexagon, WebGPU/WebLLM, Jetson

## `main.py`

```text
Edge-inference bandwidth-bound decode simulator — stdlib Python.

Computes theoretical decode throughput from (weights_bytes / bandwidth_bytes_per_sec)
for a range of edge targets. Compares to observed benchmarks. Demonstrates that
decode is memory-bound, not compute-bound, on edge devices.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Target`](main.py#L14)
- [`def ceiling(target, model_gb)`](main.py#L34)
- [`def efficiency(observed, ceiling_val)`](main.py#L39)
- [`def main()`](main.py#L45)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
