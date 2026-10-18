# Evidence verification: verify.py

`verify.py` forces every claim to carry words copied from a file you hold, then checks by plain text search that those words are really there. It is deliberately dumb: a model can write a convincing quote that is invented or from a different page, and string search cannot be charmed. Standard library only.

## The workflow

1. **Gather from any source** (Perplexity, Gemini, HARPA, YouTube, Reddit by hand, Firecrawl). These give leads, not facts.
2. **Capture each source as one `.md` (or `.txt`) file** in `snapshots/`, with `url` and `retrieved_at` in front matter.
3. **Write claims in `claims.md`**, one block each, with a quote copied from the snapshot.
4. **Run** `python3 -I verify.py claims.md snapshots/`.
5. **Fix failures at the source.** Recapture the page or drop the claim. Never edit a quote to make it pass.
6. **Record your decision** with `- status: accepted` or `- status: rejected` under each claim.
7. **Write up from accepted claims only** (`--accepted accepted.md` writes exactly those).

## The two input files

A snapshot (front matter is read for the source and date, never searched):

```markdown
---
url: https://example.com/r/renters/thread1
retrieved_at: 2026-10-17
---

Honestly I would pay for something that tracks my rent payments automatically.
```

A claims file (`##` heading = claim id, `- key: value` = field; `claim`, `quote`, `snapshot` required; a value may continue on indented lines):

```markdown
## c1
- claim: A renter says they would pay for automatic rent tracking
- quote: I would pay for something that tracks my rent payments automatically
- snapshot: thread1.md
- found_by: perplexity
- extractor: claude
- status: pending
```

## Options

| Option | What it does |
|---|---|
| `--lock snapshots.lock` | Records each snapshot's SHA-256 the first time it is used; later runs fail if a file changed (tamper or silent re-capture) |
| `--report report.md` | Writes the results, per-tool tallies and warnings to a file |
| `--accepted accepted.md` | Writes only claims that pass **and** are marked accepted: the input to a write-up |
| `--max-age-days 365` | Fails claims whose `posted_at` (claim or snapshot) is older than this |

Exit codes: `0` every claim passed, `1` at least one failed, `2` bad input. So it can gate a pipeline.

## Worked example: 13 claims

```bash
cd example
python3 -I ../verify.py claims.md snapshots/
```

Result (verified here): `7/13 claims pass`, exit 1, plus one REVIEW, two WARN lines and the per-tool tallies (`found_by: gemini 4/5, harpa 0/3, perplexity 3/5`, `extractor: chatgpt 3/5, claude 4/8`).

| Claim | Result | Why |
|---|---|---|
| c1 | ok | Plain quote, present word for word |
| c2 | ok | The snapshot has the text as a markdown link; markup is stripped before matching |
| c3 | ok | Curly apostrophe and extra spaces are normalised |
| c4 | ok | `&amp;` and bullet markers are stripped |
| c5 | FAIL | The quote is invented. This is the case the script exists for |
| c6 | ok | Uses `…` to skip words; both pieces appear, in order |
| c7 | FAIL | Both pieces exist, but in the opposite order |
| c8 | FAIL | The words appear only in the front matter, which is never searched |
| c9 | FAIL | The snapshot has "good enough" in quote marks; the quote left them out. Exact means exact |
| c10 | FAIL | No url or retrieved_at in the claim, and the snapshot has no front matter |
| c11 | ok, WARN | Found, but in a 58-character blocked-page stub. A pass is not proof |
| c12 | FAIL | The snapshot file named does not exist |
| c13 | ok, REVIEW | Same claim as c3 with a different quote: two extractors disagree |

## How it works

- `norm()` makes quote and snapshot comparable: NFKC, inline HTML and `<br>` removed, entities unescaped, image/link markup reduced to visible text, heading/quote/bullet markers and emphasis removed, curly quotes and all dash variants unified, whitespace collapsed, `casefold()`. The same function runs on both sides, so any remaining difference is a real difference in words.
- `split_front_matter()` separates the `---` block; only the body is searched (c8).
- `check_quote()` splits on `...` / `…` and finds each piece **after** the previous one, which enforces order (c7). Thresholds: `MIN_QUOTE = 25`, `MIN_PART = 12`, `MIN_SNAPSHOT = 300` (warning only). They are chosen, not tuned on real captures (our inference).
- `run()` fills a missing `url` / `retrieved_at` from the snapshot, validates `status`, catches duplicate ids and URL mismatches, then `render()` prints results, REVIEW, WARN and the tallies.
- Why `python3 -I`: isolated mode ignores the current directory when importing, so a captured folder containing a file named `html.py` cannot replace the standard library.

## What a pass proves, and what it does not

A pass means one thing: these words exist in the markdown you captured, at the date in its front matter.

| Gap | What you do |
|---|---|
| Paraphrase that happens to match another sentence | Read the matched sentence yourself |
| Cherry-picking: real quote, opposite context | Read the paragraph around it |
| Someone quoting someone else | Check who is speaking |
| Repeated posts look like many voices | Use the distinct-url count; deduplicate by author |
| An edited or wrong snapshot | Never edit snapshots; use `--lock` |
| Blocked or stub pages | Heed the WARN; recapture |
| Does the claim follow from the quote? | Human review, always |

## Exercises (each answer was run)

- **E1.** Change c9's quote to `Some people in the replies said the free apps were`. c9 passes.
- **E2.** Delete one character from c1's quote. c1 fails.
- **E3.** Add `url:` and `retrieved_at:` front matter to `thread2.md`. c10 passes.
- **E4.** Set `MIN_QUOTE = 60`. Nine more claims fail as too short.
- **E5.** Capture a real page as `snapshots/mine.md` and write two claims: one exact quote (passes), one paraphrase (fails).

Course theory for this workflow: see `W01` in [../../to_confirm/](../../to_confirm/).
