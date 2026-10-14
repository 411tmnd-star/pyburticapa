"""Read-only scan of the Harness code: imports, hard-coded paths, requirements, tests, callers.
Writes scan_results.csv and scan_groups.json next to this file. Never writes into the Harness."""
import ast, csv, json, os, re, sys, hashlib
H = r"C:\Users\USER\Desktop\tool harness"
SKIP_DIRS = {"output", "archives", "venv", ".venv", "site-packages", "__pycache__", "node_modules", ".git", "chunks", "clean"}
STD = set(sys.stdlib_module_names)
PATHLIT = re.compile(r"(C:\\?Users|tool harness|1_PY|Desktop|MASTER_HARNESS|links\.md)", re.I)

def walk(root):
    for dp, dn, fn in os.walk(root):
        dn[:] = [d for d in dn if d not in SKIP_DIRS]
        for f in fn:
            yield os.path.join(dp, f)

pyfiles = [p for p in walk(os.path.join(H, "1_PY")) if p.endswith(".py")]
pyfiles += [p for p in walk(os.path.join(H, "links.md")) if p.endswith(".py")]
pyfiles = sorted(set(pyfiles))
local_names = {os.path.splitext(os.path.basename(p))[0] for p in pyfiles}

# text corpus for caller search (code + docs, not data)
texts = {}
for base in (H,):
    for p in walk(base):
        if p.lower().endswith((".py", ".md", ".json", ".ps1", ".bat", ".txt", ".csv")) and "demand_discovery_consolidation" not in p and "pipeline_output" not in p and "markdown_files" not in p:
            try:
                if os.path.getsize(p) < 3_000_000:
                    texts[p] = open(p, encoding="utf-8", errors="ignore").read()
            except OSError:
                pass

rows = []
for p in pyfiles:
    rel = os.path.relpath(p, H)
    src = open(p, encoding="utf-8", errors="replace").read()
    row = {"path": rel, "lines": src.count("\n") + 1, "sha256": hashlib.sha256(src.encode("utf-8", "replace")).hexdigest()[:16]}
    try:
        tree = ast.parse(src)
        row["parse_ok"] = "yes"
    except SyntaxError as e:
        row["parse_ok"] = f"no: {e.msg} line {e.lineno}"
        tree = None
    std, third, loc = set(), set(), set()
    if tree:
        for n in ast.walk(tree):
            names = []
            if isinstance(n, ast.Import):
                names = [a.name.split(".")[0] for a in n.names]
            elif isinstance(n, ast.ImportFrom) and n.level == 0 and n.module:
                names = [n.module.split(".")[0]]
            for nm in names:
                (std if nm in STD else loc if nm in local_names else third).add(nm)
    row["stdlib_imports"] = ";".join(sorted(std))
    row["third_party_imports"] = ";".join(sorted(third))
    row["local_imports"] = ";".join(sorted(loc))
    lits = sorted({m.group(0) for m in PATHLIT.finditer(src)})
    row["path_markers"] = ";".join(lits)
    row["has_argparse"] = "yes" if "argparse" in src else "no"
    row["is_test"] = "yes" if re.search(r"(^|[\/])(test_[^\/]*|[^\/]*_test)\.py$", rel) else "no"
    base = os.path.basename(p)
    own_dir = os.path.dirname(p)
    callers = sorted({os.path.relpath(q, H) for q, t in texts.items() if base in t and not q.startswith(own_dir) and q != p})
    row["external_mentions"] = len(callers)
    row["mentioned_by_sample"] = ";".join(callers[:4])
    rows.append(row)

out = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(out, "scan_results.csv"), "w", encoding="utf-8", newline="") as f:
    w = csv.DictWriter(f, fieldnames=list(rows[0].keys()), lineterminator="\n")
    w.writeheader(); w.writerows(rows)
reqs = [os.path.relpath(p, H) for p in walk(H) if re.search(r"requirements.*\.(txt|in)$", os.path.basename(p), re.I)]
json.dump({"requirements_files": reqs, "py_files": len(rows)}, open(os.path.join(out, "scan_groups.json"), "w"), indent=1)
print("py files:", len(rows), "| requirements:", len(reqs))
