import { BassShaper } from "../audio/bass";
import { OnsetDetector, dbToUnit, follow } from "../audio/features";
import { CEIL_DB, FLOOR_DB, clamp01 } from "./contract";

/**
 * Raw readings for one moment, as an AnalyserNode (or an offline emulation of one) reports them.
 * This is the only input the FeatureComputer needs, which is what lets live and offline sources share it.
 */
export interface BandReading {
  /** Mean power in dB over 20-150 Hz (sub plus punch). */
  lowDb: number;
  /** Mean power in dB over 60-150 Hz (the punch band; excludes the sub). */
  punchDb: number;
  /** 150-2000 Hz. */
  midDb: number;
  /** 2000-10000 Hz. */
  highDb: number;
  /** 20-10000 Hz. */
  allDb: number;
  /** Summed positive spectral-magnitude increase since the previous reading (bins up to 4 kHz). */
  flux: number;
}

/** What the computer derives from readings: the audio fields of AudioFeatureFrame. */
export interface ComputedFeatures {
  bass: number;
  mid: number;
  high: number;
  rmsEnergy: number;
  onsetStrength: number;
  beatDetected: boolean;
  bassHit: number;
}

export const ZERO_FEATURES: ComputedFeatures = {
  bass: 0,
  mid: 0,
  high: 0,
  rmsEnergy: 0,
  onsetStrength: 0,
  beatDetected: false,
  bassHit: 0,
};

/**
 * Turns band readings into features. Stateful (envelope followers, onset history, bass shaper) and
 * causal: the output at time t depends only on readings up to t. Deterministic: the same readings at the
 * same times give the same output.
 */
export class FeatureComputer {
  private bass = 0;
  private mid = 0;
  private high = 0;
  private level = 0;
  private onsets = new OnsetDetector();
  private shaper = new BassShaper();
  private hit = 0;

  reset(): void {
    this.bass = this.mid = this.high = this.level = this.hit = 0;
    this.onsets = new OnsetDetector();
    this.shaper = new BassShaper();
  }

  /** `t` is seconds on any monotonic clock; `dt` seconds since the previous call. */
  push(r: BandReading, t: number, dt: number): ComputedFeatures {
    const shaped = this.shaper.push(r.punchDb, t, dt);
    this.hit = shaped.kick;
    this.bass = follow(this.bass, dbToUnit(r.lowDb, FLOOR_DB, CEIL_DB), dt, 0.02, 0.18);
    this.mid = follow(this.mid, dbToUnit(r.midDb, FLOOR_DB, CEIL_DB), dt, 0.03, 0.22);
    this.high = follow(this.high, dbToUnit(r.highDb, FLOOR_DB, CEIL_DB), dt, 0.01, 0.12);
    this.level = follow(this.level, dbToUnit(r.allDb, FLOOR_DB, CEIL_DB), dt, 0.03, 0.25);
    const beat = this.onsets.pushFlux(r.flux, t);
    return this.out(beat, this.onsets.strength);
  }

  /** Not playing (paused, or no signal): every value relaxes to rest. */
  decay(dt: number): ComputedFeatures {
    this.bass = follow(this.bass, 0, dt, 0.02, 0.4);
    this.mid = follow(this.mid, 0, dt, 0.02, 0.4);
    this.high = follow(this.high, 0, dt, 0.02, 0.4);
    this.level = follow(this.level, 0, dt, 0.02, 0.4);
    this.hit = this.shaper.relax(dt).kick;
    return this.out(false, 0);
  }

  private out(beat: boolean, strength: number): ComputedFeatures {
    return {
      bass: this.bass,
      mid: this.mid,
      high: this.high,
      rmsEnergy: this.level,
      onsetStrength: clamp01(strength),
      beatDetected: beat,
      bassHit: this.hit,
    };
  }
}
