# Motion

| File | What it does | Run |
|---|---|---|
| [contact_sheet.py](contact_sheet.py) | Tiles a folder of images or videos (middle frame of each) into one "iteration wall", natural order (v2 before v10), labelled. Skips unreadable files, never includes its own output | `python contact_sheet.py renders/ wall.png --cols 8 --width 320 --label` |
| [diorama_blockout.py](diorama_blockout.py) | Blender (`bpy`) clay blockout of an original night scene with the 8-beat camera grammar below; renders clay frames headless | `python diorama_blockout.py --out ./clay --every 4` (pip `bpy==5.2.2`, Python 3.13) or `blender -b -P diorama_blockout.py -- --out ./clay` |
| [scroll_scrub/](scroll_scrub/) | A page where scroll position picks the exact frame | see its README |
| [CAMPFIRE_PIPELINE.md](CAMPFIRE_PIPELINE.md) | 3D blockout to AI film, step by step | |

Both scripts were re-run after the upgrade: the contact sheet on a synthetic clip, and the blockout re-rendered in Blender 5 (title hidden until 11.9 s, layered action API handled by `fcurves_of`, depth of field on).

## The camera grammar (from the talk's final version)

| Beat | Time | Move |
|---|---|---|
| S1 | 0.0-2.0 s | Low lateral track through foreground plants (parallax, shallow focus) |
| S2 | 2.0-3.0 s | Foreground trunk wipes across frame (hides the move) |
| S3 | 3.0-5.0 s | Low dolly-in toward the hero |
| S4 | 5.0-6.5 s | Big foreground leaf sweeps across (second wipe) |
| S5 | 6.5-9.5 s | Slow arc around the hero, revealing the secondary prop |
| S6 | 9.5-11.5 s | Pull back; second trunk wipe |
| S7 | 11.5-13 s | Camera clears the trunk, title revealed |
| S8 | 13-20 s | Hold on the hero wide, very slow push |

Version 1's problems (seen in frame): 4.3 s of continuous hard motion, the camera clipping through foliage, a scale jump, an 8 s static hold. The final hides every transition behind something in the foreground and keeps one continuous, slow camera.
