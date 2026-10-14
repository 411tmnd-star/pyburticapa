import { clamp01, type AudioFeatureFrame, type SceneState } from "../pipeline/contract";

/**
 * Audio features in, weather out. Pure, so every mapping in DESIGN.md is unit-tested here.
 * The input is the pipeline's AudioFeatureFrame, so any source works: a live file, the microphone, the
 * demo signal or a pre-analysed song. Every number below traces to a measured feature.
 */

export interface WeatherParams {
  /** Vortex core speed (bass), units/s. */
  vortex: number;
  /** Radial inflow (bass hits, plus a deepening ahead of a louder passage), units/s. */
  inflow: number;
  /** Jet stream peak speed (mids), units/s. */
  jet: number;
  /** How fast the jet meanders (mids). */
  jetRate: number;
  /** Eastward drift (overall energy), units/s. */
  prevailing: number;
  /** Fraction of a trail kept after one 60 Hz frame (overall energy). */
  persistence: number;
  /** 0..1, brightness of trails and of the colour layer (overall energy). */
  brightness: number;
  /** 0..1, rain amount (highs). */
  rain: number;
  /** Multiplies particle and rain speed: 1, REDUCED_SCALE for reduced motion, lower again in the doldrums. */
  speedScale: number;
  /** 0..1 wind index behind the Beaufort reading. */
  wind: number;
  /** 0..1 storm depth for the isobars: bass plus an approaching front. */
  depth: number;
  /** True when nothing is playing or the signal is near silent: the doldrums. */
  calm: boolean;
}

/** A field speed at or above this is drawn at the top of the colour ramp. */
export const MAX_SPEED = 0.55;
/** Matches the Constellation instrument's damping for prefers-reduced-motion. */
export const REDUCED_SCALE = 0.35;
/** Overall energy below this counts as silence (the pipeline's own controls use the same threshold). */
export const SILENCE_RMS = 0.04;
const DOLDRUMS_SCALE = 0.25;

export function isCalm(f: AudioFeatureFrame): boolean {
  return !f.isPlaying || f.rmsEnergy < SILENCE_RMS;
}

/**
 * `tendency` is the barometric tendency in -1..1: positive when a louder passage is approaching (the pressure
 * is falling), negative while it clears. See `tendencyFromScene` and forecast.ts `tendencyAt`.
 */
export function toWeather(f: AudioFeatureFrame, tendency: number, reduced: boolean): WeatherParams {
  const calm = isCalm(f);
  const approaching = Math.max(0, tendency);
  const wind = clamp01(0.55 * f.bass + 0.3 * f.rmsEnergy + 0.15 * f.mid);
  let speedScale = reduced ? REDUCED_SCALE : 1;
  if (calm) speedScale *= DOLDRUMS_SCALE;
  return {
    vortex: 0.03 + 0.45 * f.bass + 0.08 * approaching,
    inflow: 0.01 + 0.4 * f.bassHit + 0.06 * approaching,
    jet: 0.015 + 0.22 * f.mid,
    jetRate: 0.05 + 0.6 * f.mid,
    prevailing: 0.012 + 0.07 * f.rmsEnergy,
    persistence: calm ? 0.8 : 0.86 + 0.1 * f.rmsEnergy,
    brightness: calm ? 0.25 : clamp01(0.35 + 0.65 * f.rmsEnergy),
    rain: calm ? 0 : clamp01((f.high - 0.12) / 0.6),
    speedScale,
    wind: calm ? 0 : wind,
    depth: clamp01(f.bass + 0.5 * approaching),
    calm,
  };
}

/**
 * Barometric tendency from the scene state, for sources without a forecast. A "build" is the music getting
 * ready for something: the barometer falls. A "settle" is it clearing: the barometer rises. For a pre-analysed
 * song the scene state comes from the AudioLab motion timeline; for live audio from the pipeline's causal tracker.
 */
export function tendencyFromScene(scene: SceneState): number {
  return scene === "build" ? 0.45 : scene === "settle" ? -0.35 : 0;
}

/** The Beaufort scale, used as an interpretive reading of the wind index (not a measurement). */
export const BEAUFORT = [
  "Calm",
  "Light air",
  "Light breeze",
  "Gentle breeze",
  "Moderate breeze",
  "Fresh breeze",
  "Strong breeze",
  "Near gale",
  "Gale",
  "Strong gale",
  "Storm",
  "Violent storm",
  "Hurricane force",
] as const;

export function beaufort(wind: number): { force: number; name: string } {
  const force = Math.max(0, Math.min(12, Math.round(clamp01(wind) * 12)));
  return { force, name: BEAUFORT[force] };
}

export type RainLabel = "none" | "light" | "moderate" | "heavy";

export function rainLabel(rain: number): RainLabel {
  return rain < 0.05 ? "none" : rain < 0.35 ? "light" : rain < 0.7 ? "moderate" : "heavy";
}

export type Tendency = "falling" | "steady" | "rising";

/** Barometer wording. A falling barometer means a louder passage is coming, as falling pressure precedes a storm. */
export function tendencyLabel(tendency: number): Tendency {
  return tendency > 0.12 ? "falling" : tendency < -0.12 ? "rising" : "steady";
}

export type LightningMode = "on" | "soft" | "off";

/** At most three strikes a second, and one screen flash a second: under the WCAG 2.3.1 three-flash limit. */
export const STRIKE_MIN_GAP_S = 1 / 3;
export const FLASH_MIN_GAP_S = 1;
/** Window of the strikes-per-minute readout. Short enough to follow the song, long enough to be stable. */
export const RATE_WINDOW_S = 15;

export interface StrikeDecision {
  strike: boolean;
  flash: boolean;
  /** 0..1, how big the strike is (bolt reach, ring size). */
  strength: number;
}

/**
 * Turns detected onsets (`beatDetected`) into lightning, with rate and flash limits. A frame can repeat
 * when the pipeline delays features for output latency; the minimum gap absorbs that.
 */
export class StrikeScheduler {
  private lastStrike = -Infinity;
  private lastFlash = -Infinity;
  private times: number[] = [];

  /** `t` is a monotonic clock in seconds. */
  update(t: number, f: AudioFeatureFrame, mode: LightningMode, reduced: boolean): StrikeDecision {
    const none = { strike: false, flash: false, strength: 0 };
    if (!f.beatDetected || mode === "off" || isCalm(f)) return none;
    const strength = clamp01(Math.max(f.bassHit, 0.8 * f.high, f.rmsEnergy, (f.onsetStrength - 0.5) * 2));
    if (strength < 0.25 || t - this.lastStrike < STRIKE_MIN_GAP_S) return none;
    this.lastStrike = t;
    this.times.push(t);
    const flash = mode === "on" && !reduced && strength > 0.45 && t - this.lastFlash >= FLASH_MIN_GAP_S;
    if (flash) this.lastFlash = t;
    return { strike: true, flash, strength };
  }

  /** Strikes per minute over the last RATE_WINDOW_S seconds. */
  perMinute(t: number): number {
    while (this.times.length && t - this.times[0] > RATE_WINDOW_S) this.times.shift();
    return Math.round((this.times.length * 60) / RATE_WINDOW_S);
  }

  reset(): void {
    this.lastStrike = -Infinity;
    this.lastFlash = -Infinity;
    this.times = [];
  }
}

/** Rising edge of the bass-hit envelope: a pressure ring leaves every eye. */
export class KickEdge {
  private armed = true;
  update(hit: number): boolean {
    if (this.armed && hit > 0.5) {
      this.armed = false;
      return true;
    }
    if (hit < 0.3) this.armed = true;
    return false;
  }
}
