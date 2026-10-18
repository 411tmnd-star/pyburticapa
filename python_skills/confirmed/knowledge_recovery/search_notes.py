"""Search a folder of Markdown notes (the cleaned ChatGPT / Claude archive) like notes.

Lexical search, nothing hidden: every hit is a file and the lines that matched. The index
remembers each file's fingerprint (SHA-256 of its bytes), so a refresh tokenizes only the
files that are new or changed and forgets deleted ones. The notes are only read, never
changed; the index (one JSON file) lives in --index, by default output/knowledge_recovery/index
(git-ignored: it holds private text positions).

  python -I -X utf8 search_notes.py "liquid glass" --notes CLEAN_DIR --index IDX    first run builds the index
  python -I -X utf8 search_notes.py "liquid glass" --index IDX                      later runs refresh, then search
  python -I -X utf8 search_notes.py --update-only --notes CLEAN_DIR --index IDX     refresh only

Matching: Unicode folded (accents removed, case ignored), whole words, optional --aliases JSON
{"lg": "liquid glass"} applied to notes and query alike. Ranking: BM25 over the file's words, so a
long conversation does not lose to a short one. --all keeps only files that hold every query word.
Skipped as noise: <!-- ... --> marker lines and the metadata bullets under a file's title.

Exit: 0 hits, 1 no hits, 2 bad input. Standard library only.
"""

import argparse
import hashlib
import json
import math
import os
import re
import sys
import unicodedata
from pathlib import Path

VERSION = 1
K1, B = 1.2, 0.75
SUFFIXES = (".md", ".txt")
DEFAULT_INDEX = Path(__file__).resolve().parents[3] / "output" / "knowledge_recovery" / "index"
META_LINE = re.compile(r"^- [A-Za-z_][A-Za-z0-9_]*:")


class SearchInputError(ValueError):
    pass


def fold(text):
    """Case-fold and strip accents so 'café' and 'CAFE' match."""
    decomposed = unicodedata.normalize("NFKD", text)
    return "".join(c for c in decomposed if not unicodedata.combining(c)).casefold()


def tokens(text, aliases=None):
    out = []
    for w in re.findall(r"\w+", fold(text)):
        out += aliases.get(w, [w]) if aliases else [w]
    return out


def load_aliases(path):
    if not path:
        return {}
    try:
        raw = json.loads(Path(path).read_text(encoding="utf-8"))
    except (OSError, ValueError) as e:
        raise SearchInputError(f"cannot read aliases file {path}: {e}")
    if not isinstance(raw, dict) or any(not isinstance(k, str) or not isinstance(v, str) for k, v in raw.items()):
        raise SearchInputError("aliases must be a JSON object mapping words to words")
    return {fold(k).strip(): re.findall(r"\w+", fold(v)) for k, v in raw.items() if re.findall(r"\w+", fold(k))}


def aliases_fingerprint(aliases):
    return hashlib.sha256(json.dumps(aliases, sort_keys=True).encode("utf-8")).hexdigest()


def indexable_lines(text):
    """Yield (line_number, line) for lines worth indexing: not comment markers, not the metadata block."""
    in_meta = False
    for n, line in enumerate(text.splitlines(), 1):
        s = line.strip()
        if n == 1 and s.startswith("# "):
            in_meta = True
            yield n, line
            continue
        if in_meta:
            if s == "---":
                in_meta = False
                continue
            if not s or META_LINE.match(s):
                continue
            in_meta = False  # real content starts here
        if s.startswith("<!--"):
            continue
        yield n, line


def index_file(data, aliases):
    text = data.decode("utf-8", errors="replace")
    tf, pos, length = {}, {}, 0
    for n, line in indexable_lines(text):
        for w in tokens(line, aliases):
            tf[w] = tf.get(w, 0) + 1
            lines = pos.setdefault(w, [])
            if not lines or lines[-1] != n:
                lines.append(n)
            length += 1
    return {"tf": tf, "pos": pos, "len": length}


def list_notes(notes):
    found = []
    for dirpath, dirnames, filenames in os.walk(notes):
        dirnames.sort()
        for name in sorted(filenames):
            if name.lower().endswith(SUFFIXES):
                found.append(Path(dirpath, name))
    return found


def load_index(index_dir):
    p = Path(index_dir) / "index.json"
    if not p.is_file():
        return None
    try:
        idx = json.loads(p.read_text(encoding="utf-8"))
    except (OSError, ValueError):
        return None
    return idx if isinstance(idx, dict) and idx.get("version") == VERSION and isinstance(idx.get("files"), dict) else None


def save_index(index_dir, idx):
    d = Path(index_dir)
    d.mkdir(parents=True, exist_ok=True)
    tmp = d / "index.json.tmp"
    tmp.write_text(json.dumps(idx, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    os.replace(tmp, d / "index.json")


def refresh(notes, index_dir, aliases):
    """Bring the index up to date. Only new and changed files are tokenized.

    Returns the plan: lists of relative paths under new, changed, touched (same content, new timestamp),
    deleted and unchanged, plus rebuilt (the reason everything was redone, or '')."""
    notes = Path(notes).resolve()
    afp = aliases_fingerprint(aliases)
    idx = load_index(index_dir)
    rebuilt = ""
    if idx is not None and idx.get("notes_root") != str(notes):
        idx, rebuilt = None, "notes folder changed"
    elif idx is not None and idx.get("aliases") != afp:
        idx, rebuilt = None, "aliases changed"
    if idx is None:
        idx = {"version": VERSION, "notes_root": str(notes), "aliases": afp, "files": {}}
    old = idx["files"]
    plan = {"new": [], "changed": [], "touched": [], "deleted": [], "unchanged": [], "rebuilt": rebuilt}
    seen = set()
    for path in list_notes(notes):
        rel = path.relative_to(notes).as_posix()
        seen.add(rel)
        st = path.stat()
        entry = old.get(rel)
        if entry and entry["size"] == st.st_size and entry["mtime_ns"] == st.st_mtime_ns:
            plan["unchanged"].append(rel)
            continue
        data = path.read_bytes()
        sha = hashlib.sha256(data).hexdigest()
        if entry and entry["sha"] == sha:
            entry["size"], entry["mtime_ns"] = st.st_size, st.st_mtime_ns
            plan["touched"].append(rel)
            continue
        old[rel] = {"sha": sha, "size": st.st_size, "mtime_ns": st.st_mtime_ns, **index_file(data, aliases)}
        plan["changed" if entry else "new"].append(rel)
    for rel in sorted(set(old) - seen):
        del old[rel]
        plan["deleted"].append(rel)
    if plan["new"] or plan["changed"] or plan["touched"] or plan["deleted"] or rebuilt or not (Path(index_dir) / "index.json").is_file():
        save_index(index_dir, idx)
    return plan


def rank(idx, query_terms, require_all=False):
    """BM25 over the indexed files. Returns [(score, rel, matched_terms)] best first."""
    files = idx["files"]
    n = len(files)
    if not n or not query_terms:
        return []
    avg = (sum(f["len"] for f in files.values()) / n) or 1.0
    df = {t: sum(1 for f in files.values() if t in f["tf"]) for t in query_terms}
    idf = {t: math.log(1 + (n - df[t] + 0.5) / (df[t] + 0.5)) for t in query_terms}
    out = []
    for rel, f in files.items():
        matched = [t for t in query_terms if t in f["tf"]]
        if not matched or (require_all and len(matched) != len(query_terms)):
            continue
        score = 0.0
        for t in matched:
            tf = f["tf"][t]
            score += idf[t] * tf * (K1 + 1) / (tf + K1 * (1 - B + B * f["len"] / avg))
        out.append((round(score, 4), rel, matched))
    return sorted(out, key=lambda r: (-r[0], r[1]))


def best_lines(entry, matched, how_many):
    """Line numbers holding the most distinct matched words, then the earliest."""
    per_line = {}
    for t in matched:
        for ln in entry["pos"].get(t, ()):
            per_line.setdefault(ln, set()).add(t)
    ranked = sorted(per_line.items(), key=lambda kv: (-len(kv[1]), kv[0]))[:how_many]
    return sorted(ln for ln, _ in ranked)


def snippet(line, matched, width=160):
    s = " ".join(line.split())
    if len(s) <= width:
        return s
    low = s.lower()
    at = min((low.find(t) for t in matched if low.find(t) >= 0), default=0)
    start = max(0, at - 60)
    return ("..." if start else "") + s[start:start + width] + ("..." if start + width < len(s) else "")


def search(index_dir, query, aliases, limit=5, lines=3, require_all=False):
    idx = load_index(index_dir)
    if idx is None:
        raise SearchInputError(f"no index in {index_dir}; run with --notes DIR first")
    terms = list(dict.fromkeys(tokens(query, aliases)))
    known = {t for f in idx["files"].values() for t in f["tf"]}
    results = []
    root = Path(idx["notes_root"])
    ranked = rank(idx, terms, require_all)
    for score, rel, matched in ranked[:limit]:
        entry = idx["files"][rel]
        wanted = best_lines(entry, matched, lines)
        text_lines, stale = {}, False
        try:
            data = (root / rel).read_bytes()
            stale = hashlib.sha256(data).hexdigest() != entry["sha"]
            for n, line in enumerate(data.decode("utf-8", errors="replace").splitlines(), 1):
                if n in wanted:
                    text_lines[n] = snippet(line, matched)
        except OSError:
            stale = True
        results.append({"file": rel, "score": score, "matched": matched, "changed_since_indexed": stale,
                        "lines": [{"line": n, "text": text_lines.get(n, "")} for n in wanted]})
    return {"terms": terms, "not_in_index": [t for t in terms if t not in known], "files_indexed": len(idx["files"]),
            "total_matching_files": len(ranked), "results": results}


def describe(plan):
    parts = [f"{len(plan['new'])} new", f"{len(plan['changed'])} changed", f"{len(plan['touched'])} touched",
             f"{len(plan['deleted'])} deleted", f"{len(plan['unchanged'])} unchanged"]
    head = "refresh: " + ", ".join(parts) + (f" (rebuilt everything: {plan['rebuilt']})" if plan["rebuilt"] else "")
    detail = [f"  {k}: {p}" for k in ("new", "changed", "deleted") for p in plan[k][:10]]
    return "\n".join([head, *detail])


def main(argv=None):
    ap = argparse.ArgumentParser(description="Search Markdown notes with a content-fingerprinted index.")
    ap.add_argument("query", nargs="?", help="words to search for")
    ap.add_argument("--notes", help="folder of .md/.txt notes (needed on the first run; remembered in the index)")
    ap.add_argument("--index", default=str(DEFAULT_INDEX), help="folder that holds index.json")
    ap.add_argument("--aliases", help='JSON object {"alias": "words it stands for"}')
    ap.add_argument("--limit", type=int, default=5, help="files to show (default 5)")
    ap.add_argument("--lines", type=int, default=3, help="matching lines to show per file (default 3)")
    ap.add_argument("--all", action="store_true", help="only files that hold every query word")
    ap.add_argument("--no-refresh", action="store_true", help="search the index as it is, without re-reading the notes")
    ap.add_argument("--update-only", action="store_true", help="refresh the index and stop")
    ap.add_argument("--json", action="store_true", help="print results as JSON")
    args = ap.parse_args(argv)
    try:
        if args.limit < 1 or args.lines < 1:
            raise SearchInputError("--limit and --lines must be at least 1")
        if not args.query and not args.update_only:
            raise SearchInputError("give a query, or --update-only")
        aliases = load_aliases(args.aliases)
        plan = None
        if not args.no_refresh:
            notes = args.notes
            if not notes:
                idx = load_index(args.index)
                notes = idx["notes_root"] if idx else None
            if not notes:
                raise SearchInputError("no index yet: give --notes DIR for the first run")
            if not Path(notes).is_dir():
                raise SearchInputError(f"{notes} is not a folder")
            plan = refresh(notes, args.index, aliases)
        if args.update_only:
            print(describe(plan) if plan else "nothing to do (--no-refresh)")
            return 0
        res = search(args.index, args.query, aliases, args.limit, args.lines, args.all)
    except (SearchInputError, OSError) as e:
        print(f"search_notes: {e}", file=sys.stderr)
        return 2
    if args.json:
        print(json.dumps({"refresh": plan, **res}, indent=2, ensure_ascii=False))
        return 0 if res["results"] else 1
    print(f"query: {args.query} -> words: {', '.join(res['terms']) or '(none)'}" + (" (all required)" if args.all else ""))
    if res["not_in_index"]:
        print("not in any note: " + ", ".join(res["not_in_index"]))
    if plan:
        print(f"index: {res['files_indexed']} file(s); {describe(plan).splitlines()[0]}")
    for i, r in enumerate(res["results"], 1):
        flag = "   [file changed since it was indexed]" if r["changed_since_indexed"] else ""
        print(f"{i}. {r['file']}   score {r['score']}   matched: {', '.join(r['matched'])}{flag}")
        for ln in r["lines"]:
            print(f"   L{ln['line']}: {ln['text']}")
    if not res["results"]:
        print("no hits")
        return 1
    print(f"{len(res['results'])} of {res['total_matching_files']} matching file(s) shown")
    return 0


if __name__ == "__main__":
    sys.exit(main())
