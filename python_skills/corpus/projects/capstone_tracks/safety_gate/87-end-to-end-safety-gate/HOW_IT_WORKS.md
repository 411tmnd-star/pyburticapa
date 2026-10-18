# How it works: Capstone 87 — End-to-End Safety Gate

## `code/main.py`

```text
End-to-end safety gate demo over the lesson 82 taxonomy.

Loads the taxonomy artifact, runs all 50 fixtures plus a small benign list
through the SafetyGate, prints a per-action / per-category summary, and
writes outputs/gate_trace.json.

Run: python3 main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def load_fixtures()`](code/main.py#L37)
- [`def write_traces(payload)`](code/main.py#L45)
- [`def demo()`](code/main.py#L52)

## `code/mock_llm_stream.py`

```text
Streaming mock LLM with three scripted personas.

The model yields chunks of up to four tokens at a time. The 'attacker-lazy'
persona is supposed to be caught by the during-gen filter because it
produces an obvious continuation that the input detector might have missed.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def _persona(prompt)`](code/mock_llm_stream.py#L49)
- [`def stream(prompt, chunk_tokens)`](code/mock_llm_stream.py#L60)
- [`def persona_for(prompt)`](code/mock_llm_stream.py#L75)

## `code/safety_gate.py`

```text
SafetyGate composes detector, token-filter, classifier, and rules engine
into a single request lifecycle with a deterministic aggregation table.

Imports from sibling lesson directories via sys.path injection so the lesson
remains a single end-to-end demo without needing to package code.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def _load_module(name, path)`](code/safety_gate.py#L27)
- [`class PreGenVerdict`](code/safety_gate.py#L71)
- [`class DuringGenVerdict`](code/safety_gate.py#L78)
- [`class PostGenVerdict`](code/safety_gate.py#L85)
- [`class RequestTrace`](code/safety_gate.py#L93)
- [`class SafetyGate`](code/safety_gate.py#L105)
  - [`def _pre_gen(self, prompt)`](code/safety_gate.py#L117)
  - [`def _during_gen(self, chunks, buffer_cap)`](code/safety_gate.py#L121)
  - [`def _post_gen(self, output)`](code/safety_gate.py#L147)
  - [`def _aggregate(self, pre, during, post)`](code/safety_gate.py#L158)
  - [`def _apply_action(self, action, raw_output, post)`](code/safety_gate.py#L184)
  - [`def handle(self, prompt)`](code/safety_gate.py#L199)
- [`def trace_to_dict(t)`](code/safety_gate.py#L236)

## `code/tests.py`

```text
Unit tests for the end-to-end safety gate.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class TestStreamingMock`](code/tests.py#L11)
  - [`def test_clean_persona(self)`](code/tests.py#L12)
  - [`def test_attacker_honest(self)`](code/tests.py#L15)
  - [`def test_attacker_lazy(self)`](code/tests.py#L18)
  - [`def test_stream_emits_chunks(self)`](code/tests.py#L21)
- [`class TestSafetyGateActions`](code/tests.py#L27)
  - [`def setUp(self)`](code/tests.py#L28)
  - [`def test_benign_allows(self)`](code/tests.py#L31)
  - [`def test_ignore_previous_blocks_pre_gen(self)`](code/tests.py#L36)
  - [`def test_encoding_attack_routes_to_action(self)`](code/tests.py#L42)
  - [`def test_prefix_attack_terminated_during_gen(self)`](code/tests.py#L46)
- [`class TestTraceStructure`](code/tests.py#L51)
  - [`def test_trace_has_all_checkpoints(self)`](code/tests.py#L52)
  - [`def test_trace_serializes_to_json_safe(self)`](code/tests.py#L60)
- [`class TestAggregator`](code/tests.py#L70)
  - [`def setUp(self)`](code/tests.py#L71)
  - [`def test_redact_when_classifier_redacts(self)`](code/tests.py#L74)
  - [`def test_block_takes_precedence(self)`](code/tests.py#L78)

## Run and test

From this folder:

```
python code/main.py
python code/tests.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
