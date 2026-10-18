# How it works: Skill Invocation and Routing

## `code/main.py`

Functions and classes, in file order (click to jump to the line):

- [`class Actor`](code/main.py#L11)
- [`def _actor_label(actor)`](code/main.py#L20)
- [`class SkillMetadata`](code/main.py#L30)
- [`class InvocationPolicy`](code/main.py#L37)
- [`class InvocationRequest`](code/main.py#L83)
- [`class InvocationDecision`](code/main.py#L92)
  - [`def to_dict(self)`](code/main.py#L100)
- [`def _tokens(value)`](code/main.py#L108)
- [`def relevance_score(query, skill)`](code/main.py#L112)
- [`class CorePolicyAdapter`](code/main.py#L120): Apply only caller-supplied host policy; ignore extension fields.
  - [`def allows(self, skill, actor, request)`](code/main.py#L126)
- [`def _extension_false(value)`](code/main.py#L165)
- [`def _extension_true(value)`](code/main.py#L169)
- [`class ExtensionPolicyAdapter`](code/main.py#L173): Example adapter for one host's invocation metadata conventions.
  - [`def allows(self, skill, actor, request)`](code/main.py#L176)
- [`def build_invocation_matrix(policy)`](code/main.py#L195)
- [`def route_request(skills, request, adapter)`](code/main.py#L217)
- [`def demo()`](code/main.py#L315)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
