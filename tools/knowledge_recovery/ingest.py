"""Clean Markdown archive (PROMPTS/ and REPLIES/) -> knowledge.db. Reads the archive only.

Builds into knowledge.db.tmp and replaces knowledge.db only if the build finishes, so there are never stale rows.
"""
import csv
import json
import os
import re
import sys

from store import SCHEMA, connect, require_fts5, sha1

ENTRY = re.compile(r"<!-- NODE (\S+) ([^\n]*?) -->\n(.*?)\n<!-- END \1 -->", re.S)
ATTR = re.compile(r"(\w+)=(\S+)")
HEADER_END = "\n---\n"
VIEWS = (("prompts", "PROMPTS", "user"), ("replies", "REPLIES", "assistant"))


def read_file(path):
    with open(path, encoding="utf-8", newline="", errors="surrogatepass") as f:
        return f.read()


def clean(text):
    """SQLite cannot store lone surrogates. Returns (text, changed)."""
    try:
        text.encode("utf-8")
        return text, False
    except UnicodeEncodeError:
        return text.encode("utf-8", "surrogatepass").decode("utf-8", "replace"), True


def split_header(text):
    i = text.find(HEADER_END)
    head, body = (text, "") if i < 0 else (text[:i], text[i + len(HEADER_END):])
    meta = {}
    for line in head.splitlines():
        m = re.match(r"- (\w+): (.*)$", line)
        if m:
            meta[m.group(1)] = m.group(2).strip()
    first = head.lstrip().splitlines()[0] if head.strip() else ""
    title = first[2:].strip() if first.startswith("# ") else ""
    return title, meta, body


def load_exclusions(path):
    if not os.path.isfile(path):
        return {"title_contains": [], "conversation_ids": []}
    with open(path, encoding="utf-8") as f:
        cfg = json.load(f)
    cfg.setdefault("title_contains", [])
    cfg.setdefault("conversation_ids", [])
    return cfg


def apply_exclusions(con, cfg):
    """Mark conversations excluded by title substring (case-insensitive) or id. Returns the number excluded."""
    con.execute("UPDATE conversations SET excluded = 0, exclude_reason = NULL")
    pats = [p.lower() for p in cfg["title_contains"] if p.strip()]
    ids = set(cfg["conversation_ids"])
    n = 0
    for conv_id, title in con.execute("SELECT conv_id, title FROM conversations").fetchall():
        reason = None
        if conv_id in ids:
            reason = "conversation_id listed in exclude.json"
        else:
            for p in pats:
                if p in (title or "").lower():
                    reason = f"title contains {p!r}"
                    break
        if reason:
            con.execute("UPDATE conversations SET excluded = 1, exclude_reason = ? WHERE conv_id = ?",
                        (reason, conv_id))
            n += 1
    return n


def build_families(con):
    """Conversations that share a node_id are one family; the label is the earliest member."""
    created = {r[0]: (r[1] or "~", r[0]) for r in con.execute("SELECT conv_id, created FROM conversations")}
    parent = {c: c for c in created}

    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x

    last_node, first_conv = None, None
    for node_id, conv_id in con.execute("SELECT node_id, conv_id FROM occurrences ORDER BY node_id"):
        if node_id == last_node:
            a, b = find(first_conv), find(conv_id)
            if a != b:
                parent[b] = a
        else:
            last_node, first_conv = node_id, conv_id
    groups = {}
    for c in created:
        groups.setdefault(find(c), []).append(c)
    for members in groups.values():
        label = min(members, key=lambda c: created[c])
        con.executemany("UPDATE conversations SET family_id = ? WHERE conv_id = ?",
                        [(label, c) for c in members])
    return len(groups), sum(1 for m in groups.values() if len(m) > 1)


def manifest_expected(archive):
    """Total message entries the archive should hold according to its manifest.csv (None if absent)."""
    path = os.path.join(archive, "manifest.csv")
    if not os.path.isfile(path):
        return None, None
    total = rows = 0
    with open(path, encoding="utf-8-sig", newline="") as f:
        for r in csv.DictReader(f):
            rows += 1
            for c in ("main_prompts", "main_replies", "alt_prompts", "alt_replies"):
                total += int(r.get(c) or 0)
    return total, rows


def ingest(archive, db_path, exclude_path):
    require_fts5()
    for _, folder, _ in VIEWS:
        if not os.path.isdir(os.path.join(archive, folder)):
            raise SystemExit(f"{archive} has no {folder} folder; pass --archive <clean output folder>")
    tmp = db_path + ".tmp"
    if os.path.exists(tmp):
        os.remove(tmp)
    con = connect(tmp, write=True)
    con.executescript(SCHEMA)

    seen_hash = {}                      # node_id -> text_hash of the stored text
    seen_norm = {}                      # node_id -> hash of the stored text with whitespace collapsed
    files = entries = dup_occ = conflicts = conflicts_content = sanitized = 0
    for view, folder, expected_role in VIEWS:
        root = os.path.join(archive, folder)
        for shard in sorted(os.listdir(root)):
            sdir = os.path.join(root, shard)
            if not os.path.isdir(sdir):
                continue
            for name in sorted(os.listdir(sdir)):
                if not name.lower().endswith(".md"):
                    continue
                rel = f"{folder}/{shard}/{name}"
                text = read_file(os.path.join(sdir, name))
                title, meta, body = split_header(text)
                files += 1
                conv_id = meta.get("conversation_id")
                if not conv_id:
                    con.execute("INSERT INTO problems VALUES (?, ?)", (rel, "no conversation_id in header"))
                    continue
                con.execute("INSERT OR IGNORE INTO conversations (conv_id, title, created, updated, model, source_file)"
                            " VALUES (?, ?, ?, ?, ?, ?)",
                            (conv_id, title, meta.get("created"), meta.get("updated"), meta.get("model"),
                             meta.get("source_file")))
                found = ENTRY.findall(body)
                if len(found) != body.count("<!-- NODE "):
                    con.execute("INSERT INTO problems VALUES (?, ?)",
                                (rel, f"{body.count('<!-- NODE ')} NODE markers but {len(found)} parsed entries"))
                new_msgs, occs = [], []
                for node_id, attrs, msg in found:
                    entries += 1
                    a = dict(ATTR.findall(attrs))
                    role = a.get("role", "")
                    if role != expected_role:
                        con.execute("INSERT INTO problems VALUES (?, ?)",
                                    (rel, f"node {node_id}: role {role!r} in {folder}"))
                    msg, changed = clean(msg)
                    sanitized += changed
                    h = sha1(msg)
                    norm = sha1(" ".join(msg.split()))
                    if node_id not in seen_hash:
                        seen_hash[node_id], seen_norm[node_id] = h, norm
                        parent_node = a.get("parent")
                        new_msgs.append((node_id, role, msg, h, a.get("time"),
                                         None if parent_node in (None, "None") else parent_node))
                    elif seen_hash[node_id] != h:
                        # same node, different text in another file: keep the variant so nothing is lost
                        conflicts += 1
                        kind = "whitespace" if seen_norm[node_id] == norm else "content"
                        conflicts_content += kind == "content"
                        con.execute("INSERT INTO conflicts VALUES (?, ?, ?, ?, ?, ?)",
                                    (node_id, conv_id, rel, h, kind, msg))
                    seq = a.get("seq", "-")
                    occs.append((node_id, conv_id, view, int(seq) if seq.isdigit() else None,
                                 a.get("branch", "main"), rel))
                con.executemany("INSERT INTO messages (node_id, role, text, text_hash, time, parent_node)"
                                " VALUES (?, ?, ?, ?, ?, ?)", new_msgs)
                for o in occs:
                    cur = con.execute("INSERT OR IGNORE INTO occurrences VALUES (?, ?, ?, ?, ?, ?)", o)
                    dup_occ += cur.rowcount == 0
        print(f"{folder}: read")

    families, multi = build_families(con)
    excluded = apply_exclusions(con, load_exclusions(exclude_path))
    # FTS5 external-content index: rebuild and optimize with the documented commands (never plain DELETE).
    con.execute("INSERT INTO messages_fts(messages_fts) VALUES('rebuild')")
    con.execute("INSERT INTO messages_fts(messages_fts) VALUES('optimize')")
    unique = con.execute("SELECT COUNT(*) FROM messages").fetchone()[0]
    expected, manifest_rows = manifest_expected(archive)
    stats = {"archive": os.path.abspath(archive), "files": files, "entries_parsed": entries,
             "unique_nodes": unique, "duplicate_occurrences_ignored": dup_occ, "text_conflicts": conflicts,
             "text_conflicts_content": conflicts_content,
             "sanitized_texts": sanitized, "families": families, "families_with_branches": multi,
             "excluded_conversations": excluded, "manifest_expected_entries": expected,
             "manifest_rows": manifest_rows}
    con.executemany("INSERT INTO meta VALUES (?, ?)", [(k, json.dumps(v)) for k, v in stats.items()])
    con.commit()
    problems = con.execute("SELECT COUNT(*) FROM problems").fetchone()[0]
    con.close()
    os.replace(tmp, db_path)
    for k, v in stats.items():
        print(f"  {k}: {v}")
    print(f"  problems: {problems}")
    if expected is not None and expected != entries:
        print(f"  WARNING: manifest expects {expected} entries but {entries} were parsed")
    return 1 if (problems or conflicts_content or (expected is not None and expected != entries)) else 0
