# Demand report

The last step of the demand loop: a report in which **every sentence rests on a claim you accepted**, written only if [`evidence_judge/judge.py`](../evidence_judge/README.md) passes every sentence. Standard library only. It makes no model call and needs no key.

```
claims.jsonl ──verify_quotes.py --accepted──► accepted.md ──┐
claims.md ─────verify.py --accepted─────────► accepted.md ──┤
                                                            ├─► report.py ──► report.md   (only if the judge passes)
question.md ────────────────────────────────────────────────┤        ▲
draft.md  (Claude's prose, every sentence cites [d1]) ──────┘        │
        └── report.py --prompt-out writes the instruction for Claude ┘
```

## Three ways to run it

```bash
R=python_skills/confirmed/demand_report

# 1. No draft: each accepted claim becomes one cited sentence (a mechanical report)
python -I -X utf8 $R/report.py question.md accepted.md --out report.md

# 2. Ask Claude to write the prose: this writes the instruction; you give it to Claude (chat or Claude Code)
python -I -X utf8 $R/report.py question.md accepted.md --prompt-out prompt.md

# 3. Gate Claude's draft: judged sentence by sentence; report.md exists only if nothing is flagged
python -I -X utf8 $R/report.py question.md accepted.md --draft draft.md --out report.md
```

Exit codes: `0` report written, `1` nothing written (a sentence was flagged, or `accepted.md` holds no claims), `2` bad input (missing file, no `--out` or `--prompt-out`, empty question, a draft with no sentences).

Options: `--threshold 0.5` (the judge's word-overlap line), `--min-claims 3` and `--min-sources 2` (below either, the report carries a caution that it is a lead, not a finding).

## Worked example

`example/` holds the renter demand claims: `question.md`, `accepted.md` (what `verify_quotes.py --accepted` writes from `../../my_flows/research/demand_research/example`), a good `draft.md` and a `draft_bad.md` with one planted sentence.

```
$ report.py example/question.md example/accepted.md --draft example/draft_bad.md --out report.md
S1 ok   line 1 [d1] overlap 0.90: One renter says they would honestly pay a small monthly fee for something that splits rent
S2 FLAG line 2 [d1] overlap 0.50: Most renters in the city would pay 20 pounds a month for it
      -> number not in the cited evidence: 20
S3 ok   line 3 [d2] overlap 0.71: The same thread says a shared spreadsheet is always out of date
3 sentence(s): 2 supported, 1 flagged
report not written: 1 sentence(s) flagged by judge.py          (exit 1, no file)
```

The same command with `draft.md` writes `report.md`: the question as the title, the cited sentences, an **Evidence receipts** block (each cited id with its exact quote, URL and retrieval date) and a **Counts and state** block (accepted claims, claims used, distinct sources by URL, sentences checked, and the caution when the sample is small). The receipts and counts sit in code blocks, so `judge.py report.md accepted.md` also passes on the finished report.

## What it guards against

| Risk | What stops it |
|---|---|
| A sentence with no evidence | judge flags `uncited` |
| A sentence citing a claim you rejected, or one that failed the quote check | judge flags `cites a claim that is not accepted` |
| Claude inflating a number or turning one person into "most renters" | number check, and the prompt forbids it |
| A flipped meaning (a dropped or added "not", "never", "nobody") | negation check |
| One thread counted as many | counts are by distinct URL, and a small sample gets a caution |

## What it does not do

It does not judge whether a claim is true or whether the demand is real: `verify.py` and `verify_quotes.py` prove only that a quote is in your capture, and you decide what it means. A pass here means the prose stays inside the accepted claims, nothing more. The judge's known false flags (heavy paraphrase around a negation) apply: stay close to the claim wording.

Origin: joins our `my_flows/research/demand_research` and `evidence_verification` with the course's Research Report Agent (`write only from evidence`, a terminal state per run), Document QA's citation receipt (exact support kept apart from relevance) and Report Judge. Course code untouched. Tests: [tests/test_demand_report.py](../../../tests/test_demand_report.py).
