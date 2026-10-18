import re, sys, json
from pathlib import Path
sys.stdout.reconfigure(encoding="utf-8", errors="backslashreplace")
t = Path(__file__).with_name("prototype_response.html").read_text(encoding="utf-8")

def ctx(pat, n=3, w=160, flags=0):
    out = []
    for m in list(re.finditer(pat, t, flags))[:n]:
        out.append(repr(t[max(0, m.start()-w):m.end()+w]))
    return out

print("share id 'bee612da159c' occurrences:", t.count("bee612da159c"), "| orig 'HYSCokmDqznN':", t.count("HYSCokmDqznN"))
print("skid:", t.count("64f5529d-beae-4d60-a7fe-6b7e6a7f2020"))
print("\nAF_initDataCallback contexts:")
for c in ctx(r"AF_initDataCallback", 3, 120): print("  ", c)
print("\n'conversation' contexts:")
for c in ctx(r"conversation", 10, 90): print("  ", c)
print("\n'share' contexts (non-url):")
for c in ctx(r"[\"'/]share[\"'/]", 8, 90): print("  ", c)

# WIZ_global_data: parse and look for share/chat related keys
m = re.search(r"window\.WIZ_global_data\s*=\s*(\{.*?\});\s*</", t, re.S) or re.search(r"window\.WIZ_global_data = (\{.*\})", t)
blob = None
for sm in re.finditer(r"<script[^>]*data-id=\"_gd\"[^>]*>(.*?)</script>", t, re.S):
    body = sm.group(1).strip()
    body = body[len("window.WIZ_global_data = "):].rstrip(";")
    try:
        blob = json.loads(body)
    except Exception as e:
        print("WIZ parse fail:", e)
if blob:
    print("\nWIZ_global_data keys:", len(blob))
    interesting = {k: v for k, v in blob.items() if isinstance(v, str) and len(v) > 40}
    for k, v in list(interesting.items())[:15]: print("  ", k, repr(v[:140]))
    for k, v in blob.items():
        s = json.dumps(v)
        if re.search(r"conversation|share|c_[0-9a-f]{8}|turn", s, re.I) and len(s) > 20:
            print("  KEY w/ chat-ish text:", k, repr(s[:200]))

# large string literals anywhere that look like prose (>=6 words, >=200 chars, no JS-isms)
cands = re.findall(r'"((?:[^"\\]|\\.){300,})"', t)
prose = [c for c in cands if len(re.findall(r"[A-Za-z]{3,} [A-Za-z]{3,} [A-Za-z]{3,}", c)) > 15 and "function" not in c and "http" not in c[:30]]
print("\nlong prose-like string literals:", len(prose))
for c in prose[:5]: print("   ", repr(c[:200]))

# bard-initial-data payload
m = re.search(r'id="bard-initial-data" data-payload="([^"]*)"', t)
if m:
    import html
    print("\nbard-initial-data payload:", html.unescape(m.group(1))[:600])

# RPC / endpoint hints in the page about how conversation loads
for pat in (r"batchexecute", r"_/BardChatUi/data/[\w/.]+", r"rpcids?[\"':= ]+[\w\",]+", r"\"[A-Za-z0-9]{6}\"\s*,\s*\[\"?c_"):
    print(pat, "->", set(re.findall(pat, t))[:5] if False else list(set(re.findall(pat, t)))[:6])
