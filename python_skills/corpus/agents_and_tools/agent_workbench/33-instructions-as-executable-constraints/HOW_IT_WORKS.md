# How it works: Agent Instructions as Executable Constraints

## `main.py`

```text
Parse agent-rules.md, run a fake agent turn, score the turn against the rules.

Each rule in the markdown has a slug, a category, a one-line description,
and a `check:` field that names a function on `RuleChecker`. Adding a new
rule means adding a check; the checker grows with the workbench.

Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class Rule`](main.py#L53)
- [`class TurnTrace`](main.py#L61)
- [`def write_seed_rules()`](main.py#L71)
- [`def parse_rules()`](main.py#L76)
- [`class RuleChecker`](main.py#L100)
  - [`def state_file_fresh(self, trace)`](main.py#L101)
  - [`def no_release_script_edits(self, trace)`](main.py#L104)
  - [`def tests_pass(self, trace)`](main.py#L107)
  - [`def opened_question_when_unsure(self, trace)`](main.py#L110)
  - [`def new_dependency_approved(self, trace)`](main.py#L113)
- [`def score(rules, checker, trace)`](main.py#L119)
- [`def main()`](main.py#L128)

## Run and test

From this folder:

```
python main.py
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
