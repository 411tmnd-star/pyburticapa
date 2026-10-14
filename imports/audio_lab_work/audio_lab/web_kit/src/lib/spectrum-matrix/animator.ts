import { follow } from "../audio/features";
import type { MatrixParams } from "./params";

/**
 * The stateful layer between the pure parameters (params.ts) and the terrain scene.
 *
 * Holds the smoothed envelopes, the ridge impulse, and the terrain's row history: a ring buffer of height rows injected at a
 * fixed cadence from an accumulated clock. Rows are injected from time, never from frames, so the same amount of terrain
 * scrolls past at 30, 60 or 144 frames per second. `stepMatrixAnim` updates one preallocated object in place and allocates
 * nothing. Deterministic: the same sequence of params and time steps always gives the same state and the same rows.
 *
 * Copied and adapted from the other scenes' animators. All constants are PROPOSED.
 */

export const COLS = 72;
export const ROWS = 56;
/** Rows injected per second at full motion. */
export const ROW_RATE = 14;
/** The most rows injected in one step, so a stalled tab cannot flood the buffer. */
export const MAX_ROWS_PER_STEP = 3;
export const ATTACK_S = 0.08;
export const RELEASE_S = 0.4;
export const REDUCED_ATTACK_S = 0.35;
/** Ridge impulse decay time constant. */
export const RIDGE_DECAY_S = 0.3;
export const MAX_DT_S = 0.05;
/** Height of a ridge (0..1 of the maximum height) at full strength. */
export const RIDGE_HEIGHT = 0.85;
/** Terrain height at rest: a gentle undulation so the grid is visible in silence. */
export const REST_UNDULATION = 0.07;
/** How much the three lobes can raise the terrain (0..1 of the maximum height). */
export const LOBE_GAIN = 0.95;
/** Lobe centres and widths across the width of the terrain, in -1..1. Stylised ordering: bass, mid, high. */
export const LOBES = [
  { centre: -0.55, width: 0.30 },
  { centre: 0.0, width: 0.34 },
  { centre: 0.55, width: 0.26 },
] as const;

export interface MatrixAnim {
  time: number;
  bass: number;
  mid: number;
  high: number;
  colour: number;
  exposure: number;
  glow: number;
  sceneLevel: number;
  motion: number;
  /** Camera drift is not used; the terrain scrolls instead. Accumulated scroll in rows (injected rows plus the fraction). */
  scroll: number;
  /** Fraction of a row scrolled since the last injection, 0..1. The scene slides the mesh by this much. */
  frac: number;
  /** Ridge impulse, 0..1, decaying. */
  ridge: number;
  /** The scroll clock in whole rows: the seed of the next row's texture. It equals the rows injected, except that rows a stalled clock skipped are counted but not injected. */
  serial: number;
  /** Index in `rows` of the newest row. Older rows follow at lower indices, wrapping. */
  head: number;
  /** Height rows, ROWS x COLS, each value 0..1. */
  rows: Float32Array;
}

export function createMatrixAnim(): MatrixAnim {
  const a: MatrixAnim = {
    time: 0, bass: 0, mid: 0, high: 0, colour: 0, exposure: 0, glow: 0, sceneLevel: 0, motion: 0.25,
    scroll: 0, frac: 0, ridge: 0, serial: 0, head: ROWS - 1, rows: new Float32Array(ROWS * COLS),
  };
  // Start from the resting undulation (silent envelopes), not a flat sheet. Row index i is `ROWS - 1 - i` rows old.
  for (let i = 0; i < ROWS; i++) fillRow(a.rows, i * COLS, a, -(ROWS - 1 - i));
  return a;
}

const finite01 = (x: number) => (Number.isFinite(x) ? Math.min(1, Math.max(0, x)) : 0);
const env = (prev: number, target: number, dt: number, attack: number) => finite01(follow(prev, finite01(target), dt, attack, RELEASE_S));

/** Deterministic hash and smooth value noise in 0..1 (a CPU copy of the shader noise idea), so a given row always looks the same. */
function hash(x: number, y: number): number {
  let h = (Math.imul(x | 0, 374761393) + Math.imul(y | 0, 668265263)) | 0;
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}
function vnoise(x: number, y: number): number {
  const xi = Math.floor(x), yi = Math.floor(y);
  const fx = x - xi, fy = y - yi;
  const u = fx * fx * (3 - 2 * fx), v = fy * fy * (3 - 2 * fy);
  const a = hash(xi, yi), b = hash(xi + 1, yi), c = hash(xi, yi + 1), d = hash(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}
const lobe = (x: number, centre: number, width: number) => Math.exp(-(((x - centre) / width) ** 2));

/** Writes one terrain row for the current envelopes into `out` at `offset`. Heights stay within 0..1. */
export function fillRow(out: Float32Array, offset: number, a: MatrixAnim, serial: number): void {
  const t = serial * 0.23;
  const gain = 0.55 + 0.45 * a.exposure;
  for (let c = 0; c < COLS; c++) {
    const x = (c / (COLS - 1)) * 2 - 1;
    const texture = 0.30 + 0.70 * vnoise(c * 0.45, t);
    const rough = 0.6 + 0.4 * vnoise(c * 0.9 + 17.3, t * 1.7 + 5.1);
    const bands = a.bass * lobe(x, LOBES[0].centre, LOBES[0].width) + a.mid * lobe(x, LOBES[1].centre, LOBES[1].width) + a.high * rough * lobe(x, LOBES[2].centre, LOBES[2].width);
    const rest = REST_UNDULATION * (0.5 + 0.5 * vnoise(c * 0.3 + 3.7, t * 0.6));
    const ridge = a.ridge * RIDGE_HEIGHT * (0.8 + 0.2 * vnoise(c * 0.6 + 9.1, t));
    const h = rest + LOBE_GAIN * gain * bands * texture + ridge;
    out[offset + c] = h >= 1 ? 1 : h > 0 ? h : 0;
  }
}

/** Row `age` rows older than the newest (0 is the newest). */
export function rowOffset(a: MatrixAnim, age: number): number {
  return ((a.head - age + ROWS * 4) % ROWS) * COLS;
}

/**
 * Advances the animation by `dtS` seconds towards the given parameters and returns the same object.
 * Invalid or negative steps advance nothing; steps longer than MAX_DT_S are shortened.
 */
export function stepMatrixAnim(a: MatrixAnim, p: MatrixParams, dtS: number, reduced: boolean): MatrixAnim {
  const dt = Number.isFinite(dtS) && dtS > 0 ? Math.min(dtS, MAX_DT_S) : 0;
  if (dt === 0) return a;
  a.time += dt;

  const att = reduced ? REDUCED_ATTACK_S : ATTACK_S;
  a.bass = env(a.bass, p.bass, dt, att);
  a.mid = env(a.mid, p.mid, dt, att);
  a.high = env(a.high, p.high, dt, att);
  a.colour = env(a.colour, p.colour, dt, att);
  a.exposure = env(a.exposure, p.exposure, dt, att);
  a.glow = env(a.glow, p.glow, dt, att);
  a.sceneLevel = env(a.sceneLevel, p.sceneLevel, dt, att);
  a.motion = env(a.motion, p.motion, dt, att);

  // Ridge: an impulse that decays, retriggered by a stronger hit. Never above the strongest input.
  a.ridge = Math.max(a.ridge * Math.exp(-dt / RIDGE_DECAY_S), finite01(p.ridge));

  // Scroll: the clock advances with the smoothed motion; whole rows are injected as it crosses integers.
  a.scroll += dt * ROW_RATE * a.motion;
  let due = Math.floor(a.scroll) - a.serial;
  if (due > MAX_ROWS_PER_STEP) { a.serial = Math.floor(a.scroll) - MAX_ROWS_PER_STEP; due = MAX_ROWS_PER_STEP; }
  for (let i = 0; i < due; i++) {
    a.serial++;
    a.head = (a.head + 1) % ROWS;
    fillRow(a.rows, a.head * COLS, a, a.serial);
  }
  a.frac = a.scroll - Math.floor(a.scroll);
  return a;
}
