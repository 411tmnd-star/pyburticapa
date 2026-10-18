"""Build the learning corpus: one catalogue entry per lesson, project or reference item of the course.

The course copy in ../course/ai_engineering is read, never changed. This script writes:
  CATALOG.csv        one row per entry; the source of truth for status, evidence and notes
  README.md          short overview: the category folders, status ladder, how to use
  <category>/<subcategory>/README.md   one folder per category and subcategory, each with a short list of its entries
                     and a link to the matching part of the course (all generated; do not edit by hand)

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
    ("Foundations", ("foundations", "Setup, the math behind models, machine learning and deep learning basics.")),
    ("Language", ("language", "Text: NLP, transformers, generative models and building LLMs from scratch.")),
    ("Perception", ("perception", "Images, speech and audio, and models that combine several inputs.")),
    ("LLM engineering", ("llm_engineering", "Using LLMs in software: prompting, retrieval, fine-tuning, tools, evaluation, cost.")),
    ("Agents and tools", ("agents_and_tools", "Tool calling, MCP, skills, agent design, autonomy and multi-agent systems.")),
    ("Production", ("production", "Serving, reliability, security, cost, safety and alignment.")),
    ("Reinforcement learning", ("reinforcement_learning", "Learning from rewards.")),
    ("Projects (workflows)", ("projects", "Build projects and capstone tracks: the closest things to workflows with an input and an output.")),
    ("Reference", ("reference", "Certification study paths, manuals, glossary and learning paths.")),
    ("Course tooling", ("course_tooling", "The course's own scripts (run, test, audit, catalogue) and its website and publishing parts.")),
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


def slug(s):
    return re.sub(r"[^a-z0-9]+", "_", s.lower()).strip("_")


def sub_path(sub):
    """Folder path of a subcategory below its category folder."""
    if sub.startswith("Capstone track: "):
        return "capstone_tracks/" + slug(sub.split(": ", 1)[1])
    if sub.startswith("Certification: "):
        return "certifications/" + slug(sub.split(": ", 1)[1])
    return slug(sub)


def entry_dir(e):
    folder = CATEGORIES[e["category"]][0]
    sub = sub_path(e["subcategory"])
    if sub == folder:  # a category with one subcategory of the same name keeps its entries in the category folder
        return os.path.join(HERE, folder)
    return os.path.join(HERE, folder, *sub.split("/"))


def course_link(page_dir, target):
    return os.path.relpath(os.path.join(COURSE, target), page_dir).replace(os.sep, "/")


def esc(s):
    return s.replace("|", "\\|")


def status_bar(entries):
    c = Counter(e["status"] for e in entries)
    return " · ".join(f"{s} {c[s]}" for s in STATUSES if c[s]) or "none"


def course_target(entries):
    """The part of the course these entries come from: their common parent folder."""
    dirs = [os.path.dirname(e["source"]) if os.path.splitext(e["source"])[1] else e["source"] for e in entries]
    dirs = [d for d in dirs if d]
    if not dirs:
        return ""
    common = os.path.commonpath([d.split("/") and d for d in dirs]) if len(dirs) > 1 else dirs[0]
    return common.replace(os.sep, "/")


def page_for(folder, tree, by_dir):
    """README.md of one folder. `tree` maps a folder to its child folders; `by_dir` maps a folder to its own entries."""
    rel_dir = os.path.relpath(folder, HERE).replace(os.sep, "/")
    name = os.path.basename(folder)
    children = sorted(tree.get(folder, []), key=lambda d: order_key(d))
    own = by_dir.get(folder, [])
    everything = list(own)
    stack = list(children)
    while stack:
        c = stack.pop()
        everything += by_dir.get(c, [])
        stack += tree.get(c, [])
    depth = rel_dir.count("/") + 1
    up = "../" * depth
    first = rel_dir.split("/")[0]
    cat = next((c for c, (f, _) in CATEGORIES.items() if f == first), None)
    title = cat if depth == 1 else (own[0]["subcategory"] if own else name.replace("_", " ").capitalize())
    L = [f"# {title}", ""]
    if depth == 1:
        L += [CATEGORIES[cat][1], ""]
    crumbs = " / ".join([f"[Corpus]({up}README.md)"] + [f"[{CATEGORIES[cat][0].replace('_', ' ')}]({'../' * (depth - 1)}README.md)"] * (depth > 1))
    L += [f"{crumbs}  ·  {len(everything)} entries  ·  {status_bar(everything)}", ""]
    target = course_target(everything)
    L += [f"**Course:** [ai_engineering/{target}]({course_link(folder, target)})" if target else
          f"**Course:** [ai_engineering]({course_link(folder, '')})", ""]
    if children:
        L += ["| Folder | Entries | Status |", "|---|---|---|"]
        for c in children:
            sub_entries = list(by_dir.get(c, []))
            st = list(tree.get(c, []))
            while st:
                x = st.pop()
                sub_entries += by_dir.get(x, [])
                st += tree.get(x, [])
            label = (by_dir[c][0]["subcategory"].split(": ")[-1] if by_dir.get(c) else os.path.basename(c).replace("_", " ").capitalize())
            L.append(f"| [{label}]({os.path.basename(c)}/README.md) | {len(sub_entries)} | {status_bar(sub_entries)} |")
        L.append("")
    if own:
        has_llm = any(e["llm_instructions"] for e in own)
        L += ["| ID | Entry | Python | Needs | Status |" + (" Instructions |" if has_llm else ""),
              "|---|---|---|---|---|" + ("---|" if has_llm else "")]
        for e in own:
            tip = esc(e["summary"][:140]).replace('"', "'")
            entry = f'[{esc(e["title"])}]({course_link(folder, e["source"])}' + (f' "{tip}")' if tip else ")")
            n_py = len([x for x in e["python_files"].split("; ") if x])
            py = f"{n_py} file{'s' if n_py != 1 else ''}" if n_py else "none"
            if e["other_languages"]:
                py += f" + {e['other_languages']}" if n_py else f" ({e['other_languages']} only)"
            row = f"| {e['id']} | {entry} | {py} | {esc(e['needs'])} | {e['status']} |"
            if has_llm:
                links = [x for x in e["llm_instructions"].split("; ") if x]
                row += " " + ", ".join(f"[{os.path.basename(x)}]({os.path.relpath(os.path.join(LLM, x), folder).replace(os.sep, '/')})" for x in links[:2]) + (f" +{len(links) - 2}" if len(links) > 2 else "") + " |"
            L.append(row)
        L.append("")
    return "\n".join(L)


def order_key(folder):
    """Keep the order in which categories and subcategories first appear in the catalogue."""
    return ORDER.get(folder, 10 ** 6), folder


ORDER = {}


def readme(entries):
    kinds = Counter(e["kind"] for e in entries)
    total_py = sum(len([x for x in e["python_files"].split("; ") if x]) for e in entries)
    std = sum(1 for e in entries if e["needs"] == "standard library only")
    L = ["# Learning corpus", "",
         "The course *AI Engineering from Scratch* (MIT licence, by Rohit Ghumare) arranged by subject, with Python as the main source. "
         "Open a category folder, then a subfolder: each one lists its lessons or projects and links to the original course. "
         "The course itself is kept unchanged in [`../course/ai_engineering/`](../course/ai_engineering/).", "",
         f"**{len(entries)} entries** ({kinds['lesson']} lessons, {kinds['project']} projects, {kinds['certification lesson']} certification lessons, "
         f"{len(entries) - kinds['lesson'] - kinds['project'] - kinds['certification lesson']} reference and tooling items) · "
         f"{total_py} Python files · progress: {status_bar(entries)}", "",
         "| Folder | What it covers | Entries | Status |", "|---|---|---|---|"]
    for c, (folder, desc) in CATEGORIES.items():
        es = [e for e in entries if e["category"] == c]
        L.append(f"| [{folder}/]({folder}/README.md) | {desc} | {len(es)} | {status_bar(es)} |")
    L += ["", "## Status ladder", "", "Every entry starts at `discovery` and moves up one step at a time.", "",
          "| Step | Status | Meaning |", "|---|---|---|"]
    for i, s in enumerate(STATUSES, 1):
        L.append(f"| {i} | `{s}` | {STATUS_MEANING[s]} |")
    L += ["", "## Keeping it up to date", "",
          "1. Edit an entry's row in [`CATALOG.csv`](CATALOG.csv): set `status`, and write what you ran and the result in `evidence`.",
          "2. Run `python -I -X utf8 python_skills/corpus/build_corpus.py`. Your `status`, `evidence` and `notes` are kept; the folders and pages are rebuilt.",
          "3. When an entry is `confirmed`, its Python skill is in [`../confirmed/`](../confirmed/) and the `notes` column names it.", "",
          f"`CATALOG.csv` has one row per entry with its id, category, subcategory, title, source path, Python files, other languages, packages needed ({std} entries need only the standard library), "
          "tests, quiz and LLM instruction files. Packages are read from the `import` lines; nothing was installed or run to build this. "
          "Entry ids: `L14-07` is phase 14, lesson 07; `P-` project; `CC-`/`CM-` Claude/MCPA certification lesson; `M-` manual; `T-` course script; `R-` other course part.", ""]
    return "\n".join(L)


UNITS_CONFIG = os.path.join(HERE, "units.json")
UNIT_KINDS = {"lesson", "project", "certification lesson"}


def unit_scope():
    with open(UNITS_CONFIG, encoding="utf-8") as fh:
        return json.load(fh).get("unit_layout", [])


def in_unit_scope(folder, scope):
    r = os.path.relpath(folder, HERE).replace(os.sep, "/")
    return "*" in scope or any(r == s or r.startswith(s + "/") for s in scope)


def unit_name(e):
    return slug(os.path.basename(e["source"]))


def unit_sources(e):
    """{path inside the unit: course file} for the Python of one entry, copied exactly."""
    src = os.path.join(COURSE, e["source"])
    base = os.path.join(src, "solution" if e["kind"] == "project" else "code")
    out = {}
    if os.path.isdir(base):  # the code folder (lesson) or the finished solution (project), minus other-language sources
        for f in walk_files(base):
            if os.path.splitext(f)[1] not in OTHER_EXT:
                out[os.path.relpath(f, base).replace(os.sep, "/")] = f
    if e["kind"] != "project":  # lesson Python that lives outside code/ keeps its path
        for f in walk_files(src):
            r = os.path.relpath(f, src).replace(os.sep, "/")
            if f.endswith(".py") and not r.startswith("code/"):
                out[r] = f
    return out


def first_paragraph(py):
    try:
        doc = ast.get_docstring(ast.parse(read(py))) or ""
    except SyntaxError:
        return ""
    return doc.strip().split("\n\n")[0].replace("\n", " ").strip()


def runnable(py):
    return re.search(r"^if __name__ == ['\"]__main__['\"]", read(py), re.M) is not None


def main_file(names):
    top = [n for n in names if n.endswith(".py") and "/" not in n]
    for pref in ("main.py", "cli.py", "app.py"):
        if pref in top:
            return pref
    return sorted(top)[0] if top else None


def unit_readme(e, unit, copied):
    src = os.path.join(COURSE, e["source"])
    names = sorted(copied)
    mf = main_file(names)
    doc = ""
    if mf:
        try:
            doc = (ast.get_docstring(ast.parse(read(copied[mf]))) or "").strip()
        except SyntaxError:
            doc = ""
    L = [f"# {e['title']}", ""]
    if e["summary"]:
        L += [f"> {e['summary']}", ""]
    L += [f"## What `{mf}` does" if mf else "## What it does", ""]
    L += (["```text"] + doc.splitlines()[:25] + ["```"]) if doc else ["See the files below."]
    L += ["", "(from the script's own docstring)" if doc else "", ""]
    runs = [n for n in names if n.endswith(".py") and "/" not in n and runnable(copied[n])]
    runs = ([mf] if mf in runs else []) + [n for n in runs if n != mf]
    tests = sorted({n.split("/")[0] for n in names if n.endswith(".py") and re.search(r"(^|/)tests?/", n)})
    L += ["## Run it", "", "From this folder:", "", "```"]
    L += [f"python {n}" for n in runs] or ["(no script with a main block; import it from Python)"]
    for tdir in tests:
        uses_pytest = any("pytest" in imports_of(copied[n]) for n in names if n.startswith(tdir + "/") and n.endswith(".py"))
        L.append(f"python -m pytest {tdir}" if uses_pytest else f"python -m unittest discover -s {tdir}")
    L += ["```", "", f"Needs: {e['needs'] or 'nothing'}", "",
          "## Files", ""]
    L += [f"- [`{n}`]({n})" for n in names]
    L += ["", "These are exact copies from the course; `build_corpus.py` checks they stay identical. "
          "Adapt the code in your own skill under `python_skills/confirmed/`, not here.", "", "## Learn more", ""]
    links = []
    def add(label, path):
        if os.path.exists(path):
            links.append(f"- {label}: [{os.path.relpath(path, COURSE).replace(os.sep, '/')}]({os.path.relpath(path, unit).replace(os.sep, '/')})")
    add("Theory", os.path.join(src, "docs", "en.md"))
    add("Project guide", os.path.join(src, "README.md"))
    add("API", os.path.join(src, "API.md"))
    add("Quiz", os.path.join(src, "quiz.json"))
    for f in sorted(walk_files(os.path.join(src, "assets"))) if os.path.isdir(os.path.join(src, "assets")) else []:
        add("Diagram", f)
    if e["kind"] == "project" and os.path.isdir(os.path.join(src, "stages")):
        for s in sorted(os.listdir(os.path.join(src, "stages"))):
            add(f"Stage {s}", os.path.join(src, "stages", s))
    for f in sorted(walk_files(os.path.join(src, "code"))) if os.path.isdir(os.path.join(src, "code")) else []:
        if os.path.splitext(f)[1] in OTHER_EXT:
            add(f"{OTHER_EXT[os.path.splitext(f)[1]]} version", f)
    for x in [x for x in e["llm_instructions"].split("; ") if x]:
        links.append(f"- LLM instructions: [{os.path.basename(x)}]({os.path.relpath(os.path.join(LLM, x), unit).replace(os.sep, '/')})")
    add("Original lesson folder" if e["kind"] != "project" else "Original project folder", src)
    L += links + ["", "## Use it in a workflow", "",
                  (e["notes"] or "Not adapted yet. When you adapt it, write the skill name in the `notes` column of `CATALOG.csv`."), ""]
    return "\n".join(L)


def unit_map(folder, own, units):
    """README of a subfolder in the unit layout: one line per unit, in learning order."""
    rel_dir = os.path.relpath(folder, HERE).replace(os.sep, "/")
    depth = rel_dir.count("/") + 1
    first = rel_dir.split("/")[0]
    cat = next(c for c, (f, _) in CATEGORIES.items() if f == first)
    L = [f"# {own[0]['subcategory'].split(': ')[-1]}", "",
         f"[Corpus]({'../' * depth}README.md) / [{first}]({'../' * (depth - 1)}README.md)  ·  "
         f"Course: [ai_engineering/{course_target(own)}]({course_link(folder, course_target(own))})", "",
         "Each folder holds the Python of one lesson or project. Open it, read the script, run it.", "",
         "| Folder | What the script does | Run |", "|---|---|---|"]
    others = []
    for e in own:
        if e["source"] in units:
            name, copied = units[e["source"]]
            mf = main_file(sorted(copied))
            what = first_paragraph(copied[mf]) if mf else e["summary"]
            what = esc(what.split(". ")[0].rstrip(".")[:120])
            L.append(f"| [{name}/]({name}/README.md) | {what} | `python {mf}` |" if mf else f"| [{name}/]({name}/README.md) | {what} | |")
        else:
            others.append(e)
    if others:
        L += ["", "## Not Python (links only)", ""]
        L += [f"- [{esc(e['title'])}]({course_link(folder, e['source'])}) ({e['other_languages'] or 'no code'})" for e in others]
    return "\n".join(L) + "\n"


def outputs(entries):
    scope = unit_scope()
    by_dir, tree = {}, {}
    for i, e in enumerate(entries):
        d = entry_dir(e)
        by_dir.setdefault(d, []).append(e)
        ORDER.setdefault(d, i)
    folders = set(by_dir)
    for d in list(folders):
        while os.path.normpath(d) != os.path.normpath(HERE):
            parent = os.path.dirname(d)
            if d != parent and d not in tree.setdefault(parent, []):
                tree[parent].append(d)
            folders.add(d)
            d = parent
    for i, (c, (f, _)) in enumerate(CATEGORIES.items()):
        ORDER[os.path.join(HERE, f)] = i
    files = {CATALOG: catalog_text(entries), os.path.join(HERE, "README.md"): readme(entries)}
    for f in sorted(folders):
        if os.path.normpath(f) == os.path.normpath(HERE):
            continue
        own = by_dir.get(f, [])
        if own and in_unit_scope(f, scope):
            units = {}
            for e in own:
                if e["kind"] in UNIT_KINDS and e["python_files"]:
                    copied = unit_sources(e)
                    if copied:
                        name = unit_name(e)
                        units[e["source"]] = (name, copied)
                        udir = os.path.join(f, name)
                        for r, srcf in copied.items():
                            with open(srcf, "rb") as fh:
                                files[os.path.join(udir, *r.split("/"))] = fh.read()
                        files[os.path.join(udir, "README.md")] = unit_readme(e, udir, copied)
            files[os.path.join(f, "README.md")] = unit_map(f, own, units)
        else:
            files[os.path.join(f, "README.md")] = page_for(f, tree, by_dir)
    return files


KEEP = {"build_corpus.py", "CATALOG.csv", "README.md", "units.json"}


def stale_files(files):
    """Files in the generated folders that are no longer produced (earlier layouts, removed copies)."""
    out = []
    for d, dirs, fs in os.walk(HERE):
        dirs[:] = [x for x in dirs if x != "__pycache__"]
        for f in fs:
            p = os.path.join(d, f)
            if p in files or (d == HERE and f in KEEP):
                continue
            if d != HERE or f.endswith(".md"):
                out.append(p)
    return sorted(out)


def same(p, content):
    if not os.path.isfile(p):
        return False
    with open(p, "rb") as fh:
        data = fh.read()
    return data == (content if isinstance(content, bytes) else content.encode("utf-8"))


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
        stale = [p for p, c in files.items() if not same(p, c)] + stale_files(files)
        for p in stale:
            print("out of date:", os.path.relpath(p, HERE))
        return 1 if stale else 0
    for p in stale_files(files):
        os.remove(p)
    for p, c in files.items():
        if same(p, c):
            continue
        os.makedirs(os.path.dirname(p), exist_ok=True)
        with open(p, "wb") as fh:
            fh.write(c if isinstance(c, bytes) else c.encode("utf-8"))
    for d, dirs, fs in os.walk(HERE, topdown=False):  # drop folders left empty
        if d != HERE and not os.listdir(d):
            os.rmdir(d)
    copies = sum(1 for c in files.values() if isinstance(c, bytes))
    print(f"{len(entries)} entries -> CATALOG.csv, README.md, {len(files) - 2 - copies} folder pages, {copies} copied course files")
    return 0


if __name__ == "__main__":
    sys.exit(main())
