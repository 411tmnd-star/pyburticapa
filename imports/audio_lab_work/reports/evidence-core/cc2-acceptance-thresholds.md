# Constellation Core polish pass: thresholds fixed BEFORE any shader or constant was edited

Recorded 2026-10-13, after the baseline measurement (`cc2-before-measure-run1.json`) and before editing `params.ts`, `shaders.ts` or `scene.ts`. Measured with `cc2-measure.mjs` (1280x900, DPR 1, scripted SYNTHETIC input or silence; orb probe at a pinned camera azimuth with an orb in front of the core).

| Baseline (before) | Value |
|---|---|
| Rest, silent: core-edge luminance / scene light above background | 0.0760 / 0.00434 |
| Rest, low-energy scripted: edge / scene light | 0.0993 / 0.00609 |
| Sustained: edge / scene light | 0.2077 / 0.01524 |
| Orb in front of core: interior mean / interior spread / rim mean | 0.0197 / 0.0003 / 0.0918 |

| ID | Criterion (must hold after the change) |
|---|---|
| R1 | Rest, silent: scene light >= 0.0070 (1.6x baseline) AND core edge >= 0.105 |
| R2 | Rest, low-energy: scene light >= 0.0090 |
| R3 | Sustained is still clearly more active than silent rest: sustained / rest-silent >= 1.8 for both scene light and core edge (the rest floor must not flatten the response) |
| O1 | Orb in front of the core: interior mean >= 0.05 (it must not be darker than the core behind it, about 0.035-0.05) |
| O2 | Orb interior spread (max minus min inside 40% of its radius) >= 0.02 (a visible shading gradient, not a flat disc) |
| O3 | Orb rim mean >= 0.15 |
| O4 | Orb rim mean <= the core edge at sustained input (orbs stay subordinate to the core) |

Limits stated up front: these are luminance proxies at one viewport on one display path. "Readable in a lit environment" is **not** measured here (no ambient-light or display-brightness measurement), and the orb result is judged on one frozen frame per run plus screenshots.
