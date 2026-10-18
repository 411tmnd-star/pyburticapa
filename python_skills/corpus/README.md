# Learning corpus

A subject-by-subject dictionary of the course *AI Engineering from Scratch* (MIT licence, by Rohit Ghumare), with Python as the main source. It is the learning part of this toolkit: every entry is a lesson or project to study, run and test, and the ones that are workflows can be adapted and confirmed as Python skills.

The course itself is kept unchanged in [`../course/ai_engineering/`](../course/ai_engineering/), so its own scripts (`scripts/lesson_run.py`, `scripts/run_lesson_tests.py`, `scripts/project_test.py`) still work on it. This folder only indexes it: nothing here is a copy.

## At a glance

- **726 entries**: 523 lessons, 76 projects, 67 certification lessons, and 60 reference and tooling items (so every part of the course is accounted for).
- **1286 Python files** linked from the entries; 530 entries need only the standard library.
- **Progress**: discovery 726.

## Categories

| Category | What it covers | Entries | Subcategories | Status |
|---|---|---|---|---|
| [Foundations](foundations.md) | Setup, the math behind models, machine learning and deep learning basics. | 65 | Setup and tooling, Math, Machine learning fundamentals, Deep learning | discovery 65 |
| [Language](language.md) | Text: NLP, transformers, generative models and building LLMs from scratch. | 84 | NLP, Transformers, Generative AI, LLMs from scratch | discovery 84 |
| [Perception](perception.md) | Images, speech and audio, and models that combine several inputs. | 70 | Computer vision, Speech and audio, Multimodal | discovery 70 |
| [LLM engineering](llm_engineering.md) | Using LLMs in software: prompting, retrieval, fine-tuning, tools, evaluation, cost. | 17 | Prompting, Retrieval and RAG, Fine-tuning, Tool use and MCP, Evaluation and guardrails, Cost and caching, Apps and frameworks | discovery 17 |
| [Agents and tools](agents_and_tools.md) | Tool calling, MCP, skills, agent design, autonomy and multi-agent systems. | 132 | Tool calling, MCP, Protocols and routing, Skills, Capstone: tool ecosystem, Agent loop and reasoning, Tools and memory, Frameworks and SDKs, Benchmarks and evaluation, Computer-use and voice agents, Agent observability, Orchestration and runtimes, Failure modes and defence, Agent workbench, Working with agents on real work, Autonomous systems, Multi-agent systems | discovery 132 |
| [Production](production.md) | Serving, reliability, security, cost, safety and alignment. | 58 | Serving and inference, Observability and caching, Routing and gateways, Releases and testing, Reliability and operations, Security, compliance and cost, Alignment, Red teaming and jailbreaks, Governance and policy, Fairness and privacy, Security incidents, Moderation | discovery 58 |
| [Reinforcement learning](reinforcement_learning.md) | Learning from rewards. | 12 | Reinforcement learning | discovery 12 |
| [Projects (workflows)](projects.md) | Build projects and capstone tracks: the closest things to workflows with an input and an output. | 161 | Capstone projects, Capstone track: agent harness, Capstone track: GPT from scratch, Capstone track: pretraining at scale, Capstone track: research agent, Capstone track: vision-language model, Capstone track: production RAG, Capstone track: evaluation harness, Capstone track: distributed training, Capstone track: safety gate, Agents, Evaluation and testing, Documents, notes and personal organisation, Data and spreadsheets, Infrastructure and reliability, Retrieval and research, MCP and skills, Localisation, Media | discovery 161 |
| [Reference](reference.md) | Certification study paths, manuals, glossary and learning paths. | 75 | Certification: Claude, Certification: MCPA, Manuals, Glossary, Learning paths, Course overview | discovery 75 |
| [Course tooling](course_tooling.md) | The course's own scripts (run, test, audit, catalogue) and its website and publishing parts. | 52 | Website and publishing, Content and translation, Run and test, Catalogue and install, Project templates | discovery 52 |

## Status ladder

Every entry starts at `discovery` and moves up one step at a time. Not every entry needs to reach the top: a math lesson can stop at `tested`; a project that is a real workflow can go all the way to `confirmed`.

| Step | Status | Meaning |
|---|---|---|
| 1 | `discovery` | in the corpus, not looked at yet |
| 2 | `studied` | read and understood |
| 3 | `ran` | its code runs as it is (smoke check) |
| 4 | `tested` | its own tests pass on your machine |
| 5 | `adapted` | turned into a workflow: one command, an input folder and an output folder |
| 6 | `confirmed` | run on real inputs by you and copied to python_skills/confirmed/ as a Python skill |

## How to use it

1. Open a category page and pick an entry. The title links to the lesson or project in the course.
2. When you move it up the ladder, edit its row in `CATALOG.csv`: set `status`, and write what you ran and the result in `evidence` (for example `2026-10-20 python code/svd.py: ok`).
3. Rebuild the pages: `python -I -X utf8 python_skills/corpus/build_corpus.py`. Your status, evidence and notes are kept; everything else is re-read from the course.
4. When an entry is `confirmed`, its Python skill lives in `../confirmed/` and the entry's `notes` names it.

## Columns in `CATALOG.csv`

| Column | Meaning |
|---|---|
| `id` | `L<phase>-<lesson>` lesson, `P-<name>` project, `CC-`/`CM-` Claude/MCPA certification lesson, `M-` manual, `T-` course script, `R-` other course part |
| `category`, `subcategory` | Where it sits in this dictionary |
| `kind` | lesson, project, certification lesson, manual, script, reference, site |
| `title`, `summary` | From the lesson's `docs/en.md` or the project's `project.json` |
| `source` | Path inside `course/ai_engineering/` |
| `python_files` | The `.py` files in the entry, relative to `source` |
| `other_languages` | Other languages the entry is also written in |
| `needs` | Third-party packages found in the imports (read from the code, not installed or run) |
| `has_tests`, `has_quiz` | Whether the entry has its own tests and a quiz |
| `llm_instructions` | Skill, prompt and agent files of this entry, now in `../llm_instructions/` |
| `status`, `evidence`, `notes` | Yours to edit; kept on every rebuild |

## Notes

- `needs` is read from `import` lines only. Nothing was installed or run to build this corpus, so every entry starts at `discovery`.
- Some projects have no Python version (TypeScript or Go only); they are listed so nothing is lost, and marked as such.
- The course's grouping (phases 00 to 19) is kept in the IDs: `L14-07` is phase 14, lesson 07.
- A few LLM instruction files belong to the whole course rather than one entry (the course guide skills and `AGENTS.md`); they are in `../llm_instructions/` and not linked from an entry.
