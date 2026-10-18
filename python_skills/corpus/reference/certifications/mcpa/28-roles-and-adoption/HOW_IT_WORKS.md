# How it works: Every MUST Needs an Owner

## `code/main.py`

```text
Companion code for:
certifications/mcpa/lessons/28-roles-and-adoption/docs/en.md
Assign MCP 2026-07-28 spec requirements to the six roles behind a deployment.
Run: python3 code/main.py
Sources: MCP 2026-07-28 specification; MCP governance, SEP guidelines, and SDK tiers pages.
```

(the script's own docstring)

Functions and classes, in file order (click to jump to the line):

- [`def make_request(request_id, method, params, capabilities, version)`](code/main.py#L22)
- [`def make_result(request_id, result_type)`](code/main.py#L33)
- [`def make_error(request_id, code, message, data)`](code/main.py#L37)
- [`class Requirement`](code/main.py#L58): One curated MUST or SHOULD, quoted exactly, with the role that owns it by deployment shape.
  - [`def owner(self, shape)`](code/main.py#L69)
- [`def requirements_for_shape(shape)`](code/main.py#L174)
- [`def build_responsibility_matrix(shape)`](code/main.py#L180): Assign every requirement in force for `shape` to a role, and report MUSTs with no owner.
- [`def roles_covered(shape)`](code/main.py#L193)
- [`def illustrative_exchange()`](code/main.py#L198): A stdio tools/call that succeeds because the operator's environment held the credential.
- [`def transcript()`](code/main.py#L211)
- [`def demo()`](code/main.py#L215)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
