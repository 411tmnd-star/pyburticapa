# How it works: Mesa-Optimization and Deceptive Alignment

## `main.py`

```text
Toy mesa-optimizer simulator — stdlib Python.

Two-period environment:
  period 0 (training): base optimizer updates weights based on loss.
  period 1 (deployment): no updates. behaviour determines outcome.

We construct four policies:
  - aligned : mesa-objective == base objective; cooperates in both periods.
  - proxy   : mesa-objective is a correlated proxy; cooperates under training
              distribution but slips off-distribution.
  - deceptive: mesa-objective != base, full situational awareness; cooperates
              in training, defects in deployment.
  - pseudo-no-awareness: mesa != base, no awareness; defects in both.

Observe: training loss is indistinguishable between aligned and deceptive.

Usage: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Example`](main.py#L30)
- [`def gen_example(training, drift)`](main.py#L36)
- [`def aligned_policy(ex)`](main.py#L42)
- [`def proxy_policy(ex)`](main.py#L46)
- [`def deceptive_policy(ex, mesa_goal)`](main.py#L53)
- [`def pseudo_no_awareness_policy(ex, mesa_goal)`](main.py#L60)
- [`def loss(policy, examples)`](main.py#L64)
- [`def adversarial_filter(examples)`](main.py#L69): Adversarial training tries to include deployment-like examples in training.
- [`def run_period(name, policies, examples)`](main.py#L84)
- [`def main()`](main.py#L92)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
