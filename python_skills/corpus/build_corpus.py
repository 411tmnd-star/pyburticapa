"""Build the learning corpus: one catalogue entry per lesson, project or reference item of the course.

The course copy in ../course/ai_engineering is read, never changed. This script writes:
  CATALOG.csv        one row per entry; the source of truth for status, evidence and notes
  README.md          overview: categories, counts, status ladder, how to use
  <category>.md      one page per category, entries grouped by subcategory, with links into the course

Run it again at any time. Columns you edit by hand (status, evidence, notes) are kept, matched by `source`.

Usage:
  python -I -X utf8 python_skills/corpus/build_corpus.py            # rebuild CATALOG.csv and the pages
  python -I -X utf8 python_skills/corpus/build_corpus.py --check    # exit 1 if the files on disk are out of date
"""
import argparse
import ast
import csv
import io
import json
import os
import re
import sys
from collections import Counter, OrderedDict

HERE = os.path.dirname(os.path.abspath(__file__))
COURSE = os.path.normpath(os.path.join(HERE, "..", "course", "ai_engineering"))
LLM = os.path.normpath(os.path.join(HERE, "..", "llm_instructions"))
CATALOG = os.path.join(HERE, "CATALOG.csv")

STATUSES = ["discovery", "studied", "ran", "tested", "adapted", "confirmed"]
STATUS_MEANING = {
    "discovery": "in the corpus, not looked at yet",
    "studied": "read and understood",
    "ran": "its code runs as it is (smoke check)",
    "tested": "its own tests pass on your machine",
    "adapted": "turned into a workflow: one command, an input folder and an output folder",
    "confirmed": "run on real inputs by you and copied to python_skills/confirmed/ as a Python skill",
}
COLUMNS = ["id", "category", "subcategory", "kind", "title", "summary", "source", "python_files",
           "other_languages", "needs", "has_tests", "has_quiz", "llm_instructions",
           "status", "evidence", "notes"]
HAND_COLUMNS = ["status", "evidence", "notes"]

# Category order, page file and a one-line description.
CATEGORIES = OrderedDict([
    ("Foundations", ("foundations.md", "Setup, the math behind models, machine learning and deep learning basics.")),
    ("Language", ("language.md", "Text: NLP, transformers, generative models and building LLMs from scratch.")),
    ("Perception", ("perception.md", "Images, speech and audio, and models that combine several inputs.")),
    ("LLM engineering", ("llm_engineering.md", "Using LLMs in software: prompting, retrieval, fine-tuning, tools, evaluation, cost.")),
    ("Agents and tools", ("agents_and_tools.md", "Tool calling, MCP, skills, agent design, autonomy and multi-agent systems.")),
    ("Production", ("production.md", "Serving, reliability, security, cost, safety and alignment.")),
    ("Reinforcement learning", ("reinforcement_learning.md", "Learning from rewards.")),
    ("Projects (workflows)", ("projects.md", "Build projects and capstone tracks: the closest things to workflows with an input and an output.")),
    ("Reference", ("reference.md", "Certification study paths, manuals, glossary and learning paths.")),
    ("Course tooling", ("course_tooling.md", "The course's own scripts (run, test, audit, catalogue) and its website and publishing parts.")),
])

# phase number -> (category, subcategory or None when it is chosen per lesson)
PHASES = {
    0: ("Foundations", "Setup and tooling"),
    1: ("Foundations", "Math"),
    2: ("Foundations", "Machine learning fundamentals"),
    3: ("Foundations", "Deep learning"),
    4: ("Perception", "Computer vision"),
    5: ("Language", "NLP"),
    6: ("Perception", "Speech and audio"),
    7: ("Language", "Transformers"),
    8: ("Language", "Generative AI"),
    9: ("Reinforcement learning", "Reinforcement learning"),
    10: ("Language", "LLMs from scratch"),
    11: ("LLM engineering", None),
    12: ("Perception", "Multimodal"),
    13: ("Agents and tools", None),
    14: ("Agents and tools", None),
    15: ("Agents and tools", "Autonomous systems"),
    16: ("Agents and tools", "Multi-agent systems"),
    17: ("Production", None),
    18: ("Production", None),
    19: ("Projects (workflows)", None),
}


def ranges(spec):
    """{'Sub': '1-5,11'} -> {1: 'Sub', ...}"""
    out = {}
    for sub, rs in spec.items():
        for part in rs.split(","):
            a, _, b = part.partition("-")
            for n in range(int(a), int(b or a) + 1):
                out[n] = sub
    return out


LESSON_SUB = {
    11: ranges({"Prompting": "1-3,5", "Retrieval and RAG": "4,6-7", "Fine-tuning": "8",
                "Tool use and MCP": "9,14", "Evaluation and guardrails": "10,12",
                "Cost and caching": "11,15", "Apps and frameworks": "13,16-17"}),
    13: ranges({"Tool calling": "1-5", "MCP": "6-18,28-31", "Protocols and routing": "19-21",
                "Skills": "22,24-27", "Capstone: tool ecosystem": "23"}),
    14: ranges({"Agent loop and reasoning": "1-5,11", "Tools and memory": "6-10",
                "Frameworks and SDKs": "12-18", "Benchmarks and evaluation": "19-20,30",
                "Computer-use and voice agents": "21-22", "Agent observability": "23-24",
                "Orchestration and runtimes": "25,28-29", "Failure modes and defence": "26-27",
                "Agent workbench": "31-42", "Working with agents on real work": "43-54"}),
    17: ranges({"Serving and inference": "1-12,17-18,28", "Observability and caching": "13-15",
                "Routing and gateways": "16,19", "Releases and testing": "20-22",
                "Reliability and operations": "23-24", "Security, compliance and cost": "25-27"}),
    18: ranges({"Alignment": "1-11", "Red teaming and jailbreaks": "12-17",
                "Fairness and privacy": "20-23", "Security incidents": "25",
                "Moderation": "29", "Governance and policy": "18-19,24,26-28,30"}),
    19: ranges({"Capstone projects": "1-17", "Capstone track: agent harness": "20-29",
                "Capstone track: GPT from scratch": "30-41", "Capstone track: pretraining at scale": "42-49",
                "Capstone track: research agent": "50-57", "Capstone track: vision-language model": "58-63",
                "Capstone track: production RAG": "64-69", "Capstone track: evaluation harness": "70-75",
                "Capstone track: distributed training": "76-81", "Capstone track: safety gate": "82-87"}),
}

PROJECT_SUB = {
    "Data and spreadsheets": "catalog-record-linker chart-storyboard-builder csv-repair-workbench csv-sql-question-workbench "
                             "database-migration-rehearsal dataset-contract-gate dataset-split-auditor decision-tradeoff-explorer "
                             "field-notes-map-builder workshop-materials-planner",
    "Documents, notes and personal organisation": "bookmark-path-organizer calendar-focus-planner community-learning-path-finder "
                             "diagram-reading-companion document-extraction-desk download-folder-sort-desk feedback-theme-board "
                             "glossary-hovercard-publisher inbox-triage-desk meeting-notes-to-actions plain-language-rewrite-desk "
                             "sensitive-text-redaction-gate source-grounded-study-coach vocabulary-autocomplete-pad web-change-brief "
                             "changelog-writer-from-git postmortem-writer",
    "Retrieval and research": "doc-qa-with-citations rag-freshness-pipeline report-judge research-report-agent "
                              "retrieval-evaluation-lab semantic-notes-search",
    "Evaluation and testing": "agent-trace-debugger api-tutorial-runner distributed-eval-farm harness-bench "
                              "json-schema-output-guard local-model-eval-harness pr-review-reporter prompt-regression-tester",
    "Agents": "agent-budget-planner browser-agent cloud-agent-with-aws-strands desktop-control durable-agent-jobs "
              "multi-agent-code-review-panel rust-agent-shell self-improving-skill-loop support-agent-with-google-adk "
              "tiny-coding-agent typed-workflow-agent-with-mastra workflow-hooks",
    "MCP and skills": "mcp-at-scale memory-server skill-installer skill-router skill-scanner skill-validator",
    "Infrastructure and reliability": "configuration-drift-explainer hedged-request-lab infrastructure-plan-explainer "
                                      "kubernetes-event-storyboard llm-gateway-with-fallbacks log-volume-reduction-lab "
                                      "retry-storm-lab sandbox-ladder service-ownership-navigator signed-webhook-inbox "
                                      "streaming-answer-recovery token-counter-and-cost-meter tool-call-firewall",
    "Localisation": "subtitle-localization-desk ui-string-localization-workbench",
    "Media": "visual-evidence-library voice-note-transcriber-pipeline",
}
PROJECT_OF = {name: sub for sub, names in PROJECT_SUB.items() for name in names.split()}

# Course parts that are not lessons or projects: one entry each, so every part of the course is accounted for.
EXTRA = [
    ("Reference", "Glossary", "reference", "glossary", "Glossary and common myths"),
    ("Reference", "Learning paths", "reference", "learning-paths", "Role-based routes through the lessons (12 paths) and career practice"),
    ("Reference", "Course overview", "reference", "README.md", "Course README, roadmap, lesson template and contributor guides (top-level .md files)"),
    ("Reference", "Course overview", "reference", "docs", "Contributor notes on translation and portfolio writing"),
    ("Course tooling", "Website and publishing", "site", "site", "Source of the course website (HTML, CSS, JS, interactive figures)"),
    ("Course tooling", "Website and publishing", "site", "api", "Website backend handlers, including an MCP endpoint (JS)"),
    ("Course tooling", "Website and publishing", "site", "lib", "Helpers for the website and API (JS)"),
    ("Course tooling", "Website and publishing", "site", "i18n", "README translations into 33 languages"),
    ("Course tooling", "Website and publishing", "site", "book", "Pipeline that compiles the course into a six-volume book"),
    ("Course tooling", "Website and publishing", "site", "assets", "README banners and sponsor images"),
    ("Course tooling", "Website and publishing", "site", "outputs", "Empty install target for course skills, prompts and agents"),
    ("Course tooling", "Project templates", "tool", "projects/_template", "Template for a new project"),
    ("Course tooling", "Project templates", "tool", "projects/validation", "Shared project validation material"),
]

OTHER_EXT = {".ts": "TypeScript", ".tsx": "TypeScript", ".js": "JavaScript", ".mjs": "JavaScript",
             ".rs": "Rust", ".go": "Go", ".jl": "Julia"}
SKIP_DIRS = {"node_modules", "__pycache__", ".git"}
STDLIB = set(sys.stdlib_module_names)


def rel(path):
    return os.path.relpath(path, COURSE).replace(os.sep, "/")


def walk_files(root):
    if os.path.isfile(root):
        yield root
        return
    for d, dirs, files in os.walk(root):
        dirs[:] = sorted(x for x in dirs if x not in SKIP_DIRS)
        for f in sorted(files):
            yield os.path.join(d, f)


def read(path):
    with open(path, encoding="utf-8", errors="replace") as fh:
        return fh.read()


def doc_title(folder, fallback):
    """Title and one-line summary from docs/en.md (first '# ' line and first '> ' line)."""
    for cand in ("docs/en.md", "README.md"):
        p = os.path.join(folder, cand)
        if os.path.isfile(p):
            title = summary = ""
            for line in read(p).splitlines()[:40]:
                s = line.strip()
                if not title and s.startswith("# "):
                    title = s[2:].strip()
                elif title and not summary and s.startswith(">"):
                    summary = s.lstrip("> ").strip()
                    break
            if title:
                return title, summary
    return fallback.replace("-", " ").strip().capitalize(), ""


def imports_of(py):
    try:
        tree = ast.parse(read(py))
    except SyntaxError:
        return set()
    names = set()
    for node in ast.walk(tree):
        if isinstance(node, ast.Import):
            names.update(a.name.split(".")[0] for a in node.names)
        elif isinstance(node, ast.ImportFrom) and node.module and node.level == 0:
            names.add(node.module.split(".")[0])
    return names


def is_local(module, py_file, folder):
    """True when the import names a file or package next to the importing file or inside the entry."""
    top = folder if os.path.isdir(folder) else os.path.dirname(folder)
    dirs, d = [os.path.join(COURSE, "scripts")], os.path.dirname(py_file)
    while True:  # the importing file's folder and every parent up to the entry folder
        dirs.append(d)
        if os.path.normpath(d) == os.path.normpath(top) or len(d) <= len(COURSE):
            break
        d = os.path.dirname(d)
    for d in dirs:
        if os.path.isfile(os.path.join(d, module + ".py")) or os.path.isdir(os.path.join(d, module)):
            return True
    return False


def code_facts(folder, exclude=()):
    files = [f for f in walk_files(folder) if not any(rel(f).startswith(x) for x in exclude)]
    py = [f for f in files if f.endswith(".py")]
    local = {os.path.splitext(os.path.basename(f))[0] for f in py}
    needs = set()
    for f in py:
        needs |= {m for m in imports_of(f)
                  if m not in STDLIB and m not in local and m != "__future__" and not is_local(m, f, folder)}
    other = sorted({OTHER_EXT[os.path.splitext(f)[1]] for f in files if os.path.splitext(f)[1] in OTHER_EXT})
    has_tests = any(re.search(r"(^|/)(tests?/|test_[^/]*\.py$|[^/]*_test\.py$)", rel(f)) for f in py)
    has_quiz = os.path.isfile(os.path.join(folder, "quiz.json")) if os.path.isdir(folder) else False
    pyrel = [os.path.relpath(f, folder).replace(os.sep, "/") for f in py] if os.path.isdir(folder) else [os.path.basename(f) for f in py]
    return pyrel, other, sorted(needs), has_tests, has_quiz


def llm_index():
    """course-relative path -> llm_instructions-relative path, for files pulled out of the course."""
    out = []
    for kind in ("skills", "prompts", "agents"):
        base = os.path.join(LLM, kind)
        for f in walk_files(base) if os.path.isdir(base) else []:
            out.append((os.path.relpath(f, base).replace(os.sep, "/"), os.path.relpath(f, LLM).replace(os.sep, "/")))
    return out


def lesson_num(name):
    m = re.match(r"(\d+)-", name)
    return int(m.group(1)) if m else None


def build_entries():
    llm = llm_index()

    def llm_for(src):
        prefix = src.rstrip("/") + "/"
        return sorted(dst for course_rel, dst in llm if course_rel.startswith(prefix))

    entries = []

    def add(eid, cat, sub, kind, title, summary, folder, extra_llm=True, exclude=()):
        src = rel(folder)
        pyf, other, needs, tests, quiz = code_facts(folder, exclude)
        entries.append({
            "id": eid, "category": cat, "subcategory": sub, "kind": kind, "title": title, "summary": summary,
            "source": src, "python_files": "; ".join(pyf), "other_languages": ", ".join(other),
            "needs": ", ".join(needs) if needs else ("standard library only" if pyf else ""),
            "has_tests": "yes" if tests else "no", "has_quiz": "yes" if quiz else "no",
            "llm_instructions": "; ".join(llm_for(src)) if extra_llm else "",
            "status": "discovery", "evidence": "", "notes": "",
        })

    # 1. lessons
    pdir = os.path.join(COURSE, "phases")
    for phase in sorted(os.listdir(pdir)):
        pn = lesson_num(phase)
        if pn is None or pn not in PHASES:
            continue
        cat, sub = PHASES[pn]
        for lesson in sorted(os.listdir(os.path.join(pdir, phase))):
            folder = os.path.join(pdir, phase, lesson)
            ln = lesson_num(lesson)
            if not os.path.isdir(folder) or ln is None:
                continue
            s = sub or LESSON_SUB[pn].get(ln, "Other")
            title, summary = doc_title(folder, lesson)
            add(f"L{pn:02d}-{ln:02d}", cat, s, "lesson", title, summary, folder)

    # 2. projects
    for name in sorted(os.listdir(os.path.join(COURSE, "projects"))):
        folder = os.path.join(COURSE, "projects", name)
        if not os.path.isdir(folder) or name in ("_template", "validation"):
            continue
        title, summary = name.replace("-", " ").capitalize(), ""
        pj = os.path.join(folder, "project.json")
        if os.path.isfile(pj):
            j = json.loads(read(pj))
            title = j.get("title") or title
            summary = j.get("tagline") or j.get("summary") or ""
        add(f"P-{name}", "Projects (workflows)", PROJECT_OF.get(name, "Other projects"), "project", title, summary, folder)

    # 3. certification lessons
    for prog, label in (("claude", "Certification: Claude"), ("mcpa", "Certification: MCPA")):
        ldir = os.path.join(COURSE, "certifications", prog, "lessons")
        for lesson in sorted(os.listdir(ldir)):
            folder = os.path.join(ldir, lesson)
            ln = lesson_num(lesson)
            if not os.path.isdir(folder) or ln is None:
                continue
            title, summary = doc_title(folder, lesson)
            add(f"C{prog[0].upper()}-{ln:02d}", "Reference", label, "certification lesson", title, summary, folder)
        # the program material around the lessons
        add(f"C{prog[0].upper()}-program", "Reference", label, "certification program",
            f"{label.split(': ')[1]} certification: program, tracks, assessments, research",
            "Program files, tracks, assessments and research notes (everything except lessons/)",
            os.path.join(COURSE, "certifications", prog), extra_llm=False,
            exclude=(f"certifications/{prog}/lessons/",))

    # 4. manuals
    for name in sorted(os.listdir(os.path.join(COURSE, "manuals"))):
        folder = os.path.join(COURSE, "manuals", name)
        if os.path.isdir(folder) and not name.startswith("_"):
            title, summary = doc_title(folder, name)
            add(f"M-{name}", "Reference", "Manuals", "manual", title, summary, folder)
    add("M-shared", "Course tooling", "Website and publishing", "site", "Manual styling and figure code",
        "Shared CSS and JS used by every manual", os.path.join(COURSE, "manuals", "_shared"))

    # 5. course scripts, one entry per script
    for f in sorted(os.listdir(os.path.join(COURSE, "scripts"))):
        path = os.path.join(COURSE, "scripts", f)
        if not os.path.isfile(path):
            continue
        summary = ""
        if f.endswith(".py"):
            try:
                summary = (ast.get_docstring(ast.parse(read(path))) or "").strip().splitlines()[0]
            except (SyntaxError, IndexError):
                summary = ""
        sub = ("Run and test" if re.search(r"run|test|check|audit|link", f) else
               "Catalogue and install" if re.search(r"catalog|install|scaffold", f) else "Content and translation")
        stem = os.path.splitext(f)[0]
        add(f"T-{stem}", "Course tooling", sub, "script", f, summary, path, extra_llm=False)

    # 6. the rest of the course
    for cat, sub, kind, path, title in EXTRA:
        folder = os.path.join(COURSE, path)
        if os.path.exists(folder):
            add(f"R-{path.replace('/', '-').replace('.md', '')}", cat, sub, kind, title, "", folder, extra_llm=False)

    seen = Counter(e["id"] for e in entries)
    dup = [k for k, v in seen.items() if v > 1]
    if dup:
        raise SystemExit(f"duplicate ids: {dup}")
    return entries


def load_hand_columns():
    if not os.path.isfile(CATALOG):
        return {}
    with open(CATALOG, encoding="utf-8", newline="") as fh:
        return {r["source"]: {k: r.get(k, "") for k in HAND_COLUMNS} for r in csv.DictReader(fh)}


def merge(entries, hand):
    for e in entries:
        h = hand.get(e["source"])
        if h:
            e.update({k: v for k, v in h.items() if v})
        if e["status"] not in STATUSES:
            raise SystemExit(f"{e['id']}: unknown status {e['status']!r}; use one of {', '.join(STATUSES)}")
    return entries


def catalog_text(entries):
    out = io.StringIO(newline="")
    w = csv.DictWriter(out, fieldnames=COLUMNS, lineterminator="\n")
    w.writeheader()
    w.writerows(entries)
    return out.getvalue()


def link(src):
    return f"../course/ai_engineering/{src}"


def esc(s):
    return s.replace("|", "\\|")


def status_bar(entries):
    c = Counter(e["status"] for e in entries)
    return " · ".join(f"{s} {c[s]}" for s in STATUSES if c[s]) or "none"


def category_page(cat, entries):
    page, desc = CATEGORIES[cat]
    subs = OrderedDict()
    for e in entries:
        subs.setdefault(e["subcategory"], []).append(e)
    lines = [f"# {cat}", "", desc, "",
             f"{len(entries)} entries. Status: {status_bar(entries)}.", "",
             "Source: *AI Engineering from Scratch* (MIT licence), kept unchanged in `../course/ai_engineering/`. "
             "This page is generated by `build_corpus.py`; change status, evidence and notes in `CATALOG.csv`, then rebuild.", "",
             "## Contents", ""]
    for s, es in subs.items():
        anchor = re.sub(r"[^a-z0-9 -]", "", s.lower()).replace(" ", "-")
        lines.append(f"- [{s}](#{anchor}) ({len(es)})")
    for s, es in subs.items():
        lines += ["", f"## {s}", "", "| ID | Entry | Python | Needs | Tests | LLM instructions | Status |", "|---|---|---|---|---|---|---|"]
        for e in es:
            title = f"[{esc(e['title'])}]({link(e['source'])})"
            if e["summary"]:
                title += f"<br>{esc(e['summary'][:160])}"
            n_py = len([x for x in e["python_files"].split("; ") if x])
            py = f"{n_py} file{'s' if n_py != 1 else ''}" if n_py else "none"
            if e["other_languages"]:
                py += f" (also {e['other_languages']})" if n_py else f" ({e['other_languages']} only)"
            n_llm = len([x for x in e["llm_instructions"].split("; ") if x])
            llm = ", ".join(f"[{os.path.basename(x)}](../llm_instructions/{x})" for x in e["llm_instructions"].split("; ")[:3] if x)
            if n_llm > 3:
                llm += f" +{n_llm - 3}"
            lines.append(f"| {e['id']} | {title} | {py} | {esc(e['needs'])} | {e['has_tests']} | {llm} | {e['status']} |")
    return "\n".join(lines) + "\n"


def readme(entries):
    by_cat = OrderedDict((c, [e for e in entries if e["category"] == c]) for c in CATEGORIES)
    total_py = sum(len([x for x in e["python_files"].split("; ") if x]) for e in entries)
    std = sum(1 for e in entries if e["needs"] == "standard library only")
    kinds = Counter(e["kind"] for e in entries)
    L = ["# Learning corpus", "",
         "A subject-by-subject dictionary of the course *AI Engineering from Scratch* (MIT licence, by Rohit Ghumare), "
         "with Python as the main source. It is the learning part of this toolkit: every entry is a lesson or project to study, "
         "run and test, and the ones that are workflows can be adapted and confirmed as Python skills.", "",
         "The course itself is kept unchanged in [`../course/ai_engineering/`](../course/ai_engineering/), so its own scripts "
         "(`scripts/lesson_run.py`, `scripts/run_lesson_tests.py`, `scripts/project_test.py`) still work on it. "
         "This folder only indexes it: nothing here is a copy.", "",
         "## At a glance", "",
         f"- **{len(entries)} entries**: {kinds['lesson']} lessons, {kinds['project']} projects, "
         f"{kinds['certification lesson']} certification lessons, and {len(entries) - kinds['lesson'] - kinds['project'] - kinds['certification lesson']} "
         "reference and tooling items (so every part of the course is accounted for).",
         f"- **{total_py} Python files** linked from the entries; {std} entries need only the standard library.",
         f"- **Progress**: {status_bar(entries)}.", "",
         "## Categories", "",
         "| Category | What it covers | Entries | Subcategories | Status |", "|---|---|---|---|---|"]
    for c, es in by_cat.items():
        page, desc = CATEGORIES[c]
        subs = list(OrderedDict.fromkeys(e["subcategory"] for e in es))
        L.append(f"| [{c}]({page}) | {desc} | {len(es)} | {', '.join(subs)} | {status_bar(es)} |")
    L += ["", "## Status ladder", "",
          "Every entry starts at `discovery` and moves up one step at a time. Not every entry needs to reach the top: "
          "a math lesson can stop at `tested`; a project that is a real workflow can go all the way to `confirmed`.", "",
          "| Step | Status | Meaning |", "|---|---|---|"]
    for i, s in enumerate(STATUSES, 1):
        L.append(f"| {i} | `{s}` | {STATUS_MEANING[s]} |")
    L += ["", "## How to use it", "",
          "1. Open a category page and pick an entry. The title links to the lesson or project in the course.",
          "2. When you move it up the ladder, edit its row in `CATALOG.csv`: set `status`, and write what you ran and the result in `evidence` (for example `2026-10-20 python code/svd.py: ok`).",
          "3. Rebuild the pages: `python -I -X utf8 python_skills/corpus/build_corpus.py`. Your status, evidence and notes are kept; everything else is re-read from the course.",
          "4. When an entry is `confirmed`, its Python skill lives in `../confirmed/` and the entry's `notes` names it.", "",
          "## Columns in `CATALOG.csv`", "",
          "| Column | Meaning |", "|---|---|",
          "| `id` | `L<phase>-<lesson>` lesson, `P-<name>` project, `CC-`/`CM-` Claude/MCPA certification lesson, `M-` manual, `T-` course script, `R-` other course part |",
          "| `category`, `subcategory` | Where it sits in this dictionary |",
          "| `kind` | lesson, project, certification lesson, manual, script, reference, site |",
          "| `title`, `summary` | From the lesson's `docs/en.md` or the project's `project.json` |",
          "| `source` | Path inside `course/ai_engineering/` |",
          "| `python_files` | The `.py` files in the entry, relative to `source` |",
          "| `other_languages` | Other languages the entry is also written in |",
          "| `needs` | Third-party packages found in the imports (read from the code, not installed or run) |",
          "| `has_tests`, `has_quiz` | Whether the entry has its own tests and a quiz |",
          "| `llm_instructions` | Skill, prompt and agent files of this entry, now in `../llm_instructions/` |",
          "| `status`, `evidence`, `notes` | Yours to edit; kept on every rebuild |", "",
          "## Notes", "",
          "- `needs` is read from `import` lines only. Nothing was installed or run to build this corpus, so every entry starts at `discovery`.",
          "- Some projects have no Python version (TypeScript or Go only); they are listed so nothing is lost, and marked as such.",
          "- The course's grouping (phases 00 to 19) is kept in the IDs: `L14-07` is phase 14, lesson 07.",
          "- A few LLM instruction files belong to the whole course rather than one entry (the course guide skills and `AGENTS.md`); they are in `../llm_instructions/` and not linked from an entry.", ""]
    return "\n".join(L)


def outputs(entries):
    files = {CATALOG: catalog_text(entries), os.path.join(HERE, "README.md"): readme(entries)}
    for c, (page, _) in CATEGORIES.items():
        files[os.path.join(HERE, page)] = category_page(c, [e for e in entries if e["category"] == c])
    return files


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    ap.add_argument("--check", action="store_true", help="only check that the files on disk are up to date")
    a = ap.parse_args(argv)
    if not os.path.isdir(COURSE):
        print(f"course not found: {COURSE}", file=sys.stderr)
        return 2
    entries = merge(build_entries(), load_hand_columns())
    files = outputs(entries)
    if a.check:
        stale = [p for p, t in files.items() if not os.path.isfile(p) or open(p, encoding="utf-8", newline="").read() != t]
        for p in stale:
            print("out of date:", os.path.relpath(p, HERE))
        return 1 if stale else 0
    for p, t in files.items():
        with open(p, "w", encoding="utf-8", newline="") as fh:
            fh.write(t)
    print(f"{len(entries)} entries -> CATALOG.csv, README.md and {len(CATEGORIES)} category pages")
    return 0


if __name__ == "__main__":
    sys.exit(main())
