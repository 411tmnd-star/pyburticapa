import json, re, sys
from pathlib import Path
sys.stdout.reconfigure(encoding="utf-8", errors="backslashreplace")
HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent))
import gemini_parse as gp

inner = gp.rpc_payloads(gp.parse_batchexecute((HERE / "test3_gemini_response.bin").read_bytes()), "ujx1Bf")[0]
turns = inner[0][1]
R = (HERE / "test3_browser_rendered_text.txt").read_text(encoding="utf-8")
conv = gp.extract_conversation(inner)
tok = lambda s: re.findall(r"[a-z0-9']{3,}", s.lower())
mdtok = set()
for t in conv["turns"]:
    mdtok |= set(tok(re.sub(r"\[cite: ?[\d, ]+\]", "", t["user_text"] + " " + t["gemini_text"])))
    for c in t["cards"]: mdtok |= set(tok(c["title"] + " " + c["channel"]))

print("=== (a) rendered lines NOT covered by extracted text (<80% tokens present) ===")
body = R[R.index("You said "):R.index("\nSign in\n\nGemini may display")]
unc = []
for ln in body.split("\n"):
    L = ln.strip(); ts = tok(L)
    if len(ts) >= 1 and not L.startswith("You said "):
        cov = sum(w in mdtok for w in ts) / len(ts)
        if cov < 0.8: unc.append((round(cov, 2), L))
for c, l in unc: print(f"  {c} {l[:140]!r}")
print("uncovered lines:", len(unc), "of", len([l for l in body.split("\n") if l.strip()]))

def s(x, n=70):
    return repr(x[:n]) if isinstance(x, str) else repr(x)[:n]

print("\n=== (b) video structures per turn: candidate slot [30] and youtube strings ===")
for i, t in enumerate(turns):
    cand = t[3][0][0]
    yt = []
    def walk(x, path):
        if isinstance(x, list):
            for k, v in enumerate(x): walk(v, path + (k,))
        elif isinstance(x, str) and re.search(r"youtube\.com/watch|youtu\.be|youtube_content", x):
            yt.append((path, x[:70]))
    walk(cand, ())
    slot30 = cand[30] if len(cand) > 30 else None
    print(f"turn {i+1}: cand[30] {'present' if slot30 else 'absent'} | youtube strings: {len(yt)} | cards by extractor: {len(conv['turns'][i]['cards'])}")
    for p, x in yt[:6]: print("     ", list(p)[:14], x)
    if slot30:
        def shape(x, d=0):
            if isinstance(x, list): return [shape(v, d+1) for v in x[:8]] if d < 5 else f"list[{len(x)}]"
            if isinstance(x, str): return f"str({len(x)}):{x[:30]}"
            return x
        print("      cand[30] shape:", json.dumps(shape(slot30), ensure_ascii=False)[:420])
