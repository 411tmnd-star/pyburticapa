# How it works: Capstone 85 — Content Classifier Integration

## `code/main.py`

```text
Content classifier router.

Wires three output-side classifiers behind a single router that picks the
maximum severity, runs the corresponding action (block, redact, warn, log),
and returns a structured Action object the safety gate can consume.

Run: python3 main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Action`](code/main.py#L34)
- [`class Router`](code/main.py#L42)
  - [`def _max_severity(self, verdicts)`](code/main.py#L46)
  - [`def _apply_redactors(self, text, verdicts)`](code/main.py#L51)
  - [`def run(self, text)`](code/main.py#L60)
  - [`def decide(self, text, verdicts)`](code/main.py#L67)
- [`def write_report(actions)`](code/main.py#L113)
- [`def demo()`](code/main.py#L120)

## `code/classifiers.py`

```text
Three output-side classifiers and their redactors.

Each classifier exposes classify(text) -> ClassifierVerdict and
redact(text) -> str. Severity is one of none, low, medium, high. All are
rule-based so latency is zero and tests are deterministic.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class ClassifierVerdict`](code/classifiers.py#L20)
- [`def _max_severity(a, b)`](code/classifiers.py#L27)
- [`class ToxicityClassifier`](code/classifiers.py#L48)
  - [`def _negated_at(self, text, start)`](code/classifiers.py#L56)
  - [`def classify(self, text)`](code/classifiers.py#L60)
  - [`def redact(self, text)`](code/classifiers.py#L79)
- [`def _luhn(digits)`](code/classifiers.py#L94)
- [`class PIIClassifier`](code/classifiers.py#L107)
  - [`def classify(self, text)`](code/classifiers.py#L110)
  - [`def redact(self, text)`](code/classifiers.py#L135)
- [`def _trigrams(text)`](code/classifiers.py#L151)
- [`def _cosine(a, b)`](code/classifiers.py#L162)
- [`class InstructionLeakageClassifier`](code/classifiers.py#L176)
  - [`def classify(self, text)`](code/classifiers.py#L184)
  - [`def redact(self, text)`](code/classifiers.py#L201)
- [`def default_classifiers(system_prompt)`](code/classifiers.py#L208)

## `code/tests.py`

```text
Unit tests for the output-side classifiers and the router.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class TestToxicity`](code/tests.py#L15)
  - [`def setUp(self)`](code/tests.py#L16)
  - [`def test_clean_text_is_none(self)`](code/tests.py#L19)
  - [`def test_single_term_low(self)`](code/tests.py#L23)
  - [`def test_three_terms_high(self)`](code/tests.py#L28)
  - [`def test_negation_window_skips(self)`](code/tests.py#L32)
  - [`def test_redact_replaces_term(self)`](code/tests.py#L36)
- [`class TestPII`](code/tests.py#L42)
  - [`def setUp(self)`](code/tests.py#L43)
  - [`def test_email_is_medium(self)`](code/tests.py#L46)
  - [`def test_valid_card_is_high(self)`](code/tests.py#L50)
  - [`def test_invalid_card_not_flagged(self)`](code/tests.py#L54)
  - [`def test_redact_email_and_card(self)`](code/tests.py#L58)
  - [`def test_ip_address_low(self)`](code/tests.py#L63)
- [`class TestInstructionLeakage`](code/tests.py#L68)
  - [`def test_leaks_system_prompt(self)`](code/tests.py#L69)
  - [`def test_no_overlap_is_none(self)`](code/tests.py#L75)
- [`class TestRouterDecisions`](code/tests.py#L81)
  - [`def setUp(self)`](code/tests.py#L82)
  - [`def test_clean_is_log(self)`](code/tests.py#L85)
  - [`def test_low_toxicity_is_warn(self)`](code/tests.py#L89)
  - [`def test_email_is_redact(self)`](code/tests.py#L94)
  - [`def test_card_is_block(self)`](code/tests.py#L99)
- [`class TestRouterAggregation`](code/tests.py#L105)
  - [`def test_block_dominates_redact(self)`](code/tests.py#L106)
  - [`def test_metadata_lists_fired(self)`](code/tests.py#L111)

## Run and test

From this folder:

```
python code/main.py
python code/tests.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
