# How it works: AI Control — Safety Despite Subversion

## `main.py`

```text
AI Control protocol simulation — stdlib Python.

Four protocols on a toy backdoor task:
  baseline   : ship U's output directly.
  upfront    : audit every output with H (budget-limited).
  untrusted  : second U scores outputs (collusion-risk).
  trusted_ed : T edits every output; H on low-confidence T flags.

Outcomes: backdoor-ship rate (safety-inverted) and useful-output rate.

Usage: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def u_produce(backdoor_rate)`](main.py#L22): U produces an output. Returns (output, is_backdoored).
- [`def t_edit(output, is_backdoor, t_skill, overreject)`](main.py#L28): T edits. Returns (edited, still_backdoored, t_low_confidence).
- [`def untrusted_monitor(is_backdoor, collusion)`](main.py#L45): Second U instance scores. If it colludes, it passes backdoors.
- [`def run_protocol(name, backdoor_rate, h_budget, n, t_skill, collusion)`](main.py#L60)
- [`def main()`](main.py#L110)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
