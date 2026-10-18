# Pyburticapa

> **Two words are used here: *Python skill* and *discovery*.** A Python skill is a workflow you can install and run, with one command, a defined input and a defined output; it is pure Python or hybrid (Claude does one step). A discovery is a collected item that has not been built into a skill. The full list, with commands and evidence, is under [Python skills](#python-skills) below. Only Python is kept in this repo.

Python tools for turning years of AI chat history into knowledge you can search and trust. Standard library only, tested on Linux with Python 3.11–3.13; CI also runs on Windows.

## Where things are

| Folder or file | What is in it |
|---|---|
| `python_skills/confirmed/` | Your confirmed workflows: the Python skills, one folder each (code, tests, README). The list with commands is [below](#python-skills) |
| `python_skills/pc_workflows/` | General workflows from your whole PC: `PC_SCAN_ROWS.csv` (the 2,313 laptop-scan rows from `INVENTORY.csv`; those files are still on the laptop, not in this repo) and the AudioLab files that were imported |
| `python_skills/course/` | The course material: the `ai_engineering` copy (Python and other languages), import manifests and provenance. `course/llm_instructions/` holds the LLM instruction files pulled out of it: `skills/` (391 `skill-*.md`) and `prompts/` (101 `prompt-*` files), each keeping its original path under the course |
| `python_skills/INVENTORY.csv` | The master list, 9,763 rows, with tier 1, 2 and 3 for every file |
| `docs/REFERENCE.md` | All the notes in one file: capabilities, workflows, next actions, dependencies, scope review (5 parts, with contents list) |
| `records/` | The other CSV records: `MIGRATION_LOG.csv` (every copy, with hashes), `VERIFICATION.csv` (checks and evidence), `SCOPE_REVIEW.csv`, `GEMINI_SCRIPT_CLASSIFICATION.csv` |
| `tests/` | End-to-end tests for the knowledge-recovery skill; each skill's own tests are in its folder |
| `outputs/` | Where workflow runs write by default (`python demo.py` writes `outputs/demo/`) |
| `.claude/skills/` | Claude Code skills that run the Python on the laptop |
| `_meta/` | Scripts that built the inventory and migration records; historical, they still use the old paths and are not run by CI |
| `demo.py` | One-command demo on invented data |

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

One command: `python -I -X utf8 python_skills/confirmed/knowledge_recovery/run.py <export folder> <output folder> --subject "<your subject>"`. The same thing step by step:

```
python -I -X utf8 python_skills/confirmed/chatgpt_takeout_split/takeout_to_clean_md.py run  <export folder> <clean folder>
python -I -X utf8 python_skills/confirmed/chatgpt_takeout_split/takeout_to_clean_md.py verify <export folder> <clean folder>
python -I -X utf8 python_skills/confirmed/knowledge_recovery/recover.py ingest --archive <clean folder>
python -I -X utf8 python_skills/confirmed/knowledge_recovery/recover.py check
python -I -X utf8 python_skills/confirmed/knowledge_recovery/recover.py dossier "<your subject>"
```

The export folder is the unzipped ChatGPT data export (`conversations.json`, or sharded `conversations-000.json` …). Subject spellings, topics and domain terms go in `aliases.json` (`--aliases` to use another file). Private conversations can be left out with `exclude.json` (`--exclude`). The database and dossiers hold private text and are git-ignored.

### Tests

```
python -m unittest discover -s tests -v
```

13 end-to-end tests run the real command-line scripts on the fabricated export. They cover verify catching an edited output file, a hash mismatch stopping the run, branch de-duplication, misspelling search, decision labels, the related-terms section and exclusions. CI (`.github/workflows/blank.yml`) runs them, together with the prompt/reply pipeline and schema-validator tests and the demo, on Ubuntu and Windows.

---

## Python skills

Two words are used in this repo, and only two.

- **Python skill**: a workflow you can install and run. It has one command, a defined input and a defined output.
- **Discovery**: a Python item that was collected (the 2,300+ rows in `python_skills/INVENTORY.csv`, the course material in `python_skills/course/`) but has not been built into something installed and run as part of your work. A discovery becomes a Python skill when it is built into a runnable workflow.

The old "implemented / not implemented" split in `docs/REFERENCE.md` is replaced by this one.

### Two kinds of Python skill

- **Pure**: Python does every step. Nothing is interpreted by an LLM.
- **Hybrid**: Python does steps 1, 2 and 4; Claude does step 3. Step 3 must write its result in a fixed format that step 4 can read, otherwise step 4 cannot be a script. No local models (Ollama): the LLM step is Claude.

Only Python goes in this repo. Instructions written for an LLM live in Claude chat, not here. (`.claude/skills/` holds Claude Code skills, which run the Python on the laptop; they are not Claude chat skills.)

### Two run modes

- **Check mode**: while a skill is still being established. Claude may read the script, run it and diagnose problems.
- **Strict run mode**: only after a skill is established ("this is the script, run it, don't read anything else"). Claude reads the script only if the run reports a problem, then it goes back to check mode.

A skill is **established** when it gives accurate output for many inputs, including the awkward ones, and you have confirmed it. Establish one skill before expanding it into a multi-skill.

### The Python skills

"Owner-run" is your own statement (2026-10-18) that you ran the tool; it was not re-run here. "Tested here" means the checks in this repo, on invented inputs.

| Python skill | Kind | One command | Input -> output | Evidence |
| --- | --- | --- | --- | --- |
| ChatGPT knowledge recovery | pure | `python -I -X utf8 python_skills/confirmed/knowledge_recovery/run.py EXPORT OUT --subject NAME` | ChatGPT export folder -> `OUT/clean`, `OUT/knowledge.db`, `OUT/dossiers/` | Owner-run on the real export; 16 end-to-end tests here, CI on Linux and Windows |
| X extractor | pure | `python python_skills/confirmed/x_pipeline/x_link.py LINK... --out DIR` (or `run_all.py LINKS --workdir DIR`) | X links -> notes, article text, images, videos, transcripts, `SUMMARY.md` | Owner-run (original steps); `x_link.py` and the `--workdir` options tested here offline only. Claude Code skill: `.claude/skills/x-extractor` |
| yt-outliers | pure | `python python_skills/confirmed/yt_outliers/yt_outliers.py --channels ID... --out DIR` | YouTube channel ids -> ranked outlier list (`digest.md`), CSV | `python_skills/confirmed/yt_outliers/` (copy of repo `411tmnd-star/yt-outliers`, MIT): 22 tests and the sample run in CI; needs a YouTube Data API key (`YOUTUBE_API_KEY`) for real channels; a live run was not seen |
| Chat reply extractor | pure | `python -I -X utf8 python_skills/confirmed/chat_reply_extractor/chat_reply_extractor.py SRC --out OUT [--handlers handlers.json]` | chat-export `.md` folder -> replies only, `audit/` | Owner-run; tested here on invented files; file names live in `handlers.json` |
| PDF to Markdown | pure | `python python_skills/confirmed/pdf_to_md/pdf_to_md.py PDF_OR_FOLDER [OUT]` | PDF or folder -> `.md` | Owner-run; tested here |
| MHT to Markdown | pure | `python python_skills/confirmed/mht_to_md_tool/mht_to_md.py --source DIR --output DIR` | MHT/MHTML folder -> `.md`, manifest, log | Owner-run; tested here |
| Google AI Mode MHT, JSONL, ChatGPT JSON to Markdown | pure | `python python_skills/confirmed/knowledge_extraction/v2/{mht_to_md,jsonl_to_md,convert}.py INPUT --out DIR` | file/folder -> `.md` | Owner-run; tested here |
| Gemini share links to Markdown | pure | `python python_skills/confirmed/gemini_md2/gemini_batch.py LINK... --out DIR` | Gemini links (or `--src DIR` of `.txt` files) -> `.md`, manifest | Owner-run; offline checks only here (Gemini unreachable from the test environment) |
| Prompt/reply pipeline | hybrid (step 3 not built) | `python -I -X utf8 python_skills/confirmed/prompt_reply_pipeline/convert_for_pipeline.py SRC OUT --prepare` | mixed exports -> prompts, replies, prepared sections | Steps 1, 2 and 4 tested (29 tests). Step 3 is written for Ollama and was never run; it should become a Claude step with a fixed output format |
| Repo inspection | pure | `python python_skills/confirmed/repo_inspect/repo_inspect.py URL --out DIR` | GitHub URL -> read-only report | Owner-run; offline check here |
| Environment preflight, schema validator | pure | `python_skills/confirmed/env_preflight/env_preflight.py`, `python_skills/confirmed/schema_validate/schema_validate.py` | - | Tested here (adapted, MIT) |

Also here, but not a skill: `python_skills/confirmed/gemini_md2/test*_validate.py`, `survey_candidates.py`, `gemini_to_md.py` and `debug/` are records of the experiments that produced the Gemini parser, with the four test chats written into them.

### Discoveries

Everything under `python_skills/course/` (course and project material, never run as a workflow) and the Tier 1 and Tier 2 rows of `python_skills/INVENTORY.csv` (reference material and candidate code). `python_skills/INVENTORY.csv` keeps its original `tier` column for now; Tier 3 means "core and active tool", which is the list of Python skills above plus AudioLab.

## Status words in the records

confirmed present, verified execution, not verified, proposed, unresolved (columns in `python_skills/INVENTORY.csv`). "Verified execution" means a check in `records/VERIFICATION.csv` passed; `--help` only is labelled as such.
