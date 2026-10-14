# Constellation Core v0: implementation and verification report

Date 2026-10-13. Written for the project owner. Plan: `CONSTELLATION-CORE-PLAN.md`. Pattern: `MOTION-LAB-VISUALIZER-GUIDE.md`. Working copy: `C:\Users\USER\Desktop\audio_lab_work\2026-10-13_accretion-v0\audio_lab\` (the live project, snapshots and Accretion were not touched). Nothing committed, pushed, deployed or published. Spectrum Matrix and Nebula Fluid were not started.

Labels: **VERIFIED** (run in this session), **INFERRED**, **UNKNOWN**.

## 1. Status

**Constellation Core v0 meets its acceptance checks as run: 63/63 in the browser check (two complete runs), 35/35 new unit tests, 218/218 across the whole suite, `tsc` clean.** It uses only the existing `AudioFeatureFrame` and unchanged shared code. Visual acceptance rests on the screenshots and per-frame numbers below, which came from **scripted synthetic input**; no real music was used. Limitations are listed in sections 6 and 7.

## 2. What was built

A glowing core (opaque, fresnel rim, faint nebula), three tilted orbit rings with travelling heads, eight glass-like orbs, a vertical beam (strip plus point stream, faded in from the core), a star field and a dithered halo. Route `/lab/constellation-core`, title "Constellation Core: an orbital core driven by sound", separate from the 2D Constellation instrument. Mapping as planned: `bass` swells and brightens the core; `mid` orbit speed and a blue-to-violet shift; `high` orb shimmer and star twinkle; `rmsEnergy` exposure; `bassHit` beam surge (0.3 s decay, scaled to 0.7); `beatDetected` + `onsetStrength` a pulse that lights the next ring in turn (at most one per 0.35 s); scene state camera distance. The camera distance is aspect-aware, so the rings' full width fits at any aspect. No waveform, spectrum or beat grid is used.

## 3. Files

**Added (15), all in the working copy:**

| File | Role |
|---|---|
| `web_kit/src/lib/constellation-core/params.ts` | Pure params (copied shape from Accretion) |
| `.../animator.ts` | Envelopes, orbit phase, beam impulse, pulse limiter with round-robin ring (copied and adapted) |
| `.../shaders.ts` | GLSL (value noise and star shaders copied, palette changed) |
| `.../scene.ts` | The scene: 9 geometries, 9 materials, `update`, `setViewport`, `releaseGpu`, `dispose` |
| `web_kit/src/components/constellation-core/ConstellationCoreCanvas.tsx`, `ConstellationCore.tsx` | Canvas on the shared `GlHost`, and the experience with the shared picker and transport |
| `web_kit/src/app/lab/constellation-core/page.tsx` | The route |
| `web_kit/preview/core-entry.tsx`, `core.html`, `core-check.mjs` | Preview harness with read-only diagnostics and a scripted synthetic source; browser acceptance check |
| `web_kit/tests/constellation-core-{params,anim,scene}.test.ts` | 35 unit tests |
| `web_kit/preview/dist/core.js`, `core.css` | Generated preview bundle (minified production build) |

**Modified (1):** `web_kit/preview/serve-gl.mjs`: three additive route lines (`/core`, `/core.js`, `/core.css`). Accretion's routes and bundle are unchanged (`accretion.js` SHA-256 prefix still `7404D49B`).

**Not modified:** the audio contract, pipeline, Python exporter, `GlHost`, `state.ts`, Accretion, Squall, Constellation, `package.json`, dependencies (none installed), tests, snapshots, the live project.

**Outside the copy:** `CONSTELLATION-CORE-PLAN.md`, this report, an additive item in `MOTION-LAB-VISUALIZER-GUIDE.md` (section 7, items 7 and 8), and `evidence-core\` (about 55 files: 37 review screenshots `cc-*`, two contact sheets, data and scripts, and the check's own screenshots and logs).

## 4. Tests actually run

| Test | Result |
|---|---|
| `tsc --noEmit -p tsconfig.json` | exit 0 (run several times, last after the final source change) |
| New unit tests (3 files) | **35 pass, 0 fail** |
| Whole JS suite (11 files) | **218 pass, 0 fail**, 56 suites (the earlier 183 plus 35) |
| `preview/core-check.mjs`, GPU Edge, run 1 | **59/62**; 3 failures analysed below |
| Run 2 (after the changes below) | **63/63**, exit 0 |
| Run 3 (repeat, nothing changed) | **63/63**, exit 0 |
| Not rerun | Accretion's browser check, Squall, Constellation, Python tests: nothing they use changed (Accretion's bundle hash is identical; the only shared file touched is the harness server, with additive lines; the `/accretion` route returned 200) |

### What run 1's failures were

1. **Real defect, fixed:** after a context restore the canvas background became pure black (corner pixel `[2,4,12]` to `[0,0,0]`), because Three.js rebuilds its background state on a restore and forgets `setClearColor`. Confirmed with a probe, then fixed in Constellation Core only, using the host's existing `onRestored` hook. A regression check (corner pixel unchanged across a restore) now passes. **Accretion has the same latent behaviour** (`[2,3,8]` to `[0,0,0]`, imperceptible); it was not changed, as instructed.
2. **My check was ill-conditioned:** "sustained brighter than silence" used the whole-frame mean, which includes the constant background (raw 1.45x against 1.5x). I changed the metric to the scene's own light above the background (about 3.6x) plus the core-edge ratio (2.8x). This was a change made after seeing the result; the metric was my own, not from the scope.
3. **My check had a timing error:** pulses were checked 0.65 s after the last accepted pulse (0.103 against the 0.05 limit, consistent with the 0.3 s decay). I extended the wait; the scene was behaving as designed.

Run 1's console log was not saved; runs 2 and 3 are saved as `evidence-core\core-check-run2.log` and `core-check-run3.log`.

## 5. Evidence (scripted synthetic input, 1280x900, DPR 1 unless stated; Intel UHD, ANGLE D3D11, WebGL 2, Edge 155 headless)

| Behaviour | Result |
|---|---|
| Silence | Calm; core interior dark (0.035), edge 0.076, no beam or pulse; dim but legible |
| Sustained | Scene light above background 3.6x silence; edge 2.8x; orbit phase 0.363 rad/s |
| Bass hit (one event) | Beam 0.92 within 4 frames; 0.14 at +600 ms, 0.01 at +1.3 s, 0.00 by +2.4 s; no residual surge after 3 s (frame C9) |
| Onset | One beat lights one ring (0.9, decays to 0.006 in 1.5 s); a 20-beat train in 1.2 s: **4 accepted, 16 refused** (limit under 3 per second) |
| Reduced motion | Orbit rate ratio **0.350**; beam peak 0, pulse peak 0; frame luminance 0.0331 against 0.0328 normal |
| Framing | Rings' full width inside the canvas at 1280x720, 1920x1080, 1280x900 (DPR 1.5), 768x1024 and 390x844 (max abs x 0.52 to 0.92). On wide canvases the outer ring and beam cross the top and bottom by design (max abs y about 1.65) |
| Lifecycle | Context loss then restore: nothing drawn while lost, all 9 geometries re-uploaded, no "does not belong" warnings, background colour preserved; 30 mount cycles: 30 scenes and hosts created and disposed, listeners at baseline, heap growth 0.59 MB; hidden tab: no drawing, resumes cleanly |
| Frame pacing (10 s, 1280x720, DPR 1, canvas 1248x410, demo source) | Interval median 16.7 ms, p95 17.1 to 17.6, p99 17.3 to 19.5; main thread median 0.5 to 0.8 ms; GPU sync median 3.5 to 4.9 ms |
| Larger canvases (informational) | 1248x716: GPU sync median 5.0 to 6.5 ms (p95 7.4); 1872x615 (DPR 1.5): 4.7 to 6.2 ms (p95 7.1) |
| Page bundle (minified, gzip level 9, no harness) | **221,264 B** (Accretion measured the same way: 220,955 B, matching its earlier report); budget 300 KB |
| Console | No exceptions, errors or warnings; only Three.js's own "Context Lost/Restored" info lines |
| Flash proxy (a limited measure, **not** a formal analysis) | Largest change in whole-frame mean luminance between frames: 0.0031 during the onset train, 0.0007 on a bass hit, against a mean of about 0.03 |

## 6. Visual assessment and limitations (SUBJECTIVE, from the contact sheets)

Reads as the reference's idea: glowing core, orbit rings with travelling heads, orbs, a vertical beam that is clearly a response to bass, and a lit ring on an onset. Known weaknesses, none a blocker:

- Orbs have a weak rim and read as **flat dark discs**, especially when one passes in front of the core.
- Thin rings turn **dotted near edge-on** (the shared host renders without antialiasing).
- Rest state is very dim; the rings are barely visible in silence.
- On the short 1280x720 canvas the core is small and the outer ring is cropped heavily.
- The ring pulse is clearer in motion than in stills (several burst frames are taken after the pulse has partly decayed; the table in the contact sheet is the state at capture start).
- 1 frame in 600 exceeded 33 ms in two of the three runs (33.6 ms in run 1, 59.9 ms in run 3, none in run 2); 0.17%, inside the budget, **cause unknown**.

## 7. Unverified

Real music; headed browser; other browsers and GPUs; a full 1920x1080 canvas (1248x716 measured); runs longer than 10 s; a formal flash analysis; the Next.js route (`tsc` accepts the file only); the unsupported-WebGL path; a real GPU reset (loss is simulated); touch input; smoothness judged from video (only stills and per-frame numbers). The earlier Accretion stall remains unexplained and was not seen here.

## 8. Known issues carried over

The Squall launch crash (`could not connect to Edge`, port 9445) is unfixed and untouched. Accretion's latent clear-colour reset on restore (section 4) is documented, not fixed.

## 9. Baseline

A timestamp scan of the working copy shows only the files listed in section 3 changed or added in this phase. The live project has no `constellation-core` folder and no `three` in its `package.json`. The preview server I started is stopped (port 5354 not listening), and no test browsers remain.

## 10. Reuse in the next scenes

The pattern held without change to the contract or host. New reusable findings (added to the guide): re-apply the clear colour in `onRestored`; judge response on scene light, not the whole-frame mean. Everything else was copied as decided, and a second use (Spectrum Matrix) is the point at which extracting the shared params, animator and limiter helpers becomes worth considering.

## 11. Recommended next step

Look at the two contact sheets (`evidence-core\cc-contact-sheet-1-states.png`, `...-2-motion-composition.png`) and decide whether the orb and rest-state weaknesses need a polish pass before moving on. Otherwise, approve **Spectrum Matrix (band terrain v0)** per `MOTION-LAB-NEXT-DESIGNS.md`. Stopping here as instructed.
