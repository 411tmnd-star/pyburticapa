# Step 0: baseline, snapshot, and Accretion v0 scope

Date: 2026-10-12. Follows `oss-visualization-assessment-2026-10-12.md` and `3d-shader-rendering-architecture-2026-10-12.md` (both unchanged). Written for the project owner. Step 0 only: nothing was implemented, installed, repaired, committed or published.

Labels: **VERIFIED** (observed or measured in this session), **INFERRED**, **PROPOSED**, **UNKNOWN**.

---

## 1. Decision gate (summary)

**Step 1 may begin, with three conditions.**

1. Treat the snapshot (section 2) as the recovery point and the check results (section 4) as the baseline.
2. **Another process is actively changing this project** (section 3). Before Step 1 writes anything, confirm with whoever or whatever is doing that, or agree the files each side may touch. This is the one finding that could invalidate the baseline.
3. Do not run browser suites in place; they overwrite files under `shots/` (section 5, item 6).

---

## 2. Snapshot (recovery point)

| Item | Value |
|---|---|
| Project root | `C:\Users\USER\Desktop\audio_lab` (web code in `web_kit\`, Python in `src\`, `tests\`, `configs\`, `schemas\`, `scripts\`) |
| Snapshot location | `C:\Users\USER\Desktop\audio_lab_snapshots\2026-10-12_step0_pre-accretion\audio_lab\` |
| Manifest | `...\2026-10-12_step0_pre-accretion\MANIFEST.sha256.csv` (path, SHA-256, size for every file) |
| Taken | 2026-10-12 about 20:17, immediately after the last observed write (20:17:08) |
| Contents | 356 files, 183,282,331 bytes: all source, configs, schemas, scripts, tests, `outputs\`, the three audio files, `web_kit` sources, `public\motion`, `preview` (including built `dist`), `shots`, `screenshots`, `research`, `DESIGN.md`, `package.json` |
| Excluded (replaceable) | `.venv`, `web_kit\node_modules`, `__pycache__`, `.pytest_cache`, `*.egg-info`, `.next` (absent) |
| Lockfiles | **None exist anywhere in the project** (no `package-lock.json`, no Python lock or `requirements.txt`). Nothing could be preserved. Installed versions are recorded in section 4 instead. |
| Verification | Every file in the snapshot was hashed and compared with the source: 356 vs 356 files, **0 differences** (VERIFIED). A research file was read back from the snapshot. |
| Convention | The project has no backup or snapshot convention (VERIFIED: no backup or snapshot files found; not a git repository). I created a sibling folder that does not collide with anything on the Desktop. Nothing was overwritten and the original files were only read. |

**Restore** (to a new folder, never over the live one without checking):
`robocopy "C:\Users\USER\Desktop\audio_lab_snapshots\2026-10-12_step0_pre-accretion\audio_lab" "<destination>" /E /COPY:DAT`, then reinstall `.venv` and `node_modules` from the versions in section 4.

**Not preserved:** `.venv` (Python 3.11.0 with the packages listed below) and `web_kit\node_modules` (about 77 packages, of which 71 are undeclared; see section 5).

---

## 3. A concurrent writer (important)

During Step 0 files in the project were being modified by something other than me.

- **Before my snapshot (up to 20:17:08):** new `preview/squall-check.mjs` (browser suite), about 30 new screenshots, `shots/squall-results.json`, `preview/cdp-lib.mjs` edited, `Squall.tsx` edited, `DESIGN.md` edited (its Squall "Verification results" section is now filled in and the stale `engine.ts` reference is gone), and `preview/dist/squall.js` rebuilt. These are in the snapshot. (VERIFIED by modification times.)
- **After my snapshot, during my checks:** `preview/dist/squall.js` and `squall.css` were rewritten at 20:19:19 and 20:19:21. My own build outputs were written two minutes later (20:21:23+) and only to my scratch folder, so I did not write them (VERIFIED). The rewritten `squall.js` is 2,102,262 bytes versus 312,999 bytes in the snapshot; it is byte-identical to what a README-style esbuild command produces when PowerShell strips the quotes from `--define:process.env.NODE_ENV='"development"'` (INFERRED from a byte match with my own accidental run). So the live `dist/squall.js` is probably an unminified build that bundles both React branches, not the minified production bundle the Squall browser suite says it tests.
- **Who:** UNKNOWN. Only graft MCP node servers were running (from other Claude sessions). The likely explanation is a parallel session working on Squall.
- **Net difference between the live project and the snapshot at the end of Step 0:** exactly two files, `web_kit\preview\dist\squall.js` and `web_kit\preview\dist\squall.css` (VERIFIED by re-hashing all 356 files). Everything else is identical, including after my test runs.
- **Consequence:** my two earlier research reports contain statements that are now stale: that Squall's `DESIGN.md` verification section is a placeholder, and that `DESIGN.md` references `engine.ts`. Both were true when I read the file and are no longer true. The reports were left unchanged as instructed; this section supersedes those two statements.

---

## 4. Verified baseline (what I ran and what happened)

Environment (VERIFIED): Windows 11 Pro, Intel Core i5-10210U, Intel UHD Graphics, 15.8 GB RAM; Node v24.20.0, npm 11.19.0, TypeScript 5.9.3, esbuild 0.28.2, tailwindcss 3.4.19, Microsoft Edge 155.0.4283.45; Python 3.11.0 with numpy 2.4.6, scipy 1.17.1, librosa 0.11.0, soundfile 0.14.0, matplotlib 3.11.2, pydantic 2.14.1, PyYAML 6.0.3, pytest 9.1.1, audiolab 0.1.0 (editable). Declared web dependencies: react and react-dom 19.3.0, `@types/react` 19.3.0, `@types/react-dom` 19.3.0, `@types/node` 22.20.5, typescript 5.9.3.

| Check | Command (summary) | Result | Where run |
|---|---|---|---|
| Python tests | `python -I -B -m pytest -p no:cacheprovider -q` | **385 passed**, 5 warnings, 90 s | In place (bytecode and cache writes disabled) |
| TypeScript unit tests | `node --import ./tests/resolve-ts.mjs --experimental-transform-types --test tests/lib.test.ts instrument.test.ts pipeline.test.ts squall.test.ts` | **99 passed, 0 failed**, 24 suites, 0.7 s | In place (tests write nothing) |
| TypeScript check | `tsc --noEmit -p tsconfig.json` | **Exit 0, no errors**, 2.3 s | In place (no incremental output) |
| Lint | n/a | **Not available**: no ESLint or other linter installed or configured | Skipped |
| Build (esbuild, README commands) | esbuild for `entry`, `instrument-entry`, `squall-entry`, dev and minified | **All 6 builds succeed.** Sizes in the table below. | Output to scratch folder only |
| Tailwind build | `tailwindcss -c tailwind.config.cjs -i preview/input.css` | Succeeds (35,764 bytes) | Scratch folder only |
| Is built `dist` in sync with source? | Byte comparison with fresh rebuilds | Snapshot `dist/squall.js` equals the minified production rebuild exactly; `dist/instrument.js` equals the dev rebuild exactly | VERIFIED |
| Browser: Constellation and pipeline | `preview/cdp-check.mjs` | **13 of 13 pass**, 38 s (demo, visual swap, pre-computed track, live file with live-vs-offline correlation bass 0.97, mid 0.97, high 0.91, rms 0.98, mic, source switching) | Isolated copy of the snapshot |
| Browser: Squall suite | `preview/squall-check.mjs` | **Run 1: crashed part-way**, after 70 passing checks (sections 1-6 and the first seven checks of section 7). **Run 2** (`states a11y`): **17 of 17 pass** (loading, errors, unsupported Web Audio and fullscreen, no Canvas 2D, reduced motion, accessible names). Every section therefore ran with **0 failures**, but no single uninterrupted run exists. | Isolated copy of the snapshot |

Bundle sizes (VERIFIED, fresh esbuild builds from the snapshot source; gzip level 9 by me):

| Entry | Dev raw | Dev gzip | Minified raw | Minified gzip |
|---|---|---|---|---|
| `entry.tsx` (motion lab page) | 1,287,874 | 219,517 | 250,143 | 78,510 |
| `instrument-entry.tsx` (Constellation) | 1,321,010 | 228,857 | 268,505 | 84,723 |
| `squall-entry.tsx` (Squall + Constellation switch) | 1,401,515 | 249,156 | 312,999 | 100,019 |

**State of the existing experiences (VERIFIED by the checks above):** Constellation and the shared pipeline work end to end in a real browser, including live analysis of a file and a microphone stream. Squall renders, resizes, responds to a deterministic signal, seeks, handles pointer and touch, cleans up across three Squall-Constellation round trips, and handles errors and missing capabilities. Performance on a real GPU is **not** established: every browser check ran with `--disable-gpu` (software rendering).

**Skipped checks and reasons:**
- Lint: no tooling exists.
- Next.js build or route test: `next` is not installed; the Next app (`353-curiosity`) is not on this filesystem.
- Browser suites in place: they write `shots/*.png` and `shots/squall-results.json` into the project (VERIFIED in `cdp-check.mjs` and `squall-check.mjs`), so I ran them in a copy.
- `npm run ...`: `package.json` defines no scripts.
- Installing or updating anything: forbidden.
- GPU performance and WebGL checks: no WebGL code exists yet. The synthetic GPU numbers in the architecture report remain the only GPU evidence.

---

## 5. Pre-existing issues (recorded, not fixed)

1. **No version control and no lockfiles** for either toolchain.
2. **`package.json` declares 6 packages, but `node_modules` holds 71 more** that the preview, build and browser checks need (esbuild, tailwindcss, postcss, playwright-core and their dependencies). `npm ls` reports them as extraneous. A fresh `npm install` would remove or omit them.
3. **Browser harness uses `--disable-gpu`** in `cdp-lib.mjs` and `cdp-check.mjs` (VERIFIED). It is valid for functional checks and invalid as GPU-performance evidence. Appending a flag cannot undo `--disable-gpu`, so GPU runs need a launcher that omits it (my probe in the previous step showed Edge then uses the Intel UHD).
4. **`squall-check.mjs` can print a misleading summary.** Its summary is printed from a `finally` block, so after an unexpected crash it still prints "N/N checks passed". It crashed in run 1 when launching a second Edge instance (`could not connect to Edge`, port 9445); rerunning the sections passed. `DESIGN.md` also records an intermittent mic-check failure in `cdp-check.mjs` under load.
5. **Built `dist/` files are committed artifacts that other work can overwrite**, and the live `dist/squall.js` has already been replaced with a different (probably unminified) build (section 3).
6. **Running the browser suites in place rewrites tracked-by-convention files** under `shots/`.
7. **Python warnings:** two `PytestWarning` (empty `match`) and three `DeprecationWarning` from `audioread` for `aifc`, `audioop` and `sunau`, which are slated for removal in Python 3.13 (INFERRED consequence: future Python upgrade risk).
8. **Stale `.pytest_cache/v/cache/lastfailed`** lists three tests that now pass (VERIFIED: 385 passed). It was left untouched.
9. **`DESIGN.md` still contains three mojibake sequences** (`â€…`) in the Constellation section.
10. **`DESIGN.md` mic flakiness and untested areas** (Safari, Firefox, phone, real fullscreen, real microphone, listening by ear, real-GPU performance, the Next.js route) remain open; they are stated in its own "Not verified" list.

---

## 6. Accretion v0: the precise implementation boundary (PROPOSED, not started)

**Goal:** the smallest thing that proves the rendering capability (3D scene, a shader effect, audio response from the existing contract, jets, correct disposal and clean switching) without touching the existing experiences.

### 6.1 In scope

| Element | Definition |
|---|---|
| Renderer | `three` WebGLRenderer only (no `three/webgpu`), antialias off, power preference default, DPR capped at 1.5, alpha off, preserved drawing buffer off. |
| Scene | One `PerspectiveCamera` on a gently drifting orbit with pointer drag orbit (no zoom); one dark central body (sphere, black, with a thin rim-glow shader); one accretion disk; one jet system; one background star layer. |
| Disk (shader effect) | A flat ring mesh with a custom `ShaderMaterial`: procedural bands and noise, differential rotation (faster toward the centre), inner-edge heat colour ramp, a Doppler-style brightness asymmetry. Additive blending, no depth write. Uniforms only (no textures, no render targets). |
| Jets | Up to 20,000 `Points` (adaptive, floor 3,000) along the axis in both directions, vertex-shader driven by uniforms, lifetime by time offset. Ignition on `bassHit`; flare knots on `beatDetected` (rate-limited). |
| Stars | One static `Points` layer (about 2,000), slow rotation only. |
| Audio mapping | Exactly the table in the architecture report, section 7. Uses only existing contract fields. `bassHit` and `beatDetected` exist in the contract (VERIFIED), so the jet requirement is met with no contract change. |
| Pure module | `toAccretionParams(frame, state, tuning, reduced, dt)` returning a small flat object of numbers; owns envelopes, the silence rule, the flare limiter and phase accumulation. No DOM, no Three.js. |
| Host | A small GL host for renderer creation, `ResizeObserver` sizing, DPR cap, context-lost and context-restored handling, hidden-tab pause, `dt` clamp (0.05 s), quality governor (reduce jets and DPR if the average frame exceeds about 28 ms for 2.5 s), full disposal, and a text fallback when WebGL is unavailable. |
| Drawing | Inside one `useAudioFrame` callback: map, update uniforms, render. No private `requestAnimationFrame`. |
| Accessibility | `role="img"` and descriptive `aria-label`; reduced motion (movement about 0.35, jet pulses held, no flares); a luminance-step limit (section 7). |
| Debug snapshot | A ref exposing frame count, frame ms, quality level, jet count, `renderer.info` counts, context state, and the params last drawn (the pattern Squall already uses). |
| Harness | New preview entry `accretion-entry.tsx` with `?view=accretion|constellation|squall|switch` (mirroring `squall-entry.tsx`), a new `accretion.html`, and a new route in a **new** server copy or an additive entry in `serve.mjs`. |

### 6.2 Explicitly out of scope

Ray-marched lensing; bloom or any post-processing; render targets; Spectrum Matrix and Nebula Fluid; any change to `AudioFeatureFrame`, the pipeline, `webaudio.ts`, `export_web.py` or `audiolab.webfeatures`; any edit to Squall, Constellation, `Instrument.tsx`, `DESIGN.md` or either research report; Next.js app integration; WebGPU; React Three Fiber; touch-specific polish; audio content authoring.

### 6.3 File boundary

**New files only** (proposed names): `src/lib/gl/host.ts`, `src/lib/accretion/params.ts`, `src/lib/accretion/scene.ts`, `src/lib/accretion/shaders.ts`, `src/components/accretion/AccretionCanvas.tsx`, `src/app/lab/accretion/page.tsx`, `preview/accretion-entry.tsx`, `preview/accretion.html`, `preview/accretion-check.mjs`, `preview/cdp-lib-gpu.mjs` (a GPU-enabled launcher, so `cdp-lib.mjs` stays unchanged), `tests/accretion.test.ts`, and a new results document.

**Dependency changes (the only edits to existing files):** add exactly `three@0.186.1` and `@types/three@0.186.0` (dev) to `package.json`. This is the single unavoidable change to an existing file and needs explicit approval at Step 1. `serve.mjs` would need its page and bundle allow-lists extended unless a separate server file is used (PROPOSED: a separate small server file so `serve.mjs` stays unchanged).

**Contract:** unchanged. Only if implementation evidence shows an essential behavior cannot be done with the current fields would a contract change be proposed, as a separate decision.

---

## 7. Verification criteria: what exists now versus what is future

### 7.1 Capabilities that exist today (VERIFIED in section 4)

Node unit tests of pure mapping modules; a TypeScript check; esbuild per-experience bundles with measured sizes; Edge-over-DevTools-Protocol harness with deterministic WAV generation, real file input, fake microphone, throttling, viewport and touch emulation, console and exception capture, screenshot capture, listener-count checks (used by Squall's cleanup test), and `window.__pipeline` and snapshot hooks. All of it is software-rendered.

### 7.2 Future acceptance criteria for Accretion v0 (PROPOSED; none verified)

| Area | Test and pass condition | Tooling status |
|---|---|---|
| **Audio response and silence** | Pure tests: outputs finite and in bounds; flares never exceed the rate limit; silence gives jets 0 and motion at most 0.3. Browser test with the existing deterministic WAV (silence, kicks at 120 BPM, hats, mids, silence): jet level at least 0.3 within one frame of `bassHit` above 0.5; luminosity during kicks at least 1.5 times the silent level; return to the resting state after silence. | Harness exists; tests are new |
| **Frame pacing on Intel UHD** | GPU-enabled headless and headed runs of 60 s, three repeats, 1280×720 at DPR 1: median interval at most 16.9 ms, p95 at most 20 ms, p99 at most 33 ms, under 1% of frames above 33 ms; median JS time per frame at most 4 ms; synchronized GPU time median at most 8 ms. Software run: quality governor engages within 5 s and the page stays responsive. | **New launcher required** (existing one forces `--disable-gpu`) |
| **Cleanup after repeated switches** | 50 mount and unmount cycles alternating Accretion, Constellation and Squall: `renderer.info.memory` geometries and textures at 0, no leftover 3D canvas, frame-callback and listener counts back to baseline, heap growth under 5 MB after forced GC, no console warnings about contexts. | Listener-count method exists in `squall-check.mjs`; the rest is new |
| **Compatibility with Squall and Constellation** | Before and after: Python 385 pass; TypeScript 99 pass; `tsc` clean; `cdp-check` 13 of 13; `squall-check` with every section passing; SHA-256 of all pre-existing files unchanged except the intended `package.json` change; existing minified bundles byte-identical to section 4 (`squall.min.js` 4A273FE2...B42B). | All exist; compare against the numbers here |
| **Browser errors and context loss** | Zero page exceptions and zero console errors in a normal run; WebGL disabled: text fallback shown and the other experiences still work; forced `WEBGL_lose_context` loss then restore: recovery within 2 s or visible fallback; hidden tab for 10 s: no `dt` jump above 0.05 s. | Console capture exists; the rest is new |
| **Visual intensity and photosensitivity** | Capture whole-frame mean luminance at display cadence over the loud segment. Fail if there are more than 3 opposing luminance changes of 10% or more of the relative-luminance range in any 1 s window, or more than 10% change within 100 ms in the self-imposed limit. Jet and flare brightness bounded in the pure mapping and tested there. Reduced motion removes pulses. Squall's existing limits (at most 3 strikes per second, at most 1 flash per second at 18% white) are the reference. | Method is new. Formal tools (for example Harding or PEAT) are **not** available here (UNKNOWN) |
| **Bundle-size impact** | New `accretion` bundle measured minified and gzipped with the same commands as section 4; gate: at most 300 KB gzip (the untreeshaken `three` alone is about 188 KB gzip, so a larger result means tree-shaking is not working and must be investigated); the other bundles must not grow at all. | Method exists; budget is a proposal |

---

## 8. Remaining unknowns after Step 0

1. Who is writing to the project now, and whether they will keep doing so.
2. Whether the live `dist/squall.js` is intentionally unminified.
3. No uninterrupted full run of `squall-check.mjs` exists; run 1 crashed on a second Edge launch.
4. Real-GPU performance of every existing experience, including Squall at DPR 2, is unmeasured.
5. The Next.js target app and its build behaviour.
6. Actual tree-shaken Three.js size.
7. Photosensitivity tooling and the exact thresholds to adopt.
8. Behaviour on browsers other than Edge 155.

---

## 9. Confirmation of changes

- **Created:** this document; the snapshot folder `C:\Users\USER\Desktop\audio_lab_snapshots\2026-10-12_step0_pre-accretion\` (with `MANIFEST.sha256.csv` and a short README); scratch files in the session scratch directory (builds, an isolated project copy, test logs).
- **Not changed by me:** any application source, test, config, schema, dependency, lockfile (none exist), `DESIGN.md`, either earlier research report, the harness, or any unrelated project. Verified by hash: the live project differs from the snapshot in exactly two files, both rewritten by another process (section 3).
- No package was installed or updated. Nothing was committed, pushed, deployed or published. Baseline failures: none were found, so nothing needed repair.
