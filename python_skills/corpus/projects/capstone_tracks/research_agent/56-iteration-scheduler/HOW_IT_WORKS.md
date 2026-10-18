# How it works: Iteration Scheduler

## `code/main.py`

```text
Auto-research orchestrator: hypothesis queue, parallel slots, UCB scoring, fan-out.

Conceptual references:
- ./docs/en.md (this lesson)
- Phase 19 lesson 54 (paper writer; receives paper.trigger fan-out)
- Phase 19 lesson 55 (critic loop; consumes results downstream)
- Phase 19 lessons 50-53 (earlier auto-research stages)

Stdlib + numpy only. Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Hypothesis`](code/main.py#L25)
  - [`def to_dict(self)`](code/main.py#L30)
- [`class Result`](code/main.py#L35)
  - [`def to_dict(self)`](code/main.py#L41)
- [`class BranchStats`](code/main.py#L51)
  - [`def mean(self)`](code/main.py#L59)
  - [`def to_dict(self)`](code/main.py#L62)
- [`class TraceEvent`](code/main.py#L74)
  - [`def to_dict(self)`](code/main.py#L78)
- [`class SchedulerReport`](code/main.py#L83)
  - [`def to_dict(self)`](code/main.py#L91)
- [`def ucb_score(branch_stats, total_runs, c)`](code/main.py#L106)
- [`class IterationScheduler`](code/main.py#L114): Drives a hypothesis queue across N parallel asyncio slots with UCB picking.
  - [`def _pick_next(self, queue, stats)`](code/main.py#L143)
  - [`def run(self, seed)`](code/main.py#L158)
- [`def make_deterministic_runner(base_rewards, noise, delay_ms, seed)`](code/main.py#L297): Build an async experiment runner whose reward is base_reward + N(0, noise).
- [`def deterministic_expander(result)`](code/main.py#L319): Spawn two follow-up hypotheses on the same branch with a monotonic id.
- [`def demo_async()`](code/main.py#L328)
- [`def demo()`](code/main.py#L348)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
