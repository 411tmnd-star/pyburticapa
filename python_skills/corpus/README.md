# Learning corpus

The course *AI Engineering from Scratch* (MIT licence, by Rohit Ghumare) arranged by subject, with Python as the main source. Open a category folder, then a subfolder: each one lists its lessons or projects and links to the original course. The course itself is kept unchanged in [`../course/ai_engineering/`](../course/ai_engineering/).

**726 entries** (523 lessons, 76 projects, 67 certification lessons, 60 reference and tooling items) · 1286 Python files · progress: discovery 726

| Folder | What it covers | Entries | Status |
|---|---|---|---|
| [foundations/](foundations/README.md) | Setup, the math behind models, machine learning and deep learning basics. | 65 | discovery 65 |
| [language/](language/README.md) | Text: NLP, transformers, generative models and building LLMs from scratch. | 84 | discovery 84 |
| [perception/](perception/README.md) | Images, speech and audio, and models that combine several inputs. | 70 | discovery 70 |
| [llm_engineering/](llm_engineering/README.md) | Using LLMs in software: prompting, retrieval, fine-tuning, tools, evaluation, cost. | 17 | discovery 17 |
| [agents_and_tools/](agents_and_tools/README.md) | Tool calling, MCP, skills, agent design, autonomy and multi-agent systems. | 132 | discovery 132 |
| [production/](production/README.md) | Serving, reliability, security, cost, safety and alignment. | 58 | discovery 58 |
| [reinforcement_learning/](reinforcement_learning/README.md) | Learning from rewards. | 12 | discovery 12 |
| [projects/](projects/README.md) | Build projects and capstone tracks: the closest things to workflows with an input and an output. | 161 | discovery 161 |
| [reference/](reference/README.md) | Certification study paths, manuals, glossary and learning paths. | 75 | discovery 75 |
| [course_tooling/](course_tooling/README.md) | The course's own scripts (run, test, audit, catalogue) and its website and publishing parts. | 52 | discovery 52 |

## Status ladder

Every entry starts at `discovery` and moves up one step at a time.

| Step | Status | Meaning |
|---|---|---|
| 1 | `discovery` | in the corpus, not looked at yet |
| 2 | `studied` | read and understood |
| 3 | `ran` | its code runs as it is (smoke check) |
| 4 | `tested` | its own tests pass on your machine |
| 5 | `adapted` | turned into a workflow: one command, an input folder and an output folder |
| 6 | `confirmed` | run on real inputs by you and copied to python_skills/confirmed/ as a Python skill |

## Keeping it up to date

1. Edit an entry's row in [`CATALOG.csv`](CATALOG.csv): set `status`, and write what you ran and the result in `evidence`.
2. Run `python -I -X utf8 python_skills/corpus/build_corpus.py`. Your `status`, `evidence` and `notes` are kept; the folders and pages are rebuilt.
3. When an entry is `confirmed`, its Python skill is in [`../confirmed/`](../confirmed/) and the `notes` column names it.

`CATALOG.csv` has one row per entry with its id, category, subcategory, title, source path, Python files, other languages, packages needed (530 entries need only the standard library), tests, quiz and LLM instruction files. Packages are read from the `import` lines; nothing was installed or run to build this. Entry ids: `L14-07` is phase 14, lesson 07; `P-` project; `CC-`/`CM-` Claude/MCPA certification lesson; `M-` manual; `T-` course script; `R-` other course part.
