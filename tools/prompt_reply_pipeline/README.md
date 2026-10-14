# prompt_reply_pipeline

One script, `pipeline.py`. Run with `python -I -X utf8 pipeline.py <command>`.

| Command | What it does | Model? |
|---|---|---|
| `separate SRC OUT` | Splits each file into `replies/`, `prompts/`, `unsure/`, `logs/` | No |
| `prepare OUT` | Sections, dedup, facts (URLs, dates, prices, versions, licences), index | No |
| `llm OUT --model NAME` | Ollama classifies each section (temperature 0, seed 42, cached) | Yes |
| `verify OUT` | Rejects any row whose label/status is not allowed or whose quote is not in the source | No |
| `all SRC OUT [--model NAME]` | Runs the stages in order and re-checks the originals' hashes | optional |
| `selftest SRC` | Golden checks. Exit code 1 on any failure | No |

## What is guaranteed
- Originals are never written. Their SHA-256 is checked after every `all` run.
- Same input gives byte-identical output for stages 1, 2 and 4 (tested).
- Every message gets exactly one label; the counts must add up or the run stops.
- ChatGPT JSON exports: prompt/reply split is read from the `role` field. Label `certain`.
- Printed Perplexity-style Markdown: split by a text rule. Label `rule` (not proven).
- Anything else is refused and written to `unsure/`. It is never guessed.

## What is not guaranteed
- Labels from the model (stage 3) can be wrong. Only the quote and the allowed values are checked.
- Chat prints with no markers (Branch, HARPA, pasted notes) are refused; they need a handler written for that format.

## Adding a format
Add a `handle_<name>(text)` function that returns `{"replies": [...], "prompts": [...], "other": [], "empty": [], "total": N}` and add a case in `detect()`. Add a file for it to the selftest folder.

## Converter output and the adapter (added 2026-10-14)

Input formats after this change:

| Input | Route | Result |
|---|---|---|
| ChatGPT JSON inside `.md`, or a raw ChatGPT `.json` export | `pipeline.py` directly (`chatgpt_json`) | exact prompt/reply split (role field) |
| Perplexity-style Markdown print | `pipeline.py` (`perplexity`) | rule-based split |
| Converter Markdown (`convert.py`, `jsonl_to_md.py`, `mht_to_md.py` output: `# title`, `> **Messages:** N`, then `## You` / `## ChatGPT` / `## Claude` / `## Google AI` blocks) | `pipeline.py` (`speaker_md`) | exact split, only if the number of speaker blocks equals N (other `## ` headings are reply text); otherwise **refused** into `unsure/` |
| `.jsonl` transcript | `convert_for_pipeline.py` -> `jsonl_to_md.py` -> `speaker_md` | prompts and replies |
| `.mht` / `.mhtml` (Google AI Mode) | `convert_for_pipeline.py` -> `knowledge_extraction\v2\mht_to_md.py` -> `speaker_md` | prompts and replies |
| `.pdf` | skipped by the adapter (not a conversation source) | use `pdf_to_md.py` first |
| Other `.md` / `.txt` | `pipeline.py` `documents/` | kept byte-for-byte, never split |

Run: `python -I -X utf8 convert_for_pipeline.py <SRC_DIR> <OUT_DIR>`

Outputs: `OUT\replies`, `OUT\prompts`, `OUT\documents`, `OUT\unsure`, and `OUT\logs\adapter_manifest.json` (original path, original SHA-256, converter, converter exit code, staged file and hash, result). Staged converter output is kept in `OUT\_staging\`. Sources are read only; their hashes are checked before and after, and the run fails if any changed.

`convert.py` is not used by the adapter: it runs a bulk conversion at import time. Its input (ChatGPT JSON) is already handled exactly by `pipeline.py`. Its Markdown output is still recognised by `speaker_md` if you run it yourself.

Tests: `python -B -X utf8 tests\test_pipeline.py` (21 tests, synthetic fixtures). The converter tests run the existing converters locally and are skipped if bs4 or markdownify is missing.

## Connecting the output to discover.py (added 2026-10-14)

`convert_for_pipeline.py` now also writes `OUT\discover_extra_sources.json`, listing only the `replies` and `documents` folders (absolute paths, `*.md`). Prompts are excluded on purpose: a prompt is a question, not evidence.

Use it with the toolkit copy of discover:

    python -B -I -X utf8 ..\..\discover\discover.py --class note --extra-sources OUT\discover_extra_sources.json "your query"

Discovery reports each hit with its source file and line range, and a status of "research note passage". Without the flag, the synthetic material is not searched.
