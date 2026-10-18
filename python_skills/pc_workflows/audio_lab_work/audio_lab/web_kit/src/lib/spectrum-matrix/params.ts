import { SCENE_STATES, clamp01, type AudioFeatureFrame, type SceneState } from "../pipeline/contract";

/**
 * Spectrum Matrix (band terrain v0): audio features in, visual parameters out. Pure and stateless: the same frame always
 * gives the same parameters, and the frame is never changed. Uses only fields of the existing AudioFeatureFrame.
 *
 * "Band terrain" is deliberate: the contract carries three band levels, not a spectrum, so the terrain's left, middle and
 * right lobes are bass, mid and high. The ordering is a stylised layout, not a measured per-frequency display.
 *
 * Temporal smoothing, the row history and the ridge decay belong to the stateful layer (animator.ts). Every numeric output
 * is a finite number in 0..1. Shape and constants are copied from the other scenes' params (kept separate on purpose); all
 * constants are PROPOSED starting values and none has been checked with real music.
 */

/** Scene-state levels (PROPOSED). */
export const SCENE_LEVEL: Readonly<Record<SceneState, number>> = Object.freeze({ rest: 0, build: 0.6, active: 1, settle: 0.35 });

/** Floor of the overall exposure, so the terrain stays legible in silence (the lesson from Constellation Core's polish pass). */
export const REST_EXPOSURE = 0.2;
/** Glow of the horizon haze in silence. */
export const REST_GLOW = 0.25;
/** Motion multiplier in silence. */
export const CALM_MOTION = 0.25;
/** Motion multiplier under prefers-reduced-motion. */
export const REDUCED_MOTION = 0.35;
/** Overall energy below this counts as silence. */
export const SILENCE_RMS = 0.04;

export interface MatrixParams {
  /** Height of the left lobe (bass). */
  bass: number;
  /** Height of the centre lobe (mid). */
  mid: number;
  /** Height and roughness of the right lobe (high), gated by motion. */
  high: number;
  /** Position along the cyan-to-violet palette (mids). Not motion-gated. */
  colour: number;
  /** Overall exposure (loudness), with a floor of REST_EXPOSURE. */
  exposure: number;
  /** Horizon haze glow (bass), with a floor of REST_GLOW. */
  glow: number;
  /** Ridge across the row being injected on a bass hit. Zero in silence and under reduced motion. */
  ridge: number;
  /** Scene level: rest 0, build 0.6, active 1, settle 0.35. */
  sceneLevel: number;
  /** Multiplier for the scroll speed: CALM_MOTION in silence, REDUCED_MOTION if reduced. */
  motion: number;
  /** True when nothing is playing or the signal is near silent. */
  calm: boolean;
}

const unit = (x: number) => clamp01(x);

/** Map one audio frame to Spectrum Matrix's visual parameters. `reduced` is the prefers-reduced-motion setting. */
export function toMatrixParams(f: AudioFeatureFrame, reduced: boolean): MatrixParams {
  const playing = f.isPlaying === true;
  const bass = unit(f.bass);
  const mid = unit(f.mid);
  const high = unit(f.high);
  const rms = unit(f.rmsEnergy);
  const calm = !playing || rms < SILENCE_RMS;
  const motion = (calm ? CALM_MOTION : 1) * (reduced ? REDUCED_MOTION : 1);
  // A ridge is a pulse, so it is removed in silence and under reduced motion.
  const pulses = !calm && !reduced;
  const scene = (SCENE_STATES as readonly string[]).includes(f.currentSceneState) ? f.currentSceneState : "rest";
  return {
    bass,
    mid,
    high: unit(high * (reduced ? REDUCED_MOTION + 0.4 : 1)),
    colour: mid,
    exposure: unit(REST_EXPOSURE + (1 - REST_EXPOSURE) * rms),
    glow: unit(REST_GLOW + (1 - REST_GLOW) * bass),
    ridge: pulses ? unit(f.bassHit) : 0,
    sceneLevel: SCENE_LEVEL[scene as SceneState],
    motion,
    calm,
  };
}
