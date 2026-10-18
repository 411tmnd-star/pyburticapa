# W17 · Follow up desk

**Type** C: course + course · **Goals** sales · **Status** to confirm

A reactive sales desk: incoming enquiries become a review queue with unsent reply drafts, and promises made in calls or chats become dated follow-ups on the 1, 2, 3, 7, 14, 21, 28, 56, 84-day ladder.

## How the parts connect

1. Inbox Triage Desk: exported email → evidence-backed queue + unsent drafts
2. Meeting Notes to Actions: notes → source-linked commitments needing your decision
3. follow-up ladder from the sales playbook; read past messages first so an opted-out contact is never nudged
4. nothing is sent; you review every draft

## Run (target)

```bash
python desk.py inbox_export.mbox notes/ --out desk/
```

## Pass

On fixtures, each enquiry has a draft linked to its message, each commitment has a due date, and an opted-out contact gets no follow-up.

When it passes on the laptop, it moves to `python_skills/confirmed/follow_up_desk` and its row in `../REGISTRY.csv` becomes `confirmed` with the evidence.

Parts: [PARTS.md](PARTS.md) · Tasks for Claude Code: [TASKS.md](TASKS.md)
