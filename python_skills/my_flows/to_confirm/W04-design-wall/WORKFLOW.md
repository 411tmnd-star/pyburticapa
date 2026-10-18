# W04 · Design wall

**Type** A: course + our workflow · **Goals** design, marketing · **Status** to confirm

Turn the contact sheet into a reviewable wall: every version tiled, each tile tagged with notes, and a short storyboard page that explains the pick.

## How the parts connect

1. contact_sheet.py tiles the versions (as today)
2. a `wall.json` beside the image records each tile's file, label and position (Visual Evidence Library's coordinate evidence)
3. notes per tile come from the crit sheet's Markdown export
4. Chart Storyboard Builder's presentation step renders one HTML page: the wall, the notes, the chosen version and why

## Run (target)

```bash
python contact_sheet.py renders/ wall.png --label --json wall.json && python storyboard.py wall.json notes.md
```

## Pass

On 12 synthetic renders, wall.json has 12 tiles with correct positions and the HTML page opens with every note attached to the right tile.

When it passes on the laptop, it moves to `python_skills/confirmed/design_wall` and its row in `../REGISTRY.csv` becomes `confirmed` with the evidence.

Parts: [PARTS.md](PARTS.md) · Tasks for Claude Code: [TASKS.md](TASKS.md)
