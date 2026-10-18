# Python skills and discoveries

Two words are used in this repo, and only two.

- **Python skill**: a workflow you can install and run. It has one command, a defined input and a defined output.
- **Discovery**: a Python item that was collected (the 2,300+ rows in `INVENTORY.csv`, the course material in `imports/`) but has not been built into something installed and run as part of your work. A discovery becomes a Python skill when it is built into a runnable workflow.

The old "implemented / not implemented" split in `WORKFLOWS.md` is replaced by this one.

## Two kinds of Python skill

- **Pure**: Python does every step. Nothing is interpreted by an LLM.
- **Hybrid**: Python does steps 1, 2 and 4; Claude does step 3. Step 3 must write its result in a fixed format that step 4 can read, otherwise step 4 cannot be a script. No local models (Ollama): the LLM step is Claude.

Only Python goes in this repo. Instructions written for an LLM live in Claude chat, not here. (`.claude/skills/` holds Claude Code skills, which run the Python on the laptop; they are not Claude chat skills.)

## Two run modes

- **Check mode**: while a skill is still being established. Claude may read the script, run it and diagnose problems.
- **Strict run mode**: only after a skill is established ("this is the script, run it, don't read anything else"). Claude reads the script only if the run reports a problem, then it goes back to check mode.

A skill is **established** when it gives accurate output for many inputs, including the awkward ones, and you have confirmed it. Establish one skill before expanding it into a multi-skill.

## The Python skills

"Owner-run" is your own statement (2026-10-18) that you ran the tool; it was not re-run here. "Tested here" means the checks in this repo, on invented inputs.

| Python skill | Kind | One command | Input -> output | Evidence |
| --- | --- | --- | --- | --- |
| ChatGPT knowledge recovery | pure | `python -I -X utf8 tools/knowledge_recovery/run.py EXPORT OUT --subject NAME` | ChatGPT export folder -> `OUT/clean`, `OUT/knowledge.db`, `OUT/dossiers/` | Owner-run on the real export; 16 end-to-end tests here, CI on Linux and Windows |
| X extractor | pure | `python tools/x_pipeline/x_link.py LINK... --out DIR` (or `run_all.py LINKS --workdir DIR`) | X links -> notes, article text, images, videos, transcripts, `SUMMARY.md` | Owner-run (original steps); `x_link.py` and the `--workdir` options tested here offline only. Claude Code skill: `.claude/skills/x-extractor` |
| yt-outliers | pure | `python tools/yt_outliers/yt_outliers.py --channels ID... --out DIR` | YouTube channel ids -> ranked outlier list (`digest.md`), CSV | `tools/yt_outliers/` (copy of repo `411tmnd-star/yt-outliers`, MIT): 22 tests and the sample run in CI; needs a YouTube Data API key (`YOUTUBE_API_KEY`) for real channels; a live run was not seen |
| Chat reply extractor | pure | `python -I -X utf8 tools/chat_reply_extractor/chat_reply_extractor.py SRC --out OUT [--handlers handlers.json]` | chat-export `.md` folder -> replies only, `audit/` | Owner-run; tested here on invented files; file names live in `handlers.json` |
| PDF to Markdown | pure | `python tools/pdf_to_md/pdf_to_md.py PDF_OR_FOLDER [OUT]` | PDF or folder -> `.md` | Owner-run; tested here |
| MHT to Markdown | pure | `python tools/mht_to_md_tool/mht_to_md.py --source DIR --output DIR` | MHT/MHTML folder -> `.md`, manifest, log | Owner-run; tested here |
| Google AI Mode MHT, JSONL, ChatGPT JSON to Markdown | pure | `python tools/knowledge_extraction/v2/{mht_to_md,jsonl_to_md,convert}.py INPUT --out DIR` | file/folder -> `.md` | Owner-run; tested here |
| Gemini share links to Markdown | pure | `python tools/gemini_md2/gemini_batch.py LINK... --out DIR` | Gemini links (or `--src DIR` of `.txt` files) -> `.md`, manifest | Owner-run; offline checks only here (Gemini unreachable from the test environment) |
| Prompt/reply pipeline | hybrid (step 3 not built) | `python -I -X utf8 tools/prompt_reply_pipeline/convert_for_pipeline.py SRC OUT --prepare` | mixed exports -> prompts, replies, prepared sections | Steps 1, 2 and 4 tested (29 tests). Step 3 is written for Ollama and was never run; it should become a Claude step with a fixed output format |
| Repo inspection | pure | `python tools/repo_inspect/repo_inspect.py URL --out DIR` | GitHub URL -> read-only report | Owner-run; offline check here |
| Environment preflight, schema validator | pure | `tools/env_preflight/env_preflight.py`, `tools/schema_validate/schema_validate.py` | - | Tested here (adapted, MIT) |

Also here, but not a skill: `discover/` searches the private Harness registry (its tests fail without that data), and `tools/gemini_md2/test*_validate.py`, `survey_candidates.py`, `gemini_to_md.py` and `debug/` are records of the experiments that produced the Gemini parser, with the four test chats written into them.

## Discoveries

Everything under `imports/` (course and project material, never run as a workflow) and the Tier 1 and Tier 2 rows of `INVENTORY.csv` (reference material and candidate code). `INVENTORY.csv` keeps its original `tier` column for now; Tier 3 means "core and active tool", which is the list of Python skills above plus AudioLab.
