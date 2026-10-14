import { windAt, type Field, type Vec } from "./field";

/** Small seeded PRNG (mulberry32), so tests and screenshots are repeatable. */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Streak particles in typed arrays. Positions are in units (see field.ts). Each step stores the previous
 * position, so the renderer can draw one segment per particle. `speed` is -1 for a particle that just
 * respawned, which tells the renderer to skip its segment (no line across the map).
 */
export class Particles {
  readonly capacity: number;
  count: number;
  readonly x: Float32Array;
  readonly y: Float32Array;
  readonly px: Float32Array;
  readonly py: Float32Array;
  readonly age: Float32Array;
  readonly life: Float32Array;
  readonly speed: Float32Array;
  private readonly rand: () => number;
  private readonly w: Vec = { u: 0, v: 0 };

  constructor(capacity: number, seed = 1) {
    this.capacity = capacity;
    this.count = capacity;
    this.x = new Float32Array(capacity);
    this.y = new Float32Array(capacity);
    this.px = new Float32Array(capacity);
    this.py = new Float32Array(capacity);
    this.age = new Float32Array(capacity);
    this.life = new Float32Array(capacity);
    this.speed = new Float32Array(capacity);
    this.rand = mulberry32(seed);
  }

  /** Scatter every particle across a width x height domain, with staggered ages so they do not all respawn together. */
  scatter(width: number, height: number): void {
    for (let i = 0; i < this.capacity; i++) {
      this.respawn(i, width, height);
      this.age[i] = this.rand() * this.life[i];
    }
  }

  setCount(n: number): void {
    this.count = Math.max(0, Math.min(this.capacity, Math.round(n)));
  }

  private respawn(i: number, width: number, height: number): void {
    const x = this.rand() * width;
    const y = this.rand() * height;
    this.x[i] = this.px[i] = x;
    this.y[i] = this.py[i] = y;
    this.age[i] = 0;
    this.life[i] = 1.5 + this.rand() * 2.5;
    this.speed[i] = -1;
  }

  /** Move every active particle along the wind for dt seconds. `speedScale` damps motion (reduced motion, doldrums). */
  step(field: Field, dt: number, speedScale: number): void {
    const { width, height } = field;
    const w = this.w;
    const margin = 0.02;
    for (let i = 0; i < this.count; i++) {
      this.age[i] += dt;
      const x = this.x[i];
      const y = this.y[i];
      if (this.age[i] > this.life[i] || x < -margin || y < -margin || x > width + margin || y > height + margin) {
        this.respawn(i, width, height);
        continue;
      }
      windAt(field, x, y, w);
      this.px[i] = x;
      this.py[i] = y;
      this.x[i] = x + w.u * speedScale * dt;
      this.y[i] = y + w.v * speedScale * dt;
      this.speed[i] = Math.hypot(w.u, w.v);
    }
  }
}

/** Rain: short-lived streaks that fall with the wind. The highs set how many there are. */
export class Rain {
  readonly capacity: number;
  count = 0;
  readonly x: Float32Array;
  readonly y: Float32Array;
  readonly vx: Float32Array;
  readonly vy: Float32Array;
  readonly age: Float32Array;
  readonly life: Float32Array;
  private readonly rand: () => number;
  private readonly w: Vec = { u: 0, v: 0 };

  constructor(capacity: number, seed = 7) {
    this.capacity = capacity;
    this.x = new Float32Array(capacity);
    this.y = new Float32Array(capacity);
    this.vx = new Float32Array(capacity);
    this.vy = new Float32Array(capacity);
    this.age = new Float32Array(capacity);
    this.life = new Float32Array(capacity);
    this.rand = mulberry32(seed);
  }

  /**
   * `amount` 0..1 is the target share of capacity. Drops are added up to the target and allowed to expire
   * when it falls, so rain fades instead of vanishing.
   */
  step(field: Field, dt: number, amount: number, speedScale: number): void {
    const target = Math.round(this.capacity * Math.max(0, Math.min(1, amount)));
    // Expire, compacting the arrays in place.
    let n = 0;
    for (let i = 0; i < this.count; i++) {
      this.age[i] += dt;
      if (this.age[i] >= this.life[i]) continue;
      if (n !== i) {
        this.x[n] = this.x[i];
        this.y[n] = this.y[i];
        this.age[n] = this.age[i];
        this.life[n] = this.life[i];
      }
      n++;
    }
    this.count = n;
    // Spawn toward the target, a limited number per frame so a hi-hat does not appear as a block.
    const spawn = Math.min(target - this.count, Math.ceil(this.capacity * 0.08));
    for (let k = 0; k < spawn; k++) {
      const i = this.count++;
      this.x[i] = this.rand() * field.width;
      this.y[i] = this.rand() * field.height;
      this.age[i] = 0;
      this.life[i] = 0.25 + this.rand() * 0.35;
    }
    // Fall: the local wind plus a steady downward component (the map is seen from above at a slant).
    const w = this.w;
    for (let i = 0; i < this.count; i++) {
      windAt(field, this.x[i], this.y[i], w);
      this.vx[i] = (w.u * 1.4 + 0.05) * speedScale;
      this.vy[i] = (w.v * 1.4 + 0.35) * speedScale;
      this.x[i] += this.vx[i] * dt;
      this.y[i] += this.vy[i] * dt;
    }
  }
}
