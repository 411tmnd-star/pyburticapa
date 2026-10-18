import { clamp01, follow } from "./features";

/**
 * Turns the raw bass-band level (dB) into the pull that moves the cluster.
 *
 * 1. Adaptive window: the level is scaled between a slowly tracked floor and peak, so quiet and loud
 *    songs both use the full range. The fixed window in the first version could clip loud masters and
 *    flatten quiet ones.
 * 2. Sustain and transient: the slow body of the bass is separated from the fast excursions above it.
 *    Kicks are the transients, so a sustained bass line pulls steadily without pumping, and kicks
 *    pulse on top.
 * 3. Two paths. The sustained body drives a damped spring, so the cluster overshoots slightly and settles,
 *    which reads as a physical pull. Kicks bypass the spring and decay directly, because a spring always
 *    lags its input (about 150 ms at 4 Hz) and that lag pushes the visible hit off the beat.
 */

export interface BassOptions {
  /** Spring natural frequency in Hz. Higher is snappier. */
  springHz: number;
  /** Damping ratio. Below 1 gives a small, musical overshoot. */
  damping: number;
  /** How far above the sustain a level must rise to count as a full kick (0..1 scale). */
  kickSpan: number;
  /** Share of the pull that comes from the spring body (the rest comes from the kick path). */
  sustainWeight: number;
  /** Kick decay time constant in seconds. The kick path attacks instantly. */
  kickTau: number;
  /** Sustain release in seconds. Shorter keeps kick transients distinct. */
  sustainRelease: number;
  /** How quickly the adaptive floor rises toward the level (seconds). Shorter follows troughs more closely. */
  floorAttack: number;
  /** Combine the two paths with max (kick peaks land on the kick) or sum (kicks ride on the body). */
  combine: "max" | "sum";
}

export const BASS_DEFAULTS: BassOptions = {
  springHz: 4,
  damping: 0.6,
  kickSpan: 0.15,
  sustainWeight: 0.2,
  sustainRelease: 0.5,
  kickTau: 0.15,
  floorAttack: 3,
  combine: "max",
};

/** The adaptive window never spans less than this many dB, so a steady level cannot collapse to zero. */
const MIN_SPAN_DB = 15;
/** Seconds at the start during which the adaptive window is settling and kicks are not reported. */
const WARMUP_S = 0.5;

export interface BassState {
  /** 0..1, the value to drive gravity with. */
  pull: number;
  /** 0..1, the kick transient (use for flashes and the impulse ring). */
  kick: number;
  /** 0..1, the sustained bass body. */
  sustain: number;
  /** 0..1, the scaled bass level inside the adaptive window. */
  level: number;
}

const SPRING_STEP = 1 / 240;
 // substep size, which keeps the explicit integration stable

export class BassShaper {
  private readonly opts: BassOptions;
  private hi = -40;
  private lo = -70;
  private sustain = 0;
  private x = 0;
  private v = 0;
  private kickEnv = 0;
  private elapsed = 0;

  constructor(opts: Partial<BassOptions> = {}) {
    this.opts = { ...BASS_DEFAULTS, ...opts };
  }

  /**
   * `db` is the bass band in dB, `dt` the time since the last call. (`_t` is unused and kept for callers.)
   * For the first WARMUP_S seconds of signal the window is still settling, so no kicks are reported. A track
   * that starts in silence is unaffected.
   */
  push(db: number, _t: number, dt: number): BassState {
    const h = Math.min(0.1, Math.max(1e-3, dt));
    this.elapsed += h;
    // Adaptive window: the peak rises quickly and decays over about 12 s; the floor falls quickly and rises
    // over floorAttack seconds. The span is kept at least MIN_SPAN_DB wide, so a held level stays at its
    // place in the range instead of drifting to zero as the window catches up with it.
    this.hi = follow(this.hi, db, h, 0.05, 12);
    this.lo = follow(this.lo, db, h, this.opts.floorAttack, 0.3);
    if (this.lo > this.hi - MIN_SPAN_DB) this.lo = this.hi - MIN_SPAN_DB;
    const span = this.hi - this.lo;
    const level = clamp01((db - this.lo) / span);

    this.sustain = follow(this.sustain, level, h, 0.12, this.opts.sustainRelease);
    const transient = Math.max(0, level - this.sustain);
    const kick = this.elapsed < WARMUP_S ? 0 : clamp01(transient / this.opts.kickSpan);
    // Kick path: instant attack, exponential decay.
    this.kickEnv = Math.max(kick, this.kickEnv * Math.exp(-h / this.opts.kickTau));

    // Body path: damped spring tracking the sustain, integrated in small substeps.
    const w = 2 * Math.PI * this.opts.springHz;
    const z2w = 2 * this.opts.damping * w;
    const steps = Math.max(1, Math.ceil(h / SPRING_STEP));
    const sh = h / steps;
    for (let i = 0; i < steps; i++) {
      const a = w * w * (this.sustain - this.x) - z2w * this.v;
      this.v += a * sh;
      this.x += this.v * sh;
    }
    const wsp = this.opts.sustainWeight;
    const body = wsp * this.x;
    const pull = clamp01(this.opts.combine === "max" ? Math.max(body, this.kickEnv) : body + (1 - wsp) * this.kickEnv);
    return { pull, kick: this.kickEnv, sustain: this.sustain, level };
  }

  /**
   * Not playing: let the kick and the spring relax to rest without touching the adaptive window or the
   * warm-up, so a pause does not teach the window that the track is silent.
   */
  relax(dt: number): BassState {
    const h = Math.min(0.1, Math.max(1e-3, dt));
    this.kickEnv *= Math.exp(-h / this.opts.kickTau);
    this.sustain = follow(this.sustain, 0, h, 0.12, this.opts.sustainRelease);
    this.x = follow(this.x, 0, h, 0.05, 0.3);
    this.v = 0;
    const pull = clamp01(Math.max(this.opts.sustainWeight * this.x, this.kickEnv));
    return { pull, kick: this.kickEnv, sustain: this.sustain, level: 0 };
  }
}
