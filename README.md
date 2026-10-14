# Python_Toolkit

A reusable, discoverable copy of the Harness's independent Python tools. **Originals in `tool harness\` are untouched; nothing was moved or deleted.** Created 2026-10-14.

## Layout

| Path | Contents |
|---|---|
| `tools\` | Copied tools (code, requirements, docs only; no data) |
| `discover\` | Copy of `discover.py` + tests + config, adapted (see `discover\CHANGES_FROM_ORIGINAL.md`) |
| `outputs\` | Designated output location for workflow runs (empty; nothing historical is stored here) |
| `tools\prompt_reply_pipeline\tests\` | Unit tests + synthetic fixtures (fabricated content) so the pipeline is testable without any historical files |
| `GEMINI_SCRIPT_CLASSIFICATION.csv` | Evidence-based classification of the Gemini debug/backup scripts |
| `SCOPE_REVIEW.md/.csv` | Scope rules, file classification and the cleanup record |

Historical generated material that used to sit here was **moved (not deleted)** to `C:\Users\USER\Desktop\Python_Toolkit_QUARANTINE\` (outside the toolkit; `MANIFEST.csv` lists original paths and SHA-256).
| `INVENTORY.csv` | Consolidated inventory: all 2,313 original `PY_INVENTORY.csv` rows kept, +104 added. Columns record group, capability, disposition, toolkit path, verification |
| `MIGRATION_LOG.csv` | Every copy: source, destination, SHA-256 of both, hash check |
| `VERIFICATION.csv` | Checks run and their evidence |
| `CAPABILITIES.md`, `WORKFLOWS.md` | Category -> capability -> script -> workflow |
| `REMAINING_DEPENDENCIES.md` | What stays in the Harness and why; what still depends on it |
| `_meta\` | Scripts that built and checked this folder (scan, migrate, verify, inventory) |

## How to use

- Search: `cd discover` then `python -I -X utf8 discover.py <query>` (reads the Harness registry; set the path in `discover_config.json`).
- Search extra folders as well: write a JSON list `[["<absolute folder>", "*.md"]]` and pass `--extra-sources <file>` (opt-in; default behaviour unchanged).
- Separate prompts/replies: `python -I -X utf8 tools\prompt_reply_pipeline\pipeline.py all <SRC> <OUT>` (use a folder under `outputs\` for `<OUT>`).
- Test the pipeline on its own fixtures: `python -B -X utf8 tools\prompt_reply_pipeline\tests\test_pipeline.py`.
- Re-check the toolkit: `python -I -X utf8 _meta\verify.py` (local; appends a run to `VERIFICATION.csv`). `--full` also re-runs the checks that read Harness data.

## Status vocabulary (kept separate in `INVENTORY.csv`)

confirmed present - verified execution - not verified - proposed - unresolved. "Verified execution" means a check in `VERIFICATION.csv` passed; `--help` only is labelled as such.
