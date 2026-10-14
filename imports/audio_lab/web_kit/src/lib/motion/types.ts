/**
 * Types for the motion-web bundle exported by AudioLab (`scripts/export_web.py`).
 *
 * The bundle is a slim, UI-oriented view of a `motion_timeline` artifact. The UI never reads the full
 * AudioLab schema, so schema changes on the Python side only require updating the exporter.
 * All times are in seconds from the start of the audio.
 */

export const WEB_FORMAT = "motion-web/1" as const;

/** The scene-level states of the state machine. One is active at any time. Defined by the pipeline contract. */
import { SCENE_STATES, type SceneState } from "../pipeline/contract";
export { SCENE_STATES, type SceneState };

export const POLICIES = ["reactive", "anticipatory", "continuous"] as const;
export type Policy = (typeof POLICIES)[number];

export interface SceneSpan {
  id: string;
  state: SceneState;
  start: number;
  end: number;
}

export interface WebProperty {
  name: string;
  /** How simultaneous actions combine on this property (informational in the UI). */
  combine: "add" | "max" | "priority" | "exclusive";
  /** Largest value the property's curve can take. */
  max: number;
}

export interface WebTrack {
  name: string;
  properties: WebProperty[];
}

/** A planned motion action. `source` is the musical event it answers; start/peak/end are the visual response. */
export interface WebAction {
  id: string;
  rule: string;
  track: string;
  property: string;
  primitive: string;
  kind: "event" | "continuous";
  policy: Policy;
  /** The musical event time. null for continuous actions. */
  source: number | null;
  start: number;
  /** Event actions: the moment of the visual peak. null for continuous actions' peak is not meaningful. */
  peak: number | null;
  /** Event actions: where the hold ends and the fall begins. */
  settle: number | null;
  end: number;
  amplitude: number;
  /** How long before its source event the action starts (0 for reactive and continuous actions). */
  lookahead: number;
}

export interface WebTimeline {
  format: typeof WEB_FORMAT;
  profile: { name: string; version: string };
  durationS: number;
  rateHz: number;
  nSamples: number;
  tracks: WebTrack[];
  states: SceneSpan[];
  /** Scheduled actions, sorted by start time. */
  actions: WebAction[];
  provenance: {
    schemaVersion: string;
    timelineSha256: string;
    audioSha256: string;
    suppressedActions: number;
  };
}

/** Every property curve of a timeline, decoded from `<profile>.curves.bin`. */
export interface Curves {
  rateHz: number;
  nSamples: number;
  /** `track.property` for each curve, in file order. */
  keys: string[];
  /** keys.length * nSamples values; curve i occupies [i * nSamples, (i + 1) * nSamples). */
  data: Float32Array;
}

export interface ManifestProfile {
  id: string;
  label: string;
  /** URL of the `.timeline.json`. */
  timeline: string;
  /** URL of the `.curves.bin`. */
  curves: string;
}

export interface ManifestSong {
  id: string;
  title: string;
  durationS: number;
  /** null: no audio is shipped (rights not cleared); the lab runs on a silent clock. */
  audio: { src: string; rights: string } | null;
  /** The pre-computed analyser readings (`audio-features/1`). Absent: the song cannot feed the audio pipeline. */
  features: { meta: string; bin: string } | null;
  profiles: ManifestProfile[];
}

export interface Manifest {
  format: typeof WEB_FORMAT;
  songs: ManifestSong[];
}

/** What an action is doing at a given moment. */
export type Phase = "anticipating" | "rising" | "holding" | "releasing" | "following";
