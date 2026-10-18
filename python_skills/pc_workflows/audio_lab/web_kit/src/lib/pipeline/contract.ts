/**
 * The audio feature contract: the one shape every audio source emits and every visual consumes.
 *
 * Nothing in src/lib/pipeline imports a renderer, a component or the DOM. A consumer reads frames
 * (see pipeline.ts, react.tsx); a source produces them (see source.ts). Neither knows about the other.
 *
 * Definitions (identical for every source, so a consumer never branches on where the audio came from):
 *   bass, mid, high  Band loudness, 0..1, from the band's mean power in dB mapped linearly from
 *                    FLOOR_DB..CEIL_DB and smoothed with a fast attack and a slower release.
 *                    bass = 20-150 Hz (sub included), mid = 150-2000 Hz, high = 2-10 kHz.
 *   rmsEnergy        Overall loudness, 0..1, the same mapping over 20 Hz-10 kHz.
 *   onsetStrength    How far the latest spectral flux is above the adaptive onset threshold, 0..1
 *                    (0.5 = exactly at the threshold). Per frame, not smoothed.
 *   beatDetected     true only on the frame an onset fired (adaptive threshold, 120 ms refractory).
 *                    It is a detected onset, not a bar/beat grid: live audio has no beat tracker.
 *   currentSceneState  The coarse section of the music. Offline tracks use the AudioLab motion timeline's
 *                    state machine (authoritative). Live audio uses a simpler causal tracker with the same
 *                    four states, so the two are comparable in kind, not identical in boundaries.
 *   bassHit          Extension to the required fields. Strength of a bass-note onset, 0..1, with an instant
 *                    attack and a 150 ms decay, read from the punch band (60-150 Hz) so a loud sustained
 *                    sub cannot hide it. Needed because `bass` is a smoothed level and cannot carry it.
 *
 * Numbers from different sources match in meaning, not to the last decimal: a live source reads a
 * browser AnalyserNode, an offline source reads pre-computed readings that emulate one (see
 * audiolab.webfeatures), and a browser's sample rate and read cadence differ slightly.
 *
 * Frames are frozen. A consumer must not mutate one, and may keep a reference to it safely.
 */

export const SCENE_STATES = ["rest", "build", "active", "settle"] as const;
export type SceneState = (typeof SCENE_STATES)[number];

/** dB window for band loudness: a band at or below FLOOR_DB reads 0, at or above CEIL_DB reads 1. */
export const FLOOR_DB = -85;
export const CEIL_DB = -25;

export interface AudioFeatureFrame {
  /** Playback position in seconds (0 when nothing is loaded). */
  readonly time: number;
  /** time / duration, 0..1. Always 0 when the duration is unknown (a microphone). */
  readonly progress: number;
  readonly isPlaying: boolean;
  readonly bass: number;
  readonly mid: number;
  readonly high: number;
  readonly rmsEnergy: number;
  readonly onsetStrength: number;
  readonly beatDetected: boolean;
  readonly currentSceneState: SceneState;
  /** Extension: strength of a bass-note onset (see the header). */
  readonly bassHit: number;
}

/** Fields that must lie in 0..1. */
export const UNIT_FIELDS = ["progress", "bass", "mid", "high", "rmsEnergy", "onsetStrength", "bassHit"] as const;

export function clamp01(x: number): number {
  return x >= 1 ? 1 : x > 0 ? x : 0; // also maps NaN to 0
}

const finite = (x: number) => (Number.isFinite(x) ? x : 0);

/** Build a frame: every number is made finite, unit fields are clamped to 0..1, and the result is frozen. */
export function makeFrame(f: AudioFeatureFrame): AudioFeatureFrame {
  return Object.freeze({
    time: Math.max(0, finite(f.time)),
    progress: clamp01(f.progress),
    isPlaying: f.isPlaying,
    bass: clamp01(f.bass),
    mid: clamp01(f.mid),
    high: clamp01(f.high),
    rmsEnergy: clamp01(f.rmsEnergy),
    onsetStrength: clamp01(f.onsetStrength),
    beatDetected: f.beatDetected,
    currentSceneState: SCENE_STATES.includes(f.currentSceneState) ? f.currentSceneState : "rest",
    bassHit: clamp01(f.bassHit),
  });
}

/** The frame for "nothing is playing": calm and silent. */
export const IDLE_FRAME: AudioFeatureFrame = makeFrame({
  time: 0,
  progress: 0,
  isPlaying: false,
  bass: 0,
  mid: 0,
  high: 0,
  rmsEnergy: 0,
  onsetStrength: 0,
  beatDetected: false,
  currentSceneState: "rest",
  bassHit: 0,
});

/** Returns the problems with a frame, or an empty list. Used by tests and by development-time checks. */
export function frameProblems(f: AudioFeatureFrame): string[] {
  const out: string[] = [];
  if (!Object.isFrozen(f)) out.push("frame is not frozen");
  if (!Number.isFinite(f.time) || f.time < 0) out.push(`time ${f.time}`);
  for (const k of UNIT_FIELDS) {
    const v = f[k];
    if (!Number.isFinite(v) || v < 0 || v > 1) out.push(`${k} ${v} is outside 0..1`);
  }
  if (typeof f.isPlaying !== "boolean") out.push("isPlaying is not a boolean");
  if (typeof f.beatDetected !== "boolean") out.push("beatDetected is not a boolean");
  if (!SCENE_STATES.includes(f.currentSceneState)) out.push(`currentSceneState ${f.currentSceneState}`);
  return out;
}
