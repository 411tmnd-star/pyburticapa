"""Subject search over knowledge.db: alias + vocabulary expansion, FTS5 ranking, family scoring, neighbours."""
import json
import os
import re
from collections import Counter

from store import ALIASES_FILE, chunks, tokens

STOP = set("""the and for with that this from are was were you your have has had not but can will would should could
there their them then than what when where which who how why all any also into out about over under more most some such
just like get got use used using make made need want one two its it's i'm don't isn't let us our we they she him her his
yes no ok okay please thanks thank here now still very much many each other another only same new old good best""".split())


def load_aliases(path=ALIASES_FILE):
    if not os.path.isfile(path):
        return {}
    with open(path, encoding="utf-8") as f:
        return json.load(f)


def norm(text):
    return " ".join(tokens(text))


def resolve_subject(subject, aliases):
    """Return the alias entry whose canonical name or variants equal the subject, else a plain entry."""
    key = norm(subject)
    for entry in aliases.values():
        names = [entry.get("canonical", "")] + list(entry.get("variants", []))
        if key in {norm(n) for n in names}:
            return entry
    return {"canonical": subject, "variants": [], "reject_terms": [], "topics": {}}


def within_one(a, b):
    """True if a and b differ by at most one insertion, deletion, substitution or adjacent swap."""
    if a == b:
        return True
    la, lb = len(a), len(b)
    if abs(la - lb) > 1:
        return False
    if la == lb:
        diff = [i for i in range(la) if a[i] != b[i]]
        if len(diff) == 1:
            return True
        return len(diff) == 2 and diff[1] == diff[0] + 1 and a[diff[0]] == b[diff[1]] and a[diff[1]] == b[diff[0]]
    if la > lb:
        a, b = b, a
    i = 0
    while i < len(a) and a[i] == b[i]:
        i += 1
    return a[i:] == b[i + 1:]


_vocab_cache = {}


def vocabulary(con):
    key = id(con)
    if key not in _vocab_cache:
        _vocab_cache[key] = {t: d for t, d in con.execute("SELECT term, doc FROM messages_vocab")}
    return _vocab_cache[key]


def plan_query(con, subject, aliases):
    """Work out what to search for. Returns a dict describing phrases, single terms and why each was added."""
    entry = resolve_subject(subject, aliases)
    names = [entry.get("canonical", subject)] + list(entry.get("variants", []))
    if norm(subject) not in {norm(n) for n in names}:
        names.append(subject)
    reject = {r.lower() for r in entry.get("reject_terms", [])}
    phrases, singles = {}, {}                       # tuple/str -> reason
    for n in names:
        toks = tokens(n)
        if not toks:
            continue
        if len(toks) > 1:
            phrases[tuple(toks)] = "listed name"
            singles["".join(toks)] = "listed name, joined"
        else:
            singles[toks[0]] = "listed name"
    vocab = vocabulary(con)
    expansions = []
    for form in [f for f in singles if len(f) >= 6]:
        for term, doc in vocab.items():
            if term in singles or term in reject:
                continue
            if form in term:
                singles[term] = f"contains {form!r}"
                expansions.append((term, doc, f"contains {form!r}"))
            elif within_one(form, term):
                singles[term] = f"one edit from {form!r}"
                expansions.append((term, doc, f"one edit from {form!r}"))
    match = " OR ".join([f'"{" ".join(p)}"' for p in phrases] + [f'"{s}"' for s in singles])
    if not match:
        raise SystemExit("nothing searchable in that subject")
    present = {s: vocab.get(s, 0) for s in singles}
    return {"entry": entry, "phrases": [" ".join(p) for p in phrases], "singles": present,
            "expansions": sorted(expansions, key=lambda e: -e[1]), "match": match, "reject": sorted(reject)}


def occurrences_for(con, node_ids):
    out = {}
    for part in chunks(node_ids):
        marks = ",".join("?" * len(part))
        rows = con.execute(
            "SELECT o.node_id, o.conv_id, o.view, o.seq, o.branch, o.file_path, c.title, c.created, c.family_id, c.excluded"
            f" FROM occurrences o JOIN conversations c ON c.conv_id = o.conv_id WHERE o.node_id IN ({marks})", part)
        for r in rows:
            out.setdefault(r["node_id"], []).append(dict(r))
    return out


def pick_rep(occs, include_excluded=False):
    pool = occs if include_excluded else [o for o in occs if not o["excluded"]]
    if not pool:
        return None
    return sorted(pool, key=lambda o: (o["branch"] != "main", o["created"] or "~", o["conv_id"]))[0]


def run_search(con, plan, include_excluded=False, limit=None):
    sql = ("SELECT m.id, m.node_id, m.role, m.text, m.time, bm25(messages_fts) AS score"
           " FROM messages_fts JOIN messages m ON m.id = messages_fts.rowid"
           " WHERE messages_fts MATCH ? ORDER BY score")
    args = [plan["match"]]
    if limit:
        sql += " LIMIT ?"
        args.append(limit)
    rows = [dict(r) for r in con.execute(sql, args)]
    occ = occurrences_for(con, [r["node_id"] for r in rows])
    hits, dropped = [], 0
    for r in rows:
        rep = pick_rep(occ.get(r["node_id"], []), include_excluded)
        if rep is None:
            dropped += 1
            continue
        r["occs"], r["rep"] = occ[r["node_id"]], rep
        hits.append(r)
    return hits, dropped


def family_scores(hits, include_excluded=False):
    """family_id -> {'nodes': hit node_ids, 'convs': conversations holding a hit, 'created': their creation times,
    'title': title of the earliest conversation seen}."""
    fams = {}
    for h in hits:
        for o in h["occs"]:
            if o["excluded"] and not include_excluded:
                continue
            f = fams.setdefault(o["family_id"], {"nodes": set(), "convs": set(), "created": [], "title": None,
                                                 "first": "~"})
            f["nodes"].add(h["node_id"])
            f["convs"].add(o["conv_id"])
            f["created"].append(o["created"] or "")
            if (o["created"] or "~") < f["first"] or f["title"] is None:
                f["first"], f["title"] = o["created"] or "~", o["title"]
    return fams


def neighbours(con, conv_id, seq, k):
    """Main-path messages of one conversation within k positions of seq (prompts and replies interleaved)."""
    rows = con.execute(
        "SELECT m.id, m.node_id, m.role, m.text, m.time, o.seq, o.conv_id, o.view, o.branch, o.file_path"
        " FROM occurrences o JOIN messages m ON m.node_id = o.node_id"
        " WHERE o.conv_id = ? AND o.branch = 'main' AND o.seq BETWEEN ? AND ? ORDER BY o.seq",
        (conv_id, seq - k, seq + k))
    return [dict(r) for r in rows]


def terms_report(con, hits, top=40, min_df=3, exclude=()):
    """Words that travel with the hits: by raw count and by lift over the whole archive (all heuristic counts).
    `exclude` holds the search words themselves and words the alias file says to ignore."""
    exclude = set(exclude)
    df = Counter()
    for h in hits:
        for t in set(tokens(h["text"])):
            if len(t) >= 3 and not t.isdigit() and t not in STOP and t not in exclude:
                df[t] += 1
    n_hit = max(len(hits), 1)
    n_all = con.execute("SELECT COUNT(*) FROM messages").fetchone()[0]
    cand = [t for t, c in df.items() if c >= min_df]
    glob = {}
    for part in chunks(cand):
        marks = ",".join("?" * len(part))
        for term, doc in con.execute(f"SELECT term, doc FROM messages_vocab WHERE term IN ({marks})", part):
            glob[term] = doc
    rows = []
    for t in cand:
        g = max(glob.get(t, 0), 1)
        rows.append({"term": t, "in_hits": df[t], "in_archive": g, "lift": (df[t] / n_hit) / (g / n_all)})
    by_count = sorted(rows, key=lambda r: (-r["in_hits"], r["term"]))[:top]
    by_lift = sorted([r for r in rows if r["in_archive"] >= 5],
                     key=lambda r: (-r["lift"], -r["in_hits"], r["term"]))[:top]
    return by_count, by_lift


def excluded_words(plan):
    """Words not worth listing as 'travelling with' the subject: its own names and the entry's ignore list."""
    words = set(plan["singles"]) | {t for p in plan["phrases"] for t in p.split()}
    words |= {w.lower() for w in plan["entry"].get("ignore_in_terms", [])}
    return words


# ---------------------------------------------------------------- related by domain terms
def _term_forms(terms):
    out = {}
    for t in terms:
        tk = tuple(tokens(t))
        if tk:
            out[t] = tk
    return out


def _match_query(forms):
    return " OR ".join(sorted({'"' + " ".join(tk) + '"' for tk in forms.values()}))


def related_search(con, entry, direct_ids, include_excluded=False, broad=False, cap=20000):
    """Messages about the subject's domain (electricity, meters, boards) that do NOT name the subject.

    A message is related if it contains at least one 'strong' domain term; with broad=True it is also related if it
    contains at least three different 'weak' terms. Returns rows (best first), a per-term table and counts.
    """
    d = entry.get("domain_terms", {})
    strong, weak = _term_forms(d.get("strong", [])), _term_forms(d.get("weak", []))
    if not strong:
        return {"rows": [], "table": [], "total": 0, "dropped": 0}
    queries = [_match_query(strong)] + ([_match_query(weak)] if broad and weak else [])
    sql = ("SELECT m.id, m.node_id, m.role, m.text, m.time FROM messages_fts JOIN messages m ON m.id = messages_fts.rowid"
           " WHERE messages_fts MATCH ? ORDER BY bm25(messages_fts) LIMIT ?")
    seen, kept = set(), []
    for q in queries:
        for r in con.execute(sql, (q, cap)):
            if r["node_id"] in seen:
                continue
            seen.add(r["node_id"])
            joined = " " + " ".join(tokens(r["text"])) + " "
            ms = [t for t, tk in strong.items() if f" {' '.join(tk)} " in joined]
            mw = [t for t, tk in weak.items() if f" {' '.join(tk)} " in joined]
            if ms or (broad and len(mw) >= 3):
                row = dict(r)
                row["matched_strong"], row["matched_weak"] = ms, mw
                row["score"] = 3 * len(ms) + len(mw)
                kept.append(row)
    total, also_direct = Counter(), Counter()
    for r in kept:
        for t in r["matched_strong"] + (r["matched_weak"] if broad else []):
            total[t] += 1
            if r["node_id"] in direct_ids:
                also_direct[t] += 1
    table = sorted(((t, total[t], also_direct[t]) for t in total), key=lambda x: (-x[1], x[0]))
    cand = [r for r in kept if r["node_id"] not in direct_ids]
    occ = occurrences_for(con, [r["node_id"] for r in cand])
    rows, dropped = [], 0
    for r in cand:
        rep = pick_rep(occ.get(r["node_id"], []), include_excluded)
        if rep is None:
            dropped += 1
            continue
        r["occs"], r["rep"] = occ[r["node_id"]], rep
        rows.append(r)
    rows.sort(key=lambda r: (-r["score"], r["time"] or "~"))
    return {"rows": rows, "table": table, "total": len(rows), "dropped": dropped}
