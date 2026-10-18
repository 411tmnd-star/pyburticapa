/**
 * The wind field. Pure maths, no DOM, so it is unit-tested in Node.
 *
 * Coordinates are "units": 1 unit is the shorter side of the canvas. The domain is [0, width] x [0, height].
 * Velocities are units per second. Screen axes: x to the right, y down.
 *
 * wind = jet (divergence-free curl noise, driven by the mids)
 *      + sum of pressure systems (tangential swirl from the bass, radial inflow from the kicks)
 *      + pointer gusts (the user's drags)
 *      + a prevailing eastward drift (overall level)
 */

export interface Vortex {
  id: number;
  x: number;
  y: number;
  /** Core radius in units: the swirl is fastest here. */
  r: number;
  /** Relative strength, so seeded storms can differ a little. */
  weight: number;
}

export interface Gust {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
}

export interface FieldParams {
  /** Peak speed of the background jet, units/s. */
  jet: number;
  /** Peak tangential speed at a vortex core, units/s. */
  vortex: number;
  /** Peak radial inflow toward a vortex eye, units/s. */
  inflow: number;
  /** Uniform eastward drift, units/s. */
  prevailing: number;
}

export interface Field {
  width: number;
  height: number;
  vortices: Vortex[];
  gusts: Gust[];
  params: FieldParams;
  /** Advances the jet's meander. Grows faster when the mids are busy. */
  jetPhase: number;
}

export const GUST_LIFE_S = 0.6;
export const GUST_SIGMA = 0.09;
export const MAX_GUSTS = 32;
export const MAX_VORTICES = 5;

/** Three standing modes of a stream function psi = a sin(kx x + p) sin(ky y + q). Wavenumbers in rad/unit. */
const MODES = [
  { a: 1.0, kx: 3.1, ky: 2.3, p: 0.4, q: 1.7, wp: 0.23, wq: -0.17 },
  { a: 0.55, kx: 5.3, ky: 4.1, p: 2.1, q: 0.3, wp: -0.31, wq: 0.29 },
  { a: 0.3, kx: 8.7, ky: 7.9, p: 4.4, q: 2.6, wp: 0.47, wq: 0.41 },
];
/** Normaliser so the jet's peak speed is about `params.jet`. */
const JET_NORM = 1 / MODES.reduce((s, m) => s + m.a * Math.hypot(m.kx, m.ky), 0);

export function createField(width: number, height: number): Field {
  return {
    width,
    height,
    vortices: [
      { id: 1, x: width * 0.32, y: height * 0.42, r: 0.17, weight: 1 },
      { id: 2, x: width * 0.7, y: height * 0.6, r: 0.13, weight: 0.8 },
    ],
    gusts: [],
    params: { jet: 0.02, vortex: 0.03, inflow: 0.01, prevailing: 0.02 },
    jetPhase: 0,
  };
}

/** Keep systems inside the domain when the canvas changes shape. */
export function resizeField(field: Field, width: number, height: number): void {
  const sx = field.width > 0 ? width / field.width : 1;
  const sy = field.height > 0 ? height / field.height : 1;
  for (const v of field.vortices) {
    v.x *= sx;
    v.y *= sy;
  }
  field.width = width;
  field.height = height;
}

export interface Vec {
  u: number;
  v: number;
}

/** The jet alone: the analytic curl of the stream function, so it has zero divergence. */
export function jetAt(field: Field, x: number, y: number, out: Vec): Vec {
  let u = 0;
  let v = 0;
  const ph = field.jetPhase;
  for (const m of MODES) {
    const ax = m.kx * x + m.p + m.wp * ph * 6;
    const ay = m.ky * y + m.q + m.wq * ph * 6;
    // u = d(psi)/dy, v = -d(psi)/dx
    u += m.a * m.ky * Math.sin(ax) * Math.cos(ay);
    v -= m.a * m.kx * Math.cos(ax) * Math.sin(ay);
  }
  const k = field.params.jet * JET_NORM;
  out.u = u * k;
  out.v = v * k;
  return out;
}

/**
 * Profile of a vortex: 0 at the eye, peaks at 1 on the core radius, then falls away. The Gaussian tail keeps
 * a distant system from leaking a 1/r drift across the whole map.
 */
export function vortexProfile(s: number): number {
  return ((2 * s) / (1 + s * s)) * Math.exp(-((s / 4) ** 2));
}

/** Full wind at (x, y), written into `out` (no allocation per call). */
export function windAt(field: Field, x: number, y: number, out: Vec): Vec {
  jetAt(field, x, y, out);
  let u = out.u + field.params.prevailing;
  let v = out.v;
  const { vortex, inflow } = field.params;
  for (const c of field.vortices) {
    const dx = x - c.x;
    const dy = y - c.y;
    const d = Math.hypot(dx, dy);
    if (d < 1e-6) continue;
    const g = vortexProfile(d / c.r) * c.weight;
    const nx = dx / d;
    const ny = dy / d;
    // Tangent (ny, -nx) turns anticlockwise on screen (y down), like a northern-hemisphere low seen from above.
    u += vortex * g * ny - inflow * g * nx;
    v += -vortex * g * nx - inflow * g * ny;
  }
  const inv2s2 = 1 / (2 * GUST_SIGMA * GUST_SIGMA);
  for (const gst of field.gusts) {
    const dx = x - gst.x;
    const dy = y - gst.y;
    const w = Math.exp(-(dx * dx + dy * dy) * inv2s2) * (1 - gst.age / GUST_LIFE_S);
    u += gst.vx * w;
    v += gst.vy * w;
  }
  out.u = u;
  out.v = v;
  return out;
}

const scratch: Vec = { u: 0, v: 0 };

/**
 * Advance the field by dt: age gusts, and let storms drift with the jet and the prevailing wind,
 * wrapping at the edges. `heldId` is a storm the user is dragging; it does not drift.
 */
export function stepField(field: Field, dt: number, jetRate: number, heldId: number | null = null): void {
  field.jetPhase += dt * jetRate;
  for (let i = field.gusts.length - 1; i >= 0; i--) {
    field.gusts[i].age += dt;
    if (field.gusts[i].age >= GUST_LIFE_S) field.gusts.splice(i, 1);
  }
  const { width: W, height: H } = field;
  for (const c of field.vortices) {
    if (c.id === heldId) continue;
    jetAt(field, c.x, c.y, scratch);
    c.x += (scratch.u * 0.35 + field.params.prevailing * 0.6) * dt;
    c.y += scratch.v * 0.35 * dt;
    const m = c.r;
    if (c.x > W + m) c.x -= W + 2 * m;
    if (c.x < -m) c.x += W + 2 * m;
    if (c.y > H + m) c.y -= H + 2 * m;
    if (c.y < -m) c.y += H + 2 * m;
  }
}

export function addGust(field: Field, x: number, y: number, vx: number, vy: number): void {
  const cap = 1.6; // units/s, so a flick cannot fling everything off the map
  const s = Math.hypot(vx, vy);
  const k = s > cap ? cap / s : 1;
  field.gusts.push({ x, y, vx: vx * k, vy: vy * k, age: 0 });
  if (field.gusts.length > MAX_GUSTS) field.gusts.shift();
}

/** The storm whose eye is within `radius` units of (x, y), nearest first, or null. */
export function vortexAt(field: Field, x: number, y: number, radius: number): Vortex | null {
  let best: Vortex | null = null;
  let bestD = radius;
  for (const c of field.vortices) {
    const d = Math.hypot(x - c.x, y - c.y);
    if (d <= bestD) {
      best = c;
      bestD = d;
    }
  }
  return best;
}

let nextId = 100;

/** Seed a storm at (x, y). Returns null when the map already holds MAX_VORTICES. */
export function seedVortex(field: Field, x: number, y: number, rand: () => number = Math.random): Vortex | null {
  if (field.vortices.length >= MAX_VORTICES) return null;
  const v: Vortex = { id: nextId++, x, y, r: 0.11 + rand() * 0.07, weight: 0.75 + rand() * 0.35 };
  field.vortices.push(v);
  return v;
}

/** Remove a storm, but always keep at least one on the map. */
export function removeVortex(field: Field, id: number): boolean {
  if (field.vortices.length <= 1) return false;
  const i = field.vortices.findIndex((v) => v.id === id);
  if (i < 0) return false;
  field.vortices.splice(i, 1);
  return true;
}
