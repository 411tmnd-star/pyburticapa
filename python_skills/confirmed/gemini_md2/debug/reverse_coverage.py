import re, sys
from pathlib import Path
sys.stdout.reconfigure(encoding="utf-8", errors="backslashreplace")
HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent))
from gemini_parse import parse_batchexecute, rpc_payloads

inner = rpc_payloads(parse_batchexecute((HERE / "python_replay_response.bin").read_bytes()), "ujx1Bf")[0]
turns = inner[0][1]
R = (HERE / "browser_rendered_text.txt").read_text(encoding="utf-8")
tok = lambda s: re.findall(r"[a-z0-9']{3,}", s.lower())

marks = [m.start() for m in re.finditer(r"^You said ", R, re.M)]
body_start = marks[0]
end = R.index("\nSign in\n\nGemini may display")
segs = [R[a:b] for a, b in zip(marks, marks[1:] + [end])]
groups = [[0], [1], [2], [3], [4], [5, 6], [7], [8]]
print("segments:", len(segs), "groups:", len(groups))

def user(t): return t[2][0][0] if t[2] and t[2][0] and isinstance(t[2][0][0], str) else ""
def gem(t): return t[3][0][0][1][0]

total_missing = 0
for gi, (seg, g) in enumerate(zip(segs, groups)):
    have = set()
    for ti in g:
        have |= set(tok(user(turns[ti]))) | set(tok(gem(turns[ti])))
    missing = []
    for line in seg.split("\n"):
        L = line.strip()
        ts = tok(L)
        if len(ts) < 2: continue
        cov = sum(w in have for w in ts) / len(ts)
        if cov < 0.8: missing.append((round(cov, 2), L[:110]))
    total_missing += len(missing)
    print(f"\nGROUP turns {g}: segment {len(seg)} chars, uncovered rendered lines: {len(missing)}")
    for cov, L in missing[:12]: print("   ", cov, repr(L))
print("\ntotal uncovered lines:", total_missing)
