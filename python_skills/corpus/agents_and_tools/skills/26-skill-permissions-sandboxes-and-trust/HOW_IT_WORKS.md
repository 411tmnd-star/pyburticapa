# How it works: Skill Permissions, Sandboxes, and Trust

## `code/main.py`

Functions and classes, in file order (click to jump to the line):

- [`class Verdict`](code/main.py#L14)
- [`class SandboxPolicy`](code/main.py#L21)
- [`class ActionRequest`](code/main.py#L31)
- [`class ReviewDecision`](code/main.py#L43)
  - [`def to_dict(self)`](code/main.py#L52)
- [`class SandboxViolation`](code/main.py#L58)
- [`def contains_secret(value)`](code/main.py#L72)
- [`def normalize_https_origin(value)`](code/main.py#L76): Return a canonical HTTPS origin with an explicit effective port.
- [`def normalize_workspace_path(workspace_root, target)`](code/main.py#L123)
- [`def inspect_command(command, allowlist)`](code/main.py#L135): Inspect an argv vector without invoking a shell or subprocess.
- [`def _decision(request, verdict, rule, reason, normalized_target, normalized_origin)`](code/main.py#L158)
- [`def review_action(policy, request)`](code/main.py#L176): Classify one proposed action. This function has no execution path.
- [`def demo()`](code/main.py#L295)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
