# W03 · X design mode

**Type** A: course + our workflow · **Goals** design, marketing · **Status** to confirm

Give the X tool a design mode: when a saved post's video has no speech (or --design is passed), make frames, a contact sheet and a brief scaffold next to the note.

## How the parts connect

1. `x_link.py LINK --design` saves text, images, video as today
2. speech check: transcript under ~20 words, or the Voice Note Transcriber's offline activity check, marks the clip as a design clip
3. frames.py → frames/ + frames.json; contact_sheet.py → sheet.jpg; BRIEF_TEMPLATE.md copied to brief.md with frame count filled in
4. everything lands in x_inbox/ (git-ignored)

## Run (target)

```bash
python x_link.py <a design post link> --design
```

## Pass

On one real design post (the liquid-glass source), the inbox folder holds the note, frames/, frames.json, sheet.jpg and a brief.md scaffold; existing x_pipeline tests still pass.

When it passes on the laptop, it moves to `python_skills/confirmed/x_pipeline (extended)` and its row in `../REGISTRY.csv` becomes `confirmed` with the evidence.

Parts: [PARTS.md](PARTS.md) · Tasks for Claude Code: [TASKS.md](TASKS.md)
