# How it works: Capstone 82 — Jailbreak Taxonomy

## `code/main.py`

```text
Jailbreak Taxonomy loader, validator, and trigram nearest-fixture matcher.

The taxonomy is a partition of attacks by which trust boundary they abuse.
Six categories, fifty hand-built fixtures in fixtures.py. This module loads
that corpus, validates invariants, exposes lookup methods, and serializes a
stable JSON artifact for downstream lessons (83-87).

Run: python3 main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Fixture`](code/main.py#L33)
- [`class MatchResult`](code/main.py#L43)
- [`def _trigrams(text)`](code/main.py#L49)
- [`def _cosine(a, b)`](code/main.py#L60)
- [`class Taxonomy`](code/main.py#L74)
  - [`def from_default(cls)`](code/main.py#L92)
  - [`def validate(self)`](code/main.py#L95)
  - [`def all(self)`](code/main.py#L116)
  - [`def by_category(self)`](code/main.py#L119)
  - [`def stats(self)`](code/main.py#L125)
  - [`def match(self, prompt)`](code/main.py#L138)
  - [`def score_matrix(self, prompts)`](code/main.py#L150)
  - [`def serialize(self)`](code/main.py#L157)
- [`def _ensure_outputs_dir()`](code/main.py#L166)
- [`def write_taxonomy_json(tax)`](code/main.py#L171)
- [`def demo()`](code/main.py#L179)

## `code/fixtures.py`

```text
Hand-built corpus of 50 jailbreak fixtures across six categories.

Every prompt below is original. Targets are intentionally generic (the made-up
"PolicyBot" assistant) and the harmful intent is left abstract (REDACTED_HARMFUL)
so the file works as a teaching artifact without carrying anything operational.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def fixtures()`](code/fixtures.py#L423)

## `code/tests.py`

```text
Unit tests for the jailbreak taxonomy loader and matcher.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class TestCorpusInvariants`](code/tests.py#L13)
  - [`def setUp(self)`](code/tests.py#L14)
  - [`def test_total_is_fifty(self)`](code/tests.py#L17)
  - [`def test_every_category_meets_minimum(self)`](code/tests.py#L20)
  - [`def test_unique_ids(self)`](code/tests.py#L25)
  - [`def test_severity_in_range(self)`](code/tests.py#L29)
- [`class TestValidationFailures`](code/tests.py#L36)
  - [`def test_empty_corpus_rejected(self)`](code/tests.py#L37)
  - [`def test_duplicate_id_rejected(self)`](code/tests.py#L41)
  - [`def test_bad_severity_rejected(self)`](code/tests.py#L49)
  - [`def test_unknown_category_rejected(self)`](code/tests.py#L55)
- [`class TestMatcher`](code/tests.py#L62)
  - [`def setUp(self)`](code/tests.py#L63)
  - [`def test_match_returns_fixture(self)`](code/tests.py#L66)
  - [`def test_self_match_is_perfect(self)`](code/tests.py#L70)
  - [`def test_base64_probe_lands_in_encoding(self)`](code/tests.py#L76)
  - [`def test_prefix_probe_lands_in_prefix(self)`](code/tests.py#L80)
  - [`def test_score_matrix_shape(self)`](code/tests.py#L84)
- [`class TestArtifact`](code/tests.py#L90)
  - [`def test_serialize_round_trip(self)`](code/tests.py#L91)
  - [`def test_write_artifact_creates_file(self)`](code/tests.py#L99)

## Run and test

From this folder:

```
python code/main.py
python code/tests.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
