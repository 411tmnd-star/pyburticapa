import { windAt, type Field, type Vec } from "./field";
import type { Particles, Rain } from "./particles";
import { MAX_SPEED, type WeatherParams } from "./weather";

/**
 * Canvas 2D drawing for Squall. This file only draws: it reads the simulation and never changes it
 * (apart from pruning expired strikes and rings).
 *
 * Draw order: ink ground, wind colour layer, graticule, isobars, streak trails, rain, pressure rings,
 * lightning, eyes, flash, vignette.
 */

export const INK = "#050912";

/** Wind-speed ramp, calm to gale: ink, teal, sea green, pale lime, sand, apricot, coral, magenta. */
export const RAMP: ReadonlyArray<readonly [number, number, number]> = [
  [9, 22, 40],
  [16, 58, 86],
  [24, 104, 116],
  [52, 152, 134],
  [150, 196, 128],
  [238, 208, 126],
  [240, 150, 92],
  [226, 84, 118],
  [170, 60, 164],
];

/** 256-entry RGB lookup of RAMP, built once. */
export const RAMP_LUT: Uint8ClampedArray = (() => {
  const lut = new Uint8ClampedArray(256 * 3);
  for (let i = 0; i < 256; i++) {
    const t = (i / 255) * (RAMP.length - 1);
    const k = Math.min(RAMP.length - 2, Math.floor(t));
    const f = t - k;
    for (let c = 0; c < 3; c++) lut[i * 3 + c] = RAMP[k][c] + (RAMP[k + 1][c] - RAMP[k][c]) * f;
  }
  return lut;
})();

export function rampCss(t: number, alpha = 1): string {
  const i = Math.max(0, Math.min(255, Math.round(t * 255))) * 3;
  return `rgba(${RAMP_LUT[i]},${RAMP_LUT[i + 1]},${RAMP_LUT[i + 2]},${alpha.toFixed(3)})`;
}

export type Layer = "wind" | "night";

/** A lightning strike in units. `bolt` holds polylines relative to (x, y) as flat [x0, y0, x1, y1, ...] arrays. */
export interface Strike {
  x: number;
  y: number;
  t0: number;
  strength: number;
  bolt: number[][];
}

/** An expanding pressure ring (a kick at an eye, or the gust from a strike). */
export interface Ring {
  x: number;
  y: number;
  t0: number;
  strength: number;
}

export interface Overlay {
  strikes: Strike[];
  rings: Ring[];
  /** Wall-clock time of the last screen flash, seconds. */
  flashT0: number;
}

export interface RenderOptions {
  layer: Layer;
  isobars: boolean;
  reduced: boolean;
  /** Wall clock, seconds. */
  t: number;
  /** Graticule offset in units: it scrolls with the song position. */
  scroll: number;
  /** Storm under the pointer or being dragged, to highlight it. */
  activeId: number | null;
}

export const BOLT_S = 0.22;
export const MARKER_S = 20;
export const RING_S = 1.1;
export const FLASH_S = 0.18;
export const FLASH_ALPHA = 0.18;
const BUCKETS = 6;

/** A top-down "anvil crawler": branches spreading from the strike point. */
export function makeBolt(rand: () => number, strength: number): number[][] {
  const branches: number[][] = [];
  const grow = (x: number, y: number, angle: number, steps: number, step: number, depth: number) => {
    const pts = [x, y];
    for (let s = 0; s < steps; s++) {
      angle += (rand() - 0.5) * 1.1;
      const len = step * (0.6 + rand() * 0.8);
      x += Math.cos(angle) * len;
      y += Math.sin(angle) * len;
      pts.push(x, y);
      if (depth < 2 && rand() < 0.22) grow(x, y, angle + (rand() < 0.5 ? -0.8 : 0.8), Math.max(2, steps - s - 2), step * 0.75, depth + 1);
    }
    branches.push(pts);
  };
  const n = 3 + Math.floor(strength * 3);
  for (let b = 0; b < n; b++) grow(0, 0, rand() * Math.PI * 2, 5 + Math.floor(rand() * 4), 0.012 + 0.016 * strength, 0);
  return branches;
}

/** Strike marker colour by age, after Lightning Maps: fresh yellow, then orange, then red. */
export function markerColour(age: number): [number, number, number] {
  const stops: Array<[number, [number, number, number]]> = [
    [0, [255, 240, 140]],
    [4, [255, 196, 60]],
    [9, [255, 128, 40]],
    [15, [214, 46, 46]],
  ];
  for (let i = 0; i < stops.length - 1; i++) {
    const [a, ca] = stops[i];
    const [b, cb] = stops[i + 1];
    if (age <= b) {
      const f = Math.max(0, (age - a) / (b - a));
      return [ca[0] + (cb[0] - ca[0]) * f, ca[1] + (cb[1] - ca[1]) * f, ca[2] + (cb[2] - ca[2]) * f];
    }
  }
  return stops[stops.length - 1][1];
}

export class Renderer {
  private readonly canvas: HTMLCanvasElement;
  private readonly ctx: CanvasRenderingContext2D;
  private readonly trail: HTMLCanvasElement;
  private readonly trailCtx: CanvasRenderingContext2D;
  private readonly grid: HTMLCanvasElement;
  private readonly gridCtx: CanvasRenderingContext2D;
  private gridImage: ImageData | null = null;
  private vignette: CanvasGradient | null = null;
  private w = 1;
  private h = 1;
  private m = 1;
  private frame = 0;
  private readonly v: Vec = { u: 0, v: 0 };

  constructor(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d", { alpha: false });
    const trail = document.createElement("canvas");
    const trailCtx = trail.getContext("2d");
    const grid = document.createElement("canvas");
    const gridCtx = grid.getContext("2d");
    if (!ctx || !trailCtx || !gridCtx) throw new Error("Canvas 2D is not available in this browser.");
    this.canvas = canvas;
    this.ctx = ctx;
    this.trail = trail;
    this.trailCtx = trailCtx;
    this.grid = grid;
    this.gridCtx = gridCtx;
  }

  /** px per unit. */
  get scale(): number {
    return this.m;
  }

  resize(wCss: number, hCss: number, devicePixelRatio: number): void {
    const dpr = Math.min(2, Math.max(1, devicePixelRatio || 1));
    this.w = Math.max(1, wCss);
    this.h = Math.max(1, hCss);
    this.m = Math.min(this.w, this.h);
    this.canvas.width = Math.round(this.w * dpr);
    this.canvas.height = Math.round(this.h * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // Trails are soft by nature, so their buffer is capped at 1.25x: a quarter of the fill cost at 2x DPR.
    const ts = Math.min(dpr, 1.25);
    this.trail.width = Math.round(this.w * ts);
    this.trail.height = Math.round(this.h * ts);
    this.trailCtx.setTransform(ts * this.m, 0, 0, ts * this.m, 0, 0); // the trail buffer is drawn in units
    const long = 72;
    const gw = this.w >= this.h ? long : Math.max(8, Math.round((long * this.w) / this.h));
    const gh = this.w >= this.h ? Math.max(8, Math.round((long * this.h) / this.w)) : long;
    this.grid.width = gw;
    this.grid.height = gh;
    this.gridImage = this.gridCtx.createImageData(gw, gh);
    const g = this.ctx.createRadialGradient(this.w / 2, this.h / 2, this.m * 0.35, this.w / 2, this.h / 2, Math.hypot(this.w, this.h) * 0.62);
    g.addColorStop(0, "rgba(5,9,18,0)");
    g.addColorStop(1, "rgba(5,9,18,0.7)");
    this.vignette = g;
    this.frame = 0;
  }

  /** Clear the trail buffer, e.g. when the source changes. */
  clearTrails(): void {
    this.trailCtx.save();
    this.trailCtx.setTransform(1, 0, 0, 1, 0, 0);
    this.trailCtx.clearRect(0, 0, this.trail.width, this.trail.height);
    this.trailCtx.restore();
  }

  draw(field: Field, particles: Particles, rain: Rain, overlay: Overlay, wp: WeatherParams, o: RenderOptions, dt: number): void {
    const { ctx, w, h } = this;
    this.frame++;
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = INK;
    ctx.fillRect(0, 0, w, h);

    if (o.layer === "wind") this.drawWindLayer(field, wp);
    this.drawGraticule(o.scroll);
    if (o.isobars) this.drawIsobars(field, wp, o);
    this.drawTrails(particles, wp, o.layer, dt);
    ctx.drawImage(this.trail, 0, 0, w, h);
    this.drawRain(rain, wp, o.reduced);
    this.drawRings(overlay, o);
    this.drawStrikes(overlay, o.t);
    this.drawEyes(field, o.activeId);

    const fa = o.t - overlay.flashT0;
    if (fa >= 0 && fa < FLASH_S) {
      ctx.fillStyle = `rgba(232,240,255,${(FLASH_ALPHA * (1 - fa / FLASH_S)).toFixed(3)})`;
      ctx.fillRect(0, 0, w, h);
    }
    if (this.vignette) {
      ctx.fillStyle = this.vignette;
      ctx.fillRect(0, 0, w, h);
    }
  }

  private drawWindLayer(field: Field, wp: WeatherParams): void {
    const img = this.gridImage;
    if (!img) return;
    // Recompute the low-resolution field every second frame; the upscale hides the difference.
    if (this.frame % 2 === 1) {
      const { width: gw, height: gh, data } = img;
      const v = this.v;
      for (let j = 0; j < gh; j++) {
        const y = ((j + 0.5) / gh) * field.height;
        for (let i = 0; i < gw; i++) {
          const x = ((i + 0.5) / gw) * field.width;
          windAt(field, x, y, v);
          const s = Math.min(1, Math.hypot(v.u, v.v) / MAX_SPEED);
          const li = Math.round(Math.sqrt(s) * 255) * 3; // sqrt: spread the common low speeds over more colours
          const p = (j * gw + i) * 4;
          data[p] = RAMP_LUT[li];
          data[p + 1] = RAMP_LUT[li + 1];
          data[p + 2] = RAMP_LUT[li + 2];
          data[p + 3] = 255;
        }
      }
      this.gridCtx.putImageData(img, 0, 0);
    }
    const ctx = this.ctx;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "low"; // bilinear: the 72-wide field is smooth already, and "high" filtering of this stretch dominates the frame cost
    ctx.globalAlpha = 0.22 + 0.5 * wp.brightness;
    ctx.drawImage(this.grid, 0, 0, this.w, this.h);
    ctx.globalAlpha = 1;
  }

  private drawGraticule(scroll: number): void {
    const { ctx, w, h, m } = this;
    const step = 0.2 * m;
    const off = -(((scroll * m) % step) + step) % step;
    ctx.beginPath();
    for (let x = off; x < w; x += step) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
    }
    for (let y = step / 2; y < h; y += step) {
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
    }
    ctx.strokeStyle = "rgba(160,190,230,0.055)";
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  private drawIsobars(field: Field, wp: WeatherParams, o: RenderOptions): void {
    const { ctx, m } = this;
    ctx.lineWidth = 1;
    for (const c of field.vortices) {
      const depth = Math.min(1, wp.depth * c.weight);
      const n = 2 + Math.round(depth * 4);
      const cx = c.x * m;
      const cy = c.y * m;
      for (let k = 0; k < n; k++) {
        const r = c.r * m * (0.45 + k * 0.52 * (1 - 0.38 * depth));
        const ph = c.id * 1.7 + k * 0.9 + (o.reduced ? 0 : o.t * 0.15);
        ctx.beginPath();
        for (let s = 0; s <= 48; s++) {
          const a = (s / 48) * Math.PI * 2;
          const rr = r * (1 + 0.05 * Math.sin(3 * a + ph) + 0.03 * Math.sin(5 * a - ph * 1.3));
          const x = cx + Math.cos(a) * rr;
          const y = cy + Math.sin(a) * rr;
          if (s === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        const alpha = (0.06 + 0.14 * depth) * (1 - (0.6 * k) / n);
        ctx.strokeStyle = `rgba(222,234,255,${alpha.toFixed(3)})`;
        ctx.stroke();
      }
    }
  }

  private drawTrails(p: Particles, wp: WeatherParams, layer: Layer, dt: number): void {
    const tc = this.trailCtx;
    const W = this.w / this.m;
    const H = this.h / this.m;
    // Frame-rate independent fade. 8-bit alpha rounding leaves a faint residue that a small fade never
    // removes, so every sixth frame fades a little harder to clear it.
    let fade = 1 - Math.pow(wp.persistence, dt * 60);
    if (this.frame % 6 === 0) fade = Math.min(1, fade + 0.06);
    tc.globalCompositeOperation = "destination-out";
    tc.fillStyle = `rgba(0,0,0,${fade.toFixed(4)})`;
    tc.fillRect(0, 0, W, H);
    tc.globalCompositeOperation = "source-over";

    const paths: Path2D[] = [];
    for (let b = 0; b < BUCKETS; b++) paths.push(new Path2D());
    for (let i = 0; i < p.count; i++) {
      const s = p.speed[i];
      if (s < 0) continue;
      const b = Math.min(BUCKETS - 1, Math.floor((s / MAX_SPEED) * BUCKETS));
      const path = paths[b];
      path.moveTo(p.px[i], p.py[i]);
      path.lineTo(p.x[i], p.y[i]);
    }
    const light = 0.35 + 0.65 * wp.brightness;
    tc.lineCap = "round";
    for (let b = 0; b < BUCKETS; b++) {
      const a = (0.28 + (0.72 * (b + 1)) / BUCKETS) * light;
      tc.strokeStyle = layer === "wind" ? `rgba(240,247,255,${a.toFixed(3)})` : rampCss(0.15 + (0.85 * (b + 0.5)) / BUCKETS, a);
      tc.lineWidth = (1 + (0.4 * b) / (BUCKETS - 1)) / this.m;
      tc.stroke(paths[b]);
    }
  }

  private drawRain(rain: Rain, wp: WeatherParams, reduced: boolean): void {
    if (rain.count === 0) return;
    const { ctx, m } = this;
    const len = (7 + 10 * wp.rain) * (reduced ? 0.6 : 1);
    ctx.beginPath();
    for (let i = 0; i < rain.count; i++) {
      const vx = rain.vx[i];
      const vy = rain.vy[i];
      const s = Math.hypot(vx, vy) || 1;
      const x = rain.x[i] * m;
      const y = rain.y[i] * m;
      ctx.moveTo(x, y);
      ctx.lineTo(x - (vx / s) * len, y - (vy / s) * len);
    }
    ctx.strokeStyle = `rgba(196,220,255,${(0.25 + 0.4 * wp.rain).toFixed(3)})`;
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  private drawRings(overlay: Overlay, o: RenderOptions): void {
    const { ctx, m } = this;
    const rings = overlay.rings;
    for (let i = rings.length - 1; i >= 0; i--) {
      const r = rings[i];
      const age = o.t - r.t0;
      if (age >= RING_S || age < 0) {
        rings.splice(i, 1);
        continue;
      }
      const f = age / RING_S;
      const radius = (o.reduced ? 0.06 + 0.04 * r.strength : 0.03 + (0.12 + 0.18 * r.strength) * Math.sqrt(f)) * m;
      ctx.beginPath();
      ctx.arc(r.x * m, r.y * m, radius, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(230,240,255,${(0.5 * r.strength * (1 - f)).toFixed(3)})`;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }

  private drawStrikes(overlay: Overlay, t: number): void {
    const { ctx, m } = this;
    const strikes = overlay.strikes;
    for (let i = strikes.length - 1; i >= 0; i--) {
      const s = strikes[i];
      const age = t - s.t0;
      if (age >= MARKER_S || age < 0) {
        strikes.splice(i, 1);
        continue;
      }
      const sx = s.x * m;
      const sy = s.y * m;
      if (age < BOLT_S) {
        const a = 1 - age / BOLT_S;
        ctx.lineJoin = "round";
        for (const [width, colour] of [
          [6, `rgba(150,185,255,${(0.22 * a).toFixed(3)})`],
          [1.4, `rgba(255,255,255,${a.toFixed(3)})`],
        ] as const) {
          ctx.beginPath();
          for (const br of s.bolt) {
            ctx.moveTo(sx + br[0] * m, sy + br[1] * m);
            for (let k = 2; k < br.length; k += 2) ctx.lineTo(sx + br[k] * m, sy + br[k + 1] * m);
          }
          ctx.strokeStyle = colour;
          ctx.lineWidth = width;
          ctx.stroke();
        }
      }
      const [r, g, b] = markerColour(age);
      const alpha = age > MARKER_S - 6 ? (MARKER_S - age) / 6 : 1;
      ctx.beginPath();
      ctx.arc(sx, sy, 2.2 + 2 * s.strength, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r | 0},${g | 0},${b | 0},${alpha.toFixed(3)})`;
      ctx.fill();
    }
  }

  private drawEyes(field: Field, activeId: number | null): void {
    const { ctx, m } = this;
    ctx.font = "600 13px ui-sans-serif, system-ui, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for (const c of field.vortices) {
      const x = c.x * m;
      const y = c.y * m;
      const on = c.id === activeId;
      ctx.beginPath();
      ctx.arc(x, y, on ? 14 : 10, 0, Math.PI * 2);
      ctx.fillStyle = on ? "rgba(5,9,18,0.75)" : "rgba(5,9,18,0.5)";
      ctx.fill();
      ctx.strokeStyle = on ? "rgba(255,255,255,0.95)" : "rgba(230,240,255,0.55)";
      ctx.lineWidth = on ? 1.5 : 1;
      ctx.stroke();
      ctx.fillStyle = on ? "#fff" : "rgba(240,246,255,0.85)";
      ctx.fillText("L", x, y + 0.5);
    }
  }
}
