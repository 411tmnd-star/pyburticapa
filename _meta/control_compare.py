"""Control check: default discover queries must return the same results before and after the toolkit class was added.
Old copy = the discover.py saved before the change; new copy = the current toolkit discover.py. Both read the same Harness root."""
import json, os, subprocess, sys
T = r"C:\Users\USER\Desktop\Python_Toolkit"
OLD = os.environ.get("OLD_DISCOVER", r"C:\Users\USER\AppData\Local\Temp\discover_before_toolkit.py")
NEW = os.path.join(T, "discover", "discover.py")
ROOT = r"C:\Users\USER\Desktop\tool harness\1_PY"
QUERIES = ["convert chat transcript jsonl to markdown", "separate prompts from replies in chat exports", "pdf to markdown converter",
           "google ai mode mht conversation", "verify toolkit tests hashes", "repository inspection read only report",
           "email outreach sequence", "notion database workspace"]
def run(script, q):
    r = subprocess.run([sys.executable, "-B", "-I", "-X", "utf8", script, "--root", ROOT, "--json", "--top", "30"] + q.split(),
                       capture_output=True, text=True, encoding="utf-8", errors="replace")
    d = json.loads(r.stdout)
    d.pop("searched", None)  # counts of loaded records; compared separately
    return d
same = 0
for q in QUERIES:
    a, b = run(OLD, q), run(NEW, q)
    ok = a == b
    same += ok
    print(("SAME " if ok else "DIFF ") + q + ("" if ok else "  old=%d new=%d direct" % (len(a["direct"]), len(b["direct"]))))
print("identical:", same, "of", len(QUERIES))
