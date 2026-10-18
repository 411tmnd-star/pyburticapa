# How it works: Managed LLM Platforms — Bedrock, Vertex AI, Azure OpenAI

## `main.py`

```text
Managed LLM platform comparator — stdlib Python.

Models three platforms (Bedrock on-demand, Azure PTU, Vertex on-demand) on the
same synthetic workload. Reports per-day cost, TTFT median / P99, and attribution
fidelity. Pedagogical: prices and latencies are 2026 public-domain approximations.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Platform`](main.py#L16)
- [`def simulate(tokens_in_per_day, tokens_out_per_day, sla_ttft_ms, use_ptu)`](main.py#L35)
- [`def break_even_demo()`](main.py#L65)
- [`def lock_in_cost()`](main.py#L80)
- [`def main()`](main.py#L97)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
