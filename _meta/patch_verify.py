"""Patch _meta/verify.py: default run is toolkit-local (no Harness data read except the read-only before/after snapshot);
--full re-runs the earlier checks that read Harness data. VERIFICATION.csv is appended to, never overwritten."""
import os, re

p = os.path.join(r"C:\Users\USER\Desktop\Python_Toolkit", "_meta", "verify.py")
s = open(p, encoding="utf-8").read()
if "RUN_ID" in s:
    raise SystemExit("already patched")

# header additions
s = s.replace("before = snapshot()\n", "before = snapshot()\nFULL = '--full' in sys.argv\nimport datetime as _dt\nRUN_ID = 'R' + _dt.datetime.now().strftime('%Y%m%d-%H%M%S') + ('-full' if FULL else '-local')\nFIXTURES = os.path.join(T, 'tools', 'prompt_reply_pipeline', 'tests', 'fixtures')\n", 1)

# section 3..5 only with --full (they read Harness data, read-only)
a = s.index("# 3. discover copy: tests")
b = s.index("# 6. prompt_reply_pipeline copy selftest")
block = s[a:b]
block = "if FULL:\n" + "".join("    " + l if l.strip() else l for l in block.splitlines(True))
s = s[:a] + block + s[b:]

# section 6: selftest on synthetic fixtures
s = s.replace('os.path.join(H, "markdown_files")])\nrec("prompt_reply_pipeline copy", "selftest"',
              'FIXTURES])\nrec("prompt_reply_pipeline copy", "selftest (synthetic fixtures)"', 1)

# section 7b: replace with fixture-based, temp-dir checks
a = s.index("# 7b.")
b = s.index("# 8. Harness unchanged")
new7b = '''# 7b. unit tests on synthetic fixtures (temp dirs only) and discover --extra-sources on fixture output
rc, o, e = run([PY, "-B", "-X", "utf8", os.path.join(T, "tools", "prompt_reply_pipeline", "tests", "test_pipeline.py")])
last = [l for l in (o + e).strip().splitlines() if l.startswith(("OK", "FAILED", "Ran "))]
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

'''
s = s[:a] + new7b + s[b:]

# output: append with run id; keep earlier rows
a = s.index('with open(os.path.join(T, "VERIFICATION.csv"), "w"')
b = s.index("sys.exit(1 if any")
newout = '''vp = os.path.join(T, "VERIFICATION.csv")
rows_old = []
if os.path.exists(vp):
    rows_old = list(csv.reader(open(vp, encoding="utf-8")))
    if rows_old and rows_old[0][:4] == ["item", "check", "status", "evidence"] and "run_id" not in rows_old[0]:
        rows_old = [rows_old[0] + ["run_id"]] + [r + ["R1-pre-cleanup"] for r in rows_old[1:]]   # earlier rows preserved
with open(vp, "w", encoding="utf-8", newline="") as f:
    w = csv.writer(f, lineterminator="\\n")
    if rows_old:
        w.writerows(rows_old)
    else:
        w.writerow(["item", "check", "status", "evidence", "run_id"])
    w.writerows([r + [RUN_ID] for r in results])
'''
s = s[:a] + newout + s[b:]
open(p, "w", encoding="utf-8", newline="").write(s)
print("patched")
