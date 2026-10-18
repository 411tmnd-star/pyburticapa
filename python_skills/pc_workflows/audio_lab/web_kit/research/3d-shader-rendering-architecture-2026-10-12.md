# Extending Motion Lab with 3D and shader visuals: rendering architecture

Date: 2026-10-12. Follows `oss-visualization-assessment-2026-10-12.md` (unchanged). Status: research only. No dependency installed, no project file modified, nothing implemented. Written for the project owner.

Labels: **VERIFIED** (read in the filesystem, fetched from a registry, or measured on this machine today), **INFERRED** (reasoned, or general knowledge I did not re-read today), **PROPOSED** (my recommendation), **UNKNOWN**.

---

## 1. Recommendation in brief

1. **Hybrid architecture (PROPOSED).** Squall, Constellation and the particle field stay on Canvas 2D, untouched. Add *one* independent 3D capability, used only by new experiences: **Three.js with its WebGL renderer** (not `three/webgpu`), loaded only by the routes that need it. Shader effects (nebula smoke, accretion disk surface) are `ShaderMaterial`s inside that same host, not a second GL stack.
2. **The audio pipeline stays the only source of audio features (PROPOSED, and it fits the code as it is).** A 3D visualizer is one more `useAudioFrame` consumer. The pipeline already runs the only animation loop; the visualizer draws inside its callback and creates no loop of its own.
3. **Prototype: Accretion, in a deliberately reduced "v0" form** (section 7). It is the best test because it exercises both the 3D scene and the custom-shader paths, maps onto the *existing* feature contract with no extension, and fits this machine's measured GPU budget. Spectrum Matrix is a poor first test because the contract carries no spectrum (section 2, item 3). Nebula Fluid is the most hardware-sensitive and tests the least (one full-screen shader).
4. **Do not start until a baseline is recorded.** The project is not a git repository, and I have not run the existing tests. Section 9 step 0 covers that.

---

## 2. What the code actually does (read today)

| # | Finding | Source | Label |
|---|---|---|---|
| 1 | **One animation loop exists, and it belongs to the pipeline.** `AudioPipeline.start()` runs a single `requestAnimationFrame` loop; `tick()` samples the source, derives coarse state, then calls every `onFrame` callback. `AudioPipelineProvider` starts it on mount and stops it and clears the source on unmount. | `lib/pipeline/pipeline.ts`, `react.tsx` | VERIFIED |
| 2 | **Both visualizers draw inside that callback** via `useAudioFrame`. Neither owns a rAF. Per-frame state lives in refs/typed arrays; React re-renders only for coarse changes (Squall throttles its HUD readout to 4 Hz). | `ConstellationCanvas.tsx`, `SquallCanvas.tsx` | VERIFIED |
| 3 | **The frame contract carries scalars, not a spectrum:** `bass, mid, high, rmsEnergy, onsetStrength, beatDetected, bassHit, currentSceneState, time, progress, isPlaying`. Offline features are five band channels plus flux at 43 Hz (`lowDb, punchDb, midDb, highDb, allDb, flux`); no per-bin data is exported. The live source reads `getFloatFrequencyData` from two analysers, but only to produce those band readings. | `contract.ts`, `computer.ts`, `webaudio.ts`, `public/motion/seyi/features.json` | VERIFIED |
| 4 | **Visual-specific mapping is a pure function, separate from drawing** (`toVisualParams`, `toWeather`), unit-tested in Node. This is the pattern a 3D visualizer should copy. | `lib/instrument/profiles.ts`, `lib/squall/weather.ts`, `tests/` | VERIFIED |
| 5 | **Lifecycle precedent:** Canvas pages have no GPU resources to free. Squall's `Renderer` constructor can throw, and the component shows a text fallback (`role="alert"`). Resize uses `ResizeObserver`; DPR is capped; unmount disconnects observers. Frame `dt` is clamped to 0.05 s so a stalled tab does not cause a jump. | `SquallCanvas.tsx` | VERIFIED |
| 6 | **Nothing handles WebGL context loss or tab visibility.** No `visibilitychange`, no `webglcontextlost`, no `dispose` pattern, anywhere in `src`. These are new obligations for a GL renderer. | grep over `src` | VERIFIED |
| 7 | **Accessibility pattern:** each canvas has `role="img"` and a long `aria-label`; controls are real DOM elements; `usePrefersReducedMotion` damps motion (Squall: motion ×0.35, no flash); flash is rate-limited (≤3 strikes/s, ≤1 flash/s at ≤18% white). | `SquallCanvas.tsx`, `MotionPlayerProvider.tsx`, `DESIGN.md` | VERIFIED |
| 8 | **Experience isolation already exists in the build.** The preview harness builds one bundle per experience (`instrument.js`, `squall.js`, `app.js`) from separate `*-entry.tsx` files. A new 3D experience gets its own bundle without enlarging the others. | `preview/`, `serve.mjs` | VERIFIED |
| 9 | **Switching visuals today** is a conditional render inside one `AudioPipelineProvider` (Instrument page: Constellation vs Particles). Squall has its own route and its own provider. | `Instrument.tsx`, `Squall.tsx` | VERIFIED |
| 10 | **The existing browser harness runs Edge with `--disable-gpu`.** Anything measured through it is software-rendered. | `preview/cdp-lib.mjs`, `cdp-check.mjs` | VERIFIED |
| 11 | **Dependencies:** `package.json` declares only React, React DOM, TypeScript and type packages. esbuild, tailwindcss, postcss and playwright-core are in `node_modules` but undeclared. No `three`, no `next`. | `package.json`, `node_modules` | VERIFIED |
| 12 | **Squall's performance and browser verification record is incomplete:** the `DESIGN.md` verification section is an unfilled placeholder. Existing perf targets are unmeasured ("to be measured on target hardware"). | `DESIGN.md` | VERIFIED |
| 13 | **Tests exist for pure modules and the pipeline** (4 TypeScript test files, Python suite). I did not run them. | `tests/` | VERIFIED (not executed) |

---

## 3. Hardware and measured evidence

**Machine (VERIFIED):** Intel Core i5-10210U (4C/8T), 15.8 GB RAM, **Intel UHD Graphics** (integrated, 1 GB reported adapter RAM), Windows 11, display about 59 Hz, Microsoft Edge 155.0.4283.45, Node 24.20.0.

**Browser capability probe (VERIFIED, headless Edge):** with the GPU enabled, WebGL2 and WebGL1 both work on `ANGLE (Intel UHD Graphics 0x9B41, D3D11)`; max texture 16384; float and half-float render targets and float linear filtering are available in WebGL2; vertex texture units 16; `navigator.gpu` exists (an actual WebGPU adapter was **not** requested, so WebGPU use is UNKNOWN). With `--disable-gpu` the renderer is the "Microsoft Basic Render Driver" (software). rAF cadence measured 16.7 ms median.

**Micro-benchmark (VERIFIED, with caveats below).** Throwaway synthetic shaders in a scratch page outside the project, 60 frames each, one run, headless Edge. Each frame was synchronized with a 1-pixel `readPixels`, so numbers include a pipeline stall and are somewhat conservative. (`gl.finish()` does not block in Chromium; my first attempt with it returned zeros and was discarded.)

| Workload (WebGL2, 1280×720 unless noted) | Intel UHD (GPU) median / p95 ms | Software (`--disable-gpu`) median / p95 ms |
|---|---|---|
| Full-screen fragment shader, 4-octave noise ×2 (domain warp) | 8.9 / 10.5 | 64 / 70 |
| Same, 6 octaves | 10.5 / 24.8 | 96.5 / 100.5 |
| Same, 6 octaves at **640×360** | **3.5 / 4.9** | 25 / 30 |
| Same, 8 octaves | 14.5 / 16.3 | 129 / 145 |
| Same, 6 octaves at **1920×1080** | 16.3 / 18.8 | 226 / 251 |
| 100,000 additive point sprites | 3.2 / 4.5 | 38 / 43 |
| 500,000 additive point sprites | 9.3 / 12.6 | 160 / 190 |
| Heightfield grid 128×128 (vertex displaced) | 1.7 / 2.6 | 10.5 / 13.4 |
| Heightfield grid 256×256 | 2.3 / 3.5 | 24 / 28 |
| Heightfield grid 512×512 | 3.0 / 4.1 | 98 / 114 |

**What this means for the three candidates (INFERRED from VERIFIED measurements):**
- **Spectrum Matrix** (mesh terrain) is cheap: a 256×256 displaced grid costs about 2-4 ms on this GPU.
- **Nebula Fluid** (full-screen noise) is **fill-rate bound** and the most hardware-sensitive. Full-resolution 720p with a warped 6-octave field uses most of a 16.7 ms frame; 1080p does not fit. It needs render-at-reduced-resolution-and-upscale (half resolution measured 3.5 ms) and an adaptive resolution control.
- **Accretion** can be built mostly from geometry and points (cheap), with one moderately priced shader surface for the disk.
- Software rendering is 10-30× slower. A machine without a working GPU stack will not run any of these acceptably; the design must detect that and degrade or decline, not freeze.

**Caveats (all UNKNOWN effect on real use):** headless is not a composited foreground window; these are synthetic shaders, not Motion Lab's; one run each; no thermal/battery state recorded; DPR 1 only. Treat as order-of-magnitude budgets, not guarantees.

---

## 4. The four rendering options compared

| Criterion | **A. Stay on Canvas 2D** | **B. Three.js (WebGL renderer)** | **C. Minimal hand-written WebGL2** | **D. Shader-only (full-screen quad)** |
|---|---|---|---|---|
| What it gives | Current stack; proven here | Scene graph, camera, geometry, instancing, custom `ShaderMaterial`, render targets, loaders | Exact control, zero library | One fragment shader per experience |
| Fit for Accretion | Fake 2D only; no real depth/lensing look | Good: disk mesh with shader, point-sprite jets, stars, orbit camera | Possible but you rebuild camera, buffers, blending, resize | Possible via raymarching, but fill-rate heavy on this GPU (section 3) |
| Fit for Spectrum Matrix | Pseudo-3D wireframe is possible but limited | Good: displaced grid, lighting, camera | Possible | Poor (not a mesh problem) |
| Fit for Nebula Fluid | Cannot reach volumetric look at 60 fps in CPU | Good if used with a full-screen quad + render targets | Good for a single pass | **Best fit** conceptually |
| Integration complexity | None | Medium: one new dependency, a GL host component, lifecycle code | Medium-high per experience, repeated | Low per effect, but needs a host anyway |
| Performance (measured budgets above) | CPU-bound; Squall caps at about 6,000 particles | GPU-bound; 100k points about 3 ms, 256² terrain about 2-4 ms | Same GPU cost as B; slightly less JS overhead | Fill-rate bound; needs resolution scaling |
| Cleanup | Trivial (GC) | Explicit `dispose()` for geometry/material/texture/target, `renderer.dispose()`, `forceContextLoss()`; library exposes `renderer.info.memory` for leak checks (INFERRED) | Fully manual, easiest to leak | Manual unless inside B |
| Browser support | Universal | WebGL2 broad (INFERRED); WebGL2 verified on this machine | Same | Same |
| Accessibility | Established pattern | Same pattern works (DOM controls, aria-label); WebGL adds a "cannot create context" failure mode | Same | Same, and strobe risk from full-screen shader flicker needs explicit limits |
| Maintenance | None new | New dependency with frequent releases (see below) | Own code to maintain; no upstream | Own code |
| Risk to existing work | None | Low if isolated (separate bundle/route) | Low if isolated | Low if isolated |

**Three.js facts (VERIFIED from npm today):** `three` 0.186.1 published 2026-09-24; MIT; releases at least 0.183.0 (2026-02-18) through 0.186.1, i.e. eight versions in seven months. `three.module.min.js` is 383 KB raw / 87 KB gzip and imports `three.core.min.js` 406 KB raw / 101 KB gzip; **together about 188 KB gzip before tree-shaking** (my gzip -9 of the published files). The package marks only `./src/nodes/**/*` as side-effectful, so tree-shaking is possible; the real application size is **UNKNOWN until built**. A separate `three/webgpu` entry exists (801 KB raw / 199 KB gzip) and is not needed for a WebGL2 plan. Types come from a separate `@types/three` (0.186.0). Frequent releases mean pin an exact version and treat upgrades as deliberate. (Breaking-change frequency per release is INFERRED.)

**Why not the others (PROPOSED):**
- **A alone** cannot deliver the intended Accretion, Spectrum Matrix or Nebula look. It remains the right choice for everything already built.
- **C** is the honest low-weight alternative: a roughly 150-line host could carry Nebula alone. But the moment a second experience needs a camera, instancing or depth, it becomes a worse Three.js. Because three experiences are in view, B amortizes better. Revisit C only if the bundle cost is judged unacceptable after measuring the real tree-shaken size.
- **D** is a technique, not a platform; use it inside B (a full-screen triangle with a `ShaderMaterial` and an optional low-resolution render target).
- **React Three Fiber** (not investigated): it runs its own render loop and state model. It would have to be put in manual-frame mode to follow the pipeline's loop, and adds more dependencies. Not recommended for this architecture; UNKNOWN beyond that.

---

## 5. Recommended architecture

### 5.1 Layers and the one-way data flow

```
 audio sources ──► AudioPipeline (single rAF loop)  ── frozen AudioFeatureFrame ──┐   [unchanged]
                                                                                   │
                  useAudioFrame(cb)  ◄─────────────────────────────────────────────┘
                        │
                        ▼
        toAccretionParams(frame, tuning, reduced, dt, state)     PURE. Node-testable. No DOM, no GL.
        (feature -> visual meaning; envelopes; silence rule)     returns a small flat params object
                        │
                        ▼
        scene.update(params, dt)                                  writes uniforms / attributes / transforms
        scene.render()                                            the only GL-touching code
                        ▲
        pointer/keyboard ─► interaction state (refs)              camera orbit, selection; read by update()
```

- **Audio analysis stays in the pipeline.** The visualizer never creates an `AudioContext`, `AnalyserNode` or FFT. (PROPOSED)
- **No loop per feature and no loop per visualizer.** The pipeline's one rAF drives one callback that does map -> update -> render. (PROPOSED; it matches both existing visualizers.)
- **Visualization state is separate from rendering.** Mapping and any CPU simulation (envelopes, phase accumulators, jet particle timers) are pure modules with unit tests, exactly like `weather.ts` and `field.ts`. The renderer reads that state and draws.
- **Time handling:** advance animation phases by `dt × speed` (as Squall does), not from `frame.time`, so seeking or switching sources does not cause a visible jump. Use `frame.time` only to detect seeks (as Squall does).
- **Interaction** (orbit, hover) writes into refs read in the same callback, as the existing canvases do.
- **Smoothing:** pipeline features are already attack/release smoothed. Add visual-side damping only where the look needs it (disk spin inertia, jet decay), inside the pure mapping.

### 5.2 Isolation
- New files only (PROPOSED layout, nothing created): `src/lib/gl/` (host: renderer creation, resize, DPR cap, context-loss handling, dispose, quality governor; no React), `src/lib/accretion/` (params, scene), `src/components/accretion/AccretionCanvas.tsx`, `src/app/lab/accretion/page.tsx`, `preview/accretion-entry.tsx` + `accretion.html`, `tests/accretion.test.ts`.
- Three.js is imported only from those files and loaded only by the Accretion route/bundle (the harness already builds per-experience bundles; in the Next app a client-only dynamic import is the usual route, INFERRED because that app is not on this filesystem).
- **No edits** to `lib/pipeline/*`, Squall, Constellation or `DESIGN.md` (new design notes go in a new file).

### 5.3 GL host lifecycle contract (PROPOSED)
- Create the renderer in an effect; on any failure show the same text fallback pattern as Squall.
- Cap DPR (1.5 for the 3D view; the measured budgets are for DPR 1) and expose an **adaptive quality governor** mirroring Squall's rule (average frame above about 28 ms for 2.5 s -> reduce render scale/particle count by 25%, with a floor, and say so in the UI).
- Handle `webglcontextlost` (prevent default, stop drawing) and `webglcontextrestored` (rebuild GPU resources) or fall back to the message.
- Pause drawing when the document is hidden; clamp `dt` to 0.05 s.
- On unmount: dispose every geometry, material, texture and render target, call `renderer.dispose()` and `forceContextLoss()`, remove the canvas, disconnect `ResizeObserver`, remove listeners, unsubscribe the frame callback (done by `useAudioFrame`'s cleanup).
- Expose a debug snapshot ref (as Squall's `snapshotRef`) with frame count, frame ms, quality level, `renderer.info` counts, and a context-state flag, for the automated checks.

### 5.4 Accessibility (PROPOSED, consistent with current practice)
`role="img"` with an `aria-label` that says what audio drives what; all controls in the DOM; reduced motion damps movement (about ×0.35) and holds jet pulses and any brightness flicker; flash rule at most 3 changes per second and a bounded luminance step, as Squall; a visible resting state in silence; WebGL-unavailable message with other experiences still working.

### 5.5 Browser support (INFERRED unless noted)
WebGL2 is available in current Chrome, Edge, Firefox and Safari (general knowledge; verified only on Edge 155 here). A WebGL2 plan avoids depending on WebGPU, whose adapter availability I did not test.

---

## 6. Where Spectrum Matrix and Nebula Fluid land (for later, not now)

- **Spectrum Matrix needs data the contract does not have.** A "frequency terrain" wants tens of bins, but the contract has three bands and the offline export has five. The two ways to get a spectrum both touch the pipeline: (a) an additive optional field (for example N log-spaced bin magnitudes) computed in `webaudio.ts` from the analyser it already reads, plus a matching export in `export_web.py` and `audiolab.webfeatures`; or (b) a second analysis path in the visualizer, which the brief rules out. Option (a) is a contract change and needs its own decision and tests. **This is why Spectrum Matrix is not the first prototype.** (PROPOSED)
- **Nebula Fluid** maps well to the existing scalars (bass drives density/inflow, mids drive turbulence speed, highs drive fine grain, onsets drive pulses). It is blocked only by fill-rate, so it needs half-resolution rendering and the quality governor from 5.3. Good second experience once the host exists.

---

## 7. The representative prototype: Accretion v0

**Why it is the strongest test (PROPOSED):**
1. It forces the whole new capability: a 3D scene and camera, a custom shader surface, instanced/point geometry, additive blending, interaction, lifecycle and cleanup.
2. It consumes the **existing** contract unchanged, so it proves the "pipeline stays the source of features" claim without modification.
3. Its cost fits the measured budget if kept to geometry/points plus one disk shader (100k points about 3 ms; no full-screen ray marching).
4. It tests the silence, state-change and error paths in a meaningful way (a black hole at rest is a natural, clearly different resting state).
5. Failure is cheap and informative: if frame pacing, cleanup or compatibility fails here, the plan should change before more is invested.

**v0 scope (deliberately small):** a disk mesh with a procedural shader (rotation, banding, Doppler-style brightening on one side), a dark central sphere with a rim glow, a field of up to about 20,000 jet/star points (adaptive), a slow starfield, orbit camera by drag. **Out of scope for v0:** ray-marched gravitational lensing, bloom/post-processing, shadows, spectrum data, any contract change.

**Proposed audio mapping (each with a physical reason, as Squall's design does):**

| Contract field | Visual meaning |
|---|---|
| `bass` (smoothed) | Disk luminosity and inner-edge heat; slow breathing of the disk's scale |
| `bassHit` | Jet ignition: a brief jet pulse along the axis |
| `mid` | Disk rotation speed and turbulence amplitude |
| `high` | Fine grain/sparkle in jets and the outer disk |
| `onsetStrength` / `beatDetected` | Accretion flares: a short bright knot orbiting the disk (rate-limited) |
| `rmsEnergy` | Overall exposure/brightness |
| `currentSceneState` | `rest`: dim, slow, jets off; `build`: camera drifts closer, disk heats; `active`: full response; `settle`: relax |
| `isPlaying = false` / silence | Resting state at about 25% motion, jets off, no flares |

### Measurable acceptance criteria

Run on the target machine above (i5-10210U, Intel UHD, about 59 Hz display, Edge) with the GPU **enabled**, view size 1280×720 CSS px at DPR 1 (stretch goal: 1920×1080), over 60 s runs, three repeats, report all three.

**A. Audio-responsive behavior**
- A1. Pure-mapping unit tests (Node): all outputs finite and within documented bounds for every contract field extreme, including NaN-free `IDLE_FRAME`; monotonic response of luminosity to `bass`; flares never exceed the rate limit.
- A2. With the deterministic test signal (silence -> 120 BPM kicks -> noise -> silence, as `make-test-wav.mjs` already produces), the debug snapshot shows: jet level at least 0.3 within one frame of `bassHit` rising above 0.5; luminosity during kicks at least 1.5× the silent level; jets 0 and motion scale at most 0.3 in silence.
- A3. Latency: the params used for a draw come from the frame delivered in the same callback (frame sequence number equals draw sequence number; zero added frames of delay).
- A4. Screenshot difference between a silent frame and a kick frame exceeds a stated mean-luminance threshold in the disk region (threshold set from the first run; the test fails if the two images are indistinguishable).

**B. Rendering stability and frame pacing**
- B1. Median frame interval at most 16.9 ms; p95 at most 20 ms; p99 at most 33 ms; fewer than 1% of frames over 33 ms. Measured from in-page rAF timestamps.
- B2. Median JS main-thread time per frame at most 4 ms (the project's own Constellation target).
- B3. GPU headroom: median synchronized GPU frame time at most 8 ms, measured with the same readback method as section 3 (rAF cannot show headroom above 60 Hz).
- B4. Adaptive quality: with an artificial slowdown (software rendering), the governor lowers quality within 5 s, the UI says so, and the page remains responsive (no main-thread stall over 200 ms).
- B5. No memory growth: JS heap after a forced GC at minute 1 vs minute 5 differs by less than 10%.

**C. Cleanup when switching visualizers**
- C1. 50 mount/unmount cycles alternating Accretion, Constellation and Squall: after the last unmount, `renderer.info.memory.geometries` and `textures` are 0, zero `<canvas>` elements remain from the 3D view, and the pipeline's frame-callback count returns to its baseline.
- C2. No console warnings about too many WebGL contexts or lost contexts across the cycles.
- C3. JS heap growth over the 50 cycles after a forced GC under 5 MB; event-listener count (from the DevTools protocol) returns to baseline.
- C4. Switching audio source (file -> demo -> mic -> none) while Accretion is mounted produces no errors and no stale visuals.

**D. Silence, interruption and errors**
- D1. Silence shows the defined resting state (A2 values), not a blank or frozen frame.
- D2. Pause: motion decays within 1 s to the resting state without flicker; resume does not jump. Seek: no discontinuity larger than a defined visual step (phase continuity test).
- D3. Hidden tab for 10 s, then shown: no `dt` jump beyond 0.05 s, no error.
- D4. WebGL unavailable (browser launched with 3D APIs disabled): the text fallback appears, the rest of the page and other experiences work.
- D5. Forced context loss then restore (`WEBGL_lose_context`): recovers within 2 s or shows the fallback; never a blank canvas without message.
- D6. Audio decode error or source failure: the pipeline error shows; the scene stays calm.
- D7. Reduced motion: motion at most 0.35× the normal peak; no jet pulses; flash/luminance step within the project's rule (at most 3 per second).

**E. Compatibility with Squall and Constellation**
- E1. Before any change, run and record the existing TypeScript and Python test suites; after the change, the same tests pass with the same counts.
- E2. SHA-256 hashes of `src/lib/pipeline/*`, `src/lib/squall/*`, `src/lib/instrument/*`, `src/components/squall/*`, `src/components/pipeline/*` and `DESIGN.md` are identical before and after (the project has no git, so this is the proof of non-modification).
- E3. The `squall.js` and `instrument.js` bundles are byte-identical or smaller than before; only a new `accretion.js` bundle appears.
- E4. The existing CDP checks for the Instrument page still pass; the Squall page loads and plays the demo with no new console errors.

### Practical verification method on this hardware
1. **Do not use the existing harness flags for performance.** `cdp-lib.mjs` launches Edge with `--disable-gpu`; run perf checks with the GPU enabled (my probe confirmed Edge then uses the Intel UHD).
2. Collect rAF timestamps in-page and compute the percentiles in B1; read frame ms, quality level and `renderer.info` from the debug snapshot; get GPU headroom with the synchronized-readback microbench (section 3 method, but around the real scene).
3. Drive it with the deterministic WAV and the two real tracks already in the project, through the real file input, as `cdp-check.mjs` does.
4. Do each performance run once headless and once **headed** (`playwright-core` is already in `node_modules`), because headless compositing differs. Close other windows; record power mode and charger state.
5. Record results in a new results file next to this report (never into `DESIGN.md` retroactively).

---

## 8. Risks

| Risk | Severity | Mitigation |
|---|---|---|
| Integrated GPU cannot sustain 60 fps at full resolution for shader-heavy effects (measured: 1080p 6-octave warp 16 ms) | High for Nebula, medium for Accretion | Geometry/point-based v0; render scale + quality governor; half-resolution passes |
| No WebGL lifecycle handling exists in the project (context loss, hidden tabs, GPU cleanup) | Medium | Build it once in the GL host; test criteria C and D |
| Three.js release churn (eight releases in seven months) | Medium | Exact version pin; upgrade deliberately; keep Three-specific code behind the host |
| Contract lacks spectral bins (Spectrum Matrix) | Medium (blocks one experience only) | Decide separately; additive optional field is the minimal path |
| Bundle size unknown (about 188 KB gzip before tree-shaking) | Low-medium | Separate entry/route; measure the real bundle at step 3 |
| Strobe/flash risk from bright shader pulses | Medium (safety) | Reuse Squall's limits; criteria D7 |
| Project is not under version control and baseline tests are unrun | Medium | Section 9 step 0 |
| Perf measured in headless, synthetic shaders, one run | Medium | Criteria require headed repeats on the real scene |
| Squall/Constellation regress by accident | Low if isolated | Hash check E2, bundle check E3 |
| Preview harness depends on undeclared packages | Low | Declare them (separate, optional tidy-up) |

---

## 9. Smallest safe implementation sequence (PROPOSED, not started)

0. **Baseline.** Put the project under version control or take a full copy; run the existing TypeScript and Python tests and record counts; hash the files in E2. Optionally declare the undeclared dev packages in a separate change.
1. **Pure part first.** `toAccretionParams` and its state (envelopes, flare limiter, silence rule) with unit tests. No dependency added. This alone proves the mapping against the contract.
2. **Add the dependency in isolation.** `three` (exact version) and `@types/three` (dev) only; confirm nothing else changes and the old bundles are unchanged (E3).
3. **GL host.** Renderer creation, resize, DPR cap, quality governor, context-loss handling, dispose, fallback message, debug snapshot. Test lifecycle (criteria C, D4, D5) with an empty scene before drawing anything meaningful.
4. **Scene in layers, one at a time:** disk -> central body -> jets/points -> starfield -> orbit camera. After each layer re-check B1 and B3 and stop if the budget is exceeded.
5. **Page and harness entry.** New route, preview entry and HTML; reduced-motion and aria-label; silence/pause/seek behavior (criteria D).
6. **Full acceptance run** (headed and headless, three repeats), results written to a new file; re-run E1-E4.
7. **Decision gate.** Only if A-E pass: choose between Nebula Fluid (reuses the host) and a contract-extension proposal for Spectrum Matrix. If any criterion fails, stop and report; nothing in the existing experiences needs to be undone, because none was touched.

---

## 10. What remains unverified (exactly)

1. **Real-scene performance.** All GPU numbers come from synthetic shaders in one headless run each, with synchronization overhead. No Motion Lab scene has been rendered in WebGL. DPR above 1, 1080p scenes with real geometry, thermal throttling and battery mode are unmeasured.
2. **Actual Three.js bundle size after tree-shaking** (only the untreeshaken file sizes are known) and the true size of an Accretion bundle.
3. **WebGPU:** whether a real adapter is obtainable on this machine, and its stability, were not tested; only that `navigator.gpu` exists.
4. **Browsers other than Edge 155** on this machine (Chrome is installed but unprobed; Firefox, Safari and mobile devices untested). Browser-support statements beyond Edge are general knowledge.
5. **Context-loss and WebGL-context-limit behavior** and Three.js's exact `renderer.info` and disposal semantics were not tested; they are expectations from general knowledge.
6. **Existing tests were not run**, so the baseline pass counts are unknown; Squall's browser verification is undocumented (placeholder section) and Squall/Constellation frame times on this machine are unmeasured.
7. **The Next.js target app** (`353-curiosity`) is absent, so its version, its dynamic-import behavior for a client-only 3D component, and its bundler are UNKNOWN. Everything about routes is inferred from the preview harness.
8. **R3F, raw-WebGL libraries (regl, OGL) and post-processing options** were not investigated.
9. **Whether the Accretion look is achievable and attractive in v0 scope** (disk shader, point jets, no lensing) is a design question no measurement answers.
10. **Cost and exact design of a spectrum extension** to the feature contract (live and offline parity, export format change) is unscoped.
11. **Flash/photosensitivity compliance of a 3D shader scene** is unassessed beyond reusing Squall's stated limits.

## 11. Confirmation of changes

No project file, dependency, lockfile, document, test or architecture was changed. The earlier report is untouched. This file is the only addition. Throwaway probe pages and scripts were written to the session scratch directory outside the project; Edge instances launched for the probes were closed. Network access was read-only (npm registry, jsDelivr). Nothing was committed, pushed, deployed or published (the project is not a git repository).
