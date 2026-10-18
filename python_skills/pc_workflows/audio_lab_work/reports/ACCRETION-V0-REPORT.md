# Accretion v0: first visual scene

Date: 2026-10-13. Written for the project owner. Stored outside the working copy. All work is in the isolated working copy `C:\Users\USER\Desktop\audio_lab_work\2026-10-13_accretion-v0\audio_lab\`. Nothing committed, pushed, deployed or published. The live project, snapshots and evidence folders are unchanged.

Labels: **VERIFIED** (run in this session), **INFERRED**, **PROPOSED**, **UNKNOWN**.

Evidence screenshots (outside the copy): `evidence\accretion-silent.png`, `accretion-demo.png`, `accretion-reduced-motion.png`, `accretion-after-restore.png`. Logs: `env\logs\accretion-check*.out`.

---

## 1. The scene

An artistic black-hole scene inspired by astrophysical imagery. **It is not a physical or relativistic simulation.**

| Element | How it is built | Hierarchy |
|---|---|---|
| **Central body and event horizon** | A black sphere that writes depth, so the far side of the disk is hidden behind it. A camera-facing plane draws a thin **photon ring** at the shadow's edge, a soft halo, and a **restrained lensing impression**: a narrow band of disk colour arching just above and below the shadow. Nothing is drawn inside the shadow. | First: the darkest and the brightest pixels meet here |
| **Accretion disk** | Three stacked ring meshes (a main sheet and two thinner sheets 0.06 units above and below) with procedural shading: differential rotation (faster inwards), streaks along the orbit from cheap 2D value noise, banding, an inner-edge glow, a view-dependent brightening on the approaching side, and a temperature-like palette. The front of the disk crosses in front of the shadow. | Second |
| **Relativistic jets** | Two opposing streams of 2,500 points each, flowing outward along the axis, widening and fading with distance. Driven by uniforms only. | Third |
| **Background** | 1,800 fixed stars (seeded, depth-tested so the shadow hides those behind it) and a faint atmospheric glow that fades out well before its plane's edge. | Last |
| **Camera** | Slow automatic drift around the disk, drawn closer as the music builds, plus drag-to-orbit with the elevation clamped. | — |

Measured hierarchy while playing (mean luminance, final run): rim **0.367** > disk **0.204** > jets **0.102** > background **0.012**, centre **0.000** (VERIFIED, section 3 of the check).

## 2. Audio mapping

Three layers, one frame clock (the shared pipeline's `useAudioFrame`), no second loop, no second audio analysis:

1. **`toAccretionParams` (pure, unchanged)** maps each `AudioFeatureFrame` to 12 bounded parameters (see `PARAM-LAYER-REPORT.md`).
2. **`stepAccretionAnim` (new stateful layer)** adds only what the scene needs: smoothed envelopes, accumulated disk phase, camera drift, motion-scaled flow time, the jet impulse decay and the flare rate limit. It updates one preallocated object per frame.
3. **`AccretionScene.update`** writes uniforms and transforms. It allocates nothing per frame (only a small params object is created per frame, by the unchanged pure function).

| Audio feature | Parameter | On screen |
|---|---|---|
| `bass` | `horizon`, `rimGlow` | Central body swells by at most 4%; the photon ring, halo and the disk's inner heat brighten |
| `mid` | `diskSpeed`, `diskTurbulence`, `diskColour` | Disk rotation speed (via the accumulated phase), turbulent warping of the streaks, and a restrained palette shift from warm amber towards a cooler violet (at most 60%) |
| `high` | `detail` | Fine grain in the disk and a slight star twinkle |
| `rmsEnergy` | `exposure` | Overall brightness of disk, ring, lensing band and atmosphere |
| `bassHit` | `jet` | Jet impulse, decaying with a 0.3 s time constant and retriggered by a stronger hit |
| `beatDetected` + `onsetStrength` | `flare` | A bright knot that rides the disk's rotation, at most one per 0.35 s (under 3 per second) |
| `currentSceneState` | `sceneLevel` | The camera moves up to 2.2 units closer as the music builds and peaks |
| silence / paused | `calm`, `motion` | Dim, slowly turning resting state; no jets, no flares |

**Stateful-layer constants (all PROPOSED):** envelope attack 0.08 s (0.35 s under reduced motion) and release 0.4 s; jet decay 0.3 s; flare decay 0.3 s and minimum interval 0.35 s; disk spin 0.9 rad/s at full speed; camera drift 0.035 rad/s; maximum time step 0.05 s.

## 3. Files

**Added (13):**

| File | Role |
|---|---|
| `web_kit/src/lib/accretion/animator.ts` | Stateful layer (envelopes, phase, flow, jet decay, flare limiter) |
| `web_kit/src/lib/accretion/shaders.ts` | GLSL for disk, halo/ring/lensing, jets and stars |
| `web_kit/src/lib/accretion/scene.ts` | The Three.js scene: ownership, `update`, `releaseGpu`, `dispose` |
| `web_kit/src/components/accretion/AccretionCanvas.tsx` | Canvas on the shared `GlHost`, drawing inside `useAudioFrame` |
| `web_kit/src/components/accretion/Accretion.tsx` | The experience, with the shared `SourcePicker` and `Transport` (same pattern as Squall and Constellation) |
| `web_kit/src/app/lab/accretion/page.tsx` | Route `/lab/accretion` |
| `web_kit/preview/accretion-entry.tsx`, `accretion.html` | Preview harness with read-only diagnostics |
| `web_kit/preview/accretion-check.mjs` | GPU acceptance checks |
| `web_kit/tests/accretion-anim.test.ts`, `accretion-scene.test.ts` | Unit tests |
| `web_kit/preview/dist/accretion.js`, `accretion.css` | Generated preview bundle and CSS |

**Changed (36):**

| File | Why |
|---|---|
| `web_kit/src/lib/gl/host.ts` | **One-line defect fix:** a host created while the page is hidden now starts in the hidden state instead of assuming it is visible. Browser-verified (section 9b) and the host's own lifecycle check rerun: 33 of 33, exit 0. |
| `web_kit/preview/serve-gl.mjs` | My own harness server (added in the host phase), extended with `/accretion` routes and read-only `/motion/` for the shared song picker. |
| `web_kit/preview/dist/glhost.js` | Regenerated harness bundle after the host fix. |
| `web_kit/shots/*` (32 files) | Generated test evidence, rewritten by the Constellation and Squall regression runs. |

**Unchanged:** `params.ts`, the audio contract, the pipeline, Squall, Constellation, `GlCanvas`, `state.ts`, `DESIGN.md`, `package.json`, `tsconfig.json`, the existing tests.

## 4. Test results

| Command (in `web_kit`) | Exit | Result |
|---|---|---|
| `tsc --noEmit -p tsconfig.json` | 0 | no errors |
| Focused: `--test tests/accretion-anim.test.ts tests/accretion-scene.test.ts` | 0 | **33 pass**, 0 fail |
| Full JS suite (8 files: `lib`, `instrument`, `pipeline`, `squall`, `accretion`, `gl-host`, `accretion-anim`, `accretion-scene`) | 0 | **183 pass**, 0 fail, 45 suites |
| `node preview/glhost-check.mjs` (host, after the host fix) | 0 | **33/33** |
| `node preview/accretion-check.mjs` (final run) | 0 | **53/53**, completed |
| `preview/cdp-check.mjs` (Constellation and pipeline regression) | 0 | **13/13** |
| `preview/squall-check.mjs` (full) | **1** | Printed "70/70" but **crashed** with `could not connect to Edge` at its second launch (port 9445): the known, pre-existing intermittent failure. Not fixed, not hidden; the shared helper was not changed. |
| `preview/squall-check.mjs states a11y` (rerun of the sections that did not run) | 0 | **17/17** |

**All acceptance runs, in order (VERIFIED):**

| Run | Result | Note |
|---|---|---|
| 1 | 49/50, exit 1 | 3 WebGL warnings "object does not belong to this context" (fixed, see section 7) |
| 2 | 45/50, exit 1 | **Unexplained stall** in section 5 onward (see section 8, item 1) |
| 3 | 50/50, exit 0 | diagnostics added; host `ready` in every section |
| 4 | 50/50, exit 0 | |
| 5 | 50/50, exit 0 | |
| final | 53/53, exit 0 | after the hidden-at-construction fix and its new checks |

## 5. GPU renderer and frame time (VERIFIED, final run)

Renderer: `ANGLE (Intel, Intel(R) UHD Graphics (0x00009B41) Direct3D11 vs_5_0 ps_5_0, D3D11)`, `WebGL 2.0 (OpenGL ES 3.0 Chromium)`, vendor `Google Inc. (Intel)`. Microsoft Edge, headless, GPU enabled, demo playing.

| Configuration | Canvas backing | Frame interval median / p95 / p99 (ms) | Over 33 ms | Main thread per frame median / p95 | GPU sync median / p95 |
|---|---|---|---|---|---|
| 1280×720 viewport, DPR 1 (10 s, 601 frames) | 1248×410 | 16.7 / 17.0 / 17.3 (max 18.6) | 0.00% | 0.3 / 0.4 ms | 4.0 / 4.7 ms |
| DPR 1.5, the host's cap (5 s) | 1872×615 | 16.7 / 17.0 / 17.1 | 0.00% | — | 6.2 / 6.6 ms |
| 1920×1080 viewport, DPR 1 (5 s) | 1248×716 | 16.7 / 17.0 / 17.1 | 0.00% | — | 7.5 / 8.4 ms |

Budget (from the scope): interval median ≤ 16.9, p95 ≤ 20, p99 ≤ 33, < 1% over 33 ms, main thread median ≤ 4 ms, GPU sync median ≤ 8 ms at DPR 1. **All met at DPR 1.** At 1920×1080 the GPU sync p95 is 8.4 ms, just over 8, but that configuration is outside the gate. Reduced-resolution rendering was therefore not needed.

**How to read these numbers:**
- The page limits the canvas to 1248 px wide (the layout's `max-w-7xl`), so the "1920×1080" run drew 1248×716, not a full-HD canvas. The largest real canvas measured is 1872×615 at DPR 1.5, about 1.15 Mpx.
- The frame interval is capped by the 60 Hz display rate, so it shows pacing, not headroom. GPU headroom comes from the synchronized measurement (draw then read one pixel), which includes the read stall.
- Headless Edge, one machine, one browser, short windows. No thermal or battery measurement.

## 6. Bundle size (VERIFIED, minified, gzip level 9)

| Bundle | Raw | Gzip |
|---|---|---|
| **Accretion page** (React, pipeline, shared controls, scene, Three.js), no harness | 810,179 B | **220,955 B** |
| Accretion scene code with Three.js and the host only | 549,675 B | 139,291 B |
| Earlier: Three.js `WebGLRenderer` alone | 527,700 B | 131,594 B |
| For comparison: Squall page | 292,858 B | 93,740 B |
| Preview harness bundle (`preview/dist/accretion.js`, includes diagnostics) | 812,574 B | about 221 KB |

The Accretion page is under the scope's 300 KB gzip budget. The scene's own code adds about 8 KB gzip on top of Three.js (INFERRED by difference).

## 7. Reduced motion and lifecycle (VERIFIED, final run)

**Reduced motion** (emulated `prefers-reduced-motion: reduce` while playing):
- Params report motion 0.35.
- The disk turns at **0.294×** its normal speed (expected about 0.35, within the ±0.1 tolerance; smoothing lag explains the gap, INFERRED).
- Jets 0.000, and no flares (66 → 66).
- Disk and rim keep 83% and 81% of their normal brightness, and the shadow stays dark.
- Envelopes rise more slowly, so nothing is abrupt (unit test).

**Lifecycle:**
- Canvas fills its container after resize; no feedback growth.
- GPU memory constant over 3 s of playback (7 geometries, 0 textures, 5 programs).
- **Context loss and restore with scene resources:** status `lost`, nothing drawn while lost, `ready` after restore, all 7 geometries re-uploaded, rim and disk drawn again (0.099 → 0.086, 0.071 → 0.057, within 25%).
- **30 mount/unmount cycles:** 30 scenes and 30 hosts created and disposed; one of each live afterwards; listeners back to baseline; heap growth 0.56 MB.
- A scene mounted while the page is hidden starts hidden, draws nothing, and becomes ready when visible.
- Console: no exceptions, errors or warnings. The only WebGL-related output is Three.js's own info logs, `Context Lost.` and `Context Restored.`, for the deliberate test.

**Defects found and fixed during this phase:**
1. **"Object does not belong to this context" (run 1).** A targeted probe showed it appeared only when a scene that had survived a context restore was disposed (34 warnings in the probe). Three.js kept the old context's buffer and vertex-array records. **Fix:** `AccretionScene.releaseGpu()`, called when the host reports `lost`, releases those records while the context is lost (deletes are then silent no-ops). Three.js re-uploads the same objects on the next draw. Probe after the fix: 0 warnings. A unit test covers `releaseGpu`.
2. **Host assumed visibility at construction.** Found while investigating run 2. Fixed in `host.ts` and verified in the browser.
3. **Visual tuning after inspecting screenshots.** The first version had a saturated outline-like photon ring, jets that formed a solid near-white column at constant maximum, and a fuzzy lensing cap. The ring was thinned and dimmed, the jets softened and scaled to 0.7 with a 0.3 s decay, and the lensing band narrowed. A clipped atmospheric glow edge was removed. Tests were updated to the new mapping.

## 8. Limitations, open risks and tuning assumptions

1. **One unexplained stall (run 2 of 5 full runs after the warning fix).** From section 5 onward the original scene stopped animating: the phase ratio was NaN because the animator received no frames, samples were black, and the restore test could not return to `ready`. A freshly mounted scene later drew normally. The pattern fits the page becoming hidden in headless Edge, which pauses `requestAnimationFrame` and makes the host report `hidden`, but **this is INFERRED, not confirmed**: run 2 predates the diagnostics. Three targeted replays and four further full runs with diagnostics (runs 3, 4, 5 and the final) did not reproduce it. Watch for it in visual review.
2. **Performance is from headless Edge on one machine.** Not measured: a headed window, other browsers, other GPUs, a full 1920×1080 canvas, thermal throttling, battery mode.
3. **Context loss is simulated** with `WEBGL_lose_context`. A real GPU reset was not produced. On a real loss the scene shows a short message until the browser restores the context.
4. **Hidden-tab behaviour is simulated** by overriding `document.hidden`.
5. **The unsupported-WebGL path** shows a text message in code but was not exercised in a browser.
6. **Drag-to-orbit has no keyboard equivalent.** The canvas has a descriptive `aria-label`, and the controls are the shared, keyboard-operable ones.
7. **Audio response was verified with the synthetic demo only** (120 BPM). The pre-computed songs and live files load through the shared picker, which was not separately exercised in this phase.
8. **Photosensitivity:** flares are limited to under 3 per second (1.89/s measured) and jets are scaled below maximum. A formal flash analysis was not run.
9. **Every visual constant is PROPOSED**: radii, palette, ring width, lensing band, jet length and spread, star count and brightness, camera distance and drift, and all stateful-layer constants. They were tuned by inspecting screenshots of the synthetic demo, not with real music or a viewer. Nothing here shows they are perceptually optimal.
10. **No physical accuracy is claimed.** The "Doppler" brightening, lensing band and differential rotation are artistic devices.

## 9. Manifest comparison

Baseline: `env\logs\manifest-POST-webgl-host.csv` (370 files, end of the host phase). Final: `env\logs\manifest-POST-accretion-scene.csv` (383 files). Excluded from both: `.venv`, `node_modules`, caches, `*.egg-info`.

- **Added (13):** listed in section 3; all expected.
- **Changed (36):** `host.ts` (deliberate fix), `serve-gl.mjs` (my harness server), `preview/dist/glhost.js` (regenerated), and 32 `shots/` evidence files (regenerated by the regression runs). All explained.
- **Removed / renamed:** none.
- **Unexpected changes:** none.
- **Reparse points:** 0. **Live project vs its baseline:** 0 mismatches.
- No test servers or test browser processes left running. The remaining Edge processes are a normal, non-headless browser on the user profile, and were not touched.

## Decision

**ACCRETION V0 VERIFIED — READY FOR VISUAL REVIEW**

Basis: the scene renders the intended hierarchy on hardware WebGL, responds to the shared pipeline's audio, meets every DPR-1 performance budget with large GPU headroom, survives context loss and restoration with its resources, releases everything across 30 cycles, honours reduced motion while keeping its major elements, and fits the bundle budget. The final run passed 53 of 53, and the unit suite passed 183 of 183. Squall and Constellation are unchanged and still pass their checks, apart from the pre-existing Squall launch crash.

Carried into visual review: the unexplained run-2 stall (section 8, item 1), real-music tuning of every PROPOSED constant, and the measurement gaps in section 8.
