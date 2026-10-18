# UI / UX

Our design workflow: see a design (usually on X), bring it in, break it down, rebuild the technique as our own, review it. Python does the mechanical parts (frames, contact sheets, Blender renders); you judge the result.

```
intake/     a post, clip or repo  ->  source.md + frames/ + contact sheet + brief.md
breakdown/  brief  ->  anatomy, timings, crit sheet
motion/     clay blockout, contact sheet wall, scroll-scrubbed sequences
principles/ the rules every original page follows
rebuilds/   finished originals, each with SOURCE.md
references/ the design repos, grouped, with licence and use
```

| Step | Tool | Run |
|---|---|---|
| Video to frames | [intake/frames.py](intake/frames.py) | `python intake/frames.py clip.mp4 work/frames --fps 4` |
| Frames to one image | [motion/contact_sheet.py](motion/contact_sheet.py) | `python motion/contact_sheet.py work/frames work/sheet.jpg --cols 6 --width 240 --label` |
| Brief | [intake/BRIEF_TEMPLATE.md](intake/BRIEF_TEMPLATE.md) | copy, fill from the contact sheet |
| Crit | [breakdown/crit.html](breakdown/crit.html) | open in a browser, load your image |
| Clay camera blockout | [motion/diorama_blockout.py](motion/diorama_blockout.py) | `python motion/diorama_blockout.py --out ./clay --every 4` (needs `bpy` 5.2.2, Python 3.13) |
| Scroll sequence | [motion/scroll_scrub/](motion/scroll_scrub/) | frames from `frames.py` drop straight in |

## Media rule

Other people's videos, frames and cloned repos stay on your machine. The repo holds the code, the process and the briefs. `.gitignore` covers `x_inbox/`, `clones/` and any `work/`, `frames/` or `media/` folder under `ui_ux/`.

## Chat skills that run this

`design-intake`, `design-breakdown`, `ui-design-guardrails`, `dark-surface-depth`. Copies: [../../llm_instructions/chat_skills/](../../llm_instructions/chat_skills/). Chat cannot open X links; the laptop's `x_link.py` downloads posts.

Builds that join this with the course: `W03`, `W04`, `W06`, `W09`, `W12` in [../to_confirm/](../to_confirm/).
