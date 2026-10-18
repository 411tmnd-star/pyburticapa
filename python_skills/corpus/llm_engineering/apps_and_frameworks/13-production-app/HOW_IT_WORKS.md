# How it works: Building a Production LLM Application

## `production_app.py`

Functions and classes, in file order (click to jump to the line):

- [`class ModelName`](production_app.py#L17)
- [`def resolve_primary_model()`](production_app.py#L23)
- [`class RequestLog`](production_app.py#L47)
- [`class CostTracker`](production_app.py#L65)
  - [`def record(self, user_id, model, input_tokens, output_tokens, cost)`](production_app.py#L74)
  - [`def summary(self)`](production_app.py#L82)
- [`class PromptTemplate`](production_app.py#L100)
- [`def select_prompt(template_name, user_id, variables)`](production_app.py#L167)
- [`def simple_embedding(text, dim)`](production_app.py#L187)
- [`def cosine_similarity(a, b)`](production_app.py#L198)
- [`class SemanticCache`](production_app.py#L207)
  - [`def get(self, query)`](production_app.py#L216)
  - [`def put(self, query, response)`](production_app.py#L243)
  - [`def stats(self)`](production_app.py#L255)
- [`class GuardrailResult`](production_app.py#L292)
- [`def check_input_guardrails(text)`](production_app.py#L299)
- [`def check_output_guardrails(text)`](production_app.py#L325)
- [`def estimate_tokens(text)`](production_app.py#L335)
- [`def calculate_cost(model, input_tokens, output_tokens)`](production_app.py#L339)
- [`def call_llm_with_retry(prompt, model, max_retries)`](production_app.py#L374)
- [`def call_with_fallback(prompt, preferred_model)`](production_app.py#L407)
- [`def stream_response(text)`](production_app.py#L430)
- [`class ProductionLLMService`](production_app.py#L438)
  - [`def handle_request(self, user_id, query, template_name, variables)`](production_app.py#L445)
  - [`def handle_streaming_request(self, user_id, query, template_name)`](production_app.py#L540)
  - [`def _blocked_response(self, request_id, user_id, template_name, guardrail_result, start_time)`](production_app.py#L552)
  - [`def _log_eval(self, request_id, template_name, version, result, latency_ms)`](production_app.py#L578)
  - [`def health_check(self)`](production_app.py#L589)
- [`def run_production_demo()`](production_app.py#L600)
- [`def main()`](production_app.py#L708)

## Run and test

From this folder:

```
python production_app.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
