"""Repeatable checks for discover.py. Run: python -I -X utf8 test_discover.py
Real-data cases use the live registry; failure-handling cases use synthetic folders created in the system temp dir and removed afterwards.
Nothing discovered is executed."""
import json
import os
import shutil
import subprocess
import sys
import tempfile

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))   # TOOLKIT COPY: where discover.py lives
HERE = json.load(open(os.path.join(SCRIPT_DIR, "discover_config.json"), encoding="utf-8"))["root"]   # Harness data root
FAIL = []


def run(q, root=HERE, extra=()):
    r = subprocess.run([sys.executable, "-I", "-X", "utf8", os.path.join(SCRIPT_DIR, "discover.py"), "--root", root, *extra, *q.split()],
                       capture_output=True, text=True, encoding="utf-8")
    return r.returncode, r.stdout, r.stderr


def check(name, ok, detail=""):
    print(("PASS " if ok else "FAIL ") + name + ("" if ok else " -> " + str(detail)[:200]))
    if not ok:
        FAIL.append(name)


def section(out, head):
    a = out.find(head)
    return out[a:out.find("\n\n", a)] if a >= 0 else ""


# 1 known resource
rc, o, e = run("Playwright browser automation")
d = section(o, "DIRECT MATCHES")
check("T1 known resource: TOOL-PLAYWRIGHT and playwright are direct matches with sources", rc == 0 and "TOOL-PLAYWRIGHT" in d and "[tool] playwright" in d and "registry/tools.part1.json :: entries[id=TOOL-PLAYWRIGHT]" in d, o[:400])
check("T1 alias is labelled unverified and not merged", "UNVERIFIED alias candidate: TOOL-PLAYWRIGHT (no merge)" in o)
check("T1 operational status is never claimed", "not verified here" in o and "works" not in d.lower())
# 2 broad
rc, o, e = run("Find existing resources in my harness that could help me extract information from a collection of research documents.")
d = section(o, "DIRECT MATCHES")
check("T2 broad: several direct matches of more than one record class", d.count("\n  [") >= 4 and "[documented-workflow] D-013" in o and "[tool]" in d)
check("T2 broad: PDF text extraction capability record is surfaced and labelled as a proposed capability", "PYC-PY-EXEC-EC-18" in o and "not a built or qualified tool" in o)
check("T2 broad: combination is labelled record-level only", "no evidence these work together" in o)
# 3 absent
rc, o, e = run("real-time speech translation for video calls using quantum annealing")
check("T3 absent: zero direct matches and an explicit gap, nothing fabricated", "DIRECT MATCHES (0" in o and "GAP: no direct match" in o)
# 4 blocked
rc, o, e = run("export ChatGPT conversations to markdown")
check("T4 blocked script is shown as BLOCKED with a do-not-execute warning", "SCRIPT-CHAT-TO-MD" in o and "BLOCKED: do not execute" in o)
# 5 job-sourcing status shown as recorded
rc, o, e = run("finalscout lead enrichment")
check("T5 job-sourcing record shows its own status (inactive), not the flattened DISCOVERED", "finalscout" in o and "status as recorded: inactive" in o, o[:300])
# 5b --class filter
rc, o, e = run("extract text from documents", HERE, ("--class", "python"))
check("C1 --class python returns only python-capability records", "class filter: python-capability" in o and "[python-capability] PYC-PY-EXEC-EC-18" in o and "[tool]" not in o and "[skill]" not in o)
rc, o, e = run("extract text from documents", HERE, ("--class", "tool,skill"))
check("C2 --class tool,skill accepts a comma list and excludes other classes", "[tool]" in o and "[python-capability]" not in o and "[documented-workflow]" not in o)
r = subprocess.run([sys.executable, "-I", "-X", "utf8", os.path.join(SCRIPT_DIR, "discover.py"), "--class", "database", "x"], capture_output=True, text=True, encoding="utf-8")
check("C3 unknown --class value is rejected with the valid list", r.returncode != 0 and "valid: tool, skill, python, repo, workflow" in r.stderr, r.stderr)
# 6 failure handling
d0 = tempfile.mkdtemp(prefix="discover_synth_")
try:
    a = os.path.join(d0, "empty"); os.makedirs(a)
    rc, o, e = run("extract research documents", a)
    check("F1 empty root: no crash, warnings listed, explicit gap", rc == 0 and "Traceback" not in e and o.count("WARNING") >= 5 and "GAP" in o)
    b = os.path.join(d0, "bad"); os.makedirs(os.path.join(b, "registry", "view")); os.makedirs(os.path.join(b, "assets", "PY_LISTiNG"))
    open(os.path.join(b, "registry", "view", "tools.view.json"), "w").write("{ not json")
    open(os.path.join(b, "registry", "view", "skills.view.json"), "w").write(json.dumps({"entries": [{"id": "S1", "name": "Doc extractor", "purpose": "extract text from documents"}, "junk", {"noid": 1}, None]}))
    open(os.path.join(b, "assets", "PY_LISTiNG", "capability_decisions.csv"), "w", encoding="utf-8").write(
        'registry_id,project_name,repo,capability_statement,status\n1,Good,https://github.com/x/y,extract text from documents,FINAL_ACCEPT\n,NoId,,extract documents,\n"unterminated,quote\n')
    rc, o, e = run("extract text from documents", b)
    check("F2 malformed JSON/records/CSV: no crash, bad items skipped and reported, good items found", rc == 0 and "Traceback" not in e and "unreadable source" in o and "malformed" in o and "[skill] S1" in o and "decisions:1" in o, o[:500])
    rc, o, e = run("the of and", a)
    check("F3 question with no searchable terms is handled", rc == 0 and "no searchable terms" in o)
finally:
    shutil.rmtree(d0, ignore_errors=True)
# 7 research notes (--class note): synthetic workspaces for edge cases, the live corpus for the real question
import fnmatch
import hashlib
import re
import time
sys.dont_write_bytecode = True        # importing the module under test must not leave a __pycache__ in the harness
sys.path.insert(0, SCRIPT_DIR)
import discover  # noqa: E402  (repo module under test; NOTE_SOURCES is the list of approved folders)

WS_REAL = os.path.dirname(HERE)


def jrun(q, root=HERE, notes_root=None, top=200, cls="note"):
    cmd = [sys.executable, "-I", "-X", "utf8", os.path.join(SCRIPT_DIR, "discover.py"), "--root", root, "--class", cls, "--json", "--top", str(top)]
    if notes_root:
        cmd += ["--notes-root", notes_root]
    r = subprocess.run(cmd + q.split(), capture_output=True, text=True, encoding="utf-8")
    ok = r.returncode == 0 and r.stdout.lstrip().startswith("{")
    return (json.loads(r.stdout) if ok else None), r.stderr


def tree_state(base):
    """(relative path, size, mtime_ns, sha256) of every file in the approved note folders - proves nothing was written."""
    out = []
    for rel, pat in discover.NOTE_SOURCES:
        d = os.path.join(base, *rel.split("/"))
        if os.path.isdir(d):
            for fn in sorted(os.listdir(d)):
                p = os.path.join(d, fn)
                if fnmatch.fnmatch(fn, pat) and os.path.isfile(p):
                    st = os.stat(p)
                    out.append((rel + "/" + fn, st.st_size, st.st_mtime_ns, hashlib.sha256(open(p, "rb").read()).hexdigest()))
    return out


def file_lines(base, rel):
    return open(os.path.join(base, *rel.split("/")), "rb").read().decode("utf-8", "replace").lstrip("﻿").split("\n")


def hits(js):
    return (js or {}).get("direct", []) + (js or {}).get("tentative", [])


def snippet_matches_line(base, h):
    s = h["snippet"]
    lines = file_lines(base, h["ref"]["file"])
    m = re.match(r"lines (\d+)-(\d+)", h["ref"]["locator"])
    a, b = int(m.group(1)), int(m.group(2))
    if not (a <= s["line"] <= b) or s["line"] > len(lines):
        return False
    want = " ".join(s["text"].strip("…").split()).lower()
    return want in " ".join(lines[s["line"] - 1].split()).lower()


ws = tempfile.mkdtemp(prefix="discover_notes_")
try:
    def put(rel, data):
        p = os.path.join(ws, *rel.split("/"))
        os.makedirs(os.path.dirname(p), exist_ok=True)
        with open(p, "wb") as f:
            f.write(data)
    note_a = (b"---\r\ntitle: Zebra Study\r\nsource_path: x\r\n---\r\n"            # lines 1-4 front matter
              b"# Zebra Study\r\n\r\nIntro paragraph about stripes.\r\n\r\n"          # 5-8
              b"## Method\r\n```\r\n# not a heading quokkaterm\r\n```\r\n"             # 9-12
              b"The zebracorn procedure repeats nightly.\r\n")                         # 13
    put("3_NOTES/a.md", note_a)
    put("4_MCP_AND_API_USAGE/copy_of_a.md", note_a)                                   # byte-identical duplicate
    put("3_NOTES/many.md", "".join("## Part %d\n\nThe wombatword appears in part %d.\n\n" % (i, i) for i in range(5)).encode())
    put("3_NOTES/bad.md", b"# Bad\n\nThe \xff\xfe okapiterm sentence is here.\n")      # not valid UTF-8
    os.makedirs(os.path.join(ws, "3_NOTES", "folder.md"))                              # a directory named like a note
    put("links.md/output_notes/n1.md", b"# Post\n\nA gnuterm post.\n")
    before = tree_state(ws)
    root0 = os.path.join(ws, "empty_root")
    os.makedirs(root0)
    js, err = jrun("zebracorn", root0, ws)
    h = [x for x in hits(js) if "zebracorn" in " ".join(x["matched_func"])]
    check("N1 note search finds the passage and reports a file:line locator", js is not None and len(h) == 1 and h[0]["ref"]["file"] == "3_NOTES/a.md", (js or err))
    check("N1 locator and snippet line are exact for a CRLF file with front matter (zebracorn is on line 13)",
          bool(h) and h[0]["snippet"]["line"] == 13 and file_lines(ws, "3_NOTES/a.md")[12].rstrip("\r").startswith("The zebracorn") and snippet_matches_line(ws, h[0]), h)
    js, err = jrun("quokkaterm", root0, ws)
    h = hits(js)
    check("N2 a '#' line inside a code fence is not a heading", len(h) == 1 and "not a heading" not in h[0]["name"] and h[0]["name"].endswith("Method") and h[0]["snippet"]["line"] == 11, h)
    js, err = jrun("zebracorn", root0, ws)
    check("N3 byte-identical duplicate file is skipped and counted; no hit comes from the copy",
          js["searched"].get("note-duplicate-files-skipped") == 1 and hits(js) and not any("copy_of_a" in h["ref"]["file"] for h in hits(js)), js["searched"])
    js, err = jrun("zebracorn", root0, ws)
    check("N3 a title word that is a prefix of the query word ('zebra' vs 'zebracorn') yields only name-level TENTATIVE hits besides the real one",
          len(js["direct"]) == 1 and len(js["tentative"]) >= 1 and all(not h["matched_func"] for h in js["tentative"]), [h["ref"] for h in hits(js)])
    put("3_NOTES/long.md", b"# Long\n\nshort intro line\n\n" + b"filler " * 560 + b"axolotlterm ends the very long line\n")      # one line of ~3,900 chars
    before = tree_state(ws)
    js, err = jrun("axolotlterm", root0, ws)
    h = [x for x in hits(js) if x["ref"]["file"] == "3_NOTES/long.md" and "axolotlterm" in " ".join(x["matched_func"])]
    check("N11 a very long line is cut into pieces whose locators carry the character range and still point at the right line",
          len(h) == 1 and re.search(r"lines 5-5 chars \d+-\d+$", h[0]["ref"]["locator"]) and snippet_matches_line(ws, h[0]), [x["ref"] for x in hits(js)])
    js, err = jrun("wombatword", root0, ws)
    h = hits(js)
    check("N4 at most 2 passages per file are listed and the rest are counted", len(h) == 2 and h[0]["more_in_file"] == 3, [(x["ref"]["locator"], x["more_in_file"]) for x in h])
    js, err = jrun("okapiterm", root0, ws)
    check("N5 invalid UTF-8 is reported, not fatal, and the readable text is still searchable",
          any("not valid UTF-8" in w for w in js["warnings"]) and len(hits(js)) == 1, js["warnings"])
    js, err = jrun("gnuterm", root0, ws)
    check("N6 links.md/output_notes is searched", len(hits(js)) == 1 and hits(js)[0]["ref"]["file"] == "links.md/output_notes/n1.md", hits(js))
    only = tempfile.mkdtemp(prefix="discover_notes_only_")
    try:
        os.makedirs(os.path.join(only, "3_NOTES"))
        put_p = os.path.join(only, "3_NOTES", "z.md")
        open(put_p, "wb").write(b"# Z\n\nThe lynxterm text.\n")
        js, err = jrun("lynxterm", root0, only)
        miss = [w for w in js["warnings"] if w.startswith("missing note source")]
        check("N7 absent note folders are reported as warnings and the rest still works", len(miss) == len(discover.NOTE_SOURCES) - 1 and len(hits(js)) == 1, js["warnings"])
    finally:
        shutil.rmtree(only, ignore_errors=True)
    rc, o, e = run("zebracorn", root0, ("--class", "tool", "--notes-root", ws))
    check("N8 notes are not read unless the note class is requested", rc == 0 and "notes=" not in o and "[note]" not in o and "note-files" not in o, o[:300])
    rc, o, e = run("zebracorn", root0, ("--class", "note", "--notes-root", ws))
    check("N9 text output marks hits as [note] with source, snippet line and a not-a-record status",
          "[note] Zebra Study" in o and "source: 3_NOTES/a.md :: lines" in o and "snippet (line 13)" in o and "not a registry record" in o, o[:500])
    check("N10 the note search wrote nothing: sizes, mtimes and hashes of the synthetic sources are unchanged", before == tree_state(ws))
finally:
    shutil.rmtree(ws, ignore_errors=True)

# live corpus: the research question investigated earlier, plus a generic-word query
Q = "how can my agent learn from its past runs and improve itself"
real_before = tree_state(WS_REAL)
t0 = time.time()
js, err = jrun(Q)
secs = time.time() - t0
files = {h["ref"]["file"].split("/")[-1] for h in hits(js)}
check("R1 original question finds the APEX note", js is not None and any(f.startswith("APEX_") for f in files), err[:200])
check("R1 original question finds the Hermes docs and feature notes",
      any(f.startswith("hermes-agent_website_docs_index") for f in files) and "Features Overview _ Hermes Agent.md" in files, sorted(files)[:12])
all_hits = [h for h in hits(js) if h["class"] == "note"]
bad = [h["id"] for h in all_hits if not snippet_matches_line(WS_REAL, h)]
check("R2 every returned note hit (%d) has a locator whose snippet is found on the stated original line" % len(all_hits), len(all_hits) > 50 and not bad, bad[:3])
apex = [h for h in all_hits if h["ref"]["file"].split("/")[-1].startswith("APEX_")]
check("R2 APEX locators point at lines that contain the quoted text", bool(apex) and all(snippet_matches_line(WS_REAL, h) for h in apex), [h["ref"] for h in apex])
direct_hits = js["direct"]
check("R3 DIRECT note hits always match at least 2 query terms; single-word matches stay TENTATIVE", all(len(h["matched_func"]) >= 2 for h in direct_hits) and
      any(len(h["matched_func"]) + len(h["matched_other"]) == 1 for h in js["tentative"]), None)
rank = {f: min((i for i, h in enumerate(direct_hits) if h["ref"]["file"].split("/")[-1].startswith(f)), default=None) for f in ("hermes-agent_website_docs_index", "2095180126359105955")}
check("R3 the Hermes docs passage outranks the robotics article that matches 'learn ... running' by accident",
      rank["hermes-agent_website_docs_index"] is not None and (rank["2095180126359105955"] is None or rank["hermes-agent_website_docs_index"] < rank["2095180126359105955"]), rank)
js2, err = jrun("learn from past runs", top=30)
check("R4 generic-word query: every hit names the terms it matched and carries a verifiable snippet; nothing is called a capability",
      js2 is not None and all(h["matched_func"] or h["matched_other"] for h in hits(js2)) and all(snippet_matches_line(WS_REAL, h) for h in hits(js2)) and
      all("not a registry record" in h["status"] for h in hits(js2)), None)
check("R5 notes dedupe: no two listed hits are the same file and lines", len({(h["ref"]["file"], h["ref"]["locator"]) for h in all_hits}) == len(all_hits))
check("R6 searching the live corpus did not modify any source file (size, mtime, sha256)", real_before == tree_state(WS_REAL))
print("INFO note-class run on the live corpus: %.1f s, %s" % (secs, {k: v for k, v in js["searched"].items() if k.startswith("note")}))
check("R7 note-class run finishes in under 60 s on the live corpus (sanity bound, not a benchmark)", secs < 60, secs)

print("\n%s" % ("ALL PASSED" if not FAIL else "FAILED: " + ", ".join(FAIL)))
sys.exit(1 if FAIL else 0)
