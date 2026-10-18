# How it works: Kill Switches, Circuit Breakers, and Canary Tokens

## `main.py`

```text
Kill switch + circuit breaker + canary simulator — stdlib Python.

Three detectors:
  1. kill switch: boolean outside the agent; checked every turn
  2. circuit breaker: opens on N identical tool calls in a row
  3. canary token: fake credential whose read triggers an alert

Trajectory exercises each detector. Classifier + budget layers from
Lessons 10 and 13 are orthogonal; this lesson is about the tripwires.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class CircuitBreaker`](main.py#L32)
  - [`def record(self, action_key)`](main.py#L37): Return True if the action may proceed, False if breaker is open.
- [`class Canary`](main.py#L53)
  - [`def check_read(self, turn, path)`](main.py#L56)
- [`class Action`](main.py#L66)
- [`def run_trajectory(traj, kill_switch)`](main.py#L71)
- [`def main()`](main.py#L106)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
