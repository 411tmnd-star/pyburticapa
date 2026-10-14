import os
p = os.path.join(r"C:\Users\USER\Desktop\Python_Toolkit", "_meta", "verify.py")
s = open(p, encoding="utf-8").read()
if "9. scope checks" in s:
    raise SystemExit("already patched")
block = '''# 9. scope checks (toolkit-local; the Harness source files are only hashed, read-only)
import hashlib as _h
Q = r"C:\\Users\\USER\\Desktop\\Python_Toolkit_QUARANTINE"
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
            if pth.endswith(os.path.join("_meta", "verify.py")) or pth.endswith(os.path.join("_meta", "quarantine.py")):
                continue
            if "research_pipeline" in open(pth, encoding="utf-8", errors="ignore").read() and f_ not in ("SCOPE_REVIEW.md", "WORKFLOWS.md", "README.md", "REMAINING_DEPENDENCIES.md"):
                stale.append(os.path.relpath(pth, T))
rec("toolkit scope", "no active script/config still points at research_pipeline", "PASS" if not stale else "FAIL", f"references in: {stale or 'none'}")
pyc = [os.path.join(dp, d) for dp, dn, fn in os.walk(T) for d in dn if d == "__pycache__"]
rec("toolkit scope", "no generated __pycache__ folders", "PASS" if not pyc else "INFO", f"{len(pyc)} found" if pyc else "none")

'''
marker = "# 8. Harness unchanged"
assert s.count(marker) == 1
s = s.replace(marker, block + marker)
open(p, "w", encoding="utf-8", newline="").write(s)
print("patched")
