# Accretion v0: pure parameter layer report

Date: 2026-10-13. Written for the project owner. Stored outside the working copy. Scope: the pure `toAccretionParams` function and its tests only. No WebGL, Three.js, page, preview entry, dependency, or change to Squall, Constellation, the pipeline or the contract.

Labels: **VERIFIED** (run in this session), **INFERRED**, **PROPOSED**, **UNKNOWN**.

---

## 1. Files

| File | Change |
|---|---|
| `web_kit/src/lib/accretion/params.ts` | **added** (4,288 bytes) |
| `web_kit/tests/accretion.test.ts` | **added** (12,699 bytes) |

No other file in the working copy changed. `package.json`, the contract, Squall, Constellation, the pipeline and `DESIGN.md` are unchanged (manifest comparison, section 4).

## 2. Contract, as read from source (VERIFIED)

`web_kit/src/lib/pipeline/contract.ts` defines `AudioFeatureFrame` with `time`, `progress`, `isPlaying`, `bass`, `mid`, `high`, `rmsEnergy`, `onsetStrength`, `beatDetected`, `currentSceneState` (`rest | build | active | settle`) and `bassHit`. `makeFrame` clamps unit fields and maps NaN to 0. `clamp01` also maps NaN to 0 and infinities to the bounds. The mapping uses these fields only.

**Contract limitations**
- No spectrum: `high` is 2–10 kHz only, `mid` is 150–2000 Hz, and `bass` covers 20–150 Hz including sub. Fine spectral structure is not available.
- `beatDetected` is an onset, not a beat grid (contract comment). The flare therefore responds to detected onsets, not to a tempo.
- `bassHit` already carries its own 150 ms decay (contract comment). The mapping does not add a second decay.

## 3. The mapping

Stateless and instantaneous. Output is a flat object of 12 fields, each finite and in 0..1 except `calm`, which is a boolean.

| Output | Source | Rule |
|---|---|---|
| `horizon` | `bass` | = bass (central-body swell; the renderer applies its own scale) |
| `rimGlow` | `bass` | = 0.08 + 0.92 × bass (dim floor in silence) |
| `diskSpeed` | `mid`, motion | = (0.15 + 0.85 × mid) × motion |
| `diskTurbulence` | `mid`, motion | = mid × motion |
| `diskColour` | `mid` | = mid (not motion-gated) |
| `detail` | `high`, motion | = high × motion |
| `exposure` | `rmsEnergy` | = rmsEnergy |
| `jet` | `bassHit` | = bassHit, **zero** when calm or reduced |
| `flare` | `beatDetected`, `onsetStrength` | = onsetStrength when `beatDetected` is true, **zero** when calm or reduced |
| `sceneLevel` | `currentSceneState` | rest 0, build 0.6, active 1, settle 0.35; unknown states fall back to rest |
| `motion` | `calm`, `reduced` | 0.25 if calm; 0.35 if reduced; product if both |
| `calm` | `isPlaying`, `rmsEnergy` | true if not playing or rmsEnergy < 0.04 |

**Constants (all PROPOSED, all exported from `params.ts`):**

| Constant | Value | Why this value |
|---|---|---|
| `REST_GLOW` | 0.08 | Keeps the central body visibly dim in silence, not blank. |
| `REST_SPIN` | 0.15 | A slow spin when the music is quiet or paused. |
| `CALM_MOTION` | 0.25 | The scope document requires at most 0.3 in silence. |
| `REDUCED_MOTION` | 0.35 | Same value as Squall's `REDUCED_SCALE`, so the two experiences feel alike. |
| `SILENCE_RMS` | 0.04 | Same value as Squall's `SILENCE_RMS`. Held as a local copy so Accretion does not import from Squall. |
| `SCENE_LEVEL` | 0 / 0.6 / 1 / 0.35 | Build heats the disk and draws the camera in; active is full; settle relaxes. |

None of these has been checked for perceptual quality. Nothing here shows that they are optimal.

## 4. Test results

| Command (in `web_kit`) | Exit | Result |
|---|---|---|
| `node node_modules/typescript/bin/tsc --noEmit -p tsconfig.json` | 0 | no errors |
| `node --import ./tests/resolve-ts.mjs --experimental-transform-types --test tests/accretion.test.ts` | 0 | **31 pass, 0 fail**, 9 suites |
| Full JS suite: `tests/lib`, `instrument`, `pipeline`, `squall`, `accretion` | 0 | **130 pass, 0 fail** (99 existing + 31 new), 33 suites |

**Coverage of the requested cases (VERIFIED by the test names and assertions):**
- Normal input: a typical loud frame checked field by field.
- Minimum and maximum: every feature at 0, and every feature at 1.
- Silence: `IDLE_FRAME`, a paused source with high features, and the exact silence threshold.
- Beat and bass-hit activation: bass hit without a beat, a beat with zero strength, onset without a beat, and no bass hit.
- Scene states: each state's level, the ordering, and a scene change that alters only `sceneLevel`.
- Reduced motion, and reduced motion combined with silence.
- Invalid input: NaN, ±Infinity, out-of-range values, non-boolean flags, unknown scene states.
- Bounded output: 5,000 deterministic pseudo-random frames, including extremes and invalid values. Every output stays finite and in 0..1.
- Determinism, call-order independence, input non-mutation, and frozen input.

**Test strength check (VERIFIED):** two deliberately broken mappings were run against the same test file in a scratch folder, outside the working copy:
- Jets ignoring calm and reduced: **2 tests fail**.
- Disk speed driven by bass instead of mids: **3 tests fail**.

The tests detect those errors. Exit codes for the broken runs were 1, as expected.

## 5. Manifest comparison

Baseline: the post-preflight manifest (358 rows). Now: 360 rows, excluding `.venv`, `node_modules` and caches.

- **Added:** `web_kit/src/lib/accretion/params.ts`, `web_kit/tests/accretion.test.ts`. Both expected.
- **Removed:** none.
- **Changed:** **none**. This includes `contract.ts`, Squall, Constellation, the pipeline, `DESIGN.md`, `package.json`, the existing test files and the configuration.
- **Shots:** none rewritten in this task.
- **Reparse points:** 0. **Stray caches:** 0.
- **Live project vs its baseline:** 0 mismatches.

## 6. Design assumptions and unresolved points

1. **The scope document's signature conflicts with this task.** `DESIGN.md`'s Accretion scope (section 6.1 of the Step 0 report) defines `toAccretionParams(frame, state, tuning, reduced, dt)`, with envelopes, a flare rate limiter and phase accumulation inside it. This task required no temporal smoothing or animation state in the pure function. I followed this task. The stateful pieces (envelopes, the flare limiter, phase, smoothing) therefore still need a home, most likely a separate stateful module that calls this function. **That decision is not made here.**
2. **Flare is not rate-limited here.** The scope document's rate limit needs state, so it is deferred. Each detected beat gives a non-zero flare for that frame.
3. **`jet` is not decayed here.** It is `bassHit` directly, and the contract already decays `bassHit`.
4. **Reduced motion removes jets and flares entirely.** The scope document says "held", which I read as "removed". Under that reading the reduced-motion behaviour needs confirming.
5. **Silence threshold.** `SILENCE_RMS` is the same value as Squall's, but held locally. If the two should ever diverge, they need a shared constant.
6. **No perceptual validation.** All constants and the scene-level table need a visual review with real audio before any claim about how they look.
7. **Silence motion is 0.25, not 0.** This is deliberate (a slow, dim resting state, as the scope requires), but it means the disk never fully stops.

---

## Verdict

**PARAMETER LAYER VERIFIED — READY FOR THREE.JS ISOLATION**

Basis: the function is pure, its 12 outputs are bounded and finite across the tested inputs, the 31 focused tests and the 130-test suite pass with exit 0, `tsc` passes, the tests detect two deliberately introduced errors, and the manifest shows only the two intended additions.

The verdict covers the pure layer. The open points in section 6 (especially item 1) must be decided before any stateful code is added.
