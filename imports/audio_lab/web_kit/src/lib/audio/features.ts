/**
 * Pure audio-analysis maths. No DOM and no Web Audio here, so everything in this file is unit-tested in Node.
 */

export const BANDS = {
  /** Whole low end (sub plus punch): drives the bass meter, swell and glow. */
  lowHz: [20, 150],
  /** Short bass hits and note re-entries: drives the kick and the pull. The sub is excluded so a long sustained tone cannot hide them. */
  punchHz: [60, 150],
  midHz: [150, 2000],
  highHz: [2000, 10000],
} as const;

import { clamp01 } from "../pipeline/contract";
export { clamp01 };

/** Index range [from, to) of FFT bins that cover [loHz, hiHz]. Bin 0 (DC) is skipped. */
export function binRange(loHz: number, hiHz: number, sampleRate: number, fftSize: number): [number, number] {
  const binHz = sampleRate / fftSize;
  const from = Math.max(1, Math.floor(loHz / binHz));
  const to = Math.max(from + 1, Math.ceil(hiHz / binHz));
  return [from, to];
}

/** Mean power, in dB, over bins [from, to) of an FFT dB array (as from getFloatFrequencyData). */
export function bandDb(db: ArrayLike<number>, from: number, to: number): number {
  const end = Math.min(to, db.length);
  let sum = 0;
  for (let i = from; i < end; i++) sum += 10 ** (db[i] / 10);
  const n = Math.max(1, end - from);
  return 10 * Math.log10(sum / n + 1e-12);
}

/** Map a dB value onto 0..1 between floorDb and ceilDb. */
export function dbToUnit(db: number, floorDb: number, ceilDb: number): number {
  return clamp01((db - floorDb) / (ceilDb - floorDb));
}

/** One-pole envelope follower. `attack` and `release` are seconds to reach about 63% of a step. */
export function follow(prev: number, target: number, dt: number, attack: number, release: number): number {
  const tau = target > prev ? attack : release;
  const a = 1 - Math.exp(-dt / Math.max(tau, 1e-4));
  return prev + (target - prev) * a;
}

/**
 * Spectral-flux onset detector. Flux is the sum of positive magnitude increases between frames.
 * An onset is a flux peak above mean + k * std over recent history, outside a refractory period.
 */
export class OnsetDetector {
  private prev: Float32Array | null = null;
  private history: number[] = [];
  private lastOnsetAt = -Infinity;
  private readonly historyLen: number;
  private readonly k: number;
  private readonly refractoryS: number;

  constructor(historyLen = 43, k = 1.6, refractoryS = 0.12) {
    this.historyLen = historyLen;
    this.k = k;
    this.refractoryS = refractoryS;
  }

  /** Strength of the latest flux relative to the adaptive threshold, 0..1 (0.5 = at the threshold). */
  strength = 0;

  /** `mag` holds linear magnitudes. Returns true when an onset is detected at time t (seconds). */
  push(mag: Float32Array, t: number, fromBin = 1, toBin = mag.length): boolean {
    if (!this.prev || this.prev.length !== mag.length) {
      this.prev = mag.slice();
      return false;
    }
    let flux = 0;
    const end = Math.min(toBin, mag.length);
    for (let i = fromBin; i < end; i++) {
      const d = mag[i] - this.prev[i];
      if (d > 0) flux += d;
    }
    this.prev.set(mag);
    return this.pushFlux(flux, t);
  }

  /** Same detector, fed a spectral flux that was computed elsewhere (offline readings). */
  pushFlux(flux: number, t: number): boolean {
    this.history.push(flux);
    if (this.history.length > this.historyLen) this.history.shift();

    const n = this.history.length;
    const mean = this.history.reduce((a, b) => a + b, 0) / n;
    const variance = this.history.reduce((a, b) => a + (b - mean) ** 2, 0) / n;
    const threshold = mean + this.k * Math.sqrt(variance);
    this.strength = threshold > 1e-9 ? clamp01(flux / (2 * threshold)) : 0;
    if (n >= 8 && flux > threshold && flux > 1e-6 && t - this.lastOnsetAt >= this.refractoryS) {
      this.lastOnsetAt = t;
      return true;
    }
    return false;
  }
}
