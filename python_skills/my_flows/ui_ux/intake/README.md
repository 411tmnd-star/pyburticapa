# Intake

Turns one design (an X post, a clip, a repo) into a saved, credited source plus a brief a rebuild can follow.

## Three routes in

| Route | When | What happens |
|---|---|---|
| **A. Attach** | In Claude chat (phone or desktop) | You save or screen-record the clip and attach it, and paste the post text and the creator's handle. Chat cannot open X links |
| **B. Laptop** | On the laptop | `python ../../../confirmed/x_pipeline/x_link.py LINK` saves post text, images and video into `x_inbox/` (git-ignored). Then run `frames.py` on the video |
| **C. Queue** | Only a link, nothing attached | Add it to [design_queue.md](design_queue.md); process it on the laptop with route B |

Repos: clone shallow into a git-ignored `clones/` folder; record the commit and licence in `source.md`.

## Steps

1. **source.md** from [SOURCE_TEMPLATE.md](SOURCE_TEMPLATE.md): link, handle, date, how it arrived, post text exactly as saved.
2. **Frames:** `python frames.py clip.mp4 work/frames --fps 4` (use `--all` for loops under ~3 s). Writes `f_0001.jpg …` and `frames.json`.
3. **Contact sheet:** `python ../motion/contact_sheet.py work/frames work/sheet.jpg --cols 6 --width 240 --label`. Look at it before writing anything.
4. **brief.md** from [BRIEF_TEMPLATE.md](BRIEF_TEMPLATE.md): layout, type, colour, materials, every motion beat by frame number, the likely technique, what done looks like.
5. **Decide:** rebuild, park or drop. A rebuild goes to `../rebuilds/<slug>/` with its `SOURCE.md`.

Licence gate for repos: MIT, Apache, BSD, Unlicense: copy what you need with the LICENSE beside it. GPL/AGPL: keep separate from closed work. No licence or "no republishing as-is": study only, rebuild originally.

`frames.py` is tested on a synthetic ffmpeg clip (12 frames at 4 fps from 3 s; 72 frames with `--all`; exit 2 on an unreadable file). Its `frames.json` is the format the scroll-scrub page reads.
