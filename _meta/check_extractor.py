import filecmp, os, subprocess, sys, tempfile
H = r"C:\Users\USER\Desktop\tool harness"
T = r"C:\Users\USER\Desktop\Python_Toolkit"
with tempfile.TemporaryDirectory() as out:
    r = subprocess.run([sys.executable, "-I", "-X", "utf8", os.path.join(T, "tools", "chat_reply_extractor", "chat_reply_extractor.py"),
                        os.path.join(H, "markdown_files"), "--out", out], capture_output=True, text=True, encoding="utf-8")
    ref_root = os.path.join(H, "markdown_files_cleaned")
    same, diff, noref = [], [], []
    for dp, dn, fn in os.walk(out):
        for f in fn:
            p = os.path.join(dp, f)
            rel = os.path.relpath(p, out)
            ref = os.path.join(ref_root, rel)
            if not os.path.exists(ref):
                noref.append(rel)
            elif filecmp.cmp(p, ref, shallow=False):
                same.append(rel)
            else:
                diff.append(rel)
    print("rc", r.returncode, "| identical", len(same), "| differ", len(diff), "| no reference", len(noref))
    print("DIFFER:", diff)
    print("NO REFERENCE:", noref)
    refs_missing = [f for f in os.listdir(ref_root) if os.path.isfile(os.path.join(ref_root, f)) and f not in [os.path.basename(x) for x in same + diff]]
    print("reference files not regenerated:", refs_missing)
