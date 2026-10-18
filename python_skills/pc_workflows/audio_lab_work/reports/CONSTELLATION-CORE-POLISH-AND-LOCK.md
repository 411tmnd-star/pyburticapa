# Constellation Core v0: polish pass and milestone lock

Date 2026-10-13. Written for the project owner. Follows `CONSTELLATION-CORE-REPORT.md` (unchanged). Scope: the two requested adjustments only. Working copy `...\2026-10-13_accretion-v0\audio_lab\`. Nothing committed, pushed, deployed or published. The live project, snapshots, Accretion and every other scene are untouched (`accretion.js` SHA-256 prefix still `7404D49B`).

## 1. What changed

| Change | File | Detail |
|---|---|---|
| Rest-state floor | `src/lib/constellation-core/params.ts` | `REST_GLOW` 0.08 to 0.25; new `REST_EXPOSURE` 0.2, so `exposure = 0.2 + 0.8 x loudness`. Silence stays calm (motion 0.25, no beam, no pulse); only brightness is lifted |
| Orb lighting | `src/lib/constellation-core/shaders.ts` | The orb fragment shader now has a fixed key light (volume), a broader rim (`pow(f, 1.6)`, was `2.2`), a small specular highlight and dither; interior base lifted. Orbs still share one material |
| Tests | `tests/constellation-core-params.test.ts` | One assertion updated (exposure maps onto the range above the floor); 4 tests added for the floor (silence on the floors, floors well below a loud passage, monotonic and capped at 1, floor does not make silence active) |
| Harness | `preview/core-entry.tsx` | Read-only `orbProbe()` and `resume()`; deterministic camera for the probe |
| Check | `preview/core-check.mjs` | Section 0 to 3 run at 1280x900 (where the thresholds were registered); added R1, R3, O1 to O4; two assertions updated for the floor |

Not changed: `scene.ts`, `animator.ts`, the contract, the host, Accretion.

## 2. Method: thresholds were fixed before the edit

Baseline measured first (`cc2-before-measure-run1.json`), then the criteria were written down in `evidence-core\cc2-acceptance-thresholds.md` **before any shader or constant was edited**. Orb contrast is measured by a probe that finds a phase where an orb is in front of the core and reads its disc (pinned camera azimuth, so it is identical every run).

## 3. Results (1280x900, DPR 1, scripted SYNTHETIC input or silence)

| Criterion | Before | After | Threshold | Result |
|---|---|---|---|---|
| R1 rest-silent scene light / core edge | 0.0043 / 0.076 | **0.0086 / 0.123** | >= 0.0070 and >= 0.105 | PASS |
| R2 rest-low scene light | 0.0061 | **0.0101** | >= 0.0090 | PASS |
| R3 sustained / rest ratio (scene light, edge) | 3.5, 2.7 | **2.35, 2.11** | both >= 1.8 | PASS |
| O1 orb interior mean | 0.0197 | **0.100** | >= 0.05 | PASS |
| O2 orb interior spread | 0.0003 | **0.254** | >= 0.02 | PASS |
| O3 orb rim mean | 0.092 | **0.204** | >= 0.15 | PASS |
| O4 orb rim vs core edge (sustained) | n/a | 0.204 vs 0.257 | rim <= core edge | PASS |

The same checks passed again inside `core-check.mjs` (orb interior 0.100, spread 0.254, rim 0.204). Visually (`cc2-before-after-sheet.png`): orbs went from black discs to shaded glossy spheres with a highlight; rings and orbs are visible at rest but the scene still reads as dim and moody; the sustained look keeps its contrast.

## 4. Verification actually run

| Test | Result |
|---|---|
| `tsc --noEmit` | exit 0 |
| Whole JS suite | **222/222** pass (183 earlier + 39 Constellation Core) |
| `core-check.mjs`, full run after the polish | **67/70**: every audio-response, reduced-motion, framing, restore (including the clear colour), 30-cycle, hidden-tab and console check passed, plus all polish criteria. The 3 failures are all frame-rate checks, see section 5 |
| Page bundle (minified, gzip level 9) | 221,394 B (was 221,264 B; budget 300 KB) |
| GPU cost A/B, old vs new shaders, interleaved, alternating order | no consistent difference (below) |

First attempt at the check showed one extra failure, **R1 (0.0060 vs 0.0070)**: my mistake in applying a threshold registered at 1280x900 to a section that ran at 1280x720 (where the scene fills a different fraction of the frame). The relative lift was the same (about 2.0x at both sizes); I ran sections 0 to 3 at 1280x900 and it passed. Disclosed because it is a change to the check after seeing a failure; the threshold itself was not changed.

## 5. Not verified: frame pacing after the polish (battery throttling)

The machine is **on battery at 7% charge**, and Windows throttles it: the page ran at about 30 fps (median interval 33.3 ms, 35% of frames over 33 ms; a separate 4 s probe confirmed 33.4 ms), which failed the two pacing checks and "drawing resumes after a context restore" (needs more than 15 frames in 500 ms). I did not edit those checks. **Frame pacing for the polished build is therefore unverified** and must be rerun on AC power. The pre-polish runs (16.7 ms median, 0 to 0.17% over 33 ms) were taken before I looked at the power state, so their power condition is unknown.

What can be said about the polish's GPU cost: synchronized GPU time in both builds flipped between about 4.4 ms and about 6.3 ms from run to run, independent of which bundle ran (8 interleaved rounds each at 1280x900, alternating order; at 1280x720 5.5 ms vs 5.5 ms). A difference below about 2 ms cannot be confirmed or excluded on this machine in this state; every value stayed under the 8 ms budget.

## 6. Milestone lock

`milestones\constellation-core-v0\` holds a recovery copy of all 16 Constellation Core source, test and harness files, a `MANIFEST.sha256.csv` (those files plus 8 key evidence files) and a README. Copies were hash-verified against the working copy.

**Status: LOCKED, with one condition.** Verified: unit suite, audio response, silence, reduced motion, framing, restore, mount cycles, hidden tab, visual polish criteria. **Pending: frame pacing after the polish, on AC power**, by running `node preview/core-check.mjs <dir>` with the harness on :5354. Still unverified as before: real music, headed browsers, a full 1920x1080 canvas, runs longer than 10 s, a formal flash analysis, the Next route, and readability in a lit environment (not measured; the floor is judged on luminance proxies only).

## 7. Known carry-overs

Squall launch crash unfixed; Accretion's clear-colour reset on a context restore documented, not fixed; one frame in 600 over 33 ms in two earlier runs, cause unknown.
