"""Read-only: docstring, CLI flags, I/O hints and third-party imports of each toolkit tool (no execution)."""
import ast, os, re

T = r"C:\Users\USER\Desktop\Python_Toolkit\tools"
SKIP = ("debug", "tests", "__pycache__")
for dp, dn, fn in os.walk(T):
    dn[:] = [d for d in dn if d not in SKIP]
    for f in sorted(fn):
        if not f.endswith(".py"):
            continue
        p = os.path.join(dp, f)
        s = open(p, encoding="utf-8", errors="replace").read()
        try:
            t = ast.parse(s)
        except SyntaxError:
            print(os.path.relpath(p, T), "PARSE FAIL"); continue
        doc = (ast.get_docstring(t) or "").strip().replace("\n", " ")[:230]
        flags = sorted(set(re.findall(r"add_argument\(\s*[\"'](-{0,2}[\w-]+)", s)))[:12]
        imps = set()
        for n in ast.walk(t):
            if isinstance(n, ast.Import):
                imps |= {a.name.split(".")[0] for a in n.names}
            elif isinstance(n, ast.ImportFrom) and n.module and n.level == 0:
                imps.add(n.module.split(".")[0])
        std = set(__import__("sys").stdlib_module_names)
        third = sorted(i for i in imps if i not in std)
        net = bool(re.search(r"urllib|requests|aiohttp|websockets|http\.client|yt_dlp|yt-dlp", s))
        sub = "subprocess" in imps
        print(f"{os.path.relpath(p, T)} [{s.count(chr(10))+1}L] third={third} net={net} subprocess={sub}\n    flags={flags}\n    doc={doc}")
