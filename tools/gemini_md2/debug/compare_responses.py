import json, sys
from pathlib import Path
sys.stdout.reconfigure(encoding="utf-8", errors="backslashreplace")
HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent))
from gemini_parse import parse_batchexecute, rpc_payloads

b = (HERE / "candidate_response__BardChatUi_data_batchexecute_1.bin").read_bytes()
p = (HERE / "python_replay_response.bin").read_bytes()
res = {}
for name, raw in (("browser", b), ("python", p)):
    ch = parse_batchexecute(raw)
    pl = rpc_payloads(ch, "ujx1Bf")
    inner = pl[0]
    res[name] = {"bytes": len(raw), "chunks": len(ch), "wrb_payloads": len(pl),
                 "turns": len(inner[0][1]), "turn_ids": [t[0] for t in inner[0][1]], "inner": inner}
    print(name, {k: v for k, v in res[name].items() if k not in ("inner", "turn_ids")})
print("same turn ids/order:", res["browser"]["turn_ids"] == res["python"]["turn_ids"])
print("inner payload JSON identical:", json.dumps(res["browser"]["inner"]) == json.dumps(res["python"]["inner"]))
# where do they differ?
def diff(a, b, path=()):
    if type(a) != type(b): yield path, "type"; return
    if isinstance(a, list):
        if len(a) != len(b): yield path, f"len {len(a)} vs {len(b)}"
        for i, (x, y) in enumerate(zip(a, b)): yield from diff(x, y, path + (i,))
    elif a != b: yield path, "value"
d = list(diff(res["browser"]["inner"], res["python"]["inner"]))
print("differing leaves:", len(d))
for path, why in d[:12]:
    x = res["browser"]["inner"]; y = res["python"]["inner"]
    for i in path: x = x[i]; y = y[i]
    print("  ", path, why, repr(str(x)[:60]), "|", repr(str(y)[:60]))
print("raw-size delta bytes:", len(b) - len(p))
