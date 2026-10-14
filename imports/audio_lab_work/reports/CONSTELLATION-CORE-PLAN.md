# Constellation Core: implementation plan

Date 2026-10-13. Written for the project owner. Approved: scene order, copy-not-extract reuse, unchanged `AudioFeatureFrame`, own route and title. Built additively in the existing working copy `...\2026-10-13_accretion-v0\audio_lab\`. Accretion v0 and every existing scene stay untouched. Source inspected for this plan: Accretion `params.ts`, `animator.ts`, `scene.ts`, `shaders.ts`, `AccretionCanvas.tsx`, `host.ts`, `state.ts`, the three Accretion test files, `accretion-check.mjs` and `serve-gl.mjs`, plus your reference image 3.

## 1. Identity and composition

Reference (image 3): a dark core with a glowing rim and a faint nebula inside, three tilted orbit rings with bright heads, glassy orbs travelling on them, a vertical beam through the core, all on a deep-blue starfield. "Constellation Core" gets route `/lab/constellation-core` and title "Constellation Core: an orbital core driven by sound", with the new code under `constellation-core/` directories (the existing 2D Constellation instrument keeps `instrument/`).

| Element | Build (PROPOSED) |
|---|---|
| Core | Sphere, radius 1.5, one shader: near-black blue interior with a faint nebula (cheap 2D value noise in the sphere's view-space), fresnel rim in cyan-white. Writes depth so rings and orbs behind it are hidden |
| Halo | Camera-facing plane: soft glow around the core and a thin bright band at its edge **modulated around the circumference** (not a uniform outline, per the review lesson), dithered, faded to zero inside the plane edge (no visible boundary) |
| Orbit rings | Three thin ribbons (radii 3.4, 4.7, 6.0), each tilted differently, each with a bright head that travels along it; additive, depth-tested |
| Orbs | Eight glass-like spheres on the rings (2, 3, 3), one shared geometry and material, sizes varied, dark body with a rim light |
| Beam | A tapered vertical strip (billboard about the vertical axis) plus about 1,000 points per side, narrow and **faded in from the core** so it reads as emitted |
| Stars | About 1,500 fixed points, copied from Accretion's star shader with a blue-white palette |
| Camera | Slow drift, default elevation about 0.35 rad so the rings are open, drag to orbit (elevation clamped). **Distance is aspect-aware** so the outer ring always fits (lesson from the review: Accretion clipped at 390x844) |

Hierarchy by brightness: core and its rim, then rings and orbs, then beam, then stars.

## 2. Audio mapping (only existing fields)

| Frame field | Parameter | On screen |
|---|---|---|
| `bass` | `swell`, `glow` | Core swells at most 4%; rim and halo brighten, with a dim floor at rest |
| `mid` | `orbitSpeed`, `colour` | Orbit speed (via accumulated phase) and a restrained blue-to-violet shift (at most 60%) |
| `high` | `shimmer` | Orb shimmer and star twinkle |
| `rmsEnergy` | `exposure` | Overall brightness |
| `bassHit` | `beam` | Beam surge, 0.3 s decay, scaled to 0.7 so it stays third in the hierarchy |
| `beatDetected` + `onsetStrength` | `pulse` | One ring lights per accepted onset (round-robin), at most one per 0.35 s (under 3 per second) |
| `currentSceneState` | `sceneLevel` | Camera moves up to 1.5 units closer in build/active |
| silence / paused | `calm`, `motion` | Dim, slowly turning rest state; no beam, no pulses |
| reduced motion | `motion` 0.35 | Slower orbits, slower envelope attack, no beam surge, no ring pulse; colour and glow unchanged |

No waveform, spectrum or beat-grid is assumed.

## 3. Reuse (copy, per the decision)

| Copied and adapted | From | Notes |
|---|---|---|
| Pure params shape, silence rule, constants | `accretion/params.ts` | New field names; local constants (REST_GLOW, CALM_MOTION, REDUCED_MOTION, SILENCE_RMS) so there is no import coupling |
| Stateful animator: envelopes, phase accumulation, impulse decay, rate limiter, `dt` clamp | `accretion/animator.ts` | `jet` becomes `beam`, `flare` becomes `pulse`; plus `pulseRing` (round-robin). Uses the shared `follow` |
| Star points and value noise GLSL | `accretion/shaders.ts` | Palette changed |
| Jet-style point column | `accretion/shaders.ts` / `scene.ts` | Narrow, constant spread, origin fade-in |
| `own()` / `ownMat()`, `sceneStats`, `releaseGpu`, `dispose`, `resourceCounts` | `accretion/scene.ts` | Same ownership contract |
| Canvas component and debug ref | `AccretionCanvas.tsx` | New component, same wiring (including `releaseGpu` on `lost`) |
| Used as is | `GlHost`, `state.ts`, `useAudioFrame`, `SourcePicker`, `Transport`, `AudioPipelineProvider`, `cdp-lib-gpu.mjs`, `follow` | Not modified |

The only existing file edited is `preview/serve-gl.mjs` (three additive route lines for the new page). Nothing in Accretion changes.

## 3b. New files

`src/lib/constellation-core/{params,animator,shaders,scene}.ts`; `src/components/constellation-core/{ConstellationCoreCanvas,ConstellationCore}.tsx`; `src/app/lab/constellation-core/page.tsx`; `preview/core-entry.tsx`, `core.html`, `core-check.mjs`; `tests/constellation-core-{params,anim,scene}.test.ts`; generated `preview/dist/core.js`, `core.css`.

## 4. Lifecycle, resizing, performance

- One `GlHost` per mount, drawn inside a single `useAudioFrame`; no private loop. The host handles resize, DPR (cap 1.5), visibility, context loss and disposal unchanged.
- `scene.update` writes uniforms and transforms only (per-frame allocation limited to the small params object). Orb positions are set in place.
- Budget: 9 geometries and 9 materials, 0 textures; about 2,200 points; one full-screen-ish plane (the halo) is the only large fill. Target the same budgets as Accretion at DPR 1 (interval median at most 16.9 ms, GPU sync median at most 8 ms at 1280x720). Measured, not assumed.
- Bundle: Three.js is the dominant cost; target at most 300 KB gzip for the page.

## 5. Tests and acceptance

**Unit (Node):** params (bounds, finiteness, silence, reduced, purity, only contract fields); animator (envelopes, clamp, beam decay, limiter at most 3 per second, round-robin ring, determinism, reduced attack); scene (9 geometries and 9 materials, disposal exactly once, uniform mapping, `releaseGpu`, aspect-aware distance).

**Browser (`core-check.mjs`, GPU-enabled Edge):** hardware GPU; one live scene and host; silence is calm with a legible core rim; scripted sustained input is brighter than silence; a controlled bass hit raises the beam above 0.3 within a few frames and it decays below 0.05 within 1.5 s; one beat lights a ring and a 20-beat train accepts at most 4 in 1.2 s; reduced motion (phase rate about 0.35, no beam, no pulse, brightness retained); the outer ring fits the canvas at 1280x720, 1920x1080, 768x1024 and 390x844; resize without growth; context loss and restore with all resources re-uploaded and no "does not belong" warnings; 30 mount cycles with clean counters, listeners and heap; hidden-tab start; frame pacing and synchronized GPU timing; zero console errors.

**Visual evidence (stated as evidence, not assumed):** rest, sustained, one controlled bass event (before, during, after), one beat pulse, reduced vs normal, four viewports, an elevated and a default view. Labelled by input mode; scripted synthetic input only unless a real-song run is added.

**Acceptance wording:** "Constellation Core v0 meets its criteria" only for what the checks above actually show. Real music, headed browsers, a full 1920x1080 canvas, a formal flash analysis and the Next route stay listed as unverified unless run.
