# How it works: Claude Code Memory, Rules, Skills, and CI

## `code/main.py`

```text
Companion validator for this lesson's docs/en.md configuration audit.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def validate_text(text)`](code/main.py#L37)
- [`def validate_artifact(path)`](code/main.py#L49)
- [`def parse_frontmatter(text)`](code/main.py#L60)
- [`def validate_skill(skill_dir)`](code/main.py#L73)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
