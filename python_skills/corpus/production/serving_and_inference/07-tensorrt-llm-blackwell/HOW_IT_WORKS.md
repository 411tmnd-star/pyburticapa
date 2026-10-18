# How it works: Hardware-Specialized Inference Compilation — FP8 and NVFP4 on Blackwell

## `main.py`

```text
Toy Blackwell + TRT-LLM economics calculator — stdlib Python.

Computes HBM footprint and decode throughput for a model under three stacks:
  H100 + BF16 + vLLM
  H100 + FP8 + vLLM
  B200 + NVFP4 weights / FP8 KV + TRT-LLM + Dynamo
  GB200 NVL72 + NVFP4 / FP8 + TRT-LLM + Dynamo

The decode-throughput model is memory-bandwidth-limited: tokens/sec is
proportional to HBM-bandwidth / bytes-per-token. Numbers are pedagogical
illustrations of the shape of the 2026 Blackwell economics.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Stack`](main.py#L20)
- [`def hbm_footprint_gb(params_b, active_b, seq_len, stack)`](main.py#L40)
- [`def decode_throughput(active_b, stack)`](main.py#L51): Tokens per second per GPU, memory-bandwidth-limited.
- [`def cost_per_million_tokens(active_b, stack)`](main.py#L60)
- [`def print_stack(params_b, active_b, seq_len)`](main.py#L66)
- [`def main()`](main.py#L79)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
