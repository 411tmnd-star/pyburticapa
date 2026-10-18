# How it works: Building a Complete LLM Pipeline

## `code/main.py`

```text
End-to-end LLM pipeline orchestrator.

Twelve stages wired as a DAG. Each stage is a placeholder that emits a typed
artifact with a content-addressed hash. The orchestrator resolves dependencies,
runs stages, records a manifest, and applies eval gates before shipping.

No network, no GPUs, stdlib only. Replace each stage's `run` with the real
training script from the corresponding Phase 10 lesson.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class StageRecord`](code/main.py#L47)
- [`class Manifest`](code/main.py#L58)
- [`class ArtifactStore`](code/main.py#L70): In-memory stand-in for an S3 / R2 / GCS bucket addressed by SHA-256.
  - [`def put(self, blob)`](code/main.py#L76)
  - [`def get(self, h)`](code/main.py#L81)
  - [`def has(self, h)`](code/main.py#L84)
- [`def simulate_stage(name, stage_type, inputs, seed)`](code/main.py#L91): Placeholder: emits a deterministic blob, a wall-clock, and a cost.
- [`def plan(manifest)`](code/main.py#L117): Validate the manifest, print the DAG, compute the cost estimate.
- [`def run(manifest, store, injected_eval)`](code/main.py#L137): Execute stages in DAG order. Halts on budget or hash failure.
- [`def gate(manifest)`](code/main.py#L181): Apply each gate. Return (ship?, reasons).
- [`def manifest_to_json(manifest)`](code/main.py#L206)
- [`def main(argv)`](code/main.py#L211)

## Run and test

From this folder:

```
python code/main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
