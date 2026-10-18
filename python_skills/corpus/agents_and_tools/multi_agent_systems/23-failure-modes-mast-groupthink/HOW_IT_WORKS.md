# How it works: Failure Modes — MAST, Groupthink, Monoculture, Cascading Errors

## `main.py`

```text
Failure modes: MAST categorizer, circuit breaker, retry-storm simulator.

Stdlib only. The simulator shows how a 10% downstream error rate amplifies
through retries to 10x load without a breaker; the breaker caps it.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def categorize_incident(symptoms)`](main.py#L31)
- [`def detect_groupthink(symptoms)`](main.py#L41)
- [`class BreakerState`](main.py#L58)
- [`class CircuitBreaker`](main.py#L65)
  - [`def _error_rate(self)`](main.py#L73)
  - [`def allow(self)`](main.py#L79)
  - [`def record(self, success)`](main.py#L87)
- [`class DownstreamService`](main.py#L104)
  - [`def handle(self, rng)`](main.py#L108)
- [`def simulate_retry_storm(requests, use_breaker, seed)`](main.py#L115)
- [`def demo_incident_categorization()`](main.py#L141)
- [`def demo_retry_storm()`](main.py#L163)
- [`def main()`](main.py#L175)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
