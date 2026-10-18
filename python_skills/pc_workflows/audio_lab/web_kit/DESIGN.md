# DESIGN: Squall (Motion Lab's weather map of a song)

Squall turns a song into weather on a live map. Wind streams across a dark chart. Pressure systems
breathe with the bass, rain picks up with the highs, and lightning strikes on transients. A forecast strip
shows the whole song's weather ahead of time, and the barometer falls before a big section arrives. You
take part directly: drag across the map to blow wind, drag a storm's eye to move it, and double-click to
seed or dissipate a storm.

Route: `/lab/squall` (`src/app/lab/squall/page.tsx`). Preview: `http://localhost:5353/squall`.

---

## 1. Inspiration and evidence

The source is the "Curiosity & Capability: 12 Functional Stacks" PDF: 7 pages, 12 categories and 355
unique links, extracted with PyMuPDF. Most entries are utilities (news, jobs, PDF tools, courses). The
candidates for an audio-reactive *world* sit in stacks 01 (Live Planet), 03 (Maps), 06 (Music) and 08
(creative tools).

**Inspected directly** (live page captured with Firecrawl, screenshot examined, 2026-10-12):

| Reference | What the capture shows | Use for Squall |
|---|---|---|
| **Windy** (windy.com) | A full-bleed map with a coloured weather layer and short white **streak particles** drawn over it. A **play button and time scrubber** run along the bottom through the forecast days. A layer rail on the right (Wind, Rain/thunder, Temperature, Clouds…). A colour **legend in knots** (0–60) bottom right. A "pressure" toggle and a "particles animation" toggle. The WebGL wind layer did not render in the second, longer capture (grey map), so the claims here rest on the first capture's particle frame and the UI. | **Primary.** Streak particles on a speed-coloured layer, a bottom timeline that is also a forecast, a layer rail, a speed legend, an isobar toggle. |
| **LightningMaps.org** | Strikes are plotted as **dots that age from yellow to orange and red**. A live **"34/min · Delay 2.1s"** counter sits top left. There is a sound toggle. | Lightning on transients. Strike markers that age in place. A strikes/min readout, and the existing latency compensation shown the same honest way. |
| **Listen to Wikipedia** (Hatnote) | A flat dark slate field where each edit **blooms as a circle** with its title, plus an "edits per minute" counter. Sound is generated from the events. | Events appear as blooms on a quiet field, and **silence is visibly empty**: nothing moves when nothing happens. |
| **Radio Garden** | A full-screen satellite globe tinted one colour, with a single "Press play" call to action and a compact player bottom left. | The empty state is one clear action over the world, not a form. |
| **Submarine Cable Map** | Dense coloured polylines with landing-point nodes over a pale basemap, and a searchable list panel. | Rejected. The beauty is in static data, and audio would only recolour lines. |

**Considered from the PDF's name and description only** (not opened): Internet Map, Every Noise at Once,
musicmap, The Scale of the Universe, NASA Eyes, Stellarium, Zoom Earth, USGS Earthquakes, Shadertoy,
OpenProcessing, Neal.fun. **Internet Map is already the source of this kit's Constellation instrument**
(see the lower half of this file), so Squall deliberately goes in another direction. A second particle
galaxy would add nothing.

**Why Windy, with Lightning Maps and Hatnote layered in**

- *Visual impact:* a living flow field reads instantly and looks good at every energy level.
- *Interactive potential:* air can be pushed. Storms are objects you can grab and move.
- *Audio fit:* weather has a separate, nameable phenomenon for each part of the signal, so every mapping
  below has a physical reason and is not arbitrary.
- *Time:* Windy's bottom bar is already a timeline you scrub through future weather. A song's timeline
  maps onto it one to one, and the forecast strip shows what is coming.
- *Feasibility and performance:* streak flow fields have been drawn in Canvas 2D for years (fading trail
  buffer plus line segments). No WebGL dependency is needed.

## 2. Visual concept

A night-time synoptic chart. The ground is near-black ink (`#050912`), and a faint graticule (lat/long
grid) scrolls slowly east as the song plays. Over it:

- **Wind layer:** a smooth, low-resolution colour field of wind speed, drawn with its own ramp (ink →
  teal → sea green → pale lime → sand → apricot → coral → magenta). It is not Windy's palette.
- **Streaks:** 1,500–6,000 particles leave fading white trails along the flow, as on Windy.
- **Pressure systems:** each is an eye marked **L** (the weather-chart convention for a low), with wobbly
  concentric **isobars** that tighten as the system deepens.
- **Rain:** short slanted streaks in the wind direction.
- **Lightning:** branching "anvil crawler" bolts seen from above, then a marker that ages from yellow to
  red and fades (after Lightning Maps).
- **Instrument HUD:** a Beaufort force reading, a strikes/min count, a barometer tendency and a rain
  description, plus a Beaufort legend bar bottom right (the counterpart of Windy's knots legend).

Type: system UI with tabular numbers and small-caps labels, in the style of a forecast instrument. No
cards scattered around. All UI floats on the map with glass panels.

## 3. Interaction metaphor

**You are the weather, and the song is the climate.** The song sets the energy available. You decide
where the storms are and push the air around.

| Gesture | Effect |
|---|---|
| Drag across empty map | Blows a gust: air near the pointer takes on your drag velocity, then decays over about 0.6 s. |
| Drag an **L** | Moves that storm. Its isobars and inflow move with it. |
| Double-click / double-tap empty map | Seeds a new low (up to 5). |
| Double-click / double-tap an **L** | Dissipates that storm (at least 1 is kept). |
| Space / ← → / F | Play or pause / seek 5 s / full screen (when focus is on the map or the page body). |

Storms also drift by themselves with the prevailing wind (eastward) and wrap at the edges, so the map
keeps evolving as the song travels.

## 4. Audio → weather

Squall reads exactly one thing: the shared pipeline's `AudioFeatureFrame` (`src/lib/pipeline/contract.ts`).
It works with every source the pipeline has (live file, microphone, demo, pre-computed track) and never
asks where the audio came from. For files and pre-computed tracks it also draws an offline **forecast**.

| Frame field | Weather phenomenon | Visible as |
|---|---|---|
| `bass`: 20–150 Hz, smoothed | **Storm depth.** Vortex tangential speed `0.03 + 0.45·bass`. | Faster swirl around each L, tighter isobars, warmer colour near the eyes. |
| `bassHit`: punch band 60–150 Hz, instant attack | **The storm breathes in.** Radial inflow `0.01 + 0.4·bassHit`. | On each kick the streaks are pulled into the eyes, and a pressure ring leaves every L (once per rising edge). |
| `mid`: 150 Hz–2 kHz | **Jet stream.** Amplitude `0.015 + 0.22·mid` and meander rate of the divergence-free background flow. | The background flow meanders and speeds up. |
| `high`: 2–10 kHz | **Rain.** `(high − 0.12) / 0.6`, clamped. | Short slanted rain streaks. HUD: none / light / moderate / heavy. |
| `beatDetected` (+ `onsetStrength`, `bassHit`, `high`, `rmsEnergy`) | **Lightning strike** inside a storm cell weighted by storm strength, rate-limited. | A branching bolt, an optional soft flash, an outward ring and a marker that ages yellow → red over 20 s. Strikes per minute (15 s window) in the HUD. A seek or a new source clears the history. |
| `rmsEnergy`: overall | **Air energy.** Trail persistence, layer brightness, prevailing wind. | Busy passages leave long luminous trails; quiet ones short, dim ones. |
| silence (`rmsEnergy < 0.04`) or not playing | **Doldrums.** Speeds × 0.25, no rain, no strikes. | A near-still, dim chart: a deliberate resting state. HUD: "Force 0 · Calm". |
| forecast, else `currentSceneState` | **Barometric tendency.** With a forecast: mean level 1.5–5 s ahead minus the last 3 s. Without one: `build` → falling, `settle` → rising. | "↓ falling" before a big section arrives (inflow builds, isobars tighten), "↑ rising" as it clears. |
| combined wind index | **Beaufort force 0–12.** `0.55·bass + 0.3·rmsEnergy + 0.15·mid`. | A large "5 · Fresh breeze" readout and a marker on the legend bar. An interpretive scale, not a measurement. |

Lightning safety: at most 3 strikes per second, and a screen flash at most once per second at ≤ 18%
white. That stays under the WCAG 2.3.1 limit of three flashes per second. Settings offer **On / Soft (no
flash) / Off**, and reduced motion forces Soft.

## 5. User experience

1. **Arrive:** a calm, dim chart with two storms barely turning. One centred prompt in the style of Radio
   Garden: *Choose a song* · *Use microphone* · *Demo*. Files can also be dropped anywhere on the map.
2. **Load a file:** playback is ready immediately. The forecast strip fills in a moment later, after the
   file is decoded offline. If decoding fails, the strip says "forecast unavailable" and playback still
   works.
3. **Play:** the weather follows the song. The bottom bar holds play/pause, the time, the forecast strip
   (a silhouette of the song's intensity in the wind palette, which is also the seek control), the source
   name and fullscreen.
4. **Play with it:** blow wind, move storms, seed new ones. The HUD always says what the audio is doing in
   weather terms.
5. **Settings** (the *Layers* button, top right, opens a rail after Windy's; closed by default so the map stays
   uncovered): *Layer* Wind/Night, *Isobars* on/off, *Lightning* On/Soft/Off, *Detail* Light/Normal/Dense,
   *Sync nudge* ±200 ms, and Add/Remove storm buttons (the keyboard route to double-click).

A microphone or the demo signal has no forecast and cannot seek: the strip says so.

## 6. Architecture

```
sources (the shared pipeline)                 consumers
  OfflineSource   (pre-computed track)  ┐
  RealtimeSource  (file, mic, demo)     ┼─► AudioPipeline ─ onFrame ─► <SquallCanvas/>  weather.ts toWeather(frame, tendency)
                                        ┘   (one source,                               StrikeScheduler / KickEdge
                                             one rAF loop)                              field.ts  windAt: curl-noise jet + Σ vortices + gusts
                                                                                        particles.ts advect, rain
 File ─► OfflineAudioContext.decodeAudioData ─► computeForecast ──┐                      render.ts  Canvas 2D
 features.bin (pre-computed track) ─► forecastFromReadings ───────┴─► Forecast ─► <ForecastStrip/> + tendencyAt()
```

- **Squall adds no audio engine.** It builds sources with the pipeline's own factories (`useSquallSources`) and
  hands them to the one `AudioPipeline`. The earlier plan of an `AudioEngine` with a microphone mode was
  dropped: the pipeline refactor already provides the microphone, latency compensation and sync nudge.
- **Analysis is separate from rendering.** `weather.ts` turns a frame into physical parameters (pure,
  unit-tested). `field.ts` and `particles.ts` simulate (pure, unit-tested). `render.ts` only draws.
- **Per-frame state lives in refs and typed arrays.** React renders for coarse changes only: the HUD
  readout (at most 4 a second, and only when a value changed), the status chip, settings.
- **The forecast is optional and never blocks playback.** A file plays at once; the strip fills in after the
  decode. A pre-computed track builds it from its features bundle, so it needs no decode and works without Web Audio.

## 7. Files

| File | Role |
|---|---|
| `src/lib/squall/field.ts` | Wind field: divergence-free jet (analytic curl of a sum of sines), Rankine-like vortices with inflow, pointer gusts. |
| `src/lib/squall/weather.ts` | `toWeather()`, Beaufort scale, `StrikeScheduler`, `KickEdge`, rain and barometer wording. |
| `src/lib/squall/particles.ts` | Particle store and advection, rain, seeded RNG. |
| `src/lib/squall/forecast.ts` | `computeForecast()` from PCM, `forecastFromReadings()` from a features bundle, `tendencyAt()`. |
| `src/lib/squall/forecast-decode.ts` | Browser side of the forecast: offline decode of a file, or the features bundle of a pre-computed track. |
| `src/lib/squall/render.ts` | All Canvas 2D drawing, palettes. |
| `src/components/squall/SquallCanvas.tsx` | The map: a `useAudioFrame` consumer with the loop, gestures and adaptive detail. |
| `src/components/squall/Squall.tsx` | The experience: HUD, transport, settings rail, empty state, drop target, keyboard, fullscreen. |
| `src/components/squall/ForecastStrip.tsx` | Forecast silhouette and seek control (a native range input on top for keyboard and screen readers). |
| `src/components/squall/useSquallSources.ts` | Builds sources with the pipeline's factories; owns the file URL and forecast request; capability detection. |
| `src/app/lab/squall/page.tsx` | Route `/lab/squall`. |
| `preview/squall.html`, `preview/squall-entry.tsx`, `preview/serve.mjs` | Preview harness (leak counters and a snapshot of the simulation are exposed on `window` there, not in the app). |
| `preview/cdp-lib.mjs`, `preview/squall-check.mjs`, `preview/make-test-wav.mjs` | Browser verification (Edge over CDP) and its deterministic test signal. |
| `tests/squall.test.ts` | Unit tests for field, weather, strikes, particles and forecast. |

## 8. Performance and fallbacks

- Canvas 2D only. The trail buffer is an offscreen canvas at ≤ 1.25× DPR, faded with `destination-out`.
  Streaks are batched into 6 alpha buckets (one `stroke()` each). The colour layer is a ~64×36 `ImageData`
  upscaled with smoothing and refreshed every second frame. The overlay DPR is capped at 2.
- **Adaptive detail:** if the average frame interval exceeds 28 ms for 2.5 s, the particle count drops by 25%
  (floor 600) and the HUD says so. It lowers particles only: pixel fill cost is not reduced.
- The forecast is computed once per file, on the main thread after decode. It is skipped for files longer
  than 20 minutes. Its cost has not been measured.
- **Reduced motion:** movement × 0.35, no flash, no shake, shorter rain, rings drawn without growth.
  Colour, isobars, the HUD and strike markers still respond.
- **Failure handling:** no Web Audio → a note, file and microphone disabled, demo and pre-computed tracks still work.
  Mic denied → message. Undecodable file or a non-audio file → message, map stays calm. Forecast fails → the strip
  says so, playback continues. No Canvas 2D → text fallback.
- **Cleanup on unmount:** the pipeline loop is stopped and its source disposed (provider), the frame
  subscriptions, ResizeObservers and window/document listeners are removed, the file URL is revoked, the
  forecast request is aborted. The pipeline closes the AudioContext and stops the microphone tracks.

## 9. Implementation and verification plan

1. Pure modules plus unit tests: field divergence ≈ 0, vortex rotation sign, kick inflow points to the
   eye, gust direction, Beaufort monotonic, silence → Force 0, strike rate ≤ 3/s, flash ≤ 1/s, lightning
   off → none, forecast on a synthetic signal (quiet → bass → hiss → quiet) puts low/high energy in the
   right windows, and tendency is "falling" before the loud part and "rising" after.
2. Engine changes, then a `tsc` typecheck. The existing 42 tests must still pass.
3. UI, route, preview harness, esbuild + Tailwind build.
4. **Browser verification** (headless Chromium via playwright-core). Load a deterministic WAV test signal
   (silence → kicks at 120 BPM → hi-hat noise → silence) and a real track from the project folder. Read the
   HUD and a debug snapshot over time to confirm Force 0 in silence, raised force and strikes with kicks,
   rain with noise, seeking and play/pause, drag gusts, moving and seeding storms. Screenshot the states
   and inspect them.
5. Record here what remains unverified.

### Verification results

Run on 2026-10-12 in headless Microsoft Edge driven over the DevTools Protocol
(`preview/squall-check.mjs`, 70 checks, run against the minified production bundle), plus the unit tests, the
TypeScript check and the pre-existing Constellation/pipeline browser check (`preview/cdp-check.mjs`).

**Browser-verified (real Edge, real clicks, drags and touch, real Web Audio `AnalyserNode`)**

- *Render and resize.* The canvas fills its container and its backing store matches its CSS size at 1280×820,
  900×640, 1600×700 and a 390×844 phone viewport. No horizontal scroll, the map keeps drawing, and it is not blank.
- *Audio reactivity, with a deterministic 19 s WAV loaded through the file picker* (silence, 12 kicks at 55 Hz,
  hi-hat noise, mid tones, silence). Numbers are the simulation's own parameters, read every frame:
  silence gives RMS 0.00, Force 0, no rain, no strikes; kicks raise `bass` to 0.82, vortex speed 0.10 → 0.41, peak
  inflow 0.41, and 11 pressure rings for 12 kicks; hats raise `high` to 0.30 and rain 0.00 → 0.29; mid tones raise
  `mid` to 0.73 and the jet 0.02 → 0.18; every loud segment lifts the Beaufort force (7.6, 1.3, 3.6); onsets
  strike lightning, within the 3-a-second limit; silence again returns to Force 0 and stops strikes. Map
  captures at each moment are in `shots/squall-10…13`.
- *Forecast, seeking, scenes* (pre-computed Seyi track). The strip is drawn; clicking it at 25, 50 and 80 %
  seeks while paused to within 0.7 s; the playhead, clock and range input follow the frame time; the clock runs
  at 1.00× real time; the scene state matches the AudioLab timeline after seeks to rest, build, active, settle and
  rest; the barometer reads "falling" at 15 s (before the loud section) and "rising" at 72 s, matching the forecast
  computed independently in Node; arrow keys seek 5 s; Space toggles play; the strip is keyboard-operable.
- *Pointer and touch.* Mouse drag blows gusts that decay to 0; drag moves an L; double-click seeds and
  dissipates a storm, capped at five and floored at one; the cursor changes over an L. Touch drag blows gusts
  without scrolling the page, touch double-tap seeds a storm, and touch drag moves an L. The Add and Remove buttons do the same.
- *Cleanup.* Squall → Constellation → Squall three times on one pipeline: the Squall loop stops, its frame
  callbacks, ResizeObservers, window keydown and document fullscreenchange listeners and the audio-element
  listeners are removed, the object URL is revoked, the AudioContext is closed, and the microphone tracks are
  stopped. Listeners on the Constellation page afterwards equal those of a Constellation-only page. Nothing accumulates over three round trips.
- *States.* Loading (button reads "Loading…", others disabled, on a throttled network); pause and silence (the
  doldrums, Force 0 "Calm"); an undecodable file, a non-audio file and a denied microphone (alerts, map stays
  calm, strip says "Forecast unavailable"); drag-and-drop of a file (overlay, then loads); no Web Audio (note,
  file and microphone disabled, demo and pre-computed tracks, including their forecast, still work); no
  fullscreen API (button hidden); no Canvas 2D (text fallback); `prefers-reduced-motion` (speed scale 0.35).
- Every control has an accessible name.
- *Constellation and the shared pipeline.* The existing `preview/cdp-check.mjs` passes 13/13: demo, visual
  swap, pre-computed track, live file (live vs offline correlation 0.87–0.96 on band levels), microphone and source switching.

**Defects found by this pass and fixed:** the settings rail overlapped the legend and the transport; the error
alert sat under the transport; a failed source showed a pause icon; strikes per minute survived a seek; the
wind-layer upscale used `imageSmoothingQuality = "high"`, which more than doubled frame time in software
rendering (14–22 → 32–46 fps at DPR 1, 4 → 10 fps at DPR 2); phone layout cut off the source name and wrapped buttons.

**Not verified**

- Performance on real GPU hardware and on a phone. In headless Edge with software rendering the map runs at
  32–46 fps at DPR 1 and about 10 fps at DPR 2. The adaptive detail control only lowers particle count, and the
  cost at DPR 2 is per-pixel, so it does not help there. Treat DPR 2 on a weak GPU as a known risk.
- Listening: the headless browser has no audio output. The picture was checked against the analysed signal, not by ear against the sound.
- Safari, Firefox and a real phone's touch behaviour. Only Edge (Chromium) was used. Touch was injected through DevTools.
- Real fullscreen (headless cannot enter it), and the real-device microphone (a fake device was used).
- The Next.js route `/lab/squall` was not run: this kit has no Next.js dependency. The component is the same one the preview mounts.
- The mapping's *musical* usefulness is a design judgement, not something a test can show.
- The mic check in `cdp-check.mjs` failed on one of three runs under CPU load (not related to Squall); it passed when run alone.



---

# Earlier design: Constellation (audio-reactive instrument, /lab/instrument)

## Concept
A living constellation of about 900 nodes on a sphere. It behaves like a small instrument: it
breathes with the music rather than showing numbers. The creative direction comes from Internet Map
(a particle galaxy of relations), reinterpreted as abstract nodes with no real-world data.

## Principles
1. **Every visible change traces to a measured feature.** Bass, mid, high, onset and level each drive a
   named parameter (see `src/lib/instrument/profiles.ts`). Nothing moves for decoration alone.
2. **Silence is a state, not an empty screen.** With no sound the cluster turns slowly and dims. The
   status chip says "Silent: resting".
3. **Profiles are readings, not rules.** Galaxy, Pulse and Drift interpret the same numbers differently.
   None claims that a bass increase is a drop, or that highs are particles.
4. **Motion is optional, meaning is not.** With `prefers-reduced-motion`, movement is damped to about
   35% and jitter, sparkle, shockwave and tilt are off. Colour and glow still respond.
5. **Honest status.** The chip and the source label say whether the input is a real track, the
   synthetic demo, or nothing.

## Mapping summary
| Feature | Visual | Notes |
|---|---|---|
| bass kicks (40â€“150 Hz) | pull inward (instant kick path) | the beat-locked cue; see "Bass pull" below |
| low end (20–150 Hz, incl. sub) | damped spring body, core swell, glow, tilt | the slower cue for held bass |
| mid (150â€“2 kHz) | hue shift, link threads | colour and texture |
| high (2â€“10 kHz) | sparkle, jitter | detail; never the main brightness |
| onset | shockwave ring, node size kick | adaptive threshold, 120 ms refractory |
| level | core swell, glow | overall energy |

## Bass pull (how the cluster moves with the bass)
`src/lib/audio/bass.ts` turns the bass band into the pull:
- **Adaptive window:** the level is scaled between a tracked floor and peak, with a minimum 15 dB span, so
  quiet and loud material both use the range.
- **Kick path:** transients above the sustained body go straight to the pull with an instant attack and
  a 0.15 s decay. Nothing sits between the kick and the visible pull, so the hit is not delayed.
- **Body path:** the sustained bass drives a damped spring (4 Hz, damping 0.6; defaults kickSpan 0.15, sustainRelease 0.5), giving a small musical overshoot.
- **Combination:** the larger of the two paths. A sustained bass line holds steady rather than pumping.
- **Warm-up:** no kicks for the first 0.5 s while the window settles.

### Low end: sub versus punch (revised after Swaguu)
Swaguu's low end is mostly a sustained sub tone below 40 Hz (72% of its 20-500 Hz power), with bass notes
re-entering between beats rather than a kick on every beat. A single summed bass band is dominated by that
sub, so the re-entries barely register. The live engine now reads two things from a second 4096-point
analyser:
- **Punch (60-150 Hz)** feeds the shaper, so it drives the kick, pull, core flash and ring.
- **Low (20-150 Hz, sub included)** feeds the bass meter, swell and glow.

Measured as event capture (`tests/low-measure.ts --events`): events are raw rises of 6 dB or more in the
60-150 Hz band; recall is the share the pull answers, precision the share of pull spikes that match one.
The events come from the punch band itself, which favours punch-based readings, so treat the gap as an
upper bound.

| | Seyi recall / precision | Detty | Jeriq |
|---|---|---|---|
| Before: one band 40-150 Hz, 2048 FFT | 38% / 89% | 24% / 87% | 42% / 91% |
| Now: punch 60-150 Hz, 4096 FFT, kickSpan 0.15, release 0.5 | 69% / 87% | 37% / 88% | 57% / 89% |

The sub band alone is noisy (about 35% precision on Seyi and Jeriq), and adding it to the punch band did not
help, so it only shapes the swell. An 8192-point FFT captured more but smeared timing and lowered precision.
Settings were chosen by a rule fixed beforehand: precision of at least 85% on every song, then highest recall.

Recall is still below 70% everywhere. Many raw rises are small or overlap a note that is still decaying, and
the shaper deliberately ignores those instead of inventing hits.

**Correction.** The earlier per-beat "hit rate" and median-offset table was weak: the peak was searched
inside the same window it was tested against. It also assumed a bass hit on every beat, which is false for
Seyi. It has been removed. Do not read an early or late offset against the beat grid as a timing error.

## Latency and sync
The analyser sees the audio before the output device, so visuals run ahead of what you hear by the device
latency (base plus output latency, reported by the browser). The renderer delays the features by that
amount (`src/lib/audio/delay.ts`). The **Sync nudge** slider (âˆ’200 to +200 ms) is a manual adjustment for
your own ear, applied on top of the automatic compensation.

## Interaction
Play/pause, timeline scrub (track only), three profiles, hover to push nodes, drag to pull them,
load any audio file the browser decodes, live meters, keyboard-operable controls.

## Performance
Canvas 2D. Nodes are batched into six alpha buckets; links are one path. Device pixel ratio is capped
at 2. Per-frame values live in plain objects and refs, not React state. Framer Motion is not used:
CSS transitions cover the UI, and the brief allows the library only for UI transitions, so we avoid a
dependency. Target: under 4 ms of drawing per frame; to be measured on target hardware.

## Known limits
- The live-track path (AnalyserNode on a real file) is verified by type-checking and the build, not by
  listening in a real browser. Confirm it by loading a track.
- Onset detection is a spectral-flux heuristic. Dense or sustained material can give false or missed
  onsets; the threshold is configurable in `features.ts`.
- Band edges (150 Hz, 2 kHz) are general starting points, not tuned to any particular genre.
- Profiles are first drafts for taste, not evaluated on a corpus.

