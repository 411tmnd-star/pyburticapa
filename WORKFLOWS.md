# Workflows

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

## Proposed combinations (not implemented)

- W1/W2 then W7 on every new research export, run on a schedule.
- X notes (W3) through the pipeline's section/facts stage.
- Research consolidation (the scripts in `demand_discovery_consolidation\_work\`): hash -> parse -> assemble ledger -> build -> validate. It runs as separate scripts with hard-coded paths, so it is a manual sequence, not a toolkit workflow yet.

## Archive processing (left in the Harness)

`411_archive_processing` is a design sequence of stand-alone stage scripts (extract, branches, URLs, threads, corpus, stages 5-6). Each script stands alone; they are tied to Harness paths and a 390 MB output tree.

---

# Workflow cards (2026-10-14)

Existing workflows only. Status: **VERIFIED** (evidence in `VERIFICATION.csv`), **ACCEPTED** (owner-accepted, X pipeline), **INFERRED** (source read, not run). Combinations nobody has run are listed separately as **PROPOSED**.

## WF-A  Mixed export folder -> separated, de-duplicated sections (VERIFIED)
- **Outcome:** every file in a folder labelled prompt / reply / document / unsure with counts and hashes; reply text split into numbered sections with facts extracted.
- **Inputs:** folder of `.md/.json/.txt` (ChatGPT JSON exports, Perplexity-style prints, plain documents).
- **Tools and order:** `pipeline.py separate` -> `prepare` (or `all`).
- **Intermediate / final outputs:** `OUT\replies, prompts, documents, unsure, logs` then `OUT\prepared\sections.jsonl, duplicates.json, facts.csv, index.json`.
- **Dependencies:** Python standard library only. Reads sources only.
- **Verification:** `tests\test_pipeline.py` (12 tests, synthetic fixtures, no network) and `pipeline.py selftest`; `VERIFICATION.csv` run R2026...-local.
- **Limits:** only two formats are recognised; everything else becomes a document. Prompt/reply split for prints is rule-based. Empty tool/system/thought messages are counted, not kept.
- **Independent:** yes.

## WF-B  Sections -> local-model labels -> code-verified accepted rows (logic VERIFIED, live model UNVERIFIED)
- **Outcome:** labelled claims with exact quotes, rejects logged, counts computed by code.
- **Inputs:** WF-A output; Ollama running on `localhost:11434` with a pulled model.
- **Tools and order:** `pipeline.py llm --model NAME [--limit N]` -> `verify`.
- **Outputs:** `llm_cache\`, `llm_rows.jsonl`, `verified\accepted.jsonl, rejected.jsonl, counts.json`.
- **Verification:** unit tests drive the stage with a fake model (cache, rejection of fabricated quotes, bad labels, non-JSON, unreachable model). **No real Ollama run has been done.**
- **Limits:** label correctness is not guaranteed; only wording and allowed values are checked.
- **Independent:** needs an external local model.

## WF-C  Known chat export `.md` -> replies-only files (VERIFIED, pre-cleanup run)
- **Inputs:** a folder of chat-export `.md` files the script knows by name/layout. **Tools:** `chat_reply_extractor.py SRC --out OUT`. **Outputs:** `*_replies.md` plus `audit\*_dropped.txt` (what was removed).
- **Verification:** run R1 reproduced 19 existing outputs byte for byte (it read Harness `markdown_files`; not repeated).
- **Limits:** handlers keyed to specific files; best-effort for print layouts; without `--out` it writes beside `SRC`.
- **Independent:** yes (stdlib), but only for the files it was written for.

## WF-D  X links -> notes -> articles -> media -> transcripts (ACCEPTED)
- **Tools and order:** `run_all.py` runs `extractor.py` -> `fetch_articles.py` -> `download_videos.py` -> `transcribe_notes.py`; optional `consolidate_images.py` / `consolidate_videos.py` (flatten media, rewrite note links).
- **Outputs:** `output_notes\`, `videos\`, `images\`, transcripts appended to notes.
- **Dependencies:** network (fxtwitter API, yt-dlp), `requests`, `faster-whisper`, `av`; relative folders. **Limits:** not re-run, implementation untouched; historical content not in the toolkit. **Independent:** needs network and local media tools.

## WF-E  Gemini share link -> Markdown (INFERRED, not run)
- **Tools and order:** `gemini_replay.py` (one link) or `survey_candidates.py` -> `gemini_batch.py` (classify, fetch, dedupe, verify, manifest) using `gemini_parse.py`; `test*_validate.py` are per-link validation drivers.
- **Dependencies:** `requests`/network; the batch and survey scripts also read earlier `logs\*.json` and URL `.txt` files that exist only in the Harness. **Limits:** not self-contained; seven near-identical test drivers.

## WF-F  Single-step conversions to Markdown (INFERRED, `--help` only)
- `pdf_to_md.py`, `mht_to_md_tool\mht_to_md.py`, `knowledge_extraction\v2\{mht_to_md,jsonl_to_md,convert}.py`. Each is a stand-alone one-step tool; **no script chains them**, and none feeds WF-A.

## WF-G  Query the Harness registry and notes (VERIFIED, R1)
- `discover.py QUERY [--class ...] [--json] [--synthesize]` (read-only). **Limit:** indexes Harness records and the Harness workflow catalogue (D-001..D-021); toolkit tools are not in the index (0 toolkit hits for 3 queries). Tests read the live Harness corpus.

## WF-H  Inspect a GitHub repo and write a report (INFERRED, not run)
- `repo_inspect.py URL [--keywords] [--no-fetch] [--dry-run]` writes `repos\<owner>__<repo>\` and `reports\<owner>__<repo>.md`. Network; `--dry-run` exists but was not used.

## WF-I  Verify the toolkit (VERIFIED)
- `_meta\verify.py` (local) / `--full` (also reads Harness data). Appends to `VERIFICATION.csv`.

## PROPOSED workflows (untested combinations; each needs a small test first)

| ID | Combination | Why it might work | Open question |
|---|---|---|---|
| P1 | converters (MHT/JSONL/ChatGPT-JSON -> MD) -> WF-A | gives WF-A the Google AI Mode, Claude Code and ChatGPT material in Markdown | `detect()` recognises only ChatGPT JSON and Perplexity-style input, so converted chats would land in `documents/`, not be split (INFERRED from the code). A handler for the converters' output format would be needed |
| P2 | WF-A `documents/` and `replies/` -> `discover --extra-sources` | earlier run found passages from pipeline output | verified only against the (now quarantined) historical output |
| P3 | WF-A + WF-B on the synthetic fixtures with real Ollama | fixtures and tests already exist | does a real model produce parseable JSON and exact quotes? |
| P4 | X notes (WF-D) -> WF-A `prepare` | notes are Markdown with URLs and dates | notes have no role markers, so they would be documents; only dedup/facts apply |
| P5 | `repo_inspect` report -> WF-A `prepare` | report is Markdown | same as P4 |

## WF-J  Conversation exports (any supported format) -> prompts and replies (VERIFIED on synthetic data, 2026-10-14)
- **Inputs:** a folder of `.jsonl`, `.mht/.mhtml`, `.md`, `.json` or `.txt`.
- **Tools and order:** `convert_for_pipeline.py SRC OUT` runs `jsonl_to_md.py` or `mht_to_md.py` as subprocesses, then `pipeline.py` (`speaker_md`, or the direct handlers).
- **Outputs:** `OUT\prompts`, `OUT\replies`, `OUT\documents`, `OUT\unsure`, `OUT\logs\adapter_manifest.json`.
- **Verification:** 21 unit tests: speaker split, count-mismatch refusal, unknown-speaker refusal, end-to-end provenance, source hashes unchanged, repeat runs identical, converter failure reported, duplicate names refused before writing, missing folder. Recorded in `VERIFICATION.csv` (local run, 2026-10-14).
- **Limits:** only the converter shapes in `prompt_reply_pipeline\README.md`. Real Google AI Mode and real Claude Code session files were not tested. A reply that contains a heading matching a speaker name makes the count check fail, so the file is refused rather than mis-split.
- **Independent:** no network, no Harness files. Needs bs4 and markdownify for MHT only.

This implements the earlier proposal P1 (converters to the pipeline). P2 to P5 are unchanged.

## WF-K  Conversation exports -> prompts and replies -> discoverable search (VERIFIED on synthetic data, 2026-10-14)
- **Inputs:** a folder of conversation exports and documents (as WF-J).
- **Tools and order:** `convert_for_pipeline.py SRC OUT` (writes the split output and `discover_extra_sources.json`), then `discover.py --extra-sources OUT\discover_extra_sources.json QUERY`.
- **Outputs:** `OUT\replies`, `OUT\documents`, `OUT\prompts` (not searched), `OUT\discover_extra_sources.json`, `OUT\logs\adapter_manifest.json`.
- **Verification:** `tests\test_discovery_link.py` (6 tests: config excludes prompts; reply and document text found with provenance; prompt-only word never returned; control finds nothing without the config; repeatable). Run against an empty root so no Harness data is read.
- **Limits:** the search is keyword-based and uses discover's existing scoring; it has not been checked for relevance against real material. Prompts are indexed nowhere, so a question alone cannot be found. Output paths in the config are absolute, so a moved output folder needs a new config.
- **Independent:** yes, no Harness files or network.

## WF-G (update 2026-10-14)  Find toolkit tools
- Use `discover.py --class toolkit "<need>"`. Without `--class toolkit` the search is unchanged and finds no toolkit tools.
- Root cause (verified by code reading and counts): discover loads only the Harness registries, the PY_LISTiNG ledgers, the workflow catalogue, and the opt-in note folders. No toolkit source was read, and no registry mentions the newest scripts (0 mentions for prompt_reply_pipeline, convert_for_pipeline, chat_reply_extractor, pdf_to_md, discover.py, repo_inspect). The toolkit's own INVENTORY.csv was also missing the newest scripts.
- Fix: a new opt-in class reads the existing INVENTORY.csv (no new registry); the inventory now lists the 6 new files, and docstrings are filled from the files themselves.

## Imported workflows (2026-10-14)

- **W9 AudioLab analysis:** `audiolab analyze` -> `bars` (set meter and downbeat by ear) -> `interpret` -> `visual map` -> `motion plan` -> `scripts/export_web.py`. Python steps are supported by code. Each stage refuses stale inputs by hash. Verified by the 385-test suite; the web export step has not been run here.
- **W10 Course lesson checks:** `scripts/audit_lessons.py` -> `scripts/lesson_run.py` (syntax check; `--execute` runs code) -> `scripts/run_lesson_tests.py`. Not run here.
- **W11 Course project grading:** `scripts/project_test.py --all --solution --strict`. The author's report of 2026-09-29 says 1,382 core tests pass. Not re-run here.
- **W12 Course catalog and skills:** `scripts/build_catalog.py`, `scripts/install_skills.py <target>`. Not run here.

- **W13 API and MCP server (course):** run the site build (`node site/build.js`, `build-projects.js --strict`, `build-agents.js`, `build-manuals.js`, `clean-urls.js`, `version-assets.js`) inside `imports/ai_engineering/`. That writes `generated/agent-content.json`, `site/agent-pages/`, and the SEO and terms JSON the API reads. Then serve `api/` with a Node handler. The MCP server exposes two read-only tools over JSON-RPC. Built, not run here.

## WF-L  ChatGPT takeout shards -> PROMPTS and REPLIES Markdown (RUN by owner 2026-10-16, verify PASS)
- **Inputs:** `conversations-000.json` ... `conversations-007.json` (originals, read only); optional `conversation_asset_file_names.json` and a hash CSV (`--hashes`).
- **Tools and order:** `takeout_to_clean_md.py run SRC OUT` -> `takeout_to_clean_md.py verify SRC OUT` (`tools\chatgpt_takeout_split\`).
- **Outputs:** `OUT\PROMPTS\<shard>\*.md`, `OUT\REPLIES\<shard>\*.md`, `manifest.csv`, `run.log`, `verify.log`.
- **Rules:** user/assistant text only; main path in original order, other branches labelled alternate under the message they diverge from; per-message `node_id` provenance; thinking/system/tool/empty/hidden messages counted, not written.
- **Verification:** owner ran `run` and `verify` on the 8 real shards: 771 conversations, 0 problems, PASS; written + skipped counts equal all 267,854 message nodes (skipped = thinking blocks and empty messages only). No unit tests. `verify` shares the script's classification code, so it checks completeness and text equality, not the prompt/reply rule itself.
- **Forks (added 2026-10-17, run by owner, verify PASS):** conversations sharing message ids are linked (`branched_from`/`branches` headers, divergence marker, `OUT\FORKS.md`): 23 families, 543 of 771 conversations, 520 branches.
- **Independent:** yes (stdlib, no network, no Harness files). Does not replace WF-A/WF-J: this reads whole takeout shards, which `pipeline.py` cannot.
