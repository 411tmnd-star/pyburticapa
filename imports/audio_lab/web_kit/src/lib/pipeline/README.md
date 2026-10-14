# Audio pipeline

One stream of audio features, many sources, many visuals. Nothing in this folder imports a renderer, a
component or the DOM's rendering APIs.

```
 sources                         pipeline                       consumers
 ─────────                       ────────                       ─────────
 OfflineSource  ┐                                               <ConstellationCanvas/>
 RealtimeSource ┼─ sample(now) →  AudioPipeline ─ onFrame(cb) →  <ParticleField/>
  (file, mic,   │   frozen        (one source,                   <anything you write/>
   demo)        ┘   frames         one rAF loop)  ─ state ─────→  <Controls/>  (coarse only)
```

## The contract: `AudioFeatureFrame` (contract.ts)

| field | meaning |
|---|---|
| `time`, `progress`, `isPlaying` | playback position in seconds, 0..1 (0 for a microphone), playing flag |
| `bass`, `mid`, `high` | band loudness 0..1 (20-150 Hz incl. sub, 150-2000 Hz, 2-10 kHz) |
| `rmsEnergy` | overall loudness 0..1 |
| `onsetStrength` | 0..1, how far the spectral flux is above the adaptive threshold (0.5 = at it) |
| `beatDetected` | true only on the frame an onset fired. An onset, not a beat grid |
| `currentSceneState` | `rest`, `build`, `active` or `settle` |
| `bassHit` | extension: bass-note onset 0..1 from the 60-150 Hz band, instant attack, 150 ms decay |

Frames are frozen. Offline sources take the scene state from the AudioLab motion timeline; live sources use
a simpler causal tracker (`scene-tracker.ts`), so scene boundaries are comparable in kind, not identical.

## Writing a consumer

```tsx
"use client";
import { useAudioFrame } from "@/lib/pipeline/react";

export function Pulse() {
  const ref = useRef<HTMLDivElement>(null);
  useAudioFrame((f) => {
    if (ref.current) ref.current.style.transform = `scale(${1 + f.bassHit * 0.4})`;
  });
  return <div ref={ref} />;
}
```

Hooks (all need `<AudioPipelineProvider>` above them):

- `useAudioFrame(cb, deps?)` runs `cb` for every frame with no React render. Use it to draw, write CSS variables or move meshes.
- `useAudioFeatures()` returns `{ current }`, always the latest frame, for reads inside your own loop.
- `usePipelineState()` re-renders on coarse change only: source, playing, duration, scene, error, latency.
- `useSceneState()` re-renders only when the scene state changes.
- `useAudioPipeline()` returns the controls: `setSource`, `play`, `pause`, `toggle`, `seek`, `setSyncNudge`.

## Choosing a source

```ts
pipeline.setSource(createSyntheticSource(() => performance.now()));       // demo
pipeline.setSource(await loadOfflineSource({ manifestUrl, songId }));      // pre-computed
pipeline.setSource(createLiveFileSource(file).source);                      // live file
pipeline.setSource(createMicSource());                                      // microphone
await pipeline.play();
```

`setSource` disposes the previous source. Consumers do not change.

## How live and offline share one path

Both turn **raw band readings** (`BandReading`: low/punch/mid/high/all dB and spectral flux) into features
with the same `FeatureComputer` (`computer.ts`).

- Live reads two AnalyserNodes (2048-point and 4096-point FFT) in `webaudio.ts`.
- Offline reads readings that `scripts/export_web.py` pre-computed from the audio with `audiolab.webfeatures`,
  an emulation of the same analysers. It runs the computer once at load, so seeking is a lookup.

Browser and sample-rate differences mean numbers match in meaning, not to the last decimal. Measured on a 20 s
excerpt of one song in headless Edge over several runs, live versus offline Pearson correlation was 0.98-0.99
(bass), 0.92-0.95 (mid), 0.81-0.90 (high), 0.96-0.98 (overall) and 0.85-0.93 (bass hit). The live frames
lagged by about 50 ms, which matches the 50 ms output latency the live source reported and compensated for.
One song, one browser: treat these as a sanity check, not a guarantee.

## Adding a source

Implement `FeatureSource` (source.ts), or for anything that analyses audio as it plays, implement a
`ReadingBackend` and wrap it in `RealtimeSource`. Do not import UI code.

## Tests

```
node --import ./tests/resolve-ts.mjs --experimental-transform-types --test tests/lib.test.ts tests/instrument.test.ts tests/pipeline.test.ts
node --import ./tests/resolve-ts.mjs --experimental-transform-types preview/cdp-check.mjs   # real browser (needs the preview server, Edge)
```
