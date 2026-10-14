# Import report (2026-10-14)

Written for the toolkit owner. Copies only: nothing was moved, deleted or executed. Every copied file is hash-checked (`imports/IMPORT_MANIFEST.csv`, `hash_check` column) and logged append-only in `MIGRATION_LOG.csv`.

## Result

- Copied: 6,722 files, 78.5 MB. Hash mismatches: 0.
- Excluded with a reason: 779 files, listed in the manifest.
- Groups: `ai_engineering` 6,292 copied; `audio_lab` 180; `audio_lab_outputs` 59; `audio_lab_work_delta` 60 (175 identical to live were skipped); `audio_lab_work_reports` 124; `audio_lab_snapshot_records` 7.

## Status vocabulary

| Status | Meaning | Toolkit key |
|---|---|---|
| RUN-OBSERVED | Suite covering it passed in a run observed in this session | V |
| TYPECHECKED | `tsc --noEmit` exit 0, observed this session | C |
| REPORTED-PASS | Passed per author or owner report; not re-run here | ACCEPTED |
| UNVERIFIED-SOURCE | Present; nothing run here | - |
| STARTER-INCOMPLETE | Learner starter, unfinished by design | - |
| REFERENCE | Docs, configs, schemas, skills, generated data | - |

Observed in this session (earlier runs, not repeated): AudioLab pytest 385 passed; web_kit node tests 99 of 99; `tsc` exit 0. Reported only: course core grader 1,382 tests (2026-09-29, macOS); Accretion and Constellation Core claims in the working-copy reports.

## What was imported

- **Course repo** (`ai_engineering/`): `phases/` (521 lesson code directories in Python, TypeScript, Rust, Go and Julia; quizzes; docs; 417 skills, 99 prompts, 15 agents), `projects/` (85 projects with starters, solutions, stage tests and the grader contract), `certifications/`, `scripts/` (31 Python and 8 JS/shell workflow scripts), `manuals/` (capture scripts and sections), `skills/` and `.claude/`, `i18n/`, `book/`, `glossary/`, `learning-paths/`, `docs/`, root documents, `.github/`.
- **AudioLab live** (`audio_lab/`): `src/audiolab` (full package), `tests`, `configs`, `schemas`, `scripts/export_web.py`, `pyproject.toml`, `web_kit` source and tests (no `node_modules`), `outputs` (JSON, npz, CSV, markdown).
- **AudioLab working copy** (`audio_lab_work/`): only files that differ from live (Accretion, Constellation Core, Spectrum Matrix code and tests), the top-level reports, environment logs and evidence scripts.
- **Snapshots**: hash manifests and READMEs only.

## What was not imported, and why

- Site, API, lib, web and assets folders of the course: JavaScript site code, not workflow.
- Binaries (GIF, PNG, JPG, video, audio, fonts, PDF, archives, compiled files): regenerable or non-text.
- Song inputs (two MP3s and the WAV). Third-party audio; configs refer to them by filename.
- Click-track WAVs and plot PNGs in AudioLab outputs. Regenerable.
- The working copy's virtualenv `env/venv-py311`. Regenerable.
- Snapshot source trees. Duplicates of live.

## Opened this round

Course: `scripts/_lib.py`, `lesson_run.py`, `run_lesson_tests.py`, `project_test.py`, `audit_lessons.py`, `check_quiz_bias.py`, `build_catalog.py`, `install_skills.py` (structure); `projects/AUTHORING.md`; `projects/validation/2026-09-29.md`; `.claude/skills/build-project/SKILL.md`; `requirements.txt`; certification tracks; manual capture scripts.

AudioLab: `config.py`, `schema.py`, `songs.py`, `cli.py`, `export.py`, `plots.py` (structure), all of `interpretation/`, `visual_mapping/`, and `motion/` (structure, `vocabulary.py` in full), and the configs.

## Not read line by line (inventoried, every file has a manifest row)

- `interpretation/rules.py` (674 lines), `visual_mapping/engine.py` (488), `motion/engine.py` (553), the review and calibration modules.
- Lesson code (521 directories), project code (85 projects), certification Python (136 files).
- Web preview and evidence scripts; the bodies of `install_skills.py` and the audit scripts.

## Next steps (not started)

1. Deep-read `rules.py`, `visual_mapping/engine.py` and `motion/engine.py`, and record any gap between their docstrings and behaviour.
2. Map which lesson code directories have a `main.py` and which have tests, from the manifest's `category` column.
3. Decide whether the course's `site/` build and the AudioLab web app should be imported as a second phase.
4. Run the observed-status checks yourself, as you prefer, to upgrade REPORTED-PASS rows.

## Addendum: API and MCP (2026-10-14)

Course MCP check: yes. The course has an MCP server (`api/mcp.js`, read-only tools `search_curriculum` and `read_resource`, protocol 2025-11-25 with 2025-03-26 fallback), a public REST API (`api/v1/`), an OpenAPI description, and a registry entry. It also has a full MCP curriculum in phases 11, 13 and 19, the `mcpa` certification track, two projects, two skills and a wire checker. Details are in `CAPABILITIES.md`.

The API was missing from the first import because I excluded `api/`, `lib/` and `site/`. The API needs them plus `assets/` and `web/`, so they were added. Batch `api` (`IMPORT_MANIFEST_API.csv`): 270 files copied, 0 hash mismatches, 14 binaries excluded.

The API reads generated files that are not in the repo (`generated/agent-content.json`, `site/lesson-seo.json`, `site/certification-seo.json`, `site/lesson-terms.json`, `site/agent-pages/`). Those come from the site build, which is run inside `imports/ai_engineering/` (workflow W13). The build needs no packages beyond Node. Nothing in the API or MCP has been run or tested here.

## Addendum: tiers and unified catalogue (2026-10-14)

The imported files (7,330) now have one row each in `INVENTORY.csv`, with a tier, a hash and a static check status; `IMPORT_MANIFEST*.csv` remain the copy logs. Decisions applied: course `scripts/*.py` are Tier 2; Tier 3 is the toolkit's own tools, AudioLab live code, and the course API/MCP with its build; Tier 2 is static checks only; paths are relative to the Toolkit root. Tier 2 Python with undeclared imports (17 files) is listed by `discover.py --tier 2`. The inventory grew from 0.8 MB to 4.6 MB.
