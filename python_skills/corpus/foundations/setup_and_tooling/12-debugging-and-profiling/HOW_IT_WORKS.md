# How it works: Debugging and Profiling

## `debug_tools.py`

Functions and classes, in file order (click to jump to the line):

- [`def debug_print(name, tensor)`](debug_tools.py#L20)
- [`class Timer`](debug_tools.py#L28)
- [`def check_shapes(model, sample_input)`](debug_tools.py#L42)
- [`def detect_nan(model, loss, step)`](debug_tools.py#L64)
- [`def check_devices(model)`](debug_tools.py#L77)
- [`def check_gradient_health(model)`](debug_tools.py#L85)
- [`def demo_print_debugging()`](debug_tools.py#L100)
- [`def demo_timing()`](debug_tools.py#L114)
- [`def demo_memory_tracking()`](debug_tools.py#L128)
- [`def demo_shape_checking()`](debug_tools.py#L149)
- [`def demo_nan_detection()`](debug_tools.py#L164)
- [`def demo_device_checking()`](debug_tools.py#L192)
- [`def demo_gradient_health()`](debug_tools.py#L209)
- [`def demo_gpu_memory()`](debug_tools.py#L228)
- [`def demo_logging()`](debug_tools.py#L253)
- [`def demo_conditional_breakpoint()`](debug_tools.py#L263)
- [`def main()`](debug_tools.py#L281)

## Run and test

From this folder:

```
python debug_tools.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
