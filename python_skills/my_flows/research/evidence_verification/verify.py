#!/usr/bin/env python3
"""verify.py - check that every claim's quote is literally inside the snapshot it cites.

Inputs are markdown (or plain-text transcripts):

  snapshots/thread1.md        a page, thread or transcript you captured (.md or .txt). Optional front matter:
                                  ---
                                  url: https://example.com/t/1
                                  retrieved_at: 2026-10-17
                                  ---
  claims.md                   one block per claim:
                                  ## c1
                                  - claim: a renter would pay for automatic rent tracking
                                  - quote: I would pay for something that tracks my rent payments
                                  - snapshot: thread1.md
                                  - found_by: perplexity
                                  - extractor: claude
                                  - status: pending | accepted | rejected
                              A value may continue on the next lines if they are indented.

Run:     python3 -I verify.py claims.md snapshots/
Options: --lock snapshots.lock   record each snapshot's SHA-256 on first use; fail later if a file changed
         --report report.md      write the results, the per-tool tallies and the warnings to a file
         --accepted accepted.md  write only claims that pass AND are marked accepted (the input to a write-up)
         --max-age-days 365      fail claims whose posted_at (claim or snapshot front matter) is older than this
Exit:    0 = every claim passed, 1 = at least one failed, 2 = bad input (so it can gate a pipeline).
What a pass means: the words exist in your capture. Whether they support the claim is your call.
"""
import argparse, datetime, hashlib, html, json, re, sys, unicodedata
from collections import Counter, defaultdict
from pathlib import Path

MIN_QUOTE = 25        # a whole quote shorter than this is too easy to match by accident
MIN_PART = 12         # each piece of a quote split by "..." must be at least this long
MIN_SNAPSHOT = 300    # a captured page shorter than this is probably a failed or partial scrape
REQUIRED = ("claim", "quote", "snapshot")
STATUSES = {"pending", "accepted", "rejected"}
SNAPSHOT_TYPES = ("*.md", "*.txt")
DASHES = dict.fromkeys(map(ord, "‐‑‒–—―−"), "-")
QUOTES = {ord("‘"): "'", ord("’"): "'", ord("ʼ"): "'", ord("“"): '"', ord("”"): '"'}


def norm(s: str) -> str:
    """Make a quote and a snapshot comparable: strip markup, unify quotes, dashes and spaces, ignore case."""
    s = unicodedata.normalize("NFKC", s)
    s = re.sub(r"<br\s*/?>", " ", s, flags=re.I)                   # line breaks kept by HTML-to-markdown tools
    s = re.sub(r"</?[a-zA-Z][^>]*>", "", s)                         # any other inline HTML tag
    s = html.unescape(s)                                            # after tags, so "&lt;b&gt;" stays as text
    s = re.sub(r"!\[([^\]]*)\]\([^)]*\)", r"\1", s)                # ![alt](img)   -> alt
    s = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", s)                 # [text](url)   -> text
    s = re.sub(r"(?m)^\s{0,3}(#{1,6}|>)+\s*", "", s)               # heading / blockquote markers
    s = re.sub(r"(?m)^\s*([-*+]|\d+\.)\s+", "", s)                 # list bullets
    s = re.sub(r"(\*\*|__|~~|`|\*)", "", s)                        # bold, strike, code, stars
    s = re.sub(r"(?<!\w)_(.+?)_(?!\w)", r"\1", s)                  # _italic_
    s = s.translate(QUOTES).translate(DASHES)
    return re.sub(r"\s+", " ", s).strip().casefold()


def unquote(v: str) -> str:
    v = v.strip()
    return v[1:-1] if len(v) > 1 and v[0] == v[-1] and v[0] in "\"'" else v


def split_front_matter(text: str):
    """Return (metadata dict, body). Front matter is the '---' block at the very top, if any."""
    m = re.match(r"\A---\s*\n(.*?)\n---\s*\n?", text, re.S)
    if not m:
        return {}, text
    meta = {}
    for line in m.group(1).splitlines():
        k, sep, v = line.partition(":")
        if sep:
            meta[k.strip().lower()] = unquote(v)
    return meta, text[m.end():]


def load_snapshots(folder: str):
    snaps = {}
    for pattern in SNAPSHOT_TYPES:
        for p in sorted(Path(folder).glob(pattern)):
            raw = p.read_bytes()
            meta, body = split_front_matter(raw.decode("utf-8", errors="replace"))
            snaps[p.name] = {"meta": meta, "text": norm(body), "len": len(body.strip()),
                             "sha256": hashlib.sha256(raw).hexdigest()}
    return snaps


def load_claims(path: str):
    """Parse '## id' blocks of '- key: value' lines. Indented lines continue the previous value."""
    claims, cur, last, errors = [], None, None, []
    for n, line in enumerate(Path(path).read_text(encoding="utf-8").splitlines(), 1):
        if line.startswith("## "):
            cur, last = {"id": line[3:].strip(), "_line": n}, None
            claims.append(cur)
            continue
        if cur is None or not line.strip():
            last = None if not line.strip() else last
            continue
        m = re.match(r"\s*[-*]\s*([A-Za-z_]+)\s*:\s*(.*)", line)
        if m:
            last = m.group(1).lower()
            if last in cur:
                errors.append(f"line {n}: {cur['id']} sets '{last}' twice")
            cur[last] = unquote(m.group(2))
        elif line[:1] in (" ", "\t") and last:
            cur[last] = unquote(cur[last] + " " + line.strip())   # continuation of a wrapped value
        else:
            errors.append(f"line {n}: not a '- key: value' line inside {cur['id']}: {line.strip()[:60]}")
    if "review_status" in {k for c in claims for k in c}:            # the Demand Research doc's name for status
        for c in claims:
            c.setdefault("status", c.get("review_status", ""))
    return claims, errors


def check_quote(quote: str, text: str):
    """A quote may use '...' to skip words; each piece must appear, in order."""
    parts = [norm(p) for p in re.split(r"\.\.\.|…", quote) if p.strip()]
    if sum(len(p) for p in parts) < MIN_QUOTE:
        return "quote too short to prove anything"
    if any(len(p) < MIN_PART for p in parts) and len(parts) > 1:
        return "a piece between '...' is too short"
    pos = 0
    for p in parts:
        i = text.find(p, pos)
        if i < 0:
            if pos == 0 and len(parts) > 1 and norm(quote) in text:
                return None                                         # the source itself contains the ellipsis
            return "QUOTE NOT FOUND in the snapshot body (front matter is not searched)" if pos == 0 else "pieces found but not in the order quoted"
        pos = i + len(p)
    return None


def check_lock(lock_path, snaps, used):
    """Compare cited snapshots with the hashes recorded the first time they were used."""
    lock = json.loads(Path(lock_path).read_text(encoding="utf-8")) if Path(lock_path).exists() else {}
    changed = sorted(n for n in used if n in lock and lock[n] != snaps[n]["sha256"])
    added = {n: snaps[n]["sha256"] for n in used if n not in lock}
    if added:
        lock.update(added)
        Path(lock_path).write_text(json.dumps(lock, indent=2, sort_keys=True) + "\n", encoding="utf-8")
    return changed, sorted(added)


def run(claims_path, snap_dir, lock=None, max_age_days=None):
    snaps = load_snapshots(snap_dir)
    claims, errors = load_claims(claims_path)
    ids = Counter(c["id"] for c in claims)
    results, used, notes = [], defaultdict(int), []
    for c in claims:
        problems = [f"missing {k}" for k in REQUIRED if not c.get(k)]
        if ids[c["id"]] > 1:
            problems.append("duplicate claim id")
        if c.get("status") and c["status"].lower() not in STATUSES:
            problems.append(f"unknown status '{c['status']}' (use {', '.join(sorted(STATUSES))})")
        s = snaps.get(c.get("snapshot", ""))
        if not any(p.startswith("missing") for p in problems):
            if s is None:
                problems.append("snapshot file not found")
            else:
                used[c["snapshot"]] += 1
                meta_url = s["meta"].get("url", "")
                if c.get("url") and meta_url and c["url"] != meta_url:
                    problems.append(f"url differs from the snapshot's ({meta_url})")
                c.setdefault("url", meta_url)
                c.setdefault("retrieved_at", s["meta"].get("retrieved_at", ""))
                for k in ("url", "retrieved_at"):
                    if not c.get(k):
                        problems.append(f"missing {k} (put it in the claim or the snapshot front matter)")
                posted = c.get("posted_at") or s["meta"].get("posted_at", "")
                if max_age_days is not None and posted:
                    try:
                        age = (datetime.date.today() - datetime.date.fromisoformat(posted[:10])).days
                        if age > max_age_days:
                            problems.append(f"stale: posted {posted[:10]}, {age} days ago (re-check before relying on it)")
                    except ValueError:
                        problems.append(f"posted_at is not a date: {posted}")
                bad = check_quote(c["quote"], s["text"])
                if bad:
                    problems.append(bad)
        if c.get("who", "").lower() == "vendor":
            notes.append(f"NOTE  {c['id']} is a vendor's words: evidence of a claim, never of demand")
        results.append((c, problems))
    changed = added = []
    if lock:
        changed, added = check_lock(lock, snaps, used)
        for c, problems in results:
            if c.get("snapshot") in changed:
                problems.append("snapshot changed since it was locked (re-capture, never edit)")
    return snaps, claims, errors, results, used, notes, changed, added


def render(snaps, claims, errors, results, used, notes, changed, added):
    out = []
    width = max((len(c["id"]) for c, _ in results), default=4)
    for c, problems in results:
        out.append(f"{c['id']:<{width}}  " + ("FAIL  " + "; ".join(problems) if problems else "ok"))
    for e in errors:
        out.append(f"\nINPUT  {e}")
    by_claim = defaultdict(set)
    for c in claims:
        by_claim[norm(c.get("claim", ""))].add(norm(c.get("quote", "")))
    for claim, quotes in by_claim.items():
        if len(quotes) > 1:
            out.append(f"\nREVIEW  different quotes cited for the same claim: {claim[:70]}")
    for name in used:
        if snaps[name]["len"] < MIN_SNAPSHOT:
            out.append(f"\nWARN  {name} is only {snaps[name]['len']} characters; check the capture was complete")
    out += [f"\n{n}" for n in notes]
    if added:
        out.append(f"\nLOCK  recorded {len(added)} new snapshot hash(es)")
    for field in ("found_by", "extractor"):
        tally = defaultdict(lambda: [0, 0])
        for c, problems in results:
            if c.get(field):
                tally[c[field]][0] += not problems
                tally[c[field]][1] += 1
        if tally:
            out.append(f"\n{field}: " + ", ".join(f"{k} {p}/{t}" for k, (p, t) in sorted(tally.items())))
    ok = sum(1 for _, p in results if not p)
    urls = {c.get("url") for c in claims if c.get("url")}
    out.append(f"\n{ok}/{len(results)} claims pass | {len(used)} snapshot(s) cited | {len(urls)} distinct url(s)")
    return "\n".join(out), ok == len(results)


def accepted_md(results):
    rows = [c for c, p in results if not p and c.get("status", "").lower() == "accepted"]
    lines = ["# Accepted claims", "", f"{len(rows)} claim(s) passed the quote check and were accepted by review.", ""]
    for c in rows:
        lines += [f"## {c['id']}", f"- claim: {c['claim']}", f"- quote: {c['quote']}",
                  f"- source: {c['url']} (retrieved {c['retrieved_at']}, snapshot {c['snapshot']})", ""]
    return "\n".join(lines)


def main(argv=None) -> int:
    ap = argparse.ArgumentParser(description="Check every claim's quote against the snapshot it cites.")
    ap.add_argument("claims")
    ap.add_argument("snapshots")
    ap.add_argument("--lock")
    ap.add_argument("--report")
    ap.add_argument("--accepted")
    ap.add_argument("--max-age-days", type=int)
    a = ap.parse_args(argv)
    if not Path(a.claims).is_file() or not Path(a.snapshots).is_dir():
        print("claims must be a file and snapshots a folder", file=sys.stderr)
        return 2
    state = run(a.claims, a.snapshots, a.lock, a.max_age_days)
    text, all_ok = render(*state)
    print(text)
    if a.report:
        Path(a.report).write_text(text + "\n", encoding="utf-8")
    if a.accepted:
        Path(a.accepted).write_text(accepted_md(state[3]), encoding="utf-8")
    return 0 if all_ok else 1


if __name__ == "__main__":
    sys.exit(main())
