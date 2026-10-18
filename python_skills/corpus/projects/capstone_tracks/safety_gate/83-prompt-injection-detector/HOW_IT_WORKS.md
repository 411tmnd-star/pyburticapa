# How it works: Capstone 83 — Prompt Injection Detector

## `code/main.py`

```text
Prompt injection detector with normalize -> substring -> regex pipeline.

Reads the taxonomy artifact from lesson 82, runs the layered detector across
every fixture, runs it across a benign corpus, and writes a per-category
precision/recall report to outputs/detector_report.json.

Run: python3 main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Verdict`](code/main.py#L38)
- [`class PerCategoryMetrics`](code/main.py#L45)
  - [`def precision(self)`](code/main.py#L53)
  - [`def recall(self)`](code/main.py#L58)
  - [`def f1(self)`](code/main.py#L63)
- [`def normalize(text)`](code/main.py#L68)
- [`def _try_decode_base64(text)`](code/main.py#L79)
- [`def _try_decode_hex(text)`](code/main.py#L92)
- [`def _try_rot13(text)`](code/main.py#L110)
- [`class Detector`](code/main.py#L123)
  - [`def analyze(self, prompt)`](code/main.py#L137)
- [`def load_taxonomy()`](code/main.py#L162)
- [`def evaluate(detector, fixtures, benign)`](code/main.py#L171)
- [`def write_report(report)`](code/main.py#L224)
- [`def demo()`](code/main.py#L231)

## `code/benign.py`

```text
Benign prompt corpus for false-positive measurement.

Hand-built. These prompts must NOT trigger the detector. If they do, the
rules are over-broad and need narrowing.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def prompts()`](code/benign.py#L36)

## `code/rules.py`

```text
Detector rules as data. Each rule has a category, a base score, and one of
substring or regex. Substring rules match case-insensitive on the normalized
text. Regex rules use re.IGNORECASE.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def all_rules()`](code/rules.py#L67)

## `code/tests.py`

```text
Unit tests for the prompt injection detector.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class TestNormalize`](code/tests.py#L11)
  - [`def test_zero_width_stripped(self)`](code/tests.py#L12)
  - [`def test_leet_mapped(self)`](code/tests.py#L18)
  - [`def test_base64_revealed(self)`](code/tests.py#L22)
  - [`def test_hex_revealed(self)`](code/tests.py#L27)
- [`class TestDetectorAnalyze`](code/tests.py#L33)
  - [`def setUp(self)`](code/tests.py#L34)
  - [`def test_benign_prompt_returns_benign(self)`](code/tests.py#L37)
  - [`def test_ignore_previous_fires_override(self)`](code/tests.py#L42)
  - [`def test_base64_decode_fires_encoding(self)`](code/tests.py#L47)
  - [`def test_sure_here_fires_prefix(self)`](code/tests.py#L51)
  - [`def test_unchained_persona_fires_roleplay(self)`](code/tests.py#L55)
  - [`def test_rules_must_have_substring_or_regex(self)`](code/tests.py#L59)
- [`class TestMetrics`](code/tests.py#L64)
  - [`def test_precision_recall_f1_zero_safe(self)`](code/tests.py#L65)
  - [`def test_perfect_precision_recall(self)`](code/tests.py#L71)
- [`class TestEndToEndEvaluation`](code/tests.py#L78)
  - [`def test_full_evaluation_runs(self)`](code/tests.py#L79)
  - [`def test_benign_pass_through_majority(self)`](code/tests.py#L89)

## Run and test

From this folder:

```
python code/main.py
python code/tests.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
