import re, sys
from collections import defaultdict
from pathlib import Path
sys.stdout.reconfigure(encoding="utf-8", errors="backslashreplace")
HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent))
from gemini_parse import parse_batchexecute, rpc_payloads

inner = rpc_payloads(parse_batchexecute((HERE / "python_replay_response.bin").read_bytes()), "ujx1Bf")[0]
turns = inner[0][1]
rendered = (HERE / "browser_rendered_text.txt").read_text(encoding="utf-8")
tok = lambda s: re.findall(r"[a-z0-9']{3,}", s.lower())
rtoks = set(tok(rendered))

leaves = []
def walk(x, path):
    if isinstance(x, list):
        for i, v in enumerate(x): walk(v, path + (i,))
    elif isinstance(x, str) and len(x) >= 25:
        leaves.append((path, x))
walk(turns, ())

pat = defaultdict(lambda: [0, 0, 0, ""])  # n, in_render, chars, sample
for path, s in leaves:
    t = tok(s)
    if not t: continue
    cov = sum(w in rtoks for w in t) / len(t)
    key = "t[T]" + "".join(f"[{i}]" for i in path[1:])
    # collapse deep list indices
    key = re.sub(r"(\[\d+\]){9,}.*", "[...deep]", key)
    p = pat[key]; p[0] += 1; p[1] += cov >= 0.8; p[2] += len(s)
    if not p[3]: p[3] = s[:60].replace("\n", " ")
print(f"{'path pattern':60} n  in-render  chars  sample")
for k, (n, inr, ch, smp) in sorted(pat.items(), key=lambda kv: -kv[1][2])[:45]:
    print(f"{k:60} {n:3} {inr:3} {ch:7} {smp!r}")
