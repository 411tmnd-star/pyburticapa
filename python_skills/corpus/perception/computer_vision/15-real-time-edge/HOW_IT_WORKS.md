# How it works: Real-Time Vision — Edge Deployment

## `main.py`

Functions and classes, in file order (click to jump to the line):

- [`def measure_latency(model, input_shape, device, warmup, iters)`](main.py#L6)
- [`def parameter_count(model)`](main.py#L32)
- [`def flops_estimate(model, input_shape)`](main.py#L36)
- [`def compare_backbones(resolution)`](main.py#L64)
- [`def main()`](main.py#L89)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
