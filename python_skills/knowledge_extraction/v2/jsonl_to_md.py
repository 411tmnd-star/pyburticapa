"""Convert a .jsonl chat/session transcript (Claude Code style or generic role/content) to Markdown.

Usage:
    python jsonl_to_md.py "C:\\path\\file.jsonl"                 # one file
    python jsonl_to_md.py "C:\\path\\folder"                     # every .jsonl in folder
    python jsonl_to_md.py <path> --out "C:\\out"                 # output folder (default: converted\\)
    python jsonl_to_md.py <path> --tools                         # also include tool calls/results
"""
import argparse
import json
import sys
from pathlib import Path


def block_text(content, tools):
    """Flatten a message 'content' (str or list of blocks) to text."""
    if isinstance(content, str):
        return content
    if not isinstance(content, list):
        return ""
    out = []
    for b in content:
        if isinstance(b, str):
            out.append(b)
        elif isinstance(b, dict):
            t = b.get("type")
            if t in ("text", "input_text", "output_text") and isinstance(b.get("text"), str):
                out.append(b["text"])
            elif tools and t == "tool_use":
                out.append(f"**[tool: {b.get('name')}]**\n```json\n{json.dumps(b.get('input'), ensure_ascii=False, indent=2)}\n```")
            elif tools and t == "tool_result":
                c = b.get("content")
                c = block_text(c, False) if not isinstance(c, str) else c
                out.append(f"**[tool result]**\n```\n{c}\n```")
    return "\n\n".join(x for x in out if x.strip())


def extract(obj, tools):
    """Return (role, text) or None for one JSONL record."""
    msg = obj.get("message") if isinstance(obj.get("message"), dict) else obj
    role = msg.get("role") or obj.get("type")
    if role not in ("user", "assistant"):
        return None
    text = block_text(msg.get("content", msg.get("text", "")), tools).strip()
    return (role, text) if text else None


def convert(path, out_dir, tools):
    msgs, bad = [], 0
    with open(path, "r", encoding="utf-8", errors="replace") as f:
        for line in f:
            line = line.strip()
            if not line:
                continue
            try:
                obj = json.loads(line)
            except json.JSONDecodeError:
                bad += 1
                continue
            if isinstance(obj, dict) and not obj.get("isMeta"):
                r = extract(obj, tools)
                if r:
                    msgs.append(r)
    lines = [f"# {path.stem}", "", f"> **Messages:** {len(msgs)}", "", "---", ""]
    for role, text in msgs:
        lines += [f"## {'You' if role == 'user' else 'Claude'}", "", text, "", "---", ""]
    out_dir.mkdir(parents=True, exist_ok=True)
    out = out_dir / f"{path.stem}.md"
    out.write_text("\n".join(lines), encoding="utf-8")
    return len(msgs), bad, out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("path")
    ap.add_argument("--out", default="converted")
    ap.add_argument("--tools", action="store_true")
    a = ap.parse_args()
    p = Path(a.path)
    files = sorted(p.glob("*.jsonl")) if p.is_dir() else [p]
    if not files:
        sys.exit("No .jsonl files found.")
    for f in files:
        n, bad, out = convert(f, Path(a.out), a.tools)
        print(f"OK {f.name} -> {out} ({n} messages, {bad} bad lines)")


if __name__ == "__main__":
    main()
