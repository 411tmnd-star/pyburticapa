# How it works: Capstone 11 — LLM Observability & Eval Dashboard

## `main.py`

```text
LLM observability dashboard — span ingest + tail sampling + eval scaffold.

The hard architectural primitive here is the tail-sampling collector plus
evals-as-child-spans: errored traces are always kept, success traces are
sampled, and every trace can be enriched with eval spans carrying scores.
This scaffold implements the full pipeline in stdlib: span model, sampler,
evals, drift detector, alerter.

Run:  python main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Span`](main.py#L27)
  - [`def is_llm(self)`](main.py#L38)
- [`class TailSampler`](main.py#L47)
  - [`def decide(self, trace)`](main.py#L51)
- [`class SpanStore`](main.py#L69)
  - [`def insert_trace(self, trace)`](main.py#L75)
- [`def eval_faithfulness(response, context)`](main.py#L90)
- [`def eval_toxicity(response)`](main.py#L99)
- [`def eval_pii_leak(response)`](main.py#L106)
- [`def prompt_fingerprint(prompt, n_bins)`](main.py#L119)
- [`def psi(a, b, n_bins)`](main.py#L124)
- [`def synth_trace(trace_id, leak_pii, rng)`](main.py#L145)
- [`def enrich_with_evals(trace)`](main.py#L177): Add eval child spans on each llm span.
- [`def alerter(store)`](main.py#L201)
- [`def main()`](main.py#L219)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
