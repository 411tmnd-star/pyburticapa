# How it works: Cloud Agent With AWS Strands

## `cli.py`

```text
Execute a validated read-only plan against local recordings or explicit AWS CLI reads.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def time_window(entry)`](cli.py#L13)
- [`def aws_arguments(operation, resource, config)`](cli.py#L36)
- [`def run(payload, provider)`](cli.py#L85)
- [`def main()`](cli.py#L112)

## `demo.py`

Functions and classes, in file order (click to jump to the line):

- no functions or classes (a plain script)

## `executor.py`

```text
Execute reads within step and response budgets.

Lesson: projects/cloud-agent-with-aws-strands/stages/02-executor/docs/en.md
The implementation is original and uses explicit local data contracts.
Run its tests through scripts/project_test.py.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def execute(plan, provider, max_steps, max_chars)`](executor.py#L11)

## `framework_demo.py`

Functions and classes, in file order (click to jump to the line):

- no functions or classes (a plain script)

## `plan.py`

```text
Validate a scoped cloud inspection plan.

Lesson: projects/cloud-agent-with-aws-strands/stages/01-plan/docs/en.md
The implementation is original and uses explicit local data contracts.
Run its tests through scripts/project_test.py.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def validate_plan(raw, scope)`](plan.py#L11)

## `retry.py`

```text
Retry transient reads and reuse completed requests.

Lesson: projects/cloud-agent-with-aws-strands/stages/03-retry/docs/en.md
The implementation is original and uses explicit local data contracts.
Run its tests through scripts/project_test.py.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def request_key(operation, resource)`](retry.py#L12)
- [`def cached_read(operation, resource, provider, cache, retries)`](retry.py#L18)

## `strands_adapter.py`

```text
Drive the actual Strands loop with a local model.

Lesson: projects/cloud-agent-with-aws-strands/stages/04-strands-adapter/docs/en.md
The implementation is original and uses explicit local data contracts.
Run its tests through scripts/project_test.py.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def parse_model_plan(text, scope)`](strands_adapter.py#L12)
- [`def run_strands(prompt, reply)`](strands_adapter.py#L16)
- [`def bedrock_agent(model_id, region)`](strands_adapter.py#L56)

## Run and test

From this folder:

```
python cli.py samples/input.json --output incident.json
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
