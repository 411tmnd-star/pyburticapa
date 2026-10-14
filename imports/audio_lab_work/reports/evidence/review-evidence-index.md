# Accretion v0: visual evidence index

Date 2026-10-13. All files are in this folder, prefixed `review-`. Every screenshot is a single `Page.captureScreenshot` PNG from the GPU-enabled Edge, unmodified. Contact sheets are scaled crops of those PNGs. "State at capture" values are read from the animator just before the screenshot was taken, so they can lag the image by up to a frame or two.

**Input labels.** *silent* = no source. *scripted* = my synthetic FeatureSource (constant values, optional `hit()` / `beat()`), injected with `pipeline.setSource`. *demo* = the harness's 120 BPM synthetic source. **No real music was used anywhere.** Every state is multi-frame only where stated; everything else is a still.

Common conditions: Edge 155.0.4283.45 headless, ANGLE D3D11 on Intel UHD (0x9B41), WebGL 2, viewport 1280x900, DPR 1, canvas 1248x563, normal motion, unless the row says otherwise.

| ID | File | State | Input | Notes |
|---|---|---|---|---|
| A1, A1b | review-A1-rest-silent.png, review-A1b-rest-silent-plus1p5s.png | Resting | silent | two stills, 1.5 s apart |
| A2 | review-A2-rest-low-energy.png | Resting, low energy | scripted rms .12 bass .10 mid .12 | |
| A3 | accretion-silent.png (existing) | Resting | silent | earlier phase, 1280x720 |
| B1-B3 | review-B1/B2/B3-sustained-*.png | Sustained | scripted rms .55 bass .45 mid .60 high .35, no hits | three stills ~0.5 s apart; not a sequence |
| B4, B5 | review-B4/B5-demo-synthetic-*.png | Sustained, demo | demo 120 BPM | mixed kick pattern |
| C0-C10 | review-C0-bass-pre.png ... review-C10-bass-post-3s.png | Bass impulse | scripted rms .45 bass .30, one `hit(1)` | **one event**: before, nine consecutive stills at +1 to +1217 ms, one at ~+3 s. Per-frame data in review-data.json (`runs.bass.jetCurve`) |
| D0-D6 | review-D0 ... review-D6-*.png | Onset / flare | scripted, one `beat(0.9)`, later a train of 20 beat frames 60 ms apart | D1-D4 follow the single beat; D5-D6 are from the train |
| E (6) | review-E-normal-{1,2,3}-*.png, review-E-reduced-{1,2,3}-*.png | Normal vs reduced motion | same scripted sequence, fresh page each | sustained, ~0.1 s after hit, ~0.1 s after beat. Disk rotation phase differs between runs |
| F (6) | review-F-comp-{1280x720,1920x1080,1280x900,1280x900-dpr1p5,768x1024,390x844}.png | Composition | scripted sustained | canvas sizes in the sheet and in review-data.json |
| F2a-F2d | review-F2a ... F2d-*.png | Depth views | scripted hit base, recorded drag input | elevated, elevated +0.1 s after hit, near edge-on, azimuth shifted |
| G1 | accretion-after-restore.png (existing) | After context restore | silent | existing evidence only; **context loss was not re-triggered** |
| G2 | accretion-reduced-motion.png (existing) | Reduced motion (earlier) | demo | existing evidence only |
| Z1-Z4, D1 | review-zoom-details.png | Zoom crops (3x / 2x nearest neighbour) and one contrast-stretched DIAGNOSTIC | from C1, C10, B1, F2a, A1 | the diagnostic multiplies A1 by 12; it is an analysis aid, not a render of the scene |

Contact sheets: `review-contact-sheet-1-states.png` (A to D), `review-contact-sheet-2-motion-composition.png` (E to G).

**NOT CAPTURED:** video or an unbroken frame sequence at display rate; real-music frames; headed-window frames; a fresh context-loss recovery frame in an active (non-silent) state; the Next route `/lab/accretion`.

Data and scripts: `review-data.json` (provenance, per-run summaries, per-frame curves), `review-data-views.json`, `review-capture.mjs`, `review-capture-views.mjs`, `review-imgtool.mjs`. Note: `review-capture.mjs` ended with an error (`b.drag is not a function`) after finishing every section except the depth views; `review-capture-views.mjs` produced those. The error is recorded in review-data.json.
