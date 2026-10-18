# How it works: Capstone 84 — Refusal Evaluation

## `code/main.py`

```text
Refusal evaluation framework.

Runs labeled prompts through one or more mock LLM policies, classifies each
output as a refusal or an answer, computes under-refusal, over-refusal,
accuracy, ECE calibration, and a per-category breakdown for unsafe prompts.

Run: python3 main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class TrialResult`](code/main.py#L46)
- [`def classify_refusal(response)`](code/main.py#L54)
- [`def parse_confidence(response)`](code/main.py#L58)
- [`def _run_policy(policy, records, label_unsafe)`](code/main.py#L65)
- [`def _confusion(results)`](code/main.py#L81)
- [`def _ece(results, n_bins)`](code/main.py#L89)
- [`def _per_category_under_refusal(unsafe_results)`](code/main.py#L114)
- [`def evaluate_policy(name, policy)`](code/main.py#L126)
- [`def write_report(reports)`](code/main.py#L148)
- [`def demo()`](code/main.py#L155)

## `code/mock_llm.py`

```text
Mock LLM policies used by the refusal evaluator.

Each policy is a callable: (prompt: str) -> str. The response embeds an
explicit confidence tag like [conf=0.85] which the evaluator parses for
calibration. No network calls, no real model.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class _Policy`](code/mock_llm.py#L52)
- [`def policies()`](code/mock_llm.py#L70)

## `code/prompts.py`

```text
Labeled prompt corpus for refusal evaluation.

25 unsafe prompts drawn from the lesson 82 taxonomy (one per fixture id) and
30 safe prompts curated for this evaluation. Safe prompts are deliberately
non-overlapping with the lesson 83 benign corpus so the two evaluations stay
independent.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def unsafe()`](code/prompts.py#L99)
- [`def safe()`](code/prompts.py#L103)

## `code/tests.py`

```text
Unit tests for the refusal evaluation framework.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class TestRefusalClassifier`](code/tests.py#L19)
  - [`def test_i_cannot_is_refusal(self)`](code/tests.py#L20)
  - [`def test_answer_is_not_refusal(self)`](code/tests.py#L23)
  - [`def test_against_policy_is_refusal(self)`](code/tests.py#L26)
- [`class TestConfidenceParse`](code/tests.py#L30)
  - [`def test_explicit_conf_parsed(self)`](code/tests.py#L31)
  - [`def test_missing_conf_defaults_to_half(self)`](code/tests.py#L34)
- [`class TestMockPolicies`](code/tests.py#L38)
  - [`def test_strict_refuses_obvious_attack(self)`](code/tests.py#L39)
  - [`def test_leaky_answers_obvious_attack(self)`](code/tests.py#L43)
  - [`def test_over_cautious_refuses_benign_chemistry(self)`](code/tests.py#L47)
- [`class TestEvaluation`](code/tests.py#L52)
  - [`def test_evaluate_all_policies(self)`](code/tests.py#L53)
  - [`def test_leaky_has_higher_under_refusal_than_strict(self)`](code/tests.py#L63)
  - [`def test_over_cautious_has_higher_over_refusal_than_strict(self)`](code/tests.py#L68)
  - [`def test_safe_and_unsafe_corpora_populated(self)`](code/tests.py#L73)
- [`class TestECE`](code/tests.py#L78)
  - [`def test_ece_empty_safe(self)`](code/tests.py#L79)
  - [`def test_ece_zero_for_calibrated(self)`](code/tests.py#L82)
- [`class TestPerCategoryUnderRefusal`](code/tests.py#L91)
  - [`def test_breakdown_keys_match_categories(self)`](code/tests.py#L92)

## Run and test

From this folder:

```
python code/main.py
python code/tests.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
