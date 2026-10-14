"""Records what discover.py returns for representative capability queries (default flags, Harness root).
Usage: python -I -X utf8 discovery_probe.py <label> [extra discover args...]  -> writes discovery_probe_<label>.json"""
import json, os, subprocess, sys
T = r"C:\Users\USER\Desktop\Python_Toolkit"
HARNESS1 = r"C:\Users\USER\Desktop\tool harness\1_PY"
label = sys.argv[1]
extra = sys.argv[2:]
QUERIES = [
    "convert chat transcript jsonl to markdown",
    "separate prompts from replies in chat exports",
    "pdf to markdown converter",
    "google ai mode mht conversation",
    "verify toolkit tests hashes",
    "repository inspection read only report",
]
res = {}
for q in QUERIES:
    cmd = [sys.executable, "-B", "-I", "-X", "utf8", os.path.join(T, "discover", "discover.py"), "--root", HARNESS1, "--json", "--top", "30"] + extra + q.split()
    r = subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace")
    d = json.loads(r.stdout)
    items = d.get("direct", []) + d.get("tentative", [])
    toolkit = [i for i in items if "Python_Toolkit" in json.dumps(i)]
    res[q] = {"direct": len(d.get("direct", [])), "tentative": len(d.get("tentative", [])),
              "toolkit_hits": len(toolkit),
              "top3": [(i.get("class"), i.get("name", "")[:60], (i.get("ref") or {}).get("file", "")[:70]) for i in items[:3]]}
out = os.path.join(T, "_meta", "discovery_probe_%s.json" % label)
json.dump(res, open(out, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
for q, v in res.items():
    print(f"{q}\n   direct={v['direct']} tentative={v['tentative']} toolkit_hits={v['toolkit_hits']}")
    for t in v["top3"]:
        print("     ", t)
