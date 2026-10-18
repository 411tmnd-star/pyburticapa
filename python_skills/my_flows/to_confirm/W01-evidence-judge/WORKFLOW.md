# W01 · Evidence judge

**Type** A: course + our workflow · **Goals** research and 411 · **Status** to confirm

Upgrade verify.py from 'is the quote in the snapshot' to 'does each sentence of a write-up rest on an accepted claim'. verify.py stays the quote gate; the course's Report Judge adds sentence-level citation checks on the write-up built from accepted.md.

## How the parts connect

1. `verify.py claims.md snapshots/ --lock snapshots.lock --accepted accepted.md` (as today)
2. write-up.md cites claim ids in every sentence, e.g. `[c1]`
3. new `judge.py write-up.md accepted.md`: every sentence has an id, every id is accepted, the sentence shares words with the quote (Report Judge's lexical-support idea)
4. exit 1 on any unsupported sentence, so the pair gates a publish

## Run (target)

```bash
python3 -I judge.py example/write-up.md example/accepted.md
```

## Pass

On a 6-sentence example write-up with 2 planted faults (one uncited sentence, one citing a rejected claim), judge.py flags exactly those 2 and exits 1.

When it passes on the laptop, it moves to `python_skills/confirmed/evidence_judge` and its row in `../REGISTRY.csv` becomes `confirmed` with the evidence.

Parts: [PARTS.md](PARTS.md) · Tasks for Claude Code: [TASKS.md](TASKS.md)
