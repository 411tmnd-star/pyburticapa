import os, sys, collections
H = r"C:\Users\USER\Desktop\tool harness"
groups = sys.argv[1:]
for g in groups:
    root = os.path.join(H, g)
    ext = collections.Counter()
    shown = []
    for dp, dn, fn in os.walk(root):
        dn[:] = [d for d in dn if d not in ("__pycache__", ".git")]
        for f in fn:
            p = os.path.join(dp, f)
            e = os.path.splitext(f)[1].lower() or "(none)"
            ext[e] += 1
            sz = os.path.getsize(p)
            if e in (".py", ".txt", ".md", ".json", ".cfg", ".toml", ".ini", ".bat", ".ps1") and sz < 200_000:
                shown.append((os.path.relpath(p, root), sz))
    print("==", g, dict(ext.most_common(8)))
    for rel, sz in shown[:60]:
        print("  ", rel, sz)
    if len(shown) > 60:
        print("   ... +", len(shown) - 60, "more small text/code files")
