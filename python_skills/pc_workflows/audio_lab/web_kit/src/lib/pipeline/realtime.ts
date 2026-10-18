import { DelayLine } from "../audio/delay";
import { makeFrame, type AudioFeatureFrame } from "./contract";
import { FeatureComputer, type BandReading } from "./computer";
import type { FeatureSource, Playhead, SourceKind, SourceStatus } from "./source";
import { SceneTracker } from "./scene-tracker";

/**
 * Where raw readings come from for a realtime source: an AnalyserNode pair in the browser, a generated
 * signal for the demo, or a scripted sequence in tests.
 */
export interface ReadingBackend {
  readonly playhead: Playhead;
  /** The latest raw reading. Called once per frame, only while playing. */
  read(): BandReading;
  /** Seconds between the analysed signal and what the listener hears. */
  readonly latencyS: number;
  dispose(): void;
}

export interface RealtimeMeta {
  id: string;
  kind: Exclude<SourceKind, "offline">;
  label: string;
}

const MAX_DELAY_S = 0.6;

/** A source that analyses audio as it plays. Live files, the microphone and the demo signal are all this. */
export class RealtimeSource implements FeatureSource {
  readonly id: string;
  readonly kind: Exclude<SourceKind, "offline">;
  readonly label: string;
  private readonly computer = new FeatureComputer();
  private readonly tracker = new SceneTracker();
  private readonly delay = new DelayLine<AudioFeatureFrame>(MAX_DELAY_S + 0.4);
  private lastNow = -1;
  private nudgeMs = 0;

  constructor(
    meta: RealtimeMeta,
    private readonly backend: ReadingBackend,
  ) {
    this.id = meta.id;
    this.kind = meta.kind;
    this.label = meta.label;
  }

  get canSeek(): boolean {
    return this.backend.playhead.canSeek;
  }

  get latencyMs(): number {
    return Math.round(this.backend.latencyS * 1000);
  }

  sample(nowS: number): AudioFeatureFrame {
    const head = this.backend.playhead;
    const dt = this.lastNow < 0 ? 1 / 60 : Math.min(0.1, Math.max(1e-3, nowS - this.lastNow));
    this.lastNow = nowS;
    const playing = head.playing;
    const time = head.time;
    const duration = head.duration;

    const f = playing ? this.computer.push(this.backend.read(), nowS, dt) : this.computer.decay(dt);
    if (playing) this.tracker.push(f.rmsEnergy, dt); // a paused scene holds its state
    const live = makeFrame({
      time,
      progress: duration ? time / duration : 0,
      isPlaying: playing,
      ...f,
      currentSceneState: this.tracker.state,
    });

    // Show what was analysed `delay` seconds ago, so the picture lines up with what is heard.
    this.delay.push(nowS, live);
    const delayS = Math.min(MAX_DELAY_S, Math.max(0, this.backend.latencyS + this.nudgeMs / 1000));
    const past = delayS > 0 ? this.delay.at(nowS - delayS) : live;
    if (!past || past === live) return live;
    return makeFrame({ ...past, time, progress: live.progress, isPlaying: playing });
  }

  async play(): Promise<void> {
    await this.backend.playhead.play();
  }

  pause(): void {
    this.backend.playhead.pause();
  }

  seek(t: number): void {
    this.backend.playhead.seek(t);
  }

  status(): SourceStatus {
    const h = this.backend.playhead;
    return { playing: h.playing, duration: h.duration, error: h.error };
  }

  onStatus(cb: () => void): () => void {
    return this.backend.playhead.onChange(cb);
  }

  setSyncNudge(ms: number): void {
    this.nudgeMs = Math.max(-200, Math.min(400, ms));
  }

  dispose(): void {
    this.backend.dispose();
  }
}
