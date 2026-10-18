import { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import * as THREE from "three";

import Accretion from "@/components/accretion/Accretion";
import type { AccretionDebug } from "@/components/accretion/AccretionCanvas";
import { sceneStats } from "@/lib/accretion/scene";
import { hostStats } from "@/lib/gl/host";
import { AudioPipeline, createSyntheticSource } from "@/lib/pipeline";

// Preview harness for Accretion. It owns the pipeline so a browser script can drive the source, and exposes
// window.__accretion with read-only diagnostics: pixel sampling, synchronous GPU timing, frame timing, GPU memory.
// Query: ?source=demo starts the synthetic demo.

const pipeline = new AudioPipeline();
const debugRef: { current: AccretionDebug | null } = { current: null };
/** Frame count at the last mark(), so timing can exclude start-up (shader compilation) and earlier phases. */
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
  return <div className="mx-auto max-w-7xl px-4 py-4">{mounted && <Accretion pipeline={pipeline} debugRef={debugRef} />}</div>;
}

const stats = (xs: number[]) => {
  const s = xs.filter((x) => Number.isFinite(x) && x > 0).sort((a, b) => a - b);
  if (!s.length) return null;
  const q = (p: number) => s[Math.min(s.length - 1, Math.floor(p * s.length))];
  return { n: s.length, median: q(0.5), p95: q(0.95), p99: q(0.99), max: s[s.length - 1], over33: s.filter((x) => x > 33.4).length / s.length };
};

/** Renders one frame synchronously and reads the whole drawing buffer back, then measures regions of the picture. */
function sample() {
  const d = debugRef.current;
  const r = d?.host.three;
  if (!d || !r) return null;
  d.host.render(d.scene.scene, d.scene.camera);
  const gl = r.getContext();
  const w = gl.drawingBufferWidth;
  const h = gl.drawingBufferHeight;
  const px = new Uint8Array(w * h * 4);
  gl.readPixels(0, 0, w, h, gl.RGBA, gl.UNSIGNED_BYTE, px);
  const cam = d.scene.camera;
  cam.updateMatrixWorld();
  const c = new THREE.Vector3(0, 0, 0).project(cam);
  const cx = (c.x * 0.5 + 0.5) * w;
  const cy = (c.y * 0.5 + 0.5) * h;
  const radius = 1 + 0.04 * d.anim.horizon;
  const right = new THREE.Vector3().setFromMatrixColumn(cam.matrixWorld, 0).multiplyScalar(radius).project(cam);
  const R = Math.abs(right.x - c.x) * 0.5 * w;
  const lum = (x: number, y: number) => {
    const xi = Math.round(x), yi = Math.round(y);
    if (xi < 0 || yi < 0 || xi >= w || yi >= h) return NaN;
    const i = (yi * w + xi) * 4;
    return (0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2]) / 255;
  };
  const mean = (pts: Array<[number, number]>) => {
    let s = 0, n = 0;
    for (const [x, y] of pts) { const v = lum(x, y); if (Number.isFinite(v)) { s += v; n++; } }
    return n ? s / n : NaN;
  };
  const centre: Array<[number, number]> = [];
  const ring: Array<[number, number]> = [];
  for (let k = 0; k < 64; k++) {
    const a = (Math.PI * (k + 0.5)) / 64; // upper half only: the front of the disk crosses the lower half
    for (const f of [0.15, 0.3, 0.45, 0.6]) centre.push([cx + Math.cos(a) * f * R, cy + Math.sin(a) * f * R]);
    for (const f of [1.02, 1.04, 1.06]) ring.push([cx + Math.cos(a) * f * R, cy + Math.sin(a) * f * R]);
  }
  const disk: Array<[number, number]> = [];
  for (let k = 0; k <= 40; k++) { const f = 2.2 + (k / 40) * 2.8; disk.push([cx + f * R, cy], [cx - f * R, cy]); }
  const jet: Array<[number, number]> = [];
  for (let k = 0; k <= 40; k++) { const f = 2 + (k / 40) * 4; jet.push([cx, cy + f * R], [cx + 0.1 * R, cy + f * R], [cx - 0.1 * R, cy + f * R]); }
  const bg: Array<[number, number]> = [];
  for (let k = 0; k < 20; k++) for (let m = 0; m < 20; m++) bg.push([k * w * 0.004, m * h * 0.004], [w - 1 - k * w * 0.004, h - 1 - m * h * 0.004]);
  return { w, h, cx, cy, R, centre: mean(centre), ring: mean(ring), disk: mean(disk), jet: mean(jet), background: mean(bg), anim: { ...d.anim }, params: d.lastParams };
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

(window as unknown as { __accretion: unknown }).__accretion = {
  pipeline,
  debug: () => debugRef.current,
  set: (v: boolean) => setMountedFn?.(v),
  demo: async () => {
    pipeline.setSource(createSyntheticSource(() => performance.now()));
    await pipeline.play();
    return pipeline.getState().source?.kind;
  },
  silence: () => pipeline.setSource(null),
  sample,
  gpuTime,
  mark: () => {
    markFrame = debugRef.current?.frames ?? 0;
    return markFrame;
  },
  /** Statistics over the frames since the last mark() (at most the ring size). */
  timing: () => {
    const d = debugRef.current;
    if (!d) return null;
    const ring = d.intervals.length;
    const n = Math.min(d.frames - markFrame, ring);
    const pick = (arr: Float64Array) => {
      const out: number[] = [];
      for (let k = d.frames - n; k < d.frames; k++) out.push(arr[k % ring]);
      return out;
    };
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
if (new URLSearchParams(location.search).get("source") === "demo") void (window as unknown as { __accretion: { demo: () => Promise<unknown> } }).__accretion.demo();
