# How it works: The Shift from Chatbots to Long-Horizon Agents

## `main.py`

```text
METR-style time-horizon simulator — stdlib Python.

Given a doubling time and a baseline horizon, projects the 50% task-completion
horizon across future years. Separately, shows how per-step reliability
compounds across trajectories: a 99% per-step agent still fails a coin flip on
a 70-step task.

Pedagogical, not calibrated. The point is to hold the numbers in your head
before trusting an agent to run unattended.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class HorizonConfig`](main.py#L19)
- [`def horizon_at(cfg, months_from_now)`](main.py#L25): Project the 50% horizon at a given month offset.
- [`def months_to_cross(cfg, target_hours)`](main.py#L31): Months until horizon reaches target_hours.
- [`def end_to_end_reliability(per_step, steps)`](main.py#L37): Probability that every step succeeds in sequence.
- [`def max_steps_for_target(per_step, target)`](main.py#L42): Largest N such that per_step**N >= target.
- [`def fmt_hours(h)`](main.py#L49)
- [`def horizon_projection()`](main.py#L57): Plot the horizon forward using METR's fit slope.
- [`def reliability_compounding()`](main.py#L91): Show how per-step reliability decays across a trajectory.
- [`def deploy_gap_note()`](main.py#L127): Eval-context-gaming adjustment.
- [`def main()`](main.py#L144)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
