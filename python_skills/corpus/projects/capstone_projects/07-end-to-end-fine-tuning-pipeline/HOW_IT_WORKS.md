# How it works: Capstone 07 — End-to-End Fine-Tuning Pipeline (Data to SFT to DPO to Serve)

## `main.py`

```text
End-to-end fine-tuning pipeline orchestrator scaffold.

The hard architectural primitive is a reproducible pipeline DAG: data hygiene
-> SFT -> preference tuning -> quantization -> serving -> eval -> model card,
where each stage is declaratively configured (YAML-ish dict here) and each
stage consumes the previous stage's artifact by content hash. This scaffold
models the DAG, the artifact manifest, and the contamination check.

Run:  python main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Artifact`](main.py#L26)
  - [`def content_hash(self)`](main.py#L33)
- [`class Manifest`](main.py#L39)
  - [`def add(self, a)`](main.py#L42)
  - [`def get(self, name)`](main.py#L45)
  - [`def summary(self)`](main.py#L48)
- [`def stage_data(m, cfg)`](main.py#L60)
- [`def stage_contamination(m, cfg)`](main.py#L75)
- [`def stage_sft(m, cfg)`](main.py#L88)
- [`def stage_dpo(m, cfg)`](main.py#L100)
- [`def stage_quantize(m, cfg)`](main.py#L110)
- [`def stage_serve(m, cfg)`](main.py#L120)
- [`def stage_eval(m, cfg)`](main.py#L132)
- [`def stage_model_card(m, cfg)`](main.py#L143)
- [`def run_pipeline(cfg)`](main.py#L170)
- [`def main()`](main.py#L180)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
