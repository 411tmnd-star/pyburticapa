import type { AudioFeatureFrame } from "./contract";

/**
 * What the pipeline needs from an audio source. A source owns its audio, its clock and its analysis,
 * and produces contract frames. It must not import a renderer, a component or the DOM's rendering APIs.
 */

export type SourceKind = "offline" | "live" | "synthetic";

/** Coarse, low-frequency facts about a source. Reading them is cheap; they change rarely. */
export interface SourceStatus {
  readonly playing: boolean;
  /** Seconds; null when the length is unknown or unbounded (a microphone, the demo signal). */
  readonly duration: number | null;
  readonly error: string | null;
}

export interface FeatureSource {
  readonly id: string;
  readonly kind: SourceKind;
  readonly label: string;
  readonly canSeek: boolean;
  /** Milliseconds the source delays its features to match what is heard (0 when not applicable). */
  readonly latencyMs: number;

  /** Called once per animation frame with a monotonic clock in seconds. Must be cheap and must not throw. */
  sample(nowS: number): AudioFeatureFrame;

  play(): Promise<void>;
  pause(): void;
  seek(t: number): void;

  status(): SourceStatus;
  /** Notified when status() changes. Not called every frame. */
  onStatus(cb: () => void): () => void;

  /** Optional extra delay in milliseconds, for tuning visuals to what the listener hears. */
  setSyncNudge?(ms: number): void;

  dispose(): void;
}

/** Playback timing, separate from analysis: a silent clock, or an audio element. */
export interface Playhead {
  readonly time: number;
  readonly duration: number | null;
  readonly playing: boolean;
  readonly canSeek: boolean;
  readonly error: string | null;
  play(): Promise<void>;
  pause(): void;
  seek(t: number): void;
  onChange(cb: () => void): () => void;
  dispose(): void;
}
