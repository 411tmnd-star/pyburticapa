# Pyburticapa

Python tools for turning years of AI chat history into knowledge you can search and trust. Standard library only, tested on Linux with Python 3.11–3.13; CI also runs on Windows.

## Headline tool: ChatGPT export → source-traceable knowledge base

Most people's best thinking is buried in hundreds of ChatGPT conversations, with regenerated replies, edited prompts and "Branch" copies mixed in. These two tools recover it without losing where anything came from.

```
conversations.json ──► takeout_to_clean_md.py ──► PROMPTS/ + REPLIES/ Markdown ──► recover.py ──► SQLite FTS5 ──► dossier.md + evidence.csv
                         run · verify                (one file per conversation)    ingest · check   search · terms · dossier
```

- **Nothing is lost or invented.** `verify` re-reads the export and proves every message was written or counted as skipped, with identical text. `check` proves the database matches the archive's own manifest.
- **Branches handled properly.** Regenerated replies and edited prompts are kept as alternates. Forked conversations are linked into families, and a message copied into five branches is stored once and reported with all five files.
- **Finds what you misspelled.** Search expands the subject through the index vocabulary (one edit away, compounds), so "Sunbx" is found when you search for "SunBox".
- **Evidence, not conclusions.** Every dossier entry carries the node id, conversation, position, branch, time and source file. Assistant text is labelled as proposed or claimed, never as fact.

Run on a real export by the owner: 771 conversations, 236,083 message entries → 10,342 unique messages in 250 families; `verify` and `check` both PASS.

### Try it in one command

```
python demo.py
```

This builds a small invented export (4 conversations with a fork, a regenerated reply, an edited prompt and an image), runs every step above and writes `outputs/demo/dossiers/sunbox_dossier.md`.

### Use it on your own export

One command: `python -I -X utf8 tools/knowledge_recovery/run.py <export folder> <output folder> --subject "<your subject>"`. The same thing step by step:

```
python -I -X utf8 tools/chatgpt_takeout_split/takeout_to_clean_md.py run  <export folder> <clean folder>
python -I -X utf8 tools/chatgpt_takeout_split/takeout_to_clean_md.py verify <export folder> <clean folder>
python -I -X utf8 tools/knowledge_recovery/recover.py ingest --archive <clean folder>
python -I -X utf8 tools/knowledge_recovery/recover.py check
python -I -X utf8 tools/knowledge_recovery/recover.py dossier "<your subject>"
```

The export folder is the unzipped ChatGPT data export (`conversations.json`, or sharded `conversations-000.json` …). Subject spellings, topics and domain terms go in `aliases.json` (`--aliases` to use another file). Private conversations can be left out with `exclude.json` (`--exclude`). The database and dossiers hold private text and are git-ignored.

### Tests

```
python -m unittest discover -s tests -v
```

13 end-to-end tests run the real command-line scripts on the fabricated export. They cover verify catching an edited output file, a hash mismatch stopping the run, branch de-duplication, misspelling search, decision labels, the related-terms section and exclusions. CI (`.github/workflows/blank.yml`) runs them, together with the prompt/reply pipeline and schema-validator tests and the demo, on Ubuntu and Windows.

## Other tools

| Tool | What it does |
|---|---|
| `tools/prompt_reply_pipeline` | Separates prompts from replies in chat exports, sends replies to a local Ollama model and checks its output in code (tested; `.mht` input needs `beautifulsoup4` and `markdownify`) |
| `tools/schema_validate` | Tool registry with a JSON Schema 2020-12 subset validator (tested; adapted from a course lesson) |
| `tools/mht_to_md_tool`, `tools/pdf_to_md`, `tools/knowledge_extraction` | Saved web pages, PDFs and JSONL → Markdown |
| `tools/x_pipeline` | Turns a list of X post links into Markdown notes with article text, images, videos and transcripts |
| `tools/repo_inspect`, `tools/env_preflight` | Read-only report on a GitHub repo (nothing installed or run); read-only environment check (adapted, MIT) |
| `discover/` | Searches the owner's capability registry (needs the private Harness data; its tests fail without it) |

---

# Toolkit internals (original notes)

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
