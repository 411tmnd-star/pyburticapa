# How it works: Capstone 09 — Code Migration Agent (Repo-Level Language / Runtime Upgrade)

## `main.py`

```text
Code migration agent — deterministic recipes + agent-loop fallback scaffold.

The hard architectural primitive is the two-layer structure: deterministic
recipe pass first (fast, auditable, safe), then agent loop for remaining
failures with a hard budget and a failure-classification step that feeds a
taxonomy dashboard. This scaffold implements both layers and runs a
50-repo simulation with mixed outcomes.

Run:  python main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Repo`](main.py#L34)
- [`class Attempt`](main.py#L42)
- [`def run_recipes(repo)`](main.py#L58): Returns number of rewrites applied.
- [`def agent_loop(attempt, rng)`](main.py#L73): Simulates the plan-act loop until pass or budget exhaustion.
- [`def classify_failure(rng)`](main.py#L112): Stand-in for the agent's failure classifier. Real implementation
- [`def migrate(repo, rng)`](main.py#L135)
- [`def synth_bench(rng)`](main.py#L163)
- [`def main()`](main.py#L175)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
