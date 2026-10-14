import { clamp01, type AudioFeatureFrame } from "../pipeline/contract";

/**
 * Visual profiles are data. Each one is a different reading of the same measurements, not a claim
 * about what the music means. Edit the numbers to change the feel; no code changes are needed.
 */
export interface VisualProfile {
  id: string;
  label: string;
  blurb: string;
  /** How far bass pulls the cluster inward (0..1). */
  gravity: number;
  /** How much bass and loudness swell the core. */
  scale: number;
  /** How much bass and loudness add glow. */
  glow: number;
  /** Degrees of hue shift at full mid energy. */
  hueShift: number;
  /** Strength of the mid-driven link threads. */
  links: number;
  /** Probability scale for high-frequency sparkles. */
  sparkle: number;
  /** Pixels of high-frequency jitter at full high energy. */
  jitter: number;
  /** Size of the onset shockwave. */
  shock: number;
  /** Base spin in radians per second. */
  rotation: number;
  /** Camera tilt driven by bass. */
  tilt: number;
}

export const PROFILES: VisualProfile[] = [
  {
    id: "galaxy",
    label: "Galaxy",
    blurb: "Balanced: every band contributes a little.",
    gravity: 0.85, scale: 0.75, glow: 0.8, hueShift: 90, links: 0.5,
    sparkle: 0.5, jitter: 2, shock: 0.7, rotation: 0.12, tilt: 0.2,
  },
  {
    id: "pulse",
    label: "Pulse",
    blurb: "Bass-led: the kick pulls and swells the core.",
    gravity: 0.95, scale: 0.9, glow: 1, hueShift: 30, links: 0.2,
    sparkle: 0.2, jitter: 0.5, shock: 1, rotation: 0.06, tilt: 0.5,
  },
  {
    id: "drift",
    label: "Drift",
    blurb: "Cinematic: slow and wide, with sparkle in the highs.",
    gravity: 0.5, scale: 0.4, glow: 0.5, hueShift: 160, links: 0.8,
    sparkle: 1, jitter: 4, shock: 0.2, rotation: 0.2, tilt: 0.1,
  },
];

/** The per-frame values the renderer uses. Every field is 0 in silence, except the calm spin. */
export interface VisualParams {
  pull: number;
  /** Instant bass-kick strength (0..1): drives the core flash and the shockwave. */
  kick: number;
  swell: number;
  glow: number;
  hue: number;
  linkAlpha: number;
  sparkle: number;
  jitter: number;
  shock: number;
  spin: number;
  tilt: number;
}

/**
 * Map features onto visual parameters. With reduced motion, every movement is damped and the
 * flicker-like effects (jitter, sparkle, shockwave, tilt) are switched off. Colour and glow remain,
 * so the music still shows.
 */
export function toVisualParams(f: AudioFeatureFrame, p: VisualProfile, reducedMotion: boolean): VisualParams {
  const damp = reducedMotion ? 0.35 : 1;
  return {
    pull: clamp01(Math.max(f.bassHit, 0.2 * f.bass) * p.gravity) * damp,
    kick: clamp01(f.bassHit * p.gravity) * (reducedMotion ? 0.5 : 1),
    swell: clamp01((0.7 * f.bass + 0.3 * f.rmsEnergy) * p.scale) * damp,
    glow: clamp01(f.bass * p.glow + 0.35 * f.bassHit + 0.15 * f.rmsEnergy),
    hue: f.mid * p.hueShift,
    linkAlpha: clamp01(f.mid * p.links),
    sparkle: reducedMotion ? 0 : clamp01(f.high * p.sparkle),
    jitter: reducedMotion ? 0 : f.high * p.jitter,
    shock: reducedMotion ? 0 : f.onsetStrength * p.shock,
    spin: p.rotation * damp,
    tilt: reducedMotion ? 0 : f.bass * p.tilt,
  };
}
