# How it works: Self-Improving Skill Loop

## `cli.py`

```text
Inspect a candidate, then promote only its exact approved digest.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def experiment(data, min_support)`](cli.py#L11)
- [`def atomic_write(path, payload)`](cli.py#L40)
- [`def promote(result, destination, approved_digest)`](cli.py#L55)
- [`def from_dataset_audit(data, receipt)`](cli.py#L79)
- [`def export_skill(result, directory)`](cli.py#L86)
- [`def main()`](cli.py#L119)

## `dataset.py`

```text
Leakage-aware development split: identities, content and groups form components.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def fingerprint(text)`](dataset.py#L7)
- [`def split_cases(cases, holdout_fraction)`](dataset.py#L13)
- [`def audit_partitions(development, holdout)`](dataset.py#L66)

## `demo.py`

Functions and classes, in file order (click to jump to the line):

- no functions or classes (a plain script)

## `promotion.py`

```text
Require a separate gate before promotion.

Lesson: projects/self-improving-skill-loop/stages/04-promotion/docs/en.md
The implementation is original and uses explicit local data contracts.
Run its tests through scripts/project_test.py.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def gate(holdout, baseline, candidate, min_gain)`](promotion.py#L13)

## `propose.py`

```text
Propose rules from development errors only.

Lesson: projects/self-improving-skill-loop/stages/03-propose/docs/en.md
The implementation is original and uses explicit local data contracts.
Run its tests through scripts/project_test.py.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def propose(development, rules, min_support)`](propose.py#L13)

## `skill.py`

```text
Execute and score a transparent routing skill.

Lesson: projects/self-improving-skill-loop/stages/02-skill/docs/en.md
The implementation is original and uses explicit local data contracts.
Run its tests through scripts/project_test.py.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def route(text, rules, default)`](skill.py#L11)
- [`def evaluate(cases, rules)`](skill.py#L20)

## Run and test

From this folder:

```
python cli.py --help
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
