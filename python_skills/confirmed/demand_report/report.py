"""Demand report: a report whose every sentence rests on a claim you accepted.

Takes the question and accepted.md (written by verify.py or verify_quotes.py --accepted),
runs evidence_judge/judge.py on the prose, and writes report.md only if every sentence passes.
It makes no model call. The model step is yours: --prompt-out writes the instruction for Claude
(chat or Claude Code), Claude writes draft.md, and --draft sends that draft through the gate.

  python -I -X utf8 report.py QUESTION.md ACCEPTED.md --out report.md
        no draft: each accepted claim becomes one cited sentence (a mechanical report)
  python -I -X utf8 report.py QUESTION.md ACCEPTED.md --prompt-out prompt.md
        writes the instruction to give Claude
  python -I -X utf8 report.py QUESTION.md ACCEPTED.md --draft draft.md --out report.md
        judges Claude's draft; writes the report only if nothing is flagged

Exit: 0 report written, 1 nothing written (a sentence was flagged, or there are no accepted claims),
2 bad input. Standard library only.
"""

import argparse
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1] / "evidence_judge"))
import judge  # noqa: E402

SOURCE = re.compile(r"^(?P<url>\S+) \(retrieved (?P<date>[^,)]+)(?:, snapshot (?P<snap>[^)]+))?\)\s*$")


class ReportInputError(ValueError):
    pass


def read_question(text):
    for line in text.splitlines():
        line = line.strip().lstrip("#").strip()
        if line:
            return line
    raise ReportInputError("the question file is empty")


def source_of(claim):
    """(url, retrieved) from an accepted.md 'source:' line; falls back to the raw text."""
    raw = claim.get("source", "")
    m = SOURCE.match(raw)
    return (m.group("url"), m.group("date")) if m else (raw or "unknown source", "")


def mechanical_body(accepted):
    """One cited sentence per accepted claim, in file order."""
    return "\n".join(f"- {c['claim'].strip().rstrip('.!?')} [{cid}]." for cid, c in accepted.items())


def prompt_text(question, accepted):
    lines = [
        "# Task: write the demand report", "",
        f"Question: {question}", "",
        "Answer it in 3 to 8 sentences (bullets are fine) using ONLY the accepted claims below.", "",
        "Rules:",
        "- End every sentence with the id of the claim it rests on in square brackets, like [d1] or [d1][d2].",
        "- Use only wording, facts and numbers that are in a claim or its quote. No outside knowledge, no market size, no 'many' or 'most'.",
        "- One person's statement stays one person's statement: write 'one renter says', not 'renters want'.",
        "- If the claims do not answer the question, write nothing and tell me so instead of padding.", "",
        "Accepted claims:", "",
    ]
    for cid, c in accepted.items():
        url, date = source_of(c)
        lines += [f"## {cid}", f"- claim: {c['claim']}", f"- quote: {c['quote']}", f"- source: {url} (retrieved {date})", ""]
    lines += ["Save your answer as draft.md, then run:", "",
              "    python -I -X utf8 python_skills/confirmed/demand_report/report.py question.md accepted.md --draft draft.md --out report.md", ""]
    return "\n".join(lines)


def counts(accepted, verdicts, min_claims, min_sources):
    cited = [c for c in accepted if any(c in v["cites"] for v in verdicts)]
    urls = {}
    for cid, c in accepted.items():
        urls.setdefault(source_of(c)[0], []).append(cid)
    lines = [
        "state: completed (every sentence cites an accepted claim and passed judge.py)",
        f"accepted claims: {len(accepted)}; cited in the report: {len(cited)}",
        f"distinct sources (by URL): {len(urls)}",
    ]
    lines += [f"  {u}: {', '.join(ids)}" for u, ids in urls.items()]
    lines += [f"sentences checked: {len(verdicts)}; flagged: 0"]
    if len(accepted) < min_claims or len(urls) < min_sources:
        lines += [f"caution: {len(accepted)} accepted claim(s) from {len(urls)} distinct source(s) is below the minimum of "
                  f"{min_claims} claims from {min_sources} sources. Treat this as a lead, not a finding."]
    return lines


def build_report(question, body, accepted, verdicts, min_claims=3, min_sources=2):
    used = [c for c in accepted if any(c in v["cites"] for v in verdicts)]
    receipts = []
    for cid in used:
        c = accepted[cid]
        url, date = source_of(c)
        receipts += [f'[{cid}] "{c["quote"]}"', f"     {url}" + (f" (retrieved {date})" if date else "")]
    out = [f"# {question}", "", "## What the accepted evidence says", "", body.strip(), "",
           "## Evidence receipts", "",
           "```text", "the exact words each citation rests on, copied from your accepted claims", *receipts, "```", "",
           "## Counts and state", "",
           "```text", "computed by code, not stated by a model", *counts(accepted, verdicts, min_claims, min_sources), "```", ""]
    return "\n".join(out)


def main(argv=None):
    ap = argparse.ArgumentParser(description="Write a demand report only if every sentence rests on an accepted claim.")
    ap.add_argument("question")
    ap.add_argument("accepted")
    ap.add_argument("--draft", help="Claude's draft (Markdown with [id] citations); default: one sentence per accepted claim")
    ap.add_argument("--out", help="where to write the report (only written when the judge passes)")
    ap.add_argument("--prompt-out", help="write the instruction to give Claude, then stop")
    ap.add_argument("--threshold", type=float, default=judge.DEFAULT_THRESHOLD)
    ap.add_argument("--min-claims", type=int, default=3)
    ap.add_argument("--min-sources", type=int, default=2)
    args = ap.parse_args(argv)
    try:
        if not args.out and not args.prompt_out:
            raise ReportInputError("give --out (the report) or --prompt-out (the instruction for Claude)")
        for name in (args.question, args.accepted) + ((args.draft,) if args.draft else ()):
            if not Path(name).is_file():
                raise ReportInputError(f"{name} is not a file")
        question = read_question(Path(args.question).read_text(encoding="utf-8"))
        accepted = judge.parse_accepted(Path(args.accepted).read_text(encoding="utf-8"))
        if args.prompt_out:
            if not accepted:
                raise ReportInputError("accepted.md holds no claims, so there is nothing for Claude to write from")
            Path(args.prompt_out).write_text(prompt_text(question, accepted), encoding="utf-8", newline="\n")
            print(f"prompt written to {args.prompt_out}")
            if not args.out:
                return 0
        if not accepted:
            print("report not written: accepted.md holds no claims (insufficient evidence)")
            return 1
        body = Path(args.draft).read_text(encoding="utf-8") if args.draft else mechanical_body(accepted)
        verdicts = judge.judge(body, accepted, args.threshold)
        if not verdicts:
            raise ReportInputError("the draft has no sentences")
    except (ReportInputError, judge.JudgeInputError, OSError, UnicodeDecodeError) as e:
        print(f"report: {e}", file=sys.stderr)
        return 2
    flagged = [v for v in verdicts if not v["supported"]]
    if flagged:
        print(judge.render(verdicts, accepted))
        print(f"report not written: {len(flagged)} sentence(s) flagged by judge.py")
        return 1
    Path(args.out).write_text(build_report(question, body, accepted, verdicts, args.min_claims, args.min_sources),
                              encoding="utf-8", newline="\n")
    print(f"report written to {args.out}: {len(verdicts)} sentence(s), all supported")
    return 0


if __name__ == "__main__":
    sys.exit(main())
