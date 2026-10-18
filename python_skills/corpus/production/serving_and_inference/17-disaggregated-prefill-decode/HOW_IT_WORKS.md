# How it works: Disaggregated Prefill/Decode — NVIDIA Dynamo and llm-d

## `main.py`

```text
Colocated vs disaggregated serving simulator — stdlib Python.

Models one request through colocated (same GPU) vs disaggregated (prefill pool + decode pool + KV transfer).
Sweeps prompt length to find the crossover.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def ms_colocated(prompt, output)`](main.py#L19)
- [`def ms_disaggregated(prompt, output, use_rdma)`](main.py#L25)
- [`def main()`](main.py#L34)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
