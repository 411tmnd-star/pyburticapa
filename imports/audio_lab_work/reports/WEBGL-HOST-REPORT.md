# Accretion v0: Three.js isolation and empty WebGL host

Date: 2026-10-13. Written for the project owner. Stored outside the working copy. Scope: the dependency change, the empty host, and its lifecycle tests. No accretion scene, shader, jet, star field or finished page. No change to the audio contract, Squall, Constellation, `DESIGN.md`, the live project or the snapshots. Nothing committed, pushed, deployed or published.

Labels: **VERIFIED** (run in this session), **INFERRED**, **PROPOSED**, **UNKNOWN**.

---

## 1. Phase 1: design decisions

1. **`toAccretionParams` stays pure and stateless.** Not changed in this phase (`PARAM-LAYER-REPORT.md`).
2. **Reduced-motion behaviour (PROPOSED).** Keep the major elements (central body, disk, colour, exposure) and reduce movement: all motion speeds are multiplied by 0.35 under reduced motion (`REDUCED_MOTION`). Suppress abrupt effects: jets and flares are removed, and the flicker-prone detail is damped with the motion multiplier. Colour, glow and exposure are not gated. The host adds no motion of its own and exposes the setting (`reducedMotion`) for consumers to read.
3. **Smoothing, accumulated disk phase and flare rate limiting belong in a separate stateful layer.** **Not added here, because the empty host does not need them:** it has no animation, so there is no phase, no envelope and no flare. The stateful layer will be needed when the disk and jets are built.
4. **Visual tuning constants are PROPOSED** until validated with real audio. This applies to everything in `params.ts`, and nothing new was tuned here.

## 2. Phase 2: dependency change

**Declared (VERIFIED):** `web_kit/package.json` gains two `devDependencies`, the only change to that file:
- `"three": "0.186.1"`
- `"@types/three": "0.186.0"`

Both are exact pins. The project's existing entries use caret ranges, but Three.js releases often (eight versions in seven months, per the architecture report), so an exact pin keeps the tree from drifting. They sit in `devDependencies` to match the project's convention, since esbuild bundles everything. This is a convention decision, not a runtime requirement.

**Resolved tree (VERIFIED, from the environment lock `env\js-lock\package-lock.json` and the installed `node_modules`):**

| Package | Version | Why it is there |
|---|---|---|
| `three` | 0.186.1 | The renderer |
| `@types/three` | 0.186.0 | Type declarations (the package ships none) |
| `fflate` | 0.8.3 | Pulled in by `three` (loaders) |
| `meshoptimizer` | 1.1.1 | Pulled in by `three` (loaders) |
| `@tweenjs/tween.js` | 23.1.3 | `@types/three` dependency |
| `@dimforge/rapier3d-compat` | 0.12.0 | `@types/three` dependency |
| `@types/webxr` | 0.5.24 | `@types/three` dependency |
| `@types/stats.js` | 0.17.4 | `@types/three` dependency |

**Reproducibility (VERIFIED, and the limit of what the records show):**
- The environment lock grew from 110 entries to 118. **All 110 earlier entries are unchanged** in version and integrity (compared by script). The 8 added entries are the packages above.
- All 92 installed packages match the lock's recorded versions.
- `three` and `@types/three` came from the npm registry at pinned versions. The lock records their integrity hashes.
- **Not claimed:** byte-identity with a second install, and the 26 registry-reconstructed optional packages from the preflight (see `PREFLIGHT-REPORT.md`).

**Bundle cost (VERIFIED, minified, gzip level 9 by me):**

| Build | Raw | Gzip |
|---|---|---|
| `three` `WebGLRenderer` alone (tree-shaken with esbuild) | 527,700 B | **131,594 B** |
| Empty host harness (React, pipeline, host, `three`) | 762,061 B | **203,971 B** |
| Existing Squall bundle, for reference | 312,999 B | (not re-measured here) |

The scope document's budget was 300 KB gzip for the Accretion bundle. The harness is under that, but it is **not** the real Accretion bundle, and its React part is not isolated, so the true figure will differ.

## 3. Phase 3: the empty host

**Files (all new):**
- `web_kit/src/lib/gl/state.ts`: pure lifecycle rules (state, events, `drawable`, status naming, pixel-ratio policy, backing-store size).
- `web_kit/src/lib/gl/host.ts`: the `GlHost` class, which owns the renderer and its listeners.
- `web_kit/src/components/gl/GlCanvas.tsx`: a React wrapper that follows the existing visualizers' conventions (effect creates and disposes; `useAudioFrame` draws).
- `web_kit/preview/glhost-entry.tsx`, `glhost.html`, `serve-gl.mjs`: a **test harness, not a page**, with its own server (`serve.mjs` is unchanged).
- `web_kit/preview/cdp-lib-gpu.mjs`: a GPU-enabled launcher. It does not pass `--disable-gpu`. The shared `cdp-lib.mjs` is unchanged.
- `web_kit/preview/glhost-check.mjs`: the browser lifecycle checks.
- `web_kit/tests/gl-host.test.ts`: unit and ownership tests.

**Design:**
- **No animation loop.** The host has no `requestAnimationFrame`, `setInterval` or `setTimeout`. The consumer calls `render(scene, camera)` from the shared pipeline frame (`useAudioFrame`), so the page keeps one frame clock. A static test enforces this.
- **Ownership.** The host creates the renderer and registers its listeners (context lost and restored, `visibilitychange`, window `resize`, the reduced-motion query, and a `ResizeObserver`). `dispose()` removes every one of them, disposes the renderer and forces the context loss. A static test confirms each `addEventListener` has a matching `removeEventListener`. The host never removes the consumer's canvas.
- **Sizing.** The canvas takes its size from its container (`width` and `height` 100%, and `GlCanvas` positions it absolutely). Three.js sets the canvas's width and height attributes, and that is why the canvas must stay out of the layout (see section 4).
- **Pixel ratio.** Capped at 1.5 (PROPOSED: a fill-rate budget for integrated GPUs). Invalid ratios fall back to 1. The ratio is checked on every frame, because a ratio change alone fires no resize event.
- **Hidden document.** Nothing is drawn while `document.hidden` is true.
- **Context loss.** The host calls `preventDefault` on loss, stops drawing, and resumes after restoration. The consumer's `onRestored` callback is the place to rebuild GPU resources. Three.js handles its own internal state on loss and restore (verified in `three.module.js`, lines 17150–17170).
- **Reduced motion.** Read from `prefers-reduced-motion` and kept current on change. The host adds no motion, so consumers read the flag.
- **Unsupported WebGL.** The constructor catches the renderer failure and reports `unsupported`. `GlCanvas` shows a text message.
- **Status changes** are reported only when the coarse status changes, never per frame, so React state is not touched in the frame loop.

## 4. Validation: three rounds, and the defects they found

The browser check ran three times before it passed cleanly. The first two runs were not clean. Each defect was fixed at its root, not worked around in the check.

**Round A (26 of 31, exit 1).** Failures:
- **Resize feedback loop (real defect).** The canvas had no layout constraint, so Three.js setting its width attribute changed its layout size, and that triggered another resize. The backing store grew from 300 px to about 664,000 pixels over the run. The subsequent context-restore failures and the console error "error restoring context" are consistent with a canvas that large (INFERRED).
- The console also reported a 404 for the favicon, and a Three.js warning caused by the failed restore.

**Fixes:** the host sets the canvas to 100% CSS width and height. `GlCanvas` takes the canvas out of the layout with absolute positioning. The harness gets a favicon. Two new checks were added: the canvas fills its container, and the backing store is stable for one second with no input.

**Round B (29 of 33, exit 1).** The wrapper had no height, so the canvas collapsed to 0 px high. The harness depended on a Tailwind class that is not loaded in the harness. **Fix:** the wrapper itself is 100% of its parent.

**Round C (32 of 33, exit 1).** Returning the device-pixel ratio from 2 to 1 with no CSS size change was not detected, because no resize event fires for a ratio change alone. **Fix:** the ratio is checked on each frame (one property read).

**Round D (33 of 33, exit 0), and a repeat (33 of 33, exit 0).** Two consecutive clean runs.

**Ownership checks were also mutation-tested** in a scratch copy. Removing the `visibilitychange` listener's removal fails 1 test. Adding a timer to the host fails 1 test. Both were caught. The working copy's host still has no timer.

## 5. Lifecycle test results

**Unit and static tests (VERIFIED):**

| Command (in `web_kit`) | Exit | Result |
|---|---|---|
| `tsc --noEmit -p tsconfig.json` | 0 | no errors (against the installed Three.js types) |
| `node --import ./tests/resolve-ts.mjs --experimental-transform-types --test tests/gl-host.test.ts` | 0 | **20 pass, 0 fail** |
| Full JS suite: `lib`, `instrument`, `pipeline`, `squall`, `accretion`, `gl-host` | 0 | **150 pass, 0 fail**, 37 suites |

**Browser, GPU-enabled Edge 155 (VERIFIED, two clean runs):**

Command: `node preview/glhost-check.mjs` against `node preview/serve-gl.mjs 5354`. Renderer: `ANGLE (Intel, Intel(R) UHD Graphics … D3D11)`, which the check classifies as hardware.

| Section | Checks | Outcome in both runs |
|---|---|---|
| 0. Hardware and WebGL2 | 1 | pass (hardware Intel UHD) |
| 1. Initialization | 4 | pass; frames drawn through the shared pipeline (37 in 0.6 s in one run) |
| 2. Resize and DPR cap | 7 | pass; backing store = floor(CSS size) at 868×360 and 900×360; container fill; no feedback over 1 s; DPR 2 capped at 1.5 (backing store 1302 = floor(868 × 1.5)); return to DPR 1 |
| 3. Hidden document | 4 | pass; **no frames while hidden**; resume |
| 4. Reduced motion | 2 | pass; reported and cleared |
| 5. Context loss and restore | 6 | pass; status `lost` after `loseContext`; no frames while lost; `ready` after `restoreContext`; drawing resumes |
| 6. 50 mount/unmount cycles | 7 | pass; 50 hosts created and 50 disposed; exactly one live host; one canvas; `visibilitychange` listeners 1 → 1; `resize` listeners 1 → 1; heap growth 0.56 MB after forced GC (limit 5 MB) |
| 7. Console | 1 | pass; no exceptions, errors or warnings in the whole run |

Result: **33 of 33, exit 0, both runs.** Logs: `env\logs\glhost-check-run3-clean.out` and `env\logs\glhost-check.out`.

**Limitations of these results:**
- **Hardware evidence, not performance evidence.** The GPU is hardware, but I made **no frame-time or performance claims**, because the checks measure only that frames are delivered and the state transitions are correct. The frame-pacing criteria are still open.
- **One machine, one browser (Edge 155, headless).** No Chrome, Firefox or Safari.
- **Context loss is simulated** with `WEBGL_lose_context`. A real GPU reset or driver crash was not produced.
- **Hidden tab is simulated** by overriding `document.hidden` and firing `visibilitychange`. A real tab switch was not performed.
- **The unsupported-WebGL path** (the constructor catching a failed context) is covered by the state rules in unit tests, but **was not exercised in the browser**.
- **Visualizer switching** between different visualizers was not tested. The harness covers mount and unmount of the same visualizer, which is the lifecycle the host controls.
- **GPU memory release** was not measured through `renderer.info`. Release was verified through listener counts, host counts, the context-loss state and the heap.
- **No visual output** was checked. The host draws only a clear colour.
- **The browser run reads Chromium's own renderer string** to classify hardware. A driver change could alter that classification.

## 6. Manifest comparison

Baseline: the pre-change manifest taken at the start of this phase (360 rows, after the preflight). Final: 370 rows. Excluded from both: `.venv`, `node_modules`, caches, `*.egg-info`.

| Category | Files |
|---|---|
| **Added (10)** | `web_kit/src/lib/gl/state.ts`, `web_kit/src/lib/gl/host.ts`, `web_kit/src/components/gl/GlCanvas.tsx`, `web_kit/tests/gl-host.test.ts`, `web_kit/preview/glhost-entry.tsx`, `web_kit/preview/glhost.html`, `web_kit/preview/serve-gl.mjs`, `web_kit/preview/cdp-lib-gpu.mjs`, `web_kit/preview/glhost-check.mjs`, `web_kit/preview/dist/glhost.js` (generated harness bundle) |
| **Changed (1)** | `web_kit/package.json`: two lines added to `devDependencies` (the approved change; the rest of the file is identical) |
| **Removed** | none |
| **Renamed** | none |
| **Shots, screenshots, evidence** | none changed (no screenshot tests in this phase) |
| **Squall, Constellation, pipeline, contract, `DESIGN.md`, existing tests, `tsconfig.json`** | **unchanged** |
| **Reparse points** | 0 |
| **Live project vs its baseline manifest** | 0 mismatches |

Two generated items are classified as expected build output: the harness bundle, and the `node_modules` tree copied from the verified environment (outside the manifest).

## 7. Decision

**EMPTY WEBGL HOST VERIFIED — READY FOR ACCRETION SCENE**

Basis: the host initializes, draws through the shared pipeline, resizes without feedback, caps the pixel ratio, suspends when hidden or inactive, handles context loss and restoration, releases its listeners and renderer on each of 50 cycles, and produces no console errors, on hardware WebGL. The unit and ownership tests pass, and the two ownership mutants are caught. The manifest shows only the intended additions and the one approved `package.json` change.

Carried forward into the scene stage, not blocking it:
- The unsupported-WebGL path has not been exercised in a browser.
- Visualizer switching between different visualizers has not been tested.
- No frame-pacing or GPU-memory measurements exist yet.
- The stateful layer (smoothing, disk phase, flare rate limit) will be needed for the disk and jets.
