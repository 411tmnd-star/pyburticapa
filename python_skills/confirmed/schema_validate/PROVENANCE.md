# schema_validate

Toolkit layer: **Layer 2 (Mathematics & Verification)** - validates JSON-like data against a small JSON Schema 2020-12 subset (type, properties, required, enum, minLength, maxLength, pattern, items). Stdlib only. Also holds a name-keyed `ToolRegistry` (Layer 6 helper), which is optional.

- Upstream: https://github.com/rohitg00/ai-engineering-from-scratch, commit 1c8e62b526e78b8773559594aab3a3487d9998ac, MIT (see LICENSE.upstream).
- Source: `phases/19-capstone-projects/21-tool-registry-schema-validation/code/{main.py,tests/test_registry.py}`.
- Changes: provenance header on both files; test import `main` -> `schema_validate`. No logic change.
- Original repository files were not modified.
- Limits (read from source): no `$ref`, `oneOf`, `additionalProperties`, `minimum/maximum`, `format`; `validate_schema_shape` rejects them. `required` only checked on objects.
- Run tests: `python -B -X utf8 python_skills\confirmed\schema_validate\tests\test_schema_validate.py`
