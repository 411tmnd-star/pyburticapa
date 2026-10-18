# How it works: Production Quantization — AWQ, GPTQ, GGUF K-quants, FP8, MXFP4/NVFP4

## `main.py`

```text
Toy quantization memory and throughput calculator — stdlib Python.

For a set of quantization formats and model sizes, compute:
  - weight memory
  - KV cache memory (separate, scales with concurrency and context)
  - activations memory (approximate)
  - relative decode throughput (memory-bandwidth-limited shape)

Formats are represented by effective weight bits and KV bits. Pedagogical.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Format`](main.py#L18)
- [`def memory_breakdown(params_b, fmt, concurrency, ctx)`](main.py#L37)
- [`def relative_throughput(fmt)`](main.py#L55): Decode is memory-bandwidth-limited. Fewer weight bytes per token = higher throughput.
- [`def gpu_check(total_gb)`](main.py#L61)
- [`def print_scenario(params_b, concurrency, ctx)`](main.py#L71)
- [`def main()`](main.py#L84)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
