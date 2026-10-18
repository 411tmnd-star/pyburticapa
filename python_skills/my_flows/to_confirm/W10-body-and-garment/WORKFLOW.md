# W10 · Body and garment

**Type** A: course + our workflow · **Goals** 3d and geometry, marketing, sales · **Status** to confirm

Stages 2-4 of the 3D engine with Anny as the body: fit Anny to measurements, build one tee pattern in pygarment, drape it in Blender, render a 6-second pull-back clip.

## How the parts connect

1. measurements (and optionally keypoints from photos, L04-21) → Anny body → avatar.glb with a rig (environment A, Python 3.13 + bpy)
2. pygarment tee pattern sized to the avatar → garment mesh file (environment B, numpy<2)
3. Blender cloth simulation drapes the tee on a posed avatar → look_<id>.glb and Eevee 1080x1920 frames → MP4
4. SAM-style segmentation (L04-24) cuts the model out of reference photos for comparison; L04-13/L04-22/L08-12 are the theory for the later photogrammetry route

## Run (target)

```bash
python run.py better-style --stage body,wardrobe,drape
```

## Pass

Anny matches the given measurements within 1 cm; one tee drapes without intersecting the body; the 6-second clip renders. Then the judgment pass: someone who has not seen the project calls it real at a glance.

When it passes on the laptop, it moves to `python_skills/confirmed/engine_3d` and its row in `../REGISTRY.csv` becomes `confirmed` with the evidence.

Parts: [PARTS.md](PARTS.md) · Tasks for Claude Code: [TASKS.md](TASKS.md)
