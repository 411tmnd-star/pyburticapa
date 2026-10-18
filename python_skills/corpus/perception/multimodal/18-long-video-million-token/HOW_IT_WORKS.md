# How it works: Long-Video Understanding at Million-Token Context

## `main.py`

```text
Long-video token budget + needle-in-a-haystack simulator + agentic retrieval.

Stdlib. Prints budget tables for long videos, runs a synthetic NIH recall test,
simulates a VideoAgent-style retrieval loop.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def tokens(duration_s, fps, per_frame)`](main.py#L15)
- [`def budget_table()`](main.py#L19)
- [`class Needle`](main.py#L38)
- [`def nih_trial(duration_s, model_recall_curve)`](main.py#L43)
- [`def nih_simulation()`](main.py#L57)
- [`def agentic_retrieval_sim(question, video_duration)`](main.py#L72): Simulate VideoAgent: LLM asks for clip, tool returns timestamps, VLM reads.
- [`def agentic_demo()`](main.py#L86)
- [`def main()`](main.py#L97)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
