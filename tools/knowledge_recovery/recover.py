"""Knowledge recovery over the cleaned ChatGPT archive: SQLite + FTS5, message level, source-traceable.

Run with:  python -I -X utf8 recover.py <command> ...

  ingest [--archive DIR]                 build knowledge.db from DIR\\PROMPTS and DIR\\REPLIES (replaces the old db)
  check                                  verify the database against the archive's own counts
  search SUBJECT [--limit N]             ranked unique messages with provenance
  terms SUBJECT [--top N]                words that travel with the subject, and the spellings found
  domain SUBJECT [--broad-related]       which electricity/hardware terms find what (to prune aliases.json)
  dossier SUBJECT [--excerpt N] ...      write the grouped Markdown dossier, full-text files and an evidence CSV
  conflicts                              show nodes whose text differs between files
  exclusions                             show which conversations are excluded and why

Reads the archive and the database only; writes only knowledge.db and the dossier files under output\\knowledge_recovery.
Standard library only.
"""
import argparse
import json
import os
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))  # -I removes the script folder from sys.path

from dossier import write_dossier  # noqa: E402
from ingest import ENTRY, ingest  # noqa: E402
from search import (excluded_words, load_aliases, plan_query, related_search, run_search, terms_report)  # noqa: E402
from store import (DEFAULT_ARCHIVE, DEFAULT_DB, DEFAULT_OUT, EXCLUDE_FILE, connect, require_fts5)  # noqa: E402


def one_line(s, n=240):
    s = " ".join((s or "").split())
    return s if len(s) <= n else s[:n] + " ..."


def show_plan(plan):
    print(f"phrases: {', '.join(plan['phrases']) or '-'}")
    print("terms:   " + ", ".join(f"{t} ({d})" for t, d in plan["singles"].items()))
    if plan["expansions"]:
        print("found in the archive vocabulary (check these):")
        for t, d, why in plan["expansions"][:25]:
            print(f"   {t:<30} {d:>6} messages   {why}")


def cmd_check(db):
    require_fts5()
    con = connect(db, write=True)        # integrity-check is an INSERT command; it changes nothing
    meta = {k: json.loads(v) for k, v in con.execute("SELECT key, value FROM meta")}
    fails, ok = [], []

    def test(name, good, detail=""):
        (ok if good else fails).append(f"{name}{(': ' + str(detail)) if detail else ''}")

    n_nodes = con.execute("SELECT COUNT(*) FROM messages").fetchone()[0]
    n_occ = con.execute("SELECT COUNT(*) FROM occurrences").fetchone()[0]
    test("unique nodes recorded", n_nodes == meta["unique_nodes"], n_nodes)
    test("every parsed entry is an occurrence or a counted duplicate",
         meta["entries_parsed"] == n_occ + meta["duplicate_occurrences_ignored"],
         f"{meta['entries_parsed']} parsed = {n_occ} occurrences + {meta['duplicate_occurrences_ignored']} duplicates")
    orphans = con.execute("SELECT COUNT(*) FROM occurrences o LEFT JOIN messages m ON m.node_id = o.node_id"
                          " WHERE m.node_id IS NULL").fetchone()[0]
    test("no occurrence without a message", orphans == 0, orphans)
    unused = con.execute("SELECT COUNT(*) FROM messages m WHERE NOT EXISTS"
                         " (SELECT 1 FROM occurrences o WHERE o.node_id = m.node_id)").fetchone()[0]
    test("no message without an occurrence", unused == 0, unused)
    try:
        by_kind = dict(con.execute("SELECT kind, COUNT(*) FROM conflicts GROUP BY kind").fetchall())
    except Exception:
        by_kind = None
        fails.append("conflicts table has no 'kind' column: run ingest again with the current scripts")
    if by_kind is not None:
        test("no node with two different texts (content)", by_kind.get("content", 0) == 0, by_kind.get("content", 0))
        if by_kind.get("whitespace"):
            ok.append(f"{by_kind['whitespace']} whitespace-only variant(s) of a node kept in the conflicts table "
                      "(run: recover.py conflicts)")
    test("no ingest problems", con.execute("SELECT COUNT(*) FROM problems").fetchone()[0] == 0)
    n_conv = con.execute("SELECT COUNT(*) FROM conversations").fetchone()[0]
    test("two files per conversation", meta["files"] == 2 * n_conv, f"{meta['files']} files, {n_conv} conversations")
    nofam = con.execute("SELECT COUNT(*) FROM conversations WHERE family_id IS NULL").fetchone()[0]
    test("every conversation has a family", nofam == 0, nofam)
    if meta.get("manifest_expected_entries") is not None:
        test("entries parsed equal the archive manifest total",
             meta["manifest_expected_entries"] == meta["entries_parsed"],
             f"manifest {meta['manifest_expected_entries']}, parsed {meta['entries_parsed']}")
        test("conversations equal manifest rows", meta["manifest_rows"] == n_conv,
             f"manifest {meta['manifest_rows']}, db {n_conv}")
    else:
        ok.append("manifest.csv not found in the archive: manifest totals not compared")
    try:
        con.execute("INSERT INTO messages_fts(messages_fts, rank) VALUES('integrity-check', 1)")
        ok.append("FTS5 index matches the messages table")
    except Exception as e:
        fails.append(f"FTS5 integrity-check: {e}")
    con.close()
    for line in ok:
        print("PASS ", line)
    for line in fails:
        print("FAIL ", line)
    print("PASS" if not fails else f"FAIL ({len(fails)} checks)")
    return 1 if fails else 0


def cmd_search(db, subject, limit, include_excluded):
    con = connect(db)
    plan = plan_query(con, subject, load_aliases())
    show_plan(plan)
    hits, dropped = run_search(con, plan, include_excluded, limit)
    print(f"\n{len(hits)} unique messages shown (dropped as excluded: {dropped})\n")
    for h in hits:
        r = h["rep"]
        print(f"[{(h['time'] or '')[:10]}] {h['role']:<9} {one_line(r['title'], 60)}")
        print(f"    node {h['node_id']}  conv {r['conv_id']}  seq {r['seq']}  {r['branch']}  in {len(h['occs'])} file(s)")
        print(f"    {one_line(h['text'])}")
    return 0


def cmd_terms(db, subject, top, include_excluded):
    con = connect(db)
    plan = plan_query(con, subject, load_aliases())
    show_plan(plan)
    hits, dropped = run_search(con, plan, include_excluded)
    by_count, by_lift = terms_report(con, hits, top, exclude=excluded_words(plan))
    print(f"\n{len(hits)} unique matching messages. Counts are messages, not occurrences.\n")
    print(f"Most frequent words in those messages:\n{'word':<24}{'in hits':>9}{'in archive':>12}")
    for r in by_count:
        print(f"{r['term']:<24}{r['in_hits']:>9}{r['in_archive']:>12}")
    print(f"\nWords most specific to them (lift over the whole archive, archive count >= 5):\n"
          f"{'word':<24}{'in hits':>9}{'in archive':>12}{'lift':>8}")
    for r in by_lift:
        print(f"{r['term']:<24}{r['in_hits']:>9}{r['in_archive']:>12}{r['lift']:>8.1f}")
    return 0


def get_related(con, plan, hits, include_excluded, broad):
    return related_search(con, plan["entry"], {h["node_id"] for h in hits}, include_excluded, broad)


def cmd_domain(db, subject, include_excluded, broad, examples):
    """Show which domain terms find what, so the lists in aliases.json can be pruned."""
    con = connect(db)
    plan = plan_query(con, subject, load_aliases())
    hits, _ = run_search(con, plan, include_excluded)
    rel = get_related(con, plan, hits, include_excluded, broad)
    print(f"{len(hits)} direct hits; {rel['total']} related messages without the name "
          f"(dropped as excluded: {rel['dropped']}){' [broad: weak terms count]' if broad else ''}\n")
    print(f"{'term':<26}{'messages':>9}{'also direct hits':>18}")
    for t, n, k in rel["table"]:
        print(f"{t:<26}{n:>9}{k:>18}")
    print("\nA term with many messages and few direct hits pulls in other topics: remove it from aliases.json "
          "(domain_terms) or move it to 'weak'.")
    if examples:
        titles = {}
        for r in rel["rows"]:
            name = one_line(r["rep"]["title"], 60)
            for t in r["matched_strong"] + (r["matched_weak"] if broad else []):
                titles.setdefault(t, {})
                titles[t][name] = titles[t].get(name, 0) + 1
        print("\nConversations behind each term (related messages only):")
        for t, n, k in rel["table"]:
            top = sorted(titles.get(t, {}).items(), key=lambda kv: -kv[1])[:examples]
            print(f"  {t}: " + "; ".join(f"{name} ({c})" for name, c in top))
    return 0


def cmd_dossier(db, subject, out, context, min_hits, excerpt, include_excluded, max_hits, max_related, no_related, broad):
    con = connect(db)
    plan = plan_query(con, subject, load_aliases())
    show_plan(plan)
    hits, dropped = run_search(con, plan, include_excluded, max_hits + 1)
    if len(hits) > max_hits:
        print(f"\n{len(hits)}+ matches: too broad for a dossier (limit {max_hits}). Narrow the subject or raise --max-hits.")
        return 2
    related = None
    if not no_related:
        related = get_related(con, plan, hits, include_excluded, broad)
        related["rows"] = related["rows"][:max_related]
    md, csv_path, n_hit, n_ctx, n_rel = write_dossier(con, subject, plan, hits, dropped, out, context, min_hits,
                                                      excerpt, include_excluded, db, related)
    print(f"\n{n_hit} hit + {n_ctx} context + {n_rel} related messages (dropped as excluded: {dropped})")
    print(f"dossier: {md}\nevidence: {csv_path}")
    return 0


def cmd_conflicts(db):
    """Nodes whose text differs between files: the stored text, each variant, and where they first differ."""
    con = connect(db)
    try:
        rows = con.execute("SELECT node_id, conv_id, file_path, kind, text FROM conflicts ORDER BY node_id, file_path").fetchall()
    except Exception:
        print("this database was built before variants were stored: run ingest again")
        return 1
    print(f"{len(rows)} variant(s) of an already stored node; the database searches the first text it saw")
    for r in rows:
        stored = con.execute("SELECT text, role FROM messages WHERE node_id = ?", (r["node_id"],)).fetchone()
        a, b = stored["text"], r["text"]
        i = next((k for k in range(min(len(a), len(b))) if a[k] != b[k]), min(len(a), len(b)))
        print(f"\nnode {r['node_id']}  role {stored['role']}  kind: {r['kind']}")
        print(f"  variant in: {r['file_path']}")
        for o in con.execute("SELECT file_path, branch, seq FROM occurrences WHERE node_id = ? ORDER BY file_path",
                             (r["node_id"],)):
            print(f"  node is in: {o['file_path']}  ({o['branch']}, seq {o['seq']})")
        print(f"  stored length {len(a)}, variant length {len(b)}, first difference at character {i}")
        print(f"  stored:  {a[max(0, i - 30):i + 60]!r}")
        print(f"  variant: {b[max(0, i - 30):i + 60]!r}")
    return 0


def cmd_exclusions(db):
    con = connect(db)
    rows = con.execute("SELECT conv_id, title, exclude_reason, family_id FROM conversations WHERE excluded = 1"
                       " ORDER BY created").fetchall()
    print(f"{len(rows)} conversations excluded (rules: {EXCLUDE_FILE})")
    for r in rows:
        mates = con.execute("SELECT COUNT(*) FROM conversations WHERE family_id = ? AND excluded = 0",
                            (r["family_id"],)).fetchone()[0]
        print(f"  {r['conv_id']}  {one_line(r['title'], 70)}\n      {r['exclude_reason']}; "
              f"{mates} family member(s) NOT excluded")
    return 0


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--db", default=DEFAULT_DB)
    sub = ap.add_subparsers(dest="cmd", required=True)
    p = sub.add_parser("ingest")
    p.add_argument("--archive", default=DEFAULT_ARCHIVE)
    sub.add_parser("check")
    for name in ("search", "terms", "dossier", "domain"):
        p = sub.add_parser(name)
        p.add_argument("subject")
        p.add_argument("--include-excluded", action="store_true")
        if name == "domain":
            p.add_argument("--examples", type=int, default=0, help="list this many conversation titles per term")
        if name in ("dossier", "domain"):
            p.add_argument("--broad-related", action="store_true",
                           help="also treat messages with 3+ different weak domain terms as related")
        if name == "search":
            p.add_argument("--limit", type=int, default=20)
        if name == "terms":
            p.add_argument("--top", type=int, default=40)
        if name == "dossier":
            p.add_argument("--out", default=DEFAULT_OUT)
            p.add_argument("--context", type=int, default=1, help="neighbouring messages kept each side (0 = none)")
            p.add_argument("--min-hits", type=int, default=3, help="hits a family needs before context is added")
            p.add_argument("--excerpt", type=int, default=700,
                           help="characters shown per message around the match (0 = whole text inline)")
            p.add_argument("--max-hits", type=int, default=20000)
            p.add_argument("--max-related", type=int, default=500, help="most related messages to list")
            p.add_argument("--no-related", action="store_true", help="skip the related-by-domain-terms section")
    sub.add_parser("exclusions")
    sub.add_parser("conflicts")
    a = ap.parse_args(argv)
    if a.cmd == "ingest":
        return ingest(a.archive, a.db, EXCLUDE_FILE)
    require_fts5()
    if a.cmd == "check":
        return cmd_check(a.db)
    if a.cmd == "search":
        return cmd_search(a.db, a.subject, a.limit, a.include_excluded)
    if a.cmd == "terms":
        return cmd_terms(a.db, a.subject, a.top, a.include_excluded)
    if a.cmd == "dossier":
        return cmd_dossier(a.db, a.subject, a.out, a.context, a.min_hits, a.excerpt, a.include_excluded, a.max_hits,
                           a.max_related, a.no_related, a.broad_related)
    if a.cmd == "domain":
        return cmd_domain(a.db, a.subject, a.include_excluded, a.broad_related, a.examples)
    if a.cmd == "conflicts":
        return cmd_conflicts(a.db)
    return cmd_exclusions(a.db)


if __name__ == "__main__":
    sys.exit(main())
