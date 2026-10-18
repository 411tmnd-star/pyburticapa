# How it works: Video-Language Models: Temporal Tokens and Grounding

## `main.py`

```text
Video VLM frame sampler + temporal-grounding evaluator — stdlib.

Three toys:
  1. Uniform frame sampler.
  2. Dynamic-FPS sampler using motion proxy (synthetic per-frame motion scalar).
  3. Temporal-grounding evaluator with IoU-style scoring.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def uniform_sample(duration, n)`](main.py#L18)
- [`def dynamic_sample(motion, fps_cap, total_budget)`](main.py#L25): Allocate samples by per-second motion; cap per second at fps_cap.
- [`def iou(a_start, a_end, b_start, b_end)`](main.py#L43)
- [`class Event`](main.py#L50)
- [`def evaluate_grounding(predictions, ground_truth, tol_iou)`](main.py#L56)
- [`def demo_samplers()`](main.py#L76)
- [`def demo_grounding()`](main.py#L89)
- [`def arch_compare()`](main.py#L109)
- [`def main()`](main.py#L124)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
