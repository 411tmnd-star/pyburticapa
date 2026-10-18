# How it works: Capstone Lesson 28: Observability with OTel GenAI Spans and Prometheus Metrics

## `main.py`

```text
Observability for an agent harness: GenAI spans + Prometheus metrics.

See: phases/19-capstone-projects/28-observability-otel-traces/docs/en.md
Concept refs:
  - OpenTelemetry GenAI semantic conventions (gen_ai.* attribute keys).
  - Prometheus text exposition format (counters and histograms).
  - W3C Trace Context (16-byte trace_id, 8-byte span_id).
The demo at the bottom emits spans to a temp jsonl, prints the
Prometheus exposition, and exits zero.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class SpanEvent`](main.py#L61): Discrete event recorded inside a span (per OTel).
  - [`def to_dict(self)`](main.py#L68)
- [`class GenAISpan`](main.py#L77): A single span shaped to OTel GenAI conventions.
  - [`def duration_ms(self)`](main.py#L93)
  - [`def to_dict(self)`](main.py#L98)
- [`def new_trace_id()`](main.py#L119): Random 16-byte hex string. Matches W3C trace context.
- [`def new_span_id()`](main.py#L125): Random 8-byte hex string. Matches W3C trace context span id.
- [`def now_unix_nano()`](main.py#L131)
- [`class JSONLExporter`](main.py#L141): Append-only exporter: one span per JSON line.
  - [`def _ensure_open(self)`](main.py#L148)
  - [`def export(self, span)`](main.py#L153)
  - [`def close(self)`](main.py#L159)
- [`class InMemoryExporter`](main.py#L165): Test-friendly exporter that keeps spans in a list.
  - [`def export(self, span)`](main.py#L171)
  - [`def close(self)`](main.py#L174)
- [`def _label_key(labels)`](main.py#L183)
- [`def _format_labels(labels)`](main.py#L187)
- [`class Counter`](main.py#L198): A simple labelled counter.
  - [`def inc(self, labels, by)`](main.py#L205)
  - [`def get(self, labels)`](main.py#L209)
- [`class Histogram`](main.py#L214): A histogram with explicit buckets, in line with OTel's default ms set.
  - [`def observe(self, value, labels)`](main.py#L236)
  - [`def bucket_counts(self, labels)`](main.py#L240)
  - [`def total_count(self, labels)`](main.py#L251)
  - [`def total_sum(self, labels)`](main.py#L254)
- [`class MetricsRegistry`](main.py#L259)
  - [`def counter(self, name, help)`](main.py#L263)
  - [`def histogram(self, name, help)`](main.py#L268)
- [`def prometheus_exposition(registry)`](main.py#L274): Render the registry into Prometheus text exposition format.
- [`def _format_le(bound)`](main.py#L317)
- [`class SpanBuilder`](main.py#L329): Owns a trace id and emits spans through one or more exporters.
  - [`def span(self, name, attributes, parent, kind)`](main.py#L337)
- [`def run_demo()`](main.py#L391)

## Run and test

From this folder:

```
python main.py
python -m unittest discover -s tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
