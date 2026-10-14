# NEXT_ACTIONS

Based on `CAPABILITIES.md`, `WORKFLOWS.md`, `INVENTORY.csv` and `VERIFICATION.csv`. Nothing below has been started.

## Update 2026-10-14

- Done: converter output now feeds the pipeline (WF-J), verified on synthetic data. Not yet tested: real Google AI Mode captures and real Claude session files.
- Next (unchanged recommendation): a live Ollama run of WF-B on the synthetic fixtures.

## Verified workflows ready to use

| Workflow | Use it for |
|---|---|
| WF-A `pipeline.py separate/prepare/all` | Turn any folder of chat exports and documents into prompt / reply / document buckets, de-duplicated sections and extracted facts, with source hashes checked |
| WF-C `chat_reply_extractor.py --out ...` | Replies-only versions of the specific chat files it knows (always pass `--out`) |
| WF-G `discover.py` | Search the Harness registry, workflow catalogue and notes |
| WF-I `_meta\verify.py` | Re-check the toolkit |

(WF-D, the X pipeline, is accepted as working; it is unchanged.)

## Highest-priority integration opportunities

1. **Live local-model run** of WF-B (labels + code verification) - the only stage of the main workflow never run for real.
2. **Converters -> WF-A bridge** (P1): the PDF/MHT/JSONL/ChatGPT-JSON converters are stand-alone and their Markdown would not be split by WF-A.
3. **Make toolkit tools discoverable**: `discover` returned 0 toolkit tools for three queries, so tools are found only by reading `CAPABILITIES.md`.

## Proposed workflows needing a small test

- P3 WF-A + WF-B on the 5 synthetic fixtures with real Ollama (smallest).
- P1 run one converter's output through `pipeline.py separate` and look at the labels.
- P2 pipeline output through `discover --extra-sources` using synthetic output only.
- P4 / P5 X notes or `repo_inspect` reports through `prepare` (dedup and facts only).

## Material capability gaps

- No bridge from conversion tools to the pipeline (INFERRED from `detect()`).
- Real Ollama never exercised; label quality unknown.
- Toolkit tools not discoverable by what they do.
- No generic HTML/DOCX/XLSX/PPTX ingestion, no general audio/media tool (AudioLab is external), OCR status of `pdf_to_md` UNKNOWN.
- Repeated functionality (INFERRED from docstrings and sizes, not diffed): two MHT converters; seven near-identical Gemini test drivers; four `cdp_capture*` variants.
- `convert.py` and `pdf_to_md.py` have no usage documentation; the cross-document consolidation scripts (ledger, conflict and count building) exist only in the Harness.

## Single recommended next task

**Run `pipeline.py llm` + `verify` on the five synthetic fixtures with a real local Ollama model, and record accepted/rejected counts and whether a second run reproduces the same rows.**

Why first:
- It is the only link in the main chain (separate -> prepare -> label -> verify) that has not been run for real; everything you want to automate with a local model depends on it.
- It is small: fixtures, tests and the cache already exist, it uses only localhost, and it changes no tool.
- Its result decides the next steps: if the model's output passes the quote check, extend the pipeline to converter output (P1); if it fails, the prompt and schema need work before anything is built on top.
- The other opportunities (a bridge, tool discovery) are worth more only after we know the labelling stage works.

Needs from you: confirm Ollama is running and which model to use (not checked in this pass).
