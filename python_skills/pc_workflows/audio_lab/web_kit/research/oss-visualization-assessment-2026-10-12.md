# Open-source visualization libraries: assessment for Motion Lab

Date: 2026-10-12. Status: research only. No dependency was installed, no application file was edited, and `DESIGN.md` was not touched. This file is the only artifact created (plus its folder `web_kit/research/`).

Evidence labels: **VERIFIED** (read from a package manifest, registry, README or source on 2026-10-12), **INFERRED** (reasoned from verified facts or from general knowledge of the library that I did not re-read today), **PROPOSED** (my recommendation), **UNKNOWN** (could not be established).

---

## 1. Executive summary

- **Motion Lab today has zero runtime visualization dependencies.** Everything is Canvas 2D plus typed arrays on top of one audio-feature contract (VERIFIED, see section 2). None of the ten libraries fills a gap that blocks current work.
- **The real gap is not in this list.** Accretion, Spectrum Matrix, and Nebula Fluid need a WebGL/shader/3D subsystem. None of the ten repositories provides one. Only 3D Force Graph brings Three.js along, and it is a graph tool, not a scene framework. A custom Three.js (or similar) layer is the real decision, and it was out of scope for this list.
- **Ranked shortlist by actual value to Motion Lab:**
  1. **D3, as individual micro-modules only** (`d3-scale`, `d3-shape`, `d3-interpolate`, `d3-contour`, `d3-delaunay`, `d3-force`). Low cost, no rendering conflict, Canvas-compatible. Adopt on demand, not as the `d3` bundle.
  2. **3D Force Graph, specifically its engine `three-forcegraph`**, as a throwaway prototype for a Constellation variant. Only worth it if that variant is meant to be a real graph (relationships), not the current index-linked sphere.
  3. **XYFlow**, reserved for a future audio-to-effect mapping editor. Zero value today, high value if that editor is ever scoped.
- **Reject for runtime:** Chart.js, Plotly.js, Nivo (each produces the conventional-dashboard look and/or has a cost out of proportion to what it adds). **Documentation/tooling only:** Mermaid. **Research reference, do not adopt:** ECharts (+ECharts GL), AntV G6, Cytoscape.js.
- The ten libraries are mostly the wrong shape: they are data-visualization toolkits built around a data-in, chart-out model. Motion Lab's pipeline is a 60 fps imperative loop that draws from a few scalars. The libraries that fit best are the ones that expose imperative, per-frame update paths (D3 modules, Three.js-based tools), not React-state or `setOption`-style charts.

---

## 2. What the project actually is (verified by reading the filesystem)

Path: `C:\Users\USER\Desktop\audio_lab`. **Not a git repository.**

| Area | Finding | Label |
|---|---|---|
| Two halves | Python package `audiolab` (analysis, interpretation, motion timeline, visual mapping; `pyproject.toml`, `schemas/*.v1.json`, `configs/`, `tests/` with 15 test files) and `web_kit/` (TypeScript/React front end). | VERIFIED |
| Python flow | `features.py`, `beats.py`, `bars.py`, `events.py` -> `interpretation/` -> `motion/` (state machine and property curves) -> `visual_mapping/` (7 unitless 0..1 channels: intensity, scale, density, motion_weight, pulse_strength, transition_weight, detail_activity). Three profiles: balanced, bass_pulse, cinematic. | VERIFIED |
| Bridge | `scripts/export_web.py` validates timelines and writes `motion-web/1` and `audio-features/1` bundles into `web_kit/public/motion/` for two songs (seyi, detty). A third song (Jeriq) has analysis outputs only. | VERIFIED |
| Web package | `web_kit/package.json` declares only `react`, `react-dom`, `typescript` and type packages. **`node_modules` also contains esbuild, tailwindcss 3, postcss and playwright-core, which are not declared in `package.json`.** The preview README installs them by hand. | VERIFIED (discrepancy worth fixing later) |
| Next.js | **`next` is not installed.** The code uses `"use client"` and an `src/app/lab/*/page.tsx` layout, and `types/next-stub.d.ts` stubs the `Metadata` type. `export_web.py` targets a sibling project `../353-curiosity/public/motion` that is **not on this filesystem**. So the Next.js version and config are UNKNOWN; Next.js compatibility below is INFERRED from the App Router layout. | VERIFIED / UNKNOWN |
| Shared audio pipeline | `src/lib/pipeline/`: one `AudioFeatureFrame` contract (`time, progress, isPlaying, bass, mid, high, rmsEnergy, onsetStrength, beatDetected, currentSceneState, bassHit`), frozen frames, sources (`offline`, `realtime`/Web Audio, `synthetic`, mic), hooks `useAudioFrame` (no React render per frame), `useAudioFeatures`, `usePipelineState`. Renderer-free by rule. | VERIFIED |
| Normalization | dB window -85..-25 dB mapped to 0..1, fast attack/slow release; bass adaptive window and kick/body split in `lib/audio/bass.ts`; latency compensation in `delay.ts`. Live vs offline correlation was measured once (0.81-0.99 depending on feature, one song, one browser). | VERIFIED (as documented; I did not re-run it) |
| **Constellation** | Implemented: ~900 nodes on a sphere, links join index neighbours (`i+1`, `i+9`), three profiles, Canvas 2D in 6 alpha buckets. Route `/lab/instrument`. | VERIFIED |
| **Squall** | Implemented: curl-noise wind field, vortices, 1,500-6,000 CPU particles, Canvas 2D, forecast strip, adaptive detail, lightning with rate limits. Route `/lab/squall`. | VERIFIED |
| **Accretion, Spectrum Matrix, Sonar Lab, Nebula Fluid** | **No trace in any project file** (searched all source, config and docs, excluding `.venv`). They are candidate experiences only. | VERIFIED |
| Rendering systems | Canvas 2D only. No WebGL, no Three.js, no shader code anywhere. | VERIFIED |
| Tests | `web_kit/tests/`: instrument, lib, pipeline, squall test files (about 100 test cases by a count of `test(`/`it(` calls) plus Python tests. Browser verification via CDP (`preview/cdp-check.mjs`, Edge) covers the pipeline/instrument page. **I did not run any test.** | VERIFIED (not executed) |
| Performance checks | Targets are stated (under 4 ms/frame for Constellation, adaptive detail for Squall) but DESIGN.md says "to be measured on target hardware". No measured frame-time results found. | VERIFIED |
| Doc gaps | `DESIGN.md` Squall "Verification results" is a placeholder ("filled in after implementation; see below") with nothing below it. It also lists `src/lib/audio/engine.ts` as a file, which no longer exists (the pipeline replaced it). The Constellation half has mojibake (`â€“`). Squall's browser verification therefore cannot be confirmed from documents; `web_kit/shots/sq_demo.png` and `sq_empty.png` exist. | VERIFIED |
| Inspiration research | `DESIGN.md` section 1: Windy, LightningMaps, Hatnote, Radio Garden, Submarine Cable Map inspected; Internet Map origin for Constellation. | VERIFIED |

**Architecture constraints that decide fit** (from `DESIGN.md` section 6 and `pipeline/README.md`): per-frame state lives in refs and typed arrays; React renders only on coarse change; analysis is separate from rendering; reduced-motion and flash-safety rules apply; silence is a deliberate state. A library that forces per-frame React state, owns its own animation loop with no hook, or cannot honor reduced motion is a poor fit.

---

## 3. Capability matrix

Costs are gzip-9 sizes of each library's own minified UMD file from jsDelivr, **not tree-shaken app bundles** (VERIFIED as file sizes; real impact will differ). Nothing was benchmarked.

| Repository | Primary capability | Best Motion Lab use | Rendering | React/Next fit | Audio-reactivity fit | Performance concerns | Overlap | Integration cost | Recommendation |
|---|---|---|---|---|---|---|---|---|---|
| **D3** (7.9.0, ISC) | Modular math: scales, shapes/curves, interpolation, contours, Delaunay, force, quadtree | Sonar Lab axes/traces, contour lines for fields, spline paths | None itself; SVG selections or Canvas via `d3-path` | Good if used as math only (no DOM ownership) | High: pure functions called per frame | Negligible for math modules; selection/transition APIs are not for 60 fps | Partly own hand-rolled math (Squall) | **Low** | **Adopt later, per module** |
| **Mermaid** (12.1.0, MIT) | Text-to-diagram (flowchart, state, sequence) | Docs: pipeline and scene state machine diagrams | SVG, generated at render time | Awkward at runtime (async render, DOM injection) | None | 5.4 MB raw / 1.5 MB gz full bundle | None | Low for docs, **high** for runtime | **Docs/tooling only; never runtime** |
| **Chart.js** (4.5.1, MIT) | Canvas charts with animation and decimation | Plain meters/line charts | Canvas 2D | Needs a wrapper; imperative `update()` | Medium: `update('none')` per frame is possible | Generic chart update path; built for hundreds-thousands of points | High (own meters, ForecastStrip) | Low-medium | **Reject for runtime** |
| **Apache ECharts** (6.1.0, Apache-2.0) | Large chart family, `lines`, `graph`, `heatmap`, `custom` | Reference only | Canvas or SVG via ZRender; **GL via separate echarts-gl** | Wrapper needed; client-only | Medium via `setOption` | 359 KB gz core (+170 KB gz echarts-gl) | Overlaps Plotly, Chart.js | Medium-high | **Research reference** |
| **XYFlow** (@xyflow/react 12.12.0, MIT) | Node/edge editor for React | Future mapping editor (feature -> channel -> effect) | DOM/SVG (React nodes) | **Excellent** (React-first, peers `react>=17`) | Low for per-frame; fine for editing UI | React-state driven; ok for dozens of nodes | None today | Medium (+a data model for mappings) | **Prototype later, when an editor is scoped** |
| **Plotly.js** (4.1.2, MIT) | Scientific charts incl. 3D surface | Spectrum Matrix prototype | SVG + WebGL (regl) | Wrapper (`react-plotly.js` 4.1.0); client-only | Low-medium: `Plotly.react` re-tessellation per frame is not designed for 60 fps (INFERRED) | **1.4 MB gz full**; WebGL context limits (README) | Overlaps ECharts+GL | Medium | **Reject (defer to research reference)** |
| **Nivo** (0.99.0, MIT) | React chart components | None | SVG, HTML, Canvas variants | Good (React 16-19) | Low: React-state animation (`@react-spring`) | Re-render cost; DOM-heavy SVG | Overlaps Chart.js, own UI | Low | **Reject** |
| **AntV G6** (5.1.1, MIT) | Graph engine: layouts, behaviors, animation | Reference for graph UX | Canvas default via AntV G; SVG/WebGL via separate packages; 3D via `@antv/g6-extension-3d` 0.1.x | Imperative class; React nodes via extension | Medium: imperative data updates | 380 KB gz; 3D extension is pre-1.0 | Overlaps Cytoscape, 3D Force Graph | Medium-high | **Research reference** |
| **Cytoscape.js** (3.34.3, MIT) | Graph theory model + renderer | Offline graph analysis; 2D networks | Canvas; opt-in `webgl` layer present in source | Imperative; no React layer in repo | Medium: style/data updates | 133 KB gz; zero dependencies | Overlaps G6 | Medium | **Research reference** |
| **3D Force Graph** (1.80.1, MIT) | 3D force-directed graph on Three.js | Constellation variant with real relationships | WebGL (Three.js) | Imperative; `react-force-graph-3d` wrapper exists (1.29.2) | **High**: per-node/link callbacks, `emitParticle`, custom Object3D | Three.js + physics dependency; 355 KB gz bundle plus Three | Overlaps custom Three.js | **Medium** | **Prototype (via `three-forcegraph`)** |

---

## 4. Findings per repository

### 4.1 D3 (github.com/d3/d3)
- **Identity:** official, ISC license, active repository (last push 2026-05-28). **Last release is 7.9.0 on 2024-03-12.** Release cadence is slow but the library is mature and the modules are stable. (VERIFIED)
- **Capabilities:** `d3` is a bundle of 30 modules (VERIFIED from `package.json`): `d3-scale`, `d3-shape` (lines, areas, curves/splines, arcs), `d3-interpolate`, `d3-ease`, `d3-contour`, `d3-delaunay`, `d3-force`, `d3-quadtree`, `d3-random`, `d3-path`, `d3-timer` and others. It does **not** include a 3D force engine (that is `d3-force-3d`, a separate package, v3.0.6).
- **Rendering:** none of its own. `d3-shape` and `d3-path` can write to a Canvas 2D context, which is how this project would use them. (INFERRED from the API design that `d3-shape` accepts a context)
- **Motion Lab fit:** Sonar Lab (scales, axes math, curve interpolation for oscilloscope and spectral traces), Squall (`d3-contour` could produce true isobars from the pressure field; today they are hand-made wobbly rings, so this is a possible refinement, not a gap), Constellation (`d3-delaunay` for neighbour links instead of index neighbours, `d3-force` for relaxed layouts), Nebula (`d3-contour` for iso-density shapes).
- **D3 vs custom SVG/Canvas:** the project already has its own interpolation, spring and noise math and does not need D3 for those. D3's value is the *specific* algorithms that are tedious to write (marching squares, Delaunay, spline curve factories, nice-tick scales). Take those modules; skip selections, transitions and the umbrella bundle (273 KB raw / 90 KB gz as one file).
- **Cost:** Low. **Recommendation: adopt later, per module, when a concrete experience needs one.** (PROPOSED)

### 4.2 Mermaid (github.com/mermaid-js/mermaid)
- **Identity:** official, MIT, very active (push 2026-10-12; package 12.1.0 published 2026-10-02). (VERIFIED)
- **Capabilities:** text-defined diagrams. It carries `d3`, `cytoscape`, `elkjs`, `dagre-d3-es`, `katex`, `marked` and others as dependencies (VERIFIED), which explains the 5.4 MB raw / 1.5 MB gz single-file bundle.
- **Documentation role (strong):** a `stateDiagram-v2` of `rest -> build -> active -> settle`, and a flowchart of audio -> features -> pipeline -> consumers, would replace ASCII art in `DESIGN.md` and `pipeline/README.md`. (PROPOSED; the state diagram type itself is INFERRED from general knowledge, not re-read today)
- **Runtime role: none.** It renders static diagrams, asynchronously, into DOM nodes; it cannot be driven per frame, and it would add the largest bundle of the ten. A "scene-transition viewer" would be a custom renderer anyway (the scene states are just four values the pipeline already emits).
- **Cost:** low for documentation use (no dependency in `web_kit` needed; generate SVG at doc-build time or rely on a markdown viewer that renders Mermaid). **High and unjustified for runtime.**
- **Recommendation: documentation and development tooling only. Do not add to `web_kit`'s dependencies.**

### 4.3 Chart.js (github.com/chartjs/Chart.js)
- **Identity:** official, MIT, active (push 2026-10-04); latest release 4.5.1 on 2025-10-13. One dependency (`@kurkle/color`). (VERIFIED)
- **Real-time:** the official performance guide (VERIFIED) recommends pre-parsed data (`parsing: false`), decimation for line charts, and disabling animations to cut render passes. A per-frame `chart.update('none')` loop is therefore feasible (INFERRED); it is a chart redraw each frame (axes, grid, legend), not a lean oscilloscope.
- **Audio fit:** it can show a waveform or spectrum. But Sonar Lab's goal (oscilloscope, onset markers, telemetry) is better served by a bespoke canvas that draws straight from the frame, as `ForecastStrip` and the meters already do. Chart.js's default look is the conventional-dashboard look the brief wants to avoid.
- **Cost:** 68 KB gz (VERIFIED size). **Recommendation: reject for runtime.** Revisit only if a non-artistic analysis panel is ever required.

### 4.4 Apache ECharts (github.com/apache/echarts) and ECharts GL
- **Identity:** official, Apache-2.0 (needs NOTICE handling when redistributed; INFERRED), release 6.1.0 on 2026-05-19, very active. Dependencies: `zrender` 6.1.0, `tslib`. (VERIFIED)
- **Core vs GL (verified distinction):** the core `src/chart/` directory lists bar, boxplot, candlestick, chord, custom, effectScatter, funnel, gauge, graph, heatmap, line, lines, map, parallel, pictorialBar, pie, radar, sankey, scatter, sunburst, themeRiver, tree, treemap. **No surface, bar3D, scatter3D or globe in core.** Those come from the separate `echarts-gl` 2.1.0 package (peer `echarts ^5.1.2 || ^6.0.0`, depends on `claygl`), whose README states "3D plots, globe visualization and WebGL acceleration". (VERIFIED)
- **Rendering:** ZRender (Canvas or SVG) for core; WebGL via ClayGL for GL. (INFERRED for the Canvas/SVG pair)
- **Fit:** Spectrum Matrix could use `surface` from ECharts GL, but a terrain updated every frame from audio is not what a `setOption` data model is built for (INFERRED, not benchmarked). Size: 359 KB gz core + 170 KB gz GL, a second 3D engine (ClayGL) beside any Three.js choice.
- **ECharts vs Plotly:** ECharts has the lighter and more modular path (tree-shakeable imports), a richer interactive and `custom` series API, and a clean separation of 3D. Plotly has the larger scientific vocabulary but a much heavier bundle. For Motion Lab neither wins against a custom render, so the comparison matters only if a non-artistic scientific panel is added, where ECharts would be the lighter pick.
- **Recommendation: research reference. Reject for runtime now.**

### 4.5 XYFlow (github.com/xyflow/xyflow)
- **Identity:** official monorepo; `@xyflow/react` 12.12.0 (published 2026-09-24), MIT, very active. Dependencies `@xyflow/system`, `zustand`, `classcat`; peers `react >=17`. Also ships `@xyflow/svelte`. (VERIFIED)
- **Capabilities:** node/edge canvas with custom React nodes, handles, pan/zoom, minimap, controls. (INFERRED from its documented purpose; I did not re-read the docs today)
- **Fit:** the project's mapping is currently authored as YAML profiles and rules (`configs/visual_profiles/*.yaml`, `visual_mapping/profile.py`). A node editor for "feature -> transform -> channel -> effect" would be a new product surface. It is React-native, small (57 KB gz UMD, VERIFIED size) and is the only one of the ten that addresses an authoring gap.
- **Custom node editor vs XYFlow:** writing pan/zoom, edge routing, selection, handle hit-testing and accessibility yourself is weeks of work; XYFlow removes it. The risk is the data model: the editor needs a serializable mapping graph, which is a design task in the Python/JSON schema side, not a library task.
- **Audio-reactivity:** not for per-frame animation (React-state model). Live "signal flowing along the edge" can be done with refs and CSS variables from `useAudioFrame`, without re-rendering nodes. (PROPOSED)
- **Cost:** medium, mostly design work. **Recommendation: reserve for a future workflow editor; prototype only once a mapping-graph format is specified.**

### 4.6 Plotly.js (github.com/plotly/plotly.js)
- **Identity:** official, MIT, version 4.1.2 (2026-10-05), very active. Dependencies include `regl`-based WebGL packages, `maplibre-gl`, older `d3` forks, turf and others (VERIFIED). `react-plotly.js` 4.1.0 (peers React 18/19, `plotly.js >=3`).
- **Capabilities:** README states "statistical charts, 3D graphs, scientific charts, SVG and tile maps, financial charts". (VERIFIED) It also states that several WebGL graphs on one page may need `virtual-webgl`, which means **multiple WebGL plots per page hit context limits**. (VERIFIED)
- **Size:** full bundle `plotly.min.js` is 4.7 MB raw / 1.4 MB gz; `plotly-basic.min.js` is 1.2 MB raw / 388 KB gz. Which traces the basic bundle contains was not checked (see `dist/README.md`); 3D surface almost certainly is not in it (INFERRED). Custom bundles are supported (`CUSTOM_BUNDLE.md`, VERIFIED reference).
- **Fit for Spectrum Matrix:** a quick way to see a surface, but with a plot-library styling, a re-tessellate-per-update model, and a size that would be the largest runtime asset in the project by far. Does not justify the cost. (INFERRED about update performance; not measured)
- **Recommendation: reject for runtime. Use as a throwaway notebook-style inspection tool at most.**

### 4.7 Nivo (github.com/plouc/nivo)
- **Identity:** official, MIT. **Latest release 0.99.0 on 2025-05-23**, repo push 2026-07-21: maintained at a slower pace than the others. (VERIFIED)
- **Capabilities:** React components over D3 modules; SVG, HTML and Canvas variants; animation through `@react-spring/web`; peers React 16-19. (VERIFIED from manifests; variants INFERRED)
- **Fit:** its animation is React-state/spring driven, which conflicts directly with the "no React render per frame" rule in `DESIGN.md` section 6. Everything it draws, the project can already draw with its own canvases or can build from D3 modules without the framework.
- **Recommendation: reject.** Nothing necessary that the current stack cannot do.

### 4.8 AntV G6 (github.com/antvis/G6)
- **Identity:** official, MIT, branch `v5`, `@antv/g6` 5.1.1 (2026-05-08), very active (push 2026-10-10). (VERIFIED)
- **Rendering, verified precisely:** the README states it renders in "Canvas, SVG, and WebGL" through the AntV **G** rendering engine and offers plugin packages for 3D. Only `@antv/g-canvas` is a hard dependency of `@antv/g6`. SVG, WebGL and WebGPU come from separate packages: `@antv/g-webgl` and `@antv/g-webgpu` both exist at 2.1.2 (published 2026-10-10), but **I did not verify that G6 5.1.1 works with the WebGPU package** (UNKNOWN). 3D is `@antv/g6-extension-3d` **0.1.23** (pre-1.0; peers `@antv/g6 ^5.1.0`, `@antv/g ^6.1.2`, `@antv/g-canvas`). React nodes come from `@antv/g6-extension-react` 0.2.7 (peer React >=16.8).
- **Capabilities:** more than 10 layouts, "some GPU and Rust parallel", behaviors, animation, themes, plugins. (VERIFIED from README)
- **Fit:** Constellation-like network scenes in an application style (graph analytics). Heavy for the purpose (380 KB gz), a large dependency tree on the AntV G stack, and 3D is at 0.1.x.
- **Recommendation: research reference.**

### 4.9 Cytoscape.js (github.com/cytoscape/cytoscape.js)
- **Identity:** official, MIT, 3.34.3 (2026-09-07), active; default branch `unstable`. Zero dependencies. (VERIFIED)
- **Strengths:** a graph-theory model that also runs headless in Node (README: "server-side analysis in a Node.js app", VERIFIED), stylesheet-driven rendering, a very large extension ecosystem (INFERRED), and stable API. Layout algorithms beyond the built-ins are external extensions (Mermaid pulls in `cytoscape-fcose` and `cytoscape-cose-bilkent`, which shows the pattern; VERIFIED).
- **Rendering:** Canvas renderer. **The source has an opt-in WebGL layer**: `src/extensions/renderer/canvas/webgl/` exists and `options.webgl` creates a `webgl2` canvas layer (VERIFIED in source). I could not find it described in the official docs source, so its support status and maturity are UNKNOWN.
- **Cytoscape vs G6 (not interchangeable):** Cytoscape is a graph-theory and analysis model first and a renderer second, small, dependency-free, no 3D. G6 is a rendering-and-interaction framework first, with built-in layouts, animation, React nodes and a young 3D extension, on a much larger stack. For a 2D constellation: Cytoscape is the lighter and more predictable pick; G6 has more built-in motion. For anything 3D: neither; see 3D Force Graph.
- **Recommendation: research reference.** Possible niche: offline analysis of song structure as a graph (sections, transitions), which would be done in Python anyway.

### 4.10 3D Force Graph (github.com/vasturiano/3d-force-graph)
- **Identity:** official, MIT, npm 1.80.1 (2026-09-29), active (push 2026-09-29). No GitHub Releases are published. Dependencies: `three` (>=0.179 <1), `three-forcegraph`, `three-render-objects`, `kapsule`. Latest `three` on npm is 0.186.1. (VERIFIED)
- **Capabilities (README, VERIFIED):** Three.js/WebGL rendering; `d3-force-3d` **or** `ngraph` as the physics engine; camera control choice (trackball/orbit/fly); `nodeThreeObject` and `nodePositionUpdate`/`linkPositionUpdate` callbacks for custom per-frame objects; curved links; `linkDirectionalParticles`, `linkDirectionalParticleSpeed`, and an "emit link particles on demand" example; VR and AR sibling projects; a ~4k-element example.
- **Audio fit:** high. Onsets -> `emitParticle(link)`, bass -> node scale via `nodeThreeObject`, band energy -> `d3-force` strength, and `pauseAnimation`/`resumeAnimation`-style control. (the exact method names beyond the ones in the README table are INFERRED)
- **Relationship to Three.js:** 3D Force Graph is a Kapsule wrapper over `three-forcegraph` (the graph as a `THREE.Object3D`, peer `three >=0.118.3`, VERIFIED) and `three-render-objects` (the renderer/camera/controls loop). **If a custom Three.js scene is built for Accretion or Nebula anyway, `three-forcegraph` can be embedded in it, and the full `3d-force-graph` wrapper would then be redundant.** A custom Three.js implementation gives full control of the render loop, post-processing, shaders and reduced-motion handling; the force graph gives layout, picking, link rendering and particles for free. Writing the force layout yourself is unnecessary because `d3-force-3d` is available on its own.
- **Costs:** adds `three` (~87 KB gz for the module; sizes of the core split in recent `three` versions were not measured), a second animation loop to reconcile with `useAudioFrame` (the library owns its loop unless a scene-embedded `three-forcegraph` is used), WebGL context-loss handling, and a new "3D" subsystem the project does not have. Medium.
- **Recommendation: prototype, via `three-forcegraph`, as a disposable Constellation-variant spike.**

---

## 5. Overlap and alternatives analysis

| Comparison | Conclusion | Label |
|---|---|---|
| **D3 vs custom SVG/Canvas** | Complementary. Keep custom Canvas rendering; take D3's algorithm modules (contour, Delaunay, shape curves, scales, force) where hand-writing costs more than the dependency. Do not take the umbrella `d3`. | PROPOSED |
| **Chart.js vs existing stack** | Chart.js duplicates meters and traces the project draws itself, in a generic style. No adoption. | PROPOSED |
| **ECharts vs Plotly.js** | Same job (interactive scientific charts) so adopting both is pure duplication. ECharts is lighter and modular, with 3D isolated in `echarts-gl`; Plotly is heavier with a bigger scientific vocabulary. Neither beats a custom render for an audio-driven terrain. If one is ever needed for analysis panels, ECharts. | PROPOSED |
| **G6 vs Cytoscape.js** | Not interchangeable (see 4.9). Adopting both is duplication. At most one as a 2D reference. | VERIFIED differences, PROPOSED choice |
| **3D Force Graph vs custom Three.js** | Complementary at the `three-forcegraph` level; redundant at the `3d-force-graph` level once a Three.js scene exists. | PROPOSED |
| **XYFlow vs custom node editor** | XYFlow, if and when an editor exists. A custom editor is only justified if the editor must be canvas-rendered inside a 3D scene, which is unlikely. | PROPOSED |
| **Mermaid vs runtime visualization** | Different jobs. Mermaid documents the system; it should not visualize it live. | PROPOSED |
| **D3 + 3D Force Graph + G6 + Cytoscape + Mermaid** | They overlap through D3: Mermaid, Nivo, Plotly (forks) and 3D Force Graph (via `d3-force-3d`) all embed D3 modules. Choosing D3 micro-modules plus one Three.js path avoids pulling several copies of D3 into the bundle. | VERIFIED dependencies, PROPOSED conclusion |

---

## 6. Fit for the candidate experiences

| Experience | Does any of the ten materially improve it? |
|---|---|
| **Squall** | No library needed. Optional: `d3-contour` for physically derived isobars. Weather map is Canvas 2D by design (DESIGN.md section 8). |
| **Constellation** | 3D Force Graph (`three-forcegraph`) would turn it from an index-linked sphere into a relational graph with 3D navigation and link particles: a different character, so a variant, not an upgrade. `d3-delaunay`/`d3-force` give a cheap 2D relational variant in the existing Canvas. |
| **Accretion** | None. Needs a custom 3D/shader layer (disk, jets, lensing look). |
| **Spectrum Matrix** | ECharts GL `surface` or Plotly `surface` would show a terrain, but with chart-library styling and an update model not built for 60 fps. A custom Three.js heightfield driven by the frame's band data (or a spectrogram texture) is the better route. |
| **Sonar Lab** | D3 modules (scales, `d3-shape`) for traces and axes on a custom canvas. Chart.js would work but looks like a dashboard. |
| **Nebula Fluid** | None. Needs fragment-shader noise or GPU simulation; no library here provides it. |

---

## 7. Shortlist and groupings

**Top three candidates for further investigation (by value to Motion Lab):**
1. D3 micro-modules (cheap, fits the existing Canvas approach).
2. `three-forcegraph` / 3D Force Graph (the only item that adds a 3D capability and has strong audio hooks).
3. XYFlow (only when a mapping editor is scoped).

**Already handled adequately by the existing project:** audio feature extraction and normalization, live/offline parity, latency compensation, particle fields (Squall), the Constellation sphere, meters and the forecast strip, scene-state handling, reduced-motion and flash-safety rules, test coverage of pure modules.

**Would require a new dependency or rendering subsystem:** any 3D scene (Three.js or equivalent, not in the list), 3D force graphs, node editors (XYFlow), true contours/Delaunay (D3 modules).

**Interesting but record only, do not implement now:** Cytoscape's opt-in WebGL layer and headless graph algorithms; G6's layouts and 3D extension (once past 0.1.x); ECharts GL for non-artistic scientific panels; Mermaid for generated architecture docs; `react-force-graph-3d` as a wrapper reference.

**Capability gaps none of the ten addresses:**
- A WebGL/WebGPU shader and post-processing layer (bloom, volumetrics, fluid).
- GPU particle systems (Squall is CPU, capped at about 6,000).
- Procedural noise / fluid simulation for Nebula Fluid.
- A frame-time measurement harness on real hardware (the stated 4 ms and 24 ms budgets are unverified).
- Offline capture/recording of visuals to video.
- A cross-experience layout and design-system layer (each experience has its own glass-panel UI).

---

## 8. Limitations of this research

- Nothing was installed, built or benchmarked. All performance statements are INFERRED from documentation and structure; sizes are file sizes of the libraries' own minified bundles (gzip level 9 by me), not application bundles.
- I read manifests and registry data for all ten, and READMEs/docs/source for Chart.js (performance guide), Plotly, G6, 3D Force Graph, ECharts GL, ECharts `src/chart` and Cytoscape's renderer source. For D3, Mermaid, Nivo and XYFlow I did **not** re-read documentation today; their feature descriptions rest on manifests plus general knowledge and are labeled INFERRED where they matter.
- Cytoscape's WebGL status, G6 + WebGPU compatibility, and Plotly basic-bundle trace contents are UNKNOWN.
- The Next.js version and configuration are UNKNOWN because the target app (`353-curiosity`) is not present here.
- I did not run the existing test suites.

---

## 9. Confirmation of changes

- **Application files changed:** none.
- **Dependencies / `package.json` / lockfiles:** unchanged; nothing installed.
- **`DESIGN.md`, schemas, configs, source, tests:** unchanged.
- **Architecture:** unchanged.
- **Created:** this report and its folder `web_kit/research/` only. Network calls were read-only (GitHub API, npm registry, jsDelivr, raw GitHub files). A scratch file was written to `/tmp` outside the project.
- No commit, push, deployment or publish (the project is not a git repository).

## 10. Suggested next steps (not executed)

1. Decide the 3D question first: whether Accretion, Spectrum Matrix and Nebula Fluid are real goals. If yes, scope a Three.js (or alternative) renderer behind the existing `useAudioFrame` contract before evaluating any more libraries.
2. If a Constellation relational variant is wanted, run a 1-2 hour spike with `three-forcegraph` in a scratch folder (separate `package.json`), measuring frame time and context-loss behavior.
3. When Sonar Lab is specified, pull in only the D3 modules it needs.
4. Fix the repo hygiene found while inspecting: declare esbuild/tailwindcss/playwright-core in `web_kit/package.json`; fill in the empty Squall verification section and remove the stale `engine.ts` reference in `DESIGN.md`; repair the mojibake in the Constellation section; record real frame-time measurements.
5. Optionally write the scene state machine and pipeline diagrams in Mermaid syntax inside docs (no dependency added).
6. Revisit XYFlow only after a serializable mapping-graph format is drafted.
