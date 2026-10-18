# W09 · Blockout to ai film

**Type** A: course + our workflow · **Goals** 3d and geometry, marketing, design · **Status** to confirm

The campfire pipeline made runnable: Blender clay blockout, a depth pass per shot, style frames through ControlNet depth, image-to-video per shot, every version on one wall.

## How the parts connect

1. diorama_blockout.py renders clay frames and, new, a depth pass per shot (L04-26 explains what the depth map is)
2. first and last frame of each shot + depth → ComfyUI with ControlNet depth (L08-08) → style frames
3. style frames → Wan 2.2 image-to-video per shot (L08-10, L04-28)
4. contact_sheet.py walls every version; L08-14's CLIP score is an extra signal next to your eye

## Run (target)

```bash
python diorama_blockout.py --out clay --every 4 --depth
```

## Pass

Clay and depth frames render for all 8 beats; one shot goes through ComfyUI + Wan on a free GPU and lands on the wall. Licences of ControlNet and Wan checked first.

When it passes on the laptop, it moves to `python_skills/confirmed/ai_film` and its row in `../REGISTRY.csv` becomes `confirmed` with the evidence.

Parts: [PARTS.md](PARTS.md) · Tasks for Claude Code: [TASKS.md](TASKS.md)
