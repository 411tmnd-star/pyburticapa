# Evidence judge

`verify.py` is the quote gate: is each quote literally in its snapshot. `judge.py` is the second gate, on the write-up you build from the claims you accepted: **does every sentence rest on an accepted claim?** It gates a publish the same way (exit 1 on any flag). Standard library only.

```
claims.md + snapshots/ ──verify.py --accepted──► accepted.md ──┐
                                                               ├──► judge.py ──► per-sentence verdicts, exit 0/1
write-up.md (every sentence cites [c1] ...) ───────────────────┘
```

```bash
python -I -X utf8 python_skills/confirmed/evidence_judge/judge.py WRITEUP.md ACCEPTED.md [--threshold 0.5] [--json]
```

Try it on the worked example (6 sentences, 2 planted faults):

```bash
python -I -X utf8 python_skills/confirmed/evidence_judge/judge.py \
  python_skills/confirmed/evidence_judge/example/write-up.md \
  python_skills/confirmed/evidence_judge/example/accepted.md
```

```
S1 ok   line 3 [c1] overlap 0.86: One renter says they would pay for something that tracks rent automatically
S2 FLAG line 4 -: Most renters would drop their spreadsheet for a free tool tomorrow
      -> uncited
S3 ok   line 5 [c2] overlap 0.67: The same thread says the landlord's reminder portal never gets opened
S4 ok   line 5 [c3] overlap 0.67: Spreadsheets turn into a mess every month
S5 FLAG line 6 [c5]: Everyone has abandoned spreadsheets for rent tracking
      -> cites a claim that is not accepted: c5
S6 ok   line 7 [c4] overlap 1.00: Two paid apps at $15 a month felt too expensive
note: accepted but never cited: c6
6 sentence(s): 4 supported, 2 flagged
```

Exit codes: `0` every sentence supported, `1` at least one flagged, `2` bad input (missing file, no sentences, threshold outside 0 to 1).

## The write-up

Plain Markdown. Put the claim id in square brackets inside the sentence: `[c1]`, `[c1][c2]` or `[c1, c2]`. Headings, code fences and blank lines are skipped; `[text](url)` links are not citations. Sentences may wrap across lines. A claim id that is not in `accepted.md` (rejected, still pending, failed the quote check, or mistyped) is a flag.

## What is checked, in order

| Check | Flag text |
|---|---|
| the sentence has a citation | `uncited` |
| every cited id is in `accepted.md` | `cites a claim that is not accepted: c5` |
| every number in the sentence is in the cited claim or quote | `number not in the cited evidence: 5` |
| the sentence neither adds nor drops a negation (`no not never cannot nobody nothing without ...`) | `negation differs from the cited evidence` |
| enough of the sentence's content words are in the cited claim plus quote (light stemming, common and "says/noted" words ignored) | `low word overlap 0.29 (need 0.50)` |

Overlap is the share of the sentence's content words found in the cited claims' text and quotes together. Several citations pool their evidence, so a sentence may combine two accepted claims.

## What a pass does not prove

A flag is a place for a human to look; a pass is not a finding of truth. Word overlap cannot see that a sentence means something different from its source. It also cannot see a quote taken out of context, and it never checks the snapshot itself: that is `verify.py`'s job.

Known false flags (paraphrase changes the words around a negation, or the vocabulary entirely), from the calibration set in `tests/test_evidence_judge.py`:

- "Landlord reminders sent through a portal go unread" cites a quote with "never open": flagged for negation.
- "Roommates lose track of who paid" cites "nobody knows who paid what": flagged for negation.
- "Keeping rent in a spreadsheet gets messy each month" cites "a mess every month": overlap 0.29.

The cure is to stay close to the accepted claim's wording, not to loosen the check.

## Why 0.5

On the calibration set (invented claims, 7 sentences that must pass and 10 that must be flagged), sentences about something else score at most 0.29 and the paraphrases that should pass score 0.67 or more, so 0.5 leaves room on both sides. A first try at 0.6 left one good sentence exactly on the line. Change it with `--threshold`; the test `test_threshold_moves_the_line` shows the effect.

## From code

```python
sys.path.insert(0, "python_skills/confirmed/evidence_judge")
import judge
accepted = judge.parse_accepted(open("accepted.md", encoding="utf-8").read())
verdicts = judge.judge(open("write-up.md", encoding="utf-8").read(), accepted)   # list of dicts: n, line, text, cites, supported, score, reasons
```

## Origin

Joins our `my_flows/research/evidence_verification/verify.py` with the course's Report Judge (`projects/report-judge`, its lexical-support idea: uncited, dangling, negation, number, overlap) and the claim-versus-confidence lesson CC-05. The course code is untouched; this is an original implementation for our claim format. Tests: [tests/test_evidence_judge.py](../../../tests/test_evidence_judge.py).
