"""Append provenance rows to MIGRATION_LOG.csv for toolkit-side changes made after the original copies."""
import csv, datetime, hashlib, os

T = r"C:\Users\USER\Desktop\Python_Toolkit"
H1 = r"C:\Users\USER\Desktop\tool harness\1_PY"
now = datetime.datetime.now().isoformat(timespec="seconds")


def sha(p):
    return hashlib.sha256(open(p, "rb").read()).hexdigest()


rows = []
mods = [
    ("prompt_reply_pipeline", os.path.join(H1, "tools", "prompt_reply_pipeline", "pipeline.py"), os.path.join(T, "tools", "prompt_reply_pipeline", "pipeline.py"),
     "MODIFIED_AFTER_COPY", "toolkit copy: unknown-structure files go to documents/ (user decision); Harness copy is the earlier version"),
    ("discover", os.path.join(H1, "discover.py"), os.path.join(T, "discover", "discover.py"),
     "MODIFIED_AFTER_COPY", "toolkit copy: default root from discover_config.json; opt-in --extra-sources; absolute extra source dirs"),
    ("discover", os.path.join(H1, "test_discover.py"), os.path.join(T, "discover", "test_discover.py"),
     "MODIFIED_AFTER_COPY", "toolkit copy: SCRIPT_DIR vs Harness data root"),
]
for g, s, d, a, note in mods:
    rows.append([g, s, d, a + ": " + note, sha(s), sha(d), "differs (documented)", now])
T2 = os.path.join(T, "tools", "prompt_reply_pipeline", "tests")
for dp, dn, fn in os.walk(T2):
    dn[:] = [d for d in dn if d != "__pycache__"]
    for f in fn:
        p = os.path.join(dp, f)
        rows.append(["prompt_reply_pipeline_tests", "(created in toolkit; synthetic)", p, "NEW_IN_TOOLKIT", "", sha(p), "n/a", now])
for name in ("GEMINI_SCRIPT_CLASSIFICATION.csv", os.path.join("outputs", "README.md")):
    p = os.path.join(T, name)
    rows.append(["toolkit_records", "(created in toolkit)", p, "NEW_IN_TOOLKIT", "", sha(p), "n/a", now])
with open(os.path.join(T, "MIGRATION_LOG.csv"), "a", encoding="utf-8", newline="") as f:
    csv.writer(f, lineterminator="\n").writerows(rows)
print(len(rows), "rows appended")
