# Capabilities

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

## Which chat tool to use

| Tool | Use when | Notes |
|---|---|---|
| `prompt_reply_pipeline` (**canonical** for future prompt/reply processing) | The input is a folder of unknown files: ChatGPT JSON exports, Perplexity-style prints, or plain documents | Detects the format from content; files with no role markers are kept as documents (never guessed); exact split for JSON exports; includes dedup, facts, optional Ollama stage and verification |
| `chat_reply_extractor` (kept as a separate capability) | The files are known conversations that need their file-specific handling (e.g. print layouts, pasted-notes files) | Handlers are keyed to specific file names and layouts; not every Markdown file is a chat |

Neither tool is to be deleted or merged without approval.

## Input / output behaviour per tool

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

## Proposed (not built)

- Add unknown-structure chat prints (Branch, HARPA) to the pipeline as handlers instead of documents.
- Merge `convert.py` copies (a second copy exists at `Desktop\chat-test\`; not compared).
- Wrap the research-consolidation scripts (`demand_discovery_consolidation\_work\`) as a toolkit workflow after their hard-coded paths are parameterised.

## Unresolved

- Whether `pipeline.py` should replace `chat_reply_extractor.py` (overlapping job; the extractor has file-specific handlers the pipeline does not).
- Dependencies: pymupdf, bs4, markdownify, requests, faster-whisper, av, websockets, ijson were present at check time; nothing was installed.

---

# Capability map by outcome (2026-10-14)

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

## Capability gaps (no implementation found in the toolkit)

- A way to find **toolkit** tools by what they do (`discover` does not index them).
- A bridge from converters (PDF/MHT/JSONL/ChatGPT-JSON -> Markdown) to the pipeline's prompt/reply separation (see workflows).
- A live, end-to-end run of the local-model stage.
- Generic HTML, DOCX, XLSX, PPTX ingestion; general audio/media processing (AudioLab is external); OCR (UNKNOWN whether `pdf_to_md` does any).
- Cross-document consolidation (ledger, conflicts, counts) as a reusable tool.

## Update 2026-10-14: converters feed the pipeline

| Capability | Tools | Status |
|---|---|---|
| Split prompts and replies from converter Markdown (ChatGPT / Claude / Google AI shape) | `pipeline.py` `speaker_md` | VERIFIED on synthetic fixtures. Before the change the same file was labelled `document` (run recorded in this session) |
| JSONL transcript -> prompts and replies | `convert_for_pipeline.py` + `jsonl_to_md.py` | VERIFIED on a synthetic Claude-style session (includes a bad line and a meta record) |
| Google AI Mode MHT -> prompts and replies | `convert_for_pipeline.py` + `mht_to_md.py` | VERIFIED on a synthetic MHT. Real Google AI Mode captures NOT tested (structure may differ) |
| PDF is never treated as a conversation | `convert_for_pipeline.py` | VERIFIED (skipped with reason) |
| ChatGPT `convert.py` in the adapter | not used | Decision: it runs at import time; its input is already split by the pipeline |

## Real-input check (2026-10-14, read-only copies, no outputs kept in the toolkit)

| Input | Result | Verdict |
|---|---|---|
| Real Claude Code session (`.jsonl`, 659 lines) | 17 prompts / 17 replies. Independent count from the raw JSON: 17 user and 17 assistant text records. 11 replies contain their own `##` headings, kept inside the reply. No tool markers in output | VERIFIED. Found and fixed one defect first: the first version refused the file because of the embedded headings |
| Real Google AI Mode `.mht` export | **Not available** in the Harness. The only real `.mht` (`X\MHT_ARCHIVE\Claude Pro Overview.mht`) is a saved web page with no AI Mode turns; the converter refuses it (`converter_failed`) | NOT TESTED on a real export. The refusal is correct |
| Perplexity originals (`kaka`, `Deliverable A`, YouTube copy) | 11/11, 7/6, 9/9: identical to the earlier run | VERIFIED unchanged |
| ChatGPT JSON originals (`1`, `411`, `422`, `kkk`, `qqa`, `qqq`, `{`) | identical to the earlier run | VERIFIED unchanged |
| Detection over all 21 originals | 7 ChatGPT JSON, 4 Perplexity, 10 unknown: same as before the change | VERIFIED: no silent reclassification |

## Update 2026-10-14: pipeline output is discoverable (synthetic)

| Capability | Tools | Status |
|---|---|---|
| Search converted conversation replies and documents with discover.py | `convert_for_pipeline.py` (writes `discover_extra_sources.json`) + `discover.py --extra-sources` | VERIFIED on freshly generated synthetic output (6 tests, run against an EMPTY root so the Harness is not read) |
| Prompts are excluded from search results | adapter config lists `replies` and `documents` only | VERIFIED (a prompt-only word is never returned; the test checks the word is present in the prompts) |
| Control: without the config nothing synthetic is found | discover.py | VERIFIED |
| Harness unchanged by these checks | verify.py snapshot | VERIFIED (0 changed, 0 added, 0 removed) |

## Update 2026-10-14: toolkit tools are discoverable (opt-in)

- Command: `python -I -X utf8 discover\discover.py --class toolkit "<need>"`.
- Source: the toolkit's own `INVENTORY.csv`, rows that have a `toolkit_path`. No new registry was created, and the Harness registries are not changed.
- Status is shown as recorded: `VERIFIED`, `HELP ONLY` (checked with --help, not executed), `TEST LINK` (a named test exists; see that record), `NOT VERIFIED`, or `ACCEPTED` (owner-accepted X pipeline).
- Verified by `discover\test_toolkit_discovery.py` (9 tests, empty root). The default query results are identical to the pre-change copy for 8 control queries (`_meta\control_compare.py`).
- Capability and workflow notes (the text of `CAPABILITIES.md` and `WORKFLOWS.md`, shown as notes, not as verified records): from the Toolkit root, `python -I -X utf8 discover\discover.py --root . --class note --extra-sources discover\toolkit_notes.json --notes-root . "<need>"`. The `missing source` warnings are expected here.

## Update 2026-10-14: integrations from ai-engineering-from-scratch (MIT, commit 1c8e62b)

| Capability | Tool | Layer | Status |
|---|---|---|---|
| Validate JSON-like data against a JSON Schema 2020-12 subset; name-keyed tool registry | `tools\schema_validate\schema_validate.py` | 2 | VERIFIED: 19 upstream tests pass on the copy (logic unmodified) |
| Read-only per-route check of interpreter, commands and modules the Toolkit tools need | `tools\env_preflight\env_preflight.py` (`--route pipeline/converters/x_pipeline/gemini/audio_lab/all`) | 1 | VERIFIED: 6 toolkit-written tests + run on this machine. Adapted from the course `verify.py`; `_meta\verify.py` is a different job (checks the Toolkit's files) |

Both are findable with `discover.py --class toolkit`. The course repo itself sits at `ai-engineering-from-scratch\` (unmodified; git clean at HEAD 1c8e62b). Provenance: each tool folder has `PROVENANCE.md` and `LICENSE.upstream`.

## Imported capabilities (2026-10-14)

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

## API and MCP (imported 2026-10-14)

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

## Tiers (2026-10-14)

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
