# Motion Lab: the next three designs (plan only, nothing implemented)

Date 2026-10-13. Written for the project owner. Companion to `MOTION-LAB-VISUALIZER-GUIDE.md` (the reusable pattern). The brief: pick the **three easiest** designs, the ones needing the **least new audio architecture**, because Accretion v0 is nearly final.

Labels: **VERIFIED** (seen in code or in your reference images), **INFERRED**, **PROPOSED**, **UNKNOWN**. Rendering technology choices are PROPOSED unless stated.

## 1. The deciding fact (VERIFIED)

The shared `AudioFeatureFrame` carries `bass`, `mid`, `high`, `rmsEnergy`, `onsetStrength`, `beatDetected`, `bassHit`, scene state and time. It has **no frequency bins and no waveform**, and the offline feature bundle holds only six per-frame channels. So a design is "easy" here if it can be driven honestly by three bands, loudness and two event signals.

## 2. Your five reference images, as I read them

| Image | What it shows | Maps to |
|---|---|---|
| 1 | Wireframe 3D spectrogram grid, height and colour from frequency and time | Spectrum Matrix |
| 2 | Labelled spectrogram surface (axes in Hz, seconds, dB) | Spectrum Matrix (the labelled, measured form) |
| 3 | A glowing core sphere with orbit rings, floating orbs and a vertical beam, in a starfield | Constellation Core |
| 4 | A glowing waveform above a flowing particle wave and a lit river in mist | Mixed: waveform strip (Sonar Lab), flowing glow and mist (Nebula Fluid) |
| 5 | Dark, glowing wireframe terrain with a cyan horizon haze | Spectrum Matrix (the atmospheric, cinematic form) |

I may have misread image 4; correct me if it is meant to be one specific design.

## 3. The choice

| Design | New audio data needed | Gap in the current contract | Rendering risk | Verdict |
|---|---|---|---|---|
| **Constellation Core** | none (bands, rms, `bassHit`, `beatDetected`, scene state) | **none** | low (few meshes, additive glow, all patterns already in Accretion) | **Pick 1 (easiest)** |
| **Spectrum Matrix** | true frequency terrain needs bins; a *band terrain* does not | none for the band form; **bins** for the true form | low to medium (a displaced grid, CPU-updated) | **Pick 2, as a "band terrain" v0** |
| **Nebula Fluid** | none | **none** | medium: full-screen shader cost on an Intel UHD is unmeasured | **Pick 3** |
| Sonar Lab | waveform, spectrum | **yes**: needs sample or bin data from the analyser, a new exporter field for offline songs, and a contract extension | n/a | **Deferred**: the only one that forces audio-architecture work |

Recommended order: **Constellation Core, then Spectrum Matrix, then Nebula Fluid.** Constellation Core proves the pattern is reusable at the lowest risk. Nebula Fluid goes last because its performance is the least predictable.

**Honest limits.** A band terrain has three real frequency regions, not a spectrogram; it must be labelled as stylised and must not carry axis labels like image 2. Sonar Lab's oscilloscope could not be drawn truthfully from three bands, which is why it is deferred, not because it is a worse idea.

## 4. Design 1: Constellation Core

A central glowing core with orbital rings, orbiting orbs and a vertical beam, on a starfield (image 3). Not to be confused with the existing Canvas 2D instrument, which is called Constellation; use a distinct route and title.

| Item | Plan |
|---|---|
| **Reuse** | Pipeline, `useAudioFrame`, `SourcePicker` / `Transport`, `GlHost`, `state.ts`, the params / animator split, `own()` / `ownMat()` disposal, `follow` envelopes, impulse decay and rate limiter from `animator.ts`, star-field and jet-style additive point code (copied, not shared, unless a second use justifies extraction), the `cdp-lib-gpu` launcher and the check structure |
| **New** | `lib/constellation-core/{params,animator,scene,shaders}.ts`, canvas and experience components, route, preview entry and check, tests |
| **Technology (PROPOSED)** | Three.js on `GlHost`: a sphere with a fresnel rim shader, thin ring ribbons with an additive glow shader, 6 to 10 small glass-like orbs, a beam from tapered additive sprites, one star `Points` layer. No post-processing |
| **Mapping (PROPOSED)** | `bass`: core glow and swell. `mid`: orbit speed. `high`: orb shimmer, star twinkle. `rmsEnergy`: exposure. `bassHit`: beam surge with a 0.3 s decay (reuse the jet impulse). `beatDetected`: one ring pulse, rate-limited under 3 per second. Scene state: camera distance |
| **Contract gap** | None |
| **Reduced motion** | Orbit speed 0.35, no beam surge, no ring pulse; glow and colour stay |
| **Lifecycle** | Identical to Accretion: `releaseGpu` on `lost`, `dispose`, hidden start |
| **Acceptance** | Unit tests for params, animator (envelopes, limiter, clamp, determinism) and ownership counters; browser check with the existing sections (response, silence, reduced motion, resize, context loss, 30 mount cycles, hidden start); frame budget at DPR 1 matching Accretion's; bundle at or under 300 KB gzip |
| **Visual evidence** | Rest, sustained, one controlled bass impulse (before, during, after), reduced vs normal, four viewports **including 390x844 and a default view that shows the rings clearly**, one video or per-frame series for smoothness |

## 5. Design 2: Spectrum Matrix (band terrain v0)

A glowing wireframe terrain whose rows scroll away with time (images 5 and 1). Height comes from smoothed bass on one side, mid in the middle, high on the other, with fixed procedural texture, so peaks relate to real band energy without pretending to be a spectrogram.

| Item | Plan |
|---|---|
| **Reuse** | Same as Design 1, plus the horizon haze idea from Accretion's atmosphere (with dither) |
| **New** | A ring buffer of terrain rows in the animator (the only genuinely new stateful idea), a terrain scene, a grid-line shader, a height-to-colour ramp |
| **Technology (PROPOSED)** | Three.js, one grid mesh (about 64 x 48 vertices) displaced on the CPU each frame via the position attribute (cheap, no textures, so no new GPU resource kind to release), line or wireframe shading with fog toward the horizon |
| **Mapping (PROPOSED)** | Row injection at a fixed rate (about 30 rows per second); `bass`, `mid`, `high` fill the lateral profile; `bassHit`: one tall ridge that scrolls away; `rmsEnergy`: brightness; scene state: camera height. No `beatDetected` needed |
| **Contract gap** | None for this form. **A true spectrogram (images 1 and 2) needs frequency bins**: not available |
| **Reduced motion** | Scroll rate 0.35, no `bassHit` ridge, heights smoothed more slowly |
| **Lifecycle** | Same as Design 1; the ring buffer is plain memory and survives context loss |
| **Acceptance** | Unit tests for the ring buffer (order, wrap, bounded heights, determinism at any `dt`), params and animator; no axis labels or "spectrum" claim in the UI copy; frame budget; checks as Design 1 |
| **Visual evidence** | Rest, sustained, bass ridge sequence, reduced vs normal, four viewports, one clip showing scroll continuity (the main temporal risk is visible stepping at the row rate) |

## 6. Design 3: Nebula Fluid

Flowing, glowing cosmic smoke (the mist and glow of image 4). A shader scene, not a fluid simulation.

| Item | Plan |
|---|---|
| **Reuse** | Same as Design 1 |
| **New** | A full-screen shader (domain-warped fractal noise, 3 to 4 octaves) and an animator controlling flow time and warp strength |
| **Technology (PROPOSED)** | Three.js full-screen quad on `GlHost`, **no render targets**, so no ping-pong textures. Real volumetric ray marching and a true fluid solver are out of scope |
| **Mapping (PROPOSED)** | `bass`: core density and glow. `mid`: flow speed and warp. `high`: fine detail. `rmsEnergy`: exposure (with a per-frame limit on brightness change). `bassHit`: an expanding ripple with a 0.3 s decay. Scene state: palette position, restrained |
| **Contract gap** | None |
| **Reduced motion** | Flow 0.35, no ripple, slower exposure changes |
| **Lifecycle** | Same as Design 1 |
| **Main risk** | Fill rate on Intel UHD: **UNKNOWN until measured.** Use `maxPixelRatio` (the only existing knob) and fewer octaves if the synchronized GPU time exceeds Accretion's 8 ms median budget at DPR 1; adding a quality governor would be a deliberate extra decision |
| **Photosensitivity** | Large-area luminance change is more risky than Accretion's small flares: cap brightness change per frame and test with the luminance-step method from the Step 0 scope |
| **Acceptance and evidence** | As Design 1, plus an early GPU-time measurement before any visual tuning, and large-area luminance series for the loudest section |

## 7. Shared acceptance template (use for all three)

1. `tsc` clean; unit tests for params, animator and ownership; existing suites unchanged.
2. Browser check with the GPU launcher: audio response and silence, reduced motion, resize without growth, context loss and restore, 30 mount cycles, hidden start, zero console errors.
3. Frame budget at 1280x720, DPR 1 (median interval at most 16.9 ms, p99 at most 33 ms, synchronized GPU median at most 8 ms) plus one measurement at a full 1920x1080 canvas, which Accretion never had.
4. Minified, gzipped bundle at or under 300 KB; the other bundles do not grow.
5. Evidence pack at four viewports with each input labelled (silent, scripted synthetic, demo, real). **Real music is a stated gap until a real-song run exists.**

## 8. What this plan deliberately does not do

It does not change the audio contract, does not add a spectrum or waveform path, does not start any scene, and does not extract shared helpers. If Sonar Lab, or a true spectrogram, is wanted later, it needs a separate decision covering the analyser, the offline exporter (`export_web.py` and the `audio-features/1` format) and the contract extension together.
