import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import * as THREE from "three";

import SpectrumMatrix from "@/components/spectrum-matrix/SpectrumMatrix";
import type { MatrixDebug } from "@/components/spectrum-matrix/SpectrumMatrixCanvas";
import { COLS, ROWS, rowOffset } from "@/lib/spectrum-matrix/animator";
import { Z_FAR, SPACING, sceneStats } from "@/lib/spectrum-matrix/scene";
import { hostStats } from "@/lib/gl/host";
import { AudioPipeline, createSyntheticSource } from "@/lib/pipeline";
import type { AudioFeatureFrame } from "@/lib/pipeline/contract";
import type { FeatureSource } from "@/lib/pipeline/source";

// Preview harness for Spectrum Matrix. It owns the pipeline so a browser script can drive the source, and exposes
// window.__matrix with read-only diagnostics (pixel sampling by lobe strip, synchronous GPU timing, frame timing, GPU memory,
// framing) plus a scripted SYNTHETIC source for controlled tests. Query: ?source=demo starts the 120 BPM synthetic demo.

const pipeline = new AudioPipeline();
const debugRef: { current: MatrixDebug | null } = { current: null };
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
  return <div className="mx-auto max-w-7xl px-4 py-4">{mounted && <SpectrumMatrix pipeline={pipeline} debugRef={debugRef} />}</div>;
}

const stats = (xs: number[]) => {
  const s = xs.filter((x) => Number.isFinite(x) && x > 0).sort((a, b) => a - b);
  if (!s.length) return null;
  const q = (p: number) => s[Math.min(s.length - 1, Math.floor(p * s.length))];
  return { n: s.length, median: q(0.5), p95: q(0.95), p99: q(0.99), max: s[s.length - 1], over33: s.filter((x) => x > 33.4).length / s.length };
};

/** A scripted, constant-or-event input. Always labelled synthetic. Frames pass through the same pipeline as any source. */
const ctl = { bass: 0, mid: 0, high: 0, rms: 0, onset: 0, scene: "rest" as AudioFeatureFrame["currentSceneState"], hitAt: -1e9, hitLevel: 0 };
const scripted: FeatureSource = {
  id: "matrix-script", kind: "synthetic", label: "Scripted input (synthetic)", canSeek: false, latencyMs: 0,
  sample(nowS) {
    const hit = ctl.hitLevel * Math.exp(-Math.max(0, nowS - ctl.hitAt) / 0.15); // the contract's bassHit: instant attack, 150 ms decay
    return Object.freeze({ time: nowS, progress: 0, isPlaying: true, bass: Math.min(1, ctl.bass + 0.5 * hit), mid: ctl.mid, high: ctl.high, rmsEnergy: ctl.rms,
      onsetStrength: ctl.onset, beatDetected: false, currentSceneState: ctl.scene, bassHit: hit });
  },
  play: () => Promise.resolve(), pause() {}, seek() {}, status: () => ({ playing: true, duration: null, error: null }), onStatus: () => () => {}, dispose() {},
};

/** Projects a world point through the live camera into drawing-buffer pixels (y up) for a buffer of w x h. */
function project(cam: THREE.Camera, v: THREE.Vector3, w: number, h: number) {
  const p = v.clone().project(cam);
  return { x: (p.x * 0.5 + 0.5) * w, y: (p.y * 0.5 + 0.5) * h, ndcX: p.x, ndcY: p.y };
}

/** Renders one frame synchronously, reads the whole drawing buffer back, and measures the three lobe strips and the background. */
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
  const zMid = d.scene.rowZ(ROWS / 2, d.anim.frac);
  const xs = d.scene.lobeCentresX();
  const lum = (i: number) => (0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2]) / 255;
  const strip = (cx: number) => {
    const half = Math.max(4, w * 0.06);
    let s = 0, n = 0, mx = 0;
    for (let y = Math.floor(h * 0.12); y < Math.floor(h * 0.82); y++) for (let x = Math.max(0, Math.floor(cx - half)); x < Math.min(w, Math.ceil(cx + half)); x++) { const v = lum((y * w + x) * 4); s += v; n++; if (v > mx) mx = v; }
    return { mean: n ? s / n : NaN, max: mx };
  };
  const strips = xs.map((x) => strip(project(cam, new THREE.Vector3(x, 0.5, zMid), w, h).x));
  let bgS = 0, bgN = 0;
  for (let k = 0; k < 20; k++) for (let m = 0; m < 6; m++) { bgS += lum(((h - 1 - m * Math.floor(h * 0.004)) * w + k * Math.floor(w * 0.004)) * 4) + lum(((h - 1 - m * Math.floor(h * 0.004)) * w + (w - 1 - k * Math.floor(w * 0.004))) * 4); bgN += 2; }
  let total = 0;
  for (let i = 0; i < px.length; i += 16) total += lum(i);
  return { w, h, left: strips[0].mean, centre: strips[1].mean, right: strips[2].mean, leftMax: strips[0].max, centreMax: strips[1].max, rightMax: strips[2].max, background: bgS / bgN, frameMean: total / (px.length / 16), anim: { ...d.anim, rows: undefined }, params: d.lastParams };
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

/** Projects the three lobe centres at the terrain's mid depth through the live camera: are they inside the canvas? */
function fits() {
  const d = debugRef.current;
  if (!d) return null;
  const cam = d.scene.camera;
  d.scene.update(d.anim, { azimuth: 0, elevation: 0 });
  cam.updateMatrixWorld();
  const zMid = d.scene.rowZ(ROWS / 2, d.anim.frac);
  const pts = d.scene.lobeCentresX().map((x) => project(cam, new THREE.Vector3(x, 0.5, zMid), 1, 1));
  return { maxAbsX: Math.max(...pts.map((p) => Math.abs(p.ndcX))), ndcX: pts.map((p) => p.ndcX), distance: d.scene.distance, aspect: cam.aspect, zFar: Z_FAR, spacing: SPACING };
}

/** The tallest and the lowest value in the newest row, and the tallest in the whole buffer: how high a ridge or lobe has actually been injected. */
function heights() {
  const d = debugRef.current;
  if (!d) return null;
  const a = d.anim;
  const off = rowOffset(a, 0);
  let newest = 0, newestMin = 1, all = 0;
  for (let c = 0; c < COLS; c++) { newest = Math.max(newest, a.rows[off + c]); newestMin = Math.min(newestMin, a.rows[off + c]); }
  for (let i = 0; i < a.rows.length; i++) all = Math.max(all, a.rows[i]);
  return { newest, newestMin, all, serial: a.serial };
}

(window as unknown as { __matrix: unknown }).__matrix = {
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
  sample,
  gpuTime,
  fits,
  heights,
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
if (new URLSearchParams(location.search).get("source") === "demo") void (window as unknown as { __matrix: { demo: () => Promise<unknown> } }).__matrix.demo();
