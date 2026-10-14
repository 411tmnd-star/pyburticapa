import { clamp01 } from "../audio/features";
import type { VisualParams } from "./profiles";

/**
 * Node layout and projection. Pure maths: it writes into preallocated arrays, so there is no
 * allocation per frame.
 */

export interface Constellation {
  n: number;
  /** Unit-sphere positions (Fibonacci lattice). */
  ux: Float32Array;
  uy: Float32Array;
  uz: Float32Array;
  /** Stable per-node value in [0, 1), used to vary how far each node is pulled. */
  seed: Float32Array;
}

export interface Frame {
  x: Float32Array;
  y: Float32Array;
  depth: Float32Array;
  size: Float32Array;
  alpha: Float32Array;
}

export interface Pointer {
  x: number;
  y: number;
  radius: number;
  /** false pushes nodes away (hover); true pulls them in (drag). */
  attract: boolean;
}

export interface ProjectOptions {
  t: number;
  params: VisualParams;
  width: number;
  height: number;
  pointer: Pointer | null;
}

/** Deterministic pseudo-random value in [0, 1) from an integer and a salt. */
export function hash01(i: number, salt = 0): number {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

export function createConstellation(n: number): Constellation {
  const ux = new Float32Array(n);
  const uy = new Float32Array(n);
  const uz = new Float32Array(n);
  const seed = new Float32Array(n);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = n === 1 ? 0 : 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = i * golden;
    ux[i] = Math.cos(theta) * r;
    uy[i] = y;
    uz[i] = Math.sin(theta) * r;
    seed[i] = hash01(i, 1);
  }
  return { n, ux, uy, uz, seed };
}

export function createFrame(n: number): Frame {
  return {
    x: new Float32Array(n),
    y: new Float32Array(n),
    depth: new Float32Array(n),
    size: new Float32Array(n),
    alpha: new Float32Array(n),
  };
}

export function project(c: Constellation, out: Frame, o: ProjectOptions): void {
  const { t, params: p, width: w, height: h, pointer } = o;
  const cx = w / 2;
  const cy = h / 2;
  const R = Math.min(w, h) * 0.38 * (1 + p.swell * 0.12);
  const cyaw = Math.cos(t * p.spin);
  const syaw = Math.sin(t * p.spin);
  const pitch = 0.35 + p.tilt * 0.8;
  const cpitch = Math.cos(pitch);
  const spitch = Math.sin(pitch);
  const flicker = Math.floor(t * 12);

  for (let i = 0; i < c.n; i++) {
    // Bass pulls nodes inward; some nodes go deeper than others, which gives the cluster texture.
    const rEff = R * (1 - p.pull * 0.45 * (1 - 0.6 * c.seed[i]));
    const x = c.ux[i] * rEff;
    const y = c.uy[i] * rEff;
    const z = c.uz[i] * rEff;

    // Rotate around Y (spin), then around X (tilt).
    const x1 = x * cyaw + z * syaw;
    const z1 = -x * syaw + z * cyaw;
    const y2 = y * cpitch - z1 * spitch;
    const z2 = y * spitch + z1 * cpitch;

    const persp = 1 / (1 + z2 / (R * 3));
    const jx = p.jitter * Math.sin(t * 23 + i * 1.7);
    const jy = p.jitter * Math.cos(t * 19 + i * 2.3);
    let sx = cx + (x1 + jx) * persp;
    let sy = cy + (y2 + jy) * persp;

    if (pointer) {
      const dx = sx - pointer.x;
      const dy = sy - pointer.y;
      const d = Math.hypot(dx, dy);
      if (d < pointer.radius && d > 1e-3) {
        const push = (1 - d / pointer.radius) ** 2 * 70 * (pointer.attract ? -1 : 1);
        sx += (dx / d) * push;
        sy += (dy / d) * push;
      }
    }

    const depth = clamp01((z2 / R + 1) / 2);
    const sparkle = p.sparkle > 0 && hash01(i, flicker) < p.sparkle * 0.12 ? 1 : 0;
    out.x[i] = sx;
    out.y[i] = sy;
    out.depth[i] = depth;
    out.size[i] = (1.1 + 2.4 * depth) * (1 + 0.8 * sparkle + 0.6 * p.shock);
    // Nodes that the bass has pulled in brighten, so the pull is visible in the colour too.
    out.alpha[i] = Math.min(1, 0.18 + 0.7 * depth + 0.4 * sparkle + 0.35 * p.pull * depth);
  }
}
