# W05 · Outlier demand digest

**Type** A: course + our workflow · **Goals** marketing, research and 411 · **Status** to confirm

Feed yt_outliers' winning videos into the demand loop: each flagged video becomes a snapshot verify.py can check, and the topics that win are grouped with counts by code.

## How the parts connect

1. yt_outliers flags videos above the channel multiple (as today)
2. each flagged video → `snapshots/<id>.md` with url, retrieved_at, title, description
3. Feedback Theme Board groups titles into themes with phrase evidence and distinct-source counts
4. Chart Storyboard Builder turns the theme table into one page; claims about a theme go through verify.py

## Run (target)

```bash
python digest.py outliers_out/ --out digest/
```

## Pass

On yt_outliers' sample run, every flagged video has a snapshot with front matter, themes list distinct channels, and a claim quoting a title passes verify.py.

When it passes on the laptop, it moves to `python_skills/confirmed/yt_outliers (extended)` and its row in `../REGISTRY.csv` becomes `confirmed` with the evidence.

Parts: [PARTS.md](PARTS.md) · Tasks for Claude Code: [TASKS.md](TASKS.md)
