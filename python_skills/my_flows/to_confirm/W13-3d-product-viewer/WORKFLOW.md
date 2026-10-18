# W13 · 3d product viewer

**Type** B: course + outside repo · **Goals** 3d and geometry, sales · **Status** to confirm

The website half of the engine: model-viewer shows the active look, a dashboard switches looks, publish_web.py uploads new looks.

## How the parts connect

1. W10's look_<id>.glb files + thumbnails
2. publish_web.py (supabase-py) uploads to Storage and writes `looks` rows
3. the site's <model-viewer> loads the active look; colourways are material variants, other garments are another file
4. a password-protected dashboard updates `active_look`

## Run (target)

```bash
python publish_web.py better-style --dry-run
```

## Pass

Dry run lists the uploads and rows it would write; on a test Supabase project, switching the look in the dashboard changes the viewer on reload.

When it passes on the laptop, it moves to `python_skills/confirmed/engine_3d (web stage)` and its row in `../REGISTRY.csv` becomes `confirmed` with the evidence.

Parts: [PARTS.md](PARTS.md) · Tasks for Claude Code: [TASKS.md](TASKS.md)
