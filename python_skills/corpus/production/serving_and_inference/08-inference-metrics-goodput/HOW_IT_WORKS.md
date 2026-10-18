# How it works: Inference Metrics — TTFT, TPOT, ITL, Goodput, P99

## `main.py`

```text
Toy goodput calculator — stdlib Python.

Simulate a population of LLM requests with realistic right-skewed latency,
apply a multi-constraint SLO, compute goodput, and show the GenAI-Perf
vs LLMPerf TPOT calculation divergence on the same trace.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class RequestTrace`](main.py#L16)
  - [`def ttft_ms(self)`](main.py#L23)
  - [`def e2e_ms(self)`](main.py#L27)
  - [`def tpot_llmperf(self)`](main.py#L30): LLMPerf: include TTFT in ITL calculation.
  - [`def tpot_genaiperf(self)`](main.py#L34): GenAI-Perf: ITL starts from token 2.
- [`def synth_workload(n, seed, tail_spike_rate)`](main.py#L41)
- [`def percentiles(values, ps)`](main.py#L60)
- [`def report_latency(label, traces)`](main.py#L65)
- [`def goodput(traces, slo_ttft, slo_tpot, slo_e2e)`](main.py#L85)
- [`def main()`](main.py#L94)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
