import json, sys
from pathlib import Path
sys.stdout.reconfigure(encoding="utf-8", errors="backslashreplace")
HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE.parent))
from gemini_parse import parse_batchexecute, rpc_payloads

inner = rpc_payloads(parse_batchexecute((HERE / "python_replay_response.bin").read_bytes()), "ujx1Bf")[0]
turns = inner[0][1]
idx = int(sys.argv[1]) if len(sys.argv) > 1 else 3
maxdepth = int(sys.argv[2]) if len(sys.argv) > 2 else 4

def show(x, path, depth, out):
    pad = "  " * depth
    if isinstance(x, list):
        nn = [i for i, v in enumerate(x) if v is not None]
        out.append(f"{pad}{path} list[{len(x)}] non-null idx={nn[:30]}")
        if depth < maxdepth:
            for i in nn: show(x[i], f"[{i}]", depth + 1, out)
    elif isinstance(x, str):
        out.append(f"{pad}{path} str({len(x)}) {x[:70]!r}")
    else:
        out.append(f"{pad}{path} {type(x).__name__} {x!r}")

out = []
print("TOP:", type(inner).__name__, len(inner), "| inner[0] len", len(inner[0]), "| inner[1]", repr(inner[1])[:80], "| inner[2]", repr(inner[2])[:80])
print("inner[0] non-null:", [i for i, v in enumerate(inner[0]) if v is not None])
show(turns[idx], f"turn[{idx}]", 0, out)
print("\n".join(out))
