"""Read-only audit of tools/gemini_md2: (a) who references each non-code artifact, (b) facts about each debug/backup script.
Writes _meta/gemini_audit.json and prints a compact summary."""
import ast, difflib, hashlib, json, os, re

G = r"C:\Users\USER\Desktop\Python_Toolkit\tools\gemini_md2"
files = []
for dp, dn, fn in os.walk(G):
    dn[:] = [d for d in dn if d != "__pycache__"]
    for f in fn:
        files.append(os.path.join(dp, f))
rel = lambda p: os.path.relpath(p, G).replace(os.sep, "/")
py = [p for p in files if p.endswith(".py")]
src = {p: open(p, encoding="utf-8", errors="replace").read() for p in py}

# (a) artifacts
art = {}
for p in files:
    if p.endswith(".py"):
        continue
    name = os.path.basename(p)
    hits = []
    for q, s in src.items():
        for i, ln in enumerate(s.split("\n"), 1):
            if name in ln or os.path.splitext(name)[0] in ln:
                hits.append(f"{rel(q)}:{i}: {ln.strip()[:110]}")
    art[rel(p)] = {"bytes": os.path.getsize(p), "script_references": hits[:6], "n_refs": len(hits)}

# (b) debug / backup scripts
cands = [p for p in py if rel(p).startswith("debug/")]
info = {}
top_py = {os.path.basename(p): p for p in py if "/" not in rel(p)}
for p in cands:
    s = src[p]
    r = rel(p)
    imports, ok = set(), True
    try:
        t = ast.parse(s)
        for n in ast.walk(t):
            if isinstance(n, ast.Import):
                imports |= {a.name.split(".")[0] for a in n.names}
            elif isinstance(n, ast.ImportFrom) and n.module and n.level == 0:
                imports.add(n.module.split(".")[0])
    except SyntaxError:
        ok = False
    base = os.path.basename(p)
    refs = sorted({rel(q) for q, qs in src.items() if q != p and (base in qs or os.path.splitext(base)[0] in qs)})
    sims = {}
    mine = {l.strip() for l in s.splitlines() if l.strip()}
    for tb, tp in top_py.items():
        other = {l.strip() for l in src[tp].splitlines() if l.strip()}
        j = len(mine & other) / max(1, len(mine | other))
        if j > 0.5:
            sims[tb] = round(j, 3)
    sib = {}
    for q in cands:
        if q != p and hashlib.sha256(src[q].encode()).digest() == hashlib.sha256(s.encode()).digest():
            sib[rel(q)] = "identical"
    info[r] = {
        "lines": s.count("\n") + 1, "parses": ok, "imports": sorted(imports),
        "cli": "argparse" if "argparse" in s else ("sys.argv" if "sys.argv" in s else "none"),
        "main_guard": "__main__" in s,
        "writes": len(re.findall(r"write_text\(|open\([^)]*[\"']w", s)),
        "uses_cdp_or_browser": bool(re.search(r"websockets|cdp|remote-debugging|9222|playwright|selenium", s, re.I)),
        "network": bool(re.search(r"urllib|requests|http\.client|aiohttp|websockets", s)),
        "referenced_by": refs, "similar_to_top_level": sims, "identical_to": sib,
        "docstring": (ast.get_docstring(t) or "")[:140] if ok else "",
        "first_comment": next((l.strip() for l in s.split("\n")[:8] if l.strip().startswith("#")), "")[:120],
    }
json.dump({"artifacts": art, "debug_scripts": info}, open(os.path.join(os.path.dirname(__file__), "gemini_audit.json"), "w", encoding="utf-8"), indent=1)
print("ARTIFACTS")
for k, v in art.items():
    print(f"  {k} ({v['bytes']}) refs={v['n_refs']}")
    for h in v["script_references"][:3]:
        print("      ", h)
print("DEBUG/BACKUP SCRIPTS", len(info))
for k, v in info.items():
    print(f"  {k}: {v['lines']}L cli={v['cli']} cdp={v['uses_cdp_or_browser']} net={v['network']} writes={v['writes']} refby={len(v['referenced_by'])} sim={v['similar_to_top_level']} ident={v['identical_to']}")
    print("      imports:", v["imports"], "| doc:", v["docstring"] or v["first_comment"])
