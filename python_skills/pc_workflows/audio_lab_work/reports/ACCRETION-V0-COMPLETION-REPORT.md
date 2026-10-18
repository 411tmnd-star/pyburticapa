# Accretion v0: completion and handoff report

Date 2026-10-13. Written for the project owner. Separate from `ACCRETION-V0-REPORT.md` and `ACCRETION-V0-VISUAL-REVIEW.md`, which are unchanged. Working copy: `C:\Users\USER\Desktop\audio_lab_work\2026-10-13_accretion-v0\audio_lab\`. This phase was **reading, classification and documentation only**: no source change, no test rerun, no new evidence, nothing committed, pushed, deployed or published.

Labels: **VERIFIED**, **INFERRED**, **PROPOSED**, **UNKNOWN**.

## 1. Final status

**Accretion v0 is ready at v0, with documented limitations.** No required blocker was found, so no source was touched. The scene meets the acceptance criteria that were actually run; the criteria that were run smaller than proposed, or not run, are listed as limitations and unverified items, not as passes.

## 2. Classification

### A. Required blockers: none

| Check | Evidence | Result |
|---|---|---|
| Functionality and audio integration | Reads only `AudioFeatureFrame` through `useAudioFrame`; no second loop or analysis (code read). Audio response and silence checks passed in the 53/53 acceptance run | OK |
| Shared pipeline use | `toAccretionParams` unchanged from the parameter-layer phase; contract, pipeline and Squall/Constellation unchanged (manifest comparison) | OK |
| Rendering and resource management | 7 geometries, 0 textures, 5 programs constant; 30 mount cycles with one scene and one host live afterwards; heap growth 0.56 MB; context loss and restore re-uploads all geometries | OK |
| Reduced motion | Params motion 0.35; disk at 0.29-0.35x speed; jets and flares 0; brightness kept; live toggle showed no luminance jump (review) | OK |
| Build and integration | `tsc --noEmit` exit 0; 183/183 unit tests; esbuild bundle byte-identical to the shipped one; 220,955 B gzip against 300 KB. `package.json` has only the approved `three` and `@types/three` additions (WebGL host report); the live project's `package.json` does not | OK |
| Accessibility | Canvas has `role="img"` and a descriptive label; controls are the shared keyboard-operable ones | OK |

### B. Important but non-blocking limitations (documented in the visual review, not fixed)

Near edge-on default camera and small scene; photon ring reads as an outline and lensing is faint; jets are a thin dotted needle; background contour banding and a faint disc edge; disk clipped at the canvas sides on narrow screens and a canvas capped at 1248 px; ring-peak jitter (about 6% per frame, cause unknown, no video evidence). Ranked improvements are in `ACCRETION-V0-VISUAL-REVIEW.md` section 4. **Deferred by decision**: the brief is not to perfect Accretion before moving on.

### C. Unverified (not defects, not passes)

| Item | Status |
|---|---|
| Real music (picker songs, files, microphone) | UNKNOWN: only scripted synthetic and the 120 BPM demo were used |
| Headed browser, other browsers and GPUs, thermal/battery | UNKNOWN |
| Full 1920x1080 canvas performance | UNKNOWN: the canvas was 1248x716 |
| Formal flash analysis | UNKNOWN: flares limited to under 3 per second (1.89/s measured), no formal tool run |
| The intermittent stall (run 2) | UNEXPLAINED: not reproduced in 4 later full runs or about 19 review sessions; **not resolved** |
| `/lab/accretion` in the Next app | UNKNOWN: Next is not installed here; only `tsc` has seen the route file |
| WebGL-unsupported path in a browser | UNKNOWN: code exists, never exercised |
| Context loss in a non-silent state, and a real GPU reset | UNKNOWN: existing evidence is silent and simulated |
| Scope-proposed test sizes | The Step 0 scope proposed 60 s x 3 frame-pacing runs (headless and headed) and 50 mount cycles alternating three experiences; the runs were 10 s (601 frames), headless only, and 30 cycles of Accretion alone. The 50-cycle host check was earlier. These are **PROPOSED sizes, run smaller**, so I count the budgets as met only for what was measured |
| Python suite in this phase | Not rerun; no Python file changed (manifest), so unaffected (INFERRED) |

## 3. Acceptance criteria against the Step 0 scope (section 7.2)

| Area | Outcome |
|---|---|
| Audio response and silence | Passed in the acceptance run (synthetic demo) |
| Frame pacing on Intel UHD | Passed for the measured configurations at DPR 1 (headless, short windows); headed and long runs not done |
| Cleanup after switches | Passed for 30 Accretion cycles and 50 host cycles; the alternating three-experience test was not run |
| Compatibility with Squall and Constellation | `cdp-check` 13/13; Squall `states a11y` 17/17; full Squall run crashed at launch (see below); existing files unchanged except the approved ones |
| Browser errors and context loss | No exceptions or warnings; loss and restore passed; hidden start passed; WebGL-disabled fallback not run |
| Photosensitivity | Rate-limit bounded and measured; no formal analysis |
| Bundle size | 220,955 B gzip, within the 300 KB budget |

## 4. Corrections made in this phase

**None.** No blocker, no evidence of a defect that the acceptance criteria require fixed.

## 5. Known unresolved issues

1. The Squall launch crash (`could not connect to Edge`, port 9445) is **pre-existing and unresolved**. It is not fixed, not hidden and not worked around; the shared helper was not touched. The Squall sections that did not run in that attempt passed on rerun.
2. The unexplained Accretion run-2 stall (above).
3. Items in section 2C.

## 6. Files

**Created in this phase** (all outside the working copy, in `C:\Users\USER\Desktop\audio_lab_work\2026-10-13_accretion-v0\`):

| File | Why |
|---|---|
| `ACCRETION-V0-COMPLETION-REPORT.md` | This report |
| `MOTION-LAB-VISUALIZER-GUIDE.md` | The reusable architecture, separating the shared contract from Accretion-specific detail |
| `MOTION-LAB-NEXT-DESIGNS.md` | The three chosen designs and why, with acceptance and evidence plans |

**Modified in this phase:** none. **Earlier phases (unchanged here):** the 13 added and 36 changed files listed in `ACCRETION-V0-REPORT.md`, and the 51 `evidence\review-*` files.

## 7. Baseline and live project

- The working copy has no file changed after the Accretion report (timestamp scan, repeated at the end of this phase, see below); existing reports and evidence are unchanged.
- The live project `C:\Users\USER\Desktop\audio_lab` was only read (its `package.json` was read to confirm it still has no `three`). The snapshots were not touched.
- No test servers or browsers were started in this phase.

## 8. The reusable architecture

Documented in `MOTION-LAB-VISUALIZER-GUIDE.md`. In short: a fixed audio contract and one frame clock; a pure params layer and a stateful animator that any scene reuses; a Three.js host (`GlHost`) only for WebGL scenes; a scene class with allocation-free `update`, `releaseGpu` and idempotent `dispose`; tests in Node plus a GPU-launcher browser check; seven carry-forward lessons from the visual review. It states clearly that Canvas 2D and shader-only scenes follow the same contract with different renderers.

## 9. Deferred visual improvements

Ranked list in the visual review (default camera and framing, ring and lensing, jets, banding, jitter). None is a prerequisite for the next designs, but the **framing, dither and four-viewport checks are built into the new designs' acceptance templates** so they are not repeated.

## 10. Recommended next step

**Approve Constellation Core as the next scene**, using the plan in `MOTION-LAB-NEXT-DESIGNS.md`. It needs no audio-contract change, reuses every layer of the pattern, and is the lowest-risk way to confirm the architecture generalises. Two decisions to make first:

1. Whether to copy the Accretion helpers (star field, impulse and limiter) into the new scene or extract them after the second use. I recommend copying until then.
2. Whether to ever extend the contract with spectrum or waveform data. This is **not needed for the three chosen designs** and is the only thing Sonar Lab and a true spectrogram would require; it deserves its own decision.

Stopping here as instructed.
