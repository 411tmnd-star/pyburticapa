# How it works: Caching, Rate Limiting & Cost Optimization

## `caching_cost.py`

Functions and classes, in file order (click to jump to the line):

- [`def calculate_cost(model, input_tokens, output_tokens, cached_input_tokens)`](caching_cost.py#L25)
- [`class ExactCache`](caching_cost.py#L46)
  - [`def _hash(self, model, messages, temperature)`](caching_cost.py#L54)
  - [`def get(self, model, messages, temperature)`](caching_cost.py#L58)
  - [`def put(self, model, messages, temperature, response)`](caching_cost.py#L73)
  - [`def stats(self)`](caching_cost.py#L86)
- [`def simple_embed(text)`](caching_cost.py#L96)
- [`def cosine_similarity(a, b)`](caching_cost.py#L107)
- [`class SemanticCache`](caching_cost.py#L115)
  - [`def get(self, query)`](caching_cost.py#L124)
  - [`def put(self, query, response)`](caching_cost.py#L143)
  - [`def stats(self)`](caching_cost.py#L155)
- [`class TokenBucketRateLimiter`](caching_cost.py#L165)
  - [`def _get_bucket(self, user_id, tier)`](caching_cost.py#L174)
  - [`def _refill(self, bucket)`](caching_cost.py#L189)
  - [`def check(self, user_id, tokens_needed, tier)`](caching_cost.py#L197)
  - [`def consume(self, user_id, tokens_used, tier)`](caching_cost.py#L210)
  - [`def get_usage(self, user_id)`](caching_cost.py#L216)
- [`class CostTracker`](caching_cost.py#L230)
  - [`def log_call(self, model, input_tokens, output_tokens, cached_input_tokens, latency_ms, user_id, cache_status)`](caching_cost.py#L236)
  - [`def _check_budget(self)`](caching_cost.py#L253)
  - [`def total_cost(self)`](caching_cost.py#L263)
  - [`def cost_by_model(self)`](caching_cost.py#L266)
  - [`def cache_savings(self)`](caching_cost.py#L278)
  - [`def summary(self)`](caching_cost.py#L288)
- [`def classify_complexity(query)`](caching_cost.py#L311)
- [`def route_model(query, tier)`](caching_cost.py#L320)
- [`def simulate_llm_call(model, query)`](caching_cost.py#L331)
- [`def run_demo()`](caching_cost.py#L344)

## Run and test

From this folder:

```
python caching_cost.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
