# How it works: LLaVA-OneVision: Single-Image, Multi-Image, Video in One Model

## `main.py`

```text
LLaVA-OneVision token budget + curriculum planner — stdlib.

Given a total visual-token budget per sample and a task-mix (single-image, multi-
image, video fractions), allocates:
  - AnyRes tile count and pooling factor for single-image
  - images-per-sample and per-image resolution for multi-image
  - frames-per-sample and per-frame pooling for video

Prints a stage-by-stage training schedule with expected FLOPs per sample.
Keeps the budget roughly constant across scenarios so the LLM never blows context.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Budget`](main.py#L19)
  - [`def max(self)`](main.py#L24)
  - [`def min(self)`](main.py#L27)
- [`def anyres_tokens(tiles, per_tile)`](main.py#L31)
- [`def per_tile_tokens(resolution, patch, pool)`](main.py#L35)
- [`def plan_single_image(budget)`](main.py#L41)
- [`def plan_multi_image(budget)`](main.py#L59)
- [`def plan_video(budget)`](main.py#L77)
- [`def print_plan(plan, budget)`](main.py#L95)
- [`def curriculum_stages(mix)`](main.py#L104)
- [`def main()`](main.py#L120)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
