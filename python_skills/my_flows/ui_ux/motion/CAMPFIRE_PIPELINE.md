# 3D blockout to AI film

The pipeline behind the opening film in the design talk, as seen in frame, mapped to tools we can run. Our inference where marked.

| Step | In the talk (seen in frame) | Our route |
|---|---|---|
| 1. Block out in 3D | Cinema 4D file v025 with CAM / LIGHTS / GEO, 46-frame timeline | `diorama_blockout.py` in Blender via Python |
| 2. Lock the camera | One continuous move, transitions hidden behind foreground wipes | Key the whole move in clay; judge it on a contact sheet, not only in playback |
| 3. Export guides | Clay frames | First and last clay frame per shot, plus a depth pass (Workbench, or EEVEE Mist/Z) |
| 4. Explore style per element | Node canvas "Design Frames Explorations": 6 groups × about 10 outputs | ComfyUI + ControlNet depth so the layout holds; one group per element (our inference) |
| 5. Animate each shot | Image-to-video from a key frame | Wan 2.2 through ComfyUI-WanVideoWrapper, start and end frame per shot (our inference) |
| 6. Review every version | An 8 × 7 wall of 56 versions | `contact_sheet.py` over every export |
| 7. Edit | Cuts on hidden wipes, 7 s hero hold | Any editor; ffmpeg to join |

Not checked: which tools made the talk's style frames and video; licences of ControlNet and Wan 2.2.

Build: `W09` in [../../to_confirm/](../../to_confirm/).
