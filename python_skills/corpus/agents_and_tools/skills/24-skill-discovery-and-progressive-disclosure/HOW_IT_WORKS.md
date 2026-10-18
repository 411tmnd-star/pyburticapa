# How it works: Skill Discovery and Progressive Disclosure

## `code/main.py`

Functions and classes, in file order (click to jump to the line):

- [`class Scope`](code/main.py#L16)
- [`class SkillCandidate`](code/main.py#L22)
- [`class CatalogBudget`](code/main.py#L31)
- [`class CatalogEntry`](code/main.py#L38)
- [`class Collision`](code/main.py#L46)
- [`class Catalog`](code/main.py#L53)
  - [`def model_dict(self)`](code/main.py#L60)
  - [`def to_dict(self)`](code/main.py#L63)
- [`class DiscoveryError`](code/main.py#L73)
- [`class CollisionError`](code/main.py#L77)
- [`class ReferencePathError`](code/main.py#L81)
- [`def _frontmatter(path)`](code/main.py#L85)
- [`def discover_scope(scope)`](code/main.py#L153): Read only direct child frontmatter; instruction bodies stay unloaded.
- [`def resolve_collisions(candidates, precedence)`](code/main.py#L189): Apply a caller-supplied high-to-low scope order.
- [`def _shorten(text, limit)`](code/main.py#L223)
- [`def build_catalog(candidates, precedence, budget)`](code/main.py#L233)
- [`def _candidate_for(entry, candidates)`](code/main.py#L279)
- [`def load_skill_body(entry, candidates, max_chars)`](code/main.py#L286)
- [`def validate_reference(skill_directory, reference)`](code/main.py#L301): Allow a direct file or one subdirectory, never traversal or deep chains.
- [`def load_reference(entry, reference, max_chars)`](code/main.py#L326)
- [`def _write_skill(root, name, description, body)`](code/main.py#L338)
- [`def demo()`](code/main.py#L350)

## Run and test

From this folder:

```
python code/main.py
python -m unittest discover -s code/tests
```

These files are exact copies from the course; `build_corpus.py` checks they stay identical. Adapt the code in your own skill under `python_skills/confirmed/`, not here.
