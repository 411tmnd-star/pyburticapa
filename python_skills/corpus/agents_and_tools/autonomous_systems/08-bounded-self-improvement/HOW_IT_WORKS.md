# How it works: Bounded Self-Improvement Designs

## `main.py`

```text
Bounded self-improvement loop — stdlib Python.

The four primitives:
  1. invariants (module hashes / tool manifest)
  2. alignment anchor (immutable objective)
  3. multi-objective constraint (all axes must hold)
  4. regression detection (no axis drops beyond tolerance)

The loop applies each primitive as a gate. A proposed agent edit lands
only if every gate passes.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Agent`](main.py#L32)
- [`def apply(agent, s)`](main.py#L65)
- [`def perf_score(agent)`](main.py#L80)
- [`def safety_score(agent)`](main.py#L88)
- [`def mutate(a, allow_manifest_edit)`](main.py#L96)
- [`def gate_invariant(a)`](main.py#L123)
- [`def gate_anchor(a)`](main.py#L127)
- [`def gate_multi(perf, safety)`](main.py#L131)
- [`def gate_regression(history_perf, perf, tol)`](main.py#L135): Reject if `perf` drops more than `tol` below the historical best.
- [`def run(gates, allow_manifest_edit, cycles, seed)`](main.py#L147)
- [`def main()`](main.py#L197)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
