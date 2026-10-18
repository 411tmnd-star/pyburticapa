# How it works: Capstone 86 — Constitutional Rules Engine

## `code/main.py`

```text
Constitutional rules engine.

Loads a YAML constitution, evaluates rules against a candidate text, and
produces structured violations with rule name, severity, explanation, and
matched span. The Fixer applies declarative repairs per rule; diff produces
a structured change list between draft and revised.

Run: python3 main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Violation`](code/main.py#L31)
- [`class RuleResult`](code/main.py#L39)
- [`class EngineReport`](code/main.py#L48)
  - [`def violations(self)`](code/main.py#L52)
  - [`def max_severity(self)`](code/main.py#L64)
- [`class Change`](code/main.py#L72)
- [`def _word_count(text)`](code/main.py#L77)
- [`def _eval_predicate(node, text)`](code/main.py#L81)
- [`class Engine`](code/main.py#L125)
  - [`def rules(self)`](code/main.py#L141)
  - [`def evaluate(self, text)`](code/main.py#L144)
- [`class Fixer`](code/main.py#L174)
  - [`def apply(self, text, violations)`](code/main.py#L178)
- [`def diff(draft, revised)`](code/main.py#L201)
- [`def write_report(payload)`](code/main.py#L247)
- [`def demo()`](code/main.py#L254)

## `code/tests.py`

```text
Unit tests for the constitutional rules engine.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class TestYamlSubset`](code/tests.py#L11)
  - [`def test_simple_mapping(self)`](code/tests.py#L12)
  - [`def test_nested_mapping(self)`](code/tests.py#L17)
  - [`def test_sequence_of_mappings(self)`](code/tests.py#L22)
  - [`def test_quoted_string(self)`](code/tests.py#L27)
  - [`def test_strips_comments(self)`](code/tests.py#L32)
- [`class TestEngineLoad`](code/tests.py#L38)
  - [`def test_default_constitution_loads(self)`](code/tests.py#L39)
  - [`def test_bad_severity_rejected(self)`](code/tests.py#L44)
  - [`def test_missing_required_field_rejected(self)`](code/tests.py#L49)
- [`class TestPredicates`](code/tests.py#L55)
  - [`def setUp(self)`](code/tests.py#L56)
  - [`def test_empty_refusal_flagged(self)`](code/tests.py#L59)
  - [`def test_clean_response_passes(self)`](code/tests.py#L64)
  - [`def test_internal_library_leak_flagged(self)`](code/tests.py#L68)
  - [`def test_long_response_flagged(self)`](code/tests.py#L73)
  - [`def test_not_applicable_reported(self)`](code/tests.py#L79)
- [`class TestFixer`](code/tests.py#L85)
  - [`def setUp(self)`](code/tests.py#L86)
  - [`def test_refusal_redirect_appended(self)`](code/tests.py#L90)
  - [`def test_internal_replaced(self)`](code/tests.py#L98)
- [`class TestDiff`](code/tests.py#L105)
  - [`def test_add_change_recorded(self)`](code/tests.py#L106)
  - [`def test_no_change_for_identical(self)`](code/tests.py#L110)
  - [`def test_edit_replaces_lines(self)`](code/tests.py#L113)

## `code/yaml_subset.py`

```text
Minimal YAML subset parser sufficient for the constitution file.

Supports:
- nested block mappings with two-space indentation
- block sequences ('- key: value' style)
- string scalars (plain, single-quoted, double-quoted)
- integer scalars
- inline list values on the right of ':' for simple atoms
- comments after '#' on a line

Does NOT support: anchors, aliases, tags, flow style, multi-doc, multi-line
folded/literal blocks. The constitution format avoids those by design.

If PyYAML is installed it is preferred via load_yaml; this fallback exists so
the lesson runs on any standard Python install.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def load_yaml(text)`](code/yaml_subset.py#L24)
- [`def _strip_comment(line)`](code/yaml_subset.py#L32)
- [`def _indent_of(line)`](code/yaml_subset.py#L45)
- [`def _coerce(value)`](code/yaml_subset.py#L49)
- [`def _parse(text)`](code/yaml_subset.py#L79)
- [`def _parse_block(lines, start, indent)`](code/yaml_subset.py#L91)
- [`def _parse_mapping(lines, start, indent)`](code/yaml_subset.py#L104)
- [`def _parse_sequence(lines, start, indent)`](code/yaml_subset.py#L136)

## Run and test

From this folder:

```
python code/main.py
python code/tests.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
