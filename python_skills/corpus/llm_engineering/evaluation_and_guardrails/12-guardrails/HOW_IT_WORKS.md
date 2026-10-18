# How it works: Guardrails, Safety & Content Filtering

## `guardrails.py`

Functions and classes, in file order (click to jump to the line):

- [`class GuardrailResult`](guardrails.py#L9)
- [`class GuardrailReport`](guardrails.py#L18)
- [`def detect_injection(text)`](guardrails.py#L80)
- [`def detect_pii(text)`](guardrails.py#L112)
- [`def classify_topic(text)`](guardrails.py#L135)
- [`def check_length(text, max_chars, max_words)`](guardrails.py#L157)
- [`def filter_toxicity(text)`](guardrails.py#L173)
- [`def scrub_pii_from_output(text)`](guardrails.py#L194)
- [`def check_relevance(input_text, output_text, threshold)`](guardrails.py#L230)
- [`def check_system_prompt_leak(output_text, system_prompt, threshold)`](guardrails.py#L263)
- [`class GuardrailPipeline`](guardrails.py#L286)
  - [`def validate_input(self, user_input)`](guardrails.py#L292)
  - [`def validate_output(self, user_input, model_output)`](guardrails.py#L300)
  - [`def process(self, user_input, model_fn)`](guardrails.py#L309)
  - [`def _simulate_llm(self, user_input)`](guardrails.py#L351)
  - [`def _log_event(self, user_input, output, report)`](guardrails.py#L362)
  - [`def get_stats(self)`](guardrails.py#L371)
- [`class GuardrailMonitor`](guardrails.py#L382)
  - [`def record(self, report, user_input)`](guardrails.py#L388)
  - [`def summary(self)`](guardrails.py#L403)
  - [`def print_dashboard(self)`](guardrails.py#L421)
- [`def run_demo()`](guardrails.py#L439)

## Run and test

From this folder:

```
python guardrails.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
