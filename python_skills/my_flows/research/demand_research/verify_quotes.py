#!/usr/bin/env python3
"""Check that every claim's quote appears verbatim in the snapshot you captured.

claims.jsonl  one JSON object per line:
  {"id","claim","quote","snapshot","url","retrieved_at","found_by","extractor"}
snapshots/    plain-text files you captured (page text, transcript, thread)

Exit code 1 if any claim fails, so it can gate a pipeline.
Run:  python3 -I verify_quotes.py claims.jsonl snapshots/ [--accepted accepted.md]

--accepted writes the claims that pass the quote check AND carry "review_status": "accepted"
(or "status": "accepted") to accepted.md, in the same format as ../evidence_verification/verify.py,
so the write-up gates (confirmed/evidence_judge, confirmed/demand_report) read it unchanged.
"""
import json, re, sys, unicodedata
from collections import defaultdict
from pathlib import Path

MIN_QUOTE = 25  # shorter quotes are too easy to match by accident
REQUIRED = ("id", "claim", "quote", "snapshot", "url", "retrieved_at")

def norm(s: str) -> str:
    s = unicodedata.normalize("NFKC", s)
    s = s.replace("‘", "'").replace("’", "'").replace("“", '"').replace("”", '"')
    return re.sub(r"\s+", " ", s).strip().casefold()

def accepted_md(rows) -> str:
    ok = [c for _, problems, c in rows
          if not problems and str(c.get("review_status", c.get("status", ""))).lower() == "accepted"]
    out = ["# Accepted claims", "", f"{len(ok)} claim(s) passed the quote check and were accepted by review.", ""]
    for c in ok:
        out += [f"## {c['id']}", f"- claim: {c['claim']}", f"- quote: {c['quote']}",
                f"- source: {c['url']} (retrieved {c['retrieved_at']}, snapshot {c['snapshot']})", ""]
    return "\n".join(out)

def main(claims_path: str, snap_dir: str, accepted_path: str = "") -> int:
    snaps = {p.name: norm(p.read_text(encoding="utf-8", errors="replace"))
             for p in Path(snap_dir).glob("*") if p.is_file()}
    rows, bad = [], 0
    for n, line in enumerate(Path(claims_path).read_text(encoding="utf-8").splitlines(), 1):
        if not line.strip():
            continue
        c = json.loads(line)
        problems = [f"missing {k}" for k in REQUIRED if not c.get(k)]
        if not problems:
            text = snaps.get(c["snapshot"])
            q = norm(c["quote"])
            if text is None:
                problems.append("snapshot file not found")
            elif len(q) < MIN_QUOTE:
                problems.append("quote too short to prove anything (under MIN_QUOTE chars)")
            elif q not in text:
                problems.append("QUOTE NOT IN SNAPSHOT")
        rows.append((c.get("id", f"line{n}"), problems, c))
        bad += bool(problems)
    # Same claim extracted by two models: flag disagreement on the quote used.
    by_claim = defaultdict(set)
    for _, _, c in rows:
        by_claim[norm(c.get("claim", ""))].add(norm(c.get("quote", "")))
    for cid, problems, c in rows:
        status = "FAIL " + "; ".join(problems) if problems else "ok (quote found; human still decides if it supports the claim)"
        print(f"{cid:12} {status}")
    multi = [k for k, v in by_claim.items() if len(v) > 1]
    if multi:
        print(f"\n{len(multi)} claim(s) cite different quotes from different extractors: review them.")
    print(f"\n{len(rows) - bad}/{len(rows)} claims pass the quote check")
    if accepted_path:
        Path(accepted_path).write_text(accepted_md(rows), encoding="utf-8")
    return 1 if bad else 0

if __name__ == "__main__":
    args = sys.argv[1:]
    accepted = ""
    if len(args) == 4 and args[2] == "--accepted":
        accepted, args = args[3], args[:2]
    if len(args) != 2:
        sys.exit(__doc__)
    sys.exit(main(args[0], args[1], accepted))
