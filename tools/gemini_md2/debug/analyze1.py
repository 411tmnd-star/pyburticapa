import re, sys
from collections import Counter
from pathlib import Path
sys.stdout.reconfigure(encoding="utf-8", errors="backslashreplace")
t = Path(__file__).with_name("prototype_response.html").read_text(encoding="utf-8")
print("len", len(t))
print("title:", re.findall(r"<title[^>]*>(.*?)</title>", t, re.S)[:2])
print("tags:", Counter(re.findall(r"<([a-zA-Z][\w-]*)", t)).most_common(25))
print("meta:", [m[:200] for m in re.findall(r"<meta[^>]+>", t)][:20])
scripts = [(m.start(), m.end(), m.group(1), m.group(2)) for m in re.finditer(r"<script([^>]*)>(.*?)</script>", t, re.S)]
print("script blocks:", len(scripts))
for s, e, attrs, body in scripts:
    print(f"  @{s} len={len(body)} attrs={attrs[:100]!r} head={body[:140]!r}")
print("visible body text (tags stripped, scripts/styles removed):")
vis = re.sub(r"<(script|style)[^>]*>.*?</\1>", "", t, flags=re.S)
vis = re.sub(r"<[^>]+>", " ", vis)
vis = re.sub(r"\s+", " ", vis).strip()
print(len(vis), repr(vis[:1500]))
for kw in ["AF_initDataCallback", "WIZ_global_data", "conversation", "share", "sign in", "Sign in", "turn", "response", "prompt", "<message-content", "user-query", "model-response"]:
    print(kw, t.count(kw))
