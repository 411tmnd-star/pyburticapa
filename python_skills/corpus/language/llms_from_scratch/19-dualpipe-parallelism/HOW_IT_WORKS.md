# How it works: DualPipe Parallelism

## `code/main.py`

```text
Pipeline schedule simulator — 1F1B vs Zero Bubble vs DualPipe vs DualPipeV.

Teaching tool. Counts pipeline bubbles per schedule for given (P, micro_batches).
Outputs:
  - bubble fraction per schedule at fixed (P, micro_batches)
  - scaling of bubbles as micro_batches grows

Not a production simulator. Forward/backward chunk costs are unit-normalized.
Comm costs are modeled as overlap windows, not full kernel models.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class ScheduleStats`](code/main.py#L19)
- [`def bubble_1f1b(P, M)`](code/main.py#L27): 1F1B: warmup phase has (P-1) forward slots without backward overlap.
- [`def bubble_zero_bubble(P, M)`](code/main.py#L38): Zero Bubble (Qi 2023) splits backward into B + W. The W part can fill
- [`def bubble_dualpipe(P, M)`](code/main.py#L48): DualPipe injects micro-batches from both ends of the pipeline. Stable
- [`def bubble_dualpipev(P, M)`](code/main.py#L57): DualPipeV uses a V-shape schedule on a single parameter copy. Its
- [`def summarize(P, M)`](code/main.py#L64)
- [`def gpu_hours_recovered(P, M, total_gpu_hours)`](code/main.py#L73)
- [`def main()`](code/main.py#L84)

## Run and test

From this folder:

```
python code/main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
