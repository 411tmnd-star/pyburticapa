# Accretion v0: visual evidence and quality review

Date 2026-10-13. Written for the project owner. Working copy `C:\Users\USER\Desktop\audio_lab_work\2026-10-13_accretion-v0\audio_lab\`. Evidence: `evidence\review-*` (index: `evidence\review-evidence-index.md`). No source file, snapshot, earlier evidence file or report was modified. Nothing committed, pushed or deployed.

Labels: **VERIFIED** (measured or seen in this review), **INFERRED**, **SUBJECTIVE**, **UNVERIFIED**.

## 1. Provenance (VERIFIED)

| Item | Value |
|---|---|
| Source tree | the working copy above; newest source file 01:34:08 |
| Preview | existing `preview/serve-gl.mjs` (unmodified), `http://localhost:5354/accretion?source=...`. This is the **preview harness route**, not the Next route `/lab/accretion`, which was not built or run |
| Bundle currency | `preview/dist/accretion.js` (01:34:14, 813,251 B) is newer than every source file. A fresh `esbuild --bundle --minify` (production) of `accretion-entry.tsx` into a scratch folder is **byte-identical** (SHA-256 `7404D49B...330C8A`). The browser also fetched `/accretion.js` and hashed the same value in-page |
| Server | started for this review, stopped afterwards; port 5354 free now |
| Browser | Microsoft Edge 155.0.4283.45, headless, GPU enabled |
| WebGL | `ANGLE (Intel, Intel(R) UHD Graphics (0x00009B41) Direct3D11 vs_5_0 ps_5_0, D3D11)`, `WebGL 2.0 (OpenGL ES 3.0 Chromium)` |
| Main viewport / canvas / DPR | 1280x900; canvas 1248x563 CSS, drawing buffer 1248x563; DPR 1; pixel ratio in use 1 |
| Other tested | 1280x720 (canvas 1248x410), 1920x1080 (1248x716), 1280x900 at DPR 1.5 (buffer 1872x844), 768x1024 (736x668), 390x844 (358x352) |
| Reduced motion | off (host and media query) except the reduced runs (host and media both true, VERIFIED) |
| Audio input | silent, scripted synthetic, or the demo synthetic. **Never live or real music** |
| Stable state | host `ready`, 5 programs, 7 geometries, 121 frames after a 2 s mark: interval median 16.7 ms, p99 18.6, max 19.3, 0 over 33 ms; main thread median 0.4 ms. No console errors or warnings in the main run |

Provenance is established; evidence collection was not blocked.

## 2. Findings

Severity: High / Medium / Low / None. Confidence: High / Medium / Low.

| # | Area | Observation | Evidence | Severity | Confidence | Action |
|---|---|---|---|---|---|---|
| 1 | **Focal point** | The shadow is true black (luminance 0.000 in every state, every frame) and clearly the focal point. Rim brightest, then disk, jets, background, matching the intended hierarchy. | B1, Z1; recorder `cLum` 0.000 in all runs | None | High | none |
| 2 | **Photon ring** | A uniform, thin, continuous bright line around the whole sphere. It reads as a **drawn outline** more than lensed light, and it is the brightest element at rest (peak 0.155 in silence, so it stays visible but dim). Over the lower half it is drawn across the orange band where the disk's front passes in front of the shadow, which looks like a depth contradiction. | Z1, A1, F2c | Medium | Medium (the occlusion reading is from a 3x crop) | rank 2 |
| 3 | **Lensing** | The "lensed far side" is a faint orange arc just above and below the ring. It reads as a soft halo; no light-bending impression of the disk wrapping over the shadow. | Z1, B1 | Medium | Medium. SUBJECTIVE | rank 2 |
| 4 | **Disk** | The strongest element: clear inner gap, layered streaked bands, warm amber to near-white inner edge, coherent palette, not oversaturated. Elevated view (F2a) is far richer than the default view. Rotation advances at 0.59 rad/s sustained, 0.07 at rest (measured). That the motion reads as orbital flow, rather than a rotating texture, is **UNVERIFIED** (stills only). | B1-B3, F2a, Z4; recorder | None | High (stills) / Low (motion) | see rank 1 |
| 5 | **Default camera** | The default view is almost edge-on, so the disk is a thin ellipse about 6:1 and its structure is hard to read. The shadow is small: diameter about 112-132 px in a 1248 px canvas (about 9-10%). Much of the canvas is empty. | B1, F-comp-1280x900, F2a vs F2c | Medium | High (observation) / Medium (that it is a defect; SUBJECTIVE) | rank 1 |
| 6 | **Jets** | Thin, straight, dotted needle (about 20 px wide) starting at the top and bottom of the ring; no visible cone widening; reads as a **column of points** rather than a plasma jet, and not integrated with the disk. Response is correct: bass hit lights them instantly (jet 0.97 at +15 ms), decay 0.62 at 150 ms, 0.13 at 615 ms, 0.02 at 1.2 s, 0.00 by 2.3 s. Region luminance returns to its pre-hit value (0.019). A faint baseline streak remains by design (`0.06 x exposure`). | C0-C10, Z2/Z3, jetCurve | Medium | High (decay) / Medium (look) | rank 3 |
| 7 | **Onset flare** | Bounded and rate-limited. A single beat gives flare 0.72-0.9 decaying to 0.006 in 1.5 s. A train of 20 beat frames in 1.2 s gave **4 accepted, 16 refused** (about 2.9/s). It shows as a bright white arc on the front of the disk, the brightest disk feature but it does not eclipse the shadow or ring. | D1-D6, trainFlareCurve | Low | High (numbers) / Medium (subordination; SUBJECTIVE) | none now; a formal flash analysis is still pending |
| 8 | **Bass vs ring** | The ring swells and brightens with bass (rim 0.36 to 0.58 at +150 ms) and relaxes in about 1.2 s. Note: the ring metric in review-data.json includes the jet column near the ring, so use the screenshots for ring brightness, not `rLum` in the hit curves. | C1-C5, jetCurve | None | Medium | none |
| 9 | **Reduced motion** | Identity preserved. Same brightness (disk 0.177 vs 0.172, ring peak 0.531 vs 0.531), shadow dark, disk rotation 0.21 vs 0.59 rad/s (0.35x), jets 0 and flares 0. The ring still brightens on a bass hit but via the slower 0.35 s attack. A live toggle normal, reduced, normal: motion eased 1.0 to 0.35 in about 1.4 s and back in about 0.4 s with no luminance jump (disk step <= 0.005 in every window); intervals max 20-22 ms. | E1-E6, transition data | None | High | none |
| 10 | **Temporal quality** | Constant input: disk luminance steady (sd 0.006, max frame step 0.005); ring peak jitters sd 0.010 with a max frame step 0.03 (about 6% of 0.53); cause not identified. Frame intervals median 16.6-16.7 ms, max 22-28 ms in instrumented runs (the recorder reads pixels each frame, so these include that cost). No jump, no stuck effect, no NaN, no stall in about 19 page sessions. Visible flicker to a human eye is **UNVERIFIED** (no video review). | per-frame series in review-data.json | Low | Medium | rank 5 note |
| 11 | **Background** | The atmosphere fades with 8-bit contour rings and a large disc edge. Faintly visible at normal contrast (curved edges near x about 295 and 990 in A1, and in the 1920 frame); strongly visible in the x12 diagnostic. Not clipped by geometry in the sense of a hard rectangle. Step size in levels not measured numerically. | A1, F-comp-1920x1080, diagnostic D1 | Low to Medium (display-dependent) | Medium | rank 4 |
| 12 | **Composition** | The canvas is capped at 1248 px wide, so at 1920x1080 there are about 335 px black margins each side and the scene is a card, not an immersive full-bleed view. The controls panel overlays the bottom of the canvas. At 1280x720 the canvas is only 410 px tall. At **390x844 and in narrow frames the disk is clipped at the canvas side edges**. The 768x1024 frame is balanced. | F-comp-* | Medium | High | rank 1 |
| 13 | **Lifecycle** | Existing G1 shows the scene (shadow, ring, disk) returned after restore, in a silent state. Not re-triggered. | G1 | None | Medium | none |
| 14 | **Artifacts** | No z-fighting, no visible clipping of the disk or jets, no geometry edges seen other than item 11. | all frames | None | Medium (stills at 1x) | none |

## 3. Technical validation vs visual quality

- Reused from the earlier report, not re-run: GPU sync timing, bundle size (about 221 KB gzip), 53/53 acceptance and 183/183 unit results, context loss and restore, 30 mount cycles. Reasonable as reported; not independently reproduced here.
- Confirmed again here only: interval pacing at DPR 1 and 1.5 (median 16.7 ms), and zero errors.
- **Not claimed:** 1920x1080 scene performance (the canvas was 1248x716); real-music behaviour; resolution of the run-2 stall. **The stall did not occur in this review, which does not resolve it.**
- Passing tests do not show that the jets look good or that the ring reads as light: findings 2, 3, 6 and 12 are visual weaknesses the tests cannot see.

## 4. Ranked improvements (at most five; nothing implemented)

| Rank | Class | Problem | Evidence | Why it matters | Smallest correction | Risk |
|---|---|---|---|---|---|---|
| 1 | Evidence-supported weakness + SUBJECTIVE | Default view hides the disk; scene is small, capped, and clipped on narrow screens | findings 5, 12; F2a vs B1 | The richest structure (layers, inner gap) is mostly invisible by default; the first impression is a small ring on a thin line | Raise the default elevation (roughly 0.25-0.35 rad), make camera distance/FOV aspect-aware so the disk fits narrow canvases, test whether a taller canvas region is available | Camera constants only; no audio or perf impact. Touches the `sceneLevel` camera pull and the diagnostics' assumptions (`sample()` uses the projection, so it should still hold) |
| 2 | Evidence-supported weakness | Ring reads as a drawn outline; it is drawn through the disk's front; lensing is faint | findings 2, 3; Z1 | The focal point should feel like light bending around the body | Vary ring intensity and width around its circumference (brighter on the approaching side, fading where the disk front passes), and let the front disk occlude it; slightly strengthen the arc | Shader-only edit in the halo/ring fragment; no new geometry; check ring brightness does not rise above the current peak |
| 3 | Evidence-supported weakness | Jets look like a dotted needle, start abruptly at the ring | finding 6; Z2 | Jets are the main bass response; they should feel emitted, not overlaid | Fade in over the first part of the length, widen the base, soften point size/alpha at the origin | Jet shader constants only; decay is already correct. Verify no new bright flash |
| 4 | Confirmed minor defect | Atmosphere shows contour rings and a visible disc edge | finding 11; diagnostic D1 | Visible on dark, high-contrast displays; undermines the "no visible boundary" aim | Add small ordered noise (dither) to the atmosphere and widen or soften the fade so the edge does not hold a constant level | Negligible cost; confirm that it does not add shimmer when the camera drifts |
| 5 | Speculation requiring more evidence | Ring peak jitter (about 6% frame to frame) and perceived temporal smoothness | finding 10 | Could read as shimmer on a large display | **First** record a video or a longer frame series and identify the source; correct only if visible | Unknown until measured |

Subjective artistic opportunities, not ranked: palette variety (cooler tints appear only at higher mids), jet length, background star density.

## 5. Unverified states and behaviours

- Real or live music (the picker songs, a file, the microphone); synthetic input only.
- True temporal smoothness and perceived orbital flow: stills and per-frame numbers only, no video.
- Headed window, other browsers, other GPUs, a real 1920x1080 canvas, DPR 2, thermal and battery conditions.
- Photosensitivity: no formal flash analysis (rate-limited at about 2.9/s measured).
- Context loss/restore during an active, non-silent state (existing evidence is silent only); the unsupported-WebGL path; the Next route `/lab/accretion` layout.
- The cause of the earlier run-2 stall; not reproduced, not resolved.

## 6. Change control

- **Created (51 files, all `evidence\review-*`):** 45 PNGs (42 screenshots, two contact sheets, one zoom sheet), `review-data.json`, `review-data-views.json`, `review-evidence-index.md`, `review-capture.mjs`, `review-capture-views.mjs`, `review-imgtool.mjs`; plus this report `ACCRETION-V0-VISUAL-REVIEW.md` next to the existing reports.
- **Scratch, outside the project:** two comparison builds of the bundle in the session scratchpad.
- **Changed:** none. A timestamp scan of the working copy (excluding `node_modules`, `.venv`, caches) found no file modified after the Accretion report; no earlier report or evidence file changed. No source changes, no dependencies added, nothing overwritten (the scripts refuse to overwrite).
- **Processes:** the preview server I started was stopped; port 5354 is free; the headless Edge instances closed. No Edge process started after the report remains.
- **Known blemish:** `review-capture.mjs` ended with `b.drag is not a function` after all other sections; the depth views were captured by `review-capture-views.mjs`. The contact sheet labels the C1 "+1 ms" frame with a pre-capture jet reading of 0.00 although the image already shows lit jets (the recorder gives 0.97 at +15 ms).

## Decision

**ACCRETION V0 — VISUAL EVIDENCE READY FOR REVIEW**
