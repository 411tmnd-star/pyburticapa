# How it works: Task Spec Format

## `code/main.py`

```text
Task spec format: JSONL schema, validator, post-process, fixture loader.

Conceptual references:
- ./docs/en.md (this lesson)
- Phase 19 Track B foundations

Stdlib only. Run: python3 code/main.py
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`class ValidationError`](code/main.py#L48)
  - [`def to_dict(self)`](code/main.py#L55)
- [`class TaskSpec`](code/main.py#L66)
  - [`def to_dict(self)`](code/main.py#L76)
- [`def _check_required(record)`](code/main.py#L89)
- [`def _check_unknown_fields(record)`](code/main.py#L96)
- [`def _check_types(record)`](code/main.py#L103)
- [`def _check_category_metric(record)`](code/main.py#L140)
- [`def _embedded_few_shot(prompt)`](code/main.py#L157)
- [`def validate_task(record, line_number)`](code/main.py#L164)
- [`def validate_file(path)`](code/main.py#L192)
- [`def render_prompt(task)`](code/main.py#L228)
- [`def post_process(text, rule)`](code/main.py#L241)
- [`def fixture_tasks()`](code/main.py#L265)
- [`def bad_fixture_tasks()`](code/main.py#L361)
- [`def write_jsonl(path, records)`](code/main.py#L376)
- [`def load_fixtures(out_dir)`](code/main.py#L383)
- [`def demo()`](code/main.py#L391)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
