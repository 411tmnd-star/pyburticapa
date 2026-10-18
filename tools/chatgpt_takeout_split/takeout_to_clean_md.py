"""ChatGPT takeout shards -> clean Markdown, prompts and replies in separate folders.

Reads conversations-*.json (never writes to them) and writes:

    OUT/PROMPTS/<shard>/<conversation>.md    user messages only
    OUT/REPLIES/<shard>/<conversation>.md    assistant messages only
    OUT/manifest.csv, OUT/run.log

Per conversation the main path (current_node back to the root) is written in
original order; every other branch (regenerated replies, edited prompts) is
written under the numbered message it diverges from, labelled "alternate".
Only user/assistant messages with text are written. Everything else (thinking
blocks, system, tool, empty, hidden) is not written but is counted per type in
manifest.csv, so the totals must add up.

Usage (python -I -X utf8 takeout_to_clean_md.py ...):
    run    SRC OUT [--hashes CSV] [--overwrite]
    verify SRC OUT

SRC is the folder holding conversations-000.json ... (and optionally
conversation_asset_file_names.json). --hashes is a CSV with Source and SHA256
columns (e.g. the archive's manifest.csv); shards are matched by file name.
"""
import argparse
import csv
import glob
import hashlib
import json
import os
import re
import shutil
import sys
from collections import Counter
from datetime import datetime, timezone
from urllib.parse import quote

KEEP_TYPES = {"text", "multimodal_text"}
ILLEGAL = re.compile(r'[<>:"/\\|?*\[\]\x00-\x1f]')
ENTRY = re.compile(r"<!-- NODE (\S+) [^\n]*? -->\n(.*?)\n<!-- END \1 -->", re.S)
COLUMNS = ["shard", "index", "conversation_id", "title", "file", "source_sha256",
           "message_nodes", "main_prompts", "main_replies", "alt_prompts",
           "alt_replies", "skipped_total", "skipped_by_type",
           "fork_parent", "fork_shared_messages", "fork_branches", "status"]


def sha256_file(path):
    h = hashlib.sha256()
    with open(path, "rb") as f:
        for block in iter(lambda: f.read(1 << 20), b""):
            h.update(block)
    return h.hexdigest().upper()


def iso(ts):
    if ts is None:
        return "unknown"
    return datetime.fromtimestamp(ts, timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")


def shards_in(src):
    """Sharded exports (conversations-000.json ...) or the single conversations.json most exports contain."""
    shards = sorted(glob.glob(os.path.join(src, "conversations-*.json")))
    if not shards and os.path.isfile(os.path.join(src, "conversations.json")):
        shards = [os.path.join(src, "conversations.json")]
    return shards


def load_assets(src):
    p = os.path.join(src, "conversation_asset_file_names.json")
    if os.path.isfile(p):
        with open(p, encoding="utf-8") as f:
            return json.load(f)
    return {}


# ---------------------------------------------------------------- analysis
def part_text(part, assets):
    if isinstance(part, str):
        return part
    if isinstance(part, dict):
        if isinstance(part.get("text"), str):
            return part["text"]
        ptr = part.get("asset_pointer")
        if ptr:
            m = re.search(r"file[-_][0-9a-f]+", str(ptr))
            name = ""
            if m:
                token = m.group(0).replace("-", "_")
                for k, v in assets.items():
                    if token in k or token.replace("_", "-") in k:
                        name = f" name={v}"
                        break
            return f"[attachment: {part.get('content_type', 'asset')} pointer={ptr}{name}]"
        return f"[non-text part: {part.get('content_type', 'unknown')}]"
    return f"[non-text part: {type(part).__name__}]"


def classify(m, assets):
    """Return ((role, text), None) for a kept message or (None, reason)."""
    role = (m.get("author") or {}).get("role")
    content = m.get("content") or {}
    ctype = content.get("content_type")
    if role not in ("user", "assistant") or ctype not in KEEP_TYPES:
        return None, f"{role}/{ctype}"
    if (m.get("metadata") or {}).get("is_visually_hidden_from_conversation"):
        return None, f"{role}/hidden"
    if role == "assistant" and m.get("recipient") not in (None, "all"):
        return None, f"{role}/tool_call"
    text = "\n".join(part_text(p, assets) for p in (content.get("parts") or []))
    if not text.strip():
        return None, f"{role}/empty"
    return (role, text), None


def analyse(conv, assets):
    mapping = conv.get("mapping") or {}
    chain, seen, cur = [], set(), conv.get("current_node")
    while cur is not None:
        if cur in seen or cur not in mapping:
            raise ValueError(f"broken parent chain at {cur!r}")
        seen.add(cur)
        chain.append(cur)
        cur = mapping[cur].get("parent")
    chain.reverse()
    pos = {nid: i for i, nid in enumerate(chain)}

    kept, skipped, nodes = {}, Counter(), 0
    for nid, node in mapping.items():
        m = node.get("message")
        if not m:
            continue
        nodes += 1
        got, reason = classify(m, assets)
        if got:
            kept[nid] = got
        else:
            skipped[reason] += 1
    if nodes and not chain:
        raise ValueError("messages exist but current_node is missing")

    main = [nid for nid in chain if nid in kept]
    main_role = {"user": [], "assistant": []}
    for nid in main:
        main_role[kept[nid][0]].append(nid)

    slots = {"user": {}, "assistant": {}}  # role -> slot index (0-based) -> alt ids
    for nid in kept:
        if nid in pos:
            continue
        a = mapping[nid].get("parent")
        while a is not None and a not in pos:
            a = mapping[a].get("parent") if a in mapping else None
        apos = pos[a] if a is not None else -1
        role = kept[nid][0]
        k = len(main_role[role])
        for i, mid in enumerate(main_role[role]):
            if pos[mid] > apos:
                k = i
                break
        slots[role].setdefault(k, []).append(nid)
    for role in slots:
        for k in slots[role]:
            slots[role][k].sort(key=lambda n: ((mapping[n]["message"].get("create_time") or 0), n))
    return {"mapping": mapping, "chain": chain, "kept": kept, "skipped": skipped,
            "nodes": nodes, "main": main, "main_role": main_role, "slots": slots}


# ---------------------------------------------------------------- writing
def file_name(conv, used):
    cid = str(conv.get("conversation_id") or conv.get("id") or "noid")
    date = iso(conv.get("create_time"))[:10]
    if date == "unknown":
        date = "undated"
    title = ILLEGAL.sub("", str(conv.get("title") or "untitled"))
    title = re.sub(r"\s+", " ", title).strip(" .")[:60].rstrip(" .") or "untitled"
    name = f"{date}_{title}_{re.sub('[^0-9A-Za-z]', '', cid)[:8]}.md"
    n = 1
    while name in used:
        n += 1
        name = f"{date}_{title}_{re.sub('[^0-9A-Za-z]', '', cid)[:8]}_{n}.md"
    used.add(name)
    return name


def entry(level, heading, nid, role, branch, seq, node, text):
    m = node["message"]
    return (f"{'#' * level} {heading}\n"
            f"<!-- NODE {nid} role={role} branch={branch} seq={seq} "
            f"time={iso(m.get('create_time'))} parent={node.get('parent')} -->\n"
            f"{text}\n<!-- END {nid} -->\n\n")


def render(role, conv, a, shard, index, sha, fork=("", None, None)):
    label, who = ("Prompt", "User") if role == "user" else ("Reply", "Assistant")
    plural = "prompts" if role == "user" else "replies"
    mapping, kept = a["mapping"], a["kept"]
    seq_of = {nid: i + 1 for i, nid in enumerate(a["main"])}
    main = a["main_role"][role]
    slots = a["slots"][role]
    title = re.sub(r"\s+", " ", str(conv.get("title") or "untitled")).strip()
    out = [f"# {title}\n\n",
           f"- conversation_id: {conv.get('conversation_id') or conv.get('id')}\n"
           f"- source_file: {shard}\n- source_sha256: {sha}\n"
           f"- conversation_index_in_shard: {index}\n"
           f"- created: {iso(conv.get('create_time'))}\n- updated: {iso(conv.get('update_time'))}\n"
           f"- model: {conv.get('default_model_slug')}\n"
           f"- view: {label}s only ({who} messages)\n"
           f"- main_path_{label.lower()}s: {len(main)}\n"
           f"- alternate_{plural}: {sum(len(v) for v in slots.values())}\n"
           f"{fork[0]}\n---\n\n"]
    placed = fork[1] is None
    for k, nid in enumerate(main):
        if not placed and seq_of[nid] > int(fork[1][0]):
            out.append(fork[1][1])
            placed = True
        out.append(entry(2, f"{label} {k + 1} — {who}", nid, role, "main", seq_of[nid],
                         mapping[nid], kept[nid][1]))
        for j, alt in enumerate(slots.get(k, []), 1):
            out.append(entry(3, f"{label} {k + 1} — alternate A{j} ({who}, other branch)",
                             alt, role, "alt", "-", mapping[alt], kept[alt][1]))
    if not placed:
        out.append(fork[2])
    trailing = slots.get(len(main), [])
    if trailing:
        out.append(f"## Alternate {plural} after the last main-path {label.lower()}\n\n")
        for j, alt in enumerate(trailing, 1):
            out.append(entry(3, f"Alternate A{j} ({who}, other branch)", alt, role, "alt", "-",
                             mapping[alt], kept[alt][1]))
    return "".join(out)


def write(path, text):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8", newline="\n", errors="surrogatepass") as f:
        f.write(text)


def read(path):
    with open(path, encoding="utf-8", newline="", errors="surrogatepass") as f:
        return f.read()


def expected_hashes(csv_path):
    out = {}
    with open(csv_path, encoding="utf-8-sig", newline="") as f:
        for row in csv.DictReader(f):
            out[os.path.basename(row["Source"].replace("\\", "/"))] = row["SHA256"].upper()
    return out


# ---------------------------------------------------------------- forks
# A "Branch" conversation is a copy of another conversation up to the branch
# point, so it shares message ids with it. Conversations sharing ids form a
# family; the earliest one is the original and each other one is linked to the
# family member whose messages it shares the most (from the start).
def scan(shards, assets):
    """One entry per conversation, in shard/file order."""
    meta = []
    for path in shards:
        base = os.path.basename(path)
        with open(path, encoding="utf-8") as f:
            data = json.load(f)
        used = set()
        for i, conv in enumerate(data, 1):
            m = {"shard": base, "index": i, "name": file_name(conv, used),
                 "ct": conv.get("create_time") or 0,
                 "title": re.sub(r"\s+", " ", str(conv.get("title") or "untitled")).strip(),
                 "main": [], "kept": set()}
            try:
                a = analyse(conv, assets)
                m["main"], m["kept"] = a["main"], set(a["kept"])
            except Exception:
                pass  # reported by run/verify; takes no part in forks
            meta.append(m)
        del data
    return meta


def find_forks(meta):
    owners = {}
    for k, m in enumerate(meta):
        for n in m["kept"]:
            owners.setdefault(n, []).append(k)
    root = list(range(len(meta)))

    def find(x):
        while root[x] != x:
            root[x] = root[root[x]]
            x = root[x]
        return x

    for ks in owners.values():
        for k in ks[1:]:
            root[find(k)] = find(ks[0])
    family = {}
    for k in range(len(meta)):
        family.setdefault(find(k), []).append(k)
    info = [{"parent": None, "shared": 0, "children": []} for _ in meta]
    for members in family.values():
        if len(members) < 2:
            continue
        members.sort(key=lambda k: (meta[k]["ct"], k))
        for pos, k in enumerate(members):
            best, best_n = None, 0
            for c in members[:pos]:
                n = 0
                for nid in meta[k]["main"]:
                    if nid not in meta[c]["kept"]:
                        break
                    n += 1
                if n > best_n:
                    best, best_n = c, n
            if best is not None:
                info[k]["parent"], info[k]["shared"] = best, best_n
                info[best]["children"].append(k)
    return info


def rel_path(a, b):
    if a["shard"] == b["shard"]:
        return b["name"]
    return f"../{os.path.splitext(b['shard'])[0]}/{b['name']}"


def link(a, b):
    return f"[{b['name']}]({quote(rel_path(a, b))})"


def fork_texts(meta, info, k):
    """(header lines, (shared, marker) or None, text used when nothing is new)."""
    m, i = meta[k], info[k]
    lines, marker, none_new = "", None, None
    if i["parent"] is not None:
        lk = link(m, meta[i["parent"]])
        n = i["shared"]
        lines += (f"- branched_from: {lk} — shares the first {n} messages "
                  f"(prompts and replies counted together); this branch's own content "
                  f"starts at message {n + 1}\n")
        marker = (n, f"> — Messages 1–{n} are shared with {lk}. "
                     f"New content in this branch starts here. —\n\n")
        none_new = f"> — Nothing new in this view: everything above is shared with {lk}. —\n\n"
    if i["children"]:
        lines += "- branches: " + "; ".join(
            f"{link(m, meta[c])} (shares {info[c]['shared']})" for c in i["children"]) + "\n"
    return lines, marker, none_new


def write_fork_index(out, meta, info):
    roots = sorted((k for k in range(len(meta))
                    if info[k]["parent"] is None and info[k]["children"]),
                   key=lambda k: (meta[k]["ct"], k))
    body, total = [], [0]

    def walk(k, depth):
        m = meta[k]
        path = quote(f"{os.path.splitext(m['shard'])[0]}/{m['name']}")
        shared = f" — shares {info[k]['shared']} messages with its parent" if depth else ""
        body.append(f"{'  ' * depth}- {m['title']} · [prompts](PROMPTS/{path})"
                    f" · [replies](REPLIES/{path}){shared}\n")
        total[0] += 1
        for c in info[k]["children"]:
            walk(c, depth + 1)

    for k in roots:
        walk(k, 0)
    head = (f"# Fork index\n\n{len(roots)} families, {total[0]} conversations in them "
            f"(of {len(meta)}). The first line of each family is the original; indented "
            f"lines are branches of the line above. Every file still holds all its own "
            f"messages.\n\n")
    write(os.path.join(out, "FORKS.md"), head + "".join(body))


# ---------------------------------------------------------------- commands
def cmd_run(src, out, hashes, overwrite):
    shards = shards_in(src)
    if not shards:
        print(f"no conversations-*.json or conversations.json in {src}")
        return 2
    if os.path.isdir(os.path.join(out, "PROMPTS")) and not overwrite:
        print(f"{out} already has output; pass --overwrite to replace it")
        return 2
    want = expected_hashes(hashes) if hashes else {}
    assets = load_assets(src)
    shas = {}
    for path in shards:
        base = os.path.basename(path)
        shas[path] = sha256_file(path)
        if base in want and want[base] != shas[path]:
            print(f"HASH MISMATCH {base}: expected {want[base]} got {shas[path]}")
            return 2
    print("finding forks (reads every shard once) ...")
    meta = scan(shards, assets)
    info = find_forks(meta)
    kof = {(m["shard"], m["index"]): k for k, m in enumerate(meta)}
    if overwrite:  # only the two folders this tool writes
        for folder in ("PROMPTS", "REPLIES"):
            shutil.rmtree(os.path.join(out, folder), ignore_errors=True)
    rows, log, problems = [], [], 0
    for path in shards:
        base = os.path.basename(path)
        sha = shas[path]
        shard_dir = os.path.splitext(base)[0]
        with open(path, encoding="utf-8") as f:
            data = json.load(f)
        for i, conv in enumerate(data, 1):
            k = kof[(base, i)]
            name = meta[k]["name"]
            ftxt = fork_texts(meta, info, k)
            par = info[k]["parent"]
            row = dict.fromkeys(COLUMNS, "")
            row.update(fork_parent=meta[par]["name"] if par is not None else "",
                       fork_shared_messages=info[k]["shared"] if par is not None else "",
                       fork_branches=len(info[k]["children"]))
            row.update(shard=base, index=i, file=name, source_sha256=sha,
                       conversation_id=conv.get("conversation_id") or conv.get("id"),
                       title=re.sub(r"\s+", " ", str(conv.get("title") or "")).strip())
            try:
                a = analyse(conv, assets)
                for role, folder in (("user", "PROMPTS"), ("assistant", "REPLIES")):
                    write(os.path.join(out, folder, shard_dir, name),
                          render(role, conv, a, base, i, sha, ftxt))
                alt = {r: sum(len(v) for v in a["slots"][r].values()) for r in a["slots"]}
                row.update(message_nodes=a["nodes"],
                           main_prompts=len(a["main_role"]["user"]),
                           main_replies=len(a["main_role"]["assistant"]),
                           alt_prompts=alt["user"], alt_replies=alt["assistant"],
                           skipped_total=sum(a["skipped"].values()),
                           skipped_by_type=json.dumps(dict(sorted(a["skipped"].items()))),
                           status="OK")
            except Exception as e:  # recorded, never silently dropped
                problems += 1
                row["status"] = f"ERROR: {e}"
                log.append(f"{base} #{i} {row['conversation_id']}: {e}")
            rows.append(row)
        print(f"{base}: {len(data)} conversations")
        del data
        if sha256_file(path) != sha:
            print(f"SOURCE CHANGED DURING RUN: {base}")
            return 2
    os.makedirs(out, exist_ok=True)
    with open(os.path.join(out, "manifest.csv"), "w", encoding="utf-8-sig", newline="") as f:
        w = csv.DictWriter(f, fieldnames=COLUMNS)
        w.writeheader()
        w.writerows(rows)
    write_fork_index(out, meta, info)
    write(os.path.join(out, "run.log"),
          f"conversations: {len(rows)}\nproblems: {problems}\n" + "\n".join(log) + "\n")
    print(f"done: {len(rows)} conversations, {problems} problems. Now run: verify")
    return 1 if problems else 0


def cmd_verify(src, out):
    assets = load_assets(src)
    with open(os.path.join(out, "manifest.csv"), encoding="utf-8-sig", newline="") as f:
        rows = list(csv.DictReader(f))
    by_shard = {}
    for r in rows:
        by_shard.setdefault(r["shard"], []).append(r)
    fails = []
    shards = {os.path.basename(p): p for p in shards_in(src)}
    meta = scan(shards_in(src), assets)
    info = find_forks(meta)
    kof = {(m["shard"], m["index"]): k for k, m in enumerate(meta)}
    if not os.path.isfile(os.path.join(out, "FORKS.md")):
        fails.append("FORKS.md missing")
    for base, srows in by_shard.items():
        path = shards.get(base)
        if not path:
            fails.append(f"{base}: shard missing in SRC")
            continue
        if sha256_file(path) != srows[0]["source_sha256"]:
            fails.append(f"{base}: source hash differs from run")
        with open(path, encoding="utf-8") as f:
            data = json.load(f)
        if len(data) != len(srows):
            fails.append(f"{base}: {len(data)} conversations but {len(srows)} manifest rows")
            continue
        shard_dir = os.path.splitext(base)[0]
        for i, conv in enumerate(data, 1):
            k = kof[(base, i)]
            name = meta[k]["name"]
            r = srows[i - 1]
            tag = f"{base} #{i} {name}"
            if r["file"] != name or r["status"] != "OK":
                fails.append(f"{tag}: manifest says {r['file']} / {r['status']}")
                continue
            a = analyse(conv, assets)
            if a["nodes"] != len(a["kept"]) + sum(a["skipped"].values()):
                fails.append(f"{tag}: node count does not add up")
            for role, folder in (("user", "PROMPTS"), ("assistant", "REPLIES")):
                p = os.path.join(out, folder, shard_dir, name)
                if not os.path.isfile(p):
                    fails.append(f"{tag}: missing {folder} file")
                    continue
                found = {}
                for nid, text in ENTRY.findall(read(p)):
                    if nid in found:
                        fails.append(f"{tag}: {folder} duplicate node {nid}")
                    found[nid] = text
                want = {n: t for n, (ro, t) in a["kept"].items() if ro == role}
                if set(found) != set(want):
                    fails.append(f"{tag}: {folder} nodes differ "
                                 f"(missing {len(set(want) - set(found))}, extra {len(set(found) - set(want))})")
                for nid in set(found) & set(want):
                    if found[nid] != want[nid]:
                        fails.append(f"{tag}: {folder} text differs for {nid}")
            par = info[k]["parent"]
            want_parent = meta[par]["name"] if par is not None else ""
            want_shared = str(info[k]["shared"]) if par is not None else ""
            if (r.get("fork_parent", "") != want_parent
                    or str(r.get("fork_shared_messages", "")) != want_shared
                    or str(r.get("fork_branches", "")) != str(len(info[k]["children"]))):
                fails.append(f"{tag}: fork columns differ from source")
            if par is not None:
                pdir = os.path.splitext(meta[par]["shard"])[0]
                for folder in ("PROMPTS", "REPLIES"):
                    own = os.path.join(out, folder, shard_dir, name)
                    if os.path.isfile(own) and f"branched_from: [{want_parent}]" not in read(own):
                        fails.append(f"{tag}: {folder} file lacks its branched_from link")
                    if not os.path.isfile(os.path.join(out, folder, pdir, want_parent)):
                        fails.append(f"{tag}: {folder} parent file {want_parent} missing")
            if (int(r["main_prompts"]) != len(a["main_role"]["user"])
                    or int(r["main_replies"]) != len(a["main_role"]["assistant"])
                    or int(r["skipped_total"]) != sum(a["skipped"].values())):
                fails.append(f"{tag}: manifest counts differ from source")
        del data
        print(f"{base}: checked {len(srows)} conversations")
    write(os.path.join(out, "verify.log"), "\n".join(fails) + ("\n" if fails else "PASS\n"))
    print("PASS" if not fails else f"FAIL: {len(fails)} problems (see verify.log)")
    return 1 if fails else 0


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = ap.add_subparsers(dest="cmd", required=True)
    r = sub.add_parser("run")
    r.add_argument("src")
    r.add_argument("out")
    r.add_argument("--hashes")
    r.add_argument("--overwrite", action="store_true")
    v = sub.add_parser("verify")
    v.add_argument("src")
    v.add_argument("out")
    a = ap.parse_args(argv)
    if a.cmd == "run":
        return cmd_run(a.src, a.out, a.hashes, a.overwrite)
    return cmd_verify(a.src, a.out)


if __name__ == "__main__":
    sys.exit(main())
