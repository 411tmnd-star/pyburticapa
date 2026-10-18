import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import * as THREE from "three";

import ConstellationCore from "@/components/constellation-core/ConstellationCore";
import type { CoreDebug } from "@/components/constellation-core/ConstellationCoreCanvas";
import { RING_RADII, sceneStats } from "@/lib/constellation-core/scene";
import { hostStats } from "@/lib/gl/host";
import { AudioPipeline, createSyntheticSource } from "@/lib/pipeline";
import type { AudioFeatureFrame } from "@/lib/pipeline/contract";
import type { FeatureSource } from "@/lib/pipeline/source";

// Preview harness for Constellation Core. It owns the pipeline so a browser script can drive the source, and exposes
// window.__core with read-only diagnostics (pixel sampling, synchronous GPU timing, frame timing, GPU memory, ring framing)
// plus a scripted SYNTHETIC source for controlled tests. Query: ?source=demo starts the 120 BPM synthetic demo.

const pipeline = new AudioPipeline();
const debugRef: { current: CoreDebug | null } = { current: null };
let markFrame = 0;
let setMountedFn: ((v: boolean) => void) | null = null;

function Harness() {
  const [mounted, setMounted] = useState(true);
  useEffect(() => {
    setMountedFn = setMounted;
    return () => {
      setMountedFn = null;
    };
  }, []);
  return <div className="mx-auto max-w-7xl px-4 py-4">{mounted && <ConstellationCore pipeline={pipeline} debugRef={debugRef} />}</div>;
}

const stats = (xs: number[]) => {
  const s = xs.filter((x) => Number.isFinite(x) && x > 0).sort((a, b) => a - b);
  if (!s.length) return null;
  const q = (p: number) => s[Math.min(s.length - 1, Math.floor(p * s.length))];
  return { n: s.length, median: q(0.5), p95: q(0.95), p99: q(0.99), max: s[s.length - 1], over33: s.filter((x) => x > 33.4).length / s.length };
};

/** A scripted, constant-or-event input. Always labelled synthetic. Frames pass through the same pipeline as any source. */
const ctl = { bass: 0, mid: 0, high: 0, rms: 0, onset: 0, onsetPeak: 0, scene: "rest" as AudioFeatureFrame["currentSceneState"], beatQ: 0, hitAt: -1e9, hitLevel: 0 };
const scripted: FeatureSource = {
  id: "core-script", kind: "synthetic", label: "Scripted input (synthetic)", canSeek: false, latencyMs: 0,
  sample(nowS) {
    const hit = ctl.hitLevel * Math.exp(-Math.max(0, nowS - ctl.hitAt) / 0.15); // the contract's bassHit: instant attack, 150 ms decay
    const beat = ctl.beatQ > 0;
    if (beat) ctl.beatQ--;
    return Object.freeze({ time: nowS, progress: 0, isPlaying: true, bass: Math.min(1, ctl.bass + 0.5 * hit), mid: ctl.mid, high: ctl.high, rmsEnergy: ctl.rms,
      onsetStrength: beat ? ctl.onsetPeak : ctl.onset, beatDetected: beat, currentSceneState: ctl.scene, bassHit: hit });
  },
  play: () => Promise.resolve(), pause() {}, seek() {}, status: () => ({ playing: true, duration: null, error: null }), onStatus: () => () => {}, dispose() {},
};

/** Renders one frame synchronously, reads the whole drawing buffer back, and measures regions of the picture. */
function sample() {
  const d = debugRef.current;
  const r = d?.host.three;
  if (!d || !r) return null;
  d.host.render(d.scene.scene, d.scene.camera);
  const gl = r.getContext();
  const w = gl.drawingBufferWidth, h = gl.drawingBufferHeight;
  const px = new Uint8Array(w * h * 4);
  gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, px);
  const cam = d.scene.camera;
  cam.updateMatrixWorld();
  const c = new THREE.Vector3(0, 0, 0).project(cam);
  const cx = (c.x * 0.5 + 0.5) * w, cy = (c.y * 0.5 + 0.5) * h;
  const radius = 1.5 * (1 + 0.04 * d.anim.swell);
  const right = new THREE.Vector3().setFromMatrixColumn(cam.matrixWorld, 0).multiplyScalar(radius).project(cam);
  const R = Math.abs(right.x - c.x) * 0.5 * w;
  const lum = (x: number, y: number) => {
    const xi = Math.round(x), yi = Math.round(y);
    if (xi < 0 || yi < 0 || xi >= w || yi >= h) return NaN;
    const i = (yi * w + xi) * 4;
    return (0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2]) / 255;
  };
  const mean = (pts: Array<[number, number]>) => { let s = 0, n = 0; for (const [x, y] of pts) { const v = lum(x, y); if (Number.isFinite(v)) { s += v; n++; } } return n ? s / n : NaN; };
  const centre: Array<[number, number]> = [];
  const edge: Array<[number, number]> = [];
  for (let k = 0; k < 64; k++) {
    const a = (Math.PI * 2 * k) / 64;
    for (const f of [0.1, 0.3, 0.5]) centre.push([cx + Math.cos(a) * f * R, cy + Math.sin(a) * f * R]);
    for (const f of [0.92, 0.96, 1.0, 1.04, 1.08]) edge.push([cx + Math.cos(a) * f * R, cy + Math.sin(a) * f * R]);
  }
  const beam: Array<[number, number]> = [];
  for (let k = 0; k <= 40; k++) { const f = 1.6 + (k / 40) * 3.4; beam.push([cx, cy + f * R], [cx + 0.03 * R, cy + f * R], [cx, cy - f * R]); }
  const bg: Array<[number, number]> = [];
  for (let k = 0; k < 20; k++) for (let m = 0; m < 20; m++) bg.push([k * w * 0.004, m * h * 0.004], [w - 1 - k * w * 0.004, h - 1 - m * h * 0.004]);
  let total = 0;
  for (let i = 0; i < px.length; i += 16) total += (0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2]) / 255;
  return { w, h, cx, cy, R, centre: mean(centre), edge: mean(edge), beam: mean(beam), background: mean(bg), frameMean: total / (px.length / 16), anim: { ...d.anim }, params: d.lastParams };
}

/**
 * Finds a rotation phase at which an orb passes in FRONT of the core, renders that frame synchronously and measures the orb's
 * disc: luminance at its centre, in a rim annulus, and the spread across the disc. Read-only apart from rendering one frame
 * (the animator's phase is restored). Used to compare orb shading before and after a change.
 */
function orbProbe(hold = false) {
  const d = debugRef.current;
  const r = d?.host.three;
  if (!d || !r) return null;
  const gl = r.getContext();
  const w = gl.drawingBufferWidth, h = gl.drawingBufferHeight;
  const cam = d.scene.camera;
  const orbs: THREE.Mesh[] = [];
  d.scene.rings.forEach((g) => g.children.forEach((c) => { const m = c as THREE.Mesh; if ((m.geometry as THREE.SphereGeometry).type === "SphereGeometry") orbs.push(m); }));
  const saved = d.anim.phase;
  const savedDrift = d.anim.drift;
  d.anim.drift = 0.3; // a fixed camera azimuth, so the probe gives the same geometry on every run
  const view = { azimuth: 0, elevation: 0 };
  const wp = new THREE.Vector3(), ndc = new THREE.Vector3(), right = new THREE.Vector3(), core = new THREE.Vector3(0, 0, 0);
  const geom = (phase: number) => {
    d.anim.phase = phase;
    d.scene.update(d.anim, view);
    cam.updateMatrixWorld(true);
    const dist = cam.position.length();
    const coreN = core.clone().project(cam);
    const rc = 1.5 * (1 + 0.04 * d.anim.swell);
    right.setFromMatrixColumn(cam.matrixWorld, 0);
    const coreR = Math.abs(core.clone().addScaledVector(right, rc).project(cam).x - coreN.x) * 0.5 * w;
    const out: Array<{ k: number; sx: number; sy: number; rPx: number; front: boolean; inside: boolean }> = [];
    orbs.forEach((m, k) => {
      m.updateWorldMatrix(true, false);
      wp.setFromMatrixPosition(m.matrixWorld);
      const depth = wp.distanceTo(cam.position);
      ndc.copy(wp).project(cam);
      const sx = (ndc.x * 0.5 + 0.5) * w, sy = (ndc.y * 0.5 + 0.5) * h;
      const rPx = Math.abs(wp.clone().addScaledVector(right, m.scale.x).project(cam).x - ndc.x) * 0.5 * w;
      const dx = sx - (coreN.x * 0.5 + 0.5) * w, dy = sy - (coreN.y * 0.5 + 0.5) * h;
      out.push({ k, sx, sy, rPx, front: depth < dist, inside: Math.hypot(dx, dy) + rPx * 0.5 < coreR * 0.9 });
    });
    return out;
  };
  let found: { ph: number; o: { k: number; sx: number; sy: number; rPx: number } } | null = null;
  for (let ph = 0; ph < 60 && !found; ph += 0.02) {
    const g = geom(ph).filter((o) => o.front && o.inside).sort((a, b) => b.rPx - a.rPx)[0];
    if (g) found = { ph, o: g };
  }
  if (!found) { d.anim.phase = saved; d.anim.drift = savedDrift; return { found: false }; }
  geom(found.ph);
  d.host.render(d.scene.scene, cam);
  const px = new Uint8Array(w * h * 4);
  gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, px);
  const lum = (x: number, y: number) => { const i = (Math.round(y) * w + Math.round(x)) * 4; return (0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2]) / 255; };
  const { sx, sy, rPx } = found.o;
  let cs = 0, cn = 0, rs = 0, rn = 0, mn = 1, mx = 0, cmn = 1, cmx = 0;
  for (let a = 0; a < 48; a++) {
    const t = (a / 48) * Math.PI * 2;
    for (const f of [0.1, 0.25, 0.4]) { const v = lum(sx + Math.cos(t) * f * rPx, sy + Math.sin(t) * f * rPx); cs += v; cn++; mn = Math.min(mn, v); mx = Math.max(mx, v); cmn = Math.min(cmn, v); cmx = Math.max(cmx, v); }
    for (const f of [0.8, 0.88, 0.95]) { const v = lum(sx + Math.cos(t) * f * rPx, sy + Math.sin(t) * f * rPx); rs += v; rn++; mn = Math.min(mn, v); mx = Math.max(mx, v); }
  }
  const centre = cs / cn, rim = rs / rn;
  const res = { found: true, phase: found.ph, orb: found.o.k, rPx, cssX: (sx / w) * (gl.canvas as HTMLCanvasElement).clientWidth, cssY: (1 - sy / h) * (gl.canvas as HTMLCanvasElement).clientHeight, centre, rim, interiorSpread: cmx - cmn, min: mn, max: mx, spread: mx - mn, rimToCentre: rim / Math.max(centre, 1e-3) };
  if (hold) { pipeline.stop(); } else { d.anim.phase = saved; d.anim.drift = savedDrift; }
  return res;
}

/** Synchronous GPU timing: draw then read one pixel, which waits for the GPU to finish. Includes the read stall. */
function gpuTime(n = 60) {
  const d = debugRef.current;
  const r = d?.host.three;
  if (!d || !r) return null;
  const gl = r.getContext();
  const one = new Uint8Array(4);
  const ts: number[] = [];
  for (let i = 0; i < n + 5; i++) {
    const t0 = performance.now();
    d.host.render(d.scene.scene, d.scene.camera);
    gl.readPixels(0, 0, 1, 1, gl.RGBA, gl.UNSIGNED_BYTE, one);
    if (i >= 5) ts.push(performance.now() - t0);
  }
  return { ...stats(ts), buffer: [gl.drawingBufferWidth, gl.drawingBufferHeight], pixelRatio: d.host.pixelRatioInUse };
}

/** Projects 128 points of every orbit ring through the live camera and reports how much falls outside the canvas (NDC beyond +-1). */
function fits() {
  const d = debugRef.current;
  if (!d) return null;
  const cam = d.scene.camera;
  d.scene.update(d.anim, { azimuth: 0, elevation: 0 });
  cam.updateMatrixWorld();
  const v = new THREE.Vector3();
  let maxAbsX = 0, maxAbsY = 0, outside = 0, n = 0;
  d.scene.rings.forEach((g, i) => {
    g.updateMatrixWorld(true);
    for (let k = 0; k < 128; k++) {
      const a = (k / 128) * Math.PI * 2;
      v.set(RING_RADII[i] * Math.cos(a), 0, -RING_RADII[i] * Math.sin(a));
      g.localToWorld(v);
      v.project(cam);
      maxAbsX = Math.max(maxAbsX, Math.abs(v.x));
      maxAbsY = Math.max(maxAbsY, Math.abs(v.y));
      if (Math.abs(v.x) > 1 || Math.abs(v.y) > 1) outside++;
      n++;
    }
  });
  return { maxAbsX, maxAbsY, outside, n, distance: d.scene.distance, aspect: cam.aspect };
}

(window as unknown as { __core: unknown }).__core = {
  pipeline,
  debug: () => debugRef.current,
  set: (v: boolean) => setMountedFn?.(v),
  demo: async () => {
    pipeline.setSource(createSyntheticSource(() => performance.now()));
    await pipeline.play();
    return pipeline.getState().source?.kind;
  },
  silence: () => pipeline.setSource(null),
  /** Switches to the scripted synthetic source with the given constant levels (bass, mid, high, rms, onset, scene). */
  script: async (o: Partial<typeof ctl>) => {
    Object.assign(ctl, o);
    if (pipeline.source !== scripted) pipeline.setSource(scripted);
    await pipeline.play();
    return pipeline.getState().source?.kind;
  },
  hit: (level = 1) => { ctl.hitLevel = level; ctl.hitAt = performance.now() / 1000; return performance.now(); },
  beat: (strength = 0.9) => { ctl.onsetPeak = strength; ctl.beatQ = 1; return performance.now(); },
  train: (n: number, ms: number, strength = 0.9) => { let k = 0; const id = setInterval(() => { ctl.onsetPeak = strength; ctl.beatQ = 1; if (++k >= n) clearInterval(id); }, ms); return performance.now(); },
  sample,
  gpuTime,
  fits,
  orbProbe,
  /** After orbProbe(true) froze the frame: restart the frame loop. */
  resume: () => pipeline.start(),
  mark: () => { markFrame = debugRef.current?.frames ?? 0; return markFrame; },
  /** Statistics over the frames since the last mark() (at most the ring size). */
  timing: () => {
    const d = debugRef.current;
    if (!d) return null;
    const ring = d.intervals.length;
    const n = Math.min(d.frames - markFrame, ring);
    const pick = (arr: Float64Array) => { const out: number[] = []; for (let k = d.frames - n; k < d.frames; k++) out.push(arr[k % ring]); return out; };
    return { frames: n, intervals: stats(pick(d.intervals)), cpu: stats(pick(d.cpu)) };
  },
  memory: () => {
    const r = debugRef.current?.host.three;
    return r ? { geometries: r.info.memory.geometries, textures: r.info.memory.textures, programs: r.info.programs?.length ?? null } : null;
  },
  sceneStats,
  hostStats,
};

createRoot(document.getElementById("root")!).render(<Harness />);
if (new URLSearchParams(location.search).get("source") === "demo") void (window as unknown as { __core: { demo: () => Promise<unknown> } }).__core.demo();
