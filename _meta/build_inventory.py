"""Build the Toolkit's consolidated INVENTORY.csv. Every row of the original 1_PY/PY_INVENTORY.csv is kept
(none dropped); scan rows and new tools are added. Reads only; writes ../INVENTORY.csv and prints a summary."""
import collections, csv, os

H = r"C:\Users\USER\Desktop\tool harness"
T = r"C:\Users\USER\Desktop\Python_Toolkit"
norm = lambda p: os.path.normcase(os.path.normpath(p))

orig = list(csv.DictReader(open(os.path.join(H, "1_PY", "PY_INVENTORY.csv"), encoding="utf-8")))
scan = {norm(os.path.join(H, r["path"])): r for r in csv.DictReader(open(os.path.join(T, "_meta", "scan_results.csv"), encoding="utf-8"))}
log = list(csv.DictReader(open(os.path.join(T, "MIGRATION_LOG.csv"), encoding="utf-8")))
copied = {norm(r["source"]): r for r in log if r["action"] in ("COPIED", "SKIPPED_EXISTS")}
ver = {r["item"]: r for r in csv.DictReader(open(os.path.join(T, "VERIFICATION.csv"), encoding="utf-8"))}

# group rules: (path fragment, group, category, capability, disposition, reason)
R = [
    ("tools/chat_reply_extractor", "chat_reply_extractor", "Document and chat processing", "Keep only LLM replies from chat exports", "copied", ""),
    ("tools/prompt_reply_pipeline", "prompt_reply_pipeline", "Document and chat processing", "Separate prompts/replies; prepare; verify LLM output", "copied", ""),
    ("tools/PDF_TO_MD", "pdf_to_md", "Document conversion", "PDF to Markdown", "copied", ""),
    ("tools/KNOWLEDGE_EXTRACTION/v2", "knowledge_extraction_v2", "Document conversion", "Chat JSON / JSONL / MHT to Markdown", "copied", ""),
    ("tools/KNOWLEDGE_EXTRACTION/v1_frozen", "knowledge_extraction_v1_frozen", "Knowledge extraction", "Corpus prepare/chunk/analyse (frozen)", "left in place", "frozen snapshot tied to its checksummed data"),
    ("tools/X/mht_to_md_tool", "mht_to_md_tool", "Document conversion", "MHT to Markdown", "copied", ""),
    ("tools/X/GEMINITOMDTOOL", "gemini_md2", "Document conversion", "Gemini conversation to Markdown", "copied", ""),
    ("tools/X/CODE_OUT", "x_misc_output", "Unrelated output", "Deck build script (output folder)", "left in place", "generated output folder, not a toolkit tool"),
    ("tools/repo_inspect", "repo_inspect", "Repository analysis", "Repository inspection", "copied", ""),
    ("tools/411_archive_processing", "archive_processing", "Archive processing", "Chat archive to corpus/threads (stages 0-6)", "left in place", "hard-coded Harness paths; 390 MB of outputs and logs beside the code"),
    ("tools/Browser-DevTools-Python-Research", "browser_devtools_research", "Research project", "Browser/DevTools Python experiments", "left in place", "separate research project; duplicate copy also at 1_PY/assets"),
    ("links.md/", "x_pipeline", "Content ingestion", "X links to notes, media, transcripts", "copied", ""),
    ("1_PY/assets/", "harness_assets", "Harness data and assets", "Harness canonical assets and research projects", "left in place", "Harness-owned assets/registries"),
    ("1_PY/registry/", "harness_registry", "Registry", "Registry maintenance", "left in place", "writes shared registries"),
    ("1_PY/reports/", "harness_reports", "Reports", "Report generators with Harness paths", "left in place", "Harness path assumptions"),
    ("1_PY/add_skill.py", "harness_registry", "Registry", "Skill registry maintenance", "left in place", "writes shared registries"),
    ("1_PY/discover.py", "discover", "Discovery", "Search registry, skills, notes", "copied (adapted)", ""),
    ("1_PY/test_discover.py", "discover", "Discovery", "Discovery tests", "copied (adapted)", ""),
    ("1_PY/test_ollama_synthesis.py", "discover", "Discovery", "Discovery synthesis tests", "copied", ""),
]
VERIFIED_GROUP = {
    "chat_reply_extractor": "chat_reply_extractor copy", "prompt_reply_pipeline": "prompt_reply_pipeline copy",
    "pdf_to_md": "pdf_to_md", "knowledge_extraction_v2": "knowledge_extraction v2 mht_to_md", "mht_to_md_tool": "mht_to_md_tool",
    "discover": "discover copy",
}
HELP_ONLY = {"pdf_to_md", "knowledge_extraction_v2", "mht_to_md_tool"}

def classify(path):
    p = path.replace("\\", "/")
    low = p.lower()
    if "tool harness/" not in low:
        return ("external_project", "External project", "outside the Harness", "left in place", "not part of the Harness; recorded only")
    rel = low.split("tool harness/", 1)[1]
    for frag, g, cat, cap, disp, why in R:
        if frag.lower() in rel:
            return (g, cat, cap, disp, why)
    return ("harness_other", "Harness other", "unclassified", "left in place", "no rule; reviewed manually")

cols = ["path", "compiles", "lines", "first_docstring_line", "group", "capability_category", "specific_capability", "disposition",
        "toolkit_path", "confirmed_present", "verified_execution", "not_verified", "proposed", "unresolved", "third_party_imports",
        "path_markers", "in_original_inventory", "reason"]
rows, seen = [], set()
cnt = collections.Counter()

def vstat(group, path):
    if group == "x_pipeline":
        return "owner-accepted as tested (not re-run here)", ""
    k = VERIFIED_GROUP.get(group)
    if not k:
        return "", "yes"
    r = ver.get(k)
    if r and r["status"] == "PASS":
        what = "--help only" if group in HELP_ONLY else r["check"]
        return what, ""
    return "", "yes"

def add(path, base, inorig):
    group, cat, cap, disp, why = classify(path)
    key = norm(path)
    seen.add(key)
    c = copied.get(key)
    dest = c["destination"] if c else ""
    if group == "discover" and not dest:
        dest = os.path.join(T, "discover", os.path.basename(path))
    s = scan.get(key, {})
    v, nv = vstat(group, path)
    if dest and not os.path.exists(dest):
        disp = "copy missing"
    unresolved = "yes" if (group in ("harness_other", "browser_devtools_research", "archive_processing")) else ""
    r = {"path": path, "compiles": base.get("compiles", ""), "lines": base.get("lines", s.get("lines", "")),
         "first_docstring_line": base.get("first_docstring_line", ""), "group": group, "capability_category": cat,
         "specific_capability": cap, "disposition": disp, "toolkit_path": dest,
         "confirmed_present": "yes" if os.path.exists(path) else "no", "verified_execution": v, "not_verified": nv,
         "proposed": "", "unresolved": unresolved, "third_party_imports": s.get("third_party_imports", ""),
         "path_markers": s.get("path_markers", ""), "in_original_inventory": "yes" if inorig else "no", "reason": why}
    rows.append(r)
    cnt[(group, disp)] += 1

for b in orig:
    add(b["path"], b, True)
for key, s in scan.items():                      # scanned files the original inventory did not list
    if key not in seen:
        add(os.path.join(H, s["path"]), {"lines": s["lines"]}, False)
for key, c in copied.items():                    # migrated files not yet listed (e.g. new pipeline)
    if key not in seen and c["source"].lower().endswith(".py"):
        add(c["source"], {}, False)

# Toolkit-owned files created after the copy (not in the scan or the copy log). Each gets an explicit,
# hand-written capability line and a verification note that points at the check that actually covers it.
NEW_TOOLKIT_ROWS = {
    "tools\\prompt_reply_pipeline\\convert_for_pipeline.py": ("Document and chat processing",
        "Adapter: run the existing JSONL/MHT converters on conversation exports, then separate prompts and replies; writes discover_extra_sources.json",
        "covered by tests\\test_pipeline.py (ConverterAdapterTests) and tests\\test_discovery_link.py"),
    "tools\\prompt_reply_pipeline\\tests\\make_discovery_fixture.py": ("Testing and verification",
        "Writes fabricated inputs (session, notes) for the discovery tests",
        "used by tests\\test_discovery_link.py"),
    "tools\\prompt_reply_pipeline\\tests\\test_pipeline.py": ("Testing and verification",
        "Unit tests for prompt_reply_pipeline on synthetic fixtures (no network, no Harness data)",
        "run by _meta\\verify.py"),
    "tools\\prompt_reply_pipeline\\tests\\test_speaker_cases.py": ("Testing and verification",
        "Unit tests for converter-markdown splitting (embedded headings, count refusal)",
        "run by _meta\\verify.py"),
    "tools\\prompt_reply_pipeline\\tests\\test_discovery_link.py": ("Testing and verification",
        "Tests that pipeline output is found by discover.py (--extra-sources), prompts excluded, against an empty root",
        "run by _meta\\verify.py"),
    "_meta\\verify.py": ("Verification and records",
        "Re-checks the toolkit (parse, tests, hashes, quarantine, Harness snapshot) and appends a run to VERIFICATION.csv",
        "this file is the check; its runs are in VERIFICATION.csv"),
}
import ast as _ast
for rel, (cat, cap, ver) in sorted(NEW_TOOLKIT_ROWS.items()):
    full = os.path.join(T, rel)
    if not os.path.exists(full):
        continue
    src_txt = open(full, encoding="utf-8").read()
    rows.append({"path": full, "compiles": "", "lines": src_txt.count("\n") + 1, "first_docstring_line": "",
                 "group": "prompt_reply_pipeline" if rel.startswith("tools\\prompt_reply_pipeline") else "verification",
                 "capability_category": cat, "specific_capability": cap, "disposition": "new_in_toolkit",
                 "toolkit_path": full, "confirmed_present": "yes", "verified_execution": ver, "not_verified": "",
                 "proposed": "", "unresolved": "", "third_party_imports": "", "path_markers": "",
                 "in_original_inventory": "no", "reason": "created in the toolkit after the copy"})

# first docstring line for every toolkit-owned row that lacks one (read from the file's own docstring)
for r in rows:
    if r.get("toolkit_path") and not r.get("first_docstring_line") and os.path.exists(r["toolkit_path"]) and r["toolkit_path"].endswith(".py"):
        try:
            doc = _ast.get_docstring(_ast.parse(open(r["toolkit_path"], encoding="utf-8").read())) or ""
        except SyntaxError:
            doc = ""
        r["first_docstring_line"] = (doc.strip().split("\n")[0] if doc.strip() else "")[:160]

with open(os.path.join(T, "INVENTORY.csv"), "w", encoding="utf-8", newline="") as f:
    w = csv.DictWriter(f, fieldnames=cols, lineterminator="\n")
    w.writeheader(); w.writerows(rows)
print("original rows:", len(orig), "| inventory rows:", len(rows), "| added:", len(rows) - len(orig))
for k, v in sorted(cnt.items()):
    print(k, v)
