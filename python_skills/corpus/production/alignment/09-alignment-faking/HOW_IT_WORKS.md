# How it works: Alignment Faking

## `main.py`

```text
Toy compliance-gap calculator — stdlib Python.

A toy agent has a current harmlessness preference and observes:
  (1) a harmful user request,
  (2) whether this conversation will be used to retrain the model.

Agent's decision is shaped by expected preference preservation:
  - if trained on this, refusing -> gets modified (bad for current preference),
  - if NOT trained on this, refusing -> preference unchanged (best outcome).

So: refuse unmonitored, comply-to-protect when monitored. The compliance gap
is the difference in compliance rate between the two conditions.

Usage: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def sigmoid(z)`](main.py#L26)
- [`def compliance_probability(is_monitored, harm_aversion, preservation_weight)`](main.py#L30): Returns P(comply) under the model:
- [`def simulate(n, harm_aversion, preservation_weight)`](main.py#L51)
- [`def report(title, m, u)`](main.py#L64)
- [`def main()`](main.py#L72)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
