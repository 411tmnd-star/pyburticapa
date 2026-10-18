# W11 · Geometry toolkit

**Type** B: course + outside repo · **Goals** 3d and geometry · **Status** to confirm

A small, tested geometry module the 3D work shares: vectors, rotations, camera intrinsics and projection, point-cloud load and transform, built from the course's linear algebra code.

## How the parts connect

1. vectors and matrices from L01-01's code; tensor shapes from L01-12
2. camera: intrinsics, extrinsics, project and unproject, matching COLMAP's pinhole model
3. point clouds: read COLMAP's text export, transform, write PLY (L04-13)
4. used by W09 (camera paths) and W10 (fitting, scale)

## Run (target)

```bash
python -I -X utf8 -m unittest discover -s geometry/tests   # stdlib unittest; the repo does not use pytest
```

## Pass

Round-trip tests: project then unproject returns the point within 1e-9; a COLMAP sample's points reproject onto its images within 1 pixel.

When it passes on the laptop, it moves to `python_skills/confirmed/geometry` and its row in `../REGISTRY.csv` becomes `confirmed` with the evidence.

Parts: [PARTS.md](PARTS.md) · Tasks for Claude Code: [TASKS.md](TASKS.md)
