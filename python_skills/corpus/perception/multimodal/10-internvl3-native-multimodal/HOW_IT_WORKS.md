# How it works: InternVL3: Native Multimodal Pretraining

## `main.py`

```text
InternVL3-style native pretraining corpus mixer + ViR router simulator.

Three toys:
  1. Corpus mix planner — given target percentages, compute steps per modality.
  2. ViR router sim — given a query distribution, estimate avg tokens per request.
  3. DvD throughput estimate — given encoder FLOPs and LLM FLOPs, pick serving.

Stdlib only. Not a real trainer; illustrates the accounting InternVL3 runs.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class CorpusMix`](main.py#L17)
  - [`def normalize(self)`](main.py#L23)
  - [`def steps(self, total)`](main.py#L30)
- [`class RouterTier`](main.py#L40)
- [`def vir_sim(tiers)`](main.py#L46)
- [`def dvd_throughput(encoder_flops, llm_flops, llm_tokens)`](main.py#L52)
- [`def posthoc_vs_native_table()`](main.py#L60)
- [`def main()`](main.py#L79)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
