# How it works: Report Judge

## `cli.py`

```text
Audit a research report JSON payload and publish inspectable claim evidence.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def audit_payload(payload)`](cli.py#L8)
- [`def with_evidence(result, evidence)`](cli.py#L39)
- [`def render(result)`](cli.py#L56)
- [`def main()`](cli.py#L93)

## `claims.py`

```text
Parse claims and citation references.

Lesson: projects/report-judge/stages/01-claims/docs/en.md
The implementation is original and uses explicit local data contracts.
Run its tests through scripts/project_test.py.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def parse_claims(text)`](claims.py#L11)

## `compare.py`

```text
Compare paired revisions with bootstrap intervals.

Lesson: projects/report-judge/stages/04-compare/docs/en.md
The implementation is original and uses explicit local data contracts.
Run its tests through scripts/project_test.py.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def compare(baseline, candidate, seed, samples)`](compare.py#L11)

## `demo.py`

Functions and classes, in file order (click to jump to the line):

- no functions or classes (a plain script)

## `metrics.py`

```text
Evidence score contract for stage 3; unavailable labels are explicit.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def score_report(text, evidence, expected_sources, facts)`](metrics.py#L7)

## `support.py`

```text
Check evidence before averaging scores.

Lesson: projects/report-judge/stages/02-support/docs/en.md
The implementation is original and uses explicit local data contracts.
Run its tests through scripts/project_test.py.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def support(claim, source)`](support.py#L11)
- [`def judge_claim(claim, evidence, threshold)`](support.py#L38)

## Run and test

From this folder:

```
python cli.py --help
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
