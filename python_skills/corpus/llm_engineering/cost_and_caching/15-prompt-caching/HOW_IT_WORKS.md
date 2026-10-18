# How it works: Prompt Caching and Context Caching

## `main.py`

```text
Prompt caching accountant.

Simulates three provider caching regimes (Anthropic ephemeral 5m, Anthropic 1h,
OpenAI automatic, Gemini explicit) against a stream of requests and reports
write/read/miss counts plus blended cost per 1K requests.

Prices below are the April 2026 published rates for input tokens on the
provider's frontier model. Override by editing PRICES.

Run with:
    python main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Request`](main.py#L30): A single request. `prefix_tokens` is the cacheable prefix; `suffix_tokens` is user input.
- [`class CacheEntry`](main.py#L39)
- [`class ProviderStats`](main.py#L46)
  - [`def total_cost(self)`](main.py#L54)
- [`def simulate_anthropic(requests, ttl_seconds, seconds_between)`](main.py#L58)
- [`def simulate_openai(requests, seconds_between)`](main.py#L78): OpenAI's cache is automatic; we model it as always-on with 1h best-effort TTL.
- [`def simulate_gemini(requests, ttl_seconds, seconds_between)`](main.py#L98)
- [`def baseline_cost(requests, provider)`](main.py#L121)
- [`def make_traffic(n_requests, n_prefixes, prefix_size, suffix_size)`](main.py#L126)
- [`def print_report(name, stats, baseline, n)`](main.py#L137)
- [`def main()`](main.py#L148)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
