"""Evidence judge: does every sentence of a write-up rest on an accepted claim?

verify.py is the quote gate (is the quote literally in the snapshot). This is the second
gate, on the write-up built from the claims you accepted:

  1. every sentence cites at least one claim id, e.g. [c1] or [c1][c2] or [c1, c2]
  2. every cited id is in accepted.md (the file verify.py --accepted writes)
  3. the sentence's numbers appear in the cited claim or quote
  4. the sentence does not add or drop a negation the evidence does not have
  5. the sentence shares enough of its content words with the cited claim and quote

A flag is a place for a human to look, not a finding of falsehood: word overlap cannot
tell that a sentence means something different. Standard library only.

Usage:  python -I -X utf8 judge.py WRITEUP.md ACCEPTED.md [--threshold 0.5] [--json]
Exit:   0 every sentence supported, 1 at least one flagged, 2 bad input
"""

import argparse
import json
import re
import sys
from pathlib import Path

DEFAULT_THRESHOLD = 0.5

STOP = frozenset("""a an the is are was were be been being of and or to in on at for with that this these those
it its as by from they them their he she we you i my me our your has have had do does did but if so than then
there which who whom what when where how also just very can could would will shall should may might
say says said state states stated according note notes noted mention mentions mentioned report reports reported""".split())
NEGATIONS = frozenset({"no", "not", "never", "cannot", "none", "neither", "nor", "without", "nobody", "nothing", "nowhere", "hardly", "barely", "unable"})
CITE = re.compile(r"\[([A-Za-z][\w-]*(?:\s*,\s*[A-Za-z][\w-]*)*)\](?!\()")
SUFFIXES = ("ally", "ies", "ing", "edly", "ed", "es", "ly", "s")


class JudgeInputError(ValueError):
    pass


def stem(word):
    for suf in SUFFIXES:
        if word.endswith(suf) and len(word) - len(suf) >= (3 if suf == "s" else 4):
            return word[: -len(suf)] + ("y" if suf == "ies" else "")
    return word


def words(text):
    text = re.sub(r"n['’]t\b", " not", text.lower())
    return re.findall(r"[a-z0-9]+(?:\.[0-9]+)?", text)


def content_stems(text):
    return {stem(w) for w in words(text) if w not in STOP and not w.isdigit() and not re.fullmatch(r"[0-9.]+", w)}


def numbers(text):
    return set(re.findall(r"\d+(?:\.\d+)?", text))


def negations(text):
    return {w for w in words(text) if w in NEGATIONS}


def parse_accepted(text):
    """Read the '## id' blocks that verify.py --accepted writes. Returns {id: {"claim":..., "quote":...}}."""
    claims, cur, key = {}, None, None
    for line in text.splitlines():
        m = re.match(r"^##\s+(\S+)\s*$", line)
        if m:
            cur, key = {}, None
            claims[m.group(1)] = cur
            continue
        if cur is None:
            continue
        m = re.match(r"^-\s+([A-Za-z_]+):\s*(.*)$", line)
        if m:
            key = m.group(1).lower()
            cur[key] = m.group(2).strip()
        elif key and line.startswith((" ", "\t")) and line.strip():
            cur[key] += " " + line.strip()
    return {k: v for k, v in claims.items() if v.get("claim") or v.get("quote")}


def clean_markup(text):
    text = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", text)  # [text](url) -> text
    text = re.sub(r"[`*_]", "", text)
    return " ".join(text.split())


def split_sentences(text):
    """Return [{"line": n, "raw": str}] for each sentence of the prose in a Markdown write-up.
    Headings, code fences and blank lines are skipped; list markers are stripped."""
    out, buf, in_code = [], [], False  # buf: list of (line_no, text) for the current paragraph

    def flush():
        if not buf:
            return
        joined, owners = "", []
        for no, t in buf:
            piece = t if not joined else " " + t
            joined += piece
            owners += [no] * len(piece)
        start = 0
        for m in re.finditer(r"(?<=[.!?])\s+(?=[A-Z0-9\"“(\[])", joined):
            out.append({"line": owners[start], "raw": joined[start:m.start()]})
            start = m.end()
        if joined[start:].strip():
            out.append({"line": owners[start], "raw": joined[start:]})
        buf.clear()

    for no, line in enumerate(text.splitlines(), 1):
        s = line.strip()
        if s.startswith("```"):
            flush()
            in_code = not in_code
            continue
        if in_code or not s or s.startswith("#"):
            flush()
            continue
        marker = re.match(r"^(?:[-*+]|\d+[.)])\s+", s)
        if marker:
            flush()
            s = s[marker.end():]
        buf.append((no, s))
    flush()
    return out


def judge(writeup_text, accepted, threshold=DEFAULT_THRESHOLD):
    """Judge every sentence. `accepted` is {id: {"claim":..., "quote":...}}. Returns a list of verdict dicts."""
    if not 0 <= threshold <= 1:
        raise JudgeInputError("threshold must be between 0 and 1")
    verdicts = []
    for n, sent in enumerate(split_sentences(writeup_text), 1):
        raw = sent["raw"]
        cites = []
        for m in CITE.finditer(raw):
            cites += [c.strip() for c in m.group(1).split(",")]
        cites = list(dict.fromkeys(cites))
        text = clean_markup(CITE.sub("", raw)).strip().rstrip(".!?").strip()
        v = {"n": n, "line": sent["line"], "text": text, "cites": cites, "supported": False, "score": None, "reasons": []}
        verdicts.append(v)
        if not text:
            verdicts.pop()  # a line holding only citations or markup is not a sentence
            continue
        if not cites:
            v["reasons"].append("uncited")
            continue
        missing = [c for c in cites if c not in accepted]
        if missing:
            v["reasons"].append("cites a claim that is not accepted: " + ", ".join(missing))
            continue
        ev = [accepted[c].get("claim", "") + " " + accepted[c].get("quote", "") for c in cites]
        ev_all = " ".join(ev)
        extra = sorted(numbers(text) - numbers(ev_all))
        if extra:
            v["reasons"].append("number not in the cited evidence: " + ", ".join(extra))
        s_neg = negations(text)
        if not (s_neg == negations(ev_all) or any(s_neg == negations(e) for e in ev)):
            v["reasons"].append("negation differs from the cited evidence")
        stems = content_stems(text)
        v["score"] = round(len(stems & content_stems(ev_all)) / len(stems), 2) if stems else 0.0
        if v["score"] < threshold:
            v["reasons"].append(f"low word overlap {v['score']:.2f} (need {threshold:.2f})")
        v["supported"] = not v["reasons"]
    for i, v in enumerate(verdicts, 1):
        v["n"] = i
    return verdicts


def render(verdicts, accepted):
    lines = []
    for v in verdicts:
        tag = "ok  " if v["supported"] else "FLAG"
        cite = "".join(f"[{c}]" for c in v["cites"]) or "-"
        score = f" overlap {v['score']:.2f}" if v["score"] is not None else ""
        lines.append(f"S{v['n']} {tag} line {v['line']} {cite}{score}: {v['text']}")
        for r in v["reasons"]:
            lines.append(f"      -> {r}")
    flagged = sum(not v["supported"] for v in verdicts)
    used = {c for v in verdicts for c in v["cites"]}
    unused = [c for c in accepted if c not in used]
    if unused:
        lines.append("note: accepted but never cited: " + ", ".join(unused))
    lines.append(f"{len(verdicts)} sentence(s): {len(verdicts) - flagged} supported, {flagged} flagged")
    return "\n".join(lines)


def main(argv=None):
    ap = argparse.ArgumentParser(description="Flag write-up sentences that do not rest on an accepted claim.")
    ap.add_argument("writeup")
    ap.add_argument("accepted")
    ap.add_argument("--threshold", type=float, default=DEFAULT_THRESHOLD, help="minimum word overlap, 0 to 1 (default 0.5)")
    ap.add_argument("--json", action="store_true", help="print the verdicts as JSON instead of text")
    args = ap.parse_args(argv)
    try:
        w, a = Path(args.writeup), Path(args.accepted)
        for p in (w, a):
            if not p.is_file():
                raise JudgeInputError(f"{p} is not a file")
        accepted = parse_accepted(a.read_text(encoding="utf-8"))
        verdicts = judge(w.read_text(encoding="utf-8"), accepted, args.threshold)
        if not verdicts:
            raise JudgeInputError(f"no sentences found in {w}")
    except (JudgeInputError, OSError, UnicodeDecodeError) as e:
        print(f"judge: {e}", file=sys.stderr)
        return 2
    if args.json:
        print(json.dumps(verdicts, indent=2))
    else:
        print(render(verdicts, accepted))
    return 0 if all(v["supported"] for v in verdicts) else 1


if __name__ == "__main__":
    sys.exit(main())
