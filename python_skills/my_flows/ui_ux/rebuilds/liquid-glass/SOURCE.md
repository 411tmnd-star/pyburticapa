---
project: liquid-glass
code: github.com/411tmnd-star/liquid-glass (its own repo)
built: 2026-10-12, in a Claude Code session on the laptop
arrived_by: an X post with a video, plus our own reference photos
creator: credit the post's creator here (link and handle to be copied from the 12 Oct session on the laptop)
licence: no code was copied; the effect was written from scratch after studying frames
---

## How it was made

1. The X post's video was sampled into frames with ffmpeg (the step `../../intake/frames.py` now does).
2. The effect was studied frame by frame: a refractive glass ring and ripple over an image.
3. `liquid-glass.js` was written by hand as a reusable WebGL1 library, so the same effect can be used in other designs; `index.html` is the onboarding flow that uses it.

## What we took

The technique (refraction through a ring, ripple timing). No artwork, logo or code from the post.

## To do on the laptop

Copy the post link and creator handle from the 12 Oct session into the `creator:` line above.
