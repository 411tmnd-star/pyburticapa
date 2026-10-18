# Spectrum Matrix (band terrain v0): implementation plan

Date 2026-10-13. Written for the project owner. Companion to `MOTION-LAB-NEXT-DESIGNS.md` (section 5) and `MOTION-LAB-VISUALIZER-GUIDE.md`. Built additively in the working copy; Accretion and Constellation Core are untouched. The audio contract is unchanged.

## 1. The honest framing

The shared audio frame has three band levels (bass, mid, high), loudness, onset, `bassHit` and scene state. It has **no frequency bins**. So this scene is a **band terrain**: a glowing wireframe landscape whose rows scroll toward the viewer, shaped by the three bands. The left-to-right ordering (bass, mid, high) is a stylised layout, **not a measured spectrum**, and the on-screen copy must say so. No axes, no Hz labels, no "spectrogram" claim. A true spectrum scene is a separate, deferred decision (it needs a contract, analyser and exporter change).

References: your images 1 and 5 (a glowing wireframe terrain with a cyan horizon haze). Image 2 (labelled axes) is out of scope for the reason above.

## 2. Composition

| Element | Build (PROPOSED) |
|---|---|
| Terrain | 72 columns x 56 rows grid, 18 wide, about 27 deep, rows scrolling toward the camera. Height from the band levels at the moment a row is injected, so the landscape is a time history. Rows are injected at the far end and fade in from fog, so nothing pops |
| Wireframe | One `LineSegments` over a dark opaque surface (hidden-line look, depth-tested, with polygon offset against z-fighting). Line colour is cyan to violet by height and the mid band; brighter crests |
| Continuity | Rows are injected from an accumulated clock; the whole mesh slides by the fractional row, so motion is continuous and independent of frame rate (no stepping at the row rate) |
| Haze | A camera-facing horizon glow plane, dithered, faded to zero inside its edge (the banding and boundary lessons) |
| Camera | Elevated look down the terrain; aspect-aware distance so the three band lobes are always in frame; drag to orbit with clamps |
| Resources | 3 geometries, 3 materials, 0 textures; the terrain's positions are updated on the CPU only when a row is injected |

## 3. Mapping (existing fields only)

| Field | Parameter | On screen |
|---|---|---|
| `bass` | left lobe height | Raised terrain on the left |
| `mid` | centre lobe height, `colour`, scroll speed share | Raised centre; cyan to violet (at most 60%) |
| `high` | right lobe height and fine texture | Raised, rougher right side |
| `rmsEnergy` | `exposure` with a floor of 0.2 | Brightness, with a readable rest state (lesson from the Constellation Core polish) |
| `bassHit` | `ridge` | A tall wall across the row being injected, decaying in 0.3 s; it then travels toward the viewer |
| `currentSceneState` | `sceneLevel` | Camera height and distance |
| silence / paused | `calm`, `motion` 0.25 | Low, slow, dim undulating terrain; no ridge |
| reduced motion | `motion` 0.35 | Scroll at 0.35x, no ridge, slower envelope attack; colour and glow unchanged |

`beatDetected` is not used.

## 4. Reuse

Copied and adapted (per the earlier decision): the params shape and silence rule, the envelope and impulse animator with its `dt` clamp, the `own()` / `ownMat()` ownership and `releaseGpu` / `dispose`, the canvas component (including re-applying the clear colour in `onRestored`), the preview entry pattern, the check script structure. Used unchanged: `GlHost`, `state.ts`, `useAudioFrame`, `SourcePicker`, `Transport`, `AudioPipelineProvider`, `cdp-lib-gpu.mjs`. The only existing file edited: `preview/serve-gl.mjs` (additive route lines). New for this scene: a row ring buffer with deterministic value noise in the animator, the terrain scene, and the grid shader.

## 5. Acceptance criteria (fixed before building)

**Unit:** params bounded, pure, silence calm, floors; animator: row injection count depends on time only (the same total rows at 30, 60 and 144 fps), ring buffer order and wrap, heights within 0..1, ridge decays with 0.3 s and never exceeds its input, determinism, reduced scroll 0.35x; scene: 3 geometries and 3 materials, exactly-once disposal, `releaseGpu`, world position of a row is continuous across a row injection, aspect-aware distance.

**Browser (GPU Edge, scripted SYNTHETIC input):**
- Band mapping: after 3 s, bass-only input gives a left-strip luminance at least 1.5x the right strip; high-only the reverse; mid-only a centre strip at least 1.5x each side.
- Rest: scene light above background at silence >= 0.006 and sustained / rest >= 1.8 (chosen from Constellation Core's rest figure of 0.0086 and its 1.8 ratio; written down before measuring).
- Ridge: `bassHit` raises the ridge above 0.3 within 4 frames, below 0.05 within 1.7 s; the highest injected row rises and stays at or below 1.0.
- Reduced motion: scroll rate ratio 0.25 to 0.45, ridge 0.
- Framing: the three lobe centres are inside the canvas at 1280x720, 1920x1080, 1280x900 (DPR 1.5), 768x1024, 390x844.
- Lifecycle as before: loss and restore (all geometries back, no warnings, clear colour preserved), 30 mount cycles, hidden tab, no console errors, listeners at baseline.
- Frame pacing and synchronized GPU time (**pacing needs AC power; the machine was on battery at 7% and throttled to about 30 fps, so pacing is blocked until it is plugged in**; GPU sync is recorded either way).
- Page bundle at or under 300 KB gzip.

**Visual evidence:** rest, sustained, one controlled bass event (before, during, after), reduced vs normal, four viewports, elevated and low views; per-frame luminance series; all labelled as scripted synthetic input. Real music stays a stated gap.
