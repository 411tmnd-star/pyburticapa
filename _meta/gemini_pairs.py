import difflib, itertools, os, re
G = r"C:\Users\USER\Desktop\Python_Toolkit\tools\gemini_md2"
D = os.path.join(G, "debug")
names = ["cdp_capture.py", "cdp_capture_generic.py", "cdp_capture_test3.py", "cdp_capture_test4.py", "cdp_eval.py", "test3_posthoc.py", "test3_posthoc2.py"]
txt = {n: open(os.path.join(D, n), encoding="utf-8").read().splitlines() for n in names}
for a, b in itertools.combinations(names, 2):
    if a.split("_")[0] != b.split("_")[0] and not (a.startswith("test3") and b.startswith("test3")):
        continue
    d = [l for l in difflib.unified_diff(txt[a], txt[b], lineterm="", n=0) if l[:1] in "+-" and l[:3] not in ("+++", "---")]
    print(f"{a} vs {b}: {len(d)} changed lines")
    for l in d[:6]:
        print("     ", l[:150])
for b in ("gemini_parse_before_additive_changes.py", "gemini_parse_before_http_fix.py"):
    old = open(os.path.join(D, "backup", b), encoding="utf-8").read().splitlines()
    cur = open(os.path.join(G, "gemini_parse.py"), encoding="utf-8").read().splitlines()
    d = [l for l in difflib.unified_diff(old, cur, lineterm="", n=0) if l[:1] in "+-" and l[:3] not in ("+++", "---")]
    print(b, "vs current gemini_parse.py:", len(d), "changed lines")
a = open(os.path.join(D, "backup", "gemini_parse_before_additive_changes.py"), encoding="utf-8").read().splitlines()
b = open(os.path.join(D, "backup", "gemini_parse_before_http_fix.py"), encoding="utf-8").read().splitlines()
print("the two backups differ by", len([l for l in difflib.unified_diff(a, b, lineterm="", n=0) if l[:1] in "+-" and l[:3] not in ("+++", "---")]), "lines")
print("--- external inputs referenced by debug scripts (.bin/.json/.txt names)")
for n in sorted(os.listdir(D)):
    if n.endswith(".py"):
        s = open(os.path.join(D, n), encoding="utf-8").read()
        refs = sorted(set(re.findall(r"[\w/.\-]+\.(?:bin|json|jsonl|txt|har)\b", s)))
        print(f"  {n}: {refs[:5]}")
