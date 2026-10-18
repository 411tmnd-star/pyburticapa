# Reference

Everything that used to be spread over `CAPABILITIES.md`, `WORKFLOWS.md`, `NEXT_ACTIONS.md`, `REMAINING_DEPENDENCIES.md` and `SCOPE_REVIEW.md`, in that order, unchanged apart from heading levels. The current list of Python skills is in the root `README.md`; this file is the history and the detail behind it.

Notes on the wording below, which is from before 2026-10-18:
- `tools\` and `tools/` now read `python_skills\` and `python_skills/`.
- `discover.py` and the `discover/` folder were removed; mentions of them are historical.
- The words "implemented" and "not implemented" are replaced by *Python skill* and *discovery* (see the README).
- The CSV files named here are now in `records/`.

## Contents

1. [What exists: capabilities by outcome](#part-1-what-exists-capabilities-by-outcome) (was `CAPABILITIES.md`)
2. [Workflows](#part-2-workflows) (was `WORKFLOWS.md`)
3. [Next actions](#part-3-next-actions) (was `NEXT_ACTIONS.md`)
4. [What still depends on the Harness](#part-4-what-still-depends-on-the-harness) (was `REMAINING_DEPENDENCIES.md`)
5. [Scope review and cleanup record](#part-5-scope-review-and-cleanup-record) (was `SCOPE_REVIEW.md`)

# Part 1 What exists: capabilities by outcome

> **Vocabulary update 2026-10-18.** This repo now says *Python skill* (an installable, runnable workflow, pure or hybrid) and *discovery* (a collected item not yet built into a skill). See `SKILLS.md`. The current list of Python skills, with one command each, is in `SKILLS.md`; this file keeps the per-tool input/output notes. Several paths below use `\` from the Windows laptop. Where this file says "capability", "supported by code" or "proposed", read "Python skill" or "idea not yet built". The text below is otherwise unchanged.

Classification: capability category -> specific capability -> script/tool -> workflow. A script may appear under several capabilities; its authoritative record is its row in `INVENTORY.csv`.

Status key: **V** = verified by a check in `VERIFICATION.csv`; **H** = `--help` only; **C** = compiled only (not executed); **-** = not verified.

| Category | Capability | Tool (toolkit path) | Status | Workflow |
|---|---|---|---|---|
| Document and chat processing | Keep only LLM replies from chat exports | `tools\chat_reply_extractor\chat_reply_extractor.py` | V (19 outputs byte-identical to existing) | W1 |
| Document and chat processing | Separate prompts/replies, prepare sections, verify LLM output | `tools\prompt_reply_pipeline\pipeline.py` | V: 12 unit tests + selftest on synthetic fixtures (no Harness files, no network); stage 3 tested with a fake model only, real Ollama not run | W2 |
| Document conversion | PDF -> Markdown | `tools\pdf_to_md\pdf_to_md.py` (+ `requirements.txt`: pymupdf) | H | W5 |
| Document conversion | Chat JSON / JSONL / MHT -> Markdown | `tools\knowledge_extraction\v2\{convert,jsonl_to_md,mht_to_md}.py` | H (mht_to_md, jsonl_to_md); C (convert) | W4 |
| Document conversion | MHT -> Markdown with manifest/log | `tools\mht_to_md_tool\mht_to_md.py` | H | W4 |
| Document conversion | Gemini conversation -> Markdown | `tools\gemini_md2\*.py` (29 py incl. tests/debug) | C. Correction (2026-10-14): `gemini_replay/batch/survey` and the `test*_validate` drivers use plain HTTP (`requests`); only `debug\cdp_*.py` drive a real Chrome via CDP. Not run (network) | W6 |
| Content ingestion | X links -> notes, articles, media, transcripts | `tools\x_pipeline\{extractor,fetch_articles,download_videos,transcribe_notes,run_all}.py` + `requirements.txt` | Owner-accepted as tested (not re-run here; implementation unchanged; no historical X content copied) | W3 |
| Discovery | Search registry, skills, Python capabilities, notes | `discover\discover.py` | V (tests pass; output identical to original on 3 queries) | W7 |
| Repository analysis | Repo inspection | `tools\repo_inspect\repo_inspect.py` | C (uses requests) | - |

### Which chat tool to use

| Tool | Use when | Notes |
|---|---|---|
| `prompt_reply_pipeline` (**canonical** for future prompt/reply processing) | The input is a folder of unknown files: ChatGPT JSON exports, Perplexity-style prints, or plain documents | Detects the format from content; files with no role markers are kept as documents (never guessed); exact split for JSON exports; includes dedup, facts, optional Ollama stage and verification |
| `chat_reply_extractor` (kept as a separate capability) | The files are known conversations that need their file-specific handling (e.g. print layouts, pasted-notes files) | Handlers are keyed to specific file names and layouts; not every Markdown file is a chat |

Neither tool is to be deleted or merged without approval.

### Input / output behaviour per tool

Inputs are always supplied when a workflow runs; the toolkit keeps no input folder. Outputs go where you point them (use a subfolder of `outputs\`).

| Tool | Input | Output | Notes |
|---|---|---|---|
| `pipeline.py separate/prepare/llm/verify/all` | `SRC` folder of `.md/.json/.txt` | `OUT\replies, prompts, documents, unsure, logs, prepared, verified, llm_cache` | Sources are read only (hashed before/after). `llm` needs Ollama on localhost; `verify` needs `llm_rows.jsonl` |
| `chat_reply_extractor.py` | `SRC` folder of chat-export `.md` | `--out` folder; **if omitted, writes to `<SRC>\..\markdown_files_cleaned`** (always pass `--out`) | File-name and layout specific handlers |
| `pdf_to_md.py` | PDF path | `output` path (positional) | `--overwrite`, `--tables-only`; needs pymupdf |
| `knowledge_extraction\v2\jsonl_to_md.py` | JSONL path | `--out` | `--tools` flag |
| `knowledge_extraction\v2\mht_to_md.py` | MHT/MHTML path | `--out` | needs bs4, markdownify |
| `knowledge_extraction\v2\convert.py` | UNKNOWN (not inspected) | UNKNOWN | compiled only |
| `mht_to_md_tool\mht_to_md.py` | `--source` | `--output`, `--manifest`, `--log` | `--dry-run`, never modifies sources (per its docs) |
| `gemini_md2\*` | Gemini share URLs / recorded responses | Writes `output\`, `logs\`, `debug\` beside the scripts (created with `mkdir(exist_ok=True)` at write time: VERIFIED by reading source, not executed) | Several scripts also read earlier `logs\*.json` results and `.txt` URL lists that are not in the toolkit; not self-contained |
| `x_pipeline\*` | Unchanged from the Harness | Unchanged (relative output folders) | Not touched |
| `discover.py` | query text | stdout; optional `--json`, `--synthesize` | Read-only; `--extra-sources FILE` adds folders (opt-in) |
| `repo_inspect.py` | UNKNOWN (not inspected) | UNKNOWN | compiled only |

Left in the Harness (not copied): archive processing (`411_archive_processing`), frozen knowledge-extraction v1, registry tools, Browser-DevTools research, Harness assets. See `REMAINING_DEPENDENCIES.md`.

### Proposed (not built)

- Add unknown-structure chat prints (Branch, HARPA) to the pipeline as handlers instead of documents.
- Merge `convert.py` copies (a second copy exists at `Desktop\chat-test\`; not compared).
- Wrap the research-consolidation scripts (`demand_discovery_consolidation\_work\`) as a toolkit workflow after their hard-coded paths are parameterised.

### Unresolved

- Whether `pipeline.py` should replace `chat_reply_extractor.py` (overlapping job; the extractor has file-specific handlers the pipeline does not).
- Dependencies: pymupdf, bs4, markdownify, requests, faster-whisper, av, websockets, ijson were present at check time; nothing was installed.

---

## Capability map by outcome (2026-10-14)

Labels: **VERIFIED** = ran with evidence in `VERIFICATION.csv`. **ACCEPTED** = owner-accepted as tested (X pipeline; not re-run). **INFERRED** = read from source/docstring, not run. **PROPOSED**, **UNKNOWN**, **GAP** = no implementation found in the toolkit.

| Outcome we can achieve | Tools | Status | Evidence / limits |
|---|---|---|---|
| Process a whole folder of mixed `.md/.json/.txt` files in one run, never modifying the sources | `pipeline.py separate/prepare/all` | **VERIFIED** | 12 unit tests + selftest on synthetic fixtures; hashes checked before/after; unknown files kept as documents |
| Split prompts from replies exactly (ChatGPT JSON exports) | `pipeline.py` | **VERIFIED** | Reads the `role` field; every message labelled once |
| Split prompts from replies by rule (Perplexity-style prints) | `pipeline.py` | **VERIFIED (rule, not proof)** | Fixture test; on real files 801 of 1,992 blocks matched no rule in an early count, so expect `documents/`/`unsure` for other layouts |
| Keep only the AI's replies from known chat files | `chat_reply_extractor.py` | **VERIFIED (R1, pre-cleanup)** | 19 outputs byte-identical to existing; keyed to specific file names/layouts; omit `--out` and it writes beside `SRC` |
| Remove exact duplicate passages; pull URLs, dates, prices, versions, licences out of text | `pipeline.py prepare` | **VERIFIED** | Regex-based; tests assert specific facts |
| Label passages with a local model and reject anything not found verbatim in the source | `pipeline.py llm` + `verify` | **VERIFIED with a fake model; real Ollama UNVERIFIED** | Cache, determinism settings (temp 0, seed 42) and rejection rules are tested; no live model run |
| Convert PDF -> Markdown (optional tables-only) | `pdf_to_md.py` | INFERRED (`--help` only) | Needs pymupdf (present); folder input UNKNOWN |
| Convert MHT/MHTML -> Markdown | `mht_to_md_tool\mht_to_md.py` (general, manifest/log, `--dry-run`); `knowledge_extraction\v2\mht_to_md.py` (Google AI Mode) | INFERRED (`--help` only) | Two overlapping converters |
| Convert JSONL transcripts -> Markdown (file or folder) | `jsonl_to_md.py` | INFERRED (`--help` only) | Claude Code style or generic role/content |
| Convert ChatGPT JSON -> Markdown | `convert.py` | UNKNOWN | No docstring or CLI flags; compiled only. (`mht_to_md.py` says its output format matches `convert.py`.) |
| Convert Gemini share links -> Markdown | `gemini_md2\*` | INFERRED (not run; network) | Needs result JSONs / URL lists that live only in the Harness |
| Fetch X posts, articles, media and transcripts (local Whisper) | `x_pipeline\*` | **ACCEPTED** | Unchanged and not re-run; `run_all.py` runs four steps; `consolidate_images/videos.py` flatten media folders |
| Browser/network automation | `gemini_md2\debug\cdp_*.py` (real Chrome via CDP); `download_videos.py` (yt-dlp subprocess) | INFERRED / ACCEPTED | Network; not run here |
| Call external services | fxtwitter public API, Gemini share endpoint, GitHub (repo_inspect), Ollama on localhost | INFERRED | No API-key services found |
| Inspect a GitHub repository read-only and write a report | `repo_inspect.py` | INFERRED (not run; network) | Docstring: nothing installed or executed; uses `subprocess` (purpose UNKNOWN) |
| Search the Harness registry, skills, workflow catalogue and notes; optional local-model synthesis | `discover\discover.py` | **VERIFIED (R1)** | Read-only. It indexes the **Harness**: 3 test queries returned 0 toolkit tools |
| Verify the toolkit itself (parse, tests, hashes, quarantine, Harness unchanged) | `_meta\verify.py` | **VERIFIED** | Appends runs to `VERIFICATION.csv` |
| Generate structured artifacts (JSONL, CSV, JSON) | `pipeline.py` outputs (`sections.jsonl`, `facts.csv`, `index.json`, `verified\*.jsonl`, `counts.json`) | **VERIFIED** | Ledger/report builders from the research consolidation exist only in the Harness (`demand_discovery_consolidation\_work\`), not in the toolkit |

### Capability gaps (no implementation found in the toolkit)

- A way to find **toolkit** tools by what they do (`discover` does not index them).
- A bridge from converters (PDF/MHT/JSONL/ChatGPT-JSON -> Markdown) to the pipeline's prompt/reply separation (see workflows).
- A live, end-to-end run of the local-model stage.
- Generic HTML, DOCX, XLSX, PPTX ingestion; general audio/media processing (AudioLab is external); OCR (UNKNOWN whether `pdf_to_md` does any).
- Cross-document consolidation (ledger, conflicts, counts) as a reusable tool.

### Update 2026-10-14: converters feed the pipeline

| Capability | Tools | Status |
|---|---|---|
| Split prompts and replies from converter Markdown (ChatGPT / Claude / Google AI shape) | `pipeline.py` `speaker_md` | VERIFIED on synthetic fixtures. Before the change the same file was labelled `document` (run recorded in this session) |
| JSONL transcript -> prompts and replies | `convert_for_pipeline.py` + `jsonl_to_md.py` | VERIFIED on a synthetic Claude-style session (includes a bad line and a meta record) |
| Google AI Mode MHT -> prompts and replies | `convert_for_pipeline.py` + `mht_to_md.py` | VERIFIED on a synthetic MHT. Real Google AI Mode captures NOT tested (structure may differ) |
| PDF is never treated as a conversation | `convert_for_pipeline.py` | VERIFIED (skipped with reason) |
| ChatGPT `convert.py` in the adapter | not used | Decision: it runs at import time; its input is already split by the pipeline |

### Real-input check (2026-10-14, read-only copies, no outputs kept in the toolkit)

| Input | Result | Verdict |
|---|---|---|
| Real Claude Code session (`.jsonl`, 659 lines) | 17 prompts / 17 replies. Independent count from the raw JSON: 17 user and 17 assistant text records. 11 replies contain their own `##` headings, kept inside the reply. No tool markers in output | VERIFIED. Found and fixed one defect first: the first version refused the file because of the embedded headings |
| Real Google AI Mode `.mht` export | **Not available** in the Harness. The only real `.mht` (`X\MHT_ARCHIVE\Claude Pro Overview.mht`) is a saved web page with no AI Mode turns; the converter refuses it (`converter_failed`) | NOT TESTED on a real export. The refusal is correct |
| Perplexity originals (`kaka`, `Deliverable A`, YouTube copy) | 11/11, 7/6, 9/9: identical to the earlier run | VERIFIED unchanged |
| ChatGPT JSON originals (`1`, `411`, `422`, `kkk`, `qqa`, `qqq`, `{`) | identical to the earlier run | VERIFIED unchanged |
| Detection over all 21 originals | 7 ChatGPT JSON, 4 Perplexity, 10 unknown: same as before the change | VERIFIED: no silent reclassification |

### Update 2026-10-14: pipeline output is discoverable (synthetic)

| Capability | Tools | Status |
|---|---|---|
| Search converted conversation replies and documents with discover.py | `convert_for_pipeline.py` (writes `discover_extra_sources.json`) + `discover.py --extra-sources` | VERIFIED on freshly generated synthetic output (6 tests, run against an EMPTY root so the Harness is not read) |
| Prompts are excluded from search results | adapter config lists `replies` and `documents` only | VERIFIED (a prompt-only word is never returned; the test checks the word is present in the prompts) |
| Control: without the config nothing synthetic is found | discover.py | VERIFIED |
| Harness unchanged by these checks | verify.py snapshot | VERIFIED (0 changed, 0 added, 0 removed) |

### Update 2026-10-14: toolkit tools are discoverable (opt-in)

- Command: `python -I -X utf8 discover\discover.py --class toolkit "<need>"`.
- Source: the toolkit's own `INVENTORY.csv`, rows that have a `toolkit_path`. No new registry was created, and the Harness registries are not changed.
- Status is shown as recorded: `VERIFIED`, `HELP ONLY` (checked with --help, not executed), `TEST LINK` (a named test exists; see that record), `NOT VERIFIED`, or `ACCEPTED` (owner-accepted X pipeline).
- Verified by `discover\test_toolkit_discovery.py` (9 tests, empty root). The default query results are identical to the pre-change copy for 8 control queries (`_meta\control_compare.py`).
- Capability and workflow notes (the text of `CAPABILITIES.md` and `WORKFLOWS.md`, shown as notes, not as verified records): from the Toolkit root, `python -I -X utf8 discover\discover.py --root . --class note --extra-sources discover\toolkit_notes.json --notes-root . "<need>"`. The `missing source` warnings are expected here.

### Update 2026-10-14: integrations from ai-engineering-from-scratch (MIT, commit 1c8e62b)

| Capability | Tool | Layer | Status |
|---|---|---|---|
| Validate JSON-like data against a JSON Schema 2020-12 subset; name-keyed tool registry | `tools\schema_validate\schema_validate.py` | 2 | VERIFIED: 19 upstream tests pass on the copy (logic unmodified) |
| Read-only per-route check of interpreter, commands and modules the Toolkit tools need | `tools\env_preflight\env_preflight.py` (`--route pipeline/converters/x_pipeline/gemini/audio_lab/all`) | 1 | VERIFIED: 6 toolkit-written tests + run on this machine. Adapted from the course `verify.py`; `_meta\verify.py` is a different job (checks the Toolkit's files) |

Both are findable with `discover.py --class toolkit`. The course repo itself sits at `ai-engineering-from-scratch\` (unmodified; git clean at HEAD 1c8e62b). Provenance: each tool folder has `PROVENANCE.md` and `LICENSE.upstream`.

### Imported capabilities (2026-10-14)

Copied, not moved, from the course repo and AudioLab. Every copy is hash-checked and listed in `imports/IMPORT_MANIFEST.csv`. Status keys follow the table above, plus REPORTED-PASS (passed per the author or owner, not re-run here), UNVERIFIED-SOURCE (present, not run), STARTER-INCOMPLETE (learner starters) and REFERENCE (non-executable).

| Category | Capability | Location | Status |
|---|---|---|---|
| Audio analysis | Per-song features, beats, bars, onsets, loud segments, novelty, click tracks; `song_analysis.json` | `imports/audio_lab/src/audiolab/{pipeline,features,beats,bars,events,novelty,clicks,export}.py` | V (385 pytest passed, observed earlier this session) |
| Audio interpretation | Evidence-backed passage labels from analysis | `imports/audio_lab/src/audiolab/interpretation/` | V (in the same suite) |
| Visual mapping | Control channels from analysis and profiles | `imports/audio_lab/src/audiolab/visual_mapping/` | V (in the same suite) |
| Motion planning | Scene states, actions, property curves | `imports/audio_lab/src/audiolab/motion/` | V (in the same suite) |
| Web export | Motion timelines and feature readings for the browser | `imports/audio_lab/scripts/export_web.py` | - (not run here) |
| Web pipeline | Live and offline audio feature frames | `imports/audio_lab/web_kit/src/lib/pipeline/` | V (99 node tests observed) |
| WebGL visuals | Accretion, Constellation Core, Spectrum Matrix | `imports/audio_lab_work/audio_lab/web_kit/src/` | ACCEPTED (reports only; not re-run) |
| Course workflow | Lesson audit, quiz bias check, catalog, skill install | `imports/ai_engineering/scripts/` | - (not run here) |
| Course workflow | Project grader for staged projects | `imports/ai_engineering/scripts/project_test.py` | ACCEPTED (author report 2026-09-29) |
| Course lessons | Math, ML, LLM, agent, infra lessons with code and quizzes | `imports/ai_engineering/phases/` | - (code present; not run here) |
| Course projects | 85 staged projects: starters, reference solutions, stage tests | `imports/ai_engineering/projects/` | starters incomplete by design; solutions ACCEPTED |
| Course certification | Claude certification lessons, tracks, assessments | `imports/ai_engineering/certifications/` | - (code present; not run here) |
| Capability library | 417 skills, 99 prompts, 15 agents from lessons | `imports/ai_engineering/phases/*/outputs/` | REFERENCE |

### API and MCP (imported 2026-10-14)

The course ships a public read-only API and an MCP server. Both are Node code (Node 20+, no third-party packages), in `imports/ai_engineering/api/` and `imports/ai_engineering/lib/`. They read the site build output, so the build must run first (see W13).

| Capability | Location | Status |
|---|---|---|
| REST API v1: catalog, markdown, resource (`/api/v1/`, `X-API-Version: 1`) | `imports/ai_engineering/api/v1/` | UNVERIFIED-SOURCE (not run here) |
| MCP server, protocol 2025-11-25 and 2025-03-26, tools `search_curriculum` and `read_resource` (read-only, streamable HTTP at `/mcp`) | `imports/ai_engineering/api/mcp.js` | UNVERIFIED-SOURCE (not run here) |
| OpenAPI 3.1 description of the public resources | `imports/ai_engineering/site/openapi.json` | REFERENCE |
| MCP registry metadata | `imports/ai_engineering/site/server.json` | REFERENCE |
| Shared content, HTTP and schema code | `imports/ai_engineering/lib/` | UNVERIFIED-SOURCE |
| Site build that generates the data the API reads | `imports/ai_engineering/site/build*.js`, `clean-urls.js`, `version-assets.js` | UNVERIFIED-SOURCE |

MCP curriculum in the imported course (all imported with their code, quizzes and skills):
- Phase 13, tools and protocols: MCP fundamentals, server and client building, transports, resources and prompts, sampling, roots and elicitation, async tasks, apps, security and tool poisoning, OAuth 2.1, gateways and registries, production auth, tool contracts, reliability, registry supply chain, conformance and versioning (lessons 06 to 31).
- Phase 11 lesson 14 (model context protocol); phase 19 capstone 13 (MCP server with registry).
- Projects `mcp-at-scale` and `memory-server`.
- Certification track `certifications/mcpa/` (33 lessons, assessments, track file) and `certifications/claude/lessons/11-mcp-server-design-and-integration`.
- Skills `learn-mcp` and `mcpa-certification`; `scripts/check_mcpa_wire.py` and its test.

### Tiers (2026-10-14)

`INVENTORY.csv` is the single catalogue. Four columns classify every toolkit-owned row and every imported file: `tier`, `tier_rule`, `sha256`, `check_status`. `discover.py --tier 1,2,3` filters on them. Nothing is executed to compute them.

| Tier | Meaning | Files | check_status |
|---|---|---|---|
| 1 | Reference and learning material (read-only, never executed) | 5,182 | `READ-ONLY` |
| 2 | Reusable code, candidates (course lessons, project solutions, workflow scripts, tests, AudioLab working copy) | 2,024 | static result: `STATIC-OK` (1,136 Python), `UNDECLARED-DEPS: ...` (17), `NOT-CHECKED` (non-Python or not code) |
| 3 | Core and active (the 57 toolkit tools, AudioLab live code, the course API/MCP and its build) | 181 | `REQUIRES-REVIEW; static: ...` until edited to `REVIEWED ...` |

Tier 2 is static only: `ast.parse` and an import check against the requirements and pyproject files in the Toolkit. Tests are not run. Syntax errors are judged by the Python 3.11 parser, so code written for newer Python could be flagged (none was). `layer` is not a column; layer labels stay in `specific_capability` as free text.

Review record. A row (normally Tier 3) stays `REQUIRES-REVIEW` until a person edits its `check_status` cell in `INVENTORY.csv` to `REVIEWED <date> <who>: <scope>`: the date, the reviewer and what was examined. It records that a review took place; it does not show that the resource is correct or has been run, and execution evidence stays in `verified_execution`. `_meta\tier.py` only checks that `check_status` begins with `REVIEWED`, then keeps the whole cell unchanged on later runs, including its static-check text; it does not validate the date, reviewer or scope. No row is marked reviewed today.

```
python -I -X utf8 discover\discover.py --tier 3 jsonl transcript converter
python -I -X utf8 discover\discover.py --tier 1,2 audio feature extraction
python -B -I _meta\tier.py          # dry run
python -B -I _meta\tier.py --write  # apply (after build_inventory.py if the inventory was rebuilt)
```

# Part 2 Workflows

> **Vocabulary update 2026-10-18.** This repo now says *Python skill* (an installable, runnable workflow, pure or hybrid) and *discovery* (a collected item not yet built into a skill). See `SKILLS.md`. "Proposed (not implemented)" below means ideas not yet built. Where this file says "capability", "supported by code" or "proposed", read "Python skill" or "idea not yet built". The text below is otherwise unchanged.

"Supported by code" means one script runs the sequence or its stages are chained by code. "Proposed" means independent scripts that could be combined but are not.

| ID | Workflow | Basis | Status |
|---|---|---|---|
| W1 | Chat export `.md` -> replies only (per-file handlers: ChatGPT JSON, Perplexity, print layouts) | Supported by code (`chat_reply_extractor.py`) | Verified: reproduces 19 existing outputs byte for byte |
| W2 | Any export folder -> `replies/ prompts/ documents/ unsure/ logs/` -> sections, dedup, facts -> Ollama labels -> quote/label verification | Supported by code (`pipeline.py all`) | Stages 1, 2, 4 verified (selftest, two identical runs, originals unchanged). Stage 3 (Ollama) written but not run |
| W3 | X links -> notes -> full articles -> videos/images -> transcripts | Supported by code (`run_all.py`, four steps, `--skip transcribe` to drop the last) | Owner-accepted as tested; not re-run here. Implementation unchanged. Historical notes, images, videos and transcripts were not copied |
| W4 | MHT / JSONL / ChatGPT JSON -> Markdown | Three standalone converters; no chaining script | `--help` verified only |
| W5 | PDF -> Markdown (tables option, overwrite guard) | `pdf_to_md.py` | `--help` verified only |
| W6 | Gemini share link -> parse/replay -> Markdown, with validation test scripts | `gemini_batch.py` etc. | Not verified (needs browser/CDP) |
| W7 | Query -> registry/skills/Python capabilities/notes -> ranked passages (optional Ollama synthesis) | `discover.py` | Verified: copy's tests pass against the Harness root; output identical to the original on 3 queries |
| W8 | Pipeline output -> discover (`--extra-sources FILE`) | Code path added to the copy only; default behaviour unchanged | Earlier run verified against the (now quarantined) historical output. Re-verified with synthetic fixture output in a temp folder only under `verify.py --full`; not part of the default local run |

### Proposed combinations (not implemented)

- W1/W2 then W7 on every new research export, run on a schedule.
- X notes (W3) through the pipeline's section/facts stage.
- Research consolidation (the scripts in `demand_discovery_consolidation\_work\`): hash -> parse -> assemble ledger -> build -> validate. It runs as separate scripts with hard-coded paths, so it is a manual sequence, not a toolkit workflow yet.

### Archive processing (left in the Harness)

`411_archive_processing` is a design sequence of stand-alone stage scripts (extract, branches, URLs, threads, corpus, stages 5-6). Each script stands alone; they are tied to Harness paths and a 390 MB output tree.

---

## Workflow cards (2026-10-14)

Existing workflows only. Status: **VERIFIED** (evidence in `VERIFICATION.csv`), **ACCEPTED** (owner-accepted, X pipeline), **INFERRED** (source read, not run). Combinations nobody has run are listed separately as **PROPOSED**.

### WF-A  Mixed export folder -> separated, de-duplicated sections (VERIFIED)
- **Outcome:** every file in a folder labelled prompt / reply / document / unsure with counts and hashes; reply text split into numbered sections with facts extracted.
- **Inputs:** folder of `.md/.json/.txt` (ChatGPT JSON exports, Perplexity-style prints, plain documents).
- **Tools and order:** `pipeline.py separate` -> `prepare` (or `all`).
- **Intermediate / final outputs:** `OUT\replies, prompts, documents, unsure, logs` then `OUT\prepared\sections.jsonl, duplicates.json, facts.csv, index.json`.
- **Dependencies:** Python standard library only. Reads sources only.
- **Verification:** `tests\test_pipeline.py` (12 tests, synthetic fixtures, no network) and `pipeline.py selftest`; `VERIFICATION.csv` run R2026...-local.
- **Limits:** only two formats are recognised; everything else becomes a document. Prompt/reply split for prints is rule-based. Empty tool/system/thought messages are counted, not kept.
- **Independent:** yes.

### WF-B  Sections -> local-model labels -> code-verified accepted rows (logic VERIFIED, live model UNVERIFIED)
- **Outcome:** labelled claims with exact quotes, rejects logged, counts computed by code.
- **Inputs:** WF-A output; Ollama running on `localhost:11434` with a pulled model.
- **Tools and order:** `pipeline.py llm --model NAME [--limit N]` -> `verify`.
- **Outputs:** `llm_cache\`, `llm_rows.jsonl`, `verified\accepted.jsonl, rejected.jsonl, counts.json`.
- **Verification:** unit tests drive the stage with a fake model (cache, rejection of fabricated quotes, bad labels, non-JSON, unreachable model). **No real Ollama run has been done.**
- **Limits:** label correctness is not guaranteed; only wording and allowed values are checked.
- **Independent:** needs an external local model.

### WF-C  Known chat export `.md` -> replies-only files (VERIFIED, pre-cleanup run)
- **Inputs:** a folder of chat-export `.md` files the script knows by name/layout. **Tools:** `chat_reply_extractor.py SRC --out OUT`. **Outputs:** `*_replies.md` plus `audit\*_dropped.txt` (what was removed).
- **Verification:** run R1 reproduced 19 existing outputs byte for byte (it read Harness `markdown_files`; not repeated).
- **Limits:** handlers keyed to specific files; best-effort for print layouts; without `--out` it writes beside `SRC`.
- **Independent:** yes (stdlib), but only for the files it was written for.

### WF-D  X links -> notes -> articles -> media -> transcripts (ACCEPTED)
- **Tools and order:** `run_all.py` runs `extractor.py` -> `fetch_articles.py` -> `download_videos.py` -> `transcribe_notes.py`; optional `consolidate_images.py` / `consolidate_videos.py` (flatten media, rewrite note links).
- **Outputs:** `output_notes\`, `videos\`, `images\`, transcripts appended to notes.
- **Dependencies:** network (fxtwitter API, yt-dlp), `requests`, `faster-whisper`, `av`; relative folders. **Limits:** not re-run, implementation untouched; historical content not in the toolkit. **Independent:** needs network and local media tools.

### WF-E  Gemini share link -> Markdown (INFERRED, not run)
- **Tools and order:** `gemini_replay.py` (one link) or `survey_candidates.py` -> `gemini_batch.py` (classify, fetch, dedupe, verify, manifest) using `gemini_parse.py`; `test*_validate.py` are per-link validation drivers.
- **Dependencies:** `requests`/network; the batch and survey scripts also read earlier `logs\*.json` and URL `.txt` files that exist only in the Harness. **Limits:** not self-contained; seven near-identical test drivers.

### WF-F  Single-step conversions to Markdown (INFERRED, `--help` only)
- `pdf_to_md.py`, `mht_to_md_tool\mht_to_md.py`, `knowledge_extraction\v2\{mht_to_md,jsonl_to_md,convert}.py`. Each is a stand-alone one-step tool; **no script chains them**, and none feeds WF-A.

### WF-G  Query the Harness registry and notes (VERIFIED, R1)
- `discover.py QUERY [--class ...] [--json] [--synthesize]` (read-only). **Limit:** indexes Harness records and the Harness workflow catalogue (D-001..D-021); toolkit tools are not in the index (0 toolkit hits for 3 queries). Tests read the live Harness corpus.

### WF-H  Inspect a GitHub repo and write a report (INFERRED, not run)
- `repo_inspect.py URL [--keywords] [--no-fetch] [--dry-run]` writes `repos\<owner>__<repo>\` and `reports\<owner>__<repo>.md`. Network; `--dry-run` exists but was not used.

### WF-I  Verify the toolkit (VERIFIED)
- `_meta\verify.py` (local) / `--full` (also reads Harness data). Appends to `VERIFICATION.csv`.

### PROPOSED workflows (untested combinations; each needs a small test first)

| ID | Combination | Why it might work | Open question |
|---|---|---|---|
| P1 | converters (MHT/JSONL/ChatGPT-JSON -> MD) -> WF-A | gives WF-A the Google AI Mode, Claude Code and ChatGPT material in Markdown | `detect()` recognises only ChatGPT JSON and Perplexity-style input, so converted chats would land in `documents/`, not be split (INFERRED from the code). A handler for the converters' output format would be needed |
| P2 | WF-A `documents/` and `replies/` -> `discover --extra-sources` | earlier run found passages from pipeline output | verified only against the (now quarantined) historical output |
| P3 | WF-A + WF-B on the synthetic fixtures with real Ollama | fixtures and tests already exist | does a real model produce parseable JSON and exact quotes? |
| P4 | X notes (WF-D) -> WF-A `prepare` | notes are Markdown with URLs and dates | notes have no role markers, so they would be documents; only dedup/facts apply |
| P5 | `repo_inspect` report -> WF-A `prepare` | report is Markdown | same as P4 |

### WF-J  Conversation exports (any supported format) -> prompts and replies (VERIFIED on synthetic data, 2026-10-14)
- **Inputs:** a folder of `.jsonl`, `.mht/.mhtml`, `.md`, `.json` or `.txt`.
- **Tools and order:** `convert_for_pipeline.py SRC OUT` runs `jsonl_to_md.py` or `mht_to_md.py` as subprocesses, then `pipeline.py` (`speaker_md`, or the direct handlers).
- **Outputs:** `OUT\prompts`, `OUT\replies`, `OUT\documents`, `OUT\unsure`, `OUT\logs\adapter_manifest.json`.
- **Verification:** 21 unit tests: speaker split, count-mismatch refusal, unknown-speaker refusal, end-to-end provenance, source hashes unchanged, repeat runs identical, converter failure reported, duplicate names refused before writing, missing folder. Recorded in `VERIFICATION.csv` (local run, 2026-10-14).
- **Limits:** only the converter shapes in `prompt_reply_pipeline\README.md`. Real Google AI Mode and real Claude Code session files were not tested. A reply that contains a heading matching a speaker name makes the count check fail, so the file is refused rather than mis-split.
- **Independent:** no network, no Harness files. Needs bs4 and markdownify for MHT only.

This implements the earlier proposal P1 (converters to the pipeline). P2 to P5 are unchanged.

### WF-K  Conversation exports -> prompts and replies -> discoverable search (VERIFIED on synthetic data, 2026-10-14)
- **Inputs:** a folder of conversation exports and documents (as WF-J).
- **Tools and order:** `convert_for_pipeline.py SRC OUT` (writes the split output and `discover_extra_sources.json`), then `discover.py --extra-sources OUT\discover_extra_sources.json QUERY`.
- **Outputs:** `OUT\replies`, `OUT\documents`, `OUT\prompts` (not searched), `OUT\discover_extra_sources.json`, `OUT\logs\adapter_manifest.json`.
- **Verification:** `tests\test_discovery_link.py` (6 tests: config excludes prompts; reply and document text found with provenance; prompt-only word never returned; control finds nothing without the config; repeatable). Run against an empty root so no Harness data is read.
- **Limits:** the search is keyword-based and uses discover's existing scoring; it has not been checked for relevance against real material. Prompts are indexed nowhere, so a question alone cannot be found. Output paths in the config are absolute, so a moved output folder needs a new config.
- **Independent:** yes, no Harness files or network.

### WF-G (update 2026-10-14)  Find toolkit tools
- Use `discover.py --class toolkit "<need>"`. Without `--class toolkit` the search is unchanged and finds no toolkit tools.
- Root cause (verified by code reading and counts): discover loads only the Harness registries, the PY_LISTiNG ledgers, the workflow catalogue, and the opt-in note folders. No toolkit source was read, and no registry mentions the newest scripts (0 mentions for prompt_reply_pipeline, convert_for_pipeline, chat_reply_extractor, pdf_to_md, discover.py, repo_inspect). The toolkit's own INVENTORY.csv was also missing the newest scripts.
- Fix: a new opt-in class reads the existing INVENTORY.csv (no new registry); the inventory now lists the 6 new files, and docstrings are filled from the files themselves.

### Imported workflows (2026-10-14)

- **W9 AudioLab analysis:** `audiolab analyze` -> `bars` (set meter and downbeat by ear) -> `interpret` -> `visual map` -> `motion plan` -> `scripts/export_web.py`. Python steps are supported by code. Each stage refuses stale inputs by hash. Verified by the 385-test suite; the web export step has not been run here.
- **W10 Course lesson checks:** `scripts/audit_lessons.py` -> `scripts/lesson_run.py` (syntax check; `--execute` runs code) -> `scripts/run_lesson_tests.py`. Not run here.
- **W11 Course project grading:** `scripts/project_test.py --all --solution --strict`. The author's report of 2026-09-29 says 1,382 core tests pass. Not re-run here.
- **W12 Course catalog and skills:** `scripts/build_catalog.py`, `scripts/install_skills.py <target>`. Not run here.

- **W13 API and MCP server (course):** run the site build (`node site/build.js`, `build-projects.js --strict`, `build-agents.js`, `build-manuals.js`, `clean-urls.js`, `version-assets.js`) inside `imports/ai_engineering/`. That writes `generated/agent-content.json`, `site/agent-pages/`, and the SEO and terms JSON the API reads. Then serve `api/` with a Node handler. The MCP server exposes two read-only tools over JSON-RPC. Built, not run here.

### WF-L  ChatGPT takeout shards -> PROMPTS and REPLIES Markdown (RUN by owner 2026-10-16, verify PASS)
- **Inputs:** `conversations-000.json` ... `conversations-007.json` (originals, read only); optional `conversation_asset_file_names.json` and a hash CSV (`--hashes`).
- **Tools and order:** `takeout_to_clean_md.py run SRC OUT` -> `takeout_to_clean_md.py verify SRC OUT` (`tools\chatgpt_takeout_split\`).
- **Outputs:** `OUT\PROMPTS\<shard>\*.md`, `OUT\REPLIES\<shard>\*.md`, `manifest.csv`, `run.log`, `verify.log`.
- **Rules:** user/assistant text only; main path in original order, other branches labelled alternate under the message they diverge from; per-message `node_id` provenance; thinking/system/tool/empty/hidden messages counted, not written.
- **Verification:** owner ran `run` and `verify` on the 8 real shards: 771 conversations, 0 problems, PASS; written + skipped counts equal all 267,854 message nodes (skipped = thinking blocks and empty messages only). No unit tests. `verify` shares the script's classification code, so it checks completeness and text equality, not the prompt/reply rule itself.
- **Forks (added 2026-10-17, run by owner, verify PASS):** conversations sharing message ids are linked (`branched_from`/`branches` headers, divergence marker, `OUT\FORKS.md`): 23 families, 543 of 771 conversations, 520 branches.
- **Independent:** yes (stdlib, no network, no Harness files). Does not replace WF-A/WF-J: this reads whole takeout shards, which `pipeline.py` cannot.

### WF-M  Clean conversations -> message database -> subject dossier (RUN by owner 2026-10-17)
- **Inputs:** the output of WF-L (`PROMPTS\` and `REPLIES\` Markdown, plus its `manifest.csv`). `aliases.json` (subject names, domain terms, topics) and `exclude.json` (private conversations, local only) beside the scripts.
- **Tools and order:** `tools\knowledge_recovery
ecover.py` `ingest` -> `check` -> `domain SUBJECT --examples N` -> `terms SUBJECT` -> `dossier SUBJECT`; also `search`, `conflicts`, `exclusions`.
- **Outputs (outside git):** `output\knowledge_recovery\knowledge.db`, `dossiers\<subject>_dossier.md`, `_evidence.csv`, `_full\`.
- **Rules:** one row per unique `node_id` (branch copies stored once, every file kept in `occurrences`); SQLite FTS5 with vocabulary-based spelling expansion; families scored, neighbours added; related-by-domain-terms kept in its own section; assistant text labelled proposed/claimed, never fact; all labels heuristic.
- **Verification:** owner ran `ingest` and `check` on the real archive: 236,083 entries -> 10,342 unique messages, 771 conversations, all checks PASS (2 whitespace-only variants kept). `dossier VoltaEdge`: 69 hits, 51 context, 81 related. No unit tests; section-level extraction not built.
- **Independent:** yes (stdlib only; needs a Python SQLite with FTS5).

# Part 3 Next actions

> **Vocabulary update 2026-10-18.** This repo now says *Python skill* (an installable, runnable workflow, pure or hybrid) and *discovery* (a collected item not yet built into a skill). See `SKILLS.md`. Where this file says "capability", "supported by code" or "proposed", read "Python skill" or "idea not yet built". The text below is otherwise unchanged.

Based on `CAPABILITIES.md`, `WORKFLOWS.md`, `INVENTORY.csv` and `VERIFICATION.csv`. Nothing below has been started.

### Update 2026-10-14

- Done: converter output now feeds the pipeline (WF-J), verified on synthetic data. Not yet tested: real Google AI Mode captures and real Claude session files.
- Next (unchanged recommendation): a live Ollama run of WF-B on the synthetic fixtures.

### Verified workflows ready to use

| Workflow | Use it for |
|---|---|
| WF-A `pipeline.py separate/prepare/all` | Turn any folder of chat exports and documents into prompt / reply / document buckets, de-duplicated sections and extracted facts, with source hashes checked |
| WF-C `chat_reply_extractor.py --out ...` | Replies-only versions of the specific chat files it knows (always pass `--out`) |
| WF-G `discover.py` | Search the Harness registry, workflow catalogue and notes |
| WF-I `_meta\verify.py` | Re-check the toolkit |

(WF-D, the X pipeline, is accepted as working; it is unchanged.)

### Highest-priority integration opportunities

1. **Live local-model run** of WF-B (labels + code verification) - the only stage of the main workflow never run for real.
2. **Converters -> WF-A bridge** (P1): the PDF/MHT/JSONL/ChatGPT-JSON converters are stand-alone and their Markdown would not be split by WF-A.
3. **Make toolkit tools discoverable**: `discover` returned 0 toolkit tools for three queries, so tools are found only by reading `CAPABILITIES.md`.

### Proposed workflows needing a small test

- P3 WF-A + WF-B on the 5 synthetic fixtures with real Ollama (smallest).
- P1 run one converter's output through `pipeline.py separate` and look at the labels.
- P2 pipeline output through `discover --extra-sources` using synthetic output only.
- P4 / P5 X notes or `repo_inspect` reports through `prepare` (dedup and facts only).

### Material capability gaps

- No bridge from conversion tools to the pipeline (INFERRED from `detect()`).
- Real Ollama never exercised; label quality unknown.
- Toolkit tools not discoverable by what they do.
- No generic HTML/DOCX/XLSX/PPTX ingestion, no general audio/media tool (AudioLab is external), OCR status of `pdf_to_md` UNKNOWN.
- Repeated functionality (INFERRED from docstrings and sizes, not diffed): two MHT converters; seven near-identical Gemini test drivers; four `cdp_capture*` variants.
- `convert.py` and `pdf_to_md.py` have no usage documentation; the cross-document consolidation scripts (ledger, conflict and count building) exist only in the Harness.

### Single recommended next task

**Run `pipeline.py llm` + `verify` on the five synthetic fixtures with a real local Ollama model, and record accepted/rejected counts and whether a second run reproduces the same rows.**

Why first:
- It is the only link in the main chain (separate -> prepare -> label -> verify) that has not been run for real; everything you want to automate with a local model depends on it.
- It is small: fixtures, tests and the cache already exist, it uses only localhost, and it changes no tool.
- Its result decides the next steps: if the model's output passes the quote check, extend the pipeline to converter output (P1); if it fails, the prompt and schema need work before anything is built on top.
- The other opportunities (a bridge, tool discovery) are worth more only after we know the labelling stage works.

Needs from you: confirm Ollama is running and which model to use (not checked in this pass).

# Part 4 What still depends on the Harness

### Deliberately not copied

| Component | Reason |
|---|---|
| `tools\411_archive_processing` (24 py) | Hard-coded paths (`C:\Users`, `MASTER_HARNESS`, `tool harness`); 390 MB of outputs and logs sit beside the code. A copy would still write to or read from the Harness. |
| `tools\KNOWLEDGE_EXTRACTION\v1_frozen` | Frozen snapshot with a checksum file tied to its data. Copying breaks the freeze meaning. (`v2` converters were copied.) |
| `tools\Browser-DevTools-Python-Research` (103 py) | Separate research project with path markers, 3 files that do not parse, and a duplicate copy under `1_PY\assets`. |
| `add_skill.py`, `registry\apply_additions.py` | Write the shared registries. |
| `reports\*.py`, `assets\**\*.py` | Harness-owned paths and data. |
| `tools\X\CODE_OUT`, `DOCX_OUT`, `DATA_OUT` | Generated output folders (deck builder output), not toolkit tools. |
| AudioLab, learning repository, `chat-test`, desktop snapshots | Unrelated projects or duplicates; recorded as external, not moved. |

### What the toolkit copies still use from the Harness

- **discover copy**: reads `1_PY\registry\view\*`, `registry\families\python-capabilities\records.json`, `assets\` ledgers, `WORKFLOW_DISCOVERY_CATALOGUE.md`, and note folders (`3_NOTES`, `4_MCP_AND_API_USAGE`, `links.md\output_notes`, `1_PY\assets\HaNESS\...`). Path set in `discover\discover_config.json`. Read-only.
- **discover tests** (`discover\test_discover.py`, `test_ollama_synthesis.py`): the first runs against the live Harness corpus (read-only). Not re-run in the 2026-10-14 cleanup (code unchanged).
- **prompt_reply_pipeline**: no Harness dependency any more. Tests use `tests\fixtures\` (synthetic) and temp folders. VERIFIED (12 tests). Real Ollama not run.
- **chat_reply_extractor**: no Harness dependency in the code; its file handling is keyed to fixed file names (see `TOOLKIT_INVENTORY_RECONCILED.md` in the Harness). Its earlier byte-identical check read `markdown_files` (R1 verification rows); not repeated.
- **gemini_md2**: several scripts read result JSONs under `logs\` and `.txt` URL lists that exist only in the Harness; the debug analysis scripts need recorded `.bin` captures that are not in the toolkit. Not self-contained; UNKNOWN whether they run here.
- **Quarantine**: `C:\Users\USER\Desktop\Python_Toolkit_QUARANTINE\` holds the moved historical material. Nothing in the toolkit depends on it (VERIFIED by search).
- **x_pipeline**: relative output folders (`output_notes`, `videos`, `images`); must be run from a folder that holds them. Not run.

### Callers that would change before retiring the original `discover.py`

- Only `1_PY\test_discover.py` and `1_PY\test_ollama_synthesis.py` import it (verified by scan).
- 26 documents and CSVs mention `discover.py` by name (for example under `2_OPEN_SOURCE_AND_USAGE\repo_url_compact_*`); these are references, not code callers. They would need updating if the original moved.

### Not done, needs approval

- Deleting any original; retiring the Harness `discover.py`; changing shared registries; moving `411_archive_processing`.

### Update 2026-10-14: discovery of toolkit tools
- `discover --class toolkit` depends only on the toolkit's own `INVENTORY.csv` and the files it names. No Harness registry, catalogue or note is read for that class. VERIFIED by the empty-root test.
- Default `discover` queries still read the Harness registries (unchanged, by design).

# Part 5 Scope review and cleanup record

Rules applied: the toolkit holds reusable implementations and the minimum supporting structure. No historical documents, archives or old outputs. Nothing was deleted or moved in this review. File-level classification: `SCOPE_REVIEW.csv` (regenerate with `python -I -X utf8 _meta\scope_review.py`).

### Counts (before the folder/doc updates in this task)

| Class | Files |
|---|---|
| 1 Reusable implementation | 31 |
| 2 Required configuration / dependency | 5 |
| 3 Required test | 12 |
| 4 Input/output directory | `outputs\` (added) |
| 5 Operational documentation / inventory | 13 |
| 6 Historical document | 3 |
| 7 Generated historical output | 66 |
| 8 Uncertain | 15 |

### Complies

- No chat exports, old research collections or archives were copied into `tools\` or `discover\`.
- `411_archive_processing`, `v1_frozen`, the Browser-DevTools project, and all X notes/images/videos/transcripts were left out.
- The X pipeline was not run or altered; only its 7 scripts and `requirements.txt` are present.
- The pipeline and extractor both remain; neither is deleted or merged.

### Does not comply (needs your decision)

| Material | Location | Class | Can it be excluded without breaking a reusable tool? |
|---|---|---|---|
| Pipeline output generated from the historical `markdown_files` (59 files, 5.7 MB) | `workspace\research_pipeline\` | 7 | Mostly yes, but two items use it: `_meta\verify.py` (check 7b writes there) and `discover\extra_sources_research.json` (points at it). Relocating requires re-pointing both. Not done. |
| Past test outputs and reports (5 conversation `.md`, 2 reports) | `tools\gemini_md2\output\`, `logs\` | 7 | Yes. The scripts write to these folders; they do not read the old files. Whether the scripts create the folders themselves is **not verified**. |
| Past debugging notes (3 `.md`) | `tools\gemini_md2\debug\` | 6 | Yes; they are notes, not code. |

### Uncertain (15 files)

- `tools\gemini_md2\debug\*.py` and `debug\backup\*.py` (14 files): debugging/experiment scripts and backup copies. Reusability not established.
- `discover\extra_sources_research.json`: a config tied to the historical pipeline output above.

### Input/output folders actually needed

| Folder | Purpose | Used by |
|---|---|---|
| `outputs\` (created, empty) | Designated output location | Any workflow run with `--out` / `OUT` pointed here |
| Inputs | None kept; supplied on the command line at run time | All workflows |
| Script-relative `output\`, `logs\`, `debug\` inside `tools\gemini_md2\` | Written by its validation scripts | Gemini tests (not run) |

### Files required by reusable tools

- Code, `requirements.txt`, and READMEs under `tools\`.
- `discover\`: `discover.py`, `discover_config.json`, the two test scripts, `CHANGES_FROM_ORIGINAL.md` and the `.diff` files.
- **Dependencies on historical data:** `discover` tests read the live Harness corpus. The pipeline self-test reads `markdown_files`. Synthetic fixtures inside the toolkit would remove this, but creating them means changing the tests, so it is proposed, not done.

### Changes made in this review

- Created `outputs\` with a README.
- Updated `CAPABILITIES.md` (when to use `prompt_reply_pipeline` vs `chat_reply_extractor`; X pipeline marked owner-accepted as tested) and `WORKFLOWS.md`.
- Regenerated `INVENTORY.csv` (x_pipeline status wording) and added `SCOPE_REVIEW.csv`.

---

## Cleanup record (2026-10-14) - resolution of the items above

Everything below was moved, not deleted. Quarantine: `C:\Users\USER\Desktop\Python_Toolkit_QUARANTINE\` (outside the toolkit; `MANIFEST.csv` has original path, new path and SHA-256 before/after for each of 69 files; also appended to `MIGRATION_LOG.csv`).

| Item | Finding | Action | Status |
|---|---|---|---|
| `workspace\research_pipeline\` (59 files) | All generated pipeline output from historical `markdown_files` (replies, prompts, documents, logs, prepared sections). Referenced only by `_meta\verify.py`, `discover\extra_sources_research.json` and documentation. No current workflow needs the contents. | Moved to `...QUARANTINE\workspace_research_pipeline\`; empty `workspace\` removed | VERIFIED (hashes, absence from toolkit) |
| `discover\extra_sources_research.json` | Toolkit config pointing at the quarantined folder | Moved to `...QUARANTINE\discover_config_stale\`. `--extra-sources` stays an opt-in flag; no discovery code changed | VERIFIED moved; default discovery output unchanged INFERRED (code untouched since the earlier identical-output check) |
| `_meta\verify.py` | Wrote into `workspace\` and read the stale config | Default run is now toolkit-local and uses temp folders + synthetic fixtures; checks that read Harness data are behind `--full`; VERIFICATION.csv is appended to (earlier rows kept, tagged `R1-pre-cleanup`) | VERIFIED (local run) |
| `tools\gemini_md2\output\` (5 `.md`), `logs\` (2 `.md`) | Generated by the validation scripts in past runs. Scripts create these folders themselves with `mkdir(exist_ok=True)` before writing (VERIFIED by reading source). Only `debug\test3_regression_analysis.py` (a one-off analysis that also needs captures not in the toolkit) read the old outputs | Moved to `...QUARANTINE\gemini_md2_artifacts\` | VERIFIED moved; scripts not executed (browser) |
| `tools\gemini_md2\debug\network_analysis.md`, `prototype_analysis.md` | Past debugging notes, not referenced by any script | Moved to quarantine | VERIFIED |
| `tools\gemini_md2\debug\payload_mapping.md` | Referenced by the docstring of `gemini_parse.py` ("see debug/payload_mapping.md") | **Kept** (documentation the code points to) | INFERRED it is still wanted |
| 17 Gemini debug/backup scripts | See `GEMINI_SCRIPT_CLASSIFICATION.csv`: REUSABLE 1, SPECIALIZED 8, DUPLICATE 4, UNRESOLVED 4, OBSOLETE_CONFIRMED 0 | All kept; none removed | Classified from source; none executed |
| `prompt_reply_pipeline` self-test depended on `markdown_files` | Now covered by `tests\test_pipeline.py` (12 tests) and `selftest` on `tests\fixtures\` (5 fabricated files) | Added tests and fixtures; `pipeline.py` logic not changed in this pass | VERIFIED: 12 tests OK, no network, fixtures unchanged, outputs only in temp folders |

Remaining after cleanup: 4 UNRESOLVED Gemini scripts (`analyze1.py`, `analyze2.py`, `test3_posthoc.py`, `test3_posthoc2.py`); one disposable `discover\__pycache__` (bytecode from an earlier test run, left in place).
