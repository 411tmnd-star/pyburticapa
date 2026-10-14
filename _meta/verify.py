"""Verification of the Toolkit copies. Writes ../VERIFICATION.csv. Nothing is installed.
The Harness is only read; a before/after stat snapshot proves it was not changed."""
import ast, csv, filecmp, importlib.util, os, subprocess, sys, tempfile

H = r"C:\Users\USER\Desktop\tool harness"
T = r"C:\Users\USER\Desktop\Python_Toolkit"
PY = sys.executable
results = []


def rec(item, check, status, evidence):
    results.append([item, check, status, evidence])
    print(f"{status:14} {item} :: {check} :: {evidence[:110]}")


def snapshot():
    snap = {}
    roots = [os.path.join(H, "1_PY"), os.path.join(H, "3_NOTES"), os.path.join(H, "4_MCP_AND_API_USAGE"),
             os.path.join(H, "markdown_files"), os.path.join(H, "markdown_files_cleaned")]
    for r in roots:
        for dp, dn, fn in os.walk(r):
            dn[:] = [d for d in dn if d != "__pycache__"]
            for f in fn:
                p = os.path.join(dp, f)
                try:
                    st = os.stat(p)
                    snap[p] = (st.st_size, st.st_mtime_ns)
                except OSError:
                    pass
    return snap


def run(cmd, cwd=None, timeout=300):
    r = subprocess.run(cmd, cwd=cwd, capture_output=True, text=True, encoding="utf-8", errors="replace", timeout=timeout)
    return r.returncode, r.stdout, r.stderr


before = snapshot()
FULL = '--full' in sys.argv
import datetime as _dt
RUN_ID = 'R' + _dt.datetime.now().strftime('%Y%m%d-%H%M%S') + ('-full' if FULL else '-local')
FIXTURES = os.path.join(T, 'tools', 'prompt_reply_pipeline', 'tests', 'fixtures')

# 1. every copied .py parses
bad = []
n = 0
for dp, dn, fn in os.walk(T):
    dn[:] = [d for d in dn if d not in ("__pycache__", "_meta")]
    for f in fn:
        if f.endswith(".py"):
            n += 1
            try:
                ast.parse(open(os.path.join(dp, f), encoding="utf-8").read())
            except SyntaxError as e:
                bad.append(f"{os.path.relpath(os.path.join(dp, f), T)}: {e.msg} line {e.lineno}")
rec("all copied .py", "ast.parse", "PASS" if not bad else "FAIL", f"{n} files parsed; problems: {bad or 'none'}")

# 2. third-party availability (no installs)
deps = {"pymupdf": "fitz", "bs4": "bs4", "markdownify": "markdownify", "requests": "requests", "faster_whisper": "faster_whisper",
        "av": "av", "websockets": "websockets", "ijson": "ijson"}
avail = {k: importlib.util.find_spec(v) is not None for k, v in deps.items()}
rec("third-party deps", "find_spec (no install)", "INFO", ", ".join(f"{k}={'yes' if v else 'NO'}" for k, v in avail.items()))

if FULL:
    # 3. discover copy: tests
    d = os.path.join(T, "discover")
    rc, o, e = run([PY, "-I", "-X", "utf8", "test_discover.py"], cwd=d)
    rec("discover copy", "test_discover.py (against Harness root)", "PASS" if rc == 0 and "ALL PASSED" in o else "FAIL", (o.strip().splitlines() or [e[-200:]])[-1])
    rc, o, e = run([PY, "-B", "-X", "utf8", "test_ollama_synthesis.py"], cwd=d)
    tail = (e.strip().splitlines() or o.strip().splitlines() or [""])[-1]
    rec("discover copy", "test_ollama_synthesis.py (mocked urlopen)", "PASS" if rc == 0 else "FAIL", tail)

    # 4. discover: behaviour identical to original on same queries
    for q, extra in (("extract text from documents", []), ("convert pdf to markdown", ["--class", "python"]), ("x twitter links", ["--top", "5"])):
        orig = run([PY, "-I", "-X", "utf8", os.path.join(H, "1_PY", "discover.py"), *extra, *q.split()], cwd=os.path.join(H, "1_PY"))
        new = run([PY, "-I", "-X", "utf8", os.path.join(d, "discover.py"), *extra, *q.split()], cwd=d)
        same = orig[0] == new[0] and orig[1] == new[1]
        rec("discover copy", f"output identical to original: '{q} {' '.join(extra)}'", "PASS" if same else "FAIL",
            f"rc {orig[0]}/{new[0]}; {len(orig[1])} vs {len(new[1])} chars")

    # 5. chat_reply_extractor copy reproduces the existing cleaned files byte for byte
    with tempfile.TemporaryDirectory() as out:
        rc, o, e = run([PY, "-I", "-X", "utf8", os.path.join(T, "tools", "chat_reply_extractor", "chat_reply_extractor.py"),
                        os.path.join(H, "markdown_files"), "--out", out])
        cmp_bad, cmp_n = [], 0
        for dp, dn, fn in os.walk(out):
            for f in fn:
                p = os.path.join(dp, f)
                rel = os.path.relpath(p, out)
                ref = os.path.join(H, "markdown_files_cleaned", rel)
                cmp_n += 1
                if not os.path.exists(ref):
                    cmp_bad.append(rel + " (no reference)")
                elif not filecmp.cmp(p, ref, shallow=False):
                    cmp_bad.append(rel)
        noref = [x for x in cmp_bad if x.endswith("(no reference)")]
        real_bad = [x for x in cmp_bad if not x.endswith("(no reference)")]
        rec("chat_reply_extractor copy", "output vs existing markdown_files_cleaned (byte compare)",
            "PASS" if rc == 0 and cmp_n and not real_bad else "FAIL",
            f"rc={rc}; {cmp_n - len(noref)} files byte-identical to existing outputs; differences: {real_bad or 'none'}; "
            f"{len(noref)} generated audit files have no existing reference to compare (informational)")

# 6. prompt_reply_pipeline copy selftest
rc, o, e = run([PY, "-I", "-X", "utf8", os.path.join(T, "tools", "prompt_reply_pipeline", "pipeline.py"), "selftest",
                FIXTURES])
rec("prompt_reply_pipeline copy", "selftest (synthetic fixtures)", "PASS" if rc == 0 and "ALL PASS" in o else "FAIL", o.strip().splitlines()[-1] if o.strip() else e[-200:])

# 7. --help only (argparse), where deps exist; network / browser tools are NOT executed
helps = [
    ("pdf_to_md", r"tools\pdf_to_md\pdf_to_md.py", ["pymupdf"]),
    ("knowledge_extraction v2 jsonl_to_md", r"tools\knowledge_extraction\v2\jsonl_to_md.py", []),
    ("knowledge_extraction v2 mht_to_md", r"tools\knowledge_extraction\v2\mht_to_md.py", ["bs4", "markdownify"]),
    ("mht_to_md_tool", r"tools\mht_to_md_tool\mht_to_md.py", []),
]
for name, rel, need in helps:
    missing = [m for m in need if not avail.get(m)]
    if missing:
        rec(name, "--help", "NOT VERIFIED", f"missing dependency (not installed by design): {missing}")
        continue
    rc, o, e = run([PY, "-I", "-X", "utf8", os.path.join(T, rel), "--help"], timeout=60)
    rec(name, "--help", "PASS" if rc == 0 and "usage" in (o + e).lower() else "FAIL", ((o + e).strip().splitlines() or [""])[0])
for name in ("x_pipeline (network)", "gemini_md2 (browser)", "repo_inspect (network)"):
    rec(name, "execution", "NOT VERIFIED", "deliberately not executed (network / browser); compiled only")

# 7b. unit tests on synthetic fixtures (temp dirs only) and discover --extra-sources on fixture output
rc, o, e = run([PY, "-B", "-X", "utf8", os.path.join(T, "tools", "prompt_reply_pipeline", "tests", "test_pipeline.py")])
last = [l for l in (o + e).strip().splitlines() if l.startswith(("OK", "FAILED", "Ran "))]
rc3, o3, e3 = run([PY, "-B", "-X", "utf8", os.path.join(T, "tools", "prompt_reply_pipeline", "tests", "test_speaker_cases.py")])
last3 = [l for l in (o3 + e3).strip().splitlines() if l.startswith(("OK", "FAILED", "Ran "))]
rec("prompt_reply_pipeline copy", "speaker-markdown cases (test_speaker_cases.py)", "PASS" if rc3 == 0 else "FAIL", "; ".join(last3) or e3[-200:])
rc4, o4, e4 = run([PY, "-B", "-X", "utf8", os.path.join(T, "tools", "prompt_reply_pipeline", "tests", "test_discovery_link.py")])
last4 = [l for l in (o4 + e4).strip().splitlines() if l.startswith(("OK", "FAILED", "Ran "))]
rec("pipeline -> discover", "synthetic pipeline output discoverable via --extra-sources; prompts excluded; empty root (no Harness read)", "PASS" if rc4 == 0 else "FAIL", "; ".join(last4) or e4[-200:])
rc5, o5, e5 = run([PY, "-B", "-X", "utf8", os.path.join(T, "discover", "test_toolkit_discovery.py")])
last5 = [l for l in (o5 + e5).strip().splitlines() if l.startswith(("OK", "FAILED", "Ran "))]
rec("discover copy", "--class toolkit finds toolkit tools with status from INVENTORY.csv (empty root; Harness not read)", "PASS" if rc5 == 0 else "FAIL", "; ".join(last5) or e5[-200:])
rec("prompt_reply_pipeline copy", "unit tests, synthetic fixtures (test_pipeline.py)", "PASS" if rc == 0 else "FAIL", "; ".join(last) or (e[-200:]))
if FULL:
    import json as _json
    with tempfile.TemporaryDirectory() as wk:
        rc, o, e = run([PY, "-I", "-X", "utf8", os.path.join(T, "tools", "prompt_reply_pipeline", "pipeline.py"), "all", FIXTURES, wk])
        cfg = os.path.join(wk, "extra.json")
        with open(cfg, "w", encoding="utf-8") as f_:
            _json.dump([[(wk + "/documents").replace(chr(92), "/"), "*.md"]], f_)
        d = os.path.join(T, "discover")
        rc2, o2, e2 = run([PY, "-I", "-X", "utf8", os.path.join(d, "discover.py"), "--class", "note", "--extra-sources", cfg, "--top", "3", "fabricated", "checklist"], cwd=d)
        rec("discover copy", "--extra-sources reads a pipeline documents/ folder (synthetic, temp)", "PASS" if rc == 0 and rc2 == 0 and "notes_plain.md" in o2 else "FAIL", f"rc={rc}/{rc2}; fixture document found: {'notes_plain.md' in o2}")

# 9. scope checks (toolkit-local; the Harness source files are only hashed, read-only)
import hashlib as _h
Q = r"C:\Users\USER\Desktop\Python_Toolkit_QUARANTINE"
log = list(csv.DictReader(open(os.path.join(T, "MIGRATION_LOG.csv"), encoding="utf-8")))
def _sha(pth):
    return _h.sha256(open(pth, "rb").read()).hexdigest()
copied = [r for r in log if r["action"] == "COPIED" and r["destination"].endswith(".py")]
missing = [r["destination"] for r in copied if not os.path.exists(r["destination"])]
rec("required scripts", "every .py recorded as COPIED in MIGRATION_LOG still exists", "PASS" if not missing else "FAIL", f"{len(copied)} recorded; missing: {missing[:3] or 'none'}")
xs = [r for r in log if r["group"] == "x_pipeline" and r["action"] == "COPIED"]
xbad = [r["destination"] for r in xs if not (os.path.exists(r["destination"]) and _sha(r["destination"]) == r["sha256_dest"] == r["sha256_source"] and _sha(r["source"]) == r["sha256_source"])]
rec("x_pipeline", "toolkit copy and Harness source both still match the logged SHA-256 (files hashed only; pipeline not run)", "PASS" if xs and not xbad else "FAIL", f"{len(xs)} files; mismatches: {xbad or 'none'}")
qm = list(csv.DictReader(open(os.path.join(Q, "MANIFEST.csv"), encoding="utf-8")))
qbad = [r["quarantine_path"] for r in qm if r["action"] == "MOVED_TO_QUARANTINE" and (not os.path.exists(r["quarantine_path"]) or _sha(r["quarantine_path"]) != r["sha256_before"] or os.path.exists(r["original_path"]))]
rec("quarantine", "every moved file present in quarantine with its original SHA-256 and absent from the toolkit", "PASS" if qm and not qbad else "FAIL", f"{len(qm)} files; problems: {qbad[:3] or 'none'}")
hist = [p_ for p_ in (os.path.join(T, "workspace"), os.path.join(T, "tools", "gemini_md2", "output"), os.path.join(T, "tools", "gemini_md2", "logs")) if os.path.exists(p_)]
rec("toolkit scope", "no workspace/ research output and no gemini output/ or logs/ folders remain", "PASS" if not hist else "FAIL", f"remaining: {hist or 'none'}")
stale = []
for dp, dn, fn in os.walk(T):
    dn[:] = [d for d in dn if d not in ("__pycache__", "history")]
    for f_ in fn:
        if f_.endswith((".py", ".json", ".md")) and f_ not in ("MIGRATION_LOG.csv",):
            pth = os.path.join(dp, f_)
            if pth.endswith(os.path.join("_meta", "verify.py")) or pth.endswith(os.path.join("_meta", "quarantine.py")) or os.path.basename(pth).startswith("patch_"):
                continue
            if "research_pipeline" in open(pth, encoding="utf-8", errors="ignore").read() and f_ not in ("SCOPE_REVIEW.md", "WORKFLOWS.md", "README.md", "REMAINING_DEPENDENCIES.md"):
                stale.append(os.path.relpath(pth, T))
rec("toolkit scope", "no active script/config still points at research_pipeline", "PASS" if not stale else "FAIL", f"references in: {stale or 'none'}")
pyc = [os.path.join(dp, d) for dp, dn, fn in os.walk(T) for d in dn if d == "__pycache__"]
rec("toolkit scope", "no generated __pycache__ folders", "PASS" if not pyc else "INFO", f"{len(pyc)} found" if pyc else "none")

# 8. Harness unchanged
after = snapshot()
changed = [p for p in after if p in before and before[p] != after[p]]
added = [p for p in after if p not in before]
removed = [p for p in before if p not in after]
rec("Harness", "stat snapshot before/after (1_PY, notes, markdown folders)",
    "PASS" if not (changed or added or removed) else "FAIL", f"changed={len(changed)} added={len(added)} removed={len(removed)} {(changed + added + removed)[:3]}")

vp = os.path.join(T, "VERIFICATION.csv")
rows_old = []
if os.path.exists(vp):
    rows_old = list(csv.reader(open(vp, encoding="utf-8")))
    if rows_old and rows_old[0][:4] == ["item", "check", "status", "evidence"] and "run_id" not in rows_old[0]:
        rows_old = [rows_old[0] + ["run_id"]] + [r + ["R1-pre-cleanup"] for r in rows_old[1:]]   # earlier rows preserved
with open(vp, "w", encoding="utf-8", newline="") as f:
    w = csv.writer(f, lineterminator="\n")
    if rows_old:
        w.writerows(rows_old)
    else:
        w.writerow(["item", "check", "status", "evidence", "run_id"])
    w.writerows([r + [RUN_ID] for r in results])
sys.exit(1 if any(r[2] == "FAIL" for r in results) else 0)
