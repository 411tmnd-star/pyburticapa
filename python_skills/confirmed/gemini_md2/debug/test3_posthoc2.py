import json, re, sys
from pathlib import Path
sys.stdout.reconfigure(encoding="utf-8", errors="backslashreplace")
HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent))
import gemini_parse as gp

inner = gp.rpc_payloads(gp.parse_batchexecute((HERE / "test3_gemini_response.bin").read_bytes()), "ujx1Bf")[0]
turns = inner[0][1]
R = (HERE / "test3_browser_rendered_text.txt").read_text(encoding="utf-8")
out = {}

# ---- (c) would a relaxed http(s) predicate find the missing cards? (local predicate, parser untouched) ----
relaxed = lambda l: (len(l) > 9 and isinstance(l[0], str) and isinstance(l[2], str)
                     and re.match(r"https?://www\.youtube\.com/watch\?v=", l[2] or "") and isinstance(l[3], str))
print("=== (c) video cards: existing predicate vs relaxed http(s) predicate (analysis only) ===")
cards_found = []
for i, t in enumerate(turns):
    cand = t[3][0][0]
    cur = {c[2] for c in gp._find_lists(cand, gp._is_video_card)}
    rel = {}
    for c in gp._find_lists(cand, relaxed):
        rel[c[2]] = (c[0], c[3], c[7] if len(c) > 7 else None, c[9] if len(c) > 9 else None)
    paths = [p for p in __import__("itertools").chain([()]) ]
    print(f"turn {i+1}: existing predicate -> {len(cur)} | relaxed -> {len(rel)}")
    for u, (title, chan, views, dur) in rel.items():
        print(f"     {u} | {title[:60]!r} | {chan!r} | views={views} | dur={dur}")
        cards_found.append((i + 1, u, title, chan, views))
print("\nrendered caption lines that correspond to cards:")
for ln in R.split("\n"):
    if re.search(r"\d+(\.\d+)?[KM]? views", ln): print("   ", repr(ln.strip()))
# which rendered caption lines would be explained by the relaxed cards
def fmt(n):
    return f"{n/1000:.1f}K views".replace(".0K", "K") if isinstance(n, int) and n >= 1000 else f"{n} views"
explained = {(c[3], fmt(c[4])) for c in cards_found}
print("   caption forms derivable from cards (channel, views):", sorted(explained))

# ---- reasoning summaries: user-visible on the share page? ----
print("\n=== reasoning summaries (turn[3][0][0][37][1]) vs rendered share page ===")
tot = found = 0
for t in turns:
    for it in (t[3][0][0][37][1] if t[3][0][0][37] else []):
        if isinstance(it, list) and len(it) > 6:
            for s in (it[5], it[6]):
                if isinstance(s, str) and len(s) > 25:
                    tot += 1; found += s[:40] in R
print(f"reasoning-summary strings (title/body) checked: {tot}; found in rendered page text: {found}")
print("'thinking' control/text anywhere in rendered page:", bool(re.search(r"show thinking|thought for|thinking", R, re.I)))

# ---- table cells with <br> handled ----
print("\n=== table cells vs render (HTML <br> stripped) ===")
conv = gp.extract_conversation(inner)
g = "\n".join(t["gemini_text"] for t in conv["turns"])
rows = [l.strip() for l in g.split("\n") if re.match(r"^\s*\|.*\|\s*$", l)]
rtok = set(re.findall(r"[a-z0-9']{2,}", R.lower()))
bad = 0; n = 0
for r in rows:
    if re.fullmatch(r"\|?\s*:?-{3,}[\s|:-]*", r): continue
    for c in r.strip("|").split("|"):
        n += 1
        words = re.findall(r"[a-z0-9']{2,}", re.sub(r"<br\s*/?>|[*_`]", " ", c).lower())
        if not all(w in rtok for w in words): bad += 1; print("   missing:", c.strip()[:80])
print(f"cells checked {n}, cells with words absent from render: {bad}")
print("raw <br> in table rows:", sum(r.count("<br>") for r in rows), "| rows:", len(rows))

# ---- new payload slots: what are they? ----
print("\n=== new slots vs Tests 1/2 (shapes, trimmed) ===")
def shape(x, d=0, maxd=4):
    if isinstance(x, list):
        if d >= maxd: return f"list[{len(x)}]"
        return [shape(v, d + 1, maxd) for v in x[:6]] + (["..."] if len(x) > 6 else [])
    if isinstance(x, str): return f"str({len(x)}):{x[:45]}"
    return x
t = turns[1]
print("turn2 t[3][4] (UI/tool metadata?):", json.dumps(shape(t[3][4], 0, 5), ensure_ascii=False)[:520])
print("turn2 t[3][5]:", json.dumps(shape(t[3][5], 0, 4), ensure_ascii=False)[:300])
print("turn2 cand[2]:", json.dumps(shape(t[3][0][0][2], 0, 4), ensure_ascii=False)[:420])
print("turn2 cand[12][4] (video blocks):", json.dumps(shape(t[3][0][0][12][4], 0, 3), ensure_ascii=False)[:420])
print("turn1 user attachment path:", [p for p in range(1)], "->", json.dumps(shape(turns[0][2][0][4], 0, 4), ensure_ascii=False)[:380])
print("inner[0] slots:", [i for i, v in enumerate(inner[0]) if v is not None], "| inner[0][6] thumbnail:", str(inner[0][6])[:70])
