"""Subject dossier: direct hits, neighbouring messages and related-by-domain messages, grouped by topic.

Prompts and replies are listed apart. Labels and topics are heuristic keyword rules. Assistant text is never presented as
fact: it is labelled assistant-proposed or assistant-claimed-result, and user statements are 'candidates'.
Original wording is kept: long messages show an excerpt around the match, and the full text is written to its own file.
"""
import csv
import os
import re
from datetime import datetime, timezone

from search import family_scores, neighbours, occurrences_for, pick_rep
from store import tokens

USER_DECISION = re.compile(
    r"\b(i decided|we decided|decided to|going with|let'?s go with|let'?s use|we'?ll use|we will use|i chose|"
    r"i choose|final decision|settled on|from now on)\b", re.I)
ASSISTANT_PROPOSAL = re.compile(
    r"\b(i recommend|i suggest|we (can|could|should)|you (can|could|should)|proposal|propose|option \d|"
    r"approach|next step)\b|\blet'?s\b", re.I)
ASSISTANT_CLAIM = re.compile(
    r"(✅|\b(works|working|successful|successfully|verified|passed|completed?|fixed|resolved|confirmed|"
    r"production[- ]ready)\b|100\s?%)", re.I)
MEASURE = re.compile(
    r"(?<![\w.])\d+(?:\.\d+)?\s?(?:v|mv|kv|ma|ua|mw|hz|khz|mhz|ghz|ms|baud|bps|kbps|mbps|dbm|ohm|kohm|mah|wh|kwh|°c)\b",
    re.I)


def labels(role, text):
    out = []
    if role == "user":
        if USER_DECISION.search(text):
            out.append("user-stated-decision-candidate")
        if "?" in text:
            out.append("user-question")
    else:
        if ASSISTANT_CLAIM.search(text):
            out.append("assistant-claimed-result")
        if ASSISTANT_PROPOSAL.search(text):
            out.append("assistant-proposed")
    if "```" in text:
        out.append("has-code")
    if MEASURE.search(text):
        out.append("has-measurements")
    return out or ["unlabelled"]


def topic_matches(text, topics):
    """topic -> number of DIFFERENT keywords found (short keywords match whole words, others match word starts)."""
    found = {}
    for topic, words in topics.items():
        n = 0
        for w in words:
            pat = r"\b" + re.escape(w) + (r"\b" if len(w) <= 3 else "")
            if re.search(pat, text, re.I):
                n += 1
        if n:
            found[topic] = n
    return found


def fenced(text):
    longest = max((len(m.group(0)) for m in re.finditer(r"`+", text)), default=0)
    f = "`" * max(3, longest + 1)
    return f"{f}text\n{text}\n{f}\n"


def one_line(s, n=0):
    s = re.sub(r"\s+", " ", s or "").strip()
    return s[:n] if n else s


def cell(s, n=60):
    return one_line(s, n).replace("|", "/")


def safe_name(s):
    return re.sub(r"[^0-9A-Za-z]+", "_", s).strip("_").lower() or "subject"


def make_highlight(forms):
    parts = []
    for form in forms:
        tk = tokens(form)
        if tk:
            parts.append(r"[\W_]*".join(re.escape(t) for t in tk))
    return re.compile("|".join(sorted(set(parts), key=len, reverse=True)), re.I) if parts else None


def excerpt(text, rx, n):
    """(text to show, (start, end) or None). n <= 0 or a short text means the whole text."""
    if n <= 0 or len(text) <= n:
        return text, None
    m = rx.search(text) if rx else None
    start = max(0, (m.start() if m else 0) - n // 3)
    end = min(len(text), start + n)
    if end == len(text):
        start = max(0, end - n)
    return text[start:end], (start, end)


def collect(con, hits, context, min_hits, include_excluded, related):
    """Every hit, context neighbours in strong families, and related rows. Returns (entries, strong, fams)."""
    fams = family_scores(hits, include_excluded)
    strong = {fid for fid, f in fams.items() if len(f["nodes"]) >= min_hits}
    entries = {}
    for h in hits:
        entries[h["node_id"]] = {"node_id": h["node_id"], "role": h["role"], "text": h["text"], "time": h["time"],
                                 "rep": h["rep"], "kind": "hit", "score": h["score"], "n_files": len(h["occs"]),
                                 "matched": []}
    if context > 0:
        for h in hits:
            rep = h["rep"]
            if rep["family_id"] not in strong or rep["seq"] is None or rep["branch"] != "main":
                continue
            for n in neighbours(con, rep["conv_id"], rep["seq"], context):
                if n["node_id"] in entries:
                    continue
                entries[n["node_id"]] = {
                    "node_id": n["node_id"], "role": n["role"], "text": n["text"], "time": n["time"],
                    "kind": "context", "score": None, "n_files": None, "matched": [],
                    "rep": {"conv_id": n["conv_id"], "seq": n["seq"], "branch": n["branch"],
                            "file_path": n["file_path"], "family_id": rep["family_id"], "title": rep["title"],
                            "created": rep["created"]}}
    ctx = [e for e in entries.values() if e["kind"] == "context"]
    occ = occurrences_for(con, [e["node_id"] for e in ctx])
    for e in ctx:
        better = pick_rep(occ.get(e["node_id"], []), include_excluded)
        if better and better["conv_id"] == e["rep"]["conv_id"]:
            e["rep"] = better
        e["n_files"] = len(occ.get(e["node_id"], []))
    for r in related:
        if r["node_id"] in entries:
            continue
        entries[r["node_id"]] = {"node_id": r["node_id"], "role": r["role"], "text": r["text"], "time": r["time"],
                                 "rep": r["rep"], "kind": "related", "score": r["score"], "n_files": len(r["occs"]),
                                 "matched": r["matched_strong"] + r["matched_weak"]}
    return list(entries.values()), strong, fams


def write_full(full_dir, e):
    os.makedirs(full_dir, exist_ok=True)
    name = re.sub(r"[^0-9A-Za-z._-]", "_", e["node_id"]) + ".md"
    r = e["rep"]
    with open(os.path.join(full_dir, name), "w", encoding="utf-8", newline="\n", errors="replace") as f:
        f.write(f"# Full text\n\n- node_id `{e['node_id']}` · conversation_id `{r['conv_id']}` · role {e['role']} "
                f"· {e['time'] or 'no time'}\n- source: `{r['file_path']}`\n\n")
        f.write(fenced(e["text"]))
    return name


def write_dossier(con, subject, plan, hits, dropped, out_dir, context=1, min_hits=3, excerpt_chars=700,
                  include_excluded=False, db_path="", related=None):
    related = related or {"rows": [], "table": [], "total": 0, "dropped": 0}
    entries, strong, fams = collect(con, hits, context, min_hits, include_excluded, related["rows"])
    entry = plan["entry"]
    topics = entry.get("topics", {})
    for e in entries:
        e["labels"] = labels(e["role"], e["text"])
        m = topic_matches(e["text"], topics)
        order = sorted(m, key=lambda t: (-m[t], list(topics).index(t)))
        e["topic"] = order[0] if order else "Unassigned"
        e["other_topics"] = order[1:]
    chrono = lambda e: (e["time"] or "~", e["rep"]["created"] or "~", e["rep"]["seq"] if e["rep"]["seq"] is not None else 0)
    direct = sorted([e for e in entries if e["kind"] != "related"], key=chrono)
    rel = sorted([e for e in entries if e["kind"] == "related"],
                 key=lambda e: (-(e["score"] or 0), e["time"] or "~"))

    # sections: (heading, [(subheading, entries)])
    by_topic = {}
    for e in direct:
        by_topic.setdefault(e["topic"], []).append(e)
    order = [t for t in topics if t in by_topic] + (["Unassigned"] if "Unassigned" in by_topic else [])
    sections = []
    for t in order:
        sections.append((f"Topic: {t} ({len(by_topic[t])} messages)",
                         [(f"{h} — {t}", [e for e in by_topic[t] if e["role"] == role])
                          for role, h in (("user", "Prompts (user)"), ("assistant", "Replies (assistant)"))]))
    if rel:
        sections.append((f"Related by domain terms, without the name ({len(rel)} messages)",
                         [(h, [e for e in rel if e["role"] == role])
                          for role, h in (("user", "Prompts (user)"), ("assistant", "Replies (assistant)"))]))
    ordered = []
    for _, subs in sections:
        for _, items in subs:
            ordered.extend(items)
    for i, e in enumerate(ordered, 1):
        e["idx"] = i

    os.makedirs(out_dir, exist_ok=True)
    base = safe_name(subject)
    md_path = os.path.join(out_dir, f"{base}_dossier.md")
    csv_path = os.path.join(out_dir, f"{base}_evidence.csv")
    full_dir = os.path.join(out_dir, f"{base}_full")
    rx = make_highlight(list(plan["phrases"]) + list(plan["singles"]) + list(entry.get("domain_terms", {}).get("strong", [])))
    n_hit = sum(e["kind"] == "hit" for e in entries)
    n_ctx = sum(e["kind"] == "context" for e in entries)
    n_rel = len(rel)
    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")

    out = []
    w = out.append
    w(f"# {entry.get('canonical', subject)} — recovered evidence\n\n")
    w(f"Generated {now} from `{db_path}`.\n\n")
    w("**How to read this.** Every item is original text with its source. Labels and topics are keyword rules "
      "(heuristic), not judgements. Assistant text is shown as *assistant-proposed* or *assistant-claimed-result*: it "
      "is what the assistant said, not an established fact. *user-stated-decision-candidate* means the user's words "
      "match a decision phrase; check the text. Prompts and replies are listed separately under each topic. HIT = names "
      "the subject; CONTEXT = sits next to a hit in the same conversation; RELATED = mentions electricity/hardware "
      "terms but not the subject's name. Long messages show an excerpt around the match; the link opens the full text.\n\n")
    w("## Search\n\n")
    w(f"- Phrases: {', '.join(plan['phrases']) or '-'}\n")
    w(f"- Terms: {', '.join(f'{t} ({d} messages)' for t, d in plan['singles'].items())}\n")
    if plan["expansions"]:
        w("- Spellings/compounds found in the archive vocabulary (check these): "
          + ", ".join(f"{t} ({d}; {why})" for t, d, why in plan["expansions"][:40]) + "\n")
    if plan["reject"]:
        w(f"- Never expanded to: {', '.join(plan['reject'])}\n")
    w(f"- Direct hits: {n_hit}. Context messages (±{context}, only in families with at least {min_hits} hits): {n_ctx}. "
      f"Related by domain terms: {n_rel}"
      + (f" ({related['total'] - len(related['rows'])} more found; raise --max-related to include them)"
         if related["total"] > len(related["rows"]) else "")
      + (f" ({len(related['rows']) - n_rel} related message(s) were already included as context)"
         if len(related["rows"]) > n_rel else "") + ".\n")
    w(f"- Dropped because every conversation holding them is excluded: {dropped} direct, {related['dropped']} related.\n")
    if related["table"]:
        w("- Domain terms used for the related section (messages containing the term / of those, also direct hits): "
          + ", ".join(f"{t} {n}/{k}" for t, n, k in related["table"][:40]) + "\n")
    w("\n## Conversation families with direct hits\n\n")
    w("A family is a conversation plus its branches (they share message ids). Hits are counted once per message.\n\n")
    w("| Family (earliest title) | First created | Hit messages | Conversations with a hit | Context added |\n|---|---|---|---|---|\n")
    for fid, fam in sorted(fams.items(), key=lambda kv: -len(kv[1]["nodes"])):
        w(f"| {cell(fam['title'], 70)} | {(fam['first'] or '')[:10]} | {len(fam['nodes'])} | {len(fam['convs'])} | "
          f"{'yes' if fid in strong else 'no'} |\n")
    w("\n## Contents\n\n| # | Date | Role | Kind | Topic | Conversation | Starts with |\n|---|---|---|---|---|---|---|\n")
    for e in ordered:
        w(f"| [{e['idx']}](#n{e['idx']}) | {(e['time'] or '')[:10]} | {e['role']} | {e['kind']} | {cell(e['topic'], 24)} | "
          f"{cell(e['rep'].get('title'), 40)} | {cell(e['text'], 80)} |\n")
    w("\n")
    for heading, subs in sections:
        w(f"## {heading}\n\n")
        for sub, items in subs:
            if not items:
                continue
            w(f"### {sub}\n\n")
            for e in items:
                r = e["rep"]
                shown, span = excerpt(e["text"], rx, excerpt_chars)
                w(f'<a id="n{e["idx"]}"></a>\n\n#### {e["idx"]}. {(e["time"] or "undated")[:10]} · '
                  f'{one_line(r.get("title"), 80)}\n\n')
                w(f"- {e['kind'].upper()} · node_id `{e['node_id']}` · conversation_id `{r['conv_id']}` · "
                  f"seq {r['seq'] if r['seq'] is not None else '-'} · {r['branch']} branch · {e['time'] or 'no time'}\n")
                w(f"- labels (heuristic): {', '.join(e['labels'])}"
                  + (f" · also matches topics: {', '.join(e['other_topics'])}" if e["other_topics"] else "") + "\n")
                if e["matched"]:
                    w(f"- matched domain terms: {', '.join(e['matched'])}\n")
                extra = (e["n_files"] or 1) - 1
                w(f"- source: `{r['file_path']}`" + (f" (+{extra} more branch file(s) hold this message)" if extra else "") + "\n")
                if span:
                    name = write_full(full_dir, e)
                    w(f"- excerpt: characters {span[0]}–{span[1]} of {len(e['text'])}; "
                      f"[full text]({base}_full/{name})\n")
                w("\n" + fenced(shown) + "\n")
    w("## Limits\n\n- Direct hits need the name; context needs a family with several hits; related messages need a "
      "domain term from aliases.json. Anything that does none of these is not here.\n"
      "- Thinking blocks were never exported, and uploaded files are not part of the archive.\n"
      "- Topic and label rules are plain keyword matches and will misfile some messages.\n"
      f"- Excluded by default (see exclude.json): personal conversations.\n")
    with open(md_path, "w", encoding="utf-8", newline="\n", errors="replace") as f:
        f.write("".join(out))

    with open(csv_path, "w", encoding="utf-8-sig", newline="") as f:
        cw = csv.writer(f)
        cw.writerow(["idx", "node_id", "conversation_id", "family_id", "role", "kind", "topic", "labels",
                     "matched_domain_terms", "seq", "branch", "time", "title", "file_path", "files_holding_message", "score"])
        for e in ordered:
            r = e["rep"]
            cw.writerow([e["idx"], e["node_id"], r["conv_id"], r.get("family_id"), e["role"], e["kind"], e["topic"],
                         ";".join(e["labels"]), ";".join(e["matched"]), r["seq"], r["branch"], e["time"],
                         one_line(r.get("title")), r["file_path"], e["n_files"], e["score"]])
    return md_path, csv_path, n_hit, n_ctx, n_rel
