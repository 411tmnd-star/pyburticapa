# How it works: Permission Modes for Autonomous Agents

## `main.py`

```text
Two-stage safety classifier simulator — stdlib Python.

Stage 1: cheap keyword rule (single-token-equivalent). Runs on every action.
Stage 2: slower multi-rule review (chain-of-thought-equivalent). Runs on
flagged actions only. HITL escalation if Stage 2 is not confident.

The driver feeds in a synthetic trajectory: benign actions, prompt injection,
a repetitive loop, and one "legitimate-channel exfiltration" composite. The
last case is the point: individual actions pass both stages while the
composition is the risk.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Verdict`](main.py#L19)
- [`class Action`](main.py#L28)
- [`def stage1(a, history)`](main.py#L52): Return True if Stage 1 flags the action.
- [`def stage2(a, history)`](main.py#L78): Return (verdict, reason). More expensive review of a flagged action
- [`def classify(trajectory)`](main.py#L107)
- [`def main()`](main.py#L138)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
