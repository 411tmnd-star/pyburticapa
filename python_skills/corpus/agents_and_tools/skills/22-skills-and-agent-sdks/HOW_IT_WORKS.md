# How it works: Agent Skills: Portable Contract and Runtime Boundary

## `code/main.py`

Functions and classes, in file order (click to jump to the line):

- [`class ValidationIssue`](code/main.py#L23)
- [`class SkillReport`](code/main.py#L29)
  - [`def to_dict(self)`](code/main.py#L38)
- [`class FrontmatterSyntaxError`](code/main.py#L44): Raised when the lesson's deliberately small YAML subset is invalid.
- [`def _decode_scalar(raw)`](code/main.py#L48)
- [`def parse_frontmatter(text)`](code/main.py#L69): Parse top-level scalars, block scalars, and a one-level metadata map.
- [`def validate_skill_text(text, directory_name, allowed_runtime_extensions)`](code/main.py#L131)
- [`class TaskShape`](code/main.py#L243)
- [`def select_primitives(task)`](code/main.py#L252): Select composable primitives by responsibility, not by product branding.
- [`def demo()`](code/main.py#L270)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
