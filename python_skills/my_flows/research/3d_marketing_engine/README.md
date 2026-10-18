# 3D marketing engine

The engine turns a brand's model into a posable 3D avatar that wears the brand's merch as 3D garments. The avatar shows up in two places: on the brand's website, where the CEO switches looks from a dashboard, and in short rendered clips that run as Snapchat ads. Better Style first, then any brand.

- **Python rule:** every stage is a script with one input folder and one output folder, so a new brand is one config file and one command.
- **Budget rule:** tools cost at most $20 in total. Ad spend is separate.

## Decision: the body route is Anny

Decided 2026-10-18. The first body is built with **Anny**, a parametric human body model, fitted to the model's measurements and photos. Photogrammetry (a scan of the real person) is kept for later, for a flagship likeness demo.

| | Anny (chosen) | Photogrammetry + Mixamo (later) |
|---|---|---|
| How | An adjustable 3D human set to the model's height, build and proportions | COLMAP or Meshroom reconstructs a scan from 150-300 frames; Mixamo adds a rig |
| Licence | Code Apache-2.0, data CC0 (source claim from the project; confirm on the repo before client work) | Meshroom MPL-2.0, COLMAP new BSD; Mixamo free with an Adobe ID |
| Good | Clean mesh, consistent topology, easy to dress and animate, no special shoot | Real face and skin |
| Weak | Body type, not exact likeness | Needs a dedicated shoot; scans are messy; harder to dress |

Avoid SMPL-X (its licence forbids commercial use) and LHM weights (CC BY-NC 4.0, research only; checked in the repo's modelcard on 2026-10-17).

## Stages

| # | Stage | Script | In → out |
|---|---|---|---|
| 1 | Capture | `capture.py` | Phone video → sharp frames (ffmpeg, OpenCV blur score) + `manifest.json`. With Anny this is reference photos and measurements; the full orbit shoot is only for photogrammetry |
| 2 | Body | `avatar.py` | Anny fitted to measurements → `avatar.glb` with a rig |
| 3 | Wardrobe | `wardrobe.py` | Garment templates (tee, hoodie, joggers, cap) × brand prints → `garments/<sku>.glb` + `garments.json` |
| 4 | Drape and render | `drape_render.py` (runs under `bpy`) | Pose the avatar, cloth-simulate each garment, bake → `look_<id>.glb` for the web, 1080×1920 Eevee frames → MP4 (ffmpeg) for ads |
| 5 | Website and CEO wardrobe | `publish_web.py` | Upload GLBs and thumbnails to Supabase Storage, write `looks` rows; `<model-viewer>` shows the active look |
| 6 | Snapchat ads | `snap_ads.py` | See [../ads_layer/](../ads_layer/) |

Garment templates: `pygarment` (GarmentCode, MIT) designs parametric sewing patterns in Python.

## Environment: two Python environments

Verified here on 2026-10-17: `bpy` 5.2.2 needs Python 3.13 exactly and brings numpy 2.x, while `pygarment` 2.0.2 requires numpy<2. In one environment pip quietly installs `pygarment` 1.0.0 instead. So:

- **Environment A (Python 3.13):** `bpy`, Anny loading, draping, rendering, export.
- **Environment B:** `pygarment` pattern design, exporting garment meshes to files that environment A reads.

Stages talk through files, so the split costs nothing.

## Check a detail is visible before modelling it

`legibility.py` turns camera, lens and render size into millimetres per pixel: `distance * sensor_width / (focal_length * width_px)`. A feature needs about 3 px to read as a shape, so at the robot audit's hero camera (85 mm, 11.6 to 14.8 m, 960 px wide, 36 mm sensor) one pixel is 5.11 to 6.51 mm and nothing under 15 to 19 mm reads as geometry. That detail is delivered by the material (a shading seam, a texture), not by modelling. Lines are the exception: the eye picks up a 1 to 1.5 px dark seam far below the size at which it resolves a shape.

```bash
python3 -I legibility.py                                              # the audit's three cameras
python3 -I legibility.py --focal 85 --distance 11.59 14.76 --feature-mm 5
```

Verified here on 2026-10-18: the three cameras give the audit's numbers (5.11 to 6.51, 10.96 to 11.12 and 2.40 to 4.36 mm per pixel, to rounding). Use it on the engine's own cameras before a garment gets seams, stitching or prints that must read.

## Database (Supabase)

| Table | Holds |
|---|---|
| brands | name, logo, site URL |
| garments | sku, template, colour, print file |
| looks | garments, pose, GLB URL, clip URL |
| active_look | the look each brand's site shows now |

The CEO dashboard is a password-protected page listing every look; tapping one updates `active_look`.

## Repo layout (when built)

```
engine/
  run.py                  # python run.py better-style --stage all
  brands/better-style.yaml
  stages/capture.py avatar.py wardrobe.py drape_render.py publish_web.py snap_ads.py
  templates/              # pygarment tee, hoodie, joggers, cap
  data/<brand>/           # local only, never committed
```

Each stage writes `manifest.json` and is skipped when its outputs exist, unless `--force`. Keys live in `.env`, never in the repo.

## Build order (each with a pass test)

1. **Body.** Anny fitted to one model. Pass: proportions match the model's measurements.
2. **Rig and pose.** One pose rendered in Blender. Pass: no broken joints or stretched texture.
3. **First garment.** One Better Style tee, draped, 6-second pull-back clip. Pass: someone who has not seen the project calls it real at a glance.
4. **Three garments.** Pass: the drape still looks believable. Only then open it to brands.
5. **Website and wardrobe.** Three looks in `<model-viewer>`, dashboard switching. Pass: the CEO switches looks on a phone.
6. **Snap test.** One ad at the minimum budget for three days. Pass: it clears review and stats land in the database.
7. **Second brand.** Pass: only a new YAML file, no code changes.

Fabric is the step most likely to look fake: prove one tee before building the wardrobe.

## The pitch to brands

The brand sends its model's measurements and photos (a consenting person; the founder is easiest) plus merch artwork, and gets back short 3D clips wearing their merch for Snap ads and a 3D viewer for their site. Everything runs as a Python batch.

## Not verified

- Anny's licence and fitting API, on its repo
- Blender cloth quality on an Anny body
- Supabase and Vercel free-tier limits
- Snapchat's minimum budget (a third-party guide says $5 a day), Ads API approval, and whether a Nigerian card works for billing

Sources: [Meshroom](https://github.com/alicevision/Meshroom), [LHM](https://github.com/aigc3d/LHM), [SMPL-X licence](https://smpl-x.is.tue.mpg.de/modellicense.html), [pygarment](https://pypi.org/project/pygarment), [bpy](https://pypi.org/project/bpy/), [model-viewer variants](https://modelviewer.dev/examples/scenegraph), [Mixamo guide](https://app.cinevva.com/guides/free-character-animations-rigging).

Build: `W10` (body and garment), `W11` (geometry), `W13` (3D viewer) in [../../to_confirm/](../../to_confirm/).
